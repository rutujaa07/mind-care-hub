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
// import { useEffect, useState, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import "./Home.css";

// function Home() {
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();
//   const [scrolled, setScrolled] = useState(false);
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const heroBgRef = useRef(null);

//   // ✅ REAL-TIME STATS
//   const [stats, setStats] = useState(null);

//   useEffect(() => {
//     fetch("/api/stats")
//       .then((res) => res.json())
//       .then((data) => setStats(data))
//       .catch((err) => console.error("Stats fetch error:", err));
//   }, []);

//   useEffect(() => {
//     const onScroll = () => setScrolled(window.scrollY > 60);
//     window.addEventListener("scroll", onScroll);
//     return () => window.removeEventListener("scroll", onScroll);
//   }, []);

//   useEffect(() => {
//     const onScroll = () => {
//       if (heroBgRef.current) {
//         heroBgRef.current.style.transform = `scale(1) translateY(${
//           window.scrollY * 0.3
//         }px)`;
//       }
//     };
//     window.addEventListener("scroll", onScroll);
//     return () => window.removeEventListener("scroll", onScroll);
//   }, []);

//   useEffect(() => {
//     if (heroBgRef.current) heroBgRef.current.classList.add("loaded");
//   }, []);

//   useEffect(() => {
//     const reveals = document.querySelectorAll(".mcb-reveal");
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((e) => {
//           if (e.isIntersecting) e.target.classList.add("visible");
//         });
//       },
//       { threshold: 0.12 }
//     );
//     reveals.forEach((el) => observer.observe(el));
//     return () => observer.disconnect();
//   }, []);

//   const handleLogout = () => {
//     logout();
//     navigate("/login");
//   };

//   const navItems = [
//     { label: "Home", action: () => navigate("/home") },
//     { label: "Community", action: () => navigate("/community") },
//     { label: "Consider Therapy", action: () => navigate("/support") },
//     { label: "Mood Tracker", action: () => navigate("/mood") },
//     { label: "Expert News & Advice", action: () => navigate("/resources") },
//     { label: "Request Support", action: () => navigate("/support") },
//     { label: "Inbox", action: () => navigate("/inbox") },
//     { label: "My Profile", action: () => navigate(`/profile/${user?.id}`) },
//   ];

//   return (
//     <div className="mcb-root">
//       {/* ─── NAVBAR ─── */}
//       <nav className={`mcb-navbar ${scrolled ? "scrolled" : ""}`}>
//         <div className="container">
//           <a className="mcb-logo" href="#home">
//             <div className="mcb-logo-mark">🌿</div>
//             <span className="mcb-logo-text">Mind Care Hub</span>
//           </a>
//           <ul className="mcb-nav-links">
//             {navItems.map((item) => (
//               <li key={item.label}>
//                 <button onClick={item.action}>{item.label}</button>
//               </li>
//             ))}
//             <li>
//               <button className="mcb-nav-logout" onClick={handleLogout}>
//                 Logout
//               </button>
//             </li>
//           </ul>
//           <button
//             className="mcb-hamburger"
//             onClick={() => setMobileOpen(true)}
//             aria-label="Open menu"
//           >
//             <span />
//             <span />
//             <span />
//           </button>
//         </div>
//       </nav>

//       {/* Mobile Menu */}
//       <div className={`mcb-mobile-menu ${mobileOpen ? "open" : ""}`}>
//         <button
//           className="mcb-mobile-close"
//           onClick={() => setMobileOpen(false)}
//         >
//           ✕
//         </button>
//         {navItems.map((item) => (
//           <button
//             key={item.label}
//             onClick={() => {
//               item.action();
//               setMobileOpen(false);
//             }}
//           >
//             {item.label}
//           </button>
//         ))}
//         <button
//           onClick={() => {
//             handleLogout();
//             setMobileOpen(false);
//           }}
//         >
//           Logout
//         </button>
//       </div>

//       {/* ─── HERO ─── */}
//       <section className="mcb-hero" id="home">
//         <div className="mcb-hero-bg" ref={heroBgRef} />
//         <div className="mcb-hero-overlay" />
//         <div className="container">
//           <div className="mcb-hero-content">
//             <div className="mcb-hero-badge">
//               <span className="mcb-hero-badge-dot" />
//               Safe · Anonymous · Supportive
//             </div>
//             <h1>
//               Your mind deserves <em>gentle</em> care
//             </h1>
//             <p className="mcb-hero-sub">
//               Mind Care Hub is a safe, anonymous space where you can share,
//               heal, and find support — from a community that understands, and
//               verified professionals who care.
//             </p>
//             <div className="mcb-hero-actions">
//               <button
//                 className="mcb-btn-primary"
//                 onClick={() => navigate("/community")}
//               >
//                 Join the Community →
//               </button>
//               <button
//                 className="mcb-btn-outline"
//                 onClick={() => navigate("/support")}
//               >
//                 Talk to a Counselor
//               </button>
//             </div>

//             {/* ── REAL-TIME STATS BAR ── */}
//             <div className="mcb-hero-stats">
//               {[
//                 {
//                   num: stats ? `${stats.totalUsers.toLocaleString()}+` : "...",
//                   label: "Members Joined",
//                 },
//                 {
//                   num: stats ? `${stats.totalPosts.toLocaleString()}+` : "...",
//                   label: "Stories Shared",
//                 },
//                 {
//                   num: stats ? `${stats.totalCounselors}+` : "...",
//                   label: "Verified Counselors",
//                 },
//                 {
//                   num: stats ? `${stats.totalSupportResolved}+` : "...",
//                   label: "Support Sessions Done",
//                 },
//               ].map((s, i) => (
//                 <div className="mcb-hero-stat" key={i}>
//                   <div className="mcb-hero-stat-num">{s.num}</div>
//                   <div className="mcb-hero-stat-label">{s.label}</div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//         <div className="mcb-hero-scroll">
//           <div className="mcb-hero-scroll-line" />
//           scroll
//         </div>
//       </section>

//       {/* ─── COUNSELOR SECTION ─── */}
//       <section className="mcb-counselor">
//         <div className="container">
//           <div className="mcb-counselor-inner">
//             <div className="mcb-reveal">
//               <div className="mcb-counselor-image">
//                 <img
//                   src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&q=80"
//                   alt="Counselor ready to help"
//                   loading="lazy"
//                 />
//                 <div className="mcb-chat-bubble-wrapper">
//                   <div className="mcb-chat-bubble">
//                     <div className="mcb-chat-avatar">🧑‍⚕️</div>
//                     <div>
//                       <strong>Dr. Priya — Counselor</strong>
//                       <p>
//                         "How are you feeling today? I'm here to listen and
//                         support you, whenever you're ready to talk."
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="mcb-counselor-content mcb-reveal mcb-reveal-delay-2">
//               <span className="mcb-section-label">Meet Our Counselors</span>
//               <h2 className="mcb-section-title">
//                 Verified professionals, <em>genuinely</em> here for you
//               </h2>
//               <p className="mcb-section-sub">
//                 Every counselor and therapist on Mind Care Hub is verified by
//                 our admin team. They begin with free consultations so you can
//                 find the right fit before committing to paid sessions.
//               </p>
//               <div className="mcb-counselor-stats">
//                 {[
//                   { num: "100%", label: "Verified" },
//                   { num: "Free", label: "First Session" },
//                   { num: "24/7", label: "Support" },
//                 ].map((s, i) => (
//                   <div className="mcb-stat" key={i}>
//                     <div className="mcb-stat-num">{s.num}</div>
//                     <div className="mcb-stat-label">{s.label}</div>
//                   </div>
//                 ))}
//               </div>
//               <div style={{ marginTop: "32px" }}>
//                 <button
//                   className="mcb-btn-primary"
//                   onClick={() => navigate("/support")}
//                 >
//                   Request Support →
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* ─── COMMUNITY SECTION ─── */}
//       <section className="mcb-community">
//         <div className="container">
//           <div className="mcb-community-inner">
//             <div className="mcb-reveal">
//               <span className="mcb-section-label">Community</span>
//               <h2 className="mcb-section-title">
//                 You are <em>not</em> alone in this
//               </h2>
//               <p className="mcb-section-sub">
//                 Thousands of people share their journeys in our anonymous
//                 community — finding connection, comfort, and understanding from
//                 others who truly get it.
//               </p>
//               <div className="mcb-community-cta">
//                 <button
//                   className="mcb-btn-outline"
//                   onClick={() => navigate("/community")}
//                 >
//                   Explore Community →
//                 </button>
//               </div>
//             </div>

//             <div className="mcb-community-cards mcb-reveal mcb-reveal-delay-2">
//               {[
//                 {
//                   avatar: "🐼",
//                   name: "Anonymous Panda",
//                   tag: "Anxiety",
//                   text: "I've been struggling with anxiety before big presentations. Today I tried the breathing exercise from resources and it actually helped...",
//                   likes: "14 💚",
//                   comments: "6 replies",
//                 },
//                 {
//                   avatar: "🦋",
//                   name: "Anonymous Butterfly",
//                   tag: "Stress",
//                   text: "Week 3 of tracking my mood. I can finally see the pattern — my worst days are Mondays. Small insight but it feels like progress.",
//                   likes: "28 💚",
//                   comments: "11 replies",
//                 },
//                 {
//                   avatar: "🌊",
//                   name: "Anonymous Wave",
//                   tag: "Loneliness",
//                   text: "Moving to a new city was harder than I expected. Coming here and reading others' stories makes me feel less invisible.",
//                   likes: "42 💚",
//                   comments: "19 replies",
//                 },
//               ].map((post, i) => (
//                 <div className="mcb-community-card" key={i}>
//                   <div className="mcb-community-card-header">
//                     <div className="mcb-community-card-avatar">
//                       {post.avatar}
//                     </div>
//                     <span className="mcb-community-card-name">{post.name}</span>
//                     <span className="mcb-community-card-tag">{post.tag}</span>
//                   </div>
//                   <p>{post.text}</p>
//                   <div className="mcb-community-card-footer">
//                     <span>{post.likes}</span>
//                     <span>{post.comments}</span>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* ─── ANONYMOUS CHAT SECTION ─── */}

//       {/* ─── FOOTER ─── */}
//       <footer className="mcb-footer">
//         <div className="container">
//           <div className="mcb-footer-grid">
//             <div className="mcb-footer-brand">
//               <a className="mcb-footer-logo" href="#home">
//                 <div className="mcb-footer-logo-mark">🌿</div>
//                 <span className="mcb-footer-logo-text">Mind Care Hub</span>
//               </a>
//               <p>
//                 A safe, anonymous space for mental health support. Built with
//                 care for everyone who needs a place to breathe.
//               </p>
//             </div>
//             <div className="mcb-footer-col">
//               <h4>Platform</h4>
//               <ul>
//                 <li>
//                   <button onClick={() => navigate("/community")}>
//                     Community
//                   </button>
//                 </li>
//                 <li>
//                   <button onClick={() => navigate("/mood")}>
//                     Mood Tracker
//                   </button>
//                 </li>
//                 <li>
//                   <button onClick={() => navigate("/resources")}>
//                     Resources
//                   </button>
//                 </li>
//                 <li>
//                   <button onClick={() => navigate("/support")}>
//                     Request Support
//                   </button>
//                 </li>
//               </ul>
//             </div>
//             <div className="mcb-footer-col">
//               <h4>Support</h4>
//               <ul>
//                 <li>
//                   <button onClick={() => navigate("/support")}>
//                     Talk to Counselor
//                   </button>
//                 </li>
//                 <li>
//                   <button onClick={() => navigate("/inbox")}>Inbox</button>
//                 </li>
//                 <li>
//                   <button onClick={() => navigate(`/profile/${user?.id}`)}>
//                     My Profile
//                   </button>
//                 </li>
//               </ul>
//             </div>
//             <div className="mcb-footer-col">
//               <h4>Legal</h4>
//               <ul>
//                 <li>
//                   <a href="#">Privacy Policy</a>
//                 </li>
//                 <li>
//                   <a href="#">Terms of Service</a>
//                 </li>
//                 <li>
//                   <a href="#">Cookie Policy</a>
//                 </li>
//               </ul>
//             </div>
//           </div>
//           <div className="mcb-footer-bottom">
//             <p>© 2025 Mind Care Hub. All rights reserved.</p>
//             <div className="mcb-footer-bottom-links">
//               <a href="#">Privacy</a>
//               <a href="#">Terms</a>
//               <a href="#">Contact</a>
//             </div>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }

// export default Home;

// import { useEffect, useRef, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import Navbar from "./Navbar";
// import "./Home.css";

// function Home() {
//   const { user } = useAuth();
//   const navigate = useNavigate();
//   const heroBgRef = useRef(null);
//   const [stats, setStats] = useState(null);

//   useEffect(() => {
//     fetch("/api/stats")
//       .then((res) => res.json())
//       .then((data) => setStats(data))
//       .catch((err) => console.error("Stats fetch error:", err));
//   }, []);

//   useEffect(() => {
//     const onScroll = () => {
//       if (heroBgRef.current) {
//         heroBgRef.current.style.transform = `scale(1) translateY(${
//           window.scrollY * 0.3
//         }px)`;
//       }
//     };
//     window.addEventListener("scroll", onScroll);
//     return () => window.removeEventListener("scroll", onScroll);
//   }, []);

//   useEffect(() => {
//     if (heroBgRef.current) heroBgRef.current.classList.add("loaded");
//   }, []);

//   useEffect(() => {
//     const reveals = document.querySelectorAll(".mcb-reveal");
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((e) => {
//           if (e.isIntersecting) e.target.classList.add("visible");
//         });
//       },
//       { threshold: 0.12 }
//     );
//     reveals.forEach((el) => observer.observe(el));
//     return () => observer.disconnect();
//   }, []);

//   return (
//     <div className="mcb-root">
//       {/* ─── NAVBAR (separate component) ─── */}
//       <Navbar />

//       {/* ─── HERO ─── */}
//       <section className="mcb-hero" id="home">
//         <div className="mcb-hero-bg" ref={heroBgRef} />
//         <div className="mcb-hero-overlay" />
//         <div className="container">
//           <div className="mcb-hero-content">
//             <div className="mcb-hero-badge">
//               <span className="mcb-hero-badge-dot" />
//               Safe · Anonymous · Supportive
//             </div>
//             <h1>
//               Your mind deserves <em>gentle</em> care
//             </h1>
//             <p className="mcb-hero-sub">
//               Mind Care Hub is a safe, anonymous space where you can share,
//               heal, and find support — from a community that understands, and
//               verified professionals who care.
//             </p>
//             <div className="mcb-hero-actions">
//               <button
//                 className="mcb-btn-primary"
//                 onClick={() => navigate("/community")}
//               >
//                 Join the Community →
//               </button>
//               <button
//                 className="mcb-btn-outline"
//                 onClick={() => navigate("/support")}
//               >
//                 Talk to a Counselor
//               </button>
//             </div>

//             {/* ── REAL-TIME STATS BAR ── */}
//             <div className="mcb-hero-stats">
//               {[
//                 {
//                   num: stats ? `${stats.totalUsers.toLocaleString()}+` : "...",
//                   label: "Members Joined",
//                 },
//                 {
//                   num: stats ? `${stats.totalPosts.toLocaleString()}+` : "...",
//                   label: "Stories Shared",
//                 },
//                 {
//                   num: stats ? `${stats.totalCounselors}+` : "...",
//                   label: "Verified Counselors",
//                 },
//                 {
//                   num: stats ? `${stats.totalSupportResolved}+` : "...",
//                   label: "Support Sessions Done",
//                 },
//               ].map((s, i) => (
//                 <div className="mcb-hero-stat" key={i}>
//                   <div className="mcb-hero-stat-num">{s.num}</div>
//                   <div className="mcb-hero-stat-label">{s.label}</div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//         <div className="mcb-hero-scroll">
//           <div className="mcb-hero-scroll-line" />
//           scroll
//         </div>
//       </section>

//       {/* ─── COUNSELOR SECTION ─── */}
//       <section className="mcb-counselor">
//         <div className="container">
//           <div className="mcb-counselor-inner">
//             <div className="mcb-reveal">
//               <div className="mcb-counselor-image">
//                 <img
//                   src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&q=80"
//                   alt="Counselor ready to help"
//                   loading="lazy"
//                 />
//                 <div className="mcb-chat-bubble-wrapper">
//                   <div className="mcb-chat-bubble">
//                     <div className="mcb-chat-avatar">🧑‍⚕️</div>
//                     <div>
//                       <strong>Dr. Priya — Counselor</strong>
//                       <p>
//                         "How are you feeling today? I'm here to listen and
//                         support you, whenever you're ready to talk."
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="mcb-counselor-content mcb-reveal mcb-reveal-delay-2">
//               <span className="mcb-section-label">Meet Our Counselors</span>
//               <h2 className="mcb-section-title">
//                 Verified professionals, <em>genuinely</em> here for you
//               </h2>
//               <p className="mcb-section-sub">
//                 Every counselor and therapist on Mind Care Hub is verified by
//                 our admin team. They begin with free consultations so you can
//                 find the right fit before committing to paid sessions.
//               </p>
//               <div className="mcb-counselor-stats">
//                 {[
//                   { num: "100%", label: "Verified" },
//                   { num: "Free", label: "First Session" },
//                   { num: "24/7", label: "Support" },
//                 ].map((s, i) => (
//                   <div className="mcb-stat" key={i}>
//                     <div className="mcb-stat-num">{s.num}</div>
//                     <div className="mcb-stat-label">{s.label}</div>
//                   </div>
//                 ))}
//               </div>
//               <div style={{ marginTop: "32px" }}>
//                 <button
//                   className="mcb-btn-primary"
//                   onClick={() => navigate("/support")}
//                 >
//                   Request Support →
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* ─── COMMUNITY SECTION ─── */}
//       <section className="mcb-community">
//         <div className="container">
//           <div className="mcb-community-inner">
//             <div className="mcb-reveal">
//               <span className="mcb-section-label">Community</span>
//               <h2 className="mcb-section-title">
//                 You are <em>not</em> alone in this
//               </h2>
//               <p className="mcb-section-sub">
//                 Thousands of people share their journeys in our anonymous
//                 community — finding connection, comfort, and understanding from
//                 others who truly get it.
//               </p>
//               <div className="mcb-community-cta">
//                 <button
//                   className="mcb-btn-outline"
//                   onClick={() => navigate("/community")}
//                 >
//                   Explore Community →
//                 </button>
//               </div>
//             </div>
//             <div className="mcb-community-cards mcb-reveal mcb-reveal-delay-2">
//               {[
//                 {
//                   avatar: "🐼",
//                   name: "Anonymous Panda",
//                   tag: "Anxiety",
//                   text: "I've been struggling with anxiety before big presentations. Today I tried the breathing exercise from resources and it actually helped...",
//                   likes: "14 💚",
//                   comments: "6 replies",
//                 },
//                 {
//                   avatar: "🦋",
//                   name: "Anonymous Butterfly",
//                   tag: "Stress",
//                   text: "Week 3 of tracking my mood. I can finally see the pattern — my worst days are Mondays. Small insight but it feels like progress.",
//                   likes: "28 💚",
//                   comments: "11 replies",
//                 },
//                 {
//                   avatar: "🌊",
//                   name: "Anonymous Wave",
//                   tag: "Loneliness",
//                   text: "Moving to a new city was harder than I expected. Coming here and reading others' stories makes me feel less invisible.",
//                   likes: "42 💚",
//                   comments: "19 replies",
//                 },
//               ].map((post, i) => (
//                 <div className="mcb-community-card" key={i}>
//                   <div className="mcb-community-card-header">
//                     <div className="mcb-community-card-avatar">
//                       {post.avatar}
//                     </div>
//                     <span className="mcb-community-card-name">{post.name}</span>
//                     <span className="mcb-community-card-tag">{post.tag}</span>
//                   </div>
//                   <p>{post.text}</p>
//                   <div className="mcb-community-card-footer">
//                     <span>{post.likes}</span>
//                     <span>{post.comments}</span>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* ─── HOW THERAPY WORKS ─── */}
//       <section className="mcb-therapy">
//         <div className="container">
//           <div className="mcb-therapy-header mcb-reveal">
//             <span className="mcb-section-label">How It Works</span>
//             <h2 className="mcb-section-title">
//               Your path to <em>feeling better</em>
//             </h2>
//             <p className="mcb-section-sub">
//               Getting support has never been simpler. Four steps stand between
//               you and the help you deserve.
//             </p>
//           </div>
//           <div className="mcb-therapy-steps">
//             {[
//               {
//                 num: "1",
//                 title: "Create an Account",
//                 desc: "Sign up anonymously in seconds. No personal details required to get started.",
//               },
//               {
//                 num: "2",
//                 title: "Share Your Story",
//                 desc: "Post in the community or send a private support request to a verified counselor.",
//               },
//               {
//                 num: "3",
//                 title: "Connect & Talk",
//                 desc: "Chat live with your counselor or engage with supportive community members.",
//               },
//               {
//                 num: "4",
//                 title: "Track & Grow",
//                 desc: "Log your mood daily and watch your emotional journey unfold over time.",
//               },
//             ].map((step, i) => (
//               <div
//                 className={`mcb-therapy-step mcb-reveal mcb-reveal-delay-${
//                   i + 1
//                 }`}
//                 key={i}
//               >
//                 <div className="mcb-therapy-step-num">{step.num}</div>
//                 <h3>{step.title}</h3>
//                 <p>{step.desc}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ─── FOOTER ─── */}
//       <footer className="mcb-footer">
//         <div className="container">
//           <div className="mcb-footer-grid">
//             <div className="mcb-footer-brand">
//               <a className="mcb-footer-logo" href="#home">
//                 <div className="mcb-footer-logo-mark">🌿</div>
//                 <span className="mcb-footer-logo-text">Mind Care Hub</span>
//               </a>
//               <p>
//                 A safe, anonymous space for mental health support. Built with
//                 care for everyone who needs a place to breathe.
//               </p>
//             </div>
//             <div className="mcb-footer-col">
//               <h4>Platform</h4>
//               <ul>
//                 <li>
//                   <button onClick={() => navigate("/community")}>
//                     Community
//                   </button>
//                 </li>
//                 <li>
//                   <button onClick={() => navigate("/mood")}>
//                     Mood Tracker
//                   </button>
//                 </li>
//                 <li>
//                   <button onClick={() => navigate("/resources")}>
//                     Resources
//                   </button>
//                 </li>
//                 <li>
//                   <button onClick={() => navigate("/support")}>
//                     Request Support
//                   </button>
//                 </li>
//               </ul>
//             </div>
//             <div className="mcb-footer-col">
//               <h4>Support</h4>
//               <ul>
//                 <li>
//                   <button onClick={() => navigate("/support")}>
//                     Talk to Counselor
//                   </button>
//                 </li>
//                 <li>
//                   <button onClick={() => navigate("/inbox")}>Inbox</button>
//                 </li>
//                 <li>
//                   <button onClick={() => navigate(`/profile/${user?.id}`)}>
//                     My Profile
//                   </button>
//                 </li>
//               </ul>
//             </div>
//             <div className="mcb-footer-col">
//               <h4>Legal</h4>
//               <ul>
//                 <li>
//                   <a href="#">Privacy Policy</a>
//                 </li>
//                 <li>
//                   <a href="#">Terms of Service</a>
//                 </li>
//                 <li>
//                   <a href="#">Cookie Policy</a>
//                 </li>
//               </ul>
//             </div>
//           </div>
//           <div className="mcb-footer-bottom">
//             <p>© 2025 Mind Care Hub. All rights reserved.</p>
//             <div className="mcb-footer-bottom-links">
//               <a href="#">Privacy</a>
//               <a href="#">Terms</a>
//               <a href="#">Contact</a>
//             </div>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }

// export default Home;

// import { useEffect, useRef, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import Navbar from "./Navbar";
// import "./Home.css";

// function Home() {
//   const { user } = useAuth();
//   const navigate = useNavigate();
//   const heroBgRef = useRef(null);
//   const [stats, setStats] = useState(null);
//   const [reviews, setReviews] = useState(null);

//   useEffect(() => {
//     fetch("/api/stats")
//       .then((res) => res.json())
//       .then((data) => setStats(data))
//       .catch((err) => console.error("Stats fetch error:", err));
//   }, []);

//   useEffect(() => {
//     fetch("/api/reviews")
//       .then((res) => res.json())
//       .then((data) => setReviews(data))
//       .catch((err) => console.error("Reviews fetch error:", err));
//   }, []);

//   useEffect(() => {
//     const onScroll = () => {
//       if (heroBgRef.current) {
//         heroBgRef.current.style.transform = `scale(1) translateY(${
//           window.scrollY * 0.3
//         }px)`;
//       }
//     };
//     window.addEventListener("scroll", onScroll);
//     return () => window.removeEventListener("scroll", onScroll);
//   }, []);

//   useEffect(() => {
//     if (heroBgRef.current) heroBgRef.current.classList.add("loaded");
//   }, []);

//   useEffect(() => {
//     const reveals = document.querySelectorAll(".mcb-reveal");
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((e) => {
//           if (e.isIntersecting) e.target.classList.add("visible");
//         });
//       },
//       { threshold: 0.12 }
//     );
//     reveals.forEach((el) => observer.observe(el));
//     return () => observer.disconnect();
//   }, []);

//   return (
//     <div className="mcb-root">
//       {/* ─── NAVBAR (separate component) ─── */}
//       <Navbar />

//       {/* ─── HERO ─── */}
//       <section className="mcb-hero" id="home">
//         <div className="mcb-hero-bg" ref={heroBgRef} />
//         <div className="mcb-hero-overlay" />
//         <div className="container">
//           <div className="mcb-hero-content">
//             <div className="mcb-hero-badge">
//               <span className="mcb-hero-badge-dot" />
//               Safe · Anonymous · Supportive
//             </div>
//             <h1>
//               Your mind deserves <em>gentle</em> care
//             </h1>
//             <p className="mcb-hero-sub">
//               Mind Care Hub is a safe, anonymous space where you can share,
//               heal, and find support — from a community that understands, and
//               verified professionals who care.{" "}
//               <em>Share your experience too!</em>
//             </p>
//             <div className="mcb-hero-actions">
//               <button
//                 className="mcb-btn-primary"
//                 onClick={() => navigate("/community")}
//               >
//                 Join the Community →
//               </button>
//               <button
//                 className="mcb-btn-outline"
//                 onClick={() => navigate("/support")}
//               >
//                 Talk to a Counselor
//               </button>
//             </div>

//             {/* ── REAL-TIME STATS BAR ── */}
//             <div className="mcb-hero-stats">
//               {[
//                 {
//                   num: stats ? `${stats.totalUsers.toLocaleString()}+` : "...",
//                   label: "Members Joined",
//                 },
//                 {
//                   num: stats ? `${stats.totalPosts.toLocaleString()}+` : "...",
//                   label: "Stories Shared",
//                 },
//                 {
//                   num: stats ? `${stats.totalCounselors}+` : "...",
//                   label: "Verified Counselors",
//                 },
//                 {
//                   num: stats ? `${stats.totalSupportResolved}+` : "...",
//                   label: "Support Sessions Done",
//                 },
//               ].map((s, i) => (
//                 <div className="mcb-hero-stat" key={i}>
//                   <div className="mcb-hero-stat-num">{s.num}</div>
//                   <div className="mcb-hero-stat-label">{s.label}</div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//         <div className="mcb-hero-scroll">
//           <div className="mcb-hero-scroll-line" />
//           scroll
//         </div>
//       </section>

//       {/* ─── COUNSELOR SECTION ─── */}
//       <section className="mcb-counselor">
//         <div className="container">
//           <div className="mcb-counselor-inner">
//             <div className="mcb-reveal">
//               <div className="mcb-counselor-image">
//                 <img
//                   src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&q=80"
//                   alt="Counselor ready to help"
//                   loading="lazy"
//                 />
//                 <div className="mcb-chat-bubble-wrapper">
//                   <div className="mcb-chat-bubble">
//                     <div className="mcb-chat-avatar">🧑‍⚕️</div>
//                     <div>
//                       <strong>Dr. Priya — Counselor</strong>
//                       <p>
//                         "How are you feeling today? I'm here to listen and
//                         support you, whenever you're ready to talk."
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="mcb-counselor-content mcb-reveal mcb-reveal-delay-2">
//               <span className="mcb-section-label">Meet Our Counselors</span>
//               <h2 className="mcb-section-title">
//                 Verified professionals, <em>genuinely</em> here for you
//               </h2>
//               <p className="mcb-section-sub">
//                 Every counselor and therapist on Mind Care Hub is verified by
//                 our admin team. They begin with free consultations so you can
//                 find the right fit before committing to paid sessions.
//               </p>
//               <div className="mcb-counselor-stats">
//                 {[
//                   { num: "100%", label: "Verified" },
//                   { num: "Free", label: "First Session" },
//                   { num: "24/7", label: "Support" },
//                 ].map((s, i) => (
//                   <div className="mcb-stat" key={i}>
//                     <div className="mcb-stat-num">{s.num}</div>
//                     <div className="mcb-stat-label">{s.label}</div>
//                   </div>
//                 ))}
//               </div>
//               <div style={{ marginTop: "32px" }}>
//                 <button
//                   className="mcb-btn-primary"
//                   onClick={() => navigate("/support")}
//                 >
//                   Request Support →
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* ─── COMMUNITY SECTION ─── */}
//       <section className="mcb-community">
//         <div className="container">
//           <div className="mcb-community-inner">
//             <div className="mcb-reveal">
//               <span className="mcb-section-label">Community</span>
//               <h2 className="mcb-section-title">
//                 You are <em>not</em> alone in this
//               </h2>
//               <p className="mcb-section-sub">
//                 Thousands of people share their journeys in our anonymous
//                 community — finding connection, comfort, and understanding from
//                 others who truly get it.
//               </p>
//               <div className="mcb-community-cta">
//                 <button
//                   className="mcb-btn-outline"
//                   onClick={() => navigate("/community")}
//                 >
//                   Explore Community →
//                 </button>
//               </div>
//             </div>
//             <div className="mcb-community-cards mcb-reveal mcb-reveal-delay-2">
//               {[
//                 {
//                   avatar: "🐼",
//                   name: "Anonymous Panda",
//                   tag: "Anxiety",
//                   text: "I've been struggling with anxiety before big presentations. Today I tried the breathing exercise from resources and it actually helped...",
//                   likes: "14 💚",
//                   comments: "6 replies",
//                 },
//                 {
//                   avatar: "🦋",
//                   name: "Anonymous Butterfly",
//                   tag: "Stress",
//                   text: "Week 3 of tracking my mood. I can finally see the pattern — my worst days are Mondays. Small insight but it feels like progress.",
//                   likes: "28 💚",
//                   comments: "11 replies",
//                 },
//                 {
//                   avatar: "🌊",
//                   name: "Anonymous Wave",
//                   tag: "Loneliness",
//                   text: "Moving to a new city was harder than I expected. Coming here and reading others' stories makes me feel less invisible.",
//                   likes: "42 💚",
//                   comments: "19 replies",
//                 },
//               ].map((post, i) => (
//                 <div className="mcb-community-card" key={i}>
//                   <div className="mcb-community-card-header">
//                     <div className="mcb-community-card-avatar">
//                       {post.avatar}
//                     </div>
//                     <span className="mcb-community-card-name">{post.name}</span>
//                     <span className="mcb-community-card-tag">{post.tag}</span>
//                   </div>
//                   <p>{post.text}</p>
//                   <div className="mcb-community-card-footer">
//                     <span>{post.likes}</span>
//                     <span>{post.comments}</span>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* ─── HOW THERAPY WORKS ─── */}

//       {/* ─── PATIENT REVIEWS WITH WRITE FORM ─── */}
//       <section
//         className="mcb-reviews"
//         style={{ background: "#f8f9fa", padding: "80px 0" }}
//       >
//         <div
//           className="container"
//           style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}
//         >
//           <div className="mcb-reviews-inner">
//             {/* Header */}
//             <div
//               className="mcb-reveal"
//               style={{ textAlign: "center", marginBottom: "60px" }}
//             >
//               <span
//                 className="mcb-section-label"
//                 style={{ color: "#10b981", fontWeight: "600" }}
//               >
//                 What People Say
//               </span>
//               <h2
//                 className="mcb-section-title"
//                 style={{ fontSize: "2.5rem", margin: "20px 0" }}
//               >
//                 Real stories from{" "}
//                 <em style={{ color: "#10b981" }}>real people</em>
//               </h2>
//               <p
//                 className="mcb-section-sub"
//                 style={{
//                   fontSize: "1.2rem",
//                   color: "#666",
//                   maxWidth: "600px",
//                   margin: "0 auto",
//                 }}
//               >
//                 Join thousands who've found support here. Share your own review.
//               </p>
//             </div>

//             <div
//               className="mcb-reviews-grid"
//               style={{
//                 display: "grid",
//                 gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
//                 gap: "30px",

//                 position: "relative",
//               }}
//             >
//               {/* Floating Write Button */}

//               {/* Review Cards */}
//               {reviews
//                 ? reviews.slice(0, 6).map((review, i) => (
//                     <div
//                       key={review._id || i}
//                       style={{
//                         background: "white",
//                         borderRadius: "20px",
//                         padding: "32px",
//                         boxShadow: "0 10px 40px rgba(0,0,0,0.08)",
//                         border: "1px solid #e5e7eb",
//                         transition: "all 0.3s ease",
//                         cursor: "pointer",
//                         animationDelay: `${i * 0.1}s`,
//                       }}
//                       onMouseEnter={(e) => {
//                         e.currentTarget.style.transform = "translateY(-8px)";
//                         e.currentTarget.style.boxShadow =
//                           "0 20px 60px rgba(0,0,0,0.15)";
//                       }}
//                       onMouseLeave={(e) => {
//                         e.currentTarget.style.transform = "translateY(0)";
//                         e.currentTarget.style.boxShadow =
//                           "0 10px 40px rgba(0,0,0,0.08)";
//                       }}
//                     >
//                       <div
//                         style={{
//                           display: "flex",
//                           alignItems: "center",
//                           marginBottom: "20px",
//                         }}
//                       >
//                         <div
//                           style={{
//                             fontSize: "24px",
//                             marginRight: "16px",
//                             display: "flex",
//                             gap: "2px",
//                           }}
//                         >
//                           {Array(review.rating || 5).fill("⭐")}
//                         </div>
//                         <div
//                           style={{
//                             fontWeight: "700",
//                             fontSize: "18px",
//                             color: "#1f2937",
//                           }}
//                         >
//                           {review.userName || review.name || "Anonymous"}
//                         </div>
//                       </div>
//                       <p
//                         style={{
//                           fontSize: "16px",
//                           lineHeight: "1.7",
//                           color: "#374151",
//                           marginBottom: "20px",
//                           fontStyle: "italic",
//                         }}
//                       >
//                         "{review.text || review.comment}"
//                       </p>
//                       <div
//                         style={{
//                           color: "#6b7280",
//                           fontSize: "14px",
//                           opacity: 0.8,
//                         }}
//                       >
//                         {new Date(
//                           review.createdAt || Date.now()
//                         ).toLocaleDateString()}
//                       </div>
//                     </div>
//                   ))
//                 : Array(6)
//                     .fill()
//                     .map((_, i) => (
//                       <div
//                         key={i}
//                         style={{
//                           background: "#f9fafb",
//                           borderRadius: "20px",
//                           padding: "32px",
//                           height: "280px",
//                           animation: "pulse 1.5s ease-in-out infinite",
//                         }}
//                       >
//                         <div
//                           style={{
//                             width: "120px",
//                             height: "24px",
//                             background: "#e5e7eb",
//                             borderRadius: "12px",
//                             marginBottom: "24px",
//                           }}
//                         />
//                         <div
//                           style={{
//                             height: "80px",
//                             background: "#e5e7eb",
//                             borderRadius: "12px",
//                             marginBottom: "20px",
//                           }}
//                         />
//                         <div
//                           style={{
//                             width: "80px",
//                             height: "16px",
//                             background: "#e5e7eb",
//                             borderRadius: "8px",
//                           }}
//                         />
//                       </div>
//                     ))}

//               {/* Write Review Form */}
//               <div
//                 id="review-form"
//                 style={{
//                   gridColumn: "1 / -1",
//                   background: "white",
//                   borderRadius: "20px",
//                   padding: "40px",
//                   boxShadow: "0 20px 60px rgba(0,0,0,0.12)",
//                   border: "2px solid #10b981",
//                   marginTop: "40px",
//                 }}
//               >
//                 <div
//                   style={{
//                     position: "absolute",
//                     top: "-12px",
//                     left: "24px",
//                     background: "white",
//                     padding: "0 16px",
//                     color: "#10b981",
//                     fontWeight: "700",
//                     fontSize: "14px",
//                   }}
//                 >
//                   Share Your Story ✨
//                 </div>
//                 <form
//                   style={{ maxWidth: "500px", margin: "0 auto" }}
//                   onSubmit={(e) => {
//                     e.preventDefault();
//                     alert("Review submitted!");
//                     e.target.reset();
//                   }}
//                 >
//                   <div style={{ marginBottom: "24px" }}>
//                     <label
//                       style={{
//                         display: "block",
//                         fontWeight: "600",
//                         marginBottom: "8px",
//                         color: "#1f2937",
//                       }}
//                     >
//                       Your Rating
//                     </label>
//                     <div style={{ display: "flex", gap: "8px" }}>
//                       {[5, 4, 3, 2, 1].map((star) => (
//                         <button
//                           key={star}
//                           type="button"
//                           style={{
//                             fontSize: "28px",
//                             color: "#d1d5db",
//                             background: "none",
//                             border: "none",
//                             cursor: "pointer",
//                           }}
//                           onClick={() => {}}
//                         >
//                           ⭐
//                         </button>
//                       ))}
//                     </div>
//                   </div>
//                   <div style={{ marginBottom: "24px" }}>
//                     <label
//                       style={{
//                         display: "block",
//                         fontWeight: "600",
//                         marginBottom: "8px",
//                         color: "#1f2937",
//                       }}
//                     >
//                       Name (optional)
//                     </label>
//                     <input
//                       type="text"
//                       placeholder="Anonymous"
//                       style={{
//                         width: "100%",
//                         padding: "16px",
//                         border: "2px solid #e5e7eb",
//                         borderRadius: "12px",
//                         fontSize: "16px",
//                       }}
//                     />
//                   </div>
//                   <div style={{ marginBottom: "32px" }}>
//                     <label
//                       style={{
//                         display: "block",
//                         fontWeight: "600",
//                         marginBottom: "8px",
//                         color: "#1f2937",
//                       }}
//                     >
//                       Your Review
//                     </label>
//                     <textarea
//                       rows="4"
//                       placeholder="Tell us about your experience..."
//                       required
//                       style={{
//                         width: "100%",
//                         padding: "16px",
//                         border: "2px solid #e5e7eb",
//                         borderRadius: "12px",
//                         fontSize: "16px",
//                         minHeight: "120px",
//                       }}
//                     />
//                   </div>
//                   <button
//                     type="submit"
//                     style={{
//                       width: "100%",
//                       padding: "18px",
//                       background: "linear-gradient(135deg, #10b981, #059669)",
//                       color: "white",
//                       border: "none",
//                       borderRadius: "12px",
//                       fontSize: "18px",
//                       fontWeight: "700",
//                       cursor: "pointer",
//                     }}
//                   >
//                     Share Your Review →
//                   </button>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>

//         <style>{`
//     @keyframes float {
//       0%, 100% { transform: translateY(0px); }
//       50% { transform: translateY(-10px); }
//     }
//     @keyframes pulse {
//       0%, 100% { opacity: 1; }
//       50% { opacity: 0.6; }
//     }
//   `}</style>
//       </section>
//       {/* ─── FOOTER ─── */}
//       <footer className="mcb-footer">
//         <div className="container">
//           <div className="mcb-footer-grid">
//             <div className="mcb-footer-brand">
//               <a className="mcb-footer-logo" href="#home">
//                 <div className="mcb-footer-logo-mark">🌿</div>
//                 <span className="mcb-footer-logo-text">Mind Care Hub</span>
//               </a>
//               <p>
//                 A safe, anonymous space for mental health support. Built with
//                 care for everyone who needs a place to breathe.
//               </p>
//             </div>
//             <div className="mcb-footer-col">
//               <h4>Platform</h4>
//               <ul>
//                 <li>
//                   <button onClick={() => navigate("/community")}>
//                     Community
//                   </button>
//                 </li>
//                 <li>
//                   <button onClick={() => navigate("/mood")}>
//                     Mood Tracker
//                   </button>
//                 </li>
//                 <li>
//                   <button onClick={() => navigate("/resources")}>
//                     Resources
//                   </button>
//                 </li>
//                 <li>
//                   <button onClick={() => navigate("/support")}>
//                     Request Support
//                   </button>
//                 </li>
//               </ul>
//             </div>
//             <div className="mcb-footer-col">
//               <h4>Support</h4>
//               <ul>
//                 <li>
//                   <button onClick={() => navigate("/support")}>
//                     Talk to Counselor
//                   </button>
//                 </li>
//                 <li>
//                   <button onClick={() => navigate("/inbox")}>Inbox</button>
//                 </li>
//                 <li>
//                   <button onClick={() => navigate(`/profile/${user?.id}`)}>
//                     My Profile
//                   </button>
//                 </li>
//               </ul>
//             </div>
//             <div className="mcb-footer-col">
//               <h4>Legal</h4>
//               <ul>
//                 <li>
//                   <a href="#">Privacy Policy</a>
//                 </li>
//                 <li>
//                   <a href="#">Terms of Service</a>
//                 </li>
//                 <li>
//                   <a href="#">Cookie Policy</a>
//                 </li>
//               </ul>
//             </div>
//           </div>
//           <div className="mcb-footer-bottom">
//             <p>© 2025 Mind Care Hub. All rights reserved.</p>
//             <div className="mcb-footer-bottom-links">
//               <a href="#">Privacy</a>
//               <a href="#">Terms</a>
//               <a href="#">Contact</a>
//             </div>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }

// export default Home;
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "./Navbar";
import "./Home.css";

function Home() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const heroBgRef = useRef(null);
  const [stats, setStats] = useState(null);
  const [reviews, setReviews] = useState(null);

  // ── Review form state ──
  const [rating, setRating] = useState(5);
  const [hoveredStar, setHoveredStar] = useState(null);
  const [reviewName, setReviewName] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error'

  useEffect(() => {
    fetch("/api/stats")
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch((err) => console.error("Stats fetch error:", err));
  }, []);

  const fetchReviews = () => {
    fetch("/api/reviews")
      .then((res) => res.json())
      .then((data) => setReviews(data))
      .catch((err) => console.error("Reviews fetch error:", err));
  };

  useEffect(() => {
    fetchReviews();
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
    if (heroBgRef.current) heroBgRef.current.classList.add("loaded");
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

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitStatus(null);
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userName: reviewName.trim() || "Anonymous",
          rating,
          text: reviewText,
        }),
      });
      if (!res.ok) throw new Error("Failed");
      setSubmitStatus("success");
      setReviewName("");
      setReviewText("");
      setRating(5);
      fetchReviews(); // refresh cards
    } catch {
      setSubmitStatus("error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mcb-root">
      {/* ─── NAVBAR (separate component) ─── */}
      <Navbar />

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
              verified professionals who care.{" "}
              <em>Share your experience too!</em>
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

            {/* ── REAL-TIME STATS BAR ── */}
            <div className="mcb-hero-stats">
              {[
                {
                  num: stats ? `${stats.totalUsers.toLocaleString()}+` : "...",
                  label: "Members Joined",
                },
                {
                  num: stats ? `${stats.totalPosts.toLocaleString()}+` : "...",
                  label: "Stories Shared",
                },
                {
                  num: stats ? `${stats.totalCounselors}+` : "...",
                  label: "Verified Counselors",
                },
                {
                  num: stats ? `${stats.totalSupportResolved}+` : "...",
                  label: "Support Sessions Done",
                },
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

      {/* ─── PATIENT REVIEWS ─── */}
      <section className="mcb-reviews-v2">
        <div className="mcb-reviews-v2-bg-blobs">
          <div className="mcb-blob mcb-blob-1" />
          <div className="mcb-blob mcb-blob-2" />
          <div className="mcb-blob mcb-blob-3" />
        </div>

        <div className="mcb-reviews-v2-container">
          {/* Header */}
          <div className="mcb-reviews-v2-header mcb-reveal">
            <div className="mcb-reviews-v2-eyebrow">
              <span className="mcb-reviews-v2-eyebrow-line" />
              Voices of Healing
              <span className="mcb-reviews-v2-eyebrow-line" />
            </div>
            <h2 className="mcb-reviews-v2-title">
              Stories that <em>moved</em> us
            </h2>
            <p className="mcb-reviews-v2-sub">
              Every word here is real — written by people who found their way
              through. Your story could be next.
            </p>
          </div>

          {/* Review Cards Marquee Row */}
          <div className="mcb-reviews-v2-marquee-wrap mcb-reveal">
            <div className="mcb-reviews-v2-marquee">
              {(reviews && reviews.length > 0
                ? [...reviews, ...reviews]
                : Array(8)
                    .fill(null)
                    .map((_, i) => ({
                      _id: `skeleton-${i}`,
                      userName: null,
                      rating: null,
                      text: null,
                      createdAt: null,
                    }))
              ).map((review, i) => (
                <div
                  className={`mcb-reviews-v2-card ${
                    review.text === null ? "mcb-skeleton" : ""
                  }`}
                  key={`${review._id}-${i}`}
                >
                  {review.text !== null ? (
                    <>
                      <div className="mcb-reviews-v2-card-quote">"</div>
                      <p className="mcb-reviews-v2-card-text">
                        {review.text || review.comment}
                      </p>
                      <div className="mcb-reviews-v2-card-stars">
                        {Array(review.rating || 5)
                          .fill(0)
                          .map((_, si) => (
                            <span key={si} className="mcb-star">
                              ★
                            </span>
                          ))}
                      </div>
                      <div className="mcb-reviews-v2-card-author">
                        <div className="mcb-reviews-v2-avatar">
                          {(review.userName || "A")[0].toUpperCase()}
                        </div>
                        <div>
                          <div className="mcb-reviews-v2-author-name">
                            {review.userName || "Anonymous"}
                          </div>
                          <div className="mcb-reviews-v2-author-date">
                            {new Date(
                              review.createdAt || Date.now()
                            ).toLocaleDateString("en-IN", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })}
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="mcb-skeleton-inner">
                      <div className="mcb-skeleton-line mcb-skeleton-long" />
                      <div className="mcb-skeleton-line mcb-skeleton-medium" />
                      <div className="mcb-skeleton-line mcb-skeleton-short" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Write Review Form */}
          <div className="mcb-reviews-v2-form-wrap mcb-reveal">
            <div className="mcb-reviews-v2-form-card">
              <div className="mcb-reviews-v2-form-left">
                <div className="mcb-reviews-v2-form-icon">✍️</div>
                <h3>Share your experience</h3>
                <p>
                  Your words might be exactly what someone else needs to hear
                  today. Help us build a kinder world — one story at a time.
                </p>
                <div className="mcb-reviews-v2-trust-badges">
                  {[
                    "Anonymous by default",
                    "verified personnel on the platform",
                    "Moderated & safe",
                  ].map((b) => (
                    <div key={b} className="mcb-trust-badge">
                      <span className="mcb-trust-badge-dot" />
                      {b}
                    </div>
                  ))}
                </div>
              </div>

              <form
                className="mcb-reviews-v2-form-right"
                onSubmit={handleReviewSubmit}
              >
                {/* Star Rating */}
                <div className="mcb-form-group">
                  <label className="mcb-form-label">
                    How was your experience?
                  </label>
                  <div className="mcb-star-picker">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <button
                        key={s}
                        type="button"
                        className={`mcb-star-btn ${
                          s <= (hoveredStar ?? rating) ? "mcb-star-active" : ""
                        }`}
                        onMouseEnter={() => setHoveredStar(s)}
                        onMouseLeave={() => setHoveredStar(null)}
                        onClick={() => setRating(s)}
                        aria-label={`${s} star`}
                      >
                        ★
                      </button>
                    ))}
                    <span className="mcb-star-label">
                      {
                        ["", "Poor", "Fair", "Good", "Great", "Amazing!"][
                          hoveredStar ?? rating
                        ]
                      }
                    </span>
                  </div>
                </div>

                {/* Name */}
                <div className="mcb-form-group">
                  <label className="mcb-form-label">
                    Your name{" "}
                    <span className="mcb-form-optional">(optional)</span>
                  </label>
                  <input
                    type="text"
                    className="mcb-form-input"
                    placeholder="Leave blank to stay anonymous"
                    value={reviewName}
                    onChange={(e) => setReviewName(e.target.value)}
                    maxLength={60}
                  />
                </div>

                {/* Review Text */}
                <div className="mcb-form-group">
                  <label className="mcb-form-label">Your story</label>
                  <textarea
                    className="mcb-form-input mcb-form-textarea"
                    placeholder="Tell us what helped, what changed, or how you're feeling..."
                    required
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    rows={4}
                    maxLength={600}
                  />
                  <div className="mcb-char-count">{reviewText.length}/600</div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="mcb-reviews-v2-submit"
                  disabled={submitting}
                >
                  {submitting ? (
                    <span className="mcb-spinner" />
                  ) : (
                    "Publish My Review →"
                  )}
                </button>

                {submitStatus === "success" && (
                  <div className="mcb-submit-status mcb-submit-success">
                    ✅ Thank you! Your review has been published.
                  </div>
                )}
                {submitStatus === "error" && (
                  <div className="mcb-submit-status mcb-submit-error">
                    ⚠️ Something went wrong. Please try again.
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>

        <style>{`
          /* ── REVIEWS V2 SECTION ── */
          .mcb-reviews-v2 {
            position: relative;
            background: #0d1117;
            padding: 100px 0 120px;
            overflow: hidden;
            color: #f0f6fc;
          }

          /* Blob backgrounds */
          .mcb-reviews-v2-bg-blobs { position: absolute; inset: 0; pointer-events: none; }
          .mcb-blob {
            position: absolute;
            border-radius: 50%;
            filter: blur(90px);
            opacity: 0.18;
          }
          .mcb-blob-1 {
            width: 500px; height: 500px;
            background: radial-gradient(circle, #10b981, transparent);
            top: -120px; left: -100px;
          }
          .mcb-blob-2 {
            width: 400px; height: 400px;
            background: radial-gradient(circle, #6366f1, transparent);
            bottom: -80px; right: -60px;
          }
          .mcb-blob-3 {
            width: 300px; height: 300px;
            background: radial-gradient(circle, #f59e0b, transparent);
            top: 40%; left: 50%;
            transform: translate(-50%, -50%);
          }

          .mcb-reviews-v2-container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 24px;
          }

          /* Header */
          .mcb-reviews-v2-header {
            text-align: center;
            margin-bottom: 64px;
          }
          .mcb-reviews-v2-eyebrow {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 12px;
            color: #10b981;
            font-size: 13px;
            font-weight: 700;
            letter-spacing: 0.15em;
            text-transform: uppercase;
            margin-bottom: 20px;
          }
          .mcb-reviews-v2-eyebrow-line {
            display: inline-block;
            width: 40px;
            height: 1px;
            background: #10b981;
            opacity: 0.6;
          }
          .mcb-reviews-v2-title {
            font-size: clamp(2rem, 5vw, 3.2rem);
            font-weight: 800;
            color: #f0f6fc;
            margin: 0 0 16px;
            line-height: 1.15;
          }
          .mcb-reviews-v2-title em {
            font-style: italic;
            color: #10b981;
          }
          .mcb-reviews-v2-sub {
            font-size: 1.1rem;
            color: #8b949e;
            max-width: 520px;
            margin: 0 auto;
            line-height: 1.7;
          }

          /* Marquee */
          .mcb-reviews-v2-marquee-wrap {
            overflow: hidden;
            mask-image: linear-gradient(to right, transparent, black 12%, black 88%, transparent);
            -webkit-mask-image: linear-gradient(to right, transparent, black 12%, black 88%, transparent);
            margin-bottom: 72px;
          }
          .mcb-reviews-v2-marquee {
            display: flex;
            gap: 24px;
            width: max-content;
            animation: marquee-slide 40s linear infinite;
          }
          .mcb-reviews-v2-marquee:hover {
            animation-play-state: paused;
          }
          @keyframes marquee-slide {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }

          /* Review card */
          .mcb-reviews-v2-card {
            flex-shrink: 0;
            width: 320px;
            background: rgba(255,255,255,0.04);
            border: 1px solid rgba(255,255,255,0.09);
            border-radius: 20px;
            padding: 28px;
            backdrop-filter: blur(12px);
            transition: border-color 0.3s, background 0.3s;
            position: relative;
            overflow: hidden;
          }
          .mcb-reviews-v2-card:hover {
            border-color: rgba(16,185,129,0.4);
            background: rgba(16,185,129,0.05);
          }
          .mcb-reviews-v2-card-quote {
            font-size: 64px;
            line-height: 0.6;
            color: #10b981;
            opacity: 0.3;
            font-family: Georgia, serif;
            margin-bottom: 16px;
          }
          .mcb-reviews-v2-card-text {
            font-size: 15px;
            line-height: 1.7;
            color: #c9d1d9;
            margin-bottom: 20px;
            display: -webkit-box;
            -webkit-line-clamp: 4;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
          .mcb-reviews-v2-card-stars {
            display: flex;
            gap: 3px;
            margin-bottom: 20px;
          }
          .mcb-star { color: #f59e0b; font-size: 16px; }
          .mcb-reviews-v2-card-author {
            display: flex;
            align-items: center;
            gap: 12px;
            border-top: 1px solid rgba(255,255,255,0.07);
            padding-top: 16px;
          }
          .mcb-reviews-v2-avatar {
            width: 38px; height: 38px;
            border-radius: 50%;
            background: linear-gradient(135deg, #10b981, #059669);
            display: flex; align-items: center; justify-content: center;
            font-weight: 700; font-size: 16px; color: white;
            flex-shrink: 0;
          }
          .mcb-reviews-v2-author-name {
            font-weight: 600;
            font-size: 14px;
            color: #e6edf3;
          }
          .mcb-reviews-v2-author-date {
            font-size: 12px;
            color: #6e7681;
            margin-top: 2px;
          }

          /* Skeleton */
          .mcb-skeleton .mcb-skeleton-inner { padding: 8px 0; }
          .mcb-skeleton-line {
            height: 14px;
            background: rgba(255,255,255,0.07);
            border-radius: 8px;
            margin-bottom: 14px;
            animation: shimmer 1.6s ease-in-out infinite;
          }
          .mcb-skeleton-long { width: 100%; }
          .mcb-skeleton-medium { width: 75%; }
          .mcb-skeleton-short { width: 45%; }
          @keyframes shimmer {
            0%, 100% { opacity: 0.4; }
            50% { opacity: 0.9; }
          }

          /* Form wrapper */
          .mcb-reviews-v2-form-wrap { max-width: 960px; margin: 0 auto; }
          .mcb-reviews-v2-form-card {
            display: grid;
            grid-template-columns: 1fr 1.4fr;
            gap: 0;
            background: rgba(255,255,255,0.03);
            border: 1px solid rgba(255,255,255,0.1);
            border-radius: 28px;
            overflow: hidden;
            backdrop-filter: blur(20px);
          }

          /* Form left panel */
          .mcb-reviews-v2-form-left {
            padding: 48px 40px;
            background: linear-gradient(160deg, rgba(16,185,129,0.12), rgba(16,185,129,0.03));
            border-right: 1px solid rgba(255,255,255,0.07);
            display: flex;
            flex-direction: column;
            justify-content: center;
          }
          .mcb-reviews-v2-form-icon {
            font-size: 40px;
            margin-bottom: 20px;
          }
          .mcb-reviews-v2-form-left h3 {
            font-size: 1.5rem;
            font-weight: 700;
            color: #f0f6fc;
            margin: 0 0 12px;
          }
          .mcb-reviews-v2-form-left p {
            font-size: 0.95rem;
            color: #8b949e;
            line-height: 1.7;
            margin: 0 0 28px;
          }
          .mcb-reviews-v2-trust-badges { display: flex; flex-direction: column; gap: 10px; }
          .mcb-trust-badge {
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 13px;
            color: #c9d1d9;
            font-weight: 500;
          }
          .mcb-trust-badge-dot {
            width: 7px; height: 7px;
            border-radius: 50%;
            background: #10b981;
            flex-shrink: 0;
          }

          /* Form right */
          .mcb-reviews-v2-form-right {
            padding: 48px 40px;
            display: flex;
            flex-direction: column;
            gap: 0;
          }
          .mcb-form-group { margin-bottom: 24px; }
          .mcb-form-label {
            display: block;
            font-size: 13px;
            font-weight: 600;
            color: #c9d1d9;
            margin-bottom: 8px;
            letter-spacing: 0.03em;
          }
          .mcb-form-optional { color: #6e7681; font-weight: 400; }
          .mcb-form-input {
            width: 100%;
            padding: 14px 18px;
            background: rgba(255,255,255,0.05);
            border: 1.5px solid rgba(255,255,255,0.1);
            border-radius: 12px;
            font-size: 15px;
            color: #f0f6fc;
            outline: none;
            transition: border-color 0.2s, background 0.2s;
            resize: none;
            box-sizing: border-box;
            font-family: inherit;
          }
          .mcb-form-input::placeholder { color: #484f58; }
          .mcb-form-input:focus {
            border-color: #10b981;
            background: rgba(16,185,129,0.06);
          }
          .mcb-form-textarea { min-height: 120px; }
          .mcb-char-count {
            text-align: right;
            font-size: 12px;
            color: #484f58;
            margin-top: 6px;
          }

          /* Star picker */
          .mcb-star-picker {
            display: flex;
            align-items: center;
            gap: 6px;
          }
          .mcb-star-btn {
            background: none;
            border: none;
            font-size: 28px;
            color: #30363d;
            cursor: pointer;
            padding: 0;
            transition: color 0.15s, transform 0.15s;
            line-height: 1;
          }
          .mcb-star-btn.mcb-star-active { color: #f59e0b; }
          .mcb-star-btn:hover { transform: scale(1.2); }
          .mcb-star-label {
            font-size: 13px;
            font-weight: 600;
            color: #10b981;
            margin-left: 8px;
            min-width: 60px;
          }

          /* Submit button */
          .mcb-reviews-v2-submit {
            width: 100%;
            padding: 16px;
            background: linear-gradient(135deg, #10b981, #059669);
            color: white;
            border: none;
            border-radius: 12px;
            font-size: 16px;
            font-weight: 700;
            cursor: pointer;
            transition: opacity 0.2s, transform 0.15s;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            margin-top: 4px;
            font-family: inherit;
          }
          .mcb-reviews-v2-submit:hover:not(:disabled) {
            opacity: 0.9;
            transform: translateY(-1px);
          }
          .mcb-reviews-v2-submit:disabled { opacity: 0.6; cursor: not-allowed; }

          /* Spinner */
          .mcb-spinner {
            width: 20px; height: 20px;
            border: 2px solid rgba(255,255,255,0.3);
            border-top-color: white;
            border-radius: 50%;
            animation: spin 0.7s linear infinite;
            display: inline-block;
          }
          @keyframes spin { to { transform: rotate(360deg); } }

          /* Status messages */
          .mcb-submit-status {
            margin-top: 14px;
            padding: 12px 16px;
            border-radius: 10px;
            font-size: 14px;
            font-weight: 500;
            text-align: center;
          }
          .mcb-submit-success { background: rgba(16,185,129,0.12); color: #6ee7b7; border: 1px solid rgba(16,185,129,0.25); }
          .mcb-submit-error   { background: rgba(239,68,68,0.1);   color: #fca5a5; border: 1px solid rgba(239,68,68,0.25); }

          /* Responsive */
          @media (max-width: 768px) {
            .mcb-reviews-v2-form-card {
              grid-template-columns: 1fr;
            }
            .mcb-reviews-v2-form-left {
              border-right: none;
              border-bottom: 1px solid rgba(255,255,255,0.07);
              padding: 36px 28px;
            }
            .mcb-reviews-v2-form-right { padding: 36px 28px; }
            .mcb-reviews-v2-card { width: 280px; }
          }
        `}</style>
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
