import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useParams, useNavigate } from "react-router-dom";
import { getSocket } from "../socket";

function DMChat() {
  const { token, user } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const [conversation, setConversation] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [connected, setConnected] = useState(false);
  const [error, setError] = useState("");
  const messagesEndRef = useRef(null);

  const config = { headers: { Authorization: `Bearer ${token}` } };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const fetchConversation = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/dm/${id}`, config);
      setConversation(res.data);
      setMessages(res.data.messages);
    } catch {
      setError("Failed to fetch conversation");
    }
  };

  useEffect(() => {
    fetchConversation();
    const socket = getSocket();
    const onConnect = () => {
      setConnected(true);
      socket.emit("join_room", id);
    };
    const onDisconnect = () => setConnected(false);
    const onReceiveDM = (data) => setMessages((prev) => [...prev, data]);
    if (socket.connected) onConnect();
    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("receive_dm", onReceiveDM);
    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("receive_dm", onReceiveDM);
    };
  }, [id]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    const socket = getSocket();
    try {
      await axios.post(
        `http://localhost:5000/api/dm/${id}/message`,
        { message },
        config
      );
      socket.emit("send_dm", {
        roomId: id,
        message,
        senderId: user?.id,
        sender: user?.username,
        createdAt: new Date(),
      });
      setMessage("");
      fetchConversation();
    } catch {
      setError("Failed to send message");
    }
  };

  const otherPerson = conversation?.participants?.find(
    (p) => p._id !== user?.id
  );

  const isMine = (msg) =>
    msg.senderId?._id === user?.id || msg.senderId === user?.id;

  const avatarColors = [
    { bg: "#d1fae5", color: "#065f46" },
    { bg: "#dbeafe", color: "#1e40af" },
    { bg: "#fce7f3", color: "#9d174d" },
    { bg: "#fef3c7", color: "#92400e" },
    { bg: "#ede9fe", color: "#5b21b6" },
  ];
  const getAvatarColor = (name = "") =>
    avatarColors[name.charCodeAt(0) % avatarColors.length];
  const getInitials = (name = "") => name.slice(0, 2).toUpperCase() || "??";
  const av = getAvatarColor(otherPerson?.username || "");

  const groupMessages = (msgs) => {
    const groups = [];
    msgs.forEach((msg, i) => {
      const mine = isMine(msg);
      const prevMine = i > 0 ? isMine(msgs[i - 1]) : null;
      if (i === 0 || mine !== prevMine) groups.push({ mine, msgs: [msg] });
      else groups[groups.length - 1].msgs.push(msg);
    });
    return groups;
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&display=swap');
        * { box-sizing: border-box; }

        .dm-page {
          display: flex;
          flex-direction: column;
          height: 100vh;
          background: #f5f5f0;
          font-family: 'DM Sans', sans-serif;
          overflow: hidden;
        }

        /* Top bar */
        .dm-topbar {
          background: white;
          border-bottom: 1.5px solid #e9e9e3;
          padding: 0 20px;
          height: 64px;
          display: flex;
          align-items: center;
          gap: 14px;
          flex-shrink: 0;
        }

        .dm-back-btn {
          width: 36px; height: 36px;
          border-radius: 10px;
          border: 1.5px solid #e5e7eb;
          background: white;
          cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          color: #6b7280;
          transition: background 0.15s;
          flex-shrink: 0;
        }
        .dm-back-btn:hover { background: #f5f5f0; }

        .dm-topbar-avatar {
          width: 38px; height: 38px;
          border-radius: 12px;
          display: flex; align-items: center; justify-content: center;
          font-size: 13px; font-weight: 600;
          flex-shrink: 0;
        }

        .dm-topbar-info { flex: 1; min-width: 0; }
        .dm-topbar-name {
          font-size: 15px; font-weight: 600; color: #1a2e1a;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .dm-topbar-status {
          font-size: 12px; display: flex; align-items: center; gap: 5px;
        }
        .dm-status-dot {
          width: 7px; height: 7px; border-radius: 50%;
        }

        /* Messages area */
        .dm-messages {
          flex: 1;
          overflow-y: auto;
          padding: 20px 16px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .dm-messages::-webkit-scrollbar { width: 4px; }
        .dm-messages::-webkit-scrollbar-track { background: transparent; }
        .dm-messages::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 4px; }

        .dm-error {
          background: #fee2e2; color: #dc2626;
          padding: 10px 14px; border-radius: 10px;
          font-size: 13px; margin: 8px 16px 0;
          flex-shrink: 0;
        }

        .dm-empty {
          flex: 1; display: flex; flex-direction: column;
          align-items: center; justify-content: center; gap: 10px;
          color: #9ca3af; font-size: 14px; text-align: center;
        }
        .dm-empty-icon {
          font-size: 36px; margin-bottom: 4px;
        }

        /* Message groups */
        .dm-group {
          display: flex;
          flex-direction: column;
          gap: 3px;
          max-width: 72%;
        }
        .dm-group.mine { align-self: flex-end; align-items: flex-end; }
        .dm-group.theirs { align-self: flex-start; align-items: flex-start; }

        .dm-group-header {
          font-size: 11.5px; color: #9ca3af;
          margin-bottom: 4px;
          display: flex; align-items: center; gap: 6px;
        }

        .dm-bubble {
          padding: 10px 14px;
          border-radius: 18px;
          font-size: 14px;
          line-height: 1.5;
          max-width: 100%;
          word-break: break-word;
        }
        .dm-bubble.mine {
          background: #2d7a4f;
          color: white;
          border-bottom-right-radius: 5px;
        }
        .dm-bubble.theirs {
          background: white;
          color: #1a2e1a;
          border: 1.5px solid #e9e9e3;
          border-bottom-left-radius: 5px;
        }

        .dm-time {
          font-size: 11px; color: #9ca3af; margin-top: 4px;
          padding: 0 4px;
        }

        /* Input area */
        .dm-input-bar {
          background: white;
          border-top: 1.5px solid #e9e9e3;
          padding: 14px 16px;
          flex-shrink: 0;
        }

        .dm-input-form {
          display: flex;
          align-items: center;
          gap: 10px;
          background: #f5f5f0;
          border-radius: 14px;
          padding: 8px 8px 8px 16px;
          border: 1.5px solid #e9e9e3;
          transition: border-color 0.2s;
        }
        .dm-input-form:focus-within { border-color: #2d7a4f; background: white; }

        .dm-input {
          flex: 1;
          border: none;
          background: transparent;
          font-size: 14px;
          font-family: 'DM Sans', sans-serif;
          color: #1a2e1a;
          outline: none;
        }
        .dm-input::placeholder { color: #c0c0b8; }

        .dm-send-btn {
          width: 36px; height: 36px;
          border-radius: 10px;
          background: #2d7a4f;
          border: none;
          cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: background 0.2s;
          flex-shrink: 0;
        }
        .dm-send-btn:hover { background: #235e3c; }
        .dm-send-btn:disabled { background: #a8d5be; cursor: not-allowed; }

        @media (max-width: 480px) {
          .dm-group { max-width: 88%; }
        }
      `}</style>

      <div className="dm-page">
        {/* Top bar */}
        <div className="dm-topbar">
          <button className="dm-back-btn" onClick={() => navigate("/inbox")}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          <div
            className="dm-topbar-avatar"
            style={{ background: av.bg, color: av.color }}
          >
            {getInitials(otherPerson?.username)}
          </div>

          <div className="dm-topbar-info">
            <div className="dm-topbar-name">
              {otherPerson?.username || "Unknown"}
            </div>
            <div className="dm-topbar-status">
              <span
                className="dm-status-dot"
                style={{ background: connected ? "#22c55e" : "#ef4444" }}
              />
              <span
                style={{
                  color: connected ? "#16a34a" : "#9ca3af",
                  fontSize: 12,
                }}
              >
                {connected ? "Connected" : "Disconnected"}
              </span>
            </div>
          </div>
        </div>

        {error && <div className="dm-error">{error}</div>}

        {/* Messages */}
        <div className="dm-messages">
          {messages.length === 0 ? (
            <div className="dm-empty">
              <div className="dm-empty-icon">👋</div>
              <p>
                No messages yet.
                <br />
                Say hi to {otherPerson?.username || "them"}!
              </p>
            </div>
          ) : (
            groupMessages(messages).map((group, gi) => (
              <div
                key={gi}
                className={`dm-group ${group.mine ? "mine" : "theirs"}`}
              >
                <div className="dm-group-header">
                  {!group.mine && <span>{otherPerson?.username}</span>}
                  {group.mine && <span>You</span>}
                </div>
                {group.msgs.map((msg, mi) => (
                  <div key={mi}>
                    <div
                      className={`dm-bubble ${group.mine ? "mine" : "theirs"}`}
                    >
                      {msg.message}
                    </div>
                  </div>
                ))}
                <div className="dm-time">
                  {new Date(
                    group.msgs[group.msgs.length - 1].createdAt
                  ).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="dm-input-bar">
          <form className="dm-input-form" onSubmit={handleSend}>
            <input
              className="dm-input"
              type="text"
              placeholder={`Message ${otherPerson?.username || ""}…`}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button
              className="dm-send-btn"
              type="submit"
              disabled={!message.trim()}
            >
              <svg
                width="15"
                height="15"
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
  );
}

export default DMChat;
