import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Inbox() {
  const { token, user } = useAuth();
  const navigate = useNavigate();
  const [conversations, setConversations] = useState([]);
  const [error, setError] = useState("");

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const fetchConversations = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/dm/inbox", config);
      setConversations(res.data);
    } catch (err) {
      setError("Failed to fetch conversations");
    }
  };

  useEffect(() => {
    fetchConversations();
  }, []);

  return (
    <div>
      <h1>Inbox</h1>
      {error && <p>{error}</p>}

      {conversations.length === 0 && (
        <p>No conversations yet — go to community and message someone!</p>
      )}

      {conversations.map((convo) => {
        // Get the other person in the conversation
        const otherPerson = convo.participants.find((p) => p._id !== user?.id);

        return (
          <div
            key={convo._id}
            style={{
              border: "1px solid black",
              margin: 10,
              padding: 10,
              cursor: "pointer",
            }}
            onClick={() => navigate(`/dm/${convo._id}`)}
          >
            <p>
              <strong>{otherPerson?.username || "Unknown"}</strong>
            </p>
            <p>{convo.lastMessage || "No messages yet"}</p>
            <p>{new Date(convo.lastMessageAt).toLocaleDateString()}</p>
          </div>
        );
      })}
    </div>
  );
}

export default Inbox;
