import { useState, useEffect } from "react";
import { products, genders, types } from "../data";

const PAGE_SIZE = 8;

export default function Shop({
  filters,
  setFilters = () => {},
  addToCart = () => {},
  cartCount = 0,
  onCart = () => {},
  onCheckout = () => {},
}) {
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [sort, setSort] = useState("default");

  // Start again from 8 products whenever a filter changes
  useEffect(() => setVisible(PAGE_SIZE), [filters.gender, filters.type]);

  let list = products.filter(
    (p) =>
      (filters.gender === "all" || p.for.includes(filters.gender)) &&
      (filters.type === "all" || p.type === filters.type)
  );
  if (sort === "low") list = [...list].sort((a, b) => a.price - b.price);
  if (sort === "high") list = [...list].sort((a, b) => b.price - a.price);

  const shown = list.slice(0, visible);
  const filtered = filters.gender !== "all" || filters.type !== "all";

  return (
    <section className="shop">
      {/* Filters */}
      <aside className="shop-side">
        <h3>Filter</h3>

        <b>For</b>
        {genders.map((g) => (
          <button
            key={g.id}
            className={filters.gender === g.id ? "active" : ""}
            onClick={() => setFilters({ ...filters, gender: g.id })}
          >
            {g.label}
          </button>
        ))}

        <b>Product type</b>
        {types.map((t) => (
          <button
            key={t.id}
            className={filters.type === t.id ? "active" : ""}
            onClick={() => setFilters({ ...filters, type: t.id })}
          >
            {t.label}
          </button>
        ))}

        {filtered && (
          <button className="clear" onClick={() => setFilters({ gender: "all", type: "all" })}>
            Clear filters
          </button>
        )}
      </aside>

      {/* Products */}
      <div className="shop-main">
        <div className="shop-head">
          <div>
            <h2>Shop</h2>
            <span>{list.length} products</span>
          </div>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="default">Sort: Featured</option>
            <option value="low">Price: low to high</option>
            <option value="high">Price: high to low</option>
          </select>
        </div>

        {list.length === 0 ? (
          <div className="shop-empty">
            <p>No products match these filters.</p>
            <button className="btn btn-dark" onClick={() => setFilters({ gender: "all", type: "all" })}>
              Clear filters
            </button>
          </div>
        ) : (
          <div className="shop-grid">
            {shown.map((p) => (
              <div key={p.id} className="shop-card">
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
        )}

        {visible < list.length && (
          <div className="see-more">
            <button className="btn btn-light" onClick={() => setVisible(visible + PAGE_SIZE)}>
              See more ({list.length - visible} left)
            </button>
          </div>
        )}
      </div>

      {/* Appears after adding something */}
      {cartCount > 0 && (
        <div className="cartbar">
          <span>{cartCount} {cartCount === 1 ? "item" : "items"} in your cart</span>
          <button className="btn btn-light" onClick={onCart}>View cart</button>
          <button className="btn btn-dark" onClick={onCheckout}>Check out</button>
        </div>
      )}
    </section>
  );
}