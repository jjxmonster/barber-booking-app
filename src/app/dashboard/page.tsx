import BusinessDashboard from "./components/business-dashboard/business-dashboard";
import React from "react";
import { Role } from "@prisma/client";
import { Toaster } from "components/ui/toaster";
import { getServerSession } from "next-auth";
import { authOptions } from "app/api/auth/[...nextauth]/route";
import { notFound } from "next/navigation";
import ClientDashboard from "./components/client-dashboard/client-dashboard";

const Dashboard = async () => {
  const session = await getServerSession(authOptions);

  const renderDashboard = () => {
    switch (session?.user.role) {
      case Role.CLIENT:
        return <ClientDashboard />;
      case Role.SALON_OWNER:
        return <BusinessDashboard />;

      default:
        return notFound();
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
