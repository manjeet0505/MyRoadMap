'use client'
import { useState, useMemo } from "react";

const STATUS_CONFIG = {
  "Applied": { color: "#6366f1", bg: "rgba(99,102,241,0.15)", dot: "#6366f1" },
  "No Response": { color: "#64748b", bg: "rgba(100,116,139,0.15)", dot: "#64748b" },
  "Shortlisted": { color: "#10b981", bg: "rgba(16,185,129,0.15)", dot: "#10b981" },
  "Interview": { color: "#f59e0b", bg: "rgba(245,158,11,0.15)", dot: "#f59e0b" },
  "Rejected": { color: "#ef4444", bg: "rgba(239,68,68,0.15)", dot: "#ef4444" },
  "Offer": { color: "#22d3ee", bg: "rgba(34,211,238,0.15)", dot: "#22d3ee" },
};

const PLATFORMS = ["Naukri", "LinkedIn", "Instahyre", "Cutshort", "Wellfound", "Internshala", "Indeed", "Other"];
const ROLES = ["Full Stack Developer", "SDE", "Frontend Developer", "Backend Developer", "React Developer", "Node.js Developer", "Other"];

const INITIAL_JOBS = [
  { id: 1, company: "Example Corp", role: "Full Stack Developer", platform: "Naukri", dateApplied: "2026-04-15", status: "No Response", matchScore: 75, notes: "Next.js + Node stack" },
];

