// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// function Home() {
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     navigate("/login");
//   };

//   return (
//     <div>
//       <h1>Welcome, {user?.username} 👋</h1>
//       <p>Role: {user?.role}</p>

//       <nav>
//         <button onClick={() => navigate("/community")}>Community</button>
//         <button onClick={() => navigate("/mood")}>Mood Tracker</button>
//         <button onClick={() => navigate("/resources")}>Resources</button>
//         {user?.role === "counselor" && (
//           <button onClick={() => navigate("/counselor")}>
//             Counselor Dashboard
//           </button>
//         )}
//         {user?.role === "admin" && (
//           <button onClick={() => navigate("/admin")}>Admin Dashboard</button>
//         )}
//         <button onClick={handleLogout}>Logout</button>
//         <button onClick={() => navigate("/support")}>Request Support</button>
//         <button onClick={() => navigate("/inbox")}>Inbox</button>
//         <button onClick={() => navigate(`/profile/${user?.id}`)}>
//           My Profile
//         </button>
//         <button onClick={() => navigate("/inbox")}>Inbox</button>
//       </nav>
//     </div>
//   );
// }

// export default Home;
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Home.css";

function Home() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const heroBgRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (heroBgRef.current) {
        heroBgRef.current.style.transform = `scale(1) translateY(${
          window.scrollY * 0.3
        }px)`;
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (heroBgRef.current) {
      heroBgRef.current.classList.add("loaded");
    }
  }, []);

  useEffect(() => {
    const reveals = document.querySelectorAll(".mcb-reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("visible");
        });
      },
      { threshold: 0.12 }
    );
    reveals.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
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
    <div className="mcb-root">
      {/* ─── NAVBAR ─── */}
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

      {/* ─── HERO ─── */}
      <section className="mcb-hero" id="home">
        <div className="mcb-hero-bg" ref={heroBgRef} />
        <div className="mcb-hero-overlay" />
        <div className="container">
          <div className="mcb-hero-content">
            <div className="mcb-hero-badge">
              <span className="mcb-hero-badge-dot" />
              Safe · Anonymous · Supportive
            </div>
            <h1>
              Your mind deserves <em>gentle</em> care
            </h1>
            <p className="mcb-hero-sub">
              Mind Care Hub is a safe, anonymous space where you can share,
              heal, and find support — from a community that understands, and
              verified professionals who care.
            </p>
            <div className="mcb-hero-actions">
              <button
                className="mcb-btn-primary"
                onClick={() => navigate("/community")}
              >
                Join the Community →
              </button>
              <button
                className="mcb-btn-outline"
                onClick={() => navigate("/support")}
              >
                Talk to a Counselor
              </button>
            </div>

            {/* ── STATS BAR ── */}
            <div className="mcb-hero-stats">
              {[
                { num: "12,400+", label: "Lives Supported" },
                { num: "98%", label: "Feel Less Alone" },
                { num: "340+", label: "Verified Counselors" },
                { num: "4.9★", label: "User Rating" },
              ].map((s, i) => (
                <div className="mcb-hero-stat" key={i}>
                  <div className="mcb-hero-stat-num">{s.num}</div>
                  <div className="mcb-hero-stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mcb-hero-scroll">
          <div className="mcb-hero-scroll-line" />
          scroll
        </div>
      </section>

      {/* ─── ABOUT / FEATURES ─── */}
      <section className="mcb-about">
        <div className="container">
          <div className="mcb-about-grid">
            <div className="mcb-reveal">
              <div className="mcb-about-image">
                <img
                  src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&q=80"
                  alt="Person finding peace"
                  loading="lazy"
                />
                <div className="mcb-about-image-badge">
                  <div className="mcb-about-image-badge-icon">🛡️</div>
                  <div>
                    <p>100% Anonymous</p>
                    <span>Your identity is always safe</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mcb-reveal mcb-reveal-delay-2">
              <span className="mcb-section-label">About Mind Care Hub</span>
              <h2 className="mcb-section-title">
                A place to breathe, share, and <em>heal</em>
              </h2>
              <p className="mcb-section-sub">
                We believe mental health support should be accessible to
                everyone — not just those who can afford it or find it. Mind
                Care Hub brings together community, counselors, and tools so you
                never have to face your struggles alone.
              </p>
              <div className="mcb-features-list">
                {[
                  {
                    icon: "🌿",
                    title: "Anonymous Community",
                    desc: "Post your thoughts and feelings without revealing your identity. No judgment, ever.",
                  },
                  {
                    icon: "📊",
                    title: "Mood Tracker",
                    desc: "Log your daily mood and watch your emotional patterns emerge over time.",
                  },
                  {
                    icon: "🤝",
                    title: "Verified Counselors",
                    desc: "Connect with verified mental health professionals for real support.",
                  },
                  {
                    icon: "💬",
                    title: "Private Messaging",
                    desc: "Reach out to peers directly — your inbox unlocks when connection begins.",
                  },
                ].map((f, i) => (
                  <div className="mcb-feature-item" key={i}>
                    <div className="mcb-feature-icon">{f.icon}</div>
                    <div>
                      <h4>{f.title}</h4>
                      <p>{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── COUNSELOR SECTION ─── */}
      <section className="mcb-counselor">
        <div className="container">
          <div className="mcb-counselor-inner">
            <div className="mcb-reveal">
              <div className="mcb-counselor-image">
                <img
                  src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&q=80"
                  alt="Counselor ready to help"
                  loading="lazy"
                />
                <div className="mcb-chat-bubble-wrapper">
                  <div className="mcb-chat-bubble">
                    <div className="mcb-chat-avatar">🧑‍⚕️</div>
                    <div>
                      <strong>Dr. Priya — Counselor</strong>
                      <p>
                        "How are you feeling today? I'm here to listen and
                        support you, whenever you're ready to talk."
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mcb-counselor-content mcb-reveal mcb-reveal-delay-2">
              <span className="mcb-section-label">Meet Our Counselors</span>
              <h2 className="mcb-section-title">
                Verified professionals, <em>genuinely</em> here for you
              </h2>
              <p className="mcb-section-sub">
                Every counselor and therapist on Mind Care Hub is verified by
                our admin team. They begin with free consultations so you can
                find the right fit before committing to paid sessions.
              </p>
              <div className="mcb-counselor-stats">
                {[
                  { num: "100%", label: "Verified" },
                  { num: "Free", label: "First Session" },
                  { num: "24/7", label: "Support" },
                ].map((s, i) => (
                  <div className="mcb-stat" key={i}>
                    <div className="mcb-stat-num">{s.num}</div>
                    <div className="mcb-stat-label">{s.label}</div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: "32px" }}>
                <button
                  className="mcb-btn-primary"
                  onClick={() => navigate("/support")}
                >
                  Request Support →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── COMMUNITY SECTION ─── */}
      <section className="mcb-community">
        <div className="container">
          <div className="mcb-community-inner">
            <div className="mcb-reveal">
              <span className="mcb-section-label">Community</span>
              <h2 className="mcb-section-title">
                You are <em>not</em> alone in this
              </h2>
              <p className="mcb-section-sub">
                Thousands of people share their journeys in our anonymous
                community — finding connection, comfort, and understanding from
                others who truly get it.
              </p>
              <div className="mcb-community-cta">
                <button
                  className="mcb-btn-outline"
                  onClick={() => navigate("/community")}
                >
                  Explore Community →
                </button>
              </div>
            </div>

            <div className="mcb-community-cards mcb-reveal mcb-reveal-delay-2">
              {[
                {
                  avatar: "🐼",
                  name: "Anonymous Panda",
                  tag: "Anxiety",
                  text: "I've been struggling with anxiety before big presentations. Today I tried the breathing exercise from resources and it actually helped...",
                  likes: "14 💚",
                  comments: "6 replies",
                },
                {
                  avatar: "🦋",
                  name: "Anonymous Butterfly",
                  tag: "Stress",
                  text: "Week 3 of tracking my mood. I can finally see the pattern — my worst days are Mondays. Small insight but it feels like progress.",
                  likes: "28 💚",
                  comments: "11 replies",
                },
                {
                  avatar: "🌊",
                  name: "Anonymous Wave",
                  tag: "Loneliness",
                  text: "Moving to a new city was harder than I expected. Coming here and reading others' stories makes me feel less invisible.",
                  likes: "42 💚",
                  comments: "19 replies",
                },
              ].map((post, i) => (
                <div className="mcb-community-card" key={i}>
                  <div className="mcb-community-card-header">
                    <div className="mcb-community-card-avatar">
                      {post.avatar}
                    </div>
                    <span className="mcb-community-card-name">{post.name}</span>
                    <span className="mcb-community-card-tag">{post.tag}</span>
                  </div>
                  <p>{post.text}</p>
                  <div className="mcb-community-card-footer">
                    <span>{post.likes}</span>
                    <span>{post.comments}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── ANONYMOUS CHAT SECTION ─── */}
      <section className="mcb-anon">
        <div className="container">
          <div className="mcb-anon-inner">
            <div className="mcb-anon-visual mcb-reveal">
              <div className="mcb-anon-image">
                <img
                  src="https://images.unsplash.com/photo-1603899122634-f086ca5f5ddd?w=800&q=80"
                  alt="Person finding comfort online"
                  loading="lazy"
                />
              </div>
              <div className="mcb-anon-chat-overlay">
                <div className="mcb-anon-chat-title">Live Support Chat</div>
                <div className="mcb-chat-msg them">
                  <div className="mcb-chat-msg-bubble">
                    I've been feeling overwhelmed lately...
                  </div>
                  <span className="mcb-chat-msg-time">2:14 PM</span>
                </div>
                <div className="mcb-chat-msg me">
                  <div className="mcb-chat-msg-bubble">
                    I hear you. You're safe here 🌿
                  </div>
                  <span className="mcb-chat-msg-time">2:15 PM</span>
                </div>
                <div className="mcb-chat-msg them">
                  <div className="mcb-chat-msg-bubble">
                    Thank you for listening...
                  </div>
                  <span className="mcb-chat-msg-time">2:16 PM</span>
                </div>
              </div>
            </div>

            <div className="mcb-anon-content mcb-reveal mcb-reveal-delay-2">
              <span className="mcb-section-label">Anonymous Support</span>
              <h2 className="mcb-section-title">
                Say what you feel, <em>safely</em>
              </h2>
              <p className="mcb-section-sub">
                Our anonymous chat connects you directly with verified
                counselors in real-time. No names, no judgments — just genuine
                human support when you need it most.
              </p>
              <div className="mcb-anon-points">
                {[
                  {
                    icon: "🎭",
                    title: "Stay Anonymous",
                    desc: "Your identity is never revealed unless you choose to share it.",
                  },
                  {
                    icon: "⚡",
                    title: "Real-Time Connection",
                    desc: "Live chat powered by Socket.io for instant, seamless conversations.",
                  },
                  {
                    icon: "🔒",
                    title: "Private & Secure",
                    desc: "End-to-end encrypted messages with JWT-secured sessions.",
                  },
                ].map((p, i) => (
                  <div className="mcb-anon-point" key={i}>
                    <div className="mcb-anon-point-icon">{p.icon}</div>
                    <div>
                      <h4>{p.title}</h4>
                      <p>{p.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── HOW THERAPY WORKS ─── */}
      <section className="mcb-therapy">
        <div className="container">
          <div className="mcb-therapy-header mcb-reveal">
            <span className="mcb-section-label">How It Works</span>
            <h2 className="mcb-section-title">
              Your path to <em>feeling better</em>
            </h2>
            <p className="mcb-section-sub">
              Getting support has never been simpler. Four steps stand between
              you and the help you deserve.
            </p>
          </div>

          <div className="mcb-therapy-steps">
            {[
              {
                num: "1",
                title: "Create an Account",
                desc: "Sign up anonymously in seconds. No personal details required to get started.",
              },
              {
                num: "2",
                title: "Share Your Story",
                desc: "Post in the community or send a private support request to a verified counselor.",
              },
              {
                num: "3",
                title: "Connect & Talk",
                desc: "Chat live with your counselor or engage with supportive community members.",
              },
              {
                num: "4",
                title: "Track & Grow",
                desc: "Log your mood daily and watch your emotional journey unfold over time.",
              },
            ].map((step, i) => (
              <div
                className={`mcb-therapy-step mcb-reveal mcb-reveal-delay-${
                  i + 1
                }`}
                key={i}
              >
                <div className="mcb-therapy-step-num">{step.num}</div>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>

          <div className="mcb-therapy-image mcb-reveal">
            <img
              src="https://images.unsplash.com/photo-1516302752625-fcc3c50ae61f?w=1600&q=80"
              alt="Therapy session"
              loading="lazy"
            />
            <div className="mcb-therapy-image-overlay">
              <div className="mcb-therapy-image-text">
                <h3>Begin your healing journey today</h3>
                <p>
                  Thousands of people have already taken the first step. You
                  deserve support — and it starts with a single message.
                </p>
                <button
                  className="mcb-btn-primary"
                  onClick={() => navigate("/support")}
                >
                  Get Started →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="mcb-footer">
        <div className="container">
          <div className="mcb-footer-grid">
            <div className="mcb-footer-brand">
              <a className="mcb-footer-logo" href="#home">
                <div className="mcb-footer-logo-mark">🌿</div>
                <span className="mcb-footer-logo-text">Mind Care Hub</span>
              </a>
              <p>
                A safe, anonymous space for mental health support. Built with
                care for everyone who needs a place to breathe.
              </p>
            </div>

            <div className="mcb-footer-col">
              <h4>Platform</h4>
              <ul>
                <li>
                  <button onClick={() => navigate("/community")}>
                    Community
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate("/mood")}>
                    Mood Tracker
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate("/resources")}>
                    Resources
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate("/support")}>
                    Request Support
                  </button>
                </li>
              </ul>
            </div>

            <div className="mcb-footer-col">
              <h4>Support</h4>
              <ul>
                <li>
                  <button onClick={() => navigate("/support")}>
                    Talk to Counselor
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate("/inbox")}>Inbox</button>
                </li>
                <li>
                  <button onClick={() => navigate(`/profile/${user?.id}`)}>
                    My Profile
                  </button>
                </li>
              </ul>
            </div>

            <div className="mcb-footer-col">
              <h4>Legal</h4>
              <ul>
                <li>
                  <a href="#">Privacy Policy</a>
                </li>
                <li>
                  <a href="#">Terms of Service</a>
                </li>
                <li>
                  <a href="#">Cookie Policy</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mcb-footer-bottom">
            <p>© 2025 Mind Care Hub. All rights reserved.</p>
            <div className="mcb-footer-bottom-links">
              <a href="#">Privacy</a>
              <a href="#">Terms</a>
              <a href="#">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
