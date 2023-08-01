import { Card, CardContent, CardHeader, CardTitle } from "components/ui/card";

import AppointmentCard from "../client-dashboard/appointment-card";
import React from "react";
import Recommended from "../client-dashboard/recommended-barber-shops";
import SearchCard from "../client-dashboard/search-card";

const BusinessDashboard = () => {
  return (
    <>
      <div className="flex gap-10 w-full">
        <Card>
          <CardHeader>
            <CardTitle>Your employees</CardTitle>
          </CardHeader>
          <CardContent></CardContent>
        </Card>
      </div>
    </>
  );
};

export default BusinessDashboard;
