// import { useState, useEffect } from "react";
// import axios from "axios";
// import { useAuth } from "../context/AuthContext";
// import { useParams, useNavigate } from "react-router-dom";

// function Profile() {
//   const { token, user } = useAuth();
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [profile, setProfile] = useState(null);
//   const [posts, setPosts] = useState([]);
//   const [bio, setBio] = useState("");
//   const [editingBio, setEditingBio] = useState(false);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   const config = {
//     headers: { Authorization: `Bearer ${token}` },
//   };

//   const isOwnProfile = user?.id === id || user?._id === id;
//   console.log("user id:", user?.id, "profile id:", id);
//   const fetchProfile = async () => {
//     try {
//       const res = await axios.get(
//         `http://localhost:5000/api/profile/${id}`,
//         config
//       );
//       setProfile(res.data.user);
//       setPosts(res.data.posts);
//       setBio(res.data.user.bio || "");
//     } catch (err) {
//       setError("Failed to fetch profile");
//     }
//   };

//   const handleUpdateBio = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.put(
//         "http://localhost:5000/api/profile/update/bio",
//         { bio },
//         config
//       );
//       setSuccess("Bio updated! 🎉");
//       setEditingBio(false);
//       fetchProfile();
//       setTimeout(() => setSuccess(""), 3000);
//     } catch (err) {
//       setError("Failed to update bio");
//     }
//   };

//   const handleStartDM = async () => {
//     try {
//       const res = await axios.post(
//         "http://localhost:5000/api/dm/start",
//         { recipientId: id },
//         config
//       );
//       navigate(`/dm/${res.data._id}`);
//     } catch (err) {
//       setError("Failed to start conversation");
//     }
//   };

//   useEffect(() => {
//     fetchProfile();
//   }, [id]);

//   if (!profile) return <p>Loading...</p>;

//   return (
//     <div>
//       <button onClick={() => navigate(-1)}>← Back</button>

//       {error && <p>{error}</p>}
//       {success && <p>{success}</p>}

//       {/* Profile Header */}
//       <h1>{profile.username}</h1>
//       <p>Role: {profile.role}</p>
//       <p>Joined: {new Date(profile.createdAt).toLocaleDateString()}</p>

//       {/* Bio */}
//       {!editingBio ? (
//         <div>
//           <p>{profile.bio || "No bio yet"}</p>
//           {isOwnProfile && (
//             <button onClick={() => setEditingBio(true)}>Edit Bio</button>
//           )}
//         </div>
//       ) : (
//         <form onSubmit={handleUpdateBio}>
//           <textarea
//             value={bio}
//             onChange={(e) => setBio(e.target.value)}
//             placeholder="Write something about yourself..."
//           />
//           <button type="submit">Save</button>
//           <button type="button" onClick={() => setEditingBio(false)}>
//             Cancel
//           </button>
//         </form>
//       )}

//       {/* Message button — only show if not own profile */}
//       {!isOwnProfile && (
//         <button onClick={handleStartDM}>💬 Send Message</button>
//       )}

