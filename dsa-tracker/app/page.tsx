import DSATracker from '@/components/DSATracker'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <div style={{ textAlign: 'center', padding: '8px', background: '#0d1117' }}>
        <Link href="/prep" style={{ color: '#a855f7', fontSize: 13, fontFamily: 'monospace' }}>
          → SDE Prep Arsenal (CS Fundamentals + Aptitude)
        </Link>
      </div>
      <DSATracker />
    </>
  )
}