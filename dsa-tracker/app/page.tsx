'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const FEATURES = [
  { icon: "⚡", title: "465 DSA Problems", desc: "Striver A2Z · 34 patterns · LeetCode + GFG links", color: "#6366f1" },
  { icon: "🎯", title: "Job Hunt Tracker", desc: "Track applications, status, match scores & notes", color: "#06b6d4" },
  { icon: "🧠", title: "SDE Prep Arsenal", desc: "CS fundamentals, aptitude & interview concepts", color: "#a855f7" },
  { icon: "☁️", title: "Cloud Synced", desc: "Progress saved instantly · Access from anywhere", color: "#10b981" },
]

const STATS = [
  { value: "465", label: "Questions" },
  { value: "34", label: "Patterns" },
  { value: "3", label: "Trackers" },
  { value: "∞", label: "Free" },
]

export default function LandingPage() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setTimeout(() => setMounted(true), 50) }, [])

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .landing-root {
          min-height: 100vh;
          background: #020408;
          font-family: 'DM Sans', sans-serif;
          color: #e2e8f0;
          overflow-x: hidden;
          position: relative;
        }

        .orb {
          position: fixed; border-radius: 50%;
          filter: blur(80px); opacity: 0.35;
          pointer-events: none;
          animation: drift linear infinite;
        }
        .orb-1 { width:600px; height:600px; background:#6366f1; top:-200px; left:-200px; animation-duration:20s; }
        .orb-2 { width:500px; height:500px; background:#a855f7; bottom:-150px; right:-150px; animation-duration:25s; animation-direction:reverse; }
        .orb-3 { width:350px; height:350px; background:#06b6d4; top:40%; left:60%; animation-duration:18s; animation-delay:-8s; }

        @keyframes drift {
          0%   { transform: translate(0,0) scale(1); }
          33%  { transform: translate(40px,-30px) scale(1.05); }
          66%  { transform: translate(-20px,40px) scale(0.97); }
          100% { transform: translate(0,0) scale(1); }
        }

        .grid-overlay {
          position: fixed; inset: 0;
          background-image:
            linear-gradient(rgba(99,102,241,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99,102,241,0.04) 1px, transparent 1px);
          background-size: 60px 60px;
          pointer-events: none;
        }

        .glass {
          background: rgba(255,255,255,0.04);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 20px;
        }

        .hero {
          position: relative; z-index: 10;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          min-height: 100vh;
          padding: 40px 24px;
          text-align: center;
        }

        .badge {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 6px 16px; border-radius: 99px;
          background: rgba(99,102,241,0.12);
          border: 1px solid rgba(99,102,241,0.3);
          font-size: 11px; letter-spacing: 3px;
          color: #818cf8; font-weight: 500; text-transform: uppercase;
          opacity: 0; transform: translateY(20px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .badge.visible { opacity:1; transform:translateY(0); }

        .badge-dot {
          width:6px; height:6px; border-radius:50%;
          background:#6366f1; box-shadow:0 0 8px #6366f1;
          animation: pulse-dot 2s ease infinite;
        }
        @keyframes pulse-dot {
          0%,100% { opacity:1; transform:scale(1); }
          50%      { opacity:0.5; transform:scale(0.8); }
        }

        .hero-title {
          font-family: 'Syne', sans-serif;
          font-size: clamp(56px, 10vw, 112px);
          font-weight: 800; line-height: 1;
          margin: 24px 0 8px;
          opacity: 0; transform: translateY(30px);
          transition: opacity 0.7s ease 0.15s, transform 0.7s ease 0.15s;
        }
        .hero-title.visible { opacity:1; transform:translateY(0); }
        .word-lets { color: #f1f5f9; }
        .word-prep {
          background: linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #06b6d4 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }

        .hero-sub {
          font-size: clamp(15px, 2vw, 18px);
          color: #64748b; font-weight: 300;
          max-width: 500px; line-height: 1.8;
          margin-bottom: 40px;
          opacity: 0; transform: translateY(20px);
          transition: opacity 0.7s ease 0.3s, transform 0.7s ease 0.3s;
        }
        .hero-sub.visible { opacity:1; transform:translateY(0); }

        .cta-group {
          display: flex; gap: 14px; flex-wrap: wrap; justify-content: center;
          opacity: 0; transform: translateY(20px);
          transition: opacity 0.7s ease 0.45s, transform 0.7s ease 0.45s;
        }
        .cta-group.visible { opacity:1; transform:translateY(0); }

        .btn-primary {
          padding: 16px 36px; border-radius: 12px;
          background: linear-gradient(135deg, #6366f1, #a855f7);
          border: none; color: #fff;
          font-family: 'DM Sans', sans-serif;
          font-size: 15px; font-weight: 500;
          cursor: pointer; text-decoration: none;
          display: inline-flex; align-items: center; gap: 8px;
          transition: all 0.2s ease;
          box-shadow: 0 8px 32px rgba(99,102,241,0.35);
        }
        .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 12px 40px rgba(99,102,241,0.5); }
        .btn-primary:active { transform: translateY(0); }

        .btn-secondary {
          padding: 16px 36px; border-radius: 12px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          color: #94a3b8;
          font-family: 'DM Sans', sans-serif;
          font-size: 15px; font-weight: 500;
          cursor: pointer; text-decoration: none;
          display: inline-flex; align-items: center; gap: 8px;
          transition: all 0.2s ease;
          backdrop-filter: blur(10px);
        }
        .btn-secondary:hover { border-color: rgba(255,255,255,0.2); color: #e2e8f0; transform: translateY(-2px); }

        .stats-row {
          display: flex; gap: 40px; margin-top: 56px; flex-wrap: wrap; justify-content: center;
          opacity: 0; transform: translateY(20px);
          transition: opacity 0.7s ease 0.6s, transform 0.7s ease 0.6s;
        }
        .stats-row.visible { opacity:1; transform:translateY(0); }
        .stat-item { text-align: center; }
        .stat-value {
          font-family: 'Syne', sans-serif; font-size: 32px; font-weight: 800;
          background: linear-gradient(135deg, #6366f1, #a855f7);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }
        .stat-label { font-size: 11px; color: #475569; margin-top: 4px; letter-spacing: 2px; text-transform: uppercase; }

        .features-section {
          position: relative; z-index: 10;
          padding: 0 24px 100px;
        }
        .section-label {
          text-align: center; font-size: 11px; letter-spacing: 4px;
          color: #475569; text-transform: uppercase; margin-bottom: 40px;
        }
        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 16px; max-width: 960px; margin: 0 auto;
          opacity: 0; transform: translateY(40px);
          transition: opacity 0.8s ease 0.7s, transform 0.8s ease 0.7s;
        }
        .features-grid.visible { opacity:1; transform:translateY(0); }

        .feature-card { padding: 28px; transition: transform 0.2s, border-color 0.2s; }
        .feature-card:hover { transform: translateY(-6px); border-color: rgba(255,255,255,0.15) !important; }

        .feature-icon {
          width: 48px; height: 48px; border-radius: 14px;
          display: flex; align-items: center; justify-content: center;
          font-size: 22px; margin-bottom: 16px;
        }
        .feature-title {
          font-family: 'Syne', sans-serif; font-size: 15px; font-weight: 700;
          color: #f1f5f9; margin-bottom: 8px;
        }
        .feature-desc { font-size: 13px; color: #475569; line-height: 1.6; }

        .footer {
          position: relative; z-index: 10;
          text-align: center; padding: 32px 24px;
          font-size: 11px; color: #1e293b; letter-spacing: 2px;
          border-top: 1px solid rgba(255,255,255,0.03);
        }
      `}</style>

      <div className="landing-root">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
        <div className="grid-overlay" />

        {/* Hero */}
        <section className="hero">
          <div className={`badge ${mounted ? 'visible' : ''}`}>
            <span className="badge-dot" />
            Free for all placement students
          </div>

          <h1 className={`hero-title ${mounted ? 'visible' : ''}`}>
            <span className="word-lets">Lets</span>
            <br />
            <span className="word-prep">Prep.</span>
          </h1>

          <p className={`hero-sub ${mounted ? 'visible' : ''}`}>
            Your all-in-one placement toolkit. Track DSA progress,
            manage job applications, and master CS fundamentals — all synced to the cloud.
          </p>

          <div className={`cta-group ${mounted ? 'visible' : ''}`}>
            <Link href="/login" className="btn-primary">
              Get Started Free →
            </Link>
            <Link href="/login" className="btn-secondary">
              Sign In
            </Link>
          </div>

          <div className={`stats-row ${mounted ? 'visible' : ''}`}>
            {STATS.map(s => (
              <div key={s.label} className="stat-item">
                <div className="stat-value">{s.value}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Features */}
        <section className="features-section">
          <p className="section-label">Everything you need</p>
          <div className={`features-grid ${mounted ? 'visible' : ''}`}>
            {FEATURES.map(f => (
              <div key={f.title} className="glass feature-card" style={{ borderColor: `${f.color}20` }}>
                <div className="feature-icon" style={{ background: `${f.color}18`, border: `1px solid ${f.color}30` }}>
                  {f.icon}
                </div>
                <div className="feature-title">{f.title}</div>
                <div className="feature-desc">{f.desc}</div>
              </div>
            ))}
          </div>
        </section>

        <div className="footer">LETSPREP · BUILT FOR PLACEMENT WARRIORS · FREE FOREVER</div>
      </div>
    </>
  )
}