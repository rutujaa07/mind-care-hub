import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

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

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const fetchPosts = async () => {
    try {
      const url = filterCategory
        ? `http://localhost:5000/api/posts?category=${filterCategory}`
        : "http://localhost:5000/api/posts";
      const res = await axios.get(url, config);
      setPosts(res.data);
    } catch (err) {
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
    } catch (err) {
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
      fetchPosts();
    } catch (err) {
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
    } catch (err) {
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
    } catch (err) {
      setError("Failed to add comment");
    }
  };

  const handleViewComments = (postId) => {
    setSelectedPost(postId);
    fetchComments(postId);
  };

  useEffect(() => {
    fetchPosts();
  }, [filterCategory]);

  return (
    <div>
      <h1>Community</h1>
      {error && <p>{error}</p>}

      {/* Filter */}
      <div>
        <label>Filter by category: </label>
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
        >
          <option value="">All</option>
          <option value="anxiety">Anxiety</option>
          <option value="stress">Stress</option>
          <option value="loneliness">Loneliness</option>
          <option value="general">General</option>
        </select>
      </div>

      {/* Create Post */}
      <form onSubmit={handleCreatePost}>
        <h2>Create Post</h2>
        <textarea
          placeholder="Share how you're feeling..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="general">General</option>
          <option value="anxiety">Anxiety</option>
          <option value="stress">Stress</option>
          <option value="loneliness">Loneliness</option>
        </select>
        <label>
          <input
            type="checkbox"
            checked={isAnonymous}
            onChange={(e) => setIsAnonymous(e.target.checked)}
          />
          Post Anonymously
        </label>
        <button type="submit">Post</button>
      </form>

      {/* Posts List */}
      <h2>Posts</h2>
      {posts.map((post) => (
        <div key={post._id}>
          {/* Clickable username on post */}
          <p>
            <strong
              style={{
                cursor: post.isAnonymous ? "default" : "pointer",
                color: post.isAnonymous ? "black" : "blue",
              }}
              onClick={() =>
                !post.isAnonymous && navigate(`/profile/${post.userId}`)
              }
            >
              {post.isAnonymous ? "Anonymous" : post.username}
            </strong>{" "}
            — {post.category}
          </p>

          <p>{post.content}</p>
          <p>Likes: {post.likes.length}</p>
          <button onClick={() => handleLike(post._id)}>Like</button>
          <button onClick={() => handleViewComments(post._id)}>Comments</button>

          {/* Comments Section */}
          {selectedPost === post._id && (
            <div>
              <h4>Comments</h4>
              {comments.map((comment) => (
                <div key={comment._id}>
                  {/* Clickable username on comment */}
                  <p>
                    <strong
                      style={{
                        cursor: comment.isAnonymous ? "default" : "pointer",
                        color: comment.isAnonymous ? "black" : "blue",
                      }}
                      onClick={() =>
                        !comment.isAnonymous &&
                        navigate(`/profile/${comment.userId}`)
                      }
                    >
                      {comment.isAnonymous ? "Anonymous" : comment.username}
                    </strong>
                  </p>
                  <p>{comment.content}</p>
                </div>
              ))}

              <form onSubmit={handleAddComment}>
                <input
                  type="text"
                  placeholder="Add a comment..."
                  value={commentContent}
                  onChange={(e) => setCommentContent(e.target.value)}
                  required
                />
                <button type="submit">Comment</button>
              </form>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Community;
