import { categories } from "../data";

export default function Navbar({
  setPage = () => {},
  count = 0,
  user = null,
  category = "",
  onHome = () => {},
  onCategory = () => {},
  onAbout = () => {},
  onLoginClick = () => {},
  onCartClick = () => {},
  onLogout = () => {},
}) {
  return (
    <nav className="navbar">
      <div className="nav-left">
        <span className="logo" onClick={onHome}>DNK</span>
        {categories.map((c) => (
          <a
            key={c.id}
            className={category === c.id ? "active" : ""}
            onClick={() => onCategory(c.id)}
          >
            {c.label}
          </a>
        ))}
      </div>
      <div className="nav-right">
        <a onClick={onAbout}>About</a>
        <a onClick={() => setPage("contact")}>Contact us</a>
        <a className="cart" onClick={onCartClick}>Cart ({count})</a>
        {user ? (
          <>
            <a onClick={() => setPage("dashboard")}>Hi, {user.split(/[ @]/)[0]}</a>
            <a onClick={onLogout}>Logout</a>
          </>
        ) : (
          <a onClick={onLoginClick}>Login</a>
        )}
      </div>
    </nav>
  );
}