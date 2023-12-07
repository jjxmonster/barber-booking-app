import "app/globals.css";

import AuthPageLayout from "components/shared/auth-page-layout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register | Barber Booking App",
};

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthPageLayout>{children}</AuthPageLayout>;
}
