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

function MoodTracker() {
  const { token } = useAuth();
  const [mood, setMood] = useState(3);
  const [note, setNote] = useState("");
  const [moodHistory, setMoodHistory] = useState([]);
  const [summary, setSummary] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  // Fetch mood history
  const fetchMoodHistory = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/moods", config);
      setMoodHistory(res.data);
    } catch (err) {
      setError("Failed to fetch mood history");
    }
  };

  // Fetch mood summary
  const fetchSummary = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/moods/summary",
        config
      );
      setSummary(res.data);
    } catch (err) {
      setError("Failed to fetch summary");
    }
  };

  // Log mood
  const handleLogMood = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:5000/api/moods",
        {
          mood,
          note,
        },
        config
      );
      setNote("");
      setSuccess("Mood logged successfully! 🎉");
      fetchMoodHistory();
      fetchSummary();
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError("Failed to log mood");
    }
  };

  useEffect(() => {
    fetchMoodHistory();
    fetchSummary();
  }, []);

  // Format data for chart
  const chartData = moodHistory
    .slice(0, 7)
    .reverse()
    .map((m) => ({
      date: new Date(m.createdAt).toLocaleDateString("en-US", {
        weekday: "short",
      }),
      mood: m.mood,
    }));

  const moodEmojis = { 1: "😞", 2: "😕", 3: "😐", 4: "🙂", 5: "😄" };

  return (
    <div>
      <h1>Mood Tracker</h1>
      {error && <p>{error}</p>}
      {success && <p>{success}</p>}

      {/* Log Mood Form */}
      <form onSubmit={handleLogMood}>
        <h2>How are you feeling today?</h2>
        <div>
          {[1, 2, 3, 4, 5].map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setMood(m)}
              style={{ fontWeight: mood === m ? "bold" : "normal" }}
            >
              {moodEmojis[m]} {m}
            </button>
          ))}
        </div>
        <p>Selected: {moodEmojis[mood]}</p>
        <textarea
          placeholder="Add a note (optional)"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
        <button type="submit">Log Mood</button>
      </form>

      {/* Weekly Summary */}
      {summary && summary.weeklyAverage && (
        <div>
          <h2>This Week</h2>
          <p>Average Mood: {summary.weeklyAverage} / 5</p>
          <p>Total Entries: {summary.totalEntries}</p>
        </div>
      )}

      {/* Mood Chart */}
      {chartData.length > 0 && (
        <div>
          <h2>Mood Chart (Last 7 days)</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis domain={[1, 5]} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="mood"
                stroke="#6366f1"
                strokeWidth={2}
                dot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Mood History */}
      <h2>Mood History</h2>
      {moodHistory.map((m) => (
        <div key={m._id}>
          <p>
            {moodEmojis[m.mood]} {m.mood}/5 —{" "}
            {new Date(m.createdAt).toLocaleDateString()}
          </p>
          {m.note && <p>{m.note}</p>}
        </div>
      ))}
    </div>
  );
}

export default MoodTracker;
