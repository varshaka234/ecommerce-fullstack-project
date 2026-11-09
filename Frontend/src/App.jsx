import { useState, useEffect } from "react";
import Navbar from "./Components/Navbar";
import Hero from "./Components/Hero";
import PromoCards from "./Components/PromoCards";
import SocialIcons from "./Components/SocialIcons";
import Products from "./Components/Products";
import Shop from "./Components/Shop";
import About from "./Components/About";
import Footer from "./Components/Footer";
import Contact from "./Components/Contact";
import Login from "./Components/Login";
import Cart from "./Components/Cart";
import Checkout from "./Components/Checkout";
import Dashboard from "./Components/Dashboard";
import AdminDashboard from "./Components/AdminDashboard";

import {
  getMe,
  logoutUser,
  getCart,
  saveCart,
  getOrders,
  createOrder,
} from "./api";
import "./App.css";

// Only send what Django needs
const cartPayload = (cart) =>
  cart.map(({ id, name, price, image, qty }) => ({
    id,
    name,
    price,
    image,
    qty,
  }));

export default function App() {
  const [page, setPage] = useState("home");
  const [filters, setFilters] = useState({
    gender: "all",
    type: "all",
  });

  const [cart, setCart] = useState([]);
  const [cartReady, setCartReady] = useState(false);
  const [orders, setOrders] = useState([]);
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);

  const [afterLogin, setAfterLogin] = useState("dashboard");
  const [notice, setNotice] = useState("");

  const showNotice = (text, ms = 1800) => {
    setNotice(text);
    setTimeout(() => setNotice(""), ms);
  };

  // Load saved cart and orders from Django
  const loadUserData = () => {
    getCart()
      .then((items) => {
        setCart(items);
        setCartReady(true);
      })
      .catch(() => {});

    getOrders()
      .then(setOrders)
      .catch(() => {});
  };

  // Stay logged in after refresh
  useEffect(() => {
    if (!localStorage.getItem("token")) return;

    getMe()
      .then((u) => {
        setUser(u.name || u.email);
        setRole(u.role);

        if (u.role === "admin") {
          setPage("admin-dashboard");
        } else {
          setPage("dashboard");
        }

        loadUserData();
      })
      .catch(() => {
        localStorage.removeItem("token");
        setUser(null);
        setRole(null);
      });
  }, []);

  // Save cart in Django after the last change
  useEffect(() => {
    if (!user || !cartReady) return;

    const timer = setTimeout(() => {
      saveCart(cartPayload(cart)).catch(() =>
        showNotice("Could not save your cart. Is Django running?", 2500),
      );
    }, 400);

    return () => clearTimeout(timer);
  }, [cart]);

  // Navigation
  const toTop = () => setTimeout(() => window.scrollTo({ top: 0 }), 20);

  const goHome = () => {
    setPage("home");
    setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 50);
  };

  const goSection = (id) => {
    setPage("home");
    setTimeout(
      () => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }),
      50,
    );
  };

  const goShop = (gender = "all", type = "all") => {
    setFilters({ gender, type });
    setPage("shop");
    toTop();
  };

  const navShop = (id) => {
    if (id === "women" || id === "men") {
      goShop(id, "all");
    } else if (id === "accessories") {
      goShop("all", "eyewear");
    } else {
      goShop();
    }
  };

  let navActive = "";

  if (page === "shop") {
    if (filters.gender === "all" && filters.type === "all") {
      navActive = "all";
    } else if (filters.type === "all") {
      navActive = filters.gender;
    } else if (filters.gender === "all" && filters.type === "eyewear") {
      navActive = "accessories";
    }
  }

  // Cart
  const addToCart = (product) => {
    if (!user) {
      setAfterLogin(page === "shop" ? "shop" : "home");
      setPage("login");
      return;
    }

    setCart((prev) => {
      const found = prev.find((i) => i.id === product.id);

      if (found) {
        return prev.map((i) =>
          i.id === product.id ? { ...i, qty: i.qty + 1 } : i,
        );
      }

      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          qty: 1,
        },
      ];
    });

    showNotice(`${product.name} added to cart`);
  };

  const changeQty = (id, delta) =>
    setCart((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, qty: i.qty + delta } : i))
        .filter((i) => i.qty > 0),
    );

  const removeItem = (id) => setCart((prev) => prev.filter((i) => i.id !== id));

  const placeOrder = async (details) => {
    await saveCart(cartPayload(cart));

    const order = await createOrder(details);

    setOrders([order, ...orders]);
    setCart([]);
    setPage("success");
  };

  // Login navigation
  const handleLoginClick = () => {
    setAfterLogin("dashboard");
    setPage("login");
  };

  const handleCartClick = () => {
    if (!user) {
      setAfterLogin("cart");
      setPage("login");
      return;
    }

    setPage("cart");
  };

  // Handle successful login
  const handleLogin = (data) => {
    localStorage.setItem("token", data.token);

    setUser(data.user.name || data.user.email);
    setRole(data.user.role);

    loadUserData();

    if (data.user.role === "admin") {
      setPage("admin-dashboard");
    } else {
      setPage(afterLogin);
    }

    setAfterLogin("dashboard");
  };

  // Logout
  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (e) {}

    localStorage.removeItem("token");

    setUser(null);
    setRole(null);
    setCart([]);
    setOrders([]);
    setCartReady(false);

    goHome();
  };

  const count = cart.reduce((sum, i) => sum + i.qty, 0);

  const footer = (
    <Footer
      onCategory={navShop}
      onContact={() => setPage("contact")}
      onLogin={handleLoginClick}
      onAbout={() => goSection("about")}
    />
  );

  return (
    <div className="page-bg">
      <Navbar
        setPage={setPage}
        count={count}
        user={user}
        category={navActive}
        onHome={goHome}
        onCategory={navShop}
        onAbout={() => goSection("about")}
        onLoginClick={handleLoginClick}
        onCartClick={handleCartClick}
        onLogout={handleLogout}
      />

      {notice && <div className="toast">{notice}</div>}

      {page === "home" && (
        <>
          <Hero onShop={() => goShop()} onFind={() => goSection("offers")} />
          <SocialIcons />
          <PromoCards onShop={goShop} />
          <Products addToCart={addToCart} onShop={() => goShop()} />
          <About />
          {footer}
        </>
      )}

      {page === "shop" && (
        <>
          <Shop
            filters={filters}
            setFilters={setFilters}
            addToCart={addToCart}
            cartCount={count}
            onCart={() => setPage("cart")}
            onCheckout={() => setPage("checkout")}
          />
          {footer}
        </>
      )}

      {page === "contact" && <Contact />}

      {page === "login" && <Login onLogin={handleLogin} />}

      {page === "dashboard" && (
        <Dashboard
          user={user}
          cartCount={count}
          orders={orders}
          setPage={setPage}
          onLogout={handleLogout}
        />
      )}

      {page === "admin-dashboard" && <AdminDashboard onLogout={handleLogout} />}

      {page === "cart" && (
        <Cart
          items={cart}
          changeQty={changeQty}
          removeItem={removeItem}
          setPage={setPage}
        />
      )}

      {page === "checkout" && (
        <Checkout items={cart} placeOrder={placeOrder} setPage={setPage} />
      )}

      {page === "success" && (
        <section className="panel center">
          <h2>Order placed</h2>
          <p>Thank you! Your order has been saved in your dashboard.</p>

          <div className="btn-row center-row">
            <button
              className="btn btn-dark"
              onClick={() => setPage("dashboard")}
            >
              View my orders
            </button>

            <button className="btn btn-dark" onClick={() => goShop()}>
              Keep shopping
            </button>
          </div>
        </section>
      )}
    </div>
  );
}
