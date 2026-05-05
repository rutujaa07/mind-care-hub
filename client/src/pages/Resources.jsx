import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const TYPE_CONFIG = {
  article: { label: "Article", bg: "#dbeafe", color: "#1e40af", icon: "📄" },
  exercise: { label: "Exercise", bg: "#d1fae5", color: "#065f46", icon: "🧘" },
  helpline: { label: "Helpline", bg: "#fce7f3", color: "#9d174d", icon: "📞" },
};

function Resources() {
  const { token, user } = useAuth();
  const [resources, setResources] = useState([]);
  const [title, setTitle] = useState("");
  const [type, setType] = useState("article");
  const [content, setContent] = useState("");
  const [link, setLink] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [showForm, setShowForm] = useState(false);

  const config = { headers: { Authorization: `Bearer ${token}` } };
  const canAdd = user?.role === "counselor" || user?.role === "admin";

  const fetchResources = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/resources",
        config
      );
      setResources(res.data);
    } catch {
      setError("Failed to fetch resources");
    }
  };

  const handleAddResource = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:5000/api/resources",
        { title, type, content, link },
        config
      );
      setTitle("");
      setContent("");
      setLink("");
      setType("article");
      setSuccess("Resource added successfully!");
      setShowForm(false);
      fetchResources();
      setTimeout(() => setSuccess(""), 3000);
    } catch {
      setError("Failed to add resource");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/resources/${id}`, config);
      fetchResources();
    } catch {
      setError("Failed to delete resource");
    }
  };

  useEffect(() => {
    fetchResources();
  }, []);

  const filtered =
    filterType === "all"
      ? resources
      : resources.filter((r) => r.type === filterType);
  const counts = {
    all: resources.length,
    article: resources.filter((r) => r.type === "article").length,
    exercise: resources.filter((r) => r.type === "exercise").length,
    helpline: resources.filter((r) => r.type === "helpline").length,
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&display=swap');
        * { box-sizing: border-box; }

        .res-page {
          min-height: 100vh;
          background: #f5f5f0;
          font-family: 'DM Sans', sans-serif;
          padding: 32px 24px 56px;
        }

        .res-container {
          max-width: 820px;
          margin: 0 auto;
        }

        .res-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 24px;
          gap: 16px;
          flex-wrap: wrap;
        }

        .res-header-left h1 {
          font-family: 'DM Serif Display', serif;
          font-size: 32px;
          font-weight: 400;
          color: #1a2e1a;
          margin: 0 0 4px;
        }

        .res-header-left p {
          color: #6b7280;
          font-size: 14px;
          margin: 0;
        }

        .res-add-btn {
          padding: 10px 20px;
          background: #2d7a4f;
          color: white;
          border: none;
          border-radius: 10px;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          display: flex; align-items: center; gap: 7px;
          transition: background 0.2s;
          white-space: nowrap;
        }
        .res-add-btn:hover { background: #235e3c; }

        .res-alert {
          padding: 10px 14px;
          border-radius: 10px;
          font-size: 13.5px;
          margin-bottom: 16px;
        }
        .res-alert-error { background: #fee2e2; color: #dc2626; }
        .res-alert-success { background: #d1fae5; color: #065f46; }

        /* Add form */
        .res-form-card {
          background: white;
          border-radius: 16px;
          border: 1.5px solid #2d7a4f;
          padding: 22px 24px;
          margin-bottom: 20px;
        }

        .res-form-title {
          font-family: 'DM Serif Display', serif;
          font-size: 18px; font-weight: 400; color: #1a2e1a;
          margin: 0 0 18px;
        }

        .res-form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
          margin-bottom: 14px;
        }

        .res-field label {
          display: block;
          font-size: 11.5px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: #374151;
          margin-bottom: 6px;
        }

        .res-field input,
        .res-field select,
        .res-field textarea {
          width: 100%;
          padding: 10px 13px;
          border-radius: 10px;
          border: 1.5px solid #e5e7eb;
          font-size: 14px;
          font-family: 'DM Sans', sans-serif;
          color: #1a2e1a;
          background: white;
          outline: none;
          transition: border-color 0.2s;
        }
        .res-field input:focus,
        .res-field select:focus,
        .res-field textarea:focus { border-color: #2d7a4f; }
        .res-field input::placeholder,
        .res-field textarea::placeholder { color: #c0c0b8; }
        .res-field textarea { resize: none; height: 80px; }

        .res-field-full { grid-column: 1 / -1; }

        .res-form-actions {
          display: flex; gap: 10px; justify-content: flex-end;
          margin-top: 16px;
        }

        .res-cancel-btn {
          padding: 10px 18px;
          border-radius: 10px;
          border: 1.5px solid #e5e7eb;
          background: white;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px; font-weight: 500;
          color: #6b7280; cursor: pointer;
          transition: background 0.15s;
        }
        .res-cancel-btn:hover { background: #f5f5f0; }

        .res-submit-btn {
          padding: 10px 22px;
          background: #2d7a4f; color: white;
          border: none; border-radius: 10px;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px; font-weight: 600;
          cursor: pointer;
          transition: background 0.2s;
        }
        .res-submit-btn:hover { background: #235e3c; }

        /* Filter tabs */
        .res-filters {
          display: flex;
          gap: 8px;
          margin-bottom: 20px;
          flex-wrap: wrap;
        }

        .res-filter-btn {
          padding: 7px 16px;
          border-radius: 20px;
          border: 1.5px solid #e5e7eb;
          background: white;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px; font-weight: 500;
          color: #6b7280;
          cursor: pointer;
          display: flex; align-items: center; gap: 6px;
          transition: all 0.15s;
        }
        .res-filter-btn:hover { border-color: #2d7a4f; color: #2d7a4f; }
        .res-filter-btn.active { background: #2d7a4f; border-color: #2d7a4f; color: white; }
        .res-filter-count {
          font-size: 11px; font-weight: 600;
          background: rgba(255,255,255,0.25);
          padding: 1px 6px; border-radius: 10px;
        }
        .res-filter-btn:not(.active) .res-filter-count {
          background: #f0fdf4; color: #2d7a4f;
        }

        /* Resource grid */
        .res-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 14px;
        }

        .res-card {
          background: white;
          border-radius: 16px;
          border: 1.5px solid #e9e9e3;
          padding: 18px 20px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          transition: border-color 0.15s, transform 0.15s;
        }
        .res-card:hover { border-color: #a8d5be; transform: translateY(-1px); }

        .res-card-top {
          display: flex; align-items: flex-start; justify-content: space-between; gap: 10px;
        }

        .res-card-badge {
          display: flex; align-items: center; gap: 5px;
          font-size: 11.5px; font-weight: 600;
          padding: 4px 10px; border-radius: 20px;
          flex-shrink: 0;
        }

        .res-card-title {
          font-size: 15px; font-weight: 600; color: #1a2e1a;
          line-height: 1.3; flex: 1;
        }

        .res-card-content {
          font-size: 13.5px; color: #6b7280;
          line-height: 1.55;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .res-card-footer {
          display: flex; align-items: center; justify-content: space-between;
          margin-top: auto;
        }

        .res-visit-btn {
          display: inline-flex; align-items: center; gap: 5px;
          font-size: 13px; font-weight: 500;
          color: #2d7a4f; text-decoration: none;
          padding: 6px 12px;
          border-radius: 8px;
          background: #f0fdf4;
          transition: background 0.15s;
        }
        .res-visit-btn:hover { background: #d1fae5; }

        .res-delete-btn {
          width: 30px; height: 30px;
          border-radius: 8px;
          border: none; background: #fee2e2;
          color: #dc2626; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: background 0.15s;
        }
        .res-delete-btn:hover { background: #fecaca; }

        .res-empty {
          text-align: center; padding: 56px 0;
          color: #9ca3af;
        }
        .res-empty-icon { font-size: 36px; margin-bottom: 12px; }
        .res-empty h3 {
          font-family: 'DM Serif Display', serif;
          font-size: 18px; font-weight: 400;
          color: #6b7280; margin: 0 0 4px;
        }
        .res-empty p { font-size: 13.5px; margin: 0; }

        @media (max-width: 480px) {
          .res-form-grid { grid-template-columns: 1fr; }
          .res-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="res-page">
        <div className="res-container">
          <div className="res-header">
            <div className="res-header-left">
              <h1>Resources</h1>
              <p>Mental health tools, articles & helplines</p>
            </div>
            {canAdd && !showForm && (
              <button className="res-add-btn" onClick={() => setShowForm(true)}>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
                Add Resource
              </button>
            )}
          </div>

          {error && <div className="res-alert res-alert-error">{error}</div>}
          {success && (
            <div className="res-alert res-alert-success">✓ {success}</div>
          )}

          {/* Add form */}
          {canAdd && showForm && (
            <div className="res-form-card">
              <p className="res-form-title">Add New Resource</p>
              <form onSubmit={handleAddResource}>
                <div className="res-form-grid">
                  <div className="res-field res-field-full">
                    <label>Title</label>
                    <input
                      type="text"
                      placeholder="Resource title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                    />
                  </div>
                  <div className="res-field">
                    <label>Type</label>
                    <select
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                    >
                      <option value="article">Article</option>
                      <option value="exercise">Exercise</option>
                      <option value="helpline">Helpline</option>
                    </select>
                  </div>
                  <div className="res-field">
                    <label>Link (optional)</label>
                    <input
                      type="text"
                      placeholder="https://…"
                      value={link}
                      onChange={(e) => setLink(e.target.value)}
                    />
                  </div>
                  <div className="res-field res-field-full">
                    <label>Description</label>
                    <textarea
                      placeholder="Describe this resource…"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="res-form-actions">
                  <button
                    type="button"
                    className="res-cancel-btn"
                    onClick={() => setShowForm(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="res-submit-btn">
                    Add Resource
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Filters */}
          <div className="res-filters">
            {["all", "article", "exercise", "helpline"].map((t) => (
              <button
                key={t}
                className={`res-filter-btn ${filterType === t ? "active" : ""}`}
                onClick={() => setFilterType(t)}
              >
                {t !== "all" && <span>{TYPE_CONFIG[t]?.icon}</span>}
                {t.charAt(0).toUpperCase() + t.slice(1)}
                <span className="res-filter-count">{counts[t]}</span>
              </button>
            ))}
          </div>

          {/* Grid */}
          {filtered.length === 0 ? (
            <div className="res-empty">
              <div className="res-empty-icon">📚</div>
              <h3>No resources yet</h3>
              <p>
                {canAdd ? "Add the first resource above." : "Check back soon!"}
              </p>
            </div>
          ) : (
            <div className="res-grid">
              {filtered.map((r) => {
                const tc = TYPE_CONFIG[r.type] || TYPE_CONFIG.article;
                return (
                  <div key={r._id} className="res-card">
                    <div className="res-card-top">
                      <span className="res-card-title">{r.title}</span>
                      <span
                        className="res-card-badge"
                        style={{ background: tc.bg, color: tc.color }}
                      >
                        {tc.icon} {tc.label}
                      </span>
                    </div>
                    <p className="res-card-content">{r.content}</p>
                    <div className="res-card-footer">
                      {r.link ? (
                        <a
                          className="res-visit-btn"
                          href={r.link}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Visit
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                            <polyline points="15 3 21 3 21 9" />
                            <line x1="10" y1="14" x2="21" y2="3" />
                          </svg>
                        </a>
                      ) : (
                        <span />
                      )}
                      {user?.role === "admin" && (
                        <button
                          className="res-delete-btn"
                          onClick={() => handleDelete(r._id)}
                          title="Delete"
                        >
                          <svg
                            width="13"
                            height="13"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="3 6 5 6 21 6" />
                            <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
                            <path d="M10 11v6" />
                            <path d="M14 11v6" />
                            <path d="M9 6V4h6v2" />
                          </svg>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Resources;
