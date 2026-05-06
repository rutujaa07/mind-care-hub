// import { useState, useEffect } from "react";
// import API from "../api";
// import { useAuth } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";
// import Chat from "../components/Chat";

// function Counselor() {
//   const { token, user, logout } = useAuth();
//   const navigate = useNavigate();
//   const [requests, setRequests] = useState([]);
//   const [selectedRequest, setSelectedRequest] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [reply, setReply] = useState("");
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const [activeTab, setActiveTab] = useState("all");

//   const config = { headers: { Authorization: `Bearer ${token}` } };

//   const fetchRequests = async () => {
//     try {
//       const res = await API.get("/api/support", config);
//       setRequests(res.data);
//     } catch {
//       setError("Failed to fetch requests");
//     }
//   };

//   const fetchMessages = async (requestId) => {
//     try {
//       const res = await API.get(
//         `/api/support/${requestId}`,
//         config
//       );
//       setSelectedRequest(requestId);
//       setMessages(res.data.messages);
//     } catch {
//       setError("Failed to fetch messages");
//     }
//   };

//   const handleReply = async (e) => {
//     e.preventDefault();
//     try {
//       await API.post(
//         `/api/support/${selectedRequest}/reply`,
//         { message: reply },
//         config
//       );
//       setReply("");
//       setSuccess("Reply sent!");
//       fetchMessages(selectedRequest);
//       setTimeout(() => setSuccess(""), 3000);
//     } catch {
//       setError("Failed to send reply");
//     }
//   };

//   const handleStatusUpdate = async (requestId, status) => {
//     try {
//       await API.put(
//         `/api/support/${requestId}/status`,
//         { status },
//         config
//       );
//       fetchRequests();
//     } catch {
//       setError("Failed to update status");
//     }
//   };

//   const handleLogout = () => {
//     logout();
//     navigate("/login");
//   };

//   useEffect(() => {
//     fetchRequests();
//   }, []);

//   const statusConfig = {
//     pending: { label: "Pending", bg: "#fef3c7", color: "#92400e" },
//     active: { label: "Active", bg: "#d1fae5", color: "#065f46" },
//     resolved: { label: "Resolved", bg: "#e0e7ff", color: "#3730a3" },
//   };

//   const filtered = requests.filter(
//     (r) => activeTab === "all" || r.status === activeTab
//   );
//   const counts = {
//     all: requests.length,
//     pending: requests.filter((r) => r.status === "pending").length,
//     active: requests.filter((r) => r.status === "active").length,
//     resolved: requests.filter((r) => r.status === "resolved").length,
//   };

//   const selectedReq = requests.find((r) => r._id === selectedRequest);

//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&display=swap');
//         * { box-sizing: border-box; }

//         .coun-page {
//           min-height: 100vh;
//           background: #f5f5f0;
//           font-family: 'DM Sans', sans-serif;
//           display: flex;
//           flex-direction: column;
//         }

//         /* Topbar */
//         .coun-topbar {
//           background: white;
//           border-bottom: 1.5px solid #e9e9e3;
//           padding: 0 24px;
//           height: 64px;
//           display: flex;
//           align-items: center;
//           justify-content: space-between;
//           flex-shrink: 0;
//         }

//         .coun-logo {
//           display: flex; align-items: center; gap: 10px;
//         }
//         .coun-logo-icon {
//           width: 34px; height: 34px;
//           background: #d1fae5; border-radius: 9px;
//           display: flex; align-items: center; justify-content: center;
//           font-size: 17px;
//         }
//         .coun-logo-name {
//           font-family: 'DM Serif Display', serif;
//           font-size: 16px; color: #1a2e1a; font-weight: 400;
//         }

//         .coun-topbar-right {
//           display: flex; align-items: center; gap: 10px;
//         }

//         .coun-nav-btn {
//           padding: 8px 16px;
//           border-radius: 9px;
//           border: 1.5px solid #e5e7eb;
//           background: white;
//           font-family: 'DM Sans', sans-serif;
//           font-size: 13.5px;
//           font-weight: 500;
//           color: #374151;
//           cursor: pointer;
//           transition: background 0.15s;
//         }
//         .coun-nav-btn:hover { background: #f5f5f0; }

//         .coun-logout-btn {
//           padding: 8px 16px;
//           border-radius: 9px;
//           border: none;
//           background: #fee2e2;
//           font-family: 'DM Sans', sans-serif;
//           font-size: 13.5px;
//           font-weight: 500;
//           color: #dc2626;
//           cursor: pointer;
//           transition: background 0.15s;
//         }
//         .coun-logout-btn:hover { background: #fecaca; }

//         /* Body */
//         .coun-body {
//           flex: 1;
//           display: flex;
//           max-width: 1100px;
//           margin: 0 auto;
//           width: 100%;
//           padding: 28px 20px;
//           gap: 20px;
//         }

//         /* Left column */
//         .coun-left {
//           width: 380px;
//           flex-shrink: 0;
//           display: flex;
//           flex-direction: column;
//           gap: 16px;
//         }

//         .coun-welcome {
//           background: linear-gradient(135deg, #2d7a4f, #1a5c38);
//           border-radius: 16px;
//           padding: 20px 22px;
//           color: white;
//         }
//         .coun-welcome h2 {
//           font-family: 'DM Serif Display', serif;
//           font-size: 20px;
//           font-weight: 400;
//           margin: 0 0 4px;
//         }
//         .coun-welcome p {
//           font-size: 13px;
//           color: rgba(255,255,255,0.75);
//           margin: 0;
//         }