export default function JobTracker() {
  const [jobs, setJobs] = useState(INITIAL_JOBS);
  const [showForm, setShowForm] = useState(false);
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterPlatform, setFilterPlatform] = useState("All");
  const [form, setForm] = useState({
    company: "", role: "Full Stack Developer", platform: "Naukri",
    dateApplied: new Date().toISOString().split("T")[0],
    status: "Applied", matchScore: "", notes: ""
  });

  const stats = useMemo(() => {
    const total = jobs.length;
    const shortlisted = jobs.filter(j => j.status === "Shortlisted" || j.status === "Interview" || j.status === "Offer").length;
    const interviews = jobs.filter(j => j.status === "Interview").length;
    const offers = jobs.filter(j => j.status === "Offer").length;
    const rate = total ? Math.round((shortlisted / total) * 100) : 0;
    return { total, shortlisted, interviews, offers, rate };
  }, [jobs]);

  const filtered = useMemo(() => {
    return jobs.filter(j => {
      if (filterStatus !== "All" && j.status !== filterStatus) return false;
      if (filterPlatform !== "All" && j.platform !== filterPlatform) return false;
      return true;
    }).sort((a, b) => new Date(b.dateApplied) - new Date(a.dateApplied));
  }, [jobs, filterStatus, filterPlatform]);

  const handleAdd = () => {
    if (!form.company.trim()) return;
    setJobs(prev => [...prev, { ...form, id: Date.now(), matchScore: Number(form.matchScore) || 0 }]);
    setForm({ company: "", role: "Full Stack Developer", platform: "Naukri", dateApplied: new Date().toISOString().split("T")[0], status: "Applied", matchScore: "", notes: "" });
    setShowForm(false);
  };

  const updateStatus = (id, status) => {
    setJobs(prev => prev.map(j => j.id === id ? { ...j, status } : j));
  };

  const deleteJob = (id) => {
    setJobs(prev => prev.filter(j => j.id !== id));
  };

  return (
    <div style={{
      minHeight: "100vh", background: "#080c14", color: "#e2e8f0",
      fontFamily: "'DM Mono', 'Fira Code', 'Courier New', monospace",
      padding: "24px 16px"
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500&family=Syne:wght@700;800&display=swap');
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 4px; } 
        ::-webkit-scrollbar-track { background: #0f1623; }
        ::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 2px; }
        input, select, textarea { outline: none; }
        input::placeholder, textarea::placeholder { color: #334155; }
        .stat-card { transition: transform 0.2s, box-shadow 0.2s; }
        .stat-card:hover { transform: translateY(-2px); box-shadow: 0 8px 32px rgba(0,0,0,0.4); }
        .job-row { transition: background 0.15s; }
        .job-row:hover { background: rgba(255,255,255,0.03) !important; }
        .del-btn { opacity: 0; transition: opacity 0.15s; }
        .job-row:hover .del-btn { opacity: 1; }
        .add-btn { transition: all 0.2s; }
        .add-btn:hover { background: rgba(99,102,241,0.25) !important; transform: translateY(-1px); }
        .filter-btn { transition: all 0.15s; cursor: pointer; }
        .filter-btn:hover { border-color: #6366f1 !important; }
      `}</style>

      {/* Header */}
      <div style={{ maxWidth: 960, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 32 }}>
          <div>
            <div style={{ fontSize: 11, letterSpacing: 4, color: "#475569", textTransform: "uppercase", marginBottom: 6 }}>
              SDE / FULL STACK
            </div>
            <h1 style={{
              fontFamily: "'Syne', sans-serif", fontSize: 28, fontWeight: 800,
              margin: 0, background: "linear-gradient(135deg, #e2e8f0 0%, #6366f1 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
            }}>
              Job Hunt Tracker
            </h1>
            <div style={{ fontSize: 11, color: "#334155", marginTop: 4 }}>
              Target: ₹8–15 LPA · NCR / Remote
            </div>
          </div>
          <button
            className="add-btn"
            onClick={() => setShowForm(!showForm)}
            style={{
              background: showForm ? "rgba(239,68,68,0.15)" : "rgba(99,102,241,0.15)",
              border: `1px solid ${showForm ? "#ef4444" : "#6366f1"}`,
              color: showForm ? "#ef4444" : "#818cf8",
              padding: "10px 20px", borderRadius: 8, cursor: "pointer",
              fontSize: 13, fontFamily: "inherit", fontWeight: 500,
              letterSpacing: 1
            }}
          >
            {showForm ? "✕ CANCEL" : "+ ADD JOB"}
          </button>
        </div>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 28 }}>
          {[
            { label: "APPLIED", value: stats.total, accent: "#6366f1" },
            { label: "SHORTLISTED", value: stats.shortlisted, accent: "#10b981" },
            { label: "INTERVIEWS", value: stats.interviews, accent: "#f59e0b" },
            { label: "HIT RATE", value: `${stats.rate}%`, accent: "#22d3ee" },
          ].map(s => (
            <div key={s.label} className="stat-card" style={{
              background: "#0d1422", border: "1px solid #1e293b",
              borderRadius: 10, padding: "16px 18px"
            }}>
              <div style={{ fontSize: 10, letterSpacing: 3, color: "#475569", marginBottom: 8 }}>{s.label}</div>
              <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 26, fontWeight: 800, color: s.accent }}>{s.value}</div>
            </div>
          ))}
        </div>

        {/* Add Form */}
        {showForm && (
          <div style={{
            background: "#0d1422", border: "1px solid #1e2d3d",
            borderRadius: 12, padding: 20, marginBottom: 24,
            boxShadow: "0 0 40px rgba(99,102,241,0.08)"
          }}>
            <div style={{ fontSize: 11, letterSpacing: 3, color: "#6366f1", marginBottom: 16 }}>NEW APPLICATION</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 12 }}>
              {[
                { key: "company", label: "Company *", type: "text", placeholder: "e.g. Razorpay" },
                { key: "dateApplied", label: "Date Applied", type: "date" },
                { key: "matchScore", label: "JD Match %", type: "number", placeholder: "70" },
              ].map(f => (
                <div key={f.key}>
                  <div style={{ fontSize: 10, letterSpacing: 2, color: "#475569", marginBottom: 6 }}>{f.label}</div>
                  <input
                    type={f.type} placeholder={f.placeholder} value={form[f.key]}
                    onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                    style={{
                      width: "100%", background: "#080c14", border: "1px solid #1e293b",
                      borderRadius: 6, padding: "8px 12px", color: "#e2e8f0",
                      fontSize: 13, fontFamily: "inherit"
                    }}
                  />
                </div>
              ))}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 12 }}>
              {[
                { key: "role", label: "Role", options: ROLES },
                { key: "platform", label: "Platform", options: PLATFORMS },
                { key: "status", label: "Status", options: Object.keys(STATUS_CONFIG) },
              ].map(f => (
                <div key={f.key}>
                  <div style={{ fontSize: 10, letterSpacing: 2, color: "#475569", marginBottom: 6 }}>{f.label}</div>
                  <select
                    value={form[f.key]}
                    onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                    style={{
                      width: "100%", background: "#080c14", border: "1px solid #1e293b",
                      borderRadius: 6, padding: "8px 12px", color: "#e2e8f0",
                      fontSize: 13, fontFamily: "inherit"
                    }}
                  >
                    {f.options.map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>
              ))}
            </div>
            <div style={{ marginBottom: 14 }}>
              <div style={{ fontSize: 10, letterSpacing: 2, color: "#475569", marginBottom: 6 }}>NOTES (stack, JD keywords, recruiter name)</div>
              <textarea
                value={form.notes} placeholder="e.g. Next.js + Node, posted 3 days ago, contacted HR on LinkedIn"
                onChange={e => setForm(p => ({ ...p, notes: e.target.value }))}
                rows={2}
                style={{
                  width: "100%", background: "#080c14", border: "1px solid #1e293b",
                  borderRadius: 6, padding: "8px 12px", color: "#e2e8f0",
                  fontSize: 13, fontFamily: "inherit", resize: "vertical"
                }}
              />
            </div>
            <button
              onClick={handleAdd}
              style={{
                background: "rgba(99,102,241,0.2)", border: "1px solid #6366f1",
                color: "#818cf8", padding: "10px 24px", borderRadius: 8,
                cursor: "pointer", fontSize: 13, fontFamily: "inherit",
                letterSpacing: 1, fontWeight: 500
              }}
            >
              LOG APPLICATION →
            </button>
          </div>
        )}

        {/* Filters */}
        <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
          <div style={{ fontSize: 11, color: "#475569", alignSelf: "center", marginRight: 4, letterSpacing: 2 }}>FILTER:</div>
          {["All", ...Object.keys(STATUS_CONFIG)].map(s => (
            <button
              key={s} className="filter-btn"
              onClick={() => setFilterStatus(s)}
              style={{
                background: filterStatus === s ? "rgba(99,102,241,0.2)" : "transparent",
                border: `1px solid ${filterStatus === s ? "#6366f1" : "#1e293b"}`,
                color: filterStatus === s ? "#818cf8" : "#475569",
                padding: "5px 12px", borderRadius: 20, fontSize: 11,
                fontFamily: "inherit", letterSpacing: 1
              }}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Platform filter */}
        <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
          <div style={{ fontSize: 11, color: "#475569", alignSelf: "center", marginRight: 4, letterSpacing: 2 }}>PLATFORM:</div>
          {["All", ...PLATFORMS].map(p => (
            <button
              key={p} className="filter-btn"
              onClick={() => setFilterPlatform(p)}
              style={{
                background: filterPlatform === p ? "rgba(34,211,238,0.15)" : "transparent",
                border: `1px solid ${filterPlatform === p ? "#22d3ee" : "#1e293b"}`,
                color: filterPlatform === p ? "#22d3ee" : "#475569",
                padding: "5px 12px", borderRadius: 20, fontSize: 11,
                fontFamily: "inherit", letterSpacing: 1
              }}
            >
              {p}
            </button>
          ))}
        </div>

        {/* Table */}
        <div style={{
          background: "#0d1422", border: "1px solid #1e293b",
          borderRadius: 12, overflow: "hidden"
        }}>
          {/* Header */}
          <div style={{
            display: "grid", gridTemplateColumns: "2fr 2fr 1fr 1fr 1.5fr 1fr 1fr",
            padding: "12px 16px", borderBottom: "1px solid #1e293b",
            fontSize: 10, letterSpacing: 3, color: "#475569"
          }}>
            <div>COMPANY</div><div>ROLE</div><div>PLATFORM</div>
            <div>DATE</div><div>STATUS</div><div>MATCH</div><div></div>
          </div>

          {filtered.length === 0 && (
            <div style={{ padding: 40, textAlign: "center", color: "#334155", fontSize: 13 }}>
              No applications yet. Click "+ ADD JOB" to log your first one.
            </div>
          )}

          {filtered.map((job, i) => {
            const sc = STATUS_CONFIG[job.status];
            return (
              <div key={job.id} className="job-row" style={{
                display: "grid", gridTemplateColumns: "2fr 2fr 1fr 1fr 1.5fr 1fr 1fr",
                padding: "13px 16px", alignItems: "center",
                borderBottom: i < filtered.length - 1 ? "1px solid #0f1623" : "none",
                background: "transparent"
              }}>
                <div>
                  <div style={{ fontSize: 13, color: "#e2e8f0", fontWeight: 500 }}>{job.company}</div>
                  {job.notes && <div style={{ fontSize: 10, color: "#334155", marginTop: 2 }}>{job.notes.slice(0, 35)}{job.notes.length > 35 ? "…" : ""}</div>}
                </div>
                <div style={{ fontSize: 12, color: "#94a3b8" }}>{job.role}</div>
                <div style={{ fontSize: 11, color: "#64748b" }}>{job.platform}</div>
                <div style={{ fontSize: 11, color: "#64748b" }}>
                  {new Date(job.dateApplied).toLocaleDateString("en-IN", { day: "2-digit", month: "short" })}
                </div>
                <div>
                  <select
                    value={job.status}
                    onChange={e => updateStatus(job.id, e.target.value)}
                    style={{
                      background: sc.bg, border: `1px solid ${sc.color}40`,
                      color: sc.color, padding: "4px 8px", borderRadius: 20,
                      fontSize: 10, fontFamily: "inherit", letterSpacing: 1, cursor: "pointer"
                    }}
                  >
                    {Object.keys(STATUS_CONFIG).map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  {job.matchScore > 0 && (
                    <div style={{
                      display: "inline-block", fontSize: 11, fontWeight: 500,
                      color: job.matchScore >= 70 ? "#10b981" : job.matchScore >= 50 ? "#f59e0b" : "#ef4444"
                    }}>
                      {job.matchScore}%
                    </div>
                  )}
                </div>
                <div style={{ textAlign: "right" }}>
                  <button className="del-btn" onClick={() => deleteJob(job.id)} style={{
                    background: "transparent", border: "none", color: "#ef4444",
                    cursor: "pointer", fontSize: 14, padding: "2px 6px"
                  }}>✕</button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer tip */}
        <div style={{
          marginTop: 16, padding: "12px 16px", background: "rgba(99,102,241,0.06)",
          border: "1px solid rgba(99,102,241,0.15)", borderRadius: 8,
          fontSize: 11, color: "#475569", lineHeight: 1.7
        }}>
          <span style={{ color: "#6366f1" }}>■ RULE:</span> Only apply to jobs posted within 7 days · JD match ≥70% · Read full JD before applying · Message recruiter on LinkedIn after every application
        </div>
      </div>
    </div>
  );
}