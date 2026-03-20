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

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const fetchConversation = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/dm/${id}`, config);
      setConversation(res.data);
      setMessages(res.data.messages);
    } catch (err) {
      setError("Failed to fetch conversation");
    }
  };

  useEffect(() => {
    fetchConversation();

    // ← get socket instance here
    const socket = getSocket();

    const onConnect = () => {
      console.log("✅ DM Socket connected:", socket.id);
      setConnected(true);
      socket.emit("join_room", id);
    };

    const onDisconnect = () => {
      console.log("❌ DM Socket disconnected");
      setConnected(false);
    };

    const onReceiveDM = (data) => {
      console.log("📩 DM received:", data);
      setMessages((prev) => [...prev, data]);
    };

    if (socket.connected) {
      onConnect();
    }

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

    // ← get socket instance here too
    const socket = getSocket();

    try {
      await axios.post(
        `http://localhost:5000/api/dm/${id}/message`,
        { message },
        config
      );

      const messageData = {
        roomId: id,
        message,
        senderId: user?.id,
        sender: user?.username,
        createdAt: new Date(),
      };

      console.log("📤 Sending DM:", messageData);
      socket.emit("send_dm", messageData);
      setMessage("");
      fetchConversation();
    } catch (err) {
      setError("Failed to send message");
    }
  };

  const otherPerson = conversation?.participants?.find(
    (p) => p._id !== user?.id
  );

  return (
    <div>
      <button onClick={() => navigate("/inbox")}>← Back to Inbox</button>
      <h1>Chat with {otherPerson?.username || "Unknown"}</h1>
      {connected ? <p>🟢 Connected</p> : <p>🔴 Disconnected</p>}
      {error && <p>{error}</p>}

      <div
        style={{
          height: 400,
          overflowY: "auto",
          border: "1px solid black",
          padding: 10,
        }}
      >
        {messages.length === 0 && <p>No messages yet. Say hi! 👋</p>}
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              textAlign:
                msg.senderId?._id === user?.id || msg.senderId === user?.id
                  ? "right"
                  : "left",
              margin: "8px 0",
            }}
          >
            <p>
              <strong>
                {msg.senderId?._id === user?.id || msg.senderId === user?.id
                  ? "You"
                  : otherPerson?.username}
              </strong>
            </p>
            <p>{msg.message}</p>
            <p>{new Date(msg.createdAt).toLocaleTimeString()}</p>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSend}>
        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default DMChat;
