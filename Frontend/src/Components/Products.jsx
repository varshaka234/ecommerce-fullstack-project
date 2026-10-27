import { products } from "../data";

export default function Products({ addToCart = () => {}, onShop = () => {} }) {
  const featured = products.filter((p) => p.featured);

  return (
    <section id="products" className="featured">
      <h2>Featured Products</h2>
      <div className="underline" />

      <div className="grid">
        {featured.map((p) => (
          <div key={p.id} className="product">
            <div className="product-img">
              {p.sale && <span className="sale">Sale!</span>}
              <img src={p.image} alt={p.name} />
            </div>
            <h4>{p.name}</h4>
            <p>${p.price}.00</p>
            <button className="btn btn-dark" onClick={() => addToCart(p)}>Add to cart</button>
          </div>
        ))}
      </div>

      <button className="btn btn-light more-btn" onClick={onShop}>Shop more</button>
    </section>
  );
}