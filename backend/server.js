const express = require("express");
const cors = require("cors");
const http = require("http");
const mysql = require("mysql2");
const { Server } = require("socket.io");

const app = express();
app.use(cors());
app.use(express.json());

// ================= MYSQL =================
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "aysegul123",
    database: "smart_cafe"
});

db.connect((err) => {
    if (err) console.log("❌ DB Error:", err);
    else console.log("✅ MySQL Connected");
});

// ================= SOCKET =================
const server = http.createServer(app);

const io = new Server(server, {
    cors: { origin: "*" }
});

io.on("connection", (socket) => {
    console.log("🔌 Client connected:", socket.id);
});

// ================= 🔥 INVENTORY UPDATE FUNCTION =================
const updateInventoryAndCheck = (ingredient, qty) => {

    console.log("🛠️ Updating:", ingredient, qty);

    db.query(
        `UPDATE inventory 
         SET quantity = quantity - ? 
         WHERE LOWER(name) = LOWER(?)`,
        [qty, ingredient],
        (err, result) => {

            if (err) {
                console.log("❌ Update Error:", err);
                return;
            }

            console.log("✅ Rows affected:", result.affectedRows);

            if (result.affectedRows === 0) {
                console.log("⚠️ NAME NOT MATCH:", ingredient);
                return;
            }

            db.query(
                `SELECT * FROM inventory WHERE LOWER(name) = LOWER(?)`,
                [ingredient],
                (err, res) => {

                    if (err) return console.log(err);

                    const item = res[0];
                    if (!item) return;

                    console.log("📦 NEW STOCK:", item.name, item.quantity);

                    if (item.quantity <= 5) {
                        io.emit("lowStock", {
                            name: item.name,
                            quantity: item.quantity
                        });
                    }
                }
            );
        }
    );
};

// ================= ORDERS =================

// GET ORDERS
app.get("/orders", (req, res) => {
    db.query(
        "SELECT * FROM orders ORDER BY created_at DESC",
        (err, result) => {
            if (err) return res.json(err);
            res.json(result);
        }
    );
});

// CREATE ORDER
app.post("/orders", (req, res) => {

    const { customer_name, items, total_price, table_no } = req.body;

    console.log("🔥 Incoming order:", items);

    if (!items || items.length === 0) {
        return res.status(400).json({ error: "Items missing" });
    }

    const cleanItems = items.map(item => ({
        name: item.name.trim(),
        qty: item.qty,
        options: item.options || []
    }));

    const itemsJSON = JSON.stringify(cleanItems);

    db.query(
        "INSERT INTO orders (customer_name, items, total_price, status, table_no) VALUES (?, ?, ?, ?, ?)",
        [customer_name, itemsJSON, total_price, "pending", table_no],
        (err, result) => {

            if (err) {
                console.log("❌ DB Error:", err);
                return res.json(err);
            }

            // 🔥 INVENTORY UPDATE
            cleanItems.forEach(item => {

                // ================= 🔥 RECIPE SYSTEM =================
                db.query(
                    "SELECT * FROM recipes WHERE item_name = ?",
                    [item.name],
                    (err, recipeResults) => {

                        if (err) return console.log(err);

                        recipeResults.forEach(rec => {
                            updateInventoryAndCheck(
                                rec.ingredient_name,
                                rec.quantity * item.qty
                            );
                        });

                    }
                );


                // ================= 🔥 ADDON SYSTEM =================
                if (item.options.length > 0) {

                    item.options.forEach(opt => {

                        db.query(
                            "SELECT * FROM addon_mapping WHERE addon_name = ?",
                            [opt],
                            (err, mapResult) => {

                                if (err) return console.log(err);

                                if (mapResult.length === 0) {
                                    console.log("⚠️ No mapping for:", opt);
                                    return;
                                }

                                const { inventory_name, quantity } = mapResult[0];

                                updateInventoryAndCheck(
                                    inventory_name,
                                    quantity * item.qty
                                );
                            }
                        );

                    });

                }

            });

            const newOrder = {
                id: result.insertId,
                customer_name,
                items: cleanItems,
                total_price,
                status: "pending",
                table_no
            };

            io.emit("newOrder", newOrder);

            res.json(newOrder);
        }
    );
});

