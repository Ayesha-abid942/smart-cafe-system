import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import "./Menu.css";

const Menu = () => {
    const [menu, setMenu] = useState([]);
    const [form, setForm] = useState({ name: "", price: "", category: "" });
    const [editingId, setEditingId] = useState(null);

    const [search, setSearch] = useState("");
    const [activeCategory, setActiveCategory] = useState("All");

    const [deleteId, setDeleteId] = useState(null);
    const [confirmStep, setConfirmStep] = useState(0);
    const [deletedMsg, setDeletedMsg] = useState(false);

    // FETCH
    const fetchMenu = async () => {
        const res = await axios.get("http://localhost:8001/menu");
        setMenu(res.data);
    };

    useEffect(() => {
        fetchMenu();
    }, []);

    // ADD / UPDATE
    const handleSubmit = async () => {
        if (!form.name || !form.price) {
            toast.error("Fill all fields");
            return;
        }

        try {
            if (editingId) {
                await axios.put(`http://localhost:8001/menu/${editingId}`, form);
                toast.success("Updated ✅");
            } else {
                await axios.post("http://localhost:8001/menu", form);
                toast.success("Added 🍽");
            }

            setForm({ name: "", price: "", category: "" });
            setEditingId(null);
            fetchMenu();
        } catch {
            toast.error("Error ❌");
        }
    };

    // EDIT
    const handleEdit = (item) => {
        setForm(item);
        setEditingId(item.id);
    };

    // DELETE
    const confirmDelete = async () => {
        await axios.delete(`http://localhost:8001/menu/${deleteId}`);

        setConfirmStep(0);
        setDeleteId(null);
        setDeletedMsg(true);

        fetchMenu();
        setTimeout(() => setDeletedMsg(false), 2000);
    };

    // CATEGORIES
    const categories = [
        "All",
        ...new Set(menu.map((i) => i.category).filter(Boolean)),
    ];

    // FILTER
    const filteredMenu = menu.filter((item) => {
        const matchSearch = item.name.toLowerCase().includes(search.toLowerCase());
        const matchCategory =
            activeCategory === "All" || item.category === activeCategory;

        return matchSearch && matchCategory;
    });

    return (
        <div className="page-container">
            <div className="page-box">

                {/* HEADER */}
                <div className="menu-header">
                    <h1 className="page-title">MENU</h1>

                    <div className="right">
                        <input
                            type="text"
                            placeholder="Search item..."
                            className="search-bar"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>

                {/* CATEGORY TABS */}
                <div className="category-tabs">
                    {categories.map((cat, i) => (
                        <button
                            key={i}
                            className={activeCategory === cat ? "active" : ""}
                            onClick={() => setActiveCategory(cat)}
                        >
                            {cat || "Others"}
                        </button>
                    ))}
                </div>

                {/* FORM */}
                <div className="menu-form">
                    <input
                        placeholder="Item name"
                        value={form.name}
                        onChange={(e) =>
                            setForm({ ...form, name: e.target.value })
                        }
                    />

                    <input
                        type="number"
                        placeholder="Price"
                        value={form.price}
                        onChange={(e) =>
                            setForm({ ...form, price: e.target.value })
                        }
                    />

                    <input
                        placeholder="Category"
                        value={form.category}
                        onChange={(e) =>
                            setForm({ ...form, category: e.target.value })
                        }
                    />

                    <button onClick={handleSubmit}>
                        {editingId ? "Update" : "Add"}
                    </button>
                </div>

                {/* GRID */}
                <div className="menu-grid">
                    {filteredMenu.map((item) => (
                        <div className="menu-card" key={item.id}>
                            <h3>{item.name}</h3>

                            {item.category && (
                                <p className="category">{item.category}</p>
                            )}

                            <p className="price">Rs {item.price}</p>

                            <div className="actions">
                                <button
                                    className="edit"
                                    onClick={() => handleEdit(item)}
                                >
                                    Edit
                                </button>

                                <button
                                    className="delete"
                                    onClick={() => {
                                        setDeleteId(item.id);
                                        setConfirmStep(1);
                                    }}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* POPUPS */}
                {confirmStep === 1 && (
                    <div className="order-popup">
                        <div className="popup-box">
                            <h3>Are you sure?</h3>
                            <p>This action cannot be undone.</p>

                            <div className="popup-actions">
                                <button onClick={() => setConfirmStep(0)}>
                                    Cancel
                                </button>
                                <button onClick={() => setConfirmStep(2)}>
                                    Yes
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {confirmStep === 2 && (
                    <div className="order-popup">
                        <div className="popup-box">
                            <h3>Final Confirmation ⚠️</h3>
                            <p>Do you really want to delete this item?</p>

                            <div className="popup-actions">
                                <button onClick={() => setConfirmStep(1)}>
                                    Back
                                </button>
                                <button className="delete-btn" onClick={confirmDelete}>
                                    Delete Permanently
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {deletedMsg && (
                    <div className="order-popup">
                        <div className="popup-box success">
                            <h3>✅ Item Deleted</h3>
                            <p>Successfully removed</p>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};

export default Menu;