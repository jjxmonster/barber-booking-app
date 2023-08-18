import "app/globals.css";

import type { Metadata } from "next";
import NavBar from "components/shared/nav-bar";

export const metadata: Metadata = {
  title: "Name | Barber Booking App",
};

export default function BarberShopPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavBar />
      {children}
    </>
  );
}
