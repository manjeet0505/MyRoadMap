'use client'
import { useState } from 'react'
import SDEPrepArsenal from '@/components/SDEPrepArsenal'
import ArraysStringsTheory from "@/components/theory/ArraysStringsTheory"
import LinkedListTheory from "@/components/theory/LinkedListTheory"

const tabs = [
  { id: 'sde',     label: '⚔️ SDE Arsenal',        color: '#a855f7' },
  { id: 'arrays',  label: '📐 Arrays & Strings',    color: '#06b6d4' },
  { id: 'll',      label: '🔗 Linked List',          color: '#10b981' },
]

export default function Prep() {
  const [active, setActive] = useState('sde')

  return (
    <div style={{ minHeight: '100vh', background: '#0d1117' }}>
      {/* Tab Bar */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 50,
        background: 'rgba(13,17,23,0.85)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        display: 'flex', justifyContent: 'center', gap: '6px', padding: '10px 16px',
      }}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActive(tab.id)}
            style={{
              padding: '8px 20px',
              borderRadius: '8px',
              border: active === tab.id ? `1px solid ${tab.color}` : '1px solid rgba(255,255,255,0.08)',
              background: active === tab.id ? `${tab.color}18` : 'transparent',
              color: active === tab.id ? tab.color : '#6b7280',
              fontSize: '13px',
              fontFamily: 'monospace',
              fontWeight: active === tab.id ? 600 : 400,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: active === tab.id ? `0 0 12px ${tab.color}30` : 'none',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{ display: active === 'sde'    ? 'block' : 'none' }}><SDEPrepArsenal /></div>
      <div style={{ display: active === 'arrays' ? 'block' : 'none' }}><ArraysStringsTheory /></div>
      <div style={{ display: active === 'll'     ? 'block' : 'none' }}><LinkedListTheory /></div>
    </div>
  )
}