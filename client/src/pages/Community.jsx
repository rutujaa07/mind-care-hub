// import { useState, useEffect } from "react";
// import axios from "axios";
// import { useAuth } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";

// function Community() {
//   const { token, user } = useAuth();
//   const navigate = useNavigate();
//   const [posts, setPosts] = useState([]);
//   const [content, setContent] = useState("");
//   const [category, setCategory] = useState("general");
//   const [isAnonymous, setIsAnonymous] = useState(true);
//   const [error, setError] = useState("");
//   const [selectedPost, setSelectedPost] = useState(null);
//   const [comments, setComments] = useState([]);
//   const [commentContent, setCommentContent] = useState("");
//   const [filterCategory, setFilterCategory] = useState("");

//   const config = {
//     headers: { Authorization: `Bearer ${token}` },
//   };

//   const fetchPosts = async () => {
//     try {
//       const url = filterCategory
//         ? `http://localhost:5000/api/posts?category=${filterCategory}`
//         : "http://localhost:5000/api/posts";
//       const res = await axios.get(url, config);
//       setPosts(res.data);
//     } catch (err) {
//       setError("Failed to fetch posts");
//     }
//   };

//   const fetchComments = async (postId) => {
//     try {
//       const res = await axios.get(
//         `http://localhost:5000/api/comments/${postId}`,
//         config
//       );
//       setComments(res.data);
//     } catch (err) {
//       setError("Failed to fetch comments");
//     }
//   };

//   const handleCreatePost = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post(
//         "http://localhost:5000/api/posts",
//         { content, category, isAnonymous },
//         config
//       );
//       setContent("");
//       fetchPosts();
//     } catch (err) {
//       setError("Failed to create post");
//     }
//   };

//   const handleLike = async (postId) => {
//     try {
//       await axios.put(
//         `http://localhost:5000/api/posts/like/${postId}`,
//         {},
//         config
//       );
//       fetchPosts();
//     } catch (err) {
//       setError("Failed to like post");
//     }
//   };

//   const handleAddComment = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post(
//         `http://localhost:5000/api/comments/${selectedPost}`,
//         { content: commentContent, isAnonymous: true },
//         config
//       );
//       setCommentContent("");
//       fetchComments(selectedPost);
//     } catch (err) {
//       setError("Failed to add comment");
//     }
//   };

//   const handleViewComments = (postId) => {
//     setSelectedPost(postId);
//     fetchComments(postId);
//   };

//   useEffect(() => {
//     fetchPosts();
//   }, [filterCategory]);

//   return (
//     <div>
//       <h1>Community</h1>
//       {error && <p>{error}</p>}

//       {/* Filter */}
//       <div>
//         <label>Filter by category: </label>
//         <select
//           value={filterCategory}
//           onChange={(e) => setFilterCategory(e.target.value)}
//         >
//           <option value="">All</option>
//           <option value="anxiety">Anxiety</option>
//           <option value="stress">Stress</option>
//           <option value="loneliness">Loneliness</option>
//           <option value="general">General</option>
//         </select>
//       </div>

//       {/* Create Post */}
//       <form onSubmit={handleCreatePost}>
//         <h2>Create Post</h2>
//         <textarea
//           placeholder="Share how you're feeling..."
//           value={content}
//           onChange={(e) => setContent(e.target.value)}
//           required
//         />
//         <select value={category} onChange={(e) => setCategory(e.target.value)}>
//           <option value="general">General</option>
//           <option value="anxiety">Anxiety</option>
//           <option value="stress">Stress</option>
//           <option value="loneliness">Loneliness</option>
//         </select>
//         <label>
//           <input
//             type="checkbox"
//             checked={isAnonymous}
//             onChange={(e) => setIsAnonymous(e.target.checked)}
//           />
//           Post Anonymously
//         </label>
//         <button type="submit">Post</button>
//       </form>

//       {/* Posts List */}
//       <h2>Posts</h2>
//       {posts.map((post) => (
//         <div key={post._id}>
//           {/* Clickable username on post */}
//           <p>
//             <strong
//               style={{
//                 cursor: post.isAnonymous ? "default" : "pointer",
//                 color: post.isAnonymous ? "black" : "blue",
//               }}
//               onClick={() =>
//                 !post.isAnonymous && navigate(`/profile/${post.userId}`)
//               }
//             >
//               {post.isAnonymous ? "Anonymous" : post.username}
//             </strong>{" "}
//             — {post.category}
//           </p>

