import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Home() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div>
      <h1>Welcome, {user?.username} 👋</h1>
      <p>Role: {user?.role}</p>

      <nav>
        <button onClick={() => navigate("/community")}>Community</button>
        <button onClick={() => navigate("/mood")}>Mood Tracker</button>
        <button onClick={() => navigate("/resources")}>Resources</button>
        {user?.role === "counselor" && (
          <button onClick={() => navigate("/counselor")}>
            Counselor Dashboard
          </button>
        )}
        {user?.role === "admin" && (
          <button onClick={() => navigate("/admin")}>Admin Dashboard</button>
        )}
        <button onClick={handleLogout}>Logout</button>
        <button onClick={() => navigate("/support")}>Request Support</button>
        <button onClick={() => navigate("/inbox")}>Inbox</button>
        <button onClick={() => navigate(`/profile/${user?.id}`)}>
          My Profile
        </button>
        <button onClick={() => navigate("/inbox")}>Inbox</button>
      </nav>
    </div>
  );
}

export default Home;
