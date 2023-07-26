import "app/globals.css";

import AuthPageLayout from "components/shared/auth-page-layout";
import Header from "components/shared/header";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register | Barber Booking App",
};

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <AuthPageLayout>{children}</AuthPageLayout>
    </section>
  );
}
