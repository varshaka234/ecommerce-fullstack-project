import { useEffect, useState } from "react";
import {
  getAdminProducts,
  updateAdminOrderStatus,
  addProduct,
  updateProduct,
  deleteProduct,
  getAdminOrders,
} from "../api";

import AdminSidebar from "./AdminSidebar";

const emptyForm = {
  name: "",
  price: "",
  type: "tanktops",
  image: "",
  for_women: false,
  for_men: false,
  sale: false,
  featured: false,
};

const orderStatuses = [
  "Pending",
  "Confirmed",
  "Shipped",
  "Delivered",
  "Cancelled",
];

export default function AdminDashboard({ onLogout }) {
  const [activePage, setActivePage] = useState("products");

  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const [orderSearch, setOrderSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 5;

  const filteredOrders = orders.filter((order) => {
    const search = orderSearch.toLowerCase();

    const matchesSearch =
      order.name?.toLowerCase().includes(search) ||
      order.customer_email?.toLowerCase().includes(search) ||
      String(order.id).includes(search);

    const matchesStatus =
      statusFilter === "All" || order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);
  

  const startIndex = (currentPage - 1) * ordersPerPage;

  const paginatedOrders = filteredOrders.slice(
    startIndex,
    startIndex + ordersPerPage,
  );
  const loadProducts = async () => {
    setLoading(true);
    setError("");

    try {
      const data = await getAdminProducts();
      setProducts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const loadOrders = async () => {
    setLoading(true);
    setError("");

    try {
      const data = await getAdminOrders();
      setOrders(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activePage === "products") {
      loadProducts();
    }

    if (activePage === "orders") {
      loadOrders();
    }

    if (activePage === "dashboard") {
      loadProducts();
      loadOrders();
    }
  }, [activePage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [orderSearch, statusFilter]);

  // Update order status
  const handleStatusChange = async (orderId, newStatus) => {
    setError("");
    setMessage("");

    try {
      await updateAdminOrderStatus(orderId, newStatus);

      setOrders((previousOrders) =>
        previousOrders.map((order) =>
          order.id === orderId ? { ...order, status: newStatus } : order,
        ),
      );

      setMessage(`Order #${orderId} status updated to ${newStatus}.`);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      if (editingId) {
        await updateProduct(editingId, form);
        setMessage("Product updated successfully!");
      } else {
        await addProduct(form);
        setMessage("Product added successfully!");
      }

      setEditingId(null);
      setForm({ ...emptyForm });
      await loadProducts();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = (product) => {
    setEditingId(product.id);

    setForm({
      name: product.name,
      price: product.price,
      type: product.type,
      image: product.image,
      for_women: product.for?.includes("women") || false,
      for_men: product.for?.includes("men") || false,
      sale: product.sale,
      featured: product.featured,
    });

    setMessage("");
    setError("");
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?",
    );

    if (!confirmDelete) return;

    setError("");
    setMessage("");

    try {
      await deleteProduct(id);
      setMessage("Product deleted successfully!");

      if (editingId === id) {
        setEditingId(null);
        setForm({ ...emptyForm });
      }

      await loadProducts();
    } catch (err) {
      setError(err.message);
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm({ ...emptyForm });
    setError("");
    setMessage("");
  };

  return (
    <div className="admin-layout">
      <AdminSidebar
        activePage={activePage}
        setActivePage={(page) => {
          setActivePage(page);
          setError("");
          setMessage("");
        }}
        onLogout={onLogout}
      />

      <main className="admin-main">
        {activePage === "dashboard" && (
          <>
            <h2>Admin Dashboard</h2>
            <p>Welcome, Admin!</p>

            <div className="admin-stats">
              <div className="admin-stat-card">
                <h3>Total Products</h3>
                <h2>{products.length}</h2>
              </div>

              <div className="admin-stat-card">
                <h3>Total Orders</h3>
                <h2>{orders.length}</h2>
              </div>
            </div>

            <p>Use the sidebar to manage products and orders.</p>
          </>
        )}

        {activePage === "products" && (
          <>
            <h2>Product Management</h2>

            <hr />

            <h3>{editingId ? "Edit Product" : "Add New Product"}</h3>

            <form className="admin-form" onSubmit={handleSubmit}>
              <label>Product Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                maxLength={200}
                required
              />

              <label>Price</label>
              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                min="0.01"
                step="0.01"
                required
              />

              <label>Category</label>
              <select name="type" value={form.type} onChange={handleChange}>
                <option value="tanktops">Tank tops</option>
                <option value="eyewear">Eyewear</option>
                <option value="jackets">Jackets</option>
                <option value="sneakers">Sneakers</option>
                <option value="jeans">Jeans</option>
              </select>

              <label>Image Path</label>
              <input
                type="text"
                name="image"
                value={form.image}
                onChange={handleChange}
                placeholder="/Tank.jpeg"
                maxLength={300}
                required
              />

              <label className="admin-check">
                <input
                  type="checkbox"
                  name="for_women"
                  checked={form.for_women}
                  onChange={handleChange}
                />
                For Women
              </label>

              <label className="admin-check">
                <input
                  type="checkbox"
                  name="for_men"
                  checked={form.for_men}
                  onChange={handleChange}
                />
                For Men
              </label>

              <label className="admin-check">
                <input
                  type="checkbox"
                  name="sale"
                  checked={form.sale}
                  onChange={handleChange}
                />
                On Sale
              </label>

              <label className="admin-check">
                <input
                  type="checkbox"
                  name="featured"
                  checked={form.featured}
                  onChange={handleChange}
                />
                Featured
              </label>

              <button type="submit" className="btn btn-dark">
                {editingId ? "Update Product" : "Add Product"}
              </button>

              {editingId && (
                <button type="button" onClick={cancelEdit} className="btn">
                  Cancel Edit
                </button>
              )}
            </form>

            {message && <p className="admin-success">{message}</p>}
            {error && <p className="auth-error">{error}</p>}

            <hr />

            <h3>Existing Products</h3>

            {loading && <p>Loading products...</p>}

            {!loading && products.length === 0 && <p>No products found.</p>}

            <div className="admin-product-list">
              {products.map((product) => (
                <div className="admin-product" key={product.id}>
                  <div>
                    <h4>{product.name}</h4>
                    <p>Price: ₹{product.price}</p>
                    <p>Category: {product.type}</p>
                  </div>

                  <div className="admin-product-actions">
                    <button
                      type="button"
                      onClick={() => handleEdit(product)}
                      className="btn btn-dark"
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDelete(product.id)}
                      className="btn"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {activePage === "orders" && (
          <>
            <h2>Customer Orders</h2>
            <div className="order-filters">
              <input
                type="text"
                placeholder="Search by customer, email or order ID"
                value={orderSearch}
                onChange={(e) => setOrderSearch(e.target.value)}
              />

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="All">All Statuses</option>
                {orderStatuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
            <hr />

            {loading && <p>Loading orders...</p>}

            {message && <p className="admin-success">{message}</p>}
            {error && <p className="auth-error">{error}</p>}

            {!loading && orders.length === 0 && (
              <p>No customer orders found.</p>
            )}
            {!loading && orders.length > 0 && filteredOrders.length === 0 && (
              <p>No matching orders found.</p>
            )}

            <div className="admin-order-list">
              {paginatedOrders.map((order) => (
                <div className="admin-order" key={order.id}>
                  <h3>Order #{order.id}</h3>

                  <p>
                    <strong>Customer:</strong> {order.name}
                  </p>
                  <p>
                    <strong>Email:</strong> {order.customer_email}
                  </p>
                  <p>
                    <strong>Phone:</strong> {order.phone}
                  </p>
                  <p>
                    <strong>Address:</strong> {order.address}
                  </p>
                  <p>
                    <strong>Date:</strong> {order.date}
                  </p>
                  <p>
                    <strong>Payment:</strong> {order.payment}
                  </p>

                  <p>
                    <strong>Order Status:</strong>{" "}
                    <select
                      value={order.status || "Pending"}
                      onChange={(e) =>
                        handleStatusChange(order.id, e.target.value)
                      }
                    >
                      {orderStatuses.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </p>

                  <hr />

                  <h4>Ordered Products</h4>

                  {order.items.map((item) => (
                    <p key={item.id}>
                      {item.name} — ₹{item.price} × {item.qty}
                    </p>
                  ))}

                  <h3>Total: ₹{order.total}</h3>
                </div>
              ))}
            </div>
            {filteredOrders.length > ordersPerPage && (
              <div className="pagination">
                <button
                  type="button"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((page) => page - 1)}
                >
                  Previous
                </button>

                <span>
                  Page {currentPage} of {totalPages}
                </span>

                <button
                  type="button"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((page) => page + 1)}
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
