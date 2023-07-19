import "app/globals.css";

import type { Metadata } from "next";
import NavBar from "components/shared/nav-bar";

export const metadata: Metadata = {
  title: "Home | Barber Booking App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="w-screen relative flex flex-col items-center min-h-screen">
          <div className="max-w-screen-xl w-full flex-1 relative">
            <NavBar />
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
