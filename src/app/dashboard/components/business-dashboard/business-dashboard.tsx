import { Card, CardContent, CardHeader, CardTitle } from "components/ui/card";

import AddEmployeeDialog from "./add-employee-dialog";
import AddServiceDialog from "./add-service-dialog";
import Employees from "./employees-list";
import React from "react";
import Services from "./services-list";
import { useSession } from "next-auth/react";
import Appointments from "./appointments";

const BusinessDashboard = () => {
  const { data } = useSession();
  return (
    <>
      <div className="gap-10 w-full">
        <Card>
          <CardHeader>
            <CardTitle>Employees</CardTitle>
          </CardHeader>
          <CardContent>
            <Employees barberShopId={Number(data?.user?.barber_shop_id)} />
            <AddEmployeeDialog
              barberShopId={Number(data?.user?.barber_shop_id)}
            />
          </CardContent>
        </Card>
      </div>
      <div className="mt-10">
        <Card>
          <CardHeader>
            <CardTitle>Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            <Appointments barberShopId={Number(data?.user?.barber_shop_id)} />
          </CardContent>
        </Card>
      </div>
      <div className="mt-10">
        <Card>
          <CardHeader>
            <CardTitle>SERVICES</CardTitle>
          </CardHeader>
          <CardContent>
            <Services
              barberShopId={Number(data?.user?.barber_shop_id)}
              isForClient={false}
            />

            <AddServiceDialog
              barberShopId={Number(data?.user?.barber_shop_id)}
            />
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default BusinessDashboard;
