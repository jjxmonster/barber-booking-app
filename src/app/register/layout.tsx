import "app/globals.css";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register | Barber Booking App",
};

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section className="mt-32">{children}</section>;
}
