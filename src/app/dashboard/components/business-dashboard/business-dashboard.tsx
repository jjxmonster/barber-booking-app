import { Card, CardContent, CardHeader, CardTitle } from "components/ui/card";

import AddEmployeeDialog from "./add-employee-dialog";
import Employees from "./employees-list";
import React, { Suspense } from "react";
import Appointments from "./appointments";
import { getServerSession } from "next-auth";
import { authOptions } from "app/api/auth/[...nextauth]/route";
import LoadingIndicator from "components/shared/loading-indicator";
import Services from "./services-list";
import AddServiceDialog from "./add-service-dialog";

const BusinessDashboard = async () => {
  const session = await getServerSession(authOptions);
  return (
    <>
      <section className="mt-10">
        <Card>
          <CardHeader>
            <CardTitle>Employees</CardTitle>
          </CardHeader>
          <CardContent>
            <Employees barberShopId={Number(session?.user.barber_shop_id)} />
            <AddEmployeeDialog
              barberShopId={Number(session?.user.barber_shop_id)}
            />
          </CardContent>
        </Card>
      </section>
      <section className="mt-10">
        <Card>
          <CardHeader>
            <CardTitle>Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            <Suspense fallback={<LoadingIndicator />}>
              <Appointments
                barberShopId={Number(session?.user?.barber_shop_id)}
              />
            </Suspense>
          </CardContent>
        </Card>
      </section>
      <section className="mt-10">
        <Card>
          <CardHeader>
            <CardTitle>SERVICES</CardTitle>
          </CardHeader>
          <CardContent>
            <Services
              barberShopId={Number(session?.user?.barber_shop_id)}
              isForClient={false}
            />
            {/* <AddServiceDialog
              barberShopId={Number(session?.user?.barber_shop_id)}
            /> */}
          </CardContent>
        </Card>
      </section>
    </>
  );
};

export default BusinessDashboard;
