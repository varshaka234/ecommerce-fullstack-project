import { useState } from "react";

export default function Checkout({ items = [], placeOrder = () => {}, setPage = () => {} }) {
  const [form, setForm] = useState({ name: "", phone: "", address: "", upi: "", card: "", expiry: "", cvv: "" });
  const [method, setMethod] = useState("Cash on delivery");
  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    placeOrder(method);
  };

  if (items.length === 0) {
    return (
      <section className="panel">
        <h2>Checkout</h2>
        <p className="muted">Your cart is empty.</p>
        <button className="btn btn-dark" onClick={() => setPage("home")}>Continue shopping</button>
      </section>
    );
  }

  return (
    <section className="panel">
      <h2>Checkout</h2>
      <form onSubmit={handleSubmit} className="checkout-form">
        <h3>Delivery address</h3>
        <input name="name" placeholder="Full name" value={form.name} onChange={handleChange} required />
        <input name="phone" placeholder="Phone number" value={form.phone} onChange={handleChange} required />
        <textarea name="address" rows="3" placeholder="Address" value={form.address} onChange={handleChange} required />

        <h3>Payment method</h3>
        {["Cash on delivery", "UPI", "Card"].map((m) => (
          <label key={m} className="radio">
            <input type="radio" checked={method === m} onChange={() => setMethod(m)} />
            {m}
          </label>
        ))}

        {method === "UPI" && (
          <input name="upi" placeholder="UPI ID (name@bank)" value={form.upi} onChange={handleChange} required />
        )}
        {method === "Card" && (
          <>
            <input name="card" placeholder="Card number (demo only)" value={form.card} onChange={handleChange} required />
            <div className="two-col">
              <input name="expiry" placeholder="MM/YY" value={form.expiry} onChange={handleChange} required />
              <input name="cvv" placeholder="CVV" value={form.cvv} onChange={handleChange} required />
            </div>
          </>
        )}

        <div className="line total">
          <span>Total to pay</span>
          <span>${total.toFixed(2)}</span>
        </div>

        <div className="btn-row">
          <button type="button" className="btn btn-dark" onClick={() => setPage("cart")}>Back</button>
          <button className="btn btn-dark">Pay ${total.toFixed(2)}</button>
        </div>
      </form>
    </section>
  );
}