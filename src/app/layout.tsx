import "app/globals.css";

import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Home | Barber Booking App",
};

const poppins = Poppins({
  style: "normal",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={poppins.className}>
      <body>
        <Providers>
          <div className="w-screen relative flex flex-col items-center min-h-screen">
            <div className="max-w-5xl w-full flex-1 relative">{children}</div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
