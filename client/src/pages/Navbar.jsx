import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Navbar.css";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navItems = [
    { label: "Home", action: () => navigate("/home") },
    { label: "Community", action: () => navigate("/community") },
    { label: "Consider Therapy", action: () => navigate("/support") },
    { label: "Mood Tracker", action: () => navigate("/mood") },
    { label: "Expert News & Advice", action: () => navigate("/resources") },
    { label: "Request Support", action: () => navigate("/support") },
    { label: "Inbox", action: () => navigate("/inbox") },
    { label: "My Profile", action: () => navigate(`/profile/${user?.id}`) },
  ];

  return (
    <>
      <nav className={`mcb-navbar ${scrolled ? "scrolled" : ""}`}>
        <div className="container">
          <a className="mcb-logo" href="#home">
            <div className="mcb-logo-mark">🌿</div>
            <span className="mcb-logo-text">Mind Care Hub</span>
          </a>
          <ul className="mcb-nav-links">
            {navItems.map((item) => (
              <li key={item.label}>
                <button onClick={item.action}>{item.label}</button>
              </li>
            ))}
            <li>
              <button className="mcb-nav-logout" onClick={handleLogout}>
                Logout
              </button>
            </li>
          </ul>
          <button
            className="mcb-hamburger"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`mcb-mobile-menu ${mobileOpen ? "open" : ""}`}>
        <button
          className="mcb-mobile-close"
          onClick={() => setMobileOpen(false)}
        >
          ✕
        </button>
        {navItems.map((item) => (
          <button
            key={item.label}
            onClick={() => {
              item.action();
              setMobileOpen(false);
            }}
          >
            {item.label}
          </button>
        ))}
        <button
          onClick={() => {
            handleLogout();
            setMobileOpen(false);
          }}
        >
          Logout
        </button>
      </div>
    </>
  );
}

export default Navbar;
