// import { useState, useEffect } from "react";
// import API from "../api";
// import { useAuth } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";

// function Inbox() {
//   const { token, user } = useAuth();
//   const navigate = useNavigate();
//   const [conversations, setConversations] = useState([]);
//   const [error, setError] = useState("");

//   const config = {
//     headers: { Authorization: `Bearer ${token}` },
//   };

//   const fetchConversations = async () => {
//     try {
//       const res = await API.get("/api/dm/inbox", config);
//       setConversations(res.data);
//     } catch (err) {
//       setError("Failed to fetch conversations");
//     }
//   };

//   useEffect(() => {
//     fetchConversations();
//   }, []);

//   return (
//     <div>
//       <h1>Inbox</h1>
//       {error && <p>{error}</p>}

//       {conversations.length === 0 && (
//         <p>No conversations yet — go to community and message someone!</p>
//       )}

//       {conversations.map((convo) => {
//         // Get the other person in the conversation
//         const otherPerson = convo.participants.find((p) => p._id !== user?.id);

//         return (
//           <div
//             key={convo._id}
//             style={{
//               border: "1px solid black",
//               margin: 10,
//               padding: 10,
//               cursor: "pointer",
//             }}
//             onClick={() => navigate(`/dm/${convo._id}`)}
//           >
//             <p>
//               <strong>{otherPerson?.username || "Unknown"}</strong>
//             </p>
//             <p>{convo.lastMessage || "No messages yet"}</p>
//             <p>{new Date(convo.lastMessageAt).toLocaleDateString()}</p>
//           </div>
//         );
//       })}
//     </div>
//   );
// }

// export default Inbox;
import { useState, useEffect } from "react";
import API from "../api";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

function Inbox() {
  const { token, user } = useAuth();
  const navigate = useNavigate();
  const [conversations, setConversations] = useState([]);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const config = { headers: { Authorization: `Bearer ${token}` } };

  const fetchConversations = async () => {
    try {
      const res = await API.get("/api/dm/inbox", config);
      setConversations(res.data);
    } catch {
      setError("Failed to fetch conversations");
    }
  };

  useEffect(() => {
    fetchConversations();
  }, []);

  const filtered = conversations.filter((c) => {
    const other = c.participants?.find((p) => p._id !== user?.id);
    return other?.username?.toLowerCase().includes(search.toLowerCase());
  });

  const getInitials = (name = "") => name.slice(0, 2).toUpperCase() || "??";

  const avatarColors = [
    { bg: "#d1fae5", color: "#065f46" },
    { bg: "#dbeafe", color: "#1e40af" },
    { bg: "#fce7f3", color: "#9d174d" },
    { bg: "#fef3c7", color: "#92400e" },
    { bg: "#ede9fe", color: "#5b21b6" },
  ];

  const getAvatarColor = (name = "") => {
    const idx = name.charCodeAt(0) % avatarColors.length;
    return avatarColors[idx];
  };

  const formatTime = (dateStr) => {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    const now = new Date();
    const diff = now - d;
    if (diff < 60000) return "Just now";
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=DM+Sans:wght@400;500;600&display=swap');

        .inbox-page {
          min-height: 100vh;
          background: #f5f5f0;
          font-family: 'DM Sans', sans-serif;
          padding-top: 0;
        }

        .inbox-container {
          max-width: 640px;
          margin: 24px auto;
          padding: 0 20px 48px;
        }

        .inbox-search-wrap {
          position: relative;
          margin-bottom: 20px;
        }

        .inbox-search-icon {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: #9ca3af;
        }

        .inbox-search {
          width: 100%;
          padding: 11px 14px 11px 40px;
          border-radius: 12px;
          border: 1.5px solid #e5e7eb;
        }

        .inbox-card {
          background: white;
          border-radius: 16px;
          border: 1.5px solid #e9e9e3;
          overflow: hidden;
        }

        .inbox-item {
          display: flex;
          gap: 14px;
          padding: 16px;
          cursor: pointer;
          border-bottom: 1px solid #f5f5f0;
        }

        .inbox-item:hover {
          background: #fafaf7;
        }

        .inbox-avatar {
          width: 46px;
          height: 46px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
        }

        .inbox-item-body {
          flex: 1;
        }

        .inbox-item-name {
          font-weight: 600;
        }

        .inbox-item-time {
          font-size: 12px;
          color: #9ca3af;
        }

        .inbox-empty {
          text-align: center;
          padding: 50px;
          color: #9ca3af;
        }

        .inbox-count {
          background: white;
          color: #2d7a4f;
          font-size: 12px;
          border-radius: 20px;
          padding: 2px 8px;
          margin-left: 8px;
        }
      `}</style>

      <div className="inbox-page">
        {/* HEADER */}
        <header className="sp-header">
          <Navbar />
          <div className="sp-header-inner">
            <div className="sp-header-title">
              <h1>
                Inbox <span className="sp-gradient">Messages</span>
                {conversations.length > 0 && (
                  <span className="inbox-count">{conversations.length}</span>
                )}
              </h1>
              <p>Your private conversations</p>
            </div>
          </div>
        </header>

        <div className="inbox-container">
          {error && <div style={{ color: "red" }}>{error}</div>}

          {conversations.length > 0 && (
            <div className="inbox-search-wrap">
              <svg className="inbox-search-icon" width="16" height="16">
                <circle
                  cx="11"
                  cy="11"
                  r="8"
                  stroke="currentColor"
                  fill="none"
                />
              </svg>
              <input
                className="inbox-search"
                placeholder="Search conversations…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          )}

          <div className="inbox-card">
            {filtered.length === 0 ? (
              <div className="inbox-empty">No conversations</div>
            ) : (
              filtered.map((convo) => {
                const other = convo.participants?.find(
                  (p) => p._id !== user?.id
                );
                const name = other?.username || "Unknown";
                const av = getAvatarColor(name);

                return (
                  <div
                    key={convo._id}
                    className="inbox-item"
                    onClick={() => navigate(`/dm/${convo._id}`)}
                  >
                    <div
                      className="inbox-avatar"
                      style={{ background: av.bg, color: av.color }}
                    >
                      {getInitials(name)}
                    </div>

                    <div className="inbox-item-body">
                      <div className="inbox-item-name">{name}</div>
                      <div className="inbox-item-time">
                        {formatTime(convo.lastMessageAt)}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Inbox;
