import { Card, CardContent, CardHeader, CardTitle } from "components/ui/card";

import AppointmentCard from "./appointment-card";
import React from "react";
import Recommended from "./recommended-barber-shops";
import SearchCard from "./search-card";

const ClientDashboard = () => {
  return (
    <>
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
    </>
  );
};

export default ClientDashboard;