// UPDATE ORDER STATUS
app.put("/orders/:id", (req, res) => {
    const { status } = req.body;

    db.query(
        "UPDATE orders SET status=? WHERE id=?",
        [status, req.params.id],
        (err) => {
            if (err) return res.json(err);

            io.emit("orderUpdated", {
                id: req.params.id,
                status
            });

            res.json({ message: "Updated" });
        }
    );
});

// ================= INVENTORY =================
app.get("/inventory", (req, res) => {
    db.query("SELECT * FROM inventory", (err, result) => {
        if (err) return res.status(500).json(err);
        res.json(result);
    });
});

// ================= MENU =================

// CREATE MENU ITEM
app.post("/menu", (req, res) => {
    const { name, price, category } = req.body;

    db.query(
        "INSERT INTO menu (name, price, category) VALUES (?, ?, ?)",
        [name, price, category],
        (err, result) => {
            if (err) return res.json(err);
            res.json({ id: result.insertId, ...req.body });
        }
    );
});

// GET MENU
app.get("/menu", (req, res) => {
    db.query("SELECT * FROM menu", (err, result) => {
        if (err) return res.json(err);
        res.json(result);
    });
});

// UPDATE MENU
app.put("/menu/:id", (req, res) => {
    const { name, price, category } = req.body;

    db.query(
        "UPDATE menu SET name=?, price=?, category=? WHERE id=?",
        [name, price, category, req.params.id],
        (err) => {
            if (err) return res.json(err);
            res.json({ message: "Updated" });
        }
    );
});

// DELETE MENU
app.delete("/menu/:id", (req, res) => {
    db.query(
        "DELETE FROM menu WHERE id=?",
        [req.params.id],
        (err) => {
            if (err) return res.json(err);
            res.json({ message: "Deleted" });
        }
    );
});

// ================= DASHBOARD =================

// TOTAL SALES
app.get("/total-sales", (req, res) => {
    db.query(
        "SELECT SUM(total_price) AS total FROM orders",
        (err, result) => {
            if (err) return res.json(err);
            res.json(result[0]);
        }
    );
});

// WEEKLY SALES
app.get("/sales-weekly", (req, res) => {
    db.query(
        `
        SELECT DATE(created_at) as day, COUNT(id) as total
        FROM orders
        WHERE created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)
        GROUP BY DATE(created_at)
        ORDER BY DATE(created_at)
        `,
        (err, result) => {
            if (err) return res.json(err);
            res.json(result);
        }
    );
});

//// ADD REVIEW (REAL-TIME)
app.post("/api/reviews", (req, res) => {
    const { name, message, rating } = req.body;

    db.query(
        "INSERT INTO reviews (name, message, rating) VALUES (?, ?, ?)",
        [name, message, rating],
        (err, result) => {

            if (err) {
                console.log(err);
                return res.status(500).json(err);
            }

            const newReview = {
                id: result.insertId,
                name,
                message,
                rating,
                created_at: new Date()
            };

            // 🔥 SOCKET EMIT (IMPORTANT)
            io.emit("newReview", newReview);

            res.json(newReview);
        }
    );
});

// GET ALL REVIEWS
app.get("/api/reviews", (req, res) => {
    db.query(
        "SELECT * FROM reviews ORDER BY created_at DESC",
        (err, result) => {
            if (err) return res.json(err);
            res.json(result);
        }
    );
});
// REVIEWS GRAPH (hourly)
app.get("/api/reviews/stats", (req, res) => {

    const sql = `
        SELECT 
            DATE_FORMAT(created_at, '%Y-%m-%d %H:00:00') as time,
            COUNT(*) as count
        FROM reviews
        GROUP BY time
        ORDER BY time ASC
    `;

    db.query(sql, (err, result) => {
        if (err) return res.json(err);
        res.json(result);
    });
});
// ================= START =================
server.listen(8001, () => {
    console.log("🚀 Server running on http://localhost:8001");
});