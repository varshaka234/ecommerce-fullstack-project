export default function Cart({ items = [], changeQty = () => {}, removeItem = () => {}, setPage = () => {} }) {
  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);

  return (
    <section className="panel">
      <h2>Your cart</h2>

      {items.length === 0 ? (
        <>
          <p className="muted">Your cart is empty.</p>
          <button className="btn btn-dark" onClick={() => setPage("home")}>Continue shopping</button>
        </>
      ) : (
        <>
          {items.map((i) => (
            <div key={i.id} className="cart-item">
              <img src={i.image} alt={i.name} />
              <div className="cart-info">
                <b>{i.name}</b>
                <span>${i.price}.00</span>
              </div>
              <div className="qty">
                <button onClick={() => changeQty(i.id, -1)}>−</button>
                <span>{i.qty}</span>
                <button onClick={() => changeQty(i.id, 1)}>+</button>
              </div>
              <b className="item-total">${(i.price * i.qty).toFixed(2)}</b>
              <button className="remove" onClick={() => removeItem(i.id)}>Remove</button>
            </div>
          ))}

          <div className="line total">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>

          <div className="btn-row">
            <button className="btn btn-dark" onClick={() => setPage("home")}>Add more</button>
            <button className="btn btn-dark" onClick={() => setPage("checkout")}>Proceed to payment</button>
          </div>
        </>
      )}
    </section>
  );
}