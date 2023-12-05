import { Card, CardContent, CardHeader, CardTitle } from "components/ui/card";

import React from "react";
import Recommended from "./recommended-barber-shops";
import SearchCard from "./search-card";
import IncomingAppointment from "./incoming-appointment";
import BarberShopsList from "./barber-shops-list";

interface ClientDashboardProps {
  city?: string;
}

const ClientDashboard = ({ city }: ClientDashboardProps) => {
  return (
    <>
      <section className="gap-10 w-full">
        <Card>
          <CardHeader>
            <CardTitle>Your incoming appointment</CardTitle>
          </CardHeader>
          <CardContent>
            <IncomingAppointment />
          </CardContent>
        </Card>
      </section>
      <section className="mt-10">
        <Card>
          <CardHeader>
            <CardTitle>Recommended for you</CardTitle>
          </CardHeader>
          <CardContent>
            <Recommended />
          </CardContent>
        </Card>
      </section>
      <section className="mt-10">
        <Card>
          <CardHeader>
            <CardTitle>Explore</CardTitle>
          </CardHeader>
          <CardContent>
            <SearchCard />
            {city && <BarberShopsList city={city} />}
          </CardContent>
        </Card>
      </section>
    </>
  );
};

export default ClientDashboard;
