import { useState } from "react";
import { loginUser, registerUser } from "../api";

export default function Login({
  onLogin = () => {},
  onForgotPassword = () => {},
}) {
  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");

    const cleanEmail = email.trim().toLowerCase();

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;

    if (!emailPattern.test(cleanEmail)) {
      setMsg("Please enter a valid email address.");
      return;
    }

    if (isSignup && password.length < 8) {
      setMsg("Password must contain at least 8 characters.");
      return;
    }

    setLoading(true);

    try {
      const data = isSignup
        ? await registerUser(name.trim(), cleanEmail, password)
        : await loginUser(cleanEmail, password)
      onLogin(data);
    } catch (err) {
      setMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="auth-page">
      <div className="auth-card">
        <h2>{isSignup ? "Create account" : "Welcome back"}</h2>

        <p className="auth-sub">
          {isSignup
            ? "Sign up to start shopping."
            : "Log in to see your cart and orders."}
        </p>

        <form onSubmit={handleSubmit}>
          {isSignup && (
            <input
              type="text"
              placeholder="Full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          )}

          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type={show ? "text" : "password"}
            placeholder="Password (at least 8 characters)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <label className="show-pass">
            <input
              type="checkbox"
              checked={show}
              onChange={() => setShow(!show)}
            />
            Show password
          </label>

          {!isSignup && (
            <p className="forgot-password-link">
              <a onClick={onForgotPassword}>Forgot Password?</a>
            </p>
          )}

          {msg && <p className="auth-error">{msg}</p>}

          <button className="btn btn-dark auth-btn" disabled={loading}>
            {loading ? "Please wait..." : isSignup ? "Sign up" : "Log in"}
          </button>
        </form>

        <p className="auth-switch">
          {isSignup ? "Already have an account?" : "New here?"}{" "}
          <a
            onClick={() => {
              setIsSignup(!isSignup);
              setMsg("");
            }}
          >
            {isSignup ? "Log in" : "Create an account"}
          </a>
        </p>
      </div>
    </section>
  );
}
