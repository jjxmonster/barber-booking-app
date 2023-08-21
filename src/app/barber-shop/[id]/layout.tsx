import "app/globals.css";

import NavBar from "components/shared/nav-bar";

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
