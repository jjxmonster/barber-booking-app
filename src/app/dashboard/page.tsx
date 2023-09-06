"use client";

import BusinessDashboard from "./components/business-dashboard/business-dashboard";
import ClientDashboard from "./components/client-dashboard/client-dashboard";
import React from "react";
import { Role } from "@prisma/client";
import { Toaster } from "components/ui/toaster";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";

const Dashboard = () => {
  const { status, data } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/");
    },
  });

  if (status === "loading") {
    return null;
  }

  const renderDashboard = () => {
    switch (data.user.role) {
      case Role.CLIENT:
        return <ClientDashboard />;
      case Role.SALON_OWNER:
        return <BusinessDashboard />;

      default:
        return null;
    }
  };

  return (
    <main className="mt-20 w-full">
      <Toaster />
      {renderDashboard()}
    </main>
  );
};

export default Dashboard;