//       {/* Their public posts */}
//       <h2>Posts by {profile.username}</h2>
//       {posts.length === 0 && <p>No public posts yet</p>}
//       {posts.map((post) => (
//         <div
//           key={post._id}
//           style={{ border: "1px solid black", margin: 10, padding: 10 }}
//         >
//           <p>{post.content}</p>
//           <p>Category: {post.category}</p>
//           <p>{new Date(post.createdAt).toLocaleDateString()}</p>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default Profile;
import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const BASE_URL = "http://localhost:5000";

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=DM+Serif+Display:ital@0;1&display=swap');

  :root {
    --sp-green-50: #f0faf4;
    --sp-green-100: #d4f0df;
    --sp-green-200: #a8e0c0;
    --sp-green-400: #4caf80;
    --sp-green-500: #2e9e68;
    --sp-green-600: #1d7a4f;
    --sp-green-700: #14593a;
    --sp-teal: #2aa4a4;
    --sp-cream: #fdfaf4;
    --sp-dark: #0d1f17;
    --sp-text: #1a2e22;
    --sp-muted: #5a7263;
    --sp-border: #e4ede8;
    --sp-white: #ffffff;
    --sp-shadow: 0 2px 16px rgba(15,31,24,0.08);
    --sp-shadow-md: 0 6px 32px rgba(15,31,24,0.12);
    --sp-shadow-lg: 0 12px 48px rgba(46,158,104,0.16);
    --sp-radius: 16px;
    --sp-radius-sm: 10px;
    --sp-ease: 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  }

  .profile-page { font-family: 'DM Sans', sans-serif; background: var(--sp-cream); min-height: 100vh; color: var(--sp-text); }

  /* BACK */
  .profile-back-btn {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 10px 18px; border-radius: 50px;
    background: var(--sp-white); border: 1px solid var(--sp-border);
    color: var(--sp-muted); font-size: 13px; font-weight: 500;
    box-shadow: var(--sp-shadow); cursor: pointer;
    position: fixed; top: 20px; left: 20px; z-index: 100;
    transition: all var(--sp-ease); font-family: inherit;
  }
  .profile-back-btn:hover { background: var(--sp-green-50); color: var(--sp-green-600); border-color: var(--sp-green-200); }

  /* COVER */
  .profile-cover {
    width: 100%; height: 80px;
    margin-bottom:70px;
    background: linear-gradient(135deg, var(--sp-green-700) 0%, var(--sp-green-600) 55%, var(--sp-teal) 100%);
    position: relative; overflow: hidden;
  }
  .cover-pattern {
    position: absolute; inset: 0;
    background-image:
      radial-gradient(circle at 20% 50%, rgba(255,255,255,0.07) 1px, transparent 1px),
      radial-gradient(circle at 80% 20%, rgba(255,255,255,0.05) 1px, transparent 1px);
    background-size: 40px 40px, 60px 60px;
  }
  .cover-orb {
    position: absolute; width: 320px; height: 320px; border-radius: 50%;
    background: radial-gradient(circle, rgba(42,164,164,0.3) 0%, transparent 70%);
    right: -60px; top: -80px;
  }
  .cover-orb2 {
    position: absolute; width: 200px; height: 200px; border-radius: 50%;
    background: radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 70%);
    left: 10%; bottom: -40px;
  }

  /* LAYOUT */
  .profile-wrapper { max-width: 760px; margin: 0 auto; padding: 0 20px 60px; }

  /* AVATAR */
  .avatar-section {
    display: flex; align-items: flex-end; justify-content: space-between;
    margin-top: -50px; padding: 0 4px; flex-wrap: wrap; gap: 12px;
  }
  .avatar-ring {
    width: 104px; height: 104px; border-radius: 50%;
    background: linear-gradient(135deg, var(--sp-green-400), var(--sp-teal));
    padding: 3px; box-shadow: var(--sp-shadow-md); flex-shrink: 0;
  }
  .avatar-inner {
    width: 100%; height: 100%; border-radius: 50%;
    background: linear-gradient(135deg, #e8f7ef, #d4f0df);
    display: flex; align-items: center; justify-content: center;
    font-family: 'DM Serif Display', serif;
    font-size: 34px; color: var(--sp-green-600);
  }
  .avatar-actions { display: flex; gap: 10px; align-items: center; padding-bottom: 4px; }

  /* BUTTONS */
  .btn-primary {
    display: inline-flex; align-items: center; gap: 7px;
    padding: 10px 20px; border-radius: 50px;
    background: linear-gradient(120deg, var(--sp-green-500), var(--sp-teal));
    color: var(--sp-white); font-size: 14px; font-weight: 600;
    box-shadow: 0 4px 16px rgba(46,158,104,0.3);
    transition: all var(--sp-ease); cursor: pointer; border: none; font-family: inherit;
  }
  .btn-primary:hover { transform: translateY(-1px); box-shadow: 0 6px 24px rgba(46,158,104,0.4); }
  .btn-outline {
    display: inline-flex; align-items: center; gap: 7px;
    padding: 10px 18px; border-radius: 50px;
    border: 1.5px solid var(--sp-border); color: var(--sp-muted);
    font-size: 14px; font-weight: 500; background: var(--sp-white);
    transition: all var(--sp-ease); cursor: pointer; font-family: inherit;
  }
  .btn-outline:hover { border-color: var(--sp-green-400); color: var(--sp-green-600); background: var(--sp-green-50); }

  /* IDENTITY */
  .identity { margin-top: 14px; }
  .identity h1 { font-family: 'DM Serif Display', serif; font-size: 26px; color: var(--sp-dark); letter-spacing: -0.3px; }
  .identity-meta { display: flex; align-items: center; gap: 12px; margin-top: 6px; flex-wrap: wrap; }
  .role-badge {
    display: inline-flex; align-items: center; gap: 5px;
    padding: 4px 12px; border-radius: 50px; font-size: 12px; font-weight: 600;
    background: var(--sp-green-100); color: var(--sp-green-700);
  }
  .role-badge.counselor { background: linear-gradient(120deg,#e0f4f4,#d4eef0); color: #1a6b6b; }
  .role-badge.admin { background: #fef3e2; color: #a06000; }
  .joined-label { font-size: 13px; color: var(--sp-muted); display: flex; align-items: center; gap: 4px; }

  /* STATS */
  .stats-row {
    display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px;
    background: var(--sp-border); border-radius: var(--sp-radius); overflow: hidden;
    margin-top: 18px; border: 1px solid var(--sp-border);
    animation: fadeUp 0.4s ease 0.08s both;
  }
  .stat-cell {
    background: var(--sp-white); padding: 18px 16px; text-align: center;
    transition: background var(--sp-ease);
  }
  .stat-cell:hover { background: var(--sp-green-50); }
  .stat-number { font-family: 'DM Serif Display', serif; font-size: 26px; color: var(--sp-green-600); line-height: 1; }
  .stat-label { font-size: 12px; color: var(--sp-muted); margin-top: 4px; font-weight: 500; }

  /* CARD */
  .profile-card {
    background: var(--sp-white); border-radius: var(--sp-radius);
    border: 1px solid var(--sp-border); box-shadow: var(--sp-shadow);
    padding: 22px 24px; margin-top: 18px;
    animation: fadeUp 0.4s ease both;
  }
  .card-label {
    font-size: 11px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase;
    color: var(--sp-muted); margin-bottom: 14px; display: flex; align-items: center; gap: 8px;
  }
  .card-label::after { content: ''; flex: 1; height: 1px; background: var(--sp-border); }

  /* BIO */
  .bio-text { font-size: 15px; line-height: 1.7; color: var(--sp-text); }
  .bio-empty { color: var(--sp-muted); font-style: italic; font-size: 14px; }
  .bio-edit-area {
    width: 100%; min-height: 90px; resize: vertical;
    border: 1.5px solid var(--sp-border); border-radius: var(--sp-radius-sm);
    padding: 12px 14px; font-size: 14px; color: var(--sp-text);
    background: var(--sp-green-50); outline: none;
    transition: border-color var(--sp-ease); line-height: 1.6; font-family: inherit;
  }
  .bio-edit-area:focus { border-color: var(--sp-green-400); }
  .bio-edit-actions { display: flex; gap: 10px; margin-top: 12px; }
  .btn-save {
    padding: 9px 20px; border-radius: 50px;
    background: linear-gradient(120deg, var(--sp-green-500), var(--sp-teal));
    color: white; font-size: 13px; font-weight: 600;
    transition: all var(--sp-ease); cursor: pointer; border: none; font-family: inherit;
  }
  .btn-save:hover { opacity: 0.9; transform: translateY(-1px); }
  .btn-cancel {
    padding: 9px 18px; border-radius: 50px;
    border: 1.5px solid var(--sp-border); color: var(--sp-muted);
    font-size: 13px; font-weight: 500; background: var(--sp-white);
    transition: all var(--sp-ease); cursor: pointer; font-family: inherit;
  }
  .btn-cancel:hover { border-color: var(--sp-green-200); color: var(--sp-green-600); }
  .btn-edit-bio {
    margin-top: 10px; display: inline-flex; align-items: center; gap: 5px;
    font-size: 13px; color: var(--sp-green-500); font-weight: 500;
    padding: 6px 14px; border-radius: 50px;
    border: 1.5px solid var(--sp-green-200); background: var(--sp-green-50);
    transition: all var(--sp-ease); cursor: pointer; font-family: inherit;
  }
  .btn-edit-bio:hover { background: var(--sp-green-100); border-color: var(--sp-green-400); }

  /* POSTS */
  .post-item {
    padding: 16px; border-radius: var(--sp-radius-sm);
    border: 1px solid var(--sp-border); margin-bottom: 12px;
    background: var(--sp-white); transition: all var(--sp-ease);
    position: relative; overflow: hidden;
  }
  .post-item::before {
    content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 3px;
    background: linear-gradient(180deg, var(--sp-green-400), var(--sp-teal));
    border-radius: 4px 0 0 4px; opacity: 0; transition: opacity var(--sp-ease);
  }
  .post-item:hover { border-color: var(--sp-green-200); box-shadow: 0 4px 16px rgba(46,158,104,0.08); transform: translateX(2px); }
  .post-item:hover::before { opacity: 1; }
  .post-content { font-size: 14px; line-height: 1.65; color: var(--sp-text); }
  .post-footer { display: flex; align-items: center; justify-content: space-between; margin-top: 10px; flex-wrap: wrap; gap: 8px; }
  .post-meta { display: flex; gap: 8px; align-items: center; flex-wrap: wrap; }
  .post-category {
    display: inline-flex; align-items: center; gap: 4px;
    font-size: 11px; font-weight: 600; padding: 4px 10px; border-radius: 50px;
    background: var(--sp-green-100); color: var(--sp-green-700);
  }
  .post-category.anxiety { background: #fff3e8; color: #b85c00; }
  .post-category.stress { background: #fce8e8; color: #b82c2c; }
  .post-category.loneliness { background: #e8eeff; color: #3048a8; }
  .post-date { font-size: 12px; color: var(--sp-muted); }
  .post-like-btn {
    display: inline-flex; align-items: center; gap: 4px;
    font-size: 12px; color: var(--sp-muted); padding: 4px 10px;
    border-radius: 50px; border: 1px solid var(--sp-border);
    transition: all var(--sp-ease); cursor: pointer; background: none; font-family: inherit;
  }
  .post-like-btn:hover { background: var(--sp-green-50); border-color: var(--sp-green-200); color: var(--sp-green-600); }
  .post-like-btn.liked { background: var(--sp-green-50); border-color: var(--sp-green-400); color: var(--sp-green-600); }

  /* STATES */
  .empty-state { text-align: center; padding: 36px 20px; color: var(--sp-muted); }
  .empty-icon { font-size: 36px; margin-bottom: 10px; }
  .empty-state p { font-size: 14px; }

  .loading-state { text-align: center; padding: 80px 20px; color: var(--sp-muted); }
  .loading-spinner {
    width: 40px; height: 40px; border-radius: 50%; margin: 0 auto 16px;
    border: 3px solid var(--sp-green-100);
    border-top-color: var(--sp-green-500);
    animation: spin 0.8s linear infinite;
  }

  .error-banner {
    background: #fce8e8; color: #b82c2c; border: 1px solid #f5c6c6;
    border-radius: var(--sp-radius-sm); padding: 12px 16px; font-size: 13px;
    margin-top: 12px; display: flex; align-items: center; gap: 8px;
  }
  .success-banner {
    background: var(--sp-green-50); color: var(--sp-green-700); border: 1px solid var(--sp-green-200);
    border-radius: var(--sp-radius-sm); padding: 12px 16px; font-size: 13px;
    margin-top: 12px; display: flex; align-items: center; gap: 8px;
  }

  /* TOAST */
  .profile-toast {
    position: fixed; bottom: 24px; left: 50%; transform: translateX(-50%) translateY(80px);
    background: var(--sp-green-700); color: white;
    padding: 12px 24px; border-radius: 50px; font-size: 14px; font-weight: 500;
    box-shadow: var(--sp-shadow-lg); z-index: 999;
    transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
    font-family: 'DM Sans', sans-serif;
  }
  .profile-toast.show { transform: translateX(-50%) translateY(0); }

  @keyframes fadeUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes spin { to { transform: rotate(360deg); } }
`;

const CAT_CLASS = {
  Anxiety: "anxiety",
  Stress: "stress",
  Loneliness: "loneliness",
  General: "",
};
const CAT_EMOJI = {
  Anxiety: "😰",
  Stress: "😤",
  Loneliness: "🫂",
  General: "💬",
};

function Profile() {
  const { token, user } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [bio, setBio] = useState("");
  const [editingBio, setEditingBio] = useState(false);
  const [bioInput, setBioInput] = useState("");
  const [likedPosts, setLikedPosts] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [toast, setToast] = useState({ msg: "", show: false });

  const config = { headers: { Authorization: `Bearer ${token}` } };
  const isOwnProfile = user?.id === id || user?._id === id;

  // ── FETCH PROFILE ─────────────────────────────────────────
  const fetchProfile = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(`${BASE_URL}/api/profile/${id}`, config);
      setProfile(res.data.user);
      setPosts(res.data.posts);
      setBio(res.data.user.bio || "");
    } catch (err) {
      setError("Failed to load profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [id]);

  // ── BIO UPDATE ────────────────────────────────────────────
  const handleUpdateBio = async () => {
    try {
      await axios.put(
        `${BASE_URL}/api/profile/update/bio`,
        { bio: bioInput },
        config
      );
      setBio(bioInput);
      setEditingBio(false);
      showToast("Bio updated! 🎉");
    } catch (err) {
      setError("Failed to update bio.");
    }
  };

  // ── LIKE / UNLIKE ─────────────────────────────────────────
  const handleLike = async (postId) => {
    try {
      const res = await axios.put(
        `${BASE_URL}/api/posts/like/${postId}`,
        {},
        config
      );
      const newCount = res.data.likes;
      setPosts((prev) =>
        prev.map((p) =>
          p._id === postId ? { ...p, likes: Array(newCount).fill("") } : p
        )
      );
      setLikedPosts((prev) => ({ ...prev, [postId]: !prev[postId] }));
    } catch (err) {
      // silently ignore
    }
  };

  // ── START DM ──────────────────────────────────────────────
  const handleStartDM = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/api/dm/start`,
        { recipientId: id },
        config
      );
      navigate(`/dm/${res.data._id}`);
    } catch (err) {
      setError("Failed to start conversation.");
    }
  };

  // ── TOAST ─────────────────────────────────────────────────
  const showToast = (msg) => {
    setToast({ msg, show: true });
    setTimeout(() => setToast({ msg: "", show: false }), 3000);
  };

  // ── HELPERS ───────────────────────────────────────────────
  const getInitials = (name = "") =>
    name
      .split(" ")
      .map((w) => w[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();

  const formatDate = (iso) =>
    new Date(iso).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  const formatJoined = (iso) =>
    new Date(iso).toLocaleDateString("en-IN", {
      month: "long",
      year: "numeric",
    });

  // ── RENDER ────────────────────────────────────────────────
  return (
    <>
      <style>{STYLES}</style>
      <div className="profile-page">
        <Navbar />

        {/* Cover */}
        <div className="profile-cover">
          <div className="cover-pattern" />
          <div className="cover-orb" />
          <div className="cover-orb2" />
        </div>

        {loading ? (
          <div className="loading-state">
            <div className="loading-spinner" />
            <p>Loading profile…</p>
          </div>
        ) : error && !profile ? (
          <div className="profile-wrapper">
            <div className="error-banner" style={{ marginTop: 32 }}>
              ⚠️ {error}
            </div>
          </div>
        ) : (
          profile && (
            <div className="profile-wrapper">
              {/* Avatar + actions */}
              <div className="avatar-section">
                <div className="avatar-ring">
                  <div className="avatar-inner">
                    {getInitials(profile.username)}
                  </div>
                </div>
                <div className="avatar-actions">
                  {isOwnProfile ? (
                    <button
                      className="btn-outline"
                      onClick={() => navigate("/settings")}
                    >
                      ⚙️ Settings
                    </button>
                  ) : (
                    <>
                      <button className="btn-primary" onClick={handleStartDM}>
                        💬 Message
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Identity */}
              <div className="identity">
                <h1>{profile.username}</h1>
                <div className="identity-meta">
                  <span className={`role-badge ${profile.role}`}>
                    {profile.role === "counselor"
                      ? "🩺 Counselor"
                      : profile.role === "admin"
                      ? "🛡️ Admin"
                      : "🌿 Member"}
                  </span>
                  <span className="joined-label">
                    📅 Joined {formatJoined(profile.createdAt)}
                  </span>
                </div>
              </div>

              {/* Alerts */}
              {error && <div className="error-banner">⚠️ {error}</div>}

              {/* Stats */}
              <div className="stats-row">
                <div className="stat-cell">
                  <div className="stat-number">{posts.length}</div>
                  <div className="stat-label">Posts</div>
                </div>
                <div className="stat-cell">
                  <div className="stat-number">
                    {posts.reduce((acc, p) => acc + (p.likes?.length || 0), 0)}
                  </div>
                  <div className="stat-label">Likes Received</div>
                </div>
                <div className="stat-cell">
                  <div className="stat-number">
                    {profile.role === "counselor"
                      ? "🩺"
                      : profile.role === "admin"
                      ? "🛡️"
                      : "🌿"}
                  </div>
                  <div className="stat-label">Role</div>
                </div>
              </div>

              {/* Bio */}
              <div className="profile-card">
                <div className="card-label">About</div>

                {!editingBio ? (
                  <>
                    {bio ? (
                      <p className="bio-text">{bio}</p>
                    ) : (
                      <p className="bio-empty">
                        {isOwnProfile
                          ? "No bio yet — tell the community about yourself!"
                          : "This user hasn't added a bio yet."}
                      </p>
                    )}
                    {isOwnProfile && (
                      <button
                        className="btn-edit-bio"
                        onClick={() => {
                          setBioInput(bio);
                          setEditingBio(true);
                        }}
                      >
                        ✏️ Edit Bio
                      </button>
                    )}
                  </>
                ) : (
                  <>
                    <textarea
                      className="bio-edit-area"
                      value={bioInput}
                      onChange={(e) => setBioInput(e.target.value)}
                      placeholder="Write something about yourself — your story, what brings you here, or anything you'd like to share... 💚"
                    />
                    <div className="bio-edit-actions">
                      <button className="btn-save" onClick={handleUpdateBio}>
                        Save
                      </button>
                      <button
                        className="btn-cancel"
                        onClick={() => setEditingBio(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </>
                )}
              </div>

              {/* Posts */}
              <div className="profile-card">
                <div className="card-label">Community Posts</div>

                {posts.length === 0 ? (
                  <div className="empty-state">
                    <div className="empty-icon">🌱</div>
                    <p>No public posts yet.</p>
                  </div>
                ) : (
                  posts.map((post) => {
                    const cat = post.category;
                    const likeCount = Array.isArray(post.likes)
                      ? post.likes.length
                      : 0;
                    const isLiked =
                      likedPosts[post._id] ||
                      (Array.isArray(post.likes) &&
                        post.likes.includes(user?.id || user?._id));

                    return (
                      <div className="post-item" key={post._id}>
                        <p className="post-content">{post.content}</p>
                        <div className="post-footer">
                          <div className="post-meta">
                            <span
                              className={`post-category ${
                                CAT_CLASS[cat] || ""
                              }`}
                            >
                              {CAT_EMOJI[cat] || "💬"} {cat}
                            </span>
                            <span className="post-date">
                              {formatDate(post.createdAt)}
                            </span>
                          </div>
                          <button
                            className={`post-like-btn ${
                              isLiked ? "liked" : ""
                            }`}
                            onClick={() => handleLike(post._id)}
                          >
                            {isLiked ? "❤️" : "🤍"} {likeCount}
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          )
        )}

        {/* Toast */}
        <div className={`profile-toast ${toast.show ? "show" : ""}`}>
          {toast.msg}
        </div>
      </div>
    </>
  );
}

export default Profile;