//         .coun-stats {
//           display: grid;
//           grid-template-columns: repeat(3, 1fr);
//           gap: 10px;
//         }
//         .coun-stat {
//           background: white;
//           border-radius: 12px;
//           border: 1.5px solid #e9e9e3;
//           padding: 14px;
//           text-align: center;
//         }
//         .coun-stat-val {
//           font-family: 'DM Serif Display', serif;
//           font-size: 24px; color: #1a2e1a;
//           margin: 0 0 2px;
//         }
//         .coun-stat-label {
//           font-size: 11px; color: #9ca3af;
//           text-transform: uppercase; letter-spacing: 0.05em;
//           font-weight: 500;
//         }

//         /* Tabs */
//         .coun-tabs {
//           display: flex;
//           gap: 4px;
//           background: white;
//           border-radius: 12px;
//           border: 1.5px solid #e9e9e3;
//           padding: 5px;
//         }
//         .coun-tab {
//           flex: 1;
//           padding: 7px 4px;
//           border-radius: 8px;
//           border: none;
//           background: transparent;
//           font-family: 'DM Sans', sans-serif;
//           font-size: 12.5px;
//           font-weight: 500;
//           color: #6b7280;
//           cursor: pointer;
//           transition: all 0.15s;
//           display: flex; align-items: center; justify-content: center; gap: 5px;
//         }
//         .coun-tab.active { background: #2d7a4f; color: white; }
//         .coun-tab-badge {
//           font-size: 10px;
//           font-weight: 600;
//           padding: 1px 5px;
//           border-radius: 20px;
//           background: rgba(255,255,255,0.25);
//           color: inherit;
//         }
//         .coun-tab:not(.active) .coun-tab-badge {
//           background: #f0fdf4; color: #2d7a4f;
//         }

//         /* Request list */
//         .coun-req-list {
//           display: flex;
//           flex-direction: column;
//           gap: 8px;
//           max-height: 420px;
//           overflow-y: auto;
//           padding-right: 2px;
//         }
//         .coun-req-list::-webkit-scrollbar { width: 4px; }
//         .coun-req-list::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 4px; }

//         .coun-req-card {
//           background: white;
//           border-radius: 14px;
//           border: 1.5px solid #e9e9e3;
//           padding: 14px 16px;
//           cursor: pointer;
//           transition: all 0.15s;
//         }
//         .coun-req-card:hover { border-color: #2d7a4f; }
//         .coun-req-card.active-card { border-color: #2d7a4f; background: #f0fdf4; }

//         .coun-req-top {
//           display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px;
//         }
//         .coun-req-from {
//           font-size: 14px; font-weight: 600; color: #1a2e1a;
//         }
//         .coun-req-badge {
//           font-size: 11px; font-weight: 600;
//           padding: 3px 9px; border-radius: 20px;
//         }
//         .coun-req-msg {
//           font-size: 13px; color: #6b7280;
//           display: -webkit-box;
//           -webkit-line-clamp: 2;
//           -webkit-box-orient: vertical;
//           overflow: hidden;
//           line-height: 1.4;
//           margin-bottom: 10px;
//         }
//         .coun-req-actions {
//           display: flex; gap: 7px;
//         }
//         .coun-action-btn {
//           padding: 6px 12px;
//           border-radius: 8px;
//           font-size: 12px; font-weight: 500;
//           font-family: 'DM Sans', sans-serif;
//           cursor: pointer;
//           border: none;
//           transition: opacity 0.15s;
//         }
//         .coun-action-btn:hover { opacity: 0.85; }
//         .btn-view { background: #f0fdf4; color: #2d7a4f; }
//         .btn-accept { background: #2d7a4f; color: white; }
//         .btn-resolve { background: #ede9fe; color: #5b21b6; }

//         .coun-empty {
//           text-align: center; color: #9ca3af;
//           font-size: 13.5px; padding: 32px 0;
//         }

//         /* Right panel - thread */
//         .coun-right {
//           flex: 1;
//           display: flex;
//           flex-direction: column;
//           gap: 0;
//           min-width: 0;
//         }

//         .coun-thread-card {
//           background: white;
//           border-radius: 16px;
//           border: 1.5px solid #e9e9e3;
//           display: flex;
//           flex-direction: column;
//           height: 100%;
//           min-height: 500px;
//           overflow: hidden;
//         }

//         .coun-thread-header {
//           padding: 16px 20px;
//           border-bottom: 1.5px solid #f0f0ea;
//           display: flex; align-items: center; gap: 10px;
//         }
//         .coun-thread-avatar {
//           width: 36px; height: 36px;
//           border-radius: 10px;
//           background: #d1fae5; color: #065f46;
//           display: flex; align-items: center; justify-content: center;
//           font-size: 13px; font-weight: 600;
//         }
//         .coun-thread-title {
//           font-size: 15px; font-weight: 600; color: #1a2e1a;
//         }
//         .coun-thread-sub { font-size: 12px; color: #9ca3af; }

//         .coun-thread-msgs {
//           flex: 1;
//           overflow-y: auto;
//           padding: 16px 20px;
//           display: flex;
//           flex-direction: column;
//           gap: 10px;
//         }
//         .coun-thread-msgs::-webkit-scrollbar { width: 4px; }
//         .coun-thread-msgs::-webkit-scrollbar-thumb { background: #e5e7eb; border-radius: 4px; }

//         .coun-msg-row { display: flex; gap: 10px; align-items: flex-start; }
//         .coun-msg-row.right { flex-direction: row-reverse; }

//         .coun-msg-dot {
//           width: 28px; height: 28px;
//           border-radius: 8px;
//           display: flex; align-items: center; justify-content: center;
//           font-size: 11px; font-weight: 600;
//           flex-shrink: 0;
//         }

//         .coun-msg-bubble {
//           max-width: 72%;
//           padding: 9px 13px;
//           border-radius: 14px;
//           font-size: 13.5px;
//           line-height: 1.5;
//           word-break: break-word;
//         }
//         .coun-msg-bubble.user-bubble {
//           background: #f5f5f0;
//           color: #1a2e1a;
//           border-bottom-left-radius: 4px;
//         }
//         .coun-msg-bubble.coun-bubble {
//           background: #2d7a4f;
//           color: white;
//           border-bottom-right-radius: 4px;
//         }

//         .coun-msg-time {
//           font-size: 11px; color: #9ca3af; margin-top: 3px;
//         }

//         .coun-thread-reply {
//           border-top: 1.5px solid #f0f0ea;
//           padding: 14px 16px;
//         }
//         .coun-reply-form {
//           display: flex; gap: 9px; align-items: center;
//           background: #f5f5f0;
//           border-radius: 12px;
//           padding: 8px 8px 8px 14px;
//           border: 1.5px solid #e9e9e3;
//           transition: border-color 0.2s;
//         }
//         .coun-reply-form:focus-within { border-color: #2d7a4f; background: white; }
//         .coun-reply-input {
//           flex: 1; border: none; background: transparent;
//           font-size: 14px; font-family: 'DM Sans', sans-serif;
//           color: #1a2e1a; outline: none;
//         }
//         .coun-reply-input::placeholder { color: #c0c0b8; }
//         .coun-reply-send {
//           width: 34px; height: 34px;
//           border-radius: 9px; background: #2d7a4f;
//           border: none; cursor: pointer;
//           display: flex; align-items: center; justify-content: center;
//           transition: background 0.2s;
//         }
//         .coun-reply-send:hover { background: #235e3c; }
//         .coun-reply-send:disabled { background: #a8d5be; cursor: not-allowed; }

//         .coun-no-thread {
//           display: flex; flex-direction: column;
//           align-items: center; justify-content: center;
//           height: 100%; color: #9ca3af;
//           text-align: center; gap: 10px; padding: 40px;
//         }
//         .coun-no-thread-icon {
//           font-size: 40px; margin-bottom: 6px;
//         }
//         .coun-no-thread h3 {
//           font-family: 'DM Serif Display', serif;
//           font-size: 18px; font-weight: 400; color: #6b7280; margin: 0;
//         }
//         .coun-no-thread p { font-size: 13.5px; margin: 0; max-width: 240px; line-height: 1.5; }

//         .coun-alert {
//           padding: 10px 16px; border-radius: 10px;
//           font-size: 13px; margin: 0 20px 12px;
//         }
//         .coun-alert-error { background: #fee2e2; color: #dc2626; }
//         .coun-alert-success { background: #d1fae5; color: #065f46; }

//         @media (max-width: 768px) {
//           .coun-body { flex-direction: column; padding: 16px; }
//           .coun-left { width: 100%; }
//           .coun-thread-card { min-height: 400px; }
//         }
//       `}</style>

//       <div className="coun-page">
//         {/* Topbar */}
//         <div className="coun-topbar">
//           <div className="coun-logo">
//             <div className="coun-logo-icon">🌿</div>
//             <span className="coun-logo-name">Mind Care Hub</span>
//           </div>
//           <div className="coun-topbar-right">
//             <button
//               className="coun-nav-btn"
//               onClick={() => navigate("/resources")}
//             >
//               Resources
//             </button>
//             <button className="coun-logout-btn" onClick={handleLogout}>
//               Logout
//             </button>
//           </div>
//         </div>

//         <div className="coun-body">
//           {/* Left */}
//           <div className="coun-left">
//             <div className="coun-welcome">
//               <h2>Welcome back, {user?.username} 👋</h2>
//               <p>
//                 You have {counts.pending} pending request
//                 {counts.pending !== 1 ? "s" : ""}
//               </p>
//             </div>

//             <div className="coun-stats">
//               <div className="coun-stat">
//                 <div className="coun-stat-val">{counts.pending}</div>
//                 <div className="coun-stat-label">Pending</div>
//               </div>
//               <div className="coun-stat">
//                 <div className="coun-stat-val">{counts.active}</div>
//                 <div className="coun-stat-label">Active</div>
//               </div>
//               <div className="coun-stat">
//                 <div className="coun-stat-val">{counts.resolved}</div>
//                 <div className="coun-stat-label">Resolved</div>
//               </div>
//             </div>

//             <div className="coun-tabs">
//               {["all", "pending", "active", "resolved"].map((t) => (
//                 <button
//                   key={t}
//                   className={`coun-tab ${activeTab === t ? "active" : ""}`}
//                   onClick={() => setActiveTab(t)}
//                 >
//                   {t.charAt(0).toUpperCase() + t.slice(1)}
//                   <span className="coun-tab-badge">{counts[t]}</span>
//                 </button>
//               ))}
//             </div>

//             {error && (
//               <div className="coun-alert coun-alert-error">{error}</div>
//             )}

//             <div className="coun-req-list">
//               {filtered.length === 0 ? (
//                 <div className="coun-empty">
//                   No {activeTab !== "all" ? activeTab : ""} requests
//                 </div>
//               ) : (
//                 filtered.map((req) => {
//                   const sc = statusConfig[req.status] || statusConfig.pending;
//                   const fromName = req.isAnonymous
//                     ? "Anonymous"
//                     : req.userId?.username || "Unknown";
//                   return (
//                     <div
//                       key={req._id}
//                       className={`coun-req-card ${
//                         selectedRequest === req._id ? "active-card" : ""
//                       }`}
//                     >
//                       <div className="coun-req-top">
//                         <span className="coun-req-from">{fromName}</span>
//                         <span
//                           className="coun-req-badge"
//                           style={{ background: sc.bg, color: sc.color }}
//                         >
//                           {sc.label}
//                         </span>
//                       </div>
//                       <div className="coun-req-msg">{req.initialMessage}</div>
//                       <div className="coun-req-actions">
//                         <button
//                           className="coun-action-btn btn-view"
//                           onClick={() => fetchMessages(req._id)}
//                         >
//                           View Thread
//                         </button>
//                         {req.status === "pending" && (
//                           <button
//                             className="coun-action-btn btn-accept"
//                             onClick={() =>
//                               handleStatusUpdate(req._id, "active")
//                             }
//                           >
//                             Accept
//                           </button>
//                         )}
//                         {req.status === "active" && (
//                           <button
//                             className="coun-action-btn btn-resolve"
//                             onClick={() =>
//                               handleStatusUpdate(req._id, "resolved")
//                             }
//                           >
//                             Resolve
//                           </button>
//                         )}
//                       </div>
//                     </div>
//                   );
//                 })
//               )}
//             </div>
//           </div>

//           {/* Right - Thread */}
//           <div className="coun-right">
//             <div className="coun-thread-card">
//               {!selectedRequest ? (
//                 <div className="coun-no-thread">
//                   <div className="coun-no-thread-icon">💬</div>
//                   <h3>No thread selected</h3>
//                   <p>
//                     Click "View Thread" on a request to start a conversation.
//                   </p>
//                 </div>
//               ) : (
//                 <>
//                   <div className="coun-thread-header">
//                     <div className="coun-thread-avatar">
//                       {(selectedReq?.isAnonymous
//                         ? "AN"
//                         : (selectedReq?.userId?.username || "?").slice(0, 2)
//                       ).toUpperCase()}
//                     </div>
//                     <div>
//                       <div className="coun-thread-title">
//                         {selectedReq?.isAnonymous
//                           ? "Anonymous"
//                           : selectedReq?.userId?.username || "Unknown"}
//                       </div>
//                       <div className="coun-thread-sub">Support thread</div>
//                     </div>
//                   </div>

//                   {success && (
//                     <div className="coun-alert coun-alert-success">
//                       ✓ {success}
//                     </div>
//                   )}

//                   <div className="coun-thread-msgs">
//                     {messages.length === 0 && (
//                       <div
//                         style={{
//                           textAlign: "center",
//                           color: "#9ca3af",
//                           fontSize: 13.5,
//                           padding: "20px 0",
//                         }}
//                       >
//                         No messages yet in this thread.
//                       </div>
//                     )}
//                     {messages.map((msg, i) => {
//                       const isCoun = msg.senderRole === "counselor";
//                       return (
//                         <div
//                           key={i}
//                           className={`coun-msg-row ${isCoun ? "right" : ""}`}
//                         >
//                           <div
//                             className="coun-msg-dot"
//                             style={{
//                               background: isCoun ? "#d1fae5" : "#f5f5f0",
//                               color: isCoun ? "#065f46" : "#6b7280",
//                             }}
//                           >
//                             {isCoun ? "Me" : "U"}
//                           </div>
//                           <div>
//                             <div
//                               className={`coun-msg-bubble ${
//                                 isCoun ? "coun-bubble" : "user-bubble"
//                               }`}
//                             >
//                               {msg.message}
//                             </div>
//                             <div
//                               className="coun-msg-time"
//                               style={{ textAlign: isCoun ? "right" : "left" }}
//                             >
//                               {new Date(msg.createdAt).toLocaleTimeString([], {
//                                 hour: "2-digit",
//                                 minute: "2-digit",
//                               })}
//                             </div>
//                           </div>
//                         </div>
//                       );
//                     })}
//                   </div>

//                   <div className="coun-thread-reply">
//                     <form className="coun-reply-form" onSubmit={handleReply}>
//                       <input
//                         className="coun-reply-input"
//                         type="text"
//                         placeholder="Type your reply…"
//                         value={reply}
//                         onChange={(e) => setReply(e.target.value)}
//                         required
//                       />
//                       <button
//                         className="coun-reply-send"
//                         type="submit"
//                         disabled={!reply.trim()}
//                       >
//                         <svg
//                           width="14"
//                           height="14"
//                           viewBox="0 0 24 24"
//                           fill="none"
//                           stroke="white"
//                           strokeWidth="2.5"
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                         >
//                           <line x1="22" y1="2" x2="11" y2="13" />
//                           <polygon points="22 2 15 22 11 13 2 9 22 2" />
//                         </svg>
//                       </button>
//                     </form>
//                   </div>

//                   {/* Live Chat */}
//                   <Chat roomId={selectedRequest} />
//                 </>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Counselor;
import { useState, useEffect, useRef } from "react";
import API from "../api";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { getSocket } from "../socket";

