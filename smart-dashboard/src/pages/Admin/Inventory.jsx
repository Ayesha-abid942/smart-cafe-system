import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Inventory.css";

const Inventory = () => {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get("http://localhost:8001/inventory");
            setProducts(res.data);
        };

        fetchData();
    }, []);

    return (
        <div className="page-container">
            <div className="page-box">

                {/* HEADER */}
                <div className="inv-header">
                    <h1 className="page-title">Inventory Management</h1>

                    <input
                        type="text"
                        placeholder="🔍 Search products..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                {/* TABLE */}
                <div className="table-box">
                    <table>
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Stock</th>
                                <th>Status</th>
                            </tr>
                        </thead>

                        <tbody>
                            {products
                                .filter((p) =>
                                    p.name.toLowerCase().includes(search.toLowerCase())
                                )
                                .map((p) => (
                                    <tr key={p.id}>
                                        <td>{p.name}</td>
                                        <td>{p.quantity}</td>

                                        <td>
                                            {p.quantity <= 3 ? (
                                                <span className="badge critical">Critical</span>
                                            ) : p.quantity <= 5 ? (
                                                <span className="badge low">Low</span>
                                            ) : (
                                                <span className="badge ok">OK</span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    );
};

export default Inventory;