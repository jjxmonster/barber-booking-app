import "app/globals.css";

import type { Metadata } from "next";
import NavBar from "components/shared/nav-bar";

export const metadata: Metadata = {
  title: "Dashboard | Barber Booking App",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
