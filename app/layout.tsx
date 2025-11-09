// app/layout.tsx
import './globals.css';
import { Analytics } from '@vercel/analytics/react';   // ⬅️ add this

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

