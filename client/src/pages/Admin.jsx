// import { useState, useEffect } from "react";
// import axios from "axios";
// import { useAuth } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";

// function Admin() {
//   const { token, user, logout } = useAuth();
//   const navigate = useNavigate();
//   const [users, setUsers] = useState([]);
//   const [posts, setPosts] = useState([]);
//   const [stats, setStats] = useState({});
//   const [error, setError] = useState("");
//   const [activeTab, setActiveTab] = useState("stats");

//   const config = {
//     headers: { Authorization: `Bearer ${token}` },
//   };

//   // Fetch all users
//   const fetchUsers = async () => {
//     try {
//       const res = await axios.get(
//         "http://localhost:5000/api/admin/users",
//         config
//       );
//       setUsers(res.data);
//     } catch (err) {
//       setError("Failed to fetch users");
//     }
//   };

//   // Fetch all posts
//   const fetchPosts = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/posts", config);
//       setPosts(res.data);
//     } catch (err) {
//       setError("Failed to fetch posts");
//     }
//   };

//   // Fetch stats
//   const fetchStats = async () => {
//     try {
//       const res = await axios.get(
//         "http://localhost:5000/api/admin/stats",
//         config
//       );
//       setStats(res.data);
//     } catch (err) {
//       setError("Failed to fetch stats");
//     }
//   };

//   // Delete user
//   const handleDeleteUser = async (id) => {
//     try {
//       await axios.delete(`http://localhost:5000/api/admin/users/${id}`, config);
//       fetchUsers();
//     } catch (err) {
//       setError("Failed to delete user");
//     }
//   };

//   // Delete post
//   const handleDeletePost = async (id) => {
//     try {
//       await axios.delete(`http://localhost:5000/api/posts/${id}`, config);
//       fetchPosts();
//     } catch (err) {
//       setError("Failed to delete post");
//     }
//   };

//   // Flag post
//   const handleFlagPost = async (id) => {
//     try {
//       await axios.put(`http://localhost:5000/api/posts/flag/${id}`, {}, config);
//       fetchPosts();
//     } catch (err) {
//       setError("Failed to flag post");
//     }
//   };

//   const handleLogout = () => {
//     logout();
//     navigate("/login");
//   };

//   useEffect(() => {
//     fetchStats();
//     fetchUsers();
//     fetchPosts();
//   }, []);

//   return (
//     <div>
//       <h1>Admin Dashboard</h1>
//       <p>Welcome, {user?.username}</p>
//       <button onClick={handleLogout}>Logout</button>

//       {error && <p>{error}</p>}

//       {/* Tabs */}
//       <div>
//         <button onClick={() => setActiveTab("stats")}>Stats</button>
//         <button onClick={() => setActiveTab("users")}>Users</button>
//         <button onClick={() => setActiveTab("posts")}>Posts</button>
//       </div>

//       {/* Stats Tab */}
//       {activeTab === "stats" && (
//         <div>
//           <h2>Platform Stats</h2>
//           <p>Total Users: {stats.totalUsers}</p>
//           <p>Total Posts: {stats.totalPosts}</p>
//           <p>Total Support Requests: {stats.totalRequests}</p>
//           <p>Flagged Posts: {stats.flaggedPosts}</p>
//         </div>
//       )}

//       {/* Users Tab */}
//       {activeTab === "users" && (
//         <div>
//           <h2>All Users</h2>
//           {users.map((u) => (
//             <div
//               key={u._id}
//               style={{ border: "1px solid black", margin: 10, padding: 10 }}
//             >
//               <p>
//                 <strong>Username:</strong> {u.username}
//               </p>
//               <p>
//                 <strong>Email:</strong> {u.email}
//               </p>
//               <p>
//                 <strong>Role:</strong> {u.role}
//               </p>
//               <p>
//                 <strong>Joined:</strong>{" "}
//                 {new Date(u.createdAt).toLocaleDateString()}
//               </p>
//               {u._id !== user?.id && (
//                 <button onClick={() => handleDeleteUser(u._id)}>
//                   Delete User
//                 </button>
//               )}
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Posts Tab */}
//       {activeTab === "posts" && (
//         <div>
//           <h2>All Posts</h2>
//           {posts.map((post) => (
//             <div
//               key={post._id}
//               style={{ border: "1px solid black", margin: 10, padding: 10 }}
//             >
//               <p>
//                 <strong>Category:</strong> {post.category}
//               </p>
//               <p>
//                 <strong>Content:</strong> {post.content}
//               </p>
//               <p>
//                 <strong>Flagged:</strong> {post.isFlagged ? "Yes ⚠️" : "No"}
//               </p>
//               <p>
//                 <strong>Likes:</strong> {post.likes.length}
//               </p>
//               <button onClick={() => handleFlagPost(post._id)}>
//                 {post.isFlagged ? "Unflag" : "Flag"}
//               </button>
//               <button onClick={() => handleDeletePost(post._id)}>Delete</button>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// export default Admin;
import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const ROLE_CONFIG = {
  admin: { bg: "#fee2e2", color: "#dc2626" },
  counselor: { bg: "#dbeafe", color: "#1e40af" },
  user: { bg: "#f0fdf4", color: "#16a34a" },
};

