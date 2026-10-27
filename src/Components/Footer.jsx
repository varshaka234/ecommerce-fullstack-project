export default function Footer({ onCategory, onContact, onLogin, onAbout }) {
  return (
    <footer className="footer">
      <div className="footer-col">
        <b>DNK</b>
        <span>Style for every day.</span>
      </div>
      <div className="footer-col">
        <b>Shop</b>
        <a onClick={() => onCategory("women")}>Women</a>
        <a onClick={() => onCategory("men")}>Men</a>
        <a onClick={() => onCategory("accessories")}>Accessories</a>
      </div>
      <div className="footer-col">
        <b>Company</b>
        <a onClick={onAbout}>About us</a>
        <a onClick={onContact}>Contact us</a>
        <a onClick={onLogin}>My account</a>
      </div>
      <p className="footer-copy">© 2026 DNK. All rights reserved.</p>
    </footer>
  );
}