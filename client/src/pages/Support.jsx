import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import Chat from "../components/Chat";

function Support() {
  const { token } = useAuth();
  const [requests, setRequests] = useState([]);
  const [initialMessage, setInitialMessage] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [messages, setMessages] = useState([]);
  const [reply, setReply] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  // Fetch user's own requests
  const fetchRequests = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/support/my",
        config
      );
      setRequests(res.data);
    } catch (err) {
      setError("Failed to fetch requests");
    }
  };

  // Fetch messages for a request
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

  // Create support request
  const handleCreateRequest = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:5000/api/support",
        {
          initialMessage,
          isAnonymous,
        },
        config
      );
      setInitialMessage("");
      setSuccess("Support request sent! 🎉");
      fetchRequests();
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError("Failed to send request");
    }
  };

  // User reply
  const handleReply = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `http://localhost:5000/api/support/${selectedRequest}/user-reply`,
        {
          message: reply,
        },
        config
      );
      setReply("");
      fetchMessages(selectedRequest);
    } catch (err) {
      setError("Failed to send reply");
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div>
      <h1>Support</h1>
      {error && <p>{error}</p>}
      {success && <p>{success}</p>}

      {/* Create Request */}
      <form onSubmit={handleCreateRequest}>
        <h2>Request Support</h2>
        <textarea
          placeholder="Tell us how you're feeling..."
          value={initialMessage}
          onChange={(e) => setInitialMessage(e.target.value)}
          required
        />
        <label>
          <input
            type="checkbox"
            checked={isAnonymous}
            onChange={(e) => setIsAnonymous(e.target.checked)}
          />
          Stay Anonymous
        </label>
        <button type="submit">Send Request</button>
      </form>

      {/* My Requests */}
      <h2>My Requests</h2>
      {requests.length === 0 && <p>No requests yet</p>}
      {requests.map((req) => (
        <div
          key={req._id}
          style={{ border: "1px solid black", margin: 10, padding: 10 }}
        >
          <p>
            <strong>Message:</strong> {req.initialMessage}
          </p>
          <p>
            <strong>Status:</strong> {req.status}
          </p>
          <button onClick={() => fetchMessages(req._id)}>View Thread</button>

          {/* Thread */}
          {/* Thread */}
          {selectedRequest === req._id && (
            <div>
              <h4>Thread</h4>
              {messages.length === 0 && (
                <p>No messages yet — waiting for counselor</p>
              )}
              {messages.map((msg, index) => (
                <div key={index}>
                  <p>
                    <strong>
                      {msg.senderRole === "user" ? "You" : "Counselor"}:
                    </strong>{" "}
                    {msg.message}
                  </p>
                  <p>{new Date(msg.createdAt).toLocaleString()}</p>
                </div>
              ))}

              {req.status !== "resolved" && (
                <>
                  {/* Async reply */}
                  <form onSubmit={handleReply}>
                    <input
                      type="text"
                      placeholder="Type your message..."
                      value={reply}
                      onChange={(e) => setReply(e.target.value)}
                      required
                    />
                    <button type="submit">Send</button>
                  </form>

                  {/* Live chat */}
                  <Chat roomId={req._id} />
                </>
              )}
              {req.status === "resolved" && (
                <p>This request has been resolved ✅</p>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Support;
