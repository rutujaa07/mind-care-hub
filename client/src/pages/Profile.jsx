import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useParams, useNavigate } from "react-router-dom";

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

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const isOwnProfile = user?.id === id || user?._id === id;
  console.log("user id:", user?.id, "profile id:", id);
  const fetchProfile = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/profile/${id}`,
        config
      );
      setProfile(res.data.user);
      setPosts(res.data.posts);
      setBio(res.data.user.bio || "");
    } catch (err) {
      setError("Failed to fetch profile");
    }
  };

  const handleUpdateBio = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        "http://localhost:5000/api/profile/update/bio",
        { bio },
        config
      );
      setSuccess("Bio updated! 🎉");
      setEditingBio(false);
      fetchProfile();
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError("Failed to update bio");
    }
  };

  const handleStartDM = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/dm/start",
        { recipientId: id },
        config
      );
      navigate(`/dm/${res.data._id}`);
    } catch (err) {
      setError("Failed to start conversation");
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [id]);

  if (!profile) return <p>Loading...</p>;

  return (
    <div>
      <button onClick={() => navigate(-1)}>← Back</button>

      {error && <p>{error}</p>}
      {success && <p>{success}</p>}

      {/* Profile Header */}
      <h1>{profile.username}</h1>
      <p>Role: {profile.role}</p>
      <p>Joined: {new Date(profile.createdAt).toLocaleDateString()}</p>

      {/* Bio */}
      {!editingBio ? (
        <div>
          <p>{profile.bio || "No bio yet"}</p>
          {isOwnProfile && (
            <button onClick={() => setEditingBio(true)}>Edit Bio</button>
          )}
        </div>
      ) : (
        <form onSubmit={handleUpdateBio}>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Write something about yourself..."
          />
          <button type="submit">Save</button>
          <button type="button" onClick={() => setEditingBio(false)}>
            Cancel
          </button>
        </form>
      )}

      {/* Message button — only show if not own profile */}
      {!isOwnProfile && (
        <button onClick={handleStartDM}>💬 Send Message</button>
      )}

      {/* Their public posts */}
      <h2>Posts by {profile.username}</h2>
      {posts.length === 0 && <p>No public posts yet</p>}
      {posts.map((post) => (
        <div
          key={post._id}
          style={{ border: "1px solid black", margin: 10, padding: 10 }}
        >
          <p>{post.content}</p>
          <p>Category: {post.category}</p>
          <p>{new Date(post.createdAt).toLocaleDateString()}</p>
        </div>
      ))}
    </div>
  );
}

export default Profile;
