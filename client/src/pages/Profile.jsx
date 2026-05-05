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
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useParams, useNavigate } from "react-router-dom";
import "./Profile.css";

/* ── tiny SVG icons (no icon-lib dependency) ── */
const IconArrowLeft = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M19 12H5M12 5l-7 7 7 7" />
  </svg>
);
const IconChat = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);
const IconPencil = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    width="14"
    height="14"
  >
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);
const IconCalendar = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    width="13"
    height="13"
  >
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);
const IconTag = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    width="11"
    height="11"
  >
    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
    <line x1="7" y1="7" x2="7.01" y2="7" />
  </svg>
);
const IconStar = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="10" height="10">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);
const IconLeaf = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    width="12"
    height="12"
  >
    <path d="M2 2s10-2 16 4c4 4 4 10 0 14-4 4-10 4-14 0" />
    <path d="M2 2c0 0 4 8 10 10" />
  </svg>
);

/* ── scroll reveal hook ──────────────────────── */
function useScrollReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.classList.add("visible");
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

/* ── helper: get initials ───────────────────── */
function getInitials(name = "") {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

/* ── Profile component ──────────────────────── */
function Profile() {
  const { token, user } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [bio, setBio] = useState("");
  const [editingBio, setEditingBio] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const ref1 = useScrollReveal();
  const ref2 = useScrollReveal();
  const ref3 = useScrollReveal();

  const config = { headers: { Authorization: `Bearer ${token}` } };
  const isOwnProfile = user?.id === id || user?._id === id;

  /* ── data fetching ── */
  const fetchProfile = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/profile/${id}`,
        config
      );
      setProfile(res.data.user);
      setPosts(res.data.posts);
      setBio(res.data.user.bio || "");
    } catch {
      setError("Failed to fetch profile.");
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [id]);

  /* ── bio update ── */
  const handleUpdateBio = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        "http://localhost:5000/api/profile/update/bio",
        { bio },
        config
      );
      setSuccess("Bio updated!");
      setEditingBio(false);
      fetchProfile();
      setTimeout(() => setSuccess(""), 3000);
    } catch {
      setError("Failed to update bio.");
    }
  };

  /* ── start DM ── */
  const handleStartDM = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/dm/start",
        { recipientId: id },
        config
      );
      navigate(`/dm/${res.data._id}`);
    } catch {
      setError("Failed to start conversation.");
    }
  };

  /* ── loading state ── */
  if (!profile) {
    return (
      <div className="profile-loading">
        <div className="loading-spinner" />
        <p className="loading-text">Loading profile…</p>
      </div>
    );
  }

  const isCounselor = profile.role?.toLowerCase() === "counselor";
  const joinDate = new Date(profile.createdAt).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="profile-page">
      {/* ── hero strip ── */}
      <div className="profile-hero-strip">
        <button className="profile-back-btn" onClick={() => navigate(-1)}>
          <IconArrowLeft /> Back
        </button>
      </div>

      <div className="profile-container">
        {/* ── alerts ── */}
        {error && (
          <div className="profile-alert profile-alert--error">⚠ {error}</div>
        )}
        {success && (
          <div className="profile-alert profile-alert--success">
            ✓ {success}
          </div>
        )}

        {/* ── main profile card ── */}
        <div className="profile-card reveal visible" ref={ref1}>
          {/* Avatar */}
          <div className="profile-avatar">
            {getInitials(profile.username)}
            <span className="profile-avatar-badge">
              {isCounselor ? <IconStar /> : <IconLeaf />}
            </span>
          </div>

          {/* Identity + bio */}
          <div className="profile-identity">
            <h1 className="profile-username">{profile.username}</h1>

            <div className="profile-meta">
              <span
                className={`profile-role-badge${
                  isCounselor ? " profile-role-badge--counselor" : ""
                }`}
              >
                {isCounselor ? "✦ Counselor" : "✿ Member"}
              </span>
              <span className="profile-joined">
                <IconCalendar /> Joined {joinDate}
              </span>
            </div>

            {/* Bio view */}
            {!editingBio && (
              <div>
                {profile.bio ? (
                  <p className="profile-bio-view">"{profile.bio}"</p>
                ) : (
                  <p className="profile-bio-empty">
                    No bio yet — share a little about yourself.
                  </p>
                )}
                {isOwnProfile && (
                  <button
                    className="btn-edit-bio"
                    onClick={() => setEditingBio(true)}
                  >
                    <IconPencil /> {profile.bio ? "Edit bio" : "Add bio"}
                  </button>
                )}
              </div>
            )}

            {/* Bio edit form */}
            {editingBio && (
              <form className="bio-edit-form" onSubmit={handleUpdateBio}>
                <label className="bio-edit-label" htmlFor="bio-input">
                  Your bio
                </label>
                <textarea
                  id="bio-input"
                  className="bio-textarea"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Write something about yourself…"
                  rows={3}
                />
                <div className="bio-edit-actions">
                  <button type="submit" className="btn-save">
                    Save changes
                  </button>
                  <button
                    type="button"
                    className="btn-cancel"
                    onClick={() => setEditingBio(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Actions */}
          <div className="profile-card-actions">
            {!isOwnProfile && (
              <button className="btn-message" onClick={handleStartDM}>
                <IconChat /> Send Message
              </button>
            )}
          </div>
        </div>

        {/* ── stats row ── */}
        <div className="profile-stats reveal" ref={ref2}>
          <div className="stat-card reveal-delay-1">
            <div className="stat-number">{posts.length}</div>
            <div className="stat-label">Posts shared</div>
          </div>
          <div className="stat-card reveal-delay-2">
            <div className="stat-number">
              {Math.max(
                1,
                Math.floor(
                  (Date.now() - new Date(profile.createdAt)) /
                    (1000 * 60 * 60 * 24)
                )
              )}
            </div>
            <div className="stat-label">Days with us</div>
          </div>
          <div className="stat-card reveal-delay-3">
            <div className="stat-number">{isCounselor ? "✦" : "✿"}</div>
            <div className="stat-label">
              {isCounselor ? "Verified counselor" : "Community member"}
            </div>
          </div>
        </div>

        {/* ── posts ── */}
        <div className="profile-posts-section reveal" ref={ref3}>
          <div className="section-header">
            <h2 className="section-title">Posts by {profile.username}</h2>
            {posts.length > 0 && (
              <span className="section-count">
                {posts.length} post{posts.length !== 1 ? "s" : ""}
              </span>
            )}
          </div>

          {posts.length === 0 ? (
            <div className="posts-empty">
              <div className="posts-empty-icon">🌿</div>
              <p>No public posts yet — this garden is still growing.</p>
            </div>
          ) : (
            <div className="posts-grid">
              {posts.map((post, i) => (
                <div
                  key={post._id}
                  className="post-card reveal"
                  style={{
                    transitionDelay: `${i * 0.08}s`,
                    opacity: 1,
                    transform: "none",
                  }}
                >
                  <div className="post-card-header">
                    <span className="post-category">
                      <IconTag /> {post.category || "General"}
                    </span>
                    <span className="post-date">
                      <IconCalendar />
                      {new Date(post.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  <p className="post-content">{post.content}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
