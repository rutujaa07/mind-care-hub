import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Admin() {
  const { token, user, logout } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [stats, setStats] = useState({});
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("stats");

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  // Fetch all users
  const fetchUsers = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/admin/users",
        config
      );
      setUsers(res.data);
    } catch (err) {
      setError("Failed to fetch users");
    }
  };

  // Fetch all posts
  const fetchPosts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/posts", config);
      setPosts(res.data);
    } catch (err) {
      setError("Failed to fetch posts");
    }
  };

  // Fetch stats
  const fetchStats = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/admin/stats",
        config
      );
      setStats(res.data);
    } catch (err) {
      setError("Failed to fetch stats");
    }
  };

  // Delete user
  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/users/${id}`, config);
      fetchUsers();
    } catch (err) {
      setError("Failed to delete user");
    }
  };

  // Delete post
  const handleDeletePost = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/posts/${id}`, config);
      fetchPosts();
    } catch (err) {
      setError("Failed to delete post");
    }
  };

  // Flag post
  const handleFlagPost = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/posts/flag/${id}`, {}, config);
      fetchPosts();
    } catch (err) {
      setError("Failed to flag post");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  useEffect(() => {
    fetchStats();
    fetchUsers();
    fetchPosts();
  }, []);

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>Welcome, {user?.username}</p>
      <button onClick={handleLogout}>Logout</button>

      {error && <p>{error}</p>}

      {/* Tabs */}
      <div>
        <button onClick={() => setActiveTab("stats")}>Stats</button>
        <button onClick={() => setActiveTab("users")}>Users</button>
        <button onClick={() => setActiveTab("posts")}>Posts</button>
      </div>

      {/* Stats Tab */}
      {activeTab === "stats" && (
        <div>
          <h2>Platform Stats</h2>
          <p>Total Users: {stats.totalUsers}</p>
          <p>Total Posts: {stats.totalPosts}</p>
          <p>Total Support Requests: {stats.totalRequests}</p>
          <p>Flagged Posts: {stats.flaggedPosts}</p>
        </div>
      )}

      {/* Users Tab */}
      {activeTab === "users" && (
        <div>
          <h2>All Users</h2>
          {users.map((u) => (
            <div
              key={u._id}
              style={{ border: "1px solid black", margin: 10, padding: 10 }}
            >
              <p>
                <strong>Username:</strong> {u.username}
              </p>
              <p>
                <strong>Email:</strong> {u.email}
              </p>
              <p>
                <strong>Role:</strong> {u.role}
              </p>
              <p>
                <strong>Joined:</strong>{" "}
                {new Date(u.createdAt).toLocaleDateString()}
              </p>
              {u._id !== user?.id && (
                <button onClick={() => handleDeleteUser(u._id)}>
                  Delete User
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Posts Tab */}
      {activeTab === "posts" && (
        <div>
          <h2>All Posts</h2>
          {posts.map((post) => (
            <div
              key={post._id}
              style={{ border: "1px solid black", margin: 10, padding: 10 }}
            >
              <p>
                <strong>Category:</strong> {post.category}
              </p>
              <p>
                <strong>Content:</strong> {post.content}
              </p>
              <p>
                <strong>Flagged:</strong> {post.isFlagged ? "Yes ⚠️" : "No"}
              </p>
              <p>
                <strong>Likes:</strong> {post.likes.length}
              </p>
              <button onClick={() => handleFlagPost(post._id)}>
                {post.isFlagged ? "Unflag" : "Flag"}
              </button>
              <button onClick={() => handleDeletePost(post._id)}>Delete</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Admin;
