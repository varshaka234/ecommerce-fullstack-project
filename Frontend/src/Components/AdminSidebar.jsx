
export default function AdminSidebar({ activePage, setActivePage, onLogout }) {
  return (
    <aside className="admin-sidebar">
      <h2 className="admin-logo">DNK Admin</h2>

      <p className="sidebar-heading">MENU</p>

      <button
        className={activePage === "dashboard" ? "active" : ""}
        onClick={() => setActivePage("dashboard")}
      >
        <span>▦</span> Dashboard
      </button>

      <button
        className={activePage === "products" ? "active" : ""}
        onClick={() => setActivePage("products")}
      >
        <span>□</span> Products
      </button>

      <button
        className={activePage === "orders" ? "active" : ""}
        onClick={() => setActivePage("orders")}
      >
        <span>▤</span> Orders
      </button>

      <div className="sidebar-bottom">
        <button onClick={onLogout}>
          <span>↪</span> Logout
        </button>
      </div>
    </aside>
  );
}
