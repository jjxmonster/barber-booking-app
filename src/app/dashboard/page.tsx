"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "components/ui/card";

import { Badge } from "components/ui/badge";
import React from "react";
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
        <Card className="">
          <CardHeader>
            <CardTitle>Your appointments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="p-3 border bg-primary rounded-md">
              <Badge variant="secondary">FINISHED</Badge>
              <div className="mt-3">
                <p className="text-secondary text-md font-bold">
                  Combo Hair + Beard
                </p>
                <p className="text-white text-sm">JJ Barber Shop</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
