'use client'
import Link from "next/link"
import { usePathname } from "next/navigation"

const NAV_LINKS = [
  { href: "/",     label: "DSA Tracker",     emoji: "⚡", accent: "#6366f1" },
  { href: "/prep", label: "SDE Prep",         emoji: "🧠", accent: "#a855f7" },
  { href: "/jobs", label: "Job Tracker",      emoji: "🎯", accent: "#06b6d4" },
]

export default function NavBar() {
  const pathname = usePathname()

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Outfit:wght@400;500;600&display=swap');

        .nav-root {
          position: sticky;
          top: 0;
          z-index: 100;
          background: rgba(10, 10, 20, 0.75);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255,255,255,0.06);
          padding: 0 28px;
          height: 56px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .nav-brand {
          font-family: 'Space Mono', monospace;
          font-weight: 700;
          font-size: 14px;
          letter-spacing: 3px;
          background: linear-gradient(135deg, #6366f1, #a855f7);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-right: auto;
          text-decoration: none;
          user-select: none;
        }

        .nav-link {
          font-family: 'Outfit', sans-serif;
          font-size: 13px;
          font-weight: 500;
          color: #64748b;
          text-decoration: none;
          padding: 6px 14px;
          border-radius: 8px;
          border: 1px solid transparent;
          display: flex;
          align-items: center;
          gap: 7px;
          transition: color 0.2s, background 0.2s, border-color 0.2s;
          white-space: nowrap;
        }

        .nav-link:hover {
          color: #e2e8f0;
          background: rgba(255,255,255,0.05);
          border-color: rgba(255,255,255,0.08);
        }

        .nav-link.active {
          color: #e2e8f0;
          background: rgba(255,255,255,0.07);
          border-color: rgba(255,255,255,0.1);
        }

        .nav-link .emoji {
          font-size: 14px;
          line-height: 1;
        }

        .nav-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          margin-left: 2px;
          opacity: 0;
          transition: opacity 0.2s;
        }

        .nav-link.active .nav-dot {
          opacity: 1;
        }
      `}</style>

      <nav className="nav-root">
        <Link href="/" className="nav-brand">LETSPREP</Link>

        {NAV_LINKS.map(({ href, label, emoji, accent }) => {
          const isActive = pathname === href
          return (
            <Link
              key={href}
              href={href}
              className={`nav-link${isActive ? " active" : ""}`}
              style={isActive ? {
                color: accent,
                background: `${accent}18`,
                borderColor: `${accent}35`,
              } : {}}
            >
              <span className="emoji">{emoji}</span>
              {label}
              <span className="nav-dot" style={{ background: accent }} />
            </Link>
          )
        })}
      </nav>
    </>
  )
}