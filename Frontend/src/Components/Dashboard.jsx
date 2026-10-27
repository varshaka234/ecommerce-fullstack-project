export default function Dashboard({ user, cartCount = 0, orders = [], setPage = () => {} }) {
  const spent = orders.reduce((sum, o) => sum + o.total, 0);

  return (
    <section className="panel">
      <h2>Welcome, {user ? user.split("@")[0] : "guest"}</h2>
      <p className="muted">{user}</p>

      <div className="stats">
        <div><b>{cartCount}</b><span>Items in cart</span></div>
        <div><b>{orders.length}</b><span>Orders</span></div>
        <div><b>${spent.toFixed(2)}</b><span>Total spent</span></div>
      </div>

      <div className="btn-row">
        <button className="btn btn-dark" onClick={() => setPage("home")}>Continue shopping</button>
        <button className="btn btn-dark" onClick={() => setPage("cart")}>View cart</button>
      </div>

      <h3>My orders</h3>
      {orders.length === 0 ? (
        <p className="muted">No orders yet. Add something to your cart.</p>
      ) : (
        orders.map((o) => (
          <div key={o.id} className="order">
            <div className="line">
              <b>Order #{o.id}</b>
              <span>{o.date}</span>
            </div>
            {o.items.map((i) => (
              <div key={i.id} className="line">
                <span>{i.name} × {i.qty}</span>
                <span>${(i.price * i.qty).toFixed(2)}</span>
              </div>
            ))}
            <div className="line total">
              <span>Paid by {o.payment}</span>
              <span>${o.total.toFixed(2)}</span>
            </div>
          </div>
        ))
      )}
    </section>
  );
}