// app/layout.tsx
import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'PerfectPitch',
  description: 'AI sales roleplay simulator',
  icons: { icon: '/logo.png' },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* global styles (safe area, dark background, etc.) come from globals.css and app/head.tsx */}
      <body>{children}</body>
    </html>
  );
}

