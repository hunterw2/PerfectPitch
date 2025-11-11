// app/layout.tsx
import './globals.css';
import type { Metadata, Viewport } from 'next';
// If you already installed @vercel/analytics, uncomment the next line:
// import { Analytics } from '@vercel/analytics/react';

export const metadata: Metadata = {
  title: 'PerfectPitch',
  description: 'Sales roleplay simulator',
  themeColor: '#0b1220',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* prevents input zoom + odd phone parsing */}
        <meta name="format-detection" content="telephone=no" />
      </head>
      <body>
        {children}
        {/* If using Vercel Analytics, uncomment: */}
        {/* <Analytics /> */}
      </body>
    </html>
  );
}

