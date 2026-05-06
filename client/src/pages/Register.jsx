// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import API from "../api";

// function Register() {
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [role, setRole] = useState("user");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     try {
//       await API.post("/api/auth/register", {
//         username,
//         email,
//         password,
//         role,
//       });
//       navigate("/login");
//     } catch (err) {
//       setError(err.response?.data?.message || "Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <h1>Register</h1>
//       {error && <p>{error}</p>}

//       <form onSubmit={handleRegister}>
//         <input
//           type="text"
//           placeholder="Username"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           required
//         />
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />

//         <select value={role} onChange={(e) => setRole(e.target.value)}>
//           <option value="user">User</option>
//           <option value="counselor">Counselor</option>
//           <option value="admin">Admin</option>
//         </select>

//         <button type="submit" disabled={loading}>
//           {loading ? "Registering..." : "Register"}
//         </button>
//       </form>

//       <p>
//         Already have an account?{" "}
//         <span onClick={() => navigate("/login")}>Login</span>
//       </p>
//     </div>
//   );
// }

// export default Register;
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import API from "../api";

// function Register() {
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [role, setRole] = useState("user");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");
//     try {
//       await API.post("/api/auth/register", {
//         username,
//         email,
//         password,
//         role,
//       });
//       navigate("/login");
//     } catch (err) {
//       setError(err.response?.data?.message || "Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const roles = [
//     { value: "user", label: "User", icon: "🌿" },
//     { value: "counselor", label: "Counselor", icon: "🩺" },
//     // { value: "admin", label: "Admin", icon: "🛡️" },
//   ];

//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');
//         * { margin: 0; padding: 0; box-sizing: border-box; }

//         .reg-root {
//           height: 100vh;
//           overflow: hidden;
//           font-family: 'DM Sans', sans-serif;
//           display: grid;
//           grid-template-columns: 1fr 1fr;
//         }

//         /* LEFT */
//         .reg-left {
//           background: linear-gradient(160deg, #1a6b4a 0%, #2d9e70 55%, #3ab87f 100%);
//           display: flex;
//           flex-direction: column;
//           justify-content: space-between;
//           padding: 36px 44px;
//           position: relative;
//           overflow: hidden;
//         }
//         .reg-left::before {
//           content: '';
//           position: absolute;
//           top: -80px; right: -80px;
//           width: 300px; height: 300px;
//           background: rgba(255,255,255,0.06);
//           border-radius: 50%;
//         }
//         .reg-left::after {
//           content: '';
//           position: absolute;
//           bottom: -60px; left: -60px;
//           width: 240px; height: 240px;
//           background: rgba(255,255,255,0.04);
//           border-radius: 50%;
//         }
//         .reg-logo {
//           display: flex; align-items: center; gap: 10px;
//           cursor: pointer; z-index: 1;
//         }
//         .reg-logo-icon {
//           width: 38px; height: 38px;
//           background: rgba(255,255,255,0.2);
//           border-radius: 10px;
//           display: flex; align-items: center; justify-content: center;
//           font-size: 18px;
//         }
//         .reg-logo-text {
//           font-family: 'Fraunces', serif;
//           font-size: 20px; color: #fff; font-weight: 600;
//         }
//         .reg-left-body { z-index: 1; }
//         .reg-left-body h1 {
//           font-family: 'Fraunces', serif;
//           font-size: 38px; font-weight: 700; color: #fff;
//           line-height: 1.15; margin-bottom: 16px;
//         }
//         .reg-left-body h1 em { font-style: italic; color: rgba(255,255,255,0.75); }
//         .reg-left-body p {
//           font-size: 15px; color: rgba(255,255,255,0.75);
//           font-weight: 300; line-height: 1.6; max-width: 320px;
//         }
//         .reg-badges { display: flex; flex-direction: column; gap: 10px; margin-top: 28px; }
//         .reg-badge { display: flex; align-items: center; gap: 10px; font-size: 13px; color: rgba(255,255,255,0.85); }
//         .reg-badge-dot { width: 7px; height: 7px; background: rgba(255,255,255,0.6); border-radius: 50%; flex-shrink: 0; }
//         .reg-left-footer { font-size: 13px; color: rgba(255,255,255,0.45); z-index: 1; }

//         /* RIGHT */
//         .reg-right {
//           background: #f6faf7;
//           display: flex; flex-direction: column; justify-content: center;
//           padding: 36px 48px;
//         }
//         .reg-right-header {
//           display: flex; justify-content: flex-end;
//           margin-bottom: 24px; font-size: 13px; color: #6b7280;
//         }
//         .reg-right-header span { color: #2d9e70; font-weight: 600; cursor: pointer; }
//         .reg-right-header span:hover { color: #1a6b4a; }
//         .reg-title {
//           font-family: 'Fraunces', serif;
//           font-size: 26px; font-weight: 700; color: #1a3d2b; margin-bottom: 4px;
//         }
//         .reg-sub { font-size: 13px; color: #6b7280; font-weight: 300; margin-bottom: 20px; }

//         .reg-error {
//           background: #fef2f2; border: 1px solid #fecaca;
//           border-radius: 10px; padding: 10px 14px;
//           font-size: 13px; color: #dc2626; margin-bottom: 14px;
//         }

//         .reg-row {
//           display: grid; grid-template-columns: 1fr 1fr;
//           gap: 14px; margin-bottom: 14px;
//         }
//         .reg-field { margin-bottom: 14px; }
//         .reg-label {
//           display: block; font-size: 11px; font-weight: 600;
//           color: #374151; margin-bottom: 6px;
//           letter-spacing: 0.5px; text-transform: uppercase;
//         }
//         .reg-input {
//           width: 100%; padding: 11px 14px;
//           border: 1.5px solid #e5e7eb; border-radius: 10px;
//           font-size: 13.5px; font-family: 'DM Sans', sans-serif;
//           color: #1f2937; background: #fff;
//           transition: all 0.2s; outline: none;
//         }
//         .reg-input:focus {
//           border-color: #2d9e70;
//           box-shadow: 0 0 0 3px rgba(45,158,112,0.1);
//         }
//         .reg-input::placeholder { color: #9ca3af; }

//         /* Role pills */
//         .reg-role-label {
//           font-size: 11px; font-weight: 600; color: #374151;
//           margin-bottom: 8px; display: block;
//           letter-spacing: 0.5px; text-transform: uppercase;
//         }
//         .reg-roles { display: flex; gap: 10px; margin-bottom: 20px; }
//         .reg-role {
//           flex: 1; padding: 10px 12px;
//           border: 1.5px solid #e5e7eb; border-radius: 10px;
//           cursor: pointer; text-align: center;
//           transition: all 0.2s; background: #fff;
//         }
//         .reg-role:hover { border-color: #2d9e70; background: #f0faf5; }
//         .reg-role.active {
//           border-color: #2d9e70; background: #f0faf5;
//           box-shadow: 0 0 0 3px rgba(45,158,112,0.1);
//         }
//         .reg-role-ico { font-size: 20px; margin-bottom: 4px; }
//         .reg-role-name { font-size: 12px; font-weight: 600; color: #1f2937; }

//         .reg-btn {
//           width: 100%; padding: 13px;
//           background: linear-gradient(135deg, #1a6b4a, #2d9e70);
//           color: #fff; border: none; border-radius: 10px;
//           font-size: 14px; font-weight: 600;
//           font-family: 'DM Sans', sans-serif;
//           cursor: pointer; transition: all 0.3s;
//           box-shadow: 0 4px 16px rgba(45,158,112,0.3);
//           display: flex; align-items: center; justify-content: center; gap: 8px;
//         }
//         .reg-btn:hover:not(:disabled) {
//           transform: translateY(-2px);
//           box-shadow: 0 8px 24px rgba(45,158,112,0.4);
//         }
//         .reg-btn:disabled { opacity: 0.7; cursor: not-allowed; }

//         .reg-spinner {
//           width: 14px; height: 14px;
//           border: 2px solid rgba(255,255,255,0.4);
//           border-top-color: #fff; border-radius: 50%;
//           animation: spin 0.7s linear infinite;
//         }
//         @keyframes spin { to { transform: rotate(360deg); } }

//         .reg-terms {
//           text-align: center; font-size: 11.5px;
//           color: #9ca3af; margin-top: 12px; line-height: 1.5;
//         }

//         @media (max-width: 768px) {
//           .reg-root { grid-template-columns: 1fr; height: auto; overflow: auto; }
//           .reg-left { display: none; }
//           .reg-right { padding: 32px 24px; min-height: 100vh; }
//           .reg-row { grid-template-columns: 1fr; }
//         }
//       `}</style>

//       <div className="reg-root">
//         {/* LEFT */}
//         <div className="reg-left">
//           <div className="reg-logo" onClick={() => navigate("/home")}>
//             <div className="reg-logo-icon">🌿</div>
//             <span className="reg-logo-text">Mind Care Hub</span>
//           </div>
//           <div className="reg-left-body">
//             <h1>
//               Your mind deserves <em>gentle</em> care
//             </h1>
//             <p>
//               Join a safe, anonymous community built for mental well-being.
//               Connect with peers and verified professionals.
//             </p>
//             <div className="reg-badges">
//               <div className="reg-badge">
//                 <div className="reg-badge-dot" /> 100% Anonymous posting
//               </div>
//               <div className="reg-badge">
//                 <div className="reg-badge-dot" /> Verified counselors &
//                 therapists
//               </div>
//               <div className="reg-badge">
//                 <div className="reg-badge-dot" /> Daily mood tracking & insights
//               </div>
//               <div className="reg-badge">
//                 <div className="reg-badge-dot" /> Private & secure platform
//               </div>
//             </div>
//           </div>
//           <div className="reg-left-footer">
//             © 2025 Mind Care Hub. All rights reserved.
//           </div>
//         </div>

//         {/* RIGHT */}
//         <div className="reg-right">
//           <div className="reg-right-header">
//             Already have an account?&nbsp;
//             <span onClick={() => navigate("/login")}>Sign in</span>
//           </div>

//           <h2 className="reg-title">Create your account</h2>
//           <p className="reg-sub">Get started for free in less than a minute</p>

//           {error && <div className="reg-error">⚠️ {error}</div>}

//           <form onSubmit={handleRegister}>
//             <div className="reg-row">
//               <div>
//                 <label className="reg-label">Username</label>
//                 <input
//                   className="reg-input"
//                   type="text"
//                   placeholder="Your username"
//                   value={username}
//                   onChange={(e) => setUsername(e.target.value)}
//                   required
//                 />
//               </div>
//               <div>
//                 <label className="reg-label">Email</label>
//                 <input
//                   className="reg-input"
//                   type="email"
//                   placeholder="Your email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   required
//                 />
//               </div>
//             </div>

//             <div className="reg-field">
//               <label className="reg-label">Password</label>
//               <input
//                 className="reg-input"
//                 type="password"
//                 placeholder="Create a password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//               />
//             </div>

//             <span className="reg-role-label">Select your role</span>
//             <div className="reg-roles">
//               {roles.map((r) => (
//                 <div
//                   key={r.value}
//                   className={`reg-role ${role === r.value ? "active" : ""}`}
//                   onClick={() => setRole(r.value)}
//                 >
//                   <div className="reg-role-ico">{r.icon}</div>
//                   <div className="reg-role-name">{r.label}</div>
//                 </div>
//               ))}
//             </div>

//             <button type="submit" className="reg-btn" disabled={loading}>
//               {loading ? (
//                 <>
//                   <div className="reg-spinner" /> Creating account...
//                 </>
//               ) : (
//                 "Create Account →"
//               )}
//             </button>
//           </form>

//           <p className="reg-terms">
//             By signing up you agree to our Terms of Service and Privacy Policy.
//           </p>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Register;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import emailjs from "@emailjs/browser";

const EMAILJS_SERVICE_ID = "service_hnbtoyg";
const EMAILJS_TEMPLATE_ID = "template_033ptii";
const EMAILJS_PUBLIC_KEY = "ethQ2QJgBLNexOkOx";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // OTP states
  const [step, setStep] = useState("form"); // "form" | "otp"
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [enteredOtp, setEnteredOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  const [otpLoading, setOtpLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);

  const navigate = useNavigate();

  const startResendTimer = () => {
    setResendTimer(30);
    const interval = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const sendOtp = async () => {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(otp);

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          to_name: username,
          to_email: email,
          otp: otp,
        },
        EMAILJS_PUBLIC_KEY
      );
      return true;
    } catch (err) {
      console.error("EmailJS error:", err);
      return false;
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const sent = await sendOtp();
    if (!sent) {
      setError("Failed to send OTP. Please check your email and try again.");
      setLoading(false);
      return;
    }

    setStep("otp");
    startResendTimer();
    setLoading(false);
  };

  const handleVerifyOtp = async () => {
    if (enteredOtp !== generatedOtp) {
      setOtpError("❌ Wrong OTP. Please try again.");
      return;
    }

    setOtpLoading(true);
    setOtpError("");

    try {
      await API.post("/api/auth/register", {
        username,
        email,
        password,
        role,
      });
      navigate("/login");
    } catch (err) {
      setOtpError(err.response?.data?.message || "Registration failed.");
    } finally {
      setOtpLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (resendTimer > 0) return;
    setOtpError("");
    setEnteredOtp("");
    const sent = await sendOtp();
    if (sent) startResendTimer();
    else setOtpError("Failed to resend OTP. Try again.");
  };

  const roles = [
    { value: "user", label: "User", icon: "🌿" },
    { value: "counselor", label: "Counselor", icon: "🩺" },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        .reg-root {
          height: 100vh; overflow: hidden;
          font-family: 'DM Sans', sans-serif;
          display: grid; grid-template-columns: 1fr 1fr;
        }
        .reg-left {
          background: linear-gradient(160deg, #1a6b4a 0%, #2d9e70 55%, #3ab87f 100%);
          display: flex; flex-direction: column;
          justify-content: space-between;
          padding: 36px 44px; position: relative; overflow: hidden;
        }
        .reg-left::before {
          content: ''; position: absolute;
          top: -80px; right: -80px;
          width: 300px; height: 300px;
          background: rgba(255,255,255,0.06); border-radius: 50%;
        }
        .reg-left::after {
          content: ''; position: absolute;
          bottom: -60px; left: -60px;
          width: 240px; height: 240px;
          background: rgba(255,255,255,0.04); border-radius: 50%;
        }
        .reg-logo {
          display: flex; align-items: center; gap: 10px;
          cursor: pointer; z-index: 1;
        }
        .reg-logo-icon {
          width: 38px; height: 38px;
          background: rgba(255,255,255,0.2);
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          font-size: 18px;
        }
        .reg-logo-text {
          font-family: 'Fraunces', serif;
          font-size: 20px; color: #fff; font-weight: 600;
        }
        .reg-left-body { z-index: 1; }
        .reg-left-body h1 {
          font-family: 'Fraunces', serif;
          font-size: 38px; font-weight: 700; color: #fff;
          line-height: 1.15; margin-bottom: 16px;
        }
        .reg-left-body h1 em { font-style: italic; color: rgba(255,255,255,0.75); }
        .reg-left-body p {
          font-size: 15px; color: rgba(255,255,255,0.75);
          font-weight: 300; line-height: 1.6; max-width: 320px;
        }
        .reg-badges { display: flex; flex-direction: column; gap: 10px; margin-top: 28px; }
        .reg-badge { display: flex; align-items: center; gap: 10px; font-size: 13px; color: rgba(255,255,255,0.85); }
        .reg-badge-dot { width: 7px; height: 7px; background: rgba(255,255,255,0.6); border-radius: 50%; flex-shrink: 0; }
        .reg-left-footer { font-size: 13px; color: rgba(255,255,255,0.45); z-index: 1; }
        .reg-right {
          background: #f6faf7;
          display: flex; flex-direction: column; justify-content: center;
          padding: 36px 48px;
        }
        .reg-right-header {
          display: flex; justify-content: flex-end;
          margin-bottom: 24px; font-size: 13px; color: #6b7280;
        }
        .reg-right-header span { color: #2d9e70; font-weight: 600; cursor: pointer; }
        .reg-right-header span:hover { color: #1a6b4a; }
        .reg-title {
          font-family: 'Fraunces', serif;
          font-size: 26px; font-weight: 700; color: #1a3d2b; margin-bottom: 4px;
        }
        .reg-sub { font-size: 13px; color: #6b7280; font-weight: 300; margin-bottom: 20px; }
        .reg-error {
          background: #fef2f2; border: 1px solid #fecaca;
          border-radius: 10px; padding: 10px 14px;
          font-size: 13px; color: #dc2626; margin-bottom: 14px;
        }
        .reg-row {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 14px; margin-bottom: 14px;
        }
        .reg-field { margin-bottom: 14px; }
        .reg-label {
          display: block; font-size: 11px; font-weight: 600;
          color: #374151; margin-bottom: 6px;
          letter-spacing: 0.5px; text-transform: uppercase;
        }
        .reg-input {
          width: 100%; padding: 11px 14px;
          border: 1.5px solid #e5e7eb; border-radius: 10px;
          font-size: 13.5px; font-family: 'DM Sans', sans-serif;
          color: #1f2937; background: #fff;
          transition: all 0.2s; outline: none;
        }
        .reg-input:focus {
          border-color: #2d9e70;
          box-shadow: 0 0 0 3px rgba(45,158,112,0.1);
        }
        .reg-input::placeholder { color: #9ca3af; }
        .reg-role-label {
          font-size: 11px; font-weight: 600; color: #374151;
          margin-bottom: 8px; display: block;
          letter-spacing: 0.5px; text-transform: uppercase;
        }
        .reg-roles { display: flex; gap: 10px; margin-bottom: 20px; }
        .reg-role {
          flex: 1; padding: 10px 12px;
          border: 1.5px solid #e5e7eb; border-radius: 10px;
          cursor: pointer; text-align: center;
          transition: all 0.2s; background: #fff;
        }
        .reg-role:hover { border-color: #2d9e70; background: #f0faf5; }
        .reg-role.active {
          border-color: #2d9e70; background: #f0faf5;
          box-shadow: 0 0 0 3px rgba(45,158,112,0.1);
        }
        .reg-role-ico { font-size: 20px; margin-bottom: 4px; }
        .reg-role-name { font-size: 12px; font-weight: 600; color: #1f2937; }
        .reg-btn {
          width: 100%; padding: 13px;
          background: linear-gradient(135deg, #1a6b4a, #2d9e70);
          color: #fff; border: none; border-radius: 10px;
          font-size: 14px; font-weight: 600;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer; transition: all 0.3s;
          box-shadow: 0 4px 16px rgba(45,158,112,0.3);
          display: flex; align-items: center; justify-content: center; gap: 8px;
        }
        .reg-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(45,158,112,0.4);
        }
        .reg-btn:disabled { opacity: 0.7; cursor: not-allowed; }
        .reg-spinner {
          width: 14px; height: 14px;
          border: 2px solid rgba(255,255,255,0.4);
          border-top-color: #fff; border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        .reg-terms {
          text-align: center; font-size: 11.5px;
          color: #9ca3af; margin-top: 12px; line-height: 1.5;
        }

        /* OTP STEP */
        .otp-box {
          display: flex; flex-direction: column;
          align-items: center; text-align: center;
        }
        .otp-icon {
          font-size: 48px; margin-bottom: 16px;
        }
        .otp-title {
          font-family: 'Fraunces', serif;
          font-size: 24px; font-weight: 700;
          color: #1a3d2b; margin-bottom: 6px;
        }
        .otp-sub {
          font-size: 13px; color: #6b7280;
          margin-bottom: 6px; line-height: 1.5;
        }
        .otp-email {
          font-size: 13px; font-weight: 600;
          color: #2d9e70; margin-bottom: 24px;
        }
        .otp-inputs {
          display: flex; gap: 10px;
          justify-content: center; margin-bottom: 20px;
        }
        .otp-input {
          width: 48px; height: 56px;
          border: 1.5px solid #e5e7eb; border-radius: 12px;
          font-size: 22px; font-weight: 700;
          text-align: center; color: #1a3d2b;
          background: #fff; outline: none;
          transition: all 0.2s;
          font-family: 'DM Sans', sans-serif;
        }
        .otp-input:focus {
          border-color: #2d9e70;
          box-shadow: 0 0 0 3px rgba(45,158,112,0.12);
        }
        .otp-error {
          background: #fef2f2; border: 1px solid #fecaca;
          border-radius: 10px; padding: 10px 14px;
          font-size: 13px; color: #dc2626;
          margin-bottom: 16px; width: 100%;
          text-align: center;
        }
        .otp-resend {
          font-size: 13px; color: #6b7280; margin-top: 14px;
        }
        .otp-resend span {
          color: #2d9e70; font-weight: 600; cursor: pointer;
        }
        .otp-resend span.disabled {
          color: #9ca3af; cursor: not-allowed;
        }
        .otp-back {
          font-size: 13px; color: #6b7280;
          margin-top: 10px; cursor: pointer;
        }
        .otp-back:hover { color: #1a3d2b; }

        @media (max-width: 768px) {
          .reg-root { grid-template-columns: 1fr; height: auto; overflow: auto; }
          .reg-left { display: none; }
          .reg-right { padding: 32px 24px; min-height: 100vh; }
          .reg-row { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="reg-root">
        {/* LEFT — same as before */}
        <div className="reg-left">
          <div className="reg-logo" onClick={() => navigate("/home")}>
            <div className="reg-logo-icon">🌿</div>
            <span className="reg-logo-text">Mind Care Hub</span>
          </div>
          <div className="reg-left-body">
            <h1>
              Your mind deserves <em>gentle</em> care
            </h1>
            <p>
              Join a safe, anonymous community built for mental well-being.
              Connect with peers and verified professionals.
            </p>
            <div className="reg-badges">
              <div className="reg-badge">
                <div className="reg-badge-dot" /> 100% Anonymous posting
              </div>
              <div className="reg-badge">
                <div className="reg-badge-dot" /> Verified counselors &
                therapists
              </div>
              <div className="reg-badge">
                <div className="reg-badge-dot" /> Daily mood tracking & insights
              </div>
              <div className="reg-badge">
                <div className="reg-badge-dot" /> Private & secure platform
              </div>
            </div>
          </div>
          <div className="reg-left-footer">
            © 2025 Mind Care Hub. All rights reserved.
          </div>
        </div>

        {/* RIGHT */}
        <div className="reg-right">
          {step === "form" && (
            <>
              <div className="reg-right-header">
                Already have an account?&nbsp;
                <span onClick={() => navigate("/login")}>Sign in</span>
              </div>
              <h2 className="reg-title">Create your account</h2>
              <p className="reg-sub">
                Get started for free in less than a minute
              </p>
              {error && <div className="reg-error">⚠️ {error}</div>}
              <form onSubmit={handleRegister}>
                <div className="reg-row">
                  <div>
                    <label className="reg-label">Username</label>
                    <input
                      className="reg-input"
                      type="text"
                      placeholder="Your username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="reg-label">Email</label>
                    <input
                      className="reg-input"
                      type="email"
                      placeholder="Your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="reg-field">
                  <label className="reg-label">Password</label>
                  <input
                    className="reg-input"
                    type="password"
                    placeholder="Create a password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <span className="reg-role-label">Select your role</span>
                <div className="reg-roles">
                  {roles.map((r) => (
                    <div
                      key={r.value}
                      className={`reg-role ${role === r.value ? "active" : ""}`}
                      onClick={() => setRole(r.value)}
                    >
                      <div className="reg-role-ico">{r.icon}</div>
                      <div className="reg-role-name">{r.label}</div>
                    </div>
                  ))}
                </div>
                <button type="submit" className="reg-btn" disabled={loading}>
                  {loading ? (
                    <>
                      <div className="reg-spinner" /> Sending OTP...
                    </>
                  ) : (
                    "Send OTP →"
                  )}
                </button>
              </form>
              <p className="reg-terms">
                By signing up you agree to our Terms of Service and Privacy
                Policy.
              </p>
            </>
          )}

          {step === "otp" && (
            <div className="otp-box">
              <div className="otp-icon">📬</div>
              <h2 className="otp-title">Check your email</h2>
              <p className="otp-sub">We sent a 6-digit OTP to</p>
              <p className="otp-email">{email}</p>

              <div className="otp-inputs">
                {Array.from({ length: 6 }).map((_, i) => (
                  <input
                    key={i}
                    id={`otp-${i}`}
                    className="otp-input"
                    type="text"
                    maxLength={1}
                    value={enteredOtp[i] || ""}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/, "");
                      const arr = enteredOtp.split("");
                      arr[i] = val;
                      setEnteredOtp(arr.join(""));
                      if (val && i < 5)
                        document.getElementById(`otp-${i + 1}`)?.focus();
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Backspace" && !enteredOtp[i] && i > 0)
                        document.getElementById(`otp-${i - 1}`)?.focus();
                    }}
                  />
                ))}
              </div>

              {otpError && <div className="otp-error">{otpError}</div>}

              <button
                className="reg-btn"
                onClick={handleVerifyOtp}
                disabled={otpLoading || enteredOtp.length < 6}
                style={{ width: "100%" }}
              >
                {otpLoading ? (
                  <>
                    <div className="reg-spinner" /> Verifying...
                  </>
                ) : (
                  "Verify & Create Account →"
                )}
              </button>

              <p className="otp-resend">
                Didn't get it?&nbsp;
                <span
                  className={resendTimer > 0 ? "disabled" : ""}
                  onClick={handleResendOtp}
                >
                  {resendTimer > 0 ? `Resend in ${resendTimer}s` : "Resend OTP"}
                </span>
              </p>
              <p className="otp-back" onClick={() => setStep("form")}>
                ← Back to form
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Register;
