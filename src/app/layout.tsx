import "app/globals.css";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Barber Booking App | Home",
};

export default function RootLayout({
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
