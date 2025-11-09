// app/layout.tsx
import './globals.css';
import { Analytics } from '@vercel/analytics/react';   // ⬅️ add this
import type {Metadata } from 'next';

export const metadata; Metadata = {
  title: 'Perfect Pitch'
  description: 'AI Sales Roleplay Simulator',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />   {/* ⬅️ add this right before </body> */}
      </body>
    </html>
  );
}

