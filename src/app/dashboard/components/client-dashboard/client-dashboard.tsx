import { Card, CardContent, CardHeader, CardTitle } from "components/ui/card";

import React from "react";
import Recommended from "./recommended-barber-shops";
import SearchCard from "./search-card";
import IncomingAppointment from "./incoming-appointment";

const ClientDashboard = () => {
  return (
    <>
      <div className="gap-10 w-full">
        <Card>
          <CardHeader>
            <CardTitle>Your incoming appointment</CardTitle>
          </CardHeader>
          <CardContent>
            <IncomingAppointment />
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
    </>
  );
};

export default ClientDashboard;
