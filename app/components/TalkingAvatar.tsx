'use client';
import React, { useEffect, useRef } from 'react';

type Props = {
  gender: 'male' | 'female';
  tone: string;
  speaking: boolean;
  viseme: number;     // 0..1 mouth openness
  size?: number;      // px
  realism?: 'default' | 'v2-female';
};

export default function TalkingAvatar({
  gender,
  tone,
  speaking,
  viseme,
  size = 220,
  realism = 'default',
}: Props) {
  const blinkRef = useRef(0);

  // light blink loop
  useEffect(() => {
    let raf = 0;
    let t0 = performance.now();
    const loop = (t: number) => {
      const dt = t - t0;
      if (dt > 2800 + Math.random() * 2200) {
        blinkRef.current = 1; // blink
        setTimeout(() => (blinkRef.current = 0), 120);
        t0 = t;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  const w = size;
  const h = Math.round(size * 1.05);

  const eyebrow = (() => {
    const t = tone.toLowerCase();
    if (t.includes('angry') || t.includes('assertive')) return -8;
    if (t.includes('calm')) return 0;
    if (t.includes('friendly') || t.includes('warm') || t.includes('cheer')) return 6;
    return 2;
  })();

  if (gender === 'female' && realism === 'v2-female') {
    // Slightly more natural female face (still SVG, but softer)
    const eyeClose = blinkRef.current ? 0.1 : 1;
    const mouthOpen = Math.min(1, Math.max(0, viseme));
    const lipH = 8 + 10 * mouthOpen;
    const lipW = 46 + 8 * mouthOpen;

    return (
      <svg width={w} height={h} viewBox="0 0 220 230" aria-label="Avatar female">
        <defs>
          <radialGradient id="skinf" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#ffe2cf" />
            <stop offset="100%" stopColor="#f2bea3" />
          </radialGradient>
          <linearGradient id="dressf" x1="0" x2="1">
            <stop offset="0%" stopColor="#ff9fd1" />
            <stop offset="100%" stopColor="#ff6fb8" />
          </linearGradient>
          <filter id="shadf" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="8" stdDeviation="8" floodColor="rgba(0,0,0,.35)" />
          </filter>
        </defs>

        <g filter="url(#shadf)">
          {/* neck & shoulders */}
          <rect x="95" y="145" width="30" height="22" rx="8" fill="url(#skinf)" />
          <path d="M45,195 q65,-34 130,0 v18 h-130 z" fill="url(#dressf)" />

          {/* head */}
          <circle cx="110" cy="112" r="58" fill="url(#skinf)" />

          {/* hair (long, slightly more realistic) */}
          <path
            d="M42,122 q-2,-55 68,-66 q70,11 70,64 v30 q-12,30 -70,33 q-58,-3 -68,-31 z"
            fill="#d7a253"
          />
          <path
            d="M46,100 q20,-30 64,-33 q44,3 64,33 q-22,-18 -64,-19 q-42,1 -64,19 z"
            fill="#e6b264"
          />

          {/* brows */}
          <path
            d={`M78,98 q16,${eyebrow} 30,0`}
            stroke="#6f4d20" strokeWidth="5" strokeLinecap="round" fill="none"
          />
          <path
            d={`M118,98 q18,${eyebrow} 30,0`}
            stroke="#6f4d20" strokeWidth="5" strokeLinecap="round" fill="none"
          />

          {/* eyes */}
          <ellipse cx="95" cy="112" rx="11" ry={7 * eyeClose} fill="#fff" />
          <ellipse cx="132" cy="112" rx="11" ry={7 * eyeClose} fill="#fff" />
          <circle cx="95" cy="112" r={3 * eyeClose} fill="#222" />
          <circle cx="132" cy="112" r={3 * eyeClose} fill="#222" />

          {/* nose */}
          <path d="M112,118 q-2,10 2,12" stroke="#e1a78c" strokeWidth="2" fill="none" />

          {/* lips */}
          <ellipse cx="114" cy="138" rx={lipW / 2} ry={lipH / 2} fill="#e6477f" />
          <path
            d={`M90,138 q24,${8 + 6 * mouthOpen} 48,0`}
            stroke="#b8245e" strokeWidth="3.5" fill="none" strokeLinecap="round" />

          {/* subtle cheek tint */}
          <circle cx="78" cy="132" r="10" fill="rgba(255,150,170,.18)" />
          <circle cx="150" cy="132" r="10" fill="rgba(255,150,170,.18)" />
        </g>
      </svg>
    );
  }

  // default (your previous simple style, used for male or fallback)
  const mouth = 10 + 30 * Math.max(0, Math.min(1, viseme));
  const eyeClosed = blinkRef.current ? 0.15 : 1;

  return (
    <svg width={w} height={h} viewBox="0 0 220 230" aria-label="Avatar">
      <defs>
        <radialGradient id="skin" cx="50%" cy="42%" r="60%">
          <stop offset="0%" stopColor="#ffd7b8" />
          <stop offset="100%" stopColor="#eab799" />
        </radialGradient>
        <linearGradient id="shirt" x1="0" x2="1">
          <stop offset="0%" stopColor="#7aa8ff" />
          <stop offset="100%" stopColor="#3d6cf0" />
        </linearGradient>
      </defs>

      {/* shoulders */}
      <path d="M50,195 q60,-32 120,0 v18 h-120 z" fill="url(#shirt)" />

      {/* head */}
      <circle cx="110" cy="112" r="58" fill="url(#skin)" />

      {/* hair (short) */}
      <path d="M55,108 Q65,55 110,48 Q155,55 165,108 Q150,86 110,82 Q70,86 55,108 Z" fill="#3b3026" />

      {/* brows */}
      <path d="M80,95 q12,-8 24,-2" stroke="#2a221d" strokeWidth="5" fill="none" strokeLinecap="round" />
      <path d="M118,94 q15,-6 24,0" stroke="#2a221d" strokeWidth="5" fill="none" strokeLinecap="round" />

      {/* eyes */}
      <ellipse cx="92" cy="112" rx="10" ry={7 * eyeClosed} fill="#fff" />
      <ellipse cx="128" cy="112" rx="10" ry={7 * eyeClosed} fill="#fff" />
      <circle cx="92" cy="112" r={3 * eyeClosed} fill="#222" />
      <circle cx="128" cy="112" r={3 * eyeClosed} fill="#222" />

      {/* mouth reacts to viseme */}
      <path d={`M92,138 q18,${mouth} 36,0`} stroke="#b06464" strokeWidth="6" fill="none" strokeLinecap="round" />
    </svg>
  );
}

