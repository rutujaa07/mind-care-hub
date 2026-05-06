// import { useState, useEffect } from "react";
// import axios from "axios";
// import { useAuth } from "../context/AuthContext";
// import Chat from "../components/Chat";

// function Support() {
//   const { token } = useAuth();
//   const [requests, setRequests] = useState([]);
//   const [initialMessage, setInitialMessage] = useState("");
//   const [isAnonymous, setIsAnonymous] = useState(true);
//   const [selectedRequest, setSelectedRequest] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [reply, setReply] = useState("");
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   const config = {
//     headers: { Authorization: `Bearer ${token}` },
//   };

//   // Fetch user's own requests
//   const fetchRequests = async () => {
//     try {
//       const res = await axios.get(
//         "http://localhost:5000/api/support/my",
//         config
//       );
//       setRequests(res.data);
//     } catch (err) {
//       setError("Failed to fetch requests");
//     }
//   };

//   // Fetch messages for a request
//   const fetchMessages = async (requestId) => {
//     try {
//       const res = await axios.get(
//         `http://localhost:5000/api/support/${requestId}`,
//         config
//       );
//       setSelectedRequest(requestId);
//       setMessages(res.data.messages);
//     } catch (err) {
//       setError("Failed to fetch messages");
//     }
//   };

//   // Create support request
//   const handleCreateRequest = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post(
//         "http://localhost:5000/api/support",
//         {
//           initialMessage,
//           isAnonymous,
//         },
//         config
//       );
//       setInitialMessage("");
//       setSuccess("Support request sent! 🎉");
//       fetchRequests();
//       setTimeout(() => setSuccess(""), 3000);
//     } catch (err) {
//       setError("Failed to send request");
//     }
//   };

//   // User reply
//   const handleReply = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post(
//         `http://localhost:5000/api/support/${selectedRequest}/user-reply`,
//         {
//           message: reply,
//         },
//         config
//       );
//       setReply("");
//       fetchMessages(selectedRequest);
//     } catch (err) {
//       setError("Failed to send reply");
//     }
//   };

//   useEffect(() => {
//     fetchRequests();
//   }, []);

//   return (
//     <div>
//       <h1>Support</h1>
//       {error && <p>{error}</p>}
//       {success && <p>{success}</p>}

//       {/* Create Request */}
//       <form onSubmit={handleCreateRequest}>
//         <h2>Request Support</h2>
//         <textarea
//           placeholder="Tell us how you're feeling..."
//           value={initialMessage}
//           onChange={(e) => setInitialMessage(e.target.value)}
//           required
//         />
//         <label>
//           <input
//             type="checkbox"
//             checked={isAnonymous}
//             onChange={(e) => setIsAnonymous(e.target.checked)}
//           />
//           Stay Anonymous
//         </label>
//         <button type="submit">Send Request</button>
//       </form>

//       {/* My Requests */}
//       <h2>My Requests</h2>
//       {requests.length === 0 && <p>No requests yet</p>}
//       {requests.map((req) => (
//         <div
//           key={req._id}
//           style={{ border: "1px solid black", margin: 10, padding: 10 }}
//         >
//           <p>
//             <strong>Message:</strong> {req.initialMessage}
//           </p>
//           <p>
//             <strong>Status:</strong> {req.status}
//           </p>
//           <button onClick={() => fetchMessages(req._id)}>View Thread</button>

//           {/* Thread */}
//           {/* Thread */}
//           {selectedRequest === req._id && (
//             <div>
//               <h4>Thread</h4>
//               {messages.length === 0 && (
//                 <p>No messages yet — waiting for counselor</p>
//               )}
//               {messages.map((msg, index) => (
//                 <div key={index}>
//                   <p>
//                     <strong>
//                       {msg.senderRole === "user" ? "You" : "Counselor"}:
//                     </strong>{" "}
//                     {msg.message}
//                   </p>
//                   <p>{new Date(msg.createdAt).toLocaleString()}</p>
//                 </div>
//               ))}

//               {req.status !== "resolved" && (
//                 <>
//                   {/* Async reply */}
//                   <form onSubmit={handleReply}>
//                     <input
//                       type="text"
//                       placeholder="Type your message..."
//                       value={reply}
//                       onChange={(e) => setReply(e.target.value)}
//                       required
//                     />
//                     <button type="submit">Send</button>
//                   </form>

//                   {/* Live chat */}
//                   <Chat roomId={req._id} />
//                 </>
//               )}
//               {req.status === "resolved" && (
//                 <p>This request has been resolved ✅</p>
//               )}
//             </div>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// }

// export default Support;
import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Chat from "../components/Chat";
import "./Support.css";
import Navbar from "./Navbar";

const MOOD_OPTIONS = [
  { emoji: "😊", label: "Good" },
  { emoji: "😐", label: "Okay" },
  { emoji: "😔", label: "Low" },
  { emoji: "😰", label: "Anxious" },
  { emoji: "😢", label: "Sad" },
  { emoji: "😤", label: "Stressed" },
];

const QUICK_PROMPTS = [
  "I'm feeling overwhelmed and don't know where to start.",
  "I've been struggling with anxiety lately.",
  "I feel very lonely and disconnected from everyone.",
  "I'm having trouble sleeping due to stress.",
];

const STATUS_META = {
  pending: { label: "Pending", color: "#f59e0b", bg: "#fffbeb", icon: "⏳" },
  active: { label: "Active", color: "#2e9e68", bg: "#f0faf4", icon: "💬" },
  resolved: { label: "Resolved", color: "#6366f1", bg: "#eef2ff", icon: "✅" },
};

function Support() {
  const { token } = useAuth();
  const navigate = useNavigate();

  const [requests, setRequests] = useState([]);
  const [initialMessage, setInitialMessage] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [messages, setMessages] = useState([]);
  const [reply, setReply] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [selectedMood, setSelectedMood] = useState(null);
  const [activeTab, setActiveTab] = useState("new"); // "new" | "my"
  const [showLiveChat, setShowLiveChat] = useState({});

  const config = { headers: { Authorization: `Bearer ${token}` } };

  const fetchRequests = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/support/my",
        config
      );
      setRequests(res.data);
    } catch {
      setError("Failed to fetch requests");
    }
  };

  const fetchMessages = async (requestId) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/support/${requestId}`,
        config
      );
      setSelectedRequest(requestId);
      setMessages(res.data.messages);
    } catch {
      setError("Failed to fetch messages");
    }
  };

  const handleCreateRequest = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:5000/api/support",
        { initialMessage, isAnonymous },
        config
      );
      setInitialMessage("");
      setSelectedMood(null);
      setSuccess(
        "Support request sent! A counselor will reach out to you shortly 💚"
      );
      fetchRequests();
      setActiveTab("my");
      setTimeout(() => setSuccess(""), 5000);
    } catch {
      setError("Failed to send request");
    }
  };

  const handleReply = async (e, reqId) => {
    e.preventDefault();
    try {
      await axios.post(
        `http://localhost:5000/api/support/${reqId}/user-reply`,
        { message: reply },
        config
      );
      setReply("");
      fetchMessages(reqId);
    } catch {
      setError("Failed to send reply");
    }
  };

  const toggleThread = (reqId) => {
    if (selectedRequest === reqId) {
      setSelectedRequest(null);
    } else {
      fetchMessages(reqId);
    }
  };

  const toggleLiveChat = (reqId) => {
    setShowLiveChat((prev) => ({ ...prev, [reqId]: !prev[reqId] }));
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const formatTime = (ts) => {
    const d = new Date(ts);
    return d.toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  return (
    <div className="sp-root">
      {/* ── HEADER ── */}
      <header className="sp-header">
        <Navbar />

        <div className="sp-header-inner">
          <button className="sp-back-btn" onClick={() => navigate("/home")}>
            ← Back
          </button>
          <div className="sp-header-title">
            <h1>
              Request <span className="sp-gradient">Support</span>
            </h1>
            <p>Talk to a counselor — you're not alone in this</p>
          </div>
          <div className="sp-header-badge">
            <span className="sp-online-dot" />
            Counselors Online
          </div>
        </div>
      </header>

      {/* ── TOASTS ── */}
      {error && (
        <div className="sp-toast sp-toast-error" onClick={() => setError("")}>
          ⚠️ {error} <span>✕</span>
        </div>
      )}
      {success && <div className="sp-toast sp-toast-success">💚 {success}</div>}

      <div className="sp-layout">
        {/* ══════════════════════════════
            LEFT — MAIN PANEL
        ══════════════════════════════ */}
        <main className="sp-main">
          {/* Tab Switcher */}
          <div className="sp-tabs">
            <button
              className={`sp-tab ${activeTab === "new" ? "active" : ""}`}
              onClick={() => setActiveTab("new")}
            >
              ✉️ New Request
            </button>
            <button
              className={`sp-tab ${activeTab === "my" ? "active" : ""}`}
              onClick={() => setActiveTab("my")}
            >
              📂 My Requests
              {requests.length > 0 && (
                <span className="sp-tab-badge">{requests.length}</span>
              )}
            </button>
          </div>

          {/* ── NEW REQUEST FORM ── */}
          {activeTab === "new" && (
            <div className="sp-new-request sp-slide-in">
              {/* Mood Picker */}
              <div className="sp-card">
                <h3 className="sp-card-title">
                  How are you feeling right now?
                </h3>
                <div className="sp-mood-grid">
                  {MOOD_OPTIONS.map((m) => (
                    <button
                      key={m.label}
                      type="button"
                      className={`sp-mood-btn ${
                        selectedMood === m.label ? "active" : ""
                      }`}
                      onClick={() => setSelectedMood(m.label)}
                    >
                      <span className="sp-mood-emoji">{m.emoji}</span>
                      <span>{m.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Message Form */}
              <div className="sp-card">
                <h3 className="sp-card-title">Tell us what's on your mind</h3>
                <p className="sp-card-sub">
                  Everything you share is confidential. Our counselors are
                  trained to listen without judgment.
                </p>

                {/* Quick Prompts */}
                <div className="sp-quick-prompts">
                  <p className="sp-prompt-label">Quick prompts:</p>
                  <div className="sp-prompts-grid">
                    {QUICK_PROMPTS.map((p, i) => (
                      <button
                        key={i}
                        type="button"
                        className="sp-prompt-chip"
                        onClick={() => setInitialMessage(p)}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>

                <form onSubmit={handleCreateRequest}>
                  <textarea
                    className="sp-textarea"
                    placeholder="Share how you're feeling, what's been happening, or anything you'd like support with..."
                    value={initialMessage}
                    onChange={(e) => setInitialMessage(e.target.value)}
                    required
                    rows={5}
                  />
                  <div className="sp-form-bottom">
                    <label className="sp-anon-toggle">
                      <input
                        type="checkbox"
                        checked={isAnonymous}
                        onChange={(e) => setIsAnonymous(e.target.checked)}
                      />
                      <span className="sp-toggle-track">
                        <span className="sp-toggle-thumb" />
                      </span>
                      <span>Stay Anonymous</span>
                    </label>
                    <button type="submit" className="sp-btn-primary">
                      Send Request 💚
                    </button>
                  </div>
                </form>
              </div>

              {/* What to expect */}
              <div className="sp-card sp-expect-card">
                <h3 className="sp-card-title">What happens next?</h3>
                <div className="sp-expect-steps">
                  {[
                    {
                      icon: "📨",
                      title: "Request Received",
                      desc: "Your request is safely received and assigned to a counselor.",
                    },
                    {
                      icon: "🔍",
                      title: "Counselor Matched",
                      desc: "A trained counselor reviews your message and prepares a thoughtful response.",
                    },
                    {
                      icon: "💬",
                      title: "Conversation Begins",
                      desc: "You'll receive a reply shortly. Continue the conversation at your own pace.",
                    },
                    {
                      icon: "🌱",
                      title: "Ongoing Support",
                      desc: "Get continuous care until your concern is fully addressed and resolved.",
                    },
                  ].map((s, i) => (
                    <div key={i} className="sp-expect-step">
                      <div className="sp-expect-icon">{s.icon}</div>
                      <div>
                        <strong>{s.title}</strong>
                        <p>{s.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── MY REQUESTS ── */}
          {activeTab === "my" && (
            <div className="sp-my-requests sp-slide-in">
              {requests.length === 0 ? (
                <div className="sp-empty">
                  <div className="sp-empty-icon">💌</div>
                  <p>You haven't made any support requests yet.</p>
                  <button
                    className="sp-btn-primary"
                    onClick={() => setActiveTab("new")}
                  >
                    Make Your First Request
                  </button>
                </div>
              ) : (
                requests.map((req, idx) => {
                  const sm = STATUS_META[req.status] || STATUS_META.pending;
                  const isOpen = selectedRequest === req._id;
                  const liveChatOpen = showLiveChat[req._id];
                  return (
                    <div
                      key={req._id}
                      className="sp-request-card sp-slide-in"
                      style={{ animationDelay: `${idx * 0.07}s` }}
                    >
                      {/* Request Header */}
                      <div className="sp-req-top">
                        <div className="sp-req-icon">💬</div>
                        <div className="sp-req-meta">
                          <p className="sp-req-message">
                            "{req.initialMessage}"
                          </p>
                          <div className="sp-req-tags">
                            <span
                              className="sp-status-badge"
                              style={{ background: sm.bg, color: sm.color }}
                            >
                              {sm.icon} {sm.label}
                            </span>
                            {req.isAnonymous && (
                              <span className="sp-anon-badge">
                                🎭 Anonymous
                              </span>
                            )}
                          </div>
                        </div>
                        <button
                          className={`sp-thread-toggle ${isOpen ? "open" : ""}`}
                          onClick={() => toggleThread(req._id)}
                        >
                          {isOpen ? "▲ Hide" : "▼ View Thread"}
                        </button>
                      </div>

                      {/* Thread Panel */}
                      {isOpen && (
                        <div className="sp-thread sp-slide-in">
                          <div className="sp-messages-area">
                            {messages.length === 0 ? (
                              <div className="sp-waiting">
                                <span>⏳</span>
                                <p>Waiting for a counselor to respond...</p>
                              </div>
                            ) : (
                              messages.map((msg, i) => (
                                <div
                                  key={i}
                                  className={`sp-msg ${
                                    msg.senderRole === "user"
                                      ? "sp-msg-user"
                                      : "sp-msg-counselor"
                                  }`}
                                >
                                  <div className="sp-msg-av">
                                    {msg.senderRole === "user" ? "You" : "C"}
                                  </div>
                                  <div className="sp-msg-body">
                                    <div className="sp-msg-bubble">
                                      {msg.message}
                                    </div>
                                    <span className="sp-msg-time">
                                      {formatTime(msg.createdAt)}
                                    </span>
                                  </div>
                                </div>
                              ))
                            )}
                          </div>

                          {req.status !== "resolved" ? (
                            <div className="sp-reply-area">
                              {/* Async Reply */}
                              <form
                                className="sp-reply-form"
                                onSubmit={(e) => handleReply(e, req._id)}
                              >
                                <input
                                  className="sp-reply-input"
                                  type="text"
                                  placeholder="Type your reply..."
                                  value={reply}
                                  onChange={(e) => setReply(e.target.value)}
                                  required
                                />
                                <button type="submit" className="sp-reply-send">
                                  Send
                                </button>
                              </form>

                              {/* Live Chat Toggle */}
                              <button
                                className="sp-live-toggle"
                                onClick={() => toggleLiveChat(req._id)}
                              >
                                {liveChatOpen
                                  ? "✕ Close Live Chat"
                                  : "⚡ Switch to Live Chat"}
                              </button>

                              {liveChatOpen && (
                                <div className="sp-live-chat-wrap sp-slide-in">
                                  <div className="sp-live-header">
                                    <span className="sp-online-dot" />
                                    Live Chat — Real-time
                                  </div>
                                  <Chat roomId={req._id} />
                                </div>
                              )}
                            </div>
                          ) : (
                            <div className="sp-resolved-banner">
                              ✅ This request has been resolved. We hope you're
                              feeling better 💚
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          )}
        </main>

        {/* ══════════════════════════════
            RIGHT SIDEBAR
        ══════════════════════════════ */}
        <aside className="sp-sidebar">
          {/* Crisis Banner */}
          <div className="sp-crisis-card">
            <div className="sp-crisis-icon">🆘</div>
            <h3>In Crisis?</h3>
            <p>
              If you're in immediate danger or having thoughts of self-harm,
              please reach out right away.
            </p>
            <a href="tel:iCall" className="sp-crisis-btn">
              📞 Call iCall: 9152987821
            </a>
            <a
              href="tel:Vandrevala"
              className="sp-crisis-btn sp-crisis-btn-outline"
            >
              📱 Vandrevala: 1860-2662-345
            </a>
          </div>

          {/* Tips Card */}
          <div className="sp-sidebar-card">
            <h3 className="sp-sidebar-card-title">💡 While You Wait</h3>
            <div className="sp-tips">
              {[
                {
                  icon: "🌬️",
                  tip: "Try box breathing: inhale 4s, hold 4s, exhale 4s, hold 4s.",
                },
                {
                  icon: "🎵",
                  tip: "Put on calming music or nature sounds to ease your mind.",
                },
                {
                  icon: "✍️",
                  tip: "Write down 3 things you're grateful for right now.",
                },
                {
                  icon: "🚶",
                  tip: "A short 5-minute walk can significantly lower stress levels.",
                },
              ].map((t, i) => (
                <div key={i} className="sp-tip">
                  <span>{t.icon}</span>
                  <p>{t.tip}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Privacy Card */}
          <div className="sp-sidebar-card sp-privacy-card">
            <h3 className="sp-sidebar-card-title">🔒 Your Privacy</h3>
            <ul className="sp-privacy-list">
              <li>
                <span>✓</span> All conversations are encrypted
              </li>
              <li>
                <span>✓</span> Anonymous mode available
              </li>
              <li>
                <span>✓</span> Never shared with third parties
              </li>
              <li>
                <span>✓</span> Counselors are certified professionals
              </li>
            </ul>
          </div>

          {/* Quick Nav */}
          <div className="sp-sidebar-card">
            <h3 className="sp-sidebar-card-title">🔗 Also Helpful</h3>
            <div className="sp-quick-nav">
              <button onClick={() => navigate("/community")}>
                👥 Community Forum
              </button>
              <button onClick={() => navigate("/mood")}>📊 Mood Tracker</button>
              <button onClick={() => navigate("/resources")}>
                📚 Resources
              </button>
              <button onClick={() => navigate("/inbox")}>📬 Inbox</button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default Support;
