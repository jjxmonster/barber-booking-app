import { Card, CardContent, CardHeader, CardTitle } from "components/ui/card";
import React, { Suspense } from "react";

import AddEmployeeDialog from "./add-employee-dialog";
import AddServiceDialog from "./add-service-dialog";
import Employees from "./employees-list";
import LoadingIndicator from "components/shared/loading-indicator";
import { useSession } from "next-auth/react";

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
            <Suspense fallback={<LoadingIndicator />}>
              <Employees barberShopId={Number(data?.user?.barber_shop_id)} />
            </Suspense>
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
          <CardContent></CardContent>
        </Card>
      </div>
      <div className="mt-10">
        <Card>
          <CardHeader>
            <CardTitle>SERVICES</CardTitle>
          </CardHeader>
          <CardContent>
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
