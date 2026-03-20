import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Chat from "../components/Chat";

function Counselor() {
  const { token, user, logout } = useAuth();
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [messages, setMessages] = useState([]);
  const [reply, setReply] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const fetchRequests = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/support", config);
      setRequests(res.data);
    } catch (err) {
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
    } catch (err) {
      setError("Failed to fetch messages");
    }
  };

  const handleReply = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `http://localhost:5000/api/support/${selectedRequest}/reply`,
        { message: reply },
        config
      );
      setReply("");
      setSuccess("Reply sent! 🎉");
      fetchMessages(selectedRequest);
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError("Failed to send reply");
    }
  };

  const handleStatusUpdate = async (requestId, status) => {
    try {
      await axios.put(
        `http://localhost:5000/api/support/${requestId}/status`,
        { status },
        config
      );
      fetchRequests();
    } catch (err) {
      setError("Failed to update status");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div>
      <h1>Counselor Dashboard</h1>
      <p>Welcome, {user?.username}</p>
      <button onClick={handleLogout}>Logout</button>
      <button onClick={() => navigate("/resources")}>Resources</button>

      {error && <p>{error}</p>}
      {success && <p>{success}</p>}

      <h2>Support Requests</h2>
      {requests.length === 0 && <p>No support requests yet</p>}

      {requests.map((req) => (
        <div
          key={req._id}
          style={{ border: "1px solid black", margin: 10, padding: 10 }}
        >
          <p>
            <strong>From:</strong>{" "}
            {req.isAnonymous ? "Anonymous" : req.userId?.username}
          </p>
          <p>
            <strong>Message:</strong> {req.initialMessage}
          </p>
          <p>
            <strong>Status:</strong> {req.status}
          </p>

          <button onClick={() => fetchMessages(req._id)}>View Thread</button>

          {req.status === "pending" && (
            <button onClick={() => handleStatusUpdate(req._id, "active")}>
              Accept
            </button>
          )}
          {req.status === "active" && (
            <button onClick={() => handleStatusUpdate(req._id, "resolved")}>
              Mark Resolved
            </button>
          )}

          {/* Message Thread + Live Chat */}
          {selectedRequest === req._id && (
            <div>
              <h4>Thread</h4>
              {messages.map((msg, index) => (
                <div key={index}>
                  <p>
                    <strong>
                      {msg.senderRole === "counselor" ? "You" : "User"}:
                    </strong>{" "}
                    {msg.message}
                  </p>
                  <p>{new Date(msg.createdAt).toLocaleString()}</p>
                </div>
              ))}

              <form onSubmit={handleReply}>
                <input
                  type="text"
                  placeholder="Type your reply..."
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                  required
                />
                <button type="submit">Send Reply</button>
              </form>

              {/* Live Chat */}
              <Chat roomId={req._id} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Counselor;
