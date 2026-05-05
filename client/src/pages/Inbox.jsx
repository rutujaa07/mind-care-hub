// import { useState, useEffect } from "react";
// import axios from "axios";
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
//       const res = await axios.get("http://localhost:5000/api/dm/inbox", config);
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
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Inbox() {
  const { token, user } = useAuth();
  const navigate = useNavigate();
  const [conversations, setConversations] = useState([]);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const config = { headers: { Authorization: `Bearer ${token}` } };

  const fetchConversations = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/dm/inbox", config);
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
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&display=swap');
        * { box-sizing: border-box; }

        .inbox-page {
          min-height: 100vh;
          background: #f5f5f0;
          font-family: 'DM Sans', sans-serif;
          padding: 32px 24px 48px;
        }

        .inbox-container {
          max-width: 640px;
          margin: 0 auto;
        }

        .inbox-header {
          margin-bottom: 24px;
        }

        .inbox-header h1 {
          font-family: 'DM Serif Display', serif;
          font-size: 32px;
          font-weight: 400;
          color: #1a2e1a;
          margin: 0 0 4px;
        }

        .inbox-header p {
          color: #6b7280;
          font-size: 14px;
          margin: 0;
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
          pointer-events: none;
        }

        .inbox-search {
          width: 100%;
          padding: 11px 14px 11px 40px;
          border-radius: 12px;
          border: 1.5px solid #e5e7eb;
          font-size: 14px;
          font-family: 'DM Sans', sans-serif;
          background: white;
          color: #1a2e1a;
          outline: none;
          transition: border-color 0.2s;
        }

        .inbox-search:focus { border-color: #2d7a4f; }
        .inbox-search::placeholder { color: #c0c0b8; }

        .inbox-card {
          background: white;
          border-radius: 16px;
          border: 1.5px solid #e9e9e3;
          overflow: hidden;
        }

        .inbox-error {
          padding: 12px 16px;
          background: #fee2e2;
          color: #dc2626;
          font-size: 13.5px;
          border-radius: 10px;
          margin-bottom: 16px;
        }

        .inbox-empty {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 56px 24px;
          text-align: center;
        }

        .inbox-empty-icon {
          width: 56px;
          height: 56px;
          background: #f0fdf4;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 26px;
          margin-bottom: 14px;
        }

        .inbox-empty h3 {
          font-family: 'DM Serif Display', serif;
          font-size: 18px;
          font-weight: 400;
          color: #1a2e1a;
          margin: 0 0 6px;
        }

        .inbox-empty p {
          font-size: 13.5px;
          color: #9ca3af;
          margin: 0;
          max-width: 260px;
          line-height: 1.5;
        }

        .inbox-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .inbox-item {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 16px 20px;
          cursor: pointer;
          transition: background 0.15s;
          border-bottom: 1px solid #f5f5f0;
          position: relative;
        }

        .inbox-item:last-child {
          border-bottom: none;
        }

        .inbox-item:hover {
          background: #fafaf7;
        }

        .inbox-item:active {
          background: #f0fdf4;
        }

        .inbox-avatar {
          width: 46px;
          height: 46px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          font-weight: 600;
          flex-shrink: 0;
        }

        .inbox-item-body {
          flex: 1;
          min-width: 0;
        }

        .inbox-item-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 3px;
        }

        .inbox-item-name {
          font-size: 14.5px;
          font-weight: 600;
          color: #1a2e1a;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 200px;
        }

        .inbox-item-time {
          font-size: 12px;
          color: #9ca3af;
          flex-shrink: 0;
        }

        .inbox-item-msg {
          font-size: 13.5px;
          color: #6b7280;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .inbox-item-arrow {
          color: #d1d5db;
          flex-shrink: 0;
          margin-left: 8px;
        }

        .inbox-count {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: #2d7a4f;
          color: white;
          font-size: 11px;
          font-weight: 600;
          border-radius: 20px;
          min-width: 20px;
          height: 20px;
          padding: 0 6px;
          margin-left: 8px;
        }

        @media (max-width: 480px) {
          .inbox-item { padding: 14px 16px; }
          .inbox-item-name { max-width: 140px; }
        }
      `}</style>

      <div className="inbox-page">
        <div className="inbox-container">
          <div className="inbox-header">
            <h1>
              Inbox
              {conversations.length > 0 && (
                <span className="inbox-count">{conversations.length}</span>
              )}
            </h1>
            <p>Your private conversations</p>
          </div>

          {error && <div className="inbox-error">{error}</div>}

          {conversations.length > 0 && (
            <div className="inbox-search-wrap">
              <svg
                className="inbox-search-icon"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                className="inbox-search"
                type="text"
                placeholder="Search conversations…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          )}

          <div className="inbox-card">
            {filtered.length === 0 ? (
              <div className="inbox-empty">
                <div className="inbox-empty-icon">💬</div>
                <h3>{search ? "No results found" : "No conversations yet"}</h3>
                <p>
                  {search
                    ? "Try a different name or clear your search."
                    : "Head to the community and message someone to get started!"}
                </p>
              </div>
            ) : (
              <ul className="inbox-list">
                {filtered.map((convo) => {
                  const other = convo.participants?.find(
                    (p) => p._id !== user?.id
                  );
                  const name = other?.username || "Unknown";
                  const av = getAvatarColor(name);

                  return (
                    <li
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
                        <div className="inbox-item-top">
                          <span className="inbox-item-name">{name}</span>
                          <span className="inbox-item-time">
                            {formatTime(convo.lastMessageAt)}
                          </span>
                        </div>
                        <div className="inbox-item-msg">
                          {convo.lastMessage || "No messages yet"}
                        </div>
                      </div>

                      <svg
                        className="inbox-item-arrow"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Inbox;
