'use client';

import React, { useMemo } from 'react';

type Variant = 'male' | 'female';
type Tone = 'warm' | 'matter-of-fact' | 'assertive' | 'calm';

export default function AvatarHuman({
  variant = 'male',
  talking = false,
  thinking = false,
  tone = 'warm',
  size = 280,
  tint = '#71a5ff',
}: {
  variant?: Variant;
  talking?: boolean;
  thinking?: boolean;
  tone?: Tone;
  size?: number;
  tint?: string;
}) {
  const isFemale = variant === 'female';

  // tone nudges (eyebrow angle & smile baseline)
  const toneParams = useMemo(() => {
    switch (tone) {
      case 'assertive':       return { browTilt: 3,  smile: 0.015 };
      case 'calm':            return { browTilt: 0,  smile: 0.035 };
      case 'matter-of-fact':  return { browTilt: 1.5,smile: 0.03  };
      default /* warm */:     return { browTilt: -1.2, smile: 0.05 };
    }
  }, [tone]);

  // canvas (portrait to fit neck/shoulders)
  const W = 220, H = 260;

  return (
    <div
      aria-label={`AI ${isFemale ? 'female' : 'male'} avatar`}
      style={{
        width: size,
        height: size * (H / W),
        borderRadius: 18,
        position: 'relative',
        display: 'grid',
        placeItems: 'center',
        background: 'radial-gradient(120% 120% at 50% 20%, #141a2a, #0b1120)',
        boxShadow: '0 14px 30px rgba(0,0,0,.45), inset 0 0 0 1px rgba(255,255,255,.05)',
      }}
    >
      {/* thinking ring */}
      {thinking && (
        <div
          style={{
            position: 'absolute',
            inset: -8,
            borderRadius: 22,
            border: `2px solid ${tint}`,
            opacity: .28,
            animation: 'dsimPulse 1.4s ease-in-out infinite',
            filter: 'blur(.2px)',
          }}
        />
      )}

      <svg
        width={W}
        height={H}
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        style={{
          display: 'block',
          // tiny nudge to visually center on the platform
          transform: 'translateY(-2px)',
        }}
      >
        <defs>
          {/* soft skin gradient */}
          <radialGradient id="skin" cx="50%" cy="35%" r="72%">
            <stop offset="0%"  stopColor={isFemale ? '#ffe5d4' : '#f5d3bd'} />
            <stop offset="68%" stopColor={isFemale ? '#f2c7b0' : '#e1b79a'} />
            <stop offset="100%" stopColor={isFemale ? '#e2b094' : '#d29f80'} />
          </radialGradient>

          {/* hair gradients */}
          {isFemale ? (
            <linearGradient id="hair" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f9e69c" />
              <stop offset="55%" stopColor="#e2c064" />
              <stop offset="100%" stopColor="#b8943a" />
            </linearGradient>
          ) : (
            <linearGradient id="hair" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3e3326" />
              <stop offset="60%" stopColor="#2a2118" />
              <stop offset="100%" stopColor="#19130d" />
            </linearGradient>
          )}

          {/* shirt / shoulders with tint and breathing highlight */}
          <linearGradient id="shirt" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={tint} stopOpacity=".92" />
            <stop offset="100%" stopColor="#0b1323" />
          </linearGradient>

          {/* eye highlight shimmer */}
          <linearGradient id="shimmer" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stopColor="#fff" stopOpacity="0" />
            <stop offset="50%"  stopColor="#fff" stopOpacity=".5" />
            <stop offset="100%" stopColor="#fff" stopOpacity="0" />
          </linearGradient>

          {/* face clip keeps eyes/lids inside */}
          <clipPath id="face-clip">
            <ellipse cx="110" cy="108" rx="62" ry="68" />
          </clipPath>
        </defs>

        {/* ground shadow — centered */}
        <ellipse cx="110" cy={H - 18} rx="54" ry="10" fill="#000" opacity=".20" />

        {/* shoulders / chest (with subtle breathing) — centered under head */}
        <g transform={`translate(0, ${H - 92})`}>
          <path
            d="M30,45 C48,12 78,0 110,0 C142,0 172,12 190,45 L190,85 L30,85 Z"
            fill="url(#shirt)"
          />
          <ellipse cx="110" cy="22" rx="50" ry="13" fill="#fff" opacity=".06">
            <animate attributeName="ry" dur="3.8s" values="13;15;13" repeatCount="indefinite" />
            <animate attributeName="cy" dur="3.8s" values="22;21;22" repeatCount="indefinite" />
          </ellipse>
        </g>

        {/* BACK HAIR (female: longer; male: medium-long) behind neck & shoulders */}
        {isFemale ? (
          <path
            d="
              M36,92
              C30,58 64,26 110,26
              C156,26 190,58 184,92
              C178,148 150,206 110,210
              C70,206 42,148 36,92
              Z
            "
            fill="url(#hair)"
            opacity=".98"
          />
        ) : (
          <path
            d="
              M48,96
              C44,62 72,34 110,34
              C148,34 176,60 172,96
              C166,136 142,170 110,174
              C78,170 54,136 48,96
              Z
            "
            fill="url(#hair)"
            opacity=".98"
          />
        )}

        {/* neck — centered */}
        <rect x={110 - 18} y={118} width="36" height="24" fill="url(#skin)" rx="6" />

        {/* head (face) — centered */}
        <ellipse cx="110" cy="108" rx="62" ry="68" fill="url(#skin)" />

        {/* HAIR CAP (front/top) */}
        {isFemale ? (
          // longer crown flowing forward for female
          <path
            d="
              M50,96
              C52,54 82,28 110,28
              C138,28 168,50 170,90
              C150,72 130,66 110,66
              C88,66 68,72 50,96 Z
            "
            fill="url(#hair)"
          />
        ) : (
          // medium-long, slightly fuller crown for male
          <path
            d="
              M56,94
              C58,56 82,36 110,36
              C138,36 162,56 160,94
              C140,74 126,68 110,68
              C92,68 74,74 56,94 Z
            "
            fill="url(#hair)"
          />
        )}

        {/* brows (tone-aware tilt) */}
        <g stroke={isFemale ? '#3a2e1f' : '#2c251b'} strokeWidth="3" strokeLinecap="round" opacity=".92">
          <path d={`M72,95 Q90,${92 - toneParams.browTilt} 98,96`} />
          <path d={`M122,96 Q130,${92 + toneParams.browTilt} 148,96`} />
        </g>

        {/* EYES (blink + drift) */}
        <g clipPath="url(#face-clip)">
          {/* sclera */}
          <ellipse cx="88"  cy="112" rx="13" ry="8" fill="#fff" />
          <ellipse cx="132" cy="112" rx="13" ry="8" fill="#fff" />
          {/* pupils */}
          <circle id="pL" cx="88"  cy="112" r="4" fill="#1f2a33" />
          <circle id="pR" cx="132" cy="112" r="4" fill="#1f2a33" />
          {/* micro eye drift */}
          <animate xlinkHref="#pL" attributeName="cx" dur="4s" values="87;91;87" repeatCount="indefinite" />
          <animate xlinkHref="#pR" attributeName="cx" dur="4s" values="131;135;131" repeatCount="indefinite" />
          {/* blink lids */}
          <g fill={isFemale ? '#f2c7b0' : '#e1b79a'}>
            <rect x="74"  y="104" width="28" height="0" rx="6">
              <animate attributeName="height" values="0;16;0" dur=".16s" begin="2s;blinkL.end+2.2s" id="blinkL" />
            </rect>
            <rect x="118" y="104" width="28" height="0" rx="6">
              <animate attributeName="height" values="0;16;0" dur=".16s" begin="2.1s;blinkR.end+2.3s" id="blinkR" />
            </rect>
          </g>
          {/* eyelash hint for female */}
          {isFemale && (
            <g stroke="#3b2f20" strokeWidth="1.4" strokeLinecap="round" opacity=".75">
              <path d="M77,106 l-5,-3" />
              <path d="M81,104 l-5,-3" />
              <path d="M143,106 l5,-3" />
              <path d="M139,104 l5,-3" />
            </g>
          )}
        </g>

        {/* NOSE */}
        <path d="M108,118 Q110,130 104,136" stroke={isFemale ? '#c09279' : '#b5866e'} strokeWidth="2" fill="none" opacity=".9" />

        {/* LIPS / MOUTH — lipstick for female; subtle talk morph */}
        <path
          id="mouth"
          d={`M84,142 C102,${142 - toneParams.smile*36} 118,${142 - toneParams.smile*36} 136,142`}
          stroke={isFemale ? '#b34963' : '#6b3b2b'}
          strokeWidth={isFemale ? 3.2 : 3.0}
          fill="none"
          strokeLinecap="round"
        />
        {talking && (
          <animate
            xlinkHref="#mouth"
            attributeName="d"
            dur=".28s"
            repeatCount="indefinite"
            values={`
              M84,142 C102,${142 - (toneParams.smile*.6 + .9)} 118,${142 - (toneParams.smile*.6 + .9)} 136,142;
              M84,142 C102,${142 - (toneParams.smile*.6 - .9)} 118,${142 - (toneParams.smile*.6 - .9)} 136,142;
              M84,142 C102,${142 - (toneParams.smile*.6)} 118,${142 - (toneParams.smile*.6)} 136,142
            `}
          />
        )}

        {/* cheeks / jaw soft shading */}
        <ellipse cx="90"  cy="134" rx="11" ry="7" fill={isFemale ? '#cf8b78' : '#b77d67'} opacity=".18" />
        <ellipse cx="130" cy="134" rx="11" ry="7" fill={isFemale ? '#cf8b78' : '#b77d67'} opacity=".18" />
      </svg>

      <style>{`
        @keyframes dsimPulse {
          0%   { transform: scale(.985); opacity:.18; }
          50%  { transform: scale(1.02); opacity:.36; }
          100% { transform: scale(.985); opacity:.18; }
        }
      `}</style>
    </div>
  );
}