function Admin() {
  const { token, user, logout } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [stats, setStats] = useState({});
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("stats");
  const [userSearch, setUserSearch] = useState("");
  const [postSearch, setPostSearch] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(null);

  const config = { headers: { Authorization: `Bearer ${token}` } };

  const fetchUsers = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/admin/users",
        config
      );
      setUsers(res.data);
    } catch {
      setError("Failed to fetch users");
    }
  };

  const fetchPosts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/posts", config);
      setPosts(res.data);
    } catch {
      setError("Failed to fetch posts");
    }
  };

  const fetchStats = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/admin/stats",
        config
      );
      setStats(res.data);
    } catch {
      setError("Failed to fetch stats");
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/users/${id}`, config);
      setConfirmDelete(null);
      fetchUsers();
    } catch {
      setError("Failed to delete user");
    }
  };

  const handleDeletePost = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/posts/${id}`, config);
      setConfirmDelete(null);
      fetchPosts();
    } catch {
      setError("Failed to delete post");
    }
  };

  const handleFlagPost = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/posts/flag/${id}`, {}, config);
      fetchPosts();
    } catch {
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

  const filteredUsers = users.filter(
    (u) =>
      u.username?.toLowerCase().includes(userSearch.toLowerCase()) ||
      u.email?.toLowerCase().includes(userSearch.toLowerCase())
  );

  const filteredPosts = posts.filter(
    (p) =>
      p.content?.toLowerCase().includes(postSearch.toLowerCase()) ||
      p.category?.toLowerCase().includes(postSearch.toLowerCase())
  );

  const tabs = [
    { id: "stats", label: "Overview", icon: "📊" },
    { id: "users", label: "Users", icon: "👥", count: users.length },
    { id: "posts", label: "Posts", icon: "📝", count: posts.length },
  ];

  const getInitials = (name = "") => name.slice(0, 2).toUpperCase() || "??";
  const avatarColors = [
    { bg: "#d1fae5", color: "#065f46" },
    { bg: "#dbeafe", color: "#1e40af" },
    { bg: "#fce7f3", color: "#9d174d" },
    { bg: "#fef3c7", color: "#92400e" },
    { bg: "#ede9fe", color: "#5b21b6" },
  ];
  const getAvatar = (name = "") =>
    avatarColors[name.charCodeAt(0) % avatarColors.length];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&display=swap');
        * { box-sizing: border-box; }

        .adm-page {
          min-height: 100vh;
          background: #f5f5f0;
          font-family: 'DM Sans', sans-serif;
          display: flex; flex-direction: column;
        }

        /* Topbar */
        .adm-topbar {
          background: white;
          border-bottom: 1.5px solid #e9e9e3;
          padding: 0 28px;
          height: 64px;
          display: flex; align-items: center; justify-content: space-between;
          flex-shrink: 0;
          position: sticky; top: 0; z-index: 10;
        }

        .adm-logo { display: flex; align-items: center; gap: 10px; }
        .adm-logo-icon {
          width: 34px; height: 34px; background: #d1fae5; border-radius: 9px;
          display: flex; align-items: center; justify-content: center; font-size: 17px;
        }
        .adm-logo-name {
          font-family: 'DM Serif Display', serif;
          font-size: 17px; color: #1a2e1a; font-weight: 400;
        }
        .adm-logo-badge {
          font-size: 11px; font-weight: 600; padding: 3px 9px;
          border-radius: 20px; background: #fee2e2; color: #dc2626;
        }

        .adm-topbar-right { display: flex; align-items: center; gap: 10px; }

        .adm-user-chip {
          display: flex; align-items: center; gap: 8px;
          padding: 6px 12px; border-radius: 10px;
          background: #f5f5f0;
          font-size: 13.5px; color: #374151;
        }
        .adm-user-avatar {
          width: 26px; height: 26px; border-radius: 7px;
          background: #d1fae5; color: #065f46;
          display: flex; align-items: center; justify-content: center;
          font-size: 10px; font-weight: 600;
        }

        .adm-logout-btn {
          padding: 8px 16px; border-radius: 9px; border: none;
          background: #fee2e2; color: #dc2626;
          font-family: 'DM Sans', sans-serif;
          font-size: 13.5px; font-weight: 500; cursor: pointer;
          transition: background 0.15s;
        }
        .adm-logout-btn:hover { background: #fecaca; }

        /* Body */
        .adm-body {
          flex: 1; max-width: 1080px; margin: 0 auto;
          width: 100%; padding: 28px 20px 56px;
        }

        .adm-page-header { margin-bottom: 24px; }
        .adm-page-header h1 {
          font-family: 'DM Serif Display', serif;
          font-size: 30px; font-weight: 400; color: #1a2e1a; margin: 0 0 4px;
        }
        .adm-page-header p { color: #6b7280; font-size: 14px; margin: 0; }

        /* Tab nav */
        .adm-tab-nav {
          display: flex; gap: 4px;
          background: white; border-radius: 14px;
          border: 1.5px solid #e9e9e3;
          padding: 5px; margin-bottom: 24px;
          width: fit-content;
        }

        .adm-tab {
          padding: 9px 20px; border-radius: 10px;
          border: none; background: transparent;
          font-family: 'DM Sans', sans-serif;
          font-size: 13.5px; font-weight: 500;
          color: #6b7280; cursor: pointer;
          display: flex; align-items: center; gap: 7px;
          transition: all 0.15s;
        }
        .adm-tab:hover { background: #f5f5f0; color: #1a2e1a; }
        .adm-tab.active { background: #2d7a4f; color: white; }

        .adm-tab-count {
          font-size: 11px; font-weight: 600;
          padding: 2px 7px; border-radius: 20px;
          background: rgba(255,255,255,0.25);
        }
        .adm-tab:not(.active) .adm-tab-count {
          background: #f0fdf4; color: #2d7a4f;
        }

        /* Alert */
        .adm-alert {
          padding: 10px 14px; border-radius: 10px;
          font-size: 13.5px; margin-bottom: 18px;
          background: #fee2e2; color: #dc2626;
        }

        /* Stats grid */
        .adm-stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 14px; margin-bottom: 28px;
        }

        .adm-stat-card {
          background: white; border-radius: 16px;
          border: 1.5px solid #e9e9e3; padding: 20px 22px;
        }

        .adm-stat-icon {
          width: 38px; height: 38px; border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          font-size: 18px; margin-bottom: 12px;
        }

        .adm-stat-val {
          font-family: 'DM Serif Display', serif;
          font-size: 30px; color: #1a2e1a; margin: 0 0 3px;
        }

        .adm-stat-label {
          font-size: 12px; color: #9ca3af;
          font-weight: 500; text-transform: uppercase; letter-spacing: 0.05em;
        }

        /* Activity section */
        .adm-section-title {
          font-family: 'DM Serif Display', serif;
          font-size: 20px; font-weight: 400; color: #1a2e1a;
          margin: 0 0 14px;
        }

        .adm-overview-grid {
          display: grid; grid-template-columns: 1fr 1fr; gap: 18px;
        }

        .adm-info-card {
          background: white; border-radius: 16px;
          border: 1.5px solid #e9e9e3; padding: 20px 22px;
        }

        .adm-info-card-title {
          font-size: 14px; font-weight: 600; color: #1a2e1a;
          margin: 0 0 14px;
          display: flex; align-items: center; gap: 8px;
        }

        .adm-mini-list { display: flex; flex-direction: column; gap: 9px; }
        .adm-mini-item {
          display: flex; align-items: center; gap: 10px;
          padding: 9px 12px; border-radius: 10px; background: #f9f9f6;
        }
        .adm-mini-avatar {
          width: 30px; height: 30px; border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          font-size: 11px; font-weight: 600; flex-shrink: 0;
        }
        .adm-mini-name { font-size: 13.5px; font-weight: 500; color: #1a2e1a; }
        .adm-mini-sub { font-size: 12px; color: #9ca3af; }
        .adm-mini-badge {
          margin-left: auto; font-size: 11px; font-weight: 600;
          padding: 3px 9px; border-radius: 20px;
        }

        /* Search bar */
        .adm-search-wrap { position: relative; margin-bottom: 16px; }
        .adm-search-icon {
          position: absolute; left: 14px; top: 50%;
          transform: translateY(-50%); color: #9ca3af; pointer-events: none;
        }
        .adm-search {
          width: 100%; padding: 11px 14px 11px 40px;
          border-radius: 12px; border: 1.5px solid #e5e7eb;
          font-size: 14px; font-family: 'DM Sans', sans-serif;
          background: white; color: #1a2e1a; outline: none;
          transition: border-color 0.2s;
        }
        .adm-search:focus { border-color: #2d7a4f; }
        .adm-search::placeholder { color: #c0c0b8; }

        /* Users table */
        .adm-table-card {
          background: white; border-radius: 16px;
          border: 1.5px solid #e9e9e3; overflow: hidden;
        }

        .adm-table { width: 100%; border-collapse: collapse; }
        .adm-table th {
          text-align: left; font-size: 11.5px; font-weight: 600;
          text-transform: uppercase; letter-spacing: 0.06em;
          color: #9ca3af; padding: 12px 18px;
          background: #fafaf7;
          border-bottom: 1px solid #f0f0ea;
        }
        .adm-table td {
          padding: 13px 18px; font-size: 13.5px; color: #374151;
          border-bottom: 1px solid #f5f5f2; vertical-align: middle;
        }
        .adm-table tr:last-child td { border-bottom: none; }
        .adm-table tr:hover td { background: #fafaf7; }

        .adm-user-cell { display: flex; align-items: center; gap: 10px; }
        .adm-cell-avatar {
          width: 34px; height: 34px; border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          font-size: 12px; font-weight: 600; flex-shrink: 0;
        }
        .adm-cell-name { font-size: 13.5px; font-weight: 600; color: #1a2e1a; }
        .adm-cell-email { font-size: 12px; color: #9ca3af; }

        .adm-role-badge {
          font-size: 11.5px; font-weight: 600;
          padding: 3px 10px; border-radius: 20px;
          display: inline-block;
        }

        /* Post cards */
        .adm-posts-list { display: flex; flex-direction: column; gap: 10px; }

        .adm-post-card {
          background: white; border-radius: 14px;
          border: 1.5px solid #e9e9e3; padding: 16px 18px;
          transition: border-color 0.15s;
        }
        .adm-post-card.flagged { border-color: #fca5a5; background: #fff8f8; }

        .adm-post-top {
          display: flex; align-items: center; justify-content: space-between;
          margin-bottom: 8px; gap: 12px;
        }

        .adm-post-meta { display: flex; align-items: center; gap: 8px; }
        .adm-post-cat {
          font-size: 11.5px; font-weight: 600;
          padding: 3px 10px; border-radius: 20px;
          background: #f0fdf4; color: #2d7a4f;
        }
        .adm-post-flagged-badge {
          font-size: 11.5px; font-weight: 600;
          padding: 3px 10px; border-radius: 20px;
          background: #fee2e2; color: #dc2626;
        }
        .adm-post-likes { font-size: 12px; color: #9ca3af; }

        .adm-post-content {
          font-size: 13.5px; color: #374151; line-height: 1.55;
          margin-bottom: 12px;
          display: -webkit-box; -webkit-line-clamp: 2;
          -webkit-box-orient: vertical; overflow: hidden;
        }

        .adm-post-actions { display: flex; gap: 7px; }

        /* Action buttons */
        .adm-btn {
          padding: 6px 13px; border-radius: 8px;
          font-size: 12.5px; font-weight: 500;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer; border: none;
          display: flex; align-items: center; gap: 5px;
          transition: opacity 0.15s;
        }
        .adm-btn:hover { opacity: 0.8; }

        .btn-flag    { background: #fef3c7; color: #92400e; }
        .btn-unflag  { background: #ede9fe; color: #5b21b6; }
        .btn-delete  { background: #fee2e2; color: #dc2626; }

        /* Confirm modal overlay */
        .adm-confirm-overlay {
          position: fixed; inset: 0; z-index: 50;
          background: rgba(0,0,0,0.35);
          display: flex; align-items: center; justify-content: center;
          padding: 20px;
        }
        .adm-confirm-box {
          background: white; border-radius: 16px;
          padding: 28px 28px 22px; max-width: 360px; width: 100%;
          box-shadow: 0 8px 32px rgba(0,0,0,0.12);
        }
        .adm-confirm-icon {
          width: 44px; height: 44px; border-radius: 12px;
          background: #fee2e2; display: flex;
          align-items: center; justify-content: center;
          font-size: 20px; margin-bottom: 14px;
        }
        .adm-confirm-box h3 {
          font-family: 'DM Serif Display', serif;
          font-size: 18px; font-weight: 400; color: #1a2e1a;
          margin: 0 0 6px;
        }
        .adm-confirm-box p { font-size: 13.5px; color: #6b7280; margin: 0 0 20px; }
        .adm-confirm-actions { display: flex; gap: 9px; justify-content: flex-end; }
        .adm-confirm-cancel {
          padding: 9px 18px; border-radius: 9px;
          border: 1.5px solid #e5e7eb; background: white;
          font-family: 'DM Sans', sans-serif;
          font-size: 13.5px; font-weight: 500;
          color: #6b7280; cursor: pointer;
        }
        .adm-confirm-cancel:hover { background: #f5f5f0; }
        .adm-confirm-delete {
          padding: 9px 18px; border-radius: 9px; border: none;
          background: #dc2626; color: white;
          font-family: 'DM Sans', sans-serif;
          font-size: 13.5px; font-weight: 600; cursor: pointer;
        }
        .adm-confirm-delete:hover { background: #b91c1c; }

        .adm-empty {
          text-align: center; padding: 48px 0;
          color: #9ca3af; font-size: 14px;
        }

        @media (max-width: 768px) {
          .adm-stats-grid { grid-template-columns: repeat(2, 1fr); }
          .adm-overview-grid { grid-template-columns: 1fr; }
          .adm-table th:nth-child(3),
          .adm-table td:nth-child(3) { display: none; }
        }
        @media (max-width: 480px) {
          .adm-stats-grid { grid-template-columns: repeat(2, 1fr); }
          .adm-tab { padding: 8px 12px; font-size: 12.5px; }
        }
      `}</style>

      {/* Confirm Delete Modal */}
      {confirmDelete && (
        <div className="adm-confirm-overlay">
          <div className="adm-confirm-box">
            <div className="adm-confirm-icon">🗑️</div>
            <h3>Confirm deletion</h3>
            <p>
              This action cannot be undone. Are you sure you want to delete this{" "}
              {confirmDelete.type}?
            </p>
            <div className="adm-confirm-actions">
              <button
                className="adm-confirm-cancel"
                onClick={() => setConfirmDelete(null)}
              >
                Cancel
              </button>
              <button
                className="adm-confirm-delete"
                onClick={confirmDelete.onConfirm}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="adm-page">
        {/* Topbar */}
        <div className="adm-topbar">
          <div className="adm-logo">
            <div className="adm-logo-icon">🌿</div>
            <span className="adm-logo-name">Mind Care Hub</span>
            <span className="adm-logo-badge">Admin</span>
          </div>
          <div className="adm-topbar-right">
            <div className="adm-user-chip">
              <div className="adm-user-avatar">
                {getInitials(user?.username)}
              </div>
              {user?.username}
            </div>
            <button className="adm-logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>

        <div className="adm-body">
          <div className="adm-page-header">
            <h1>Admin Dashboard</h1>
            <p>Manage users, content, and platform activity</p>
          </div>

          {error && <div className="adm-alert">{error}</div>}

          {/* Tabs */}
          <div className="adm-tab-nav">
            {tabs.map((t) => (
              <button
                key={t.id}
                className={`adm-tab ${activeTab === t.id ? "active" : ""}`}
                onClick={() => setActiveTab(t.id)}
              >
                <span>{t.icon}</span>
                {t.label}
                {t.count !== undefined && (
                  <span className="adm-tab-count">{t.count}</span>
                )}
              </button>
            ))}
          </div>

          {/* ── Stats Tab ── */}
          {activeTab === "stats" && (
            <>
              <div className="adm-stats-grid">
                {[
                  {
                    icon: "👥",
                    label: "Total Users",
                    val: stats.totalUsers,
                    bg: "#d1fae5",
                  },
                  {
                    icon: "📝",
                    label: "Total Posts",
                    val: stats.totalPosts,
                    bg: "#dbeafe",
                  },
                  {
                    icon: "💬",
                    label: "Support Requests",
                    val: stats.totalRequests,
                    bg: "#ede9fe",
                  },
                  {
                    icon: "⚠️",
                    label: "Flagged Posts",
                    val: stats.flaggedPosts,
                    bg: "#fee2e2",
                  },
                ].map((s) => (
                  <div key={s.label} className="adm-stat-card">
                    <div className="adm-stat-icon" style={{ background: s.bg }}>
                      {s.icon}
                    </div>
                    <div className="adm-stat-val">{s.val ?? "—"}</div>
                    <div className="adm-stat-label">{s.label}</div>
                  </div>
                ))}
              </div>

              <div className="adm-overview-grid">
                <div className="adm-info-card">
                  <div className="adm-info-card-title">👥 Recent Users</div>
                  <div className="adm-mini-list">
                    {users.slice(0, 5).map((u) => {
                      const av = getAvatar(u.username);
                      const rc = ROLE_CONFIG[u.role] || ROLE_CONFIG.user;
                      return (
                        <div key={u._id} className="adm-mini-item">
                          <div
                            className="adm-mini-avatar"
                            style={{ background: av.bg, color: av.color }}
                          >
                            {getInitials(u.username)}
                          </div>
                          <div>
                            <div className="adm-mini-name">{u.username}</div>
                            <div className="adm-mini-sub">{u.email}</div>
                          </div>
                          <span
                            className="adm-mini-badge"
                            style={{ background: rc.bg, color: rc.color }}
                          >
                            {u.role}
                          </span>
                        </div>
                      );
                    })}
                    {users.length === 0 && (
                      <div className="adm-empty">No users yet</div>
                    )}
                  </div>
                </div>

                <div className="adm-info-card">
                  <div className="adm-info-card-title">⚠️ Flagged Posts</div>
                  <div className="adm-mini-list">
                    {posts
                      .filter((p) => p.isFlagged)
                      .slice(0, 5)
                      .map((p) => (
                        <div key={p._id} className="adm-mini-item">
                          <div
                            className="adm-mini-avatar"
                            style={{
                              background: "#fee2e2",
                              color: "#dc2626",
                              fontSize: 16,
                            }}
                          >
                            ⚠️
                          </div>
                          <div>
                            <div
                              className="adm-mini-name"
                              style={{ fontWeight: 500, fontSize: 13 }}
                            >
                              {p.content?.slice(0, 50)}
                              {p.content?.length > 50 ? "…" : ""}
                            </div>
                            <div className="adm-mini-sub">{p.category}</div>
                          </div>
                        </div>
                      ))}
                    {posts.filter((p) => p.isFlagged).length === 0 && (
                      <div className="adm-empty" style={{ padding: "16px 0" }}>
                        No flagged posts 🎉
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}

          {/* ── Users Tab ── */}
          {activeTab === "users" && (
            <>
              <div className="adm-search-wrap">
                <svg
                  className="adm-search-icon"
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
                  className="adm-search"
                  type="text"
                  placeholder="Search by name or email…"
                  value={userSearch}
                  onChange={(e) => setUserSearch(e.target.value)}
                />
              </div>

              <div className="adm-table-card">
                {filteredUsers.length === 0 ? (
                  <div className="adm-empty">No users found</div>
                ) : (
                  <table className="adm-table">
                    <thead>
                      <tr>
                        <th>User</th>
                        <th>Role</th>
                        <th>Joined</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUsers.map((u) => {
                        const av = getAvatar(u.username);
                        const rc = ROLE_CONFIG[u.role] || ROLE_CONFIG.user;
                        return (
                          <tr key={u._id}>
                            <td>
                              <div className="adm-user-cell">
                                <div
                                  className="adm-cell-avatar"
                                  style={{ background: av.bg, color: av.color }}
                                >
                                  {getInitials(u.username)}
                                </div>
                                <div>
                                  <div className="adm-cell-name">
                                    {u.username}
                                  </div>
                                  <div className="adm-cell-email">
                                    {u.email}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td>
                              <span
                                className="adm-role-badge"
                                style={{ background: rc.bg, color: rc.color }}
                              >
                                {u.role}
                              </span>
                            </td>
                            <td style={{ color: "#9ca3af", fontSize: 13 }}>
                              {new Date(u.createdAt).toLocaleDateString(
                                "en-US",
                                {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                }
                              )}
                            </td>
                            <td>
                              {u._id !== user?.id ? (
                                <button
                                  className="adm-btn btn-delete"
                                  onClick={() =>
                                    setConfirmDelete({
                                      type: "user",
                                      onConfirm: () => handleDeleteUser(u._id),
                                    })
                                  }
                                >
                                  <svg
                                    width="12"
                                    height="12"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  >
                                    <polyline points="3 6 5 6 21 6" />
                                    <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
                                    <path d="M10 11v6" />
                                    <path d="M14 11v6" />
                                  </svg>
                                  Delete
                                </button>
                              ) : (
                                <span
                                  style={{ fontSize: 12, color: "#9ca3af" }}
                                >
                                  You
                                </span>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                )}
              </div>
            </>
          )}

          {/* ── Posts Tab ── */}
          {activeTab === "posts" && (
            <>
              <div className="adm-search-wrap">
                <svg
                  className="adm-search-icon"
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
                  className="adm-search"
                  type="text"
                  placeholder="Search posts by content or category…"
                  value={postSearch}
                  onChange={(e) => setPostSearch(e.target.value)}
                />
              </div>

              {filteredPosts.length === 0 ? (
                <div className="adm-empty">No posts found</div>
              ) : (
                <div className="adm-posts-list">
                  {filteredPosts.map((post) => (
                    <div
                      key={post._id}
                      className={`adm-post-card ${
                        post.isFlagged ? "flagged" : ""
                      }`}
                    >
                      <div className="adm-post-top">
                        <div className="adm-post-meta">
                          <span className="adm-post-cat">{post.category}</span>
                          {post.isFlagged && (
                            <span className="adm-post-flagged-badge">
                              ⚠️ Flagged
                            </span>
                          )}
                          <span className="adm-post-likes">
                            ❤️ {post.likes?.length ?? 0}
                          </span>
                        </div>
                      </div>
                      <div className="adm-post-content">{post.content}</div>
                      <div className="adm-post-actions">
                        <button
                          className={`adm-btn ${
                            post.isFlagged ? "btn-unflag" : "btn-flag"
                          }`}
                          onClick={() => handleFlagPost(post._id)}
                        >
                          {post.isFlagged ? "✓ Unflag" : "⚠️ Flag"}
                        </button>
                        <button
                          className="adm-btn btn-delete"
                          onClick={() =>
                            setConfirmDelete({
                              type: "post",
                              onConfirm: () => handleDeletePost(post._id),
                            })
                          }
                        >
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="3 6 5 6 21 6" />
                            <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
                          </svg>
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Admin;