function Counselor() {
  const { token, user, logout } = useAuth();
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [messages, setMessages] = useState([]);
  const [reply, setReply] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  // Live chat state
  const [liveMessages, setLiveMessages] = useState([]);
  const [liveInput, setLiveInput] = useState("");
  const [liveConnected, setLiveConnected] = useState(false);
  const liveChatEndRef = useRef(null);

  const config = { headers: { Authorization: `Bearer ${token}` } };

  const fetchRequests = async () => {
    try {
      const res = await API.get("/api/support", config);
      setRequests(res.data);
    } catch {
      setError("Failed to fetch requests");
    }
  };

  const fetchMessages = async (requestId) => {
    try {
      const res = await API.get(`/api/support/${requestId}`, config);
      setSelectedRequest(requestId);
      setMessages(res.data.messages);
      setLiveMessages([]);
    } catch {
      setError("Failed to fetch messages");
    }
  };

  const handleReply = async (e) => {
    e.preventDefault();
    try {
      await API.post(
        `/api/support/${selectedRequest}/reply`,
        { message: reply },
        config
      );
      setReply("");
      setSuccess("Reply sent!");
      fetchMessages(selectedRequest);
      setTimeout(() => setSuccess(""), 3000);
    } catch {
      setError("Failed to send reply");
    }
  };

  const handleStatusUpdate = async (requestId, status) => {
    try {
      await API.put(`/api/support/${requestId}/status`, { status }, config);
      fetchRequests();
    } catch {
      setError("Failed to update status");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Socket for live chat
  useEffect(() => {
    if (!selectedRequest) return;
    const socket = getSocket();

    const onConnect = () => {
      setLiveConnected(true);
      socket.emit("join_room", selectedRequest);
    };
    const onDisconnect = () => setLiveConnected(false);
    const onMessage = (data) => setLiveMessages((prev) => [...prev, data]);

    if (socket.connected) onConnect();
    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("receive_message", onMessage);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("receive_message", onMessage);
    };
  }, [selectedRequest]);

  useEffect(() => {
    liveChatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [liveMessages]);

  const handleLiveSend = (e) => {
    e.preventDefault();
    if (!liveInput.trim()) return;
    const socket = getSocket();
    const msg = {
      roomId: selectedRequest,
      message: liveInput,
      sender: user?.username,
      senderId: user?.id,
      createdAt: new Date(),
    };
    socket.emit("send_message", msg);
    setLiveMessages((prev) => [...prev, { ...msg, isMe: true }]);
    setLiveInput("");
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const statusConfig = {
    pending: { label: "Pending", bg: "#fef3c7", color: "#92400e" },
    active: { label: "Active", bg: "#d1fae5", color: "#065f46" },
    resolved: { label: "Resolved", bg: "#e0e7ff", color: "#3730a3" },
  };

  const filtered = requests.filter(
    (r) => activeTab === "all" || r.status === activeTab
  );
  const counts = {
    all: requests.length,
    pending: requests.filter((r) => r.status === "pending").length,
    active: requests.filter((r) => r.status === "active").length,
    resolved: requests.filter((r) => r.status === "resolved").length,
  };

  const selectedReq = requests.find((r) => r._id === selectedRequest);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&display=swap');
        * { box-sizing: border-box; }

        .coun-page {
          min-height: 100vh;
          background: #f5f5f0;
          font-family: 'DM Sans', sans-serif;
          display: flex;
          flex-direction: column;
        }

        .coun-topbar {
          background: white;
          border-bottom: 1.5px solid #e9e9e3;
          padding: 0 24px;
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-shrink: 0;
        }

        .coun-logo { display: flex; align-items: center; gap: 10px; }
        .coun-logo-icon {
          width: 34px; height: 34px;
          background: #d1fae5; border-radius: 9px;
          display: flex; align-items: center; justify-content: center;
          font-size: 17px;
        }
        .coun-logo-name {
          font-family: 'DM Serif Display', serif;
          font-size: 16px; color: #1a2e1a; font-weight: 400;
        }

        .coun-topbar-right { display: flex; align-items: center; gap: 10px; }

        .coun-nav-btn {
          padding: 8px 16px; border-radius: 9px;
          border: 1.5px solid #e5e7eb; background: white;
          font-family: 'DM Sans', sans-serif; font-size: 13.5px;
          font-weight: 500; color: #374151; cursor: pointer;
          transition: background 0.15s;
        }
        .coun-nav-btn:hover { background: #f5f5f0; }

        .coun-logout-btn {
          padding: 8px 16px; border-radius: 9px; border: none;
          background: #fee2e2; font-family: 'DM Sans', sans-serif;
          font-size: 13.5px; font-weight: 500; color: #dc2626;
          cursor: pointer; transition: background 0.15s;
        }
        .coun-logout-btn:hover { background: #fecaca; }

        .coun-body {
          flex: 1; display: flex;
          max-width: 1100px; margin: 0 auto;
          width: 100%; padding: 28px 20px; gap: 20px;
        }

        .coun-left {
          width: 380px; flex-shrink: 0;
          display: flex; flex-direction: column; gap: 16px;
        }

        .coun-welcome {
          background: linear-gradient(135deg, #2d7a4f, #1a5c38);
          border-radius: 16px; padding: 20px 22px; color: white;
        }
        .coun-welcome h2 {
          font-family: 'DM Serif Display', serif;
          font-size: 20px; font-weight: 400; margin: 0 0 4px;
        }
        .coun-welcome p { font-size: 13px; color: rgba(255,255,255,0.75); margin: 0; }

        .coun-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
        .coun-stat {
          background: white; border-radius: 12px;
          border: 1.5px solid #e9e9e3; padding: 14px; text-align: center;
        }
        .coun-stat-val {
          font-family: 'DM Serif Display', serif;
          font-size: 24px; color: #1a2e1a; margin: 0 0 2px;
        }
        .coun-stat-label {
          font-size: 11px; color: #9ca3af;
          text-transform: uppercase; letter-spacing: 0.05em; font-weight: 500;
        }

        .coun-tabs {
          display: flex; gap: 4px; background: white;
          border-radius: 12px; border: 1.5px solid #e9e9e3; padding: 5px;
        }
        .coun-tab {
          flex: 1; padding: 7px 4px; border-radius: 8px; border: none;
          background: transparent; font-family: 'DM Sans', sans-serif;
          font-size: 12.5px; font-weight: 500; color: #6b7280;
          cursor: pointer; transition: all 0.15s;
          display: flex; align-items: center; justify-content: center; gap: 5px;
        }
        .coun-tab.active { background: #2d7a4f; color: white; }
        .coun-tab-badge {
          font-size: 10px; font-weight: 600;
          padding: 1px 5px; border-radius: 20px;
          background: rgba(255,255,255,0.25); color: inherit;
        }
        .coun-tab:not(.active) .coun-tab-badge { background: #f0fdf4; color: #2d7a4f; }

        .coun-req-list {
          display: flex; flex-direction: column; gap: 8px;
          max-height: 420px; overflow-y: auto; padding-right: 2px;
        }
        .coun-req-list::-webkit-scrollbar { width: 4px; }
        .coun-req-list::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 4px; }

        .coun-req-card {
          background: white; border-radius: 14px;
          border: 1.5px solid #e9e9e3; padding: 14px 16px;
          cursor: pointer; transition: all 0.15s;
        }
        .coun-req-card:hover { border-color: #2d7a4f; }
        .coun-req-card.active-card { border-color: #2d7a4f; background: #f0fdf4; }

        .coun-req-top {
          display: flex; align-items: center;
          justify-content: space-between; margin-bottom: 6px;
        }
        .coun-req-from { font-size: 14px; font-weight: 600; color: #1a2e1a; }
        .coun-req-badge {
          font-size: 11px; font-weight: 600; padding: 3px 9px; border-radius: 20px;
        }
        .coun-req-msg {
          font-size: 13px; color: #6b7280;
          display: -webkit-box; -webkit-line-clamp: 2;
          -webkit-box-orient: vertical; overflow: hidden;
          line-height: 1.4; margin-bottom: 10px;
        }
        .coun-req-actions { display: flex; gap: 7px; }
        .coun-action-btn {
          padding: 6px 12px; border-radius: 8px;
          font-size: 12px; font-weight: 500;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer; border: none; transition: opacity 0.15s;
        }
        .coun-action-btn:hover { opacity: 0.85; }
        .btn-view { background: #f0fdf4; color: #2d7a4f; }
        .btn-accept { background: #2d7a4f; color: white; }
        .btn-resolve { background: #ede9fe; color: #5b21b6; }

        .coun-empty { text-align: center; color: #9ca3af; font-size: 13.5px; padding: 32px 0; }

        .coun-right { flex: 1; display: flex; flex-direction: column; gap: 0; min-width: 0; }

        .coun-thread-card {
          background: white; border-radius: 16px;
          border: 1.5px solid #e9e9e3;
          display: flex; flex-direction: column;
          height: 100%; min-height: 500px; overflow: hidden;
        }

        .coun-thread-header {
          padding: 16px 20px; border-bottom: 1.5px solid #f0f0ea;
          display: flex; align-items: center; gap: 10px;
        }
        .coun-thread-avatar {
          width: 36px; height: 36px; border-radius: 10px;
          background: #d1fae5; color: #065f46;
          display: flex; align-items: center; justify-content: center;
          font-size: 13px; font-weight: 600;
        }
        .coun-thread-title { font-size: 15px; font-weight: 600; color: #1a2e1a; }
        .coun-thread-sub { font-size: 12px; color: #9ca3af; }

        .coun-thread-msgs {
          flex: 1; overflow-y: auto;
          padding: 16px 20px;
          display: flex; flex-direction: column; gap: 10px;
        }
        .coun-thread-msgs::-webkit-scrollbar { width: 4px; }
        .coun-thread-msgs::-webkit-scrollbar-thumb { background: #e5e7eb; border-radius: 4px; }

        .coun-msg-row { display: flex; gap: 10px; align-items: flex-start; }
        .coun-msg-row.right { flex-direction: row-reverse; }

        .coun-msg-dot {
          width: 28px; height: 28px; border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          font-size: 11px; font-weight: 600; flex-shrink: 0;
        }

        .coun-msg-bubble {
          max-width: 72%; padding: 9px 13px; border-radius: 14px;
          font-size: 13.5px; line-height: 1.5; word-break: break-word;
        }
        .coun-msg-bubble.user-bubble {
          background: #f5f5f0; color: #1a2e1a; border-bottom-left-radius: 4px;
        }
        .coun-msg-bubble.coun-bubble {
          background: #2d7a4f; color: white; border-bottom-right-radius: 4px;
        }
        .coun-msg-time { font-size: 11px; color: #9ca3af; margin-top: 3px; }

        .coun-thread-reply { border-top: 1.5px solid #f0f0ea; padding: 14px 16px; }
        .coun-reply-form {
          display: flex; gap: 9px; align-items: center;
          background: #f5f5f0; border-radius: 12px;
          padding: 8px 8px 8px 14px; border: 1.5px solid #e9e9e3;
          transition: border-color 0.2s;
        }
        .coun-reply-form:focus-within { border-color: #2d7a4f; background: white; }
        .coun-reply-input {
          flex: 1; border: none; background: transparent;
          font-size: 14px; font-family: 'DM Sans', sans-serif;
          color: #1a2e1a; outline: none;
        }
        .coun-reply-input::placeholder { color: #c0c0b8; }
        .coun-reply-send {
          width: 34px; height: 34px; border-radius: 9px;
          background: #2d7a4f; border: none; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: background 0.2s;
        }
        .coun-reply-send:hover { background: #235e3c; }
        .coun-reply-send:disabled { background: #a8d5be; cursor: not-allowed; }

        .coun-no-thread {
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          height: 100%; color: #9ca3af;
          text-align: center; gap: 10px; padding: 40px;
        }
        .coun-no-thread-icon { font-size: 40px; margin-bottom: 6px; }
        .coun-no-thread h3 {
          font-family: 'DM Serif Display', serif;
          font-size: 18px; font-weight: 400; color: #6b7280; margin: 0;
        }
        .coun-no-thread p { font-size: 13.5px; margin: 0; max-width: 240px; line-height: 1.5; }

        .coun-alert {
          padding: 10px 16px; border-radius: 10px;
          font-size: 13px; margin: 0 20px 12px;
        }
        .coun-alert-error { background: #fee2e2; color: #dc2626; }
        .coun-alert-success { background: #d1fae5; color: #065f46; }

        /* ── Live Chat ── */
        .live-chat-section {
          border-top: 1.5px solid #f0f0ea;
          display: flex; flex-direction: column;
          max-height: 320px;
        }

        .live-chat-header {
          padding: 12px 20px;
          display: flex; align-items: center; gap: 8px;
          border-bottom: 1.5px solid #f0f0ea;
          flex-shrink: 0;
        }
        .live-chat-title {
          font-size: 13px; font-weight: 600; color: #1a2e1a;
          flex: 1;
        }
        .live-status-dot {
          width: 8px; height: 8px; border-radius: 50%;
          flex-shrink: 0;
        }
        .live-status-label { font-size: 11.5px; }

        .live-chat-msgs {
          flex: 1; overflow-y: auto;
          padding: 12px 20px;
          display: flex; flex-direction: column; gap: 8px;
        }
        .live-chat-msgs::-webkit-scrollbar { width: 4px; }
        .live-chat-msgs::-webkit-scrollbar-thumb { background: #e5e7eb; border-radius: 4px; }

        .live-msg-row { display: flex; gap: 8px; align-items: flex-end; }
        .live-msg-row.me { flex-direction: row-reverse; }

        .live-avatar {
          width: 26px; height: 26px; border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          font-size: 10px; font-weight: 600; flex-shrink: 0;
        }

        .live-bubble-wrap { display: flex; flex-direction: column; max-width: 68%; }
        .live-msg-row.me .live-bubble-wrap { align-items: flex-end; }

        .live-sender-name {
          font-size: 10.5px; color: #9ca3af; margin-bottom: 3px; padding: 0 3px;
        }

        .live-bubble {
          padding: 8px 12px; border-radius: 14px;
          font-size: 13.5px; line-height: 1.5; word-break: break-word;
        }
        .live-bubble.them {
          background: #f5f5f0; color: #1a2e1a;
          border-bottom-left-radius: 4px;
          border: 1.5px solid #e9e9e3;
        }
        .live-bubble.me {
          background: #2d7a4f; color: white;
          border-bottom-right-radius: 4px;
        }

        .live-time {
          font-size: 10.5px; color: #b0b0a8; margin-top: 3px; padding: 0 3px;
        }

        .live-empty {
          text-align: center; color: #b0b0a8;
          font-size: 13px; padding: 16px 0;
        }

        .live-chat-input {
          border-top: 1.5px solid #f0f0ea;
          padding: 10px 16px; flex-shrink: 0;
        }
        .live-input-form {
          display: flex; align-items: center; gap: 9px;
          background: #f5f5f0; border-radius: 12px;
          padding: 7px 7px 7px 14px; border: 1.5px solid #e9e9e3;
          transition: border-color 0.2s;
        }
        .live-input-form:focus-within { border-color: #2d7a4f; background: white; }
        .live-input {
          flex: 1; border: none; background: transparent;
          font-size: 13.5px; font-family: 'DM Sans', sans-serif;
          color: #1a2e1a; outline: none;
        }
        .live-input::placeholder { color: #c0c0b8; }
        .live-send-btn {
          width: 32px; height: 32px; border-radius: 9px;
          background: #2d7a4f; border: none; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: background 0.2s; flex-shrink: 0;
        }
        .live-send-btn:hover { background: #235e3c; }
        .live-send-btn:disabled { background: #a8d5be; cursor: not-allowed; }

        @media (max-width: 768px) {
          .coun-body { flex-direction: column; padding: 16px; }
          .coun-left { width: 100%; }
          .coun-thread-card { min-height: 400px; }
        }
      `}</style>

      <div className="coun-page">
        {/* Topbar */}
        <div className="coun-topbar">
          <div className="coun-logo">
            <div className="coun-logo-icon">🌿</div>
            <span className="coun-logo-name">Mind Care Hub</span>
          </div>
          <div className="coun-topbar-right">
            <button
              className="coun-nav-btn"
              onClick={() => navigate("/resources")}
            >
              Resources
            </button>
            <button className="coun-logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>

        <div className="coun-body">
          {/* Left */}
          <div className="coun-left">
            <div className="coun-welcome">
              <h2>Welcome back, {user?.username} 👋</h2>
              <p>
                You have {counts.pending} pending request
                {counts.pending !== 1 ? "s" : ""}
              </p>
            </div>

            <div className="coun-stats">
              <div className="coun-stat">
                <div className="coun-stat-val">{counts.pending}</div>
                <div className="coun-stat-label">Pending</div>
              </div>
              <div className="coun-stat">
                <div className="coun-stat-val">{counts.active}</div>
                <div className="coun-stat-label">Active</div>
              </div>
              <div className="coun-stat">
                <div className="coun-stat-val">{counts.resolved}</div>
                <div className="coun-stat-label">Resolved</div>
              </div>
            </div>

            <div className="coun-tabs">
              {["all", "pending", "active", "resolved"].map((t) => (
                <button
                  key={t}
                  className={`coun-tab ${activeTab === t ? "active" : ""}`}
                  onClick={() => setActiveTab(t)}
                >
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                  <span className="coun-tab-badge">{counts[t]}</span>
                </button>
              ))}
            </div>

            {error && (
              <div className="coun-alert coun-alert-error">{error}</div>
            )}

            <div className="coun-req-list">
              {filtered.length === 0 ? (
                <div className="coun-empty">
                  No {activeTab !== "all" ? activeTab : ""} requests
                </div>
              ) : (
                filtered.map((req) => {
                  const sc = statusConfig[req.status] || statusConfig.pending;
                  const fromName = req.isAnonymous
                    ? "Anonymous"
                    : req.userId?.username || "Unknown";
                  return (
                    <div
                      key={req._id}
                      className={`coun-req-card ${
                        selectedRequest === req._id ? "active-card" : ""
                      }`}
                    >
                      <div className="coun-req-top">
                        <span className="coun-req-from">{fromName}</span>
                        <span
                          className="coun-req-badge"
                          style={{ background: sc.bg, color: sc.color }}
                        >
                          {sc.label}
                        </span>
                      </div>
                      <div className="coun-req-msg">{req.initialMessage}</div>
                      <div className="coun-req-actions">
                        <button
                          className="coun-action-btn btn-view"
                          onClick={() => fetchMessages(req._id)}
                        >
                          View Thread
                        </button>
                        {req.status === "pending" && (
                          <button
                            className="coun-action-btn btn-accept"
                            onClick={() =>
                              handleStatusUpdate(req._id, "active")
                            }
                          >
                            Accept
                          </button>
                        )}
                        {req.status === "active" && (
                          <button
                            className="coun-action-btn btn-resolve"
                            onClick={() =>
                              handleStatusUpdate(req._id, "resolved")
                            }
                          >
                            Resolve
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Right */}
          <div className="coun-right">
            <div className="coun-thread-card">
              {!selectedRequest ? (
                <div className="coun-no-thread">
                  <div className="coun-no-thread-icon">💬</div>
                  <h3>No thread selected</h3>
                  <p>
                    Click "View Thread" on a request to start a conversation.
                  </p>
                </div>
              ) : (
                <>
                  {/* Thread header */}
                  <div className="coun-thread-header">
                    <div className="coun-thread-avatar">
                      {(selectedReq?.isAnonymous
                        ? "AN"
                        : (selectedReq?.userId?.username || "?").slice(0, 2)
                      ).toUpperCase()}
                    </div>
                    <div>
                      <div className="coun-thread-title">
                        {selectedReq?.isAnonymous
                          ? "Anonymous"
                          : selectedReq?.userId?.username || "Unknown"}
                      </div>
                      <div className="coun-thread-sub">Support thread</div>
                    </div>
                  </div>

                  {success && (
                    <div className="coun-alert coun-alert-success">
                      ✓ {success}
                    </div>
                  )}

                  {/* Thread messages */}
                  <div className="coun-thread-msgs">
                    {messages.length === 0 && (
                      <div
                        style={{
                          textAlign: "center",
                          color: "#9ca3af",
                          fontSize: 13.5,
                          padding: "20px 0",
                        }}
                      >
                        No messages yet in this thread.
                      </div>
                    )}
                    {messages.map((msg, i) => {
                      const isCoun = msg.senderRole === "counselor";
                      return (
                        <div
                          key={i}
                          className={`coun-msg-row ${isCoun ? "right" : ""}`}
                        >
                          <div
                            className="coun-msg-dot"
                            style={{
                              background: isCoun ? "#d1fae5" : "#f5f5f0",
                              color: isCoun ? "#065f46" : "#6b7280",
                            }}
                          >
                            {isCoun ? "Me" : "U"}
                          </div>
                          <div>
                            <div
                              className={`coun-msg-bubble ${
                                isCoun ? "coun-bubble" : "user-bubble"
                              }`}
                            >
                              {msg.message}
                            </div>
                            <div
                              className="coun-msg-time"
                              style={{ textAlign: isCoun ? "right" : "left" }}
                            >
                              {new Date(msg.createdAt).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Reply input */}
                  <div className="coun-thread-reply">
                    <form className="coun-reply-form" onSubmit={handleReply}>
                      <input
                        className="coun-reply-input"
                        type="text"
                        placeholder="Type your reply…"
                        value={reply}
                        onChange={(e) => setReply(e.target.value)}
                        required
                      />
                      <button
                        className="coun-reply-send"
                        type="submit"
                        disabled={!reply.trim()}
                      >
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="white"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <line x1="22" y1="2" x2="11" y2="13" />
                          <polygon points="22 2 15 22 11 13 2 9 22 2" />
                        </svg>
                      </button>
                    </form>
                  </div>

                  {/* ── Live Chat ── */}
                  <div className="live-chat-section">
                    <div className="live-chat-header">
                      <span className="live-chat-title">Live Chat</span>
                      <span
                        className="live-status-dot"
                        style={{
                          background: liveConnected ? "#22c55e" : "#ef4444",
                        }}
                      />
                      <span
                        className="live-status-label"
                        style={{ color: liveConnected ? "#16a34a" : "#9ca3af" }}
                      >
                        {liveConnected ? "Connected" : "Disconnected"}
                      </span>
                    </div>

                    <div className="live-chat-msgs">
                      {liveMessages.length === 0 ? (
                        <div className="live-empty">No live messages yet</div>
                      ) : (
                        liveMessages.map((msg, i) => {
                          const isMe = msg.isMe || msg.senderId === user?.id;
                          const initials = (msg.sender || "?")
                            .slice(0, 2)
                            .toUpperCase();
                          return (
                            <div
                              key={i}
                              className={`live-msg-row ${isMe ? "me" : ""}`}
                            >
                              <div
                                className="live-avatar"
                                style={{
                                  background: isMe ? "#d1fae5" : "#f0f0ea",
                                  color: isMe ? "#065f46" : "#6b7280",
                                }}
                              >
                                {initials}
                              </div>
                              <div className="live-bubble-wrap">
                                <div className="live-sender-name">
                                  {isMe ? "You" : msg.sender}
                                </div>
                                <div
                                  className={`live-bubble ${
                                    isMe ? "me" : "them"
                                  }`}
                                >
                                  {msg.message}
                                </div>
                                <div className="live-time">
                                  {new Date(msg.createdAt).toLocaleTimeString(
                                    [],
                                    {
                                      hour: "2-digit",
                                      minute: "2-digit",
                                    }
                                  )}
                                </div>
                              </div>
                            </div>
                          );
                        })
                      )}
                      <div ref={liveChatEndRef} />
                    </div>

                    <div className="live-chat-input">
                      <form
                        className="live-input-form"
                        onSubmit={handleLiveSend}
                      >
                        <input
                          className="live-input"
                          type="text"
                          placeholder="Send a live message…"
                          value={liveInput}
                          onChange={(e) => setLiveInput(e.target.value)}
                        />
                        <button
                          className="live-send-btn"
                          type="submit"
                          disabled={!liveInput.trim()}
                        >
                          <svg
                            width="13"
                            height="13"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="white"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <line x1="22" y1="2" x2="11" y2="13" />
                            <polygon points="22 2 15 22 11 13 2 9 22 2" />
                          </svg>
                        </button>
                      </form>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Counselor;
