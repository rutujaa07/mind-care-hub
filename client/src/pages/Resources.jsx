import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

function Resources() {
  const { token, user } = useAuth();
  const [resources, setResources] = useState([]);
  const [title, setTitle] = useState("");
  const [type, setType] = useState("article");
  const [content, setContent] = useState("");
  const [link, setLink] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  // Fetch resources
  const fetchResources = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/resources",
        config
      );
      setResources(res.data);
    } catch (err) {
      setError("Failed to fetch resources");
    }
  };

  // Add resource (counselor/admin only)
  const handleAddResource = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:5000/api/resources",
        {
          title,
          type,
          content,
          link,
        },
        config
      );
      setTitle("");
      setContent("");
      setLink("");
      setSuccess("Resource added! 🎉");
      fetchResources();
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError("Failed to add resource");
    }
  };

  // Delete resource (admin only)
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/resources/${id}`, config);
      fetchResources();
    } catch (err) {
      setError("Failed to delete resource");
    }
  };

  useEffect(() => {
    fetchResources();
  }, []);

  return (
    <div>
      <h1>Resources</h1>
      {error && <p>{error}</p>}
      {success && <p>{success}</p>}

      {/* Add Resource Form - counselor and admin only */}
      {(user?.role === "counselor" || user?.role === "admin") && (
        <form onSubmit={handleAddResource}>
          <h2>Add Resource</h2>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="article">Article</option>
            <option value="exercise">Exercise</option>
            <option value="helpline">Helpline</option>
          </select>
          <textarea
            placeholder="Description"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Link (optional)"
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
          <button type="submit">Add Resource</button>
        </form>
      )}

      {/* Resources List */}
      <h2>All Resources</h2>
      {resources.length === 0 && <p>No resources yet</p>}
      {resources.map((r) => (
        <div key={r._id}>
          <h3>{r.title}</h3>
          <p>Type: {r.type}</p>
          <p>{r.content}</p>
          {r.link && (
            <a href={r.link} target="_blank" rel="noreferrer">
              Visit Link
            </a>
          )}
          {user?.role === "admin" && (
            <button onClick={() => handleDelete(r._id)}>Delete</button>
          )}
        </div>
      ))}
    </div>
  );
}

export default Resources;
