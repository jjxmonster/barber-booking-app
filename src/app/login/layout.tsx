import "app/globals.css";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login | Home",
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