//           <p>{post.content}</p>
//           <p>Likes: {post.likes.length}</p>
//           <button onClick={() => handleLike(post._id)}>Like</button>
//           <button onClick={() => handleViewComments(post._id)}>Comments</button>

//           {/* Comments Section */}
//           {selectedPost === post._id && (
//             <div>
//               <h4>Comments</h4>
//               {comments.map((comment) => (
//                 <div key={comment._id}>
//                   {/* Clickable username on comment */}
//                   <p>
//                     <strong
//                       style={{
//                         cursor: comment.isAnonymous ? "default" : "pointer",
//                         color: comment.isAnonymous ? "black" : "blue",
//                       }}
//                       onClick={() =>
//                         !comment.isAnonymous &&
//                         navigate(`/profile/${comment.userId}`)
//                       }
//                     >
//                       {comment.isAnonymous ? "Anonymous" : comment.username}
//                     </strong>
//                   </p>
//                   <p>{comment.content}</p>
//                 </div>
//               ))}

//               <form onSubmit={handleAddComment}>
//                 <input
//                   type="text"
//                   placeholder="Add a comment..."
//                   value={commentContent}
//                   onChange={(e) => setCommentContent(e.target.value)}
//                   required
//                 />
//                 <button type="submit">Comment</button>
//               </form>
//             </div>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// }

// export default Community;
import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Community.css";

const EXPERTS = [
  {
    id: 1,
    name: "Dr. Priya Sharma",
    title: "Clinical Psychologist",
    specialty: "Anxiety & Depression",
    avatar:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=120&h=120&q=80&fit=crop",
    available: true,
    rating: 4.9,
    sessions: 320,
  },
  {
    id: 2,
    name: "Dr. Arjun Mehta",
    title: "Licensed Therapist",
    specialty: "Stress & Trauma",
    avatar:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=120&h=120&q=80&fit=crop",
    available: false,
    rating: 4.8,
    sessions: 215,
  },
  {
    id: 3,
    name: "Dr. Nisha Kapoor",
    title: "Wellness Counselor",
    specialty: "Mindfulness & CBT",
    avatar:
      "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=120&h=120&q=80&fit=crop",
    available: true,
    rating: 5.0,
    sessions: 180,
  },
];

const CATEGORY_COLORS = {
  anxiety: { bg: "#fff3e0", color: "#e65100", dot: "#ff9800" },
  stress: { bg: "#fce4ec", color: "#880e4f", dot: "#e91e63" },
  loneliness: { bg: "#e8eaf6", color: "#283593", dot: "#5c6bc0" },
  general: { bg: "#e8f5e9", color: "#1b5e20", dot: "#4caf50" },
};

