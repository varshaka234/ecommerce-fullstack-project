
import { useState } from "react";
import { forgotPassword } from "../api";

export default function ForgotPassword({ onBack }) {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    setError("");

    setLoading(true);

    try {
      const data = await forgotPassword(email.trim().toLowerCase());
      setMsg(data.message);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="auth-page">
      <div className="auth-card">
        <h2>Forgot Password?</h2>

        <p className="auth-sub">
          Enter your registered email address to receive a password reset link.
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {msg && <p className="auth-success">{msg}</p>}
          {error && <p className="auth-error">{error}</p>}

          <button className="btn btn-dark auth-btn" disabled={loading}>
            {loading ? "Please wait..." : "Send Reset Link"}
          </button>
        </form>

        <p className="auth-switch">
          <a onClick={onBack}>Back to Login</a>
        </p>
      </div>
    </section>
  );
}
