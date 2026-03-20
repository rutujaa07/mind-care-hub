import { useState, useEffect, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import { getSocket } from "../socket";

function Chat({ roomId }) {
  const { user } = useAuth();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [connected, setConnected] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const socket = getSocket();

    const onConnect = () => {
      console.log("✅ Socket connected:", socket.id);
      setConnected(true);
      socket.emit("join_room", roomId);
      console.log("✅ Joined room:", roomId);
    };

    const onDisconnect = () => {
      console.log("❌ Socket disconnected");
      setConnected(false);
    };

    const onMessage = (data) => {
      console.log("📩 Message received:", data);
      if (data.roomId === roomId) {
        setMessages((prev) => [...prev, data]);
      }
    };

    if (socket.connected) {
      onConnect();
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("receive_message", onMessage);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("receive_message", onMessage);
    };
  }, [roomId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const socket = getSocket();

    const messageData = {
      roomId,
      message,
      sender: user?.username,
      senderRole: user?.role,
      time: new Date().toLocaleTimeString(),
    };

    console.log("📤 Sending message:", messageData);
    socket.emit("send_message", messageData);
    setMessage("");
  };

  return (
    <div>
      <h3>Live Chat {connected ? "🟢" : "🔴"}</h3>
      <div
        style={{
          height: 300,
          overflowY: "auto",
          border: "1px solid black",
          padding: 10,
        }}
      >
        {messages.length === 0 && <p>No messages yet!</p>}
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              textAlign: msg.sender === user?.username ? "right" : "left",
              margin: "8px 0",
            }}
          >
            <p>
              <strong>
                {msg.sender === user?.username ? "You" : msg.sender}
              </strong>
            </p>
            <p>{msg.message}</p>
            <p>{msg.time}</p>
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

export default Chat;