function Community() {
  const { token, user } = useAuth();
  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("general");
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [error, setError] = useState("");
  const [selectedPost, setSelectedPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentContent, setCommentContent] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [activeExpert, setActiveExpert] = useState(0);
  const [showGuidelines, setShowGuidelines] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [reportText, setReportText] = useState("");

  const config = { headers: { Authorization: `Bearer ${token}` } };

  const fetchPosts = async () => {
    try {
      const url = filterCategory
        ? `http://localhost:5000/api/posts?category=${filterCategory}`
        : "http://localhost:5000/api/posts";
      const res = await axios.get(url, config);
      setPosts(res.data);
    } catch {
      setError("Failed to fetch posts");
    }
  };

  const fetchComments = async (postId) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/comments/${postId}`,
        config
      );
      setComments(res.data);
    } catch {
      setError("Failed to fetch comments");
    }
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:5000/api/posts",
        { content, category, isAnonymous },
        config
      );
      setContent("");
      setShowForm(false);
      fetchPosts();
    } catch {
      setError("Failed to create post");
    }
  };

  const handleLike = async (postId) => {
    try {
      await axios.put(
        `http://localhost:5000/api/posts/like/${postId}`,
        {},
        config
      );
      fetchPosts();
    } catch {
      setError("Failed to like post");
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `http://localhost:5000/api/comments/${selectedPost}`,
        { content: commentContent, isAnonymous: true },
        config
      );
      setCommentContent("");
      fetchComments(selectedPost);
    } catch {
      setError("Failed to add comment");
    }
  };

  const handleViewComments = (postId) => {
    if (selectedPost === postId) {
      setSelectedPost(null);
      return;
    }
    setSelectedPost(postId);
    fetchComments(postId);
  };

  useEffect(() => {
    fetchPosts();
  }, [filterCategory]);

  const expert = EXPERTS[activeExpert];
  const catStyle = (cat) => CATEGORY_COLORS[cat] || CATEGORY_COLORS.general;

  return (
    <div className="cm-root">
      {/* ── HEADER ── */}
      <header className="cm-header">
        <div className="cm-header-inner">
          <button className="cm-back-btn" onClick={() => navigate("/home")}>
            ← Back
          </button>
          <div className="cm-header-title">
            <h1>
              Community <span className="cm-gradient">Hub</span>
            </h1>
            <p>A safe space to share, connect, and heal together</p>
          </div>
          <button
            className="cm-new-post-btn"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? "✕ Cancel" : "+ New Post"}
          </button>
        </div>
      </header>

      {/* ── ERROR TOAST ── */}
      {error && (
        <div className="cm-toast" onClick={() => setError("")}>
          ⚠️ {error} <span>✕</span>
        </div>
      )}

      {/* ── GUIDELINES MODAL ── */}
      {showGuidelines && (
        <div
          className="cm-modal-overlay"
          onClick={() => setShowGuidelines(false)}
        >
          <div className="cm-modal" onClick={(e) => e.stopPropagation()}>
            <button
              className="cm-modal-close"
              onClick={() => setShowGuidelines(false)}
            >
              ✕
            </button>
            <h2>📋 Community Guidelines</h2>
            <ul>
              <li>🌿 Be kind, empathetic, and respectful at all times.</li>
              <li>
                🔒 Respect anonymity — do not attempt to identify anonymous
                users.
              </li>
              <li>
                🚫 No hate speech, harassment, or discrimination of any kind.
              </li>
              <li>
                💬 Share your experiences, but avoid giving direct medical
                advice.
              </li>
              <li>
                🆘 If someone is in crisis, encourage them to seek professional
                help.
              </li>
              <li>
                ✨ Celebrate progress — every step forward matters, big or
                small.
              </li>
            </ul>
          </div>
        </div>
      )}

      {/* ── REPORT MODAL ── */}
      {showReport && (
        <div className="cm-modal-overlay" onClick={() => setShowReport(false)}>
          <div className="cm-modal" onClick={(e) => e.stopPropagation()}>
            <button
              className="cm-modal-close"
              onClick={() => setShowReport(false)}
            >
              ✕
            </button>
            <h2>🚩 Report an Issue</h2>
            <p>
              Help us keep the community safe by reporting any concerning
              content or behaviour.
            </p>
            <textarea
              className="cm-report-textarea"
              placeholder="Describe the issue in detail..."
              value={reportText}
              onChange={(e) => setReportText(e.target.value)}
            />
            <button
              className="cm-btn-primary"
              onClick={() => {
                setReportText("");
                setShowReport(false);
              }}
            >
              Submit Report
            </button>
          </div>
        </div>
      )}

      <div className="cm-layout">
        {/* ══════════════════════════════
            LEFT — MAIN FEED
        ══════════════════════════════ */}
        <main className="cm-main">
          {/* Create Post Form */}
          {showForm && (
            <div className="cm-create-card cm-slide-in">
              <div className="cm-create-header">
                <div className="cm-user-av">
                  {user?.username?.[0]?.toUpperCase() || "U"}
                </div>
                <div>
                  <strong>{isAnonymous ? "Anonymous" : user?.username}</strong>
                  <span>Sharing to Community</span>
                </div>
              </div>
              <form onSubmit={handleCreatePost}>
                <textarea
                  className="cm-textarea"
                  placeholder="What's on your mind? Share freely — this is a safe space 💚"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                  rows={4}
                />
                <div className="cm-form-row">
                  <select
                    className="cm-select"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="general">💬 General</option>
                    <option value="anxiety">😰 Anxiety</option>
                    <option value="stress">😤 Stress</option>
                    <option value="loneliness">🌙 Loneliness</option>
                  </select>
                  <label className="cm-anon-toggle">
                    <input
                      type="checkbox"
                      checked={isAnonymous}
                      onChange={(e) => setIsAnonymous(e.target.checked)}
                    />
                    <span className="cm-toggle-track">
                      <span className="cm-toggle-thumb" />
                    </span>
                    Post Anonymously
                  </label>
                  <button type="submit" className="cm-btn-primary">
                    Share Post
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Filter Bar */}
          <div className="cm-filter-bar">
            <span className="cm-filter-label">Filter:</span>
            {["", "anxiety", "stress", "loneliness", "general"].map((cat) => (
              <button
                key={cat}
                className={`cm-filter-chip ${
                  filterCategory === cat ? "active" : ""
                }`}
                onClick={() => setFilterCategory(cat)}
              >
                {cat === ""
                  ? "All"
                  : cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>

          {/* Posts */}
          <div className="cm-posts">
            {posts.length === 0 && (
              <div className="cm-empty">
                <div className="cm-empty-icon">🌱</div>
                <p>No posts yet. Be the first to share!</p>
              </div>
            )}
            {posts.map((post, idx) => {
              const cs = catStyle(post.category);
              return (
                <div
                  key={post._id}
                  className="cm-post-card"
                  style={{ animationDelay: `${idx * 0.06}s` }}
                >
                  <div className="cm-post-top">
                    <div
                      className="cm-post-av"
                      onClick={() =>
                        !post.isAnonymous && navigate(`/profile/${post.userId}`)
                      }
                    >
                      {post.isAnonymous
                        ? "?"
                        : post.username?.[0]?.toUpperCase() || "U"}
                    </div>
                    <div className="cm-post-meta">
                      <strong
                        className={post.isAnonymous ? "" : "cm-link"}
                        onClick={() =>
                          !post.isAnonymous &&
                          navigate(`/profile/${post.userId}`)
                        }
                      >
                        {post.isAnonymous ? "Anonymous" : post.username}
                      </strong>
                      <span
                        className="cm-cat-badge"
                        style={{ background: cs.bg, color: cs.color }}
                      >
                        <span
                          className="cm-cat-dot"
                          style={{ background: cs.dot }}
                        />
                        {post.category}
                      </span>
                    </div>
                  </div>

                  <p className="cm-post-content">{post.content}</p>

                  <div className="cm-post-actions">
                    <button
                      className="cm-action-btn cm-like-btn"
                      onClick={() => handleLike(post._id)}
                    >
                      <span>💚</span> {post.likes.length}{" "}
                      {post.likes.length === 1 ? "Like" : "Likes"}
                    </button>
                    <button
                      className={`cm-action-btn ${
                        selectedPost === post._id ? "cm-active" : ""
                      }`}
                      onClick={() => handleViewComments(post._id)}
                    >
                      <span>💬</span> Comments
                    </button>
                  </div>

                  {/* Comments Panel */}
                  {selectedPost === post._id && (
                    <div className="cm-comments-panel cm-slide-in">
                      <div className="cm-comments-list">
                        {comments.length === 0 && (
                          <p className="cm-no-comments">
                            No comments yet — be the first to respond 🌿
                          </p>
                        )}
                        {comments.map((c) => (
                          <div key={c._id} className="cm-comment">
                            <div
                              className="cm-comment-av"
                              onClick={() =>
                                !c.isAnonymous &&
                                navigate(`/profile/${c.userId}`)
                              }
                            >
                              {c.isAnonymous
                                ? "?"
                                : c.username?.[0]?.toUpperCase()}
                            </div>
                            <div className="cm-comment-body">
                              <strong
                                className={c.isAnonymous ? "" : "cm-link"}
                                onClick={() =>
                                  !c.isAnonymous &&
                                  navigate(`/profile/${c.userId}`)
                                }
                              >
                                {c.isAnonymous ? "Anonymous" : c.username}
                              </strong>
                              <p>{c.content}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                      <form
                        className="cm-comment-form"
                        onSubmit={handleAddComment}
                      >
                        <input
                          className="cm-comment-input"
                          type="text"
                          placeholder="Write a supportive comment... 💚"
                          value={commentContent}
                          onChange={(e) => setCommentContent(e.target.value)}
                          required
                        />
                        <button type="submit" className="cm-comment-submit">
                          Send
                        </button>
                      </form>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </main>

        {/* ══════════════════════════════
            RIGHT SIDEBAR
        ══════════════════════════════ */}
        <aside className="cm-sidebar">
          {/* Talk to an Expert */}
          <div className="cm-sidebar-card cm-expert-card">
            <div className="cm-sidebar-card-header">
              <h3>🩺 Talk to an Expert</h3>
              <p>Connect with a licensed professional right now</p>
            </div>

            {/* Expert Selector Tabs */}
            <div className="cm-expert-tabs">
              {EXPERTS.map((e, i) => (
                <button
                  key={e.id}
                  className={`cm-expert-tab ${
                    activeExpert === i ? "active" : ""
                  }`}
                  onClick={() => setActiveExpert(i)}
                >
                  <img src={e.avatar} alt={e.name} />
                  {e.available && <span className="cm-online-dot" />}
                </button>
              ))}
            </div>

            {/* Expert Details */}
            <div className="cm-expert-details">
              <img
                src={expert.avatar}
                alt={expert.name}
                className="cm-expert-avatar"
              />
              <div className="cm-expert-info">
                <h4>{expert.name}</h4>
                <span className="cm-expert-title">{expert.title}</span>
                <span className="cm-expert-spec">🎯 {expert.specialty}</span>
                <div className="cm-expert-stats">
                  <span>⭐ {expert.rating}</span>
                  <span>•</span>
                  <span>{expert.sessions}+ sessions</span>
                </div>
                <div
                  className={`cm-expert-status ${
                    expert.available ? "available" : "busy"
                  }`}
                >
                  <span
                    className={
                      expert.available ? "cm-online-dot" : "cm-busy-dot"
                    }
                  />
                  {expert.available ? "Available Now" : "In a Session"}
                </div>
              </div>
            </div>

            <button
              className={`cm-talk-btn ${
                !expert.available ? "cm-talk-btn-disabled" : ""
              }`}
              onClick={() => expert.available && navigate("/support")}
            >
              {expert.available ? "💬 Talk Now" : "📅 Book Session"}
            </button>
          </div>

          {/* Quick Links 4 Buttons */}
          <div className="cm-sidebar-card cm-quick-links">
            <h3>Quick Links</h3>
            <div className="cm-ql-grid">
              <button
                className="cm-ql-btn"
                onClick={() => navigate("/community")}
              >
                <span className="cm-ql-icon">🗓️</span>
                <span>
                  Community
                  <br />
                  Calendar
                </span>
              </button>
              <button
                className="cm-ql-btn"
                onClick={() => setShowGuidelines(true)}
              >
                <span className="cm-ql-icon">📋</span>
                <span>
                  Community
                  <br />
                  Guidelines
                </span>
              </button>
              <button className="cm-ql-btn" onClick={() => setShowReport(true)}>
                <span className="cm-ql-icon">🚩</span>
                <span>
                  Report
                  <br />
                  an Issue
                </span>
              </button>
              <button
                className="cm-ql-btn"
                onClick={() => navigate("/resources")}
              >
                <span className="cm-ql-icon">🔗</span>
                <span>
                  Quick
                  <br />
                  Links
                </span>
              </button>
            </div>
          </div>

          {/* Community Stats */}
          <div className="cm-sidebar-card cm-stats-card">
            <h3>Community Today</h3>
            <div className="cm-stats-row">
              <div className="cm-stat-item">
                <strong>1,247</strong>
                <span>Members Online</span>
              </div>
              <div className="cm-stat-item">
                <strong>84</strong>
                <span>Posts Today</span>
              </div>
              <div className="cm-stat-item">
                <strong>312</strong>
                <span>Supportive Replies</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default Community;
