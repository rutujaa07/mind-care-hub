import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/Navbar.css";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const go = (path) => {
    navigate(path);
    setMenuOpen(false);
  };

  const isActive = (path) =>
    location.pathname === path ? "nav-link active" : "nav-link";

  const navItems = [
    { label: "Home", path: "/" },
    { label: "Community", path: "/community" },
    { label: "Consider Therapy", path: "/therapy" },
    { label: "Mood Tracker", path: "/mood" },
    { label: "Request Support", path: "/support" },
    { label: "Inbox", path: "/inbox", icon: "fa-regular fa-envelope" },
    {
      label: "My Profile",
      path: `/profile/${user?.id}`,
      icon: "fa-regular fa-circle-user",
    },
    // { label: "Resources",       path: "/resources" },
  ];

  return (
    <nav className={`navbar${scrolled ? " scrolled" : ""}`}>
      <div className="nav-inner">
        {/* Brand */}
        <button className="brand" onClick={() => go("/")}>
          <span className="brand-icon">
            <i className="fa-solid fa-brain" />
          </span>
          <span className="brand-text">
            Mind<span>Care</span>Hub
          </span>
        </button>

        {/* Desktop links */}
        <ul className="nav-links">
          {navItems.map((item) => (
            <li key={item.path}>
              <button
                className={isActive(item.path)}
                onClick={() => go(item.path)}
              >
                {item.icon && <i className={item.icon} />}
                {item.label}
              </button>
            </li>
          ))}

          {/* Expert Advice dropdown */}
          <li className="nav-dropdown">
            <button className="nav-link">
              Expert Advice{" "}
              <i
                className="fa-solid fa-chevron-down"
                style={{ fontSize: "0.65rem" }}
              />
            </button>
            <div className="dropdown-menu">
              <a className="dropdown-item" href="#news">
                Mental Health News
              </a>
              <a className="dropdown-item" href="#news">
                Expert Articles
              </a>
            </div>
          </li>

          {/* Role-based links */}
          {user?.role === "counselor" && (
            <li>
              <button
                className={isActive("/counselor")}
                onClick={() => go("/counselor")}
              >
                Counselor Dashboard
              </button>
            </li>
          )}
          {user?.role === "admin" && (
            <li>
              <button
                className={isActive("/admin")}
                onClick={() => go("/admin")}
              >
                Admin
              </button>
            </li>
          )}

          <li className="desktop-logout">
            <button className="btn-logout" onClick={handleLogout}>
              <i className="fa-solid fa-right-from-bracket" /> Logout
            </button>
          </li>
        </ul>

        {/* Hamburger */}
        <button
          className={`hamburger${menuOpen ? " open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Mobile nav */}
      <div className={`mobile-nav${menuOpen ? " open" : ""}`}>
        {navItems.map((item) => (
          <button
            key={item.path}
            className={isActive(item.path)}
            onClick={() => go(item.path)}
          >
            {item.icon && <i className={item.icon} />} {item.label}
          </button>
        ))}
        <button className="nav-link" onClick={() => go("/news")}>
          Expert Advice
        </button>
        {user?.role === "counselor" && (
          <button className="nav-link" onClick={() => go("/counselor")}>
            Counselor Dashboard
          </button>
        )}
        {user?.role === "admin" && (
          <button className="nav-link" onClick={() => go("/admin")}>
            Admin
          </button>
        )}
        <button className="btn-logout" onClick={handleLogout}>
          <i className="fa-solid fa-right-from-bracket" /> Logout
        </button>
      </div>
    </nav>
  );
}
