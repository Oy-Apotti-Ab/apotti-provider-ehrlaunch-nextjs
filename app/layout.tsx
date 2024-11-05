// //app\layout.tsx
"use client";

import { OAuthProvider } from "./context/OAuthContext";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <OAuthProvider>{children}</OAuthProvider>
      </body>
    </html>
  );
}
