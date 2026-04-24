'use client'
import { createClient } from '@/lib/supabase'
import { useEffect, useState } from 'react'

export default function LoginPage() {
  const [loading, setLoading] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setTimeout(() => setMounted(true), 50) }, [])

  const signInWithGoogle = async () => {
    setLoading(true)
    const supabase = createClient()
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/auth/callback` }
    })
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500&display=swap');

        .login-root {
          min-height: 100vh; background: #020408;
          display: flex; align-items: center; justify-content: center;
          font-family: 'DM Sans', sans-serif;
          position: relative; overflow: hidden;
          padding: 24px;
        }

        .orb { position: fixed; border-radius: 50%; filter: blur(80px); opacity: 0.4; pointer-events: none; animation: drift linear infinite; }
        .orb-1 { width:500px; height:500px; background:#6366f1; top:-150px; left:-150px; animation-duration:20s; }
        .orb-2 { width:400px; height:400px; background:#a855f7; bottom:-100px; right:-100px; animation-duration:25s; animation-direction:reverse; }
        .orb-3 { width:300px; height:300px; background:#06b6d4; top:50%; left:55%; animation-duration:18s; animation-delay:-6s; }

        @keyframes drift {
          0%   { transform: translate(0,0) scale(1); }
          33%  { transform: translate(40px,-30px) scale(1.05); }
          66%  { transform: translate(-20px,40px) scale(0.97); }
          100% { transform: translate(0,0) scale(1); }
        }

        .grid-bg {
          position: fixed; inset: 0; pointer-events: none;
          background-image:
            linear-gradient(rgba(99,102,241,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99,102,241,0.05) 1px, transparent 1px);
          background-size: 50px 50px;
        }

        .card {
          position: relative; z-index: 10;
          width: 100%; max-width: 420px;
          background: rgba(255,255,255,0.05);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 24px;
          padding: 48px 40px;
          text-align: center;
          opacity: 0; transform: translateY(24px) scale(0.98);
          transition: opacity 0.7s ease, transform 0.7s ease;
          box-shadow: 0 32px 80px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1);
        }
        .card.visible { opacity:1; transform:translateY(0) scale(1); }

        .brand {
          font-family: 'Syne', sans-serif;
          font-size: 13px; letter-spacing: 5px;
          text-transform: uppercase;
          background: linear-gradient(135deg, #6366f1, #a855f7);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 28px;
          display: flex; align-items: center; justify-content: center; gap: 10px;
        }
        .brand-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #6366f1; box-shadow: 0 0 10px #6366f1;
          animation: pulse 2s ease infinite;
          flex-shrink: 0;
          -webkit-text-fill-color: initial;
        }
        @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.4;transform:scale(0.7)} }

        .title {
          font-family: 'Syne', sans-serif;
          font-size: 36px; font-weight: 800;
          color: #f1f5f9; line-height: 1.1;
          margin-bottom: 10px;
        }
        .title span {
          background: linear-gradient(135deg, #6366f1, #a855f7, #06b6d4);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .subtitle {
          font-size: 14px; color: #475569; line-height: 1.7;
          margin-bottom: 36px; font-weight: 300;
        }

        .google-btn {
          width: 100%; padding: 15px 24px;
          border-radius: 14px;
          border: 1px solid rgba(99,102,241,0.4);
          background: rgba(99,102,241,0.1);
          color: #c7d2fe;
          font-family: 'DM Sans', sans-serif;
          font-size: 15px; font-weight: 500;
          cursor: pointer;
          display: flex; align-items: center; justify-content: center; gap: 12px;
          transition: all 0.25s ease;
          position: relative; overflow: hidden;
        }
        .google-btn::after {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(99,102,241,0.2), rgba(168,85,247,0.2));
          opacity: 0; transition: opacity 0.25s;
        }
        .google-btn:hover {
          border-color: rgba(99,102,241,0.7);
          transform: translateY(-2px);
          box-shadow: 0 8px 32px rgba(99,102,241,0.3);
          color: #fff;
        }
        .google-btn:hover::after { opacity: 1; }
        .google-btn:disabled { opacity:0.5; cursor:not-allowed; transform:none; }

        .features {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 10px; margin-top: 28px;
        }
        .feat {
          padding: 12px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 10px;
          font-size: 11px; color: #475569; text-align: left;
        }
        .feat-icon { font-size: 16px; margin-bottom: 4px; display: block; }
        .feat-name { color: #94a3b8; font-weight: 500; font-size: 12px; }

        .footer-text { font-size: 11px; color: #1e293b; margin-top: 28px; letter-spacing: 1px; }

        .spinner { width:16px; height:16px; border:2px solid rgba(255,255,255,0.2); border-top-color:#fff; border-radius:50%; animation:spin 0.7s linear infinite; }
        @keyframes spin { to { transform:rotate(360deg); } }
      `}</style>

      <div className="login-root">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
        <div className="grid-bg" />

        <div className={`card ${mounted ? 'visible' : ''}`}>
          <div className="brand">
            <span className="brand-dot" />
            LetsPrep
          </div>

          <h1 className="title">
            Welcome <span>Back.</span>
          </h1>

          <p className="subtitle">
            Your DSA progress, job applications &<br />
            CS fundamentals — all in one place.
          </p>

          <button className="google-btn" onClick={signInWithGoogle} disabled={loading}>
            {loading ? <div className="spinner" /> : (
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
            )}
            {loading ? 'Signing in…' : 'Continue with Google'}
          </button>

          <div className="features">
            {[
              { icon: "⚡", name: "465 DSA Problems", desc: "34 patterns" },
              { icon: "🎯", name: "Job Tracker", desc: "All applications" },
              { icon: "🧠", name: "SDE Prep", desc: "CS fundamentals" },
              { icon: "☁️", name: "Cloud Sync", desc: "Any device" },
            ].map(f => (
              <div key={f.name} className="feat">
                <span className="feat-icon">{f.icon}</span>
                <div className="feat-name">{f.name}</div>
                <div>{f.desc}</div>
              </div>
            ))}
          </div>

          <div className="footer-text">FREE FOREVER · NO CREDIT CARD</div>
        </div>
      </div>
    </>
  )
}