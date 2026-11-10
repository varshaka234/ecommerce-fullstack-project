
import { useState } from "react";
import { resetPassword } from "../api";

export default function ResetPassword({ uid, token, onBack }) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMsg("");
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const data = await resetPassword(uid, token, password);
      setMsg(data.message);
      setPassword("");
      setConfirmPassword("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="auth-page">
      <div className="auth-card">
        <h2>Reset Password</h2>

        <p className="auth-sub">
          Enter your new password below.
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="New password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={8}
          />

          <input
            type="password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            minLength={8}
            autoComplete="new-password"
          />

          {msg && <p className="auth-success">{msg}</p>}
          {error && <p className="auth-error">{error}</p>}

          {msg ? (
            <button
              type="button"
              className="btn btn-dark auth-btn"
              onClick={onBack}
            >
              Back to Login
            </button>
          ) : (
            <button
              className="btn btn-dark auth-btn"
              disabled={loading}
            >
              {loading ? "Please wait..." : "Reset Password"}
            </button>
          )}
        </form>
      </div>
    </section>
  );
}
