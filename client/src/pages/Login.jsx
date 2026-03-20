import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      login(res.data.user, res.data.token);

      // Redirect based on role
      if (res.data.user.role === "admin") {
        navigate("/admin");
      } else if (res.data.user.role === "counselor") {
        navigate("/counselor");
      } else {
        navigate("/home");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #ede9fe, #ddd6fe)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          background: "white",
          borderRadius: 20,
          padding: "40px",
          width: "100%",
          maxWidth: 400,
          boxShadow: "0 4px 24px rgba(99,102,241,0.15)",
        }}
      >
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>🧠</div>
          <h1
            style={{
              fontSize: 24,
              fontWeight: 700,
              color: "#4c1d95",
              margin: "8px 0 4px",
            }}
          >
            Mind-Care Hub
          </h1>
          <p style={{ color: "#6b7280", fontSize: 14 }}>Welcome back</p>
        </div>

        {/* Error */}
        {error && (
          <div
            style={{
              background: "#fee2e2",
              color: "#dc2626",
              padding: "10px 16px",
              borderRadius: 10,
              marginBottom: 16,
              fontSize: 14,
            }}
          >
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: 16 }}>
            <label
              style={{
                fontSize: 14,
                fontWeight: 500,
                color: "#374151",
                display: "block",
                marginBottom: 6,
              }}
            >
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              style={{
                width: "100%",
                padding: "10px 14px",
                borderRadius: 10,
                border: "1px solid #e5e7eb",
                fontSize: 14,
                boxSizing: "border-box",
                outline: "none",
              }}
            />
          </div>

          <div style={{ marginBottom: 24 }}>
            <label
              style={{
                fontSize: 14,
                fontWeight: 500,
                color: "#374151",
                display: "block",
                marginBottom: 6,
              }}
            >
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              style={{
                width: "100%",
                padding: "10px 14px",
                borderRadius: 10,
                border: "1px solid #e5e7eb",
                fontSize: 14,
                boxSizing: "border-box",
                outline: "none",
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "12px",
              background: loading ? "#a5b4fc" : "#6366f1",
              color: "white",
              border: "none",
              borderRadius: 10,
              fontSize: 15,
              fontWeight: 600,
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Register link */}
        <p
          style={{
            textAlign: "center",
            marginTop: 20,
            fontSize: 14,
            color: "#6b7280",
          }}
        >
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            style={{ color: "#6366f1", fontWeight: 600, cursor: "pointer" }}
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;
