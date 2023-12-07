import BusinessDashboard from "./components/business-dashboard/business-dashboard";
import React from "react";
import { Role } from "@prisma/client";
import { Toaster } from "components/ui/toaster";
import { getServerSession } from "next-auth";
import { authOptions } from "app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import ClientDashboard from "./components/client-dashboard/client-dashboard";

const Dashboard = async ({
  searchParams,
}: {
  searchParams: { city?: string };
}) => {
  const session = await getServerSession(authOptions);
  const { city } = searchParams;

  const renderDashboard = () => {
    switch (session?.user.role) {
      case Role.CLIENT:
        return <ClientDashboard city={city} />;
      case Role.SALON_OWNER:
        return <BusinessDashboard />;

      default:
        return redirect("/login");
    }
  };

  return (
    <div className="mt-20 w-full">
      <Toaster />
      {renderDashboard()}
    </div>
  );
};

export default Dashboard;
