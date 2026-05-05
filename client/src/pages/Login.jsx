// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { useAuth } from "../context/AuthContext";

// function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const { login } = useAuth();
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     try {
//       const res = await axios.post("http://localhost:5000/api/auth/login", {
//         email,
//         password,
//       });

//       login(res.data.user, res.data.token);

//       // Redirect based on role
//       if (res.data.user.role === "admin") {
//         navigate("/admin");
//       } else if (res.data.user.role === "counselor") {
//         navigate("/counselor");
//       } else {
//         navigate("/home");
//       }
//     } catch (err) {
//       setError(err.response?.data?.message || "Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div
//       style={{
//         minHeight: "100vh",
//         background: "linear-gradient(135deg, #ede9fe, #ddd6fe)",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//       }}
//     >
//       <div
//         style={{
//           background: "white",
//           borderRadius: 20,
//           padding: "40px",
//           width: "100%",
//           maxWidth: 400,
//           boxShadow: "0 4px 24px rgba(99,102,241,0.15)",
//         }}
//       >
//         {/* Header */}
//         <div style={{ textAlign: "center", marginBottom: 32 }}>
//           <div style={{ fontSize: 48 }}>🧠</div>
//           <h1
//             style={{
//               fontSize: 24,
//               fontWeight: 700,
//               color: "#4c1d95",
//               margin: "8px 0 4px",
//             }}
//           >
//             Mind-Care Hub
//           </h1>
//           <p style={{ color: "#6b7280", fontSize: 14 }}>Welcome back</p>
//         </div>

//         {/* Error */}
//         {error && (
//           <div
//             style={{
//               background: "#fee2e2",
//               color: "#dc2626",
//               padding: "10px 16px",
//               borderRadius: 10,
//               marginBottom: 16,
//               fontSize: 14,
//             }}
//           >
//             {error}
//           </div>
//         )}

//         {/* Form */}
//         <form onSubmit={handleLogin}>
//           <div style={{ marginBottom: 16 }}>
//             <label
//               style={{
//                 fontSize: 14,
//                 fontWeight: 500,
//                 color: "#374151",
//                 display: "block",
//                 marginBottom: 6,
//               }}
//             >
//               Email
//             </label>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               placeholder="Enter your email"
//               required
//               style={{
//                 width: "100%",
//                 padding: "10px 14px",
//                 borderRadius: 10,
//                 border: "1px solid #e5e7eb",
//                 fontSize: 14,
//                 boxSizing: "border-box",
//                 outline: "none",
//               }}
//             />
//           </div>

//           <div style={{ marginBottom: 24 }}>
//             <label
//               style={{
//                 fontSize: 14,
//                 fontWeight: 500,
//                 color: "#374151",
//                 display: "block",
//                 marginBottom: 6,
//               }}
//             >
//               Password
//             </label>
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               placeholder="Enter your password"
//               required
//               style={{
//                 width: "100%",
//                 padding: "10px 14px",
//                 borderRadius: 10,
//                 border: "1px solid #e5e7eb",
//                 fontSize: 14,
//                 boxSizing: "border-box",
//                 outline: "none",
//               }}
//             />
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             style={{
//               width: "100%",
//               padding: "12px",
//               background: loading ? "#a5b4fc" : "#6366f1",
//               color: "white",
//               border: "none",
//               borderRadius: 10,
//               fontSize: 15,
//               fontWeight: 600,
//               cursor: loading ? "not-allowed" : "pointer",
//             }}
//           >
//             {loading ? "Logging in..." : "Login"}
//           </button>
//         </form>

//         {/* Register link */}
//         <p
//           style={{
//             textAlign: "center",
//             marginTop: 20,
//             fontSize: 14,
//             color: "#6b7280",
//           }}
//         >
//           Don't have an account?{" "}
//           <span
//             onClick={() => navigate("/register")}
//             style={{ color: "#6366f1", fontWeight: 600, cursor: "pointer" }}
//           >
//             Register
//           </span>
//         </p>
//       </div>
//     </div>
//   );
// }

// export default Login;
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
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&display=swap');

        * {
          box-sizing: border-box;
        }

        .mc-login-wrap {
          display: flex;
          min-height: 100vh;
          font-family: 'DM Sans', sans-serif;
          background: #f5f5f0;
          overflow: hidden;
        }

        /* ── Left Panel ── */
        .mc-left {
          width: 42%;
          background: #2d7a4f;
          padding: 36px 44px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          position: relative;
          overflow: hidden;
        }

        .mc-left::before {
          content: '';
          position: absolute;
          width: 340px;
          height: 340px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.07);
          top: -90px;
          right: -90px;
          pointer-events: none;
        }

        .mc-left::after {
          content: '';
          position: absolute;
          width: 220px;
          height: 220px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.05);
          bottom: 50px;
          left: -60px;
          pointer-events: none;
        }

        .mc-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          color: white;
          z-index: 1;
          text-decoration: none;
        }

        .mc-logo-icon {
          width: 38px;
          height: 38px;
          background: rgba(255, 255, 255, 0.18);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
        }

        .mc-logo-name {
          font-size: 16px;
          font-weight: 600;
          color: white;
        }

        .mc-hero {
          z-index: 1;
        }

        .mc-hero h1 {
          font-family: 'DM Serif Display', serif;
          color: white;
          font-size: 36px;
          line-height: 1.2;
          margin: 0 0 14px 0;
          font-weight: 400;
        }

        .mc-hero h1 em {
          font-style: italic;
          color: #a8e6c5;
        }

        .mc-hero p {
          color: rgba(255, 255, 255, 0.8);
          font-size: 14px;
          line-height: 1.65;
          margin: 0 0 24px 0;
        }

        .mc-features {
          list-style: none;
          padding: 0;
          margin: 0;
          z-index: 1;
        }

        .mc-features li {
          color: rgba(255, 255, 255, 0.85);
          font-size: 13.5px;
          padding: 5px 0;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .mc-features li::before {
          content: '';
          width: 6px;
          height: 6px;
          background: #a8e6c5;
          border-radius: 50%;
          flex-shrink: 0;
        }

        .mc-left-footer {
          color: rgba(255, 255, 255, 0.4);
          font-size: 12px;
          z-index: 1;
        }

        /* ── Right Panel ── */
        .mc-right {
          flex: 1;
          background: #fafaf7;
          padding: 36px 56px;
          display: flex;
          flex-direction: column;
        }

        .mc-top-bar {
          text-align: right;
          font-size: 13.5px;
          color: #6b7280;
        }

        .mc-top-bar span {
          color: #2d7a4f;
          font-weight: 600;
          cursor: pointer;
        }

        .mc-top-bar span:hover {
          text-decoration: underline;
        }

        .mc-form-area {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          max-width: 380px;
          margin: 0 auto;
          width: 100%;
        }

        .mc-form-head {
          margin-bottom: 28px;
        }

        .mc-form-head h2 {
          font-family: 'DM Serif Display', serif;
          font-size: 30px;
          color: #1a2e1a;
          margin: 0 0 4px 0;
          font-weight: 400;
        }

        .mc-form-head p {
          font-size: 13.5px;
          color: #6b7280;
          margin: 0;
        }

        .mc-error-box {
          background: #fee2e2;
          color: #dc2626;
          padding: 10px 14px;
          border-radius: 10px;
          margin-bottom: 16px;
          font-size: 13px;
        }

        .mc-field {
          margin-bottom: 16px;
        }

        .mc-field label {
          display: block;
          font-size: 11.5px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.07em;
          color: #374151;
          margin-bottom: 7px;
        }

        .mc-field input {
          width: 100%;
          padding: 11px 14px;
          border-radius: 10px;
          border: 1.5px solid #e5e7eb;
          font-size: 14px;
          font-family: 'DM Sans', sans-serif;
          background: white;
          color: #1a2e1a;
          outline: none;
          transition: border-color 0.2s;
        }

        .mc-field input:focus {
          border-color: #2d7a4f;
        }

        .mc-field input::placeholder {
          color: #c0c0b8;
        }

        .mc-forgot {
          text-align: right;
          margin-top: -8px;
          margin-bottom: 20px;
        }

        .mc-forgot span {
          font-size: 12.5px;
          color: #2d7a4f;
          font-weight: 500;
          cursor: pointer;
        }

        .mc-forgot span:hover {
          text-decoration: underline;
        }

        .mc-submit-btn {
          width: 100%;
          padding: 13px;
          background: #2d7a4f;
          color: white;
          border: none;
          border-radius: 10px;
          font-size: 15px;
          font-weight: 600;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: background 0.2s, transform 0.1s;
        }

        .mc-submit-btn:hover:not(:disabled) {
          background: #235e3c;
        }

        .mc-submit-btn:active:not(:disabled) {
          transform: scale(0.99);
        }

        .mc-submit-btn:disabled {
          background: #7bbfa0;
          cursor: not-allowed;
        }

        .mc-submit-btn svg {
          width: 16px;
          height: 16px;
          flex-shrink: 0;
        }

        .mc-divider {
          text-align: center;
          font-size: 12px;
          color: #9ca3af;
          margin: 22px 0;
          position: relative;
        }

        .mc-divider::before,
        .mc-divider::after {
          content: '';
          position: absolute;
          top: 50%;
          width: calc(50% - 20px);
          height: 1px;
          background: #e5e7eb;
        }

        .mc-divider::before { left: 0; }
        .mc-divider::after  { right: 0; }

        .mc-register-link {
          text-align: center;
          font-size: 13.5px;
          color: #6b7280;
        }

        .mc-register-link span {
          color: #2d7a4f;
          font-weight: 600;
          cursor: pointer;
        }

        .mc-register-link span:hover {
          text-decoration: underline;
        }

        /* ── Responsive ── */
        @media (max-width: 768px) {
          .mc-login-wrap {
            flex-direction: column;
          }

          .mc-left {
            width: 100%;
            padding: 24px 28px 28px;
            min-height: unset;
          }

          .mc-hero h1 {
            font-size: 26px;
          }

          .mc-hero p,
          .mc-features,
          .mc-left-footer {
            display: none;
          }

          .mc-right {
            padding: 28px 24px 36px;
          }

          .mc-form-area {
            max-width: 100%;
          }
        }

        @media (max-width: 1024px) and (min-width: 769px) {
          .mc-left {
            width: 38%;
            padding: 32px 32px;
          }

          .mc-hero h1 {
            font-size: 28px;
          }

          .mc-right {
            padding: 32px 40px;
          }
        }
      `}</style>

      <div className="mc-login-wrap">
        {/* ── Left Panel ── */}
        <div className="mc-left">
          <div className="mc-logo">
            <div className="mc-logo-icon">🌿</div>
            <span className="mc-logo-name">Mind Care Hub</span>
          </div>

          <div className="mc-hero">
            <h1>
              Your mind deserves <em>gentle</em> care
            </h1>
            <p>
              Join a safe, anonymous community built for mental well-being.
              Connect with peers and verified professionals.
            </p>
            <ul className="mc-features">
              <li>100% Anonymous posting</li>
              <li>Verified counselors &amp; therapists</li>
              <li>Daily mood tracking &amp; insights</li>
              <li>Private &amp; secure platform</li>
            </ul>
          </div>

          <div className="mc-left-footer">
            © 2025 Mind Care Hub. All rights reserved.
          </div>
        </div>

        {/* ── Right Panel ── */}
        <div className="mc-right">
          <div className="mc-top-bar">
            Don't have an account?{" "}
            <span onClick={() => navigate("/register")}>Sign up</span>
          </div>

          <div className="mc-form-area">
            <div className="mc-form-head">
              <h2>Welcome back</h2>
              <p>Sign in to continue your journey</p>
            </div>

            {error && <div className="mc-error-box">{error}</div>}

            <form onSubmit={handleLogin}>
              <div className="mc-field">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  required
                />
              </div>

              <div className="mc-field">
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Your password"
                  required
                />
              </div>

              <div className="mc-forgot">
                <span>Forgot password?</span>
              </div>

              <button
                type="submit"
                className="mc-submit-btn"
                disabled={loading}
              >
                {loading ? "Signing in…" : "Sign in"}
                {!loading && (
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                )}
              </button>
            </form>

            <div className="mc-divider">or</div>

            <div className="mc-register-link">
              Don't have an account?{" "}
              <span onClick={() => navigate("/register")}>Register</span>
            </div>
          </div>

          {/* spacer to balance flex layout */}
          <div />
        </div>
      </div>
    </>
  );
}

export default Login;
