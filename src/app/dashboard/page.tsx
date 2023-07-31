"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "components/ui/card";

import AppointmentCard from "./components/appointment-card";
import { Badge } from "components/ui/badge";
import { Clock } from "lucide-react";
import React from "react";
import Recommended from "./components/recommended-barber-shops";
import SearchCard from "./components/search-card";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";

const Dashboard = () => {
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/");
    },
  });

  if (status === "loading") {
    return null;
  }

  return (
    <div className="mt-20 w-full">
      <div className="flex gap-10 w-full">
        <Card>
          <CardHeader>
            <CardTitle>Your appointments</CardTitle>
          </CardHeader>
          <CardContent>
            <AppointmentCard />
          </CardContent>
        </Card>
      </div>
      <div className="mt-10">
        <Card>
          <CardHeader>
            <CardTitle>Recommended for you</CardTitle>
          </CardHeader>
          <CardContent>
            <Recommended />
          </CardContent>
        </Card>
      </div>
      <div className="mt-10">
        <Card>
          <CardHeader>
            <CardTitle>Explore</CardTitle>
          </CardHeader>
          <CardContent>
            <SearchCard />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
