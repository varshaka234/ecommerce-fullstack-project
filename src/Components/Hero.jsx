export default function Hero({ onShop = () => {}, onFind = () => {} }) {
  return (
    <header className="hero">
      <div className="hero-overlay">
        <h1>Raining Offers For<br />Hot Summer!</h1>
        <p>25% Off On All Products</p>
        <div className="btn-row">
          <button className="btn btn-light" onClick={onShop}>Shop more</button>
          <button className="btn btn-outline" onClick={onFind}>Find more</button>
        </div>
      </div>
    </header>
  );
}