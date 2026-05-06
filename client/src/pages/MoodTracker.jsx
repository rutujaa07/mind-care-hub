// import { useState, useEffect } from "react";
// import axios from "axios";
// import { useAuth } from "../context/AuthContext";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";

// function MoodTracker() {
//   const { token } = useAuth();
//   const [mood, setMood] = useState(3);
//   const [note, setNote] = useState("");
//   const [moodHistory, setMoodHistory] = useState([]);
//   const [summary, setSummary] = useState(null);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   const config = {
//     headers: { Authorization: `Bearer ${token}` },
//   };

//   // Fetch mood history
//   const fetchMoodHistory = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/moods", config);
//       setMoodHistory(res.data);
//     } catch (err) {
//       setError("Failed to fetch mood history");
//     }
//   };

//   // Fetch mood summary
//   const fetchSummary = async () => {
//     try {
//       const res = await axios.get(
//         "http://localhost:5000/api/moods/summary",
//         config
//       );
//       setSummary(res.data);
//     } catch (err) {
//       setError("Failed to fetch summary");
//     }
//   };

//   // Log mood
//   const handleLogMood = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post(
//         "http://localhost:5000/api/moods",
//         {
//           mood,
//           note,
//         },
//         config
//       );
//       setNote("");
//       setSuccess("Mood logged successfully! 🎉");
//       fetchMoodHistory();
//       fetchSummary();
//       setTimeout(() => setSuccess(""), 3000);
//     } catch (err) {
//       setError("Failed to log mood");
//     }
//   };

//   useEffect(() => {
//     fetchMoodHistory();
//     fetchSummary();
//   }, []);

//   // Format data for chart
//   const chartData = moodHistory
//     .slice(0, 7)
//     .reverse()
//     .map((m) => ({
//       date: new Date(m.createdAt).toLocaleDateString("en-US", {
//         weekday: "short",
//       }),
//       mood: m.mood,
//     }));

//   const moodEmojis = { 1: "😞", 2: "😕", 3: "😐", 4: "🙂", 5: "😄" };

//   return (
//     <div>
//       <h1>Mood Tracker</h1>
//       {error && <p>{error}</p>}
//       {success && <p>{success}</p>}

//       {/* Log Mood Form */}
//       <form onSubmit={handleLogMood}>
//         <h2>How are you feeling today?</h2>
//         <div>
//           {[1, 2, 3, 4, 5].map((m) => (
//             <button
//               key={m}
//               type="button"
//               onClick={() => setMood(m)}
//               style={{ fontWeight: mood === m ? "bold" : "normal" }}
//             >
//               {moodEmojis[m]} {m}
//             </button>
//           ))}
//         </div>
//         <p>Selected: {moodEmojis[mood]}</p>
//         <textarea
//           placeholder="Add a note (optional)"
//           value={note}
//           onChange={(e) => setNote(e.target.value)}
//         />
//         <button type="submit">Log Mood</button>
//       </form>

//       {/* Weekly Summary */}
//       {summary && summary.weeklyAverage && (
//         <div>
//           <h2>This Week</h2>
//           <p>Average Mood: {summary.weeklyAverage} / 5</p>
//           <p>Total Entries: {summary.totalEntries}</p>
//         </div>
//       )}

//       {/* Mood Chart */}
//       {chartData.length > 0 && (
//         <div>
//           <h2>Mood Chart (Last 7 days)</h2>
//           <ResponsiveContainer width="100%" height={300}>
//             <LineChart data={chartData}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="date" />
//               <YAxis domain={[1, 5]} />
//               <Tooltip />
//               <Line
//                 type="monotone"
//                 dataKey="mood"
//                 stroke="#6366f1"
//                 strokeWidth={2}
//                 dot={{ r: 5 }}
//               />
//             </LineChart>
//           </ResponsiveContainer>
//         </div>
//       )}

//       {/* Mood History */}
//       <h2>Mood History</h2>
//       {moodHistory.map((m) => (
//         <div key={m._id}>
//           <p>
//             {moodEmojis[m.mood]} {m.mood}/5 —{" "}
//             {new Date(m.createdAt).toLocaleDateString()}
//           </p>
//           {m.note && <p>{m.note}</p>}
//         </div>
//       ))}
//     </div>
//   );
// }

// export default MoodTracker;
import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Navbar from "./Navbar";

function MoodTracker() {
  const { token } = useAuth();
  const [mood, setMood] = useState(3);
  const [note, setNote] = useState("");
  const [moodHistory, setMoodHistory] = useState([]);
  const [summary, setSummary] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const config = { headers: { Authorization: `Bearer ${token}` } };

  const fetchMoodHistory = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/moods", config);
      setMoodHistory(res.data);
    } catch {
      setError("Failed to fetch mood history");
    }
  };

  const fetchSummary = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/moods/summary",
        config
      );
      setSummary(res.data);
    } catch {
      setError("Failed to fetch summary");
    }
  };

  const handleLogMood = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:5000/api/moods",
        { mood, note },
        config
      );
      setNote("");
      setSuccess("Mood logged successfully!");
      fetchMoodHistory();
      fetchSummary();
      setTimeout(() => setSuccess(""), 3000);
    } catch {
      setError("Failed to log mood");
    }
  };

  useEffect(() => {
    fetchMoodHistory();
    fetchSummary();
  }, []);

  const chartData = moodHistory
    .slice(0, 7)
    .reverse()
    .map((m) => ({
      date: new Date(m.createdAt).toLocaleDateString("en-US", {
        weekday: "short",
      }),
      mood: m.mood,
    }));

  const moodConfig = {
    1: { emoji: "😞", label: "Rough", color: "#ef4444", bg: "#fee2e2" },
    2: { emoji: "😕", label: "Low", color: "#f97316", bg: "#ffedd5" },
    3: { emoji: "😐", label: "Okay", color: "#eab308", bg: "#fef9c3" },
    4: { emoji: "🙂", label: "Good", color: "#22c55e", bg: "#dcfce7" },
    5: { emoji: "😄", label: "Great", color: "#2d7a4f", bg: "#d1fae5" },
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const val = payload[0].value;
      const mc = moodConfig[val] || moodConfig[3];
      return (
        <div
          style={{
            background: "white",
            border: "1.5px solid #e5e7eb",
            borderRadius: 10,
            padding: "8px 14px",
            fontSize: 13,
          }}
        >
          <p style={{ color: "#6b7280", margin: "0 0 2px" }}>{label}</p>
          <p style={{ color: mc.color, fontWeight: 600, margin: 0 }}>
            {mc.emoji} {mc.label} ({val}/5)
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&display=swap');
        * { box-sizing: border-box; }

        .mt-page {
          padding-top: 0;
          min-height: 100vh;
          background: #f5f5f0;
          font-family: 'DM Sans', sans-serif;
          {/* padding: 32px 24px 48px; */}
        }

        .mt-container {
          max-width: 860px;
          margin: 0 auto;
        }

        .mt-header {
          margin-bottom: 28px;
        }

        .mt-header h1 {
          font-family: 'DM Serif Display', serif;
          font-size: 32px;
          font-weight: 400;
          color: #1a2e1a;
          margin: 0 0 4px;
        }

        .mt-header p {
          color: #6b7280;
          font-size: 14px;
          margin: 0;
        }

        .mt-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }

        .mt-card {
          background: white;
          border-radius: 16px;
          border: 1.5px solid #e9e9e3;
          padding: 24px;
        }

        .mt-card-title {
          font-family: 'DM Serif Display', serif;
          font-size: 18px;
          font-weight: 400;
          color: #1a2e1a;
          margin: 0 0 18px;
        }

        .mt-alert {
          padding: 10px 14px;
          border-radius: 10px;
          font-size: 13.5px;
          margin-bottom: 16px;
        }

        .mt-alert-error { background: #fee2e2; color: #dc2626; }
        .mt-alert-success { background: #d1fae5; color: #065f46; }

        /* Mood selector */
        .mt-mood-row {
          display: flex;
          gap: 10px;
          margin-bottom: 20px;
        }

        .mt-mood-btn {
          flex: 1;
          padding: 12px 4px;
          border-radius: 12px;
          border: 2px solid transparent;
          background: #f5f5f0;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          transition: all 0.15s;
          font-family: 'DM Sans', sans-serif;
        }

        .mt-mood-btn:hover {
          transform: translateY(-2px);
        }

        .mt-mood-btn .mt-emoji {
          font-size: 26px;
          line-height: 1;
        }

        .mt-mood-btn .mt-label {
          font-size: 11px;
          font-weight: 500;
          color: #6b7280;
        }

        .mt-textarea {
          width: 100%;
          padding: 11px 14px;
          border-radius: 10px;
          border: 1.5px solid #e5e7eb;
          font-size: 14px;
          font-family: 'DM Sans', sans-serif;
          color: #1a2e1a;
          resize: none;
          height: 80px;
          outline: none;
          transition: border-color 0.2s;
          margin-bottom: 16px;
        }

        .mt-textarea:focus { border-color: #2d7a4f; }
        .mt-textarea::placeholder { color: #c0c0b8; }

        .mt-submit-btn {
          width: 100%;
          padding: 12px;
          background: #2d7a4f;
          color: white;
          border: none;
          border-radius: 10px;
          font-size: 14.5px;
          font-weight: 600;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer;
          transition: background 0.2s;
        }

        .mt-submit-btn:hover { background: #235e3c; }

        /* Summary stats */
        .mt-stats {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          margin-bottom: 0;
        }

        .mt-stat {
          background: #f5f5f0;
          border-radius: 12px;
          padding: 16px;
          text-align: center;
        }

        .mt-stat-val {
          font-family: 'DM Serif Display', serif;
          font-size: 28px;
          color: #1a2e1a;
          margin: 0 0 2px;
        }

        .mt-stat-label {
          font-size: 12px;
          color: #6b7280;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        /* Chart */
        .mt-chart-card {
          grid-column: 1 / -1;
        }

        /* History */
        .mt-history-card {
          grid-column: 1 / -1;
        }

        .mt-history-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
          max-height: 280px;
          overflow-y: auto;
          padding-right: 4px;
        }

        .mt-history-list::-webkit-scrollbar { width: 4px; }
        .mt-history-list::-webkit-scrollbar-track { background: #f5f5f0; border-radius: 4px; }
        .mt-history-list::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 4px; }

        .mt-history-item {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          padding: 12px 14px;
          background: #f9f9f6;
          border-radius: 12px;
          border: 1.5px solid #f0f0ea;
        }

        .mt-history-badge {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          flex-shrink: 0;
        }

        .mt-history-info { flex: 1; }

        .mt-history-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 2px;
        }

        .mt-history-mood {
          font-size: 13.5px;
          font-weight: 600;
          color: #1a2e1a;
        }

        .mt-history-date {
          font-size: 12px;
          color: #9ca3af;
        }

        .mt-history-note {
          font-size: 13px;
          color: #6b7280;
          margin: 0;
        }

        .mt-empty {
          text-align: center;
          color: #9ca3af;
          font-size: 14px;
          padding: 24px 0;
        }

        @media (max-width: 640px) {
          .mt-grid { grid-template-columns: 1fr; }
          .mt-chart-card, .mt-history-card { grid-column: 1; }
          .mt-mood-btn .mt-emoji { font-size: 22px; }
        }
      `}</style>

      <div className="mt-page">
        <header className="sp-header">
          <Navbar />

          <div className="sp-header-inner">
            <div className="sp-header-title">
              <h1>
                Mood <span className="sp-gradient">Tracker</span>
              </h1>
              <p>Check in with yourself — every feeling matters.</p>
            </div>
          </div>
        </header>

        <div className="mt-container">
          {error && <div className="mt-alert mt-alert-error">{error}</div>}
          {success && (
            <div className="mt-alert mt-alert-success">✓ {success}</div>
          )}

          <div className="mt-grid">
            {/* Log Mood */}
            <div className="mt-card">
              <p className="mt-card-title">How are you feeling today?</p>
              <form onSubmit={handleLogMood}>
                <div className="mt-mood-row">
                  {[1, 2, 3, 4, 5].map((m) => (
                    <button
                      key={m}
                      type="button"
                      className="mt-mood-btn"
                      onClick={() => setMood(m)}
                      style={{
                        borderColor:
                          mood === m ? moodConfig[m].color : "transparent",
                        background: mood === m ? moodConfig[m].bg : "#f5f5f0",
                      }}
                    >
                      <span className="mt-emoji">{moodConfig[m].emoji}</span>
                      <span
                        className="mt-label"
                        style={{
                          color: mood === m ? moodConfig[m].color : "#6b7280",
                        }}
                      >
                        {moodConfig[m].label}
                      </span>
                    </button>
                  ))}
                </div>

                <textarea
                  className="mt-textarea"
                  placeholder="Add a note about your day (optional)…"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                />

                <button type="submit" className="mt-submit-btn">
                  Log Mood {moodConfig[mood].emoji}
                </button>
              </form>
            </div>

            {/* Weekly Summary */}
            <div className="mt-card">
              <p className="mt-card-title">This Week</p>
              {summary && summary.weeklyAverage ? (
                <>
                  <div className="mt-stats">
                    <div className="mt-stat">
                      <div className="mt-stat-val">
                        {moodConfig[Math.round(summary.weeklyAverage)]?.emoji ||
                          "😐"}
                      </div>
                      <div className="mt-stat-label">Avg Mood</div>
                    </div>
                    <div className="mt-stat">
                      <div className="mt-stat-val" style={{ fontSize: 28 }}>
                        {Number(summary.weeklyAverage).toFixed(1)}
                      </div>
                      <div className="mt-stat-label">Score / 5</div>
                    </div>
                    <div className="mt-stat" style={{ gridColumn: "1 / -1" }}>
                      <div className="mt-stat-val" style={{ fontSize: 28 }}>
                        {summary.totalEntries}
                      </div>
                      <div className="mt-stat-label">Total Check-ins</div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="mt-empty">
                  No data yet — log your first mood!
                </div>
              )}
            </div>

            {/* Chart */}
            {chartData.length > 0 && (
              <div className="mt-card mt-chart-card">
                <p className="mt-card-title">Last 7 Days</p>
                <ResponsiveContainer width="100%" height={220}>
                  <LineChart
                    data={chartData}
                    margin={{ top: 4, right: 8, left: -20, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0ea" />
                    <XAxis
                      dataKey="date"
                      tick={{ fontSize: 12, fill: "#9ca3af" }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      domain={[1, 5]}
                      ticks={[1, 2, 3, 4, 5]}
                      tick={{ fontSize: 12, fill: "#9ca3af" }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Line
                      type="monotone"
                      dataKey="mood"
                      stroke="#2d7a4f"
                      strokeWidth={2.5}
                      dot={{ r: 5, fill: "#2d7a4f", strokeWidth: 0 }}
                      activeDot={{ r: 7, fill: "#2d7a4f" }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}

            {/* History */}
            <div className="mt-card mt-history-card">
              <p className="mt-card-title">Mood History</p>
              {moodHistory.length === 0 ? (
                <div className="mt-empty">
                  No entries yet. Start tracking today!
                </div>
              ) : (
                <div className="mt-history-list">
                  {moodHistory.map((m) => {
                    const mc = moodConfig[m.mood] || moodConfig[3];
                    return (
                      <div key={m._id} className="mt-history-item">
                        <div
                          className="mt-history-badge"
                          style={{ background: mc.bg }}
                        >
                          {mc.emoji}
                        </div>
                        <div className="mt-history-info">
                          <div className="mt-history-top">
                            <span
                              className="mt-history-mood"
                              style={{ color: mc.color }}
                            >
                              {mc.label} — {m.mood}/5
                            </span>
                            <span className="mt-history-date">
                              {new Date(m.createdAt).toLocaleDateString(
                                "en-US",
                                {
                                  month: "short",
                                  day: "numeric",
                                }
                              )}
                            </span>
                          </div>
                          {m.note && (
                            <p className="mt-history-note">{m.note}</p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MoodTracker;
