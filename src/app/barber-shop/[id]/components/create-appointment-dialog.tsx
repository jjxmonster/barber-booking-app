import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "components/ui/dialog";
import React, { FunctionComponent } from "react";

import { Button } from "components/ui/button";
import CreateAppointmentForm from "./create-appointment-form";
import { fetchEmployeesForBarberShop } from "data/employees";
import { useQuery } from "@tanstack/react-query";

interface CreateAppointmentDialogProps {
  barberShopId: number;
  serviceId: number;
}

const CreateAppointmentDialog: FunctionComponent<
  CreateAppointmentDialogProps
> = ({ barberShopId, serviceId }) => {
  const { data, isError } = useQuery(
    ["employees"],
    async () => fetchEmployeesForBarberShop(barberShopId),
    {
      retry: 2,
    }
  );
  const { employees } = data;

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="secondary">Book</Button>
        </DialogTrigger>
        <DialogContent>
          {isError ? (
            <div className="text-gray-500">
              Something went wrong, please try again later
            </div>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle>Book your appointment</DialogTitle>
              </DialogHeader>
              <CreateAppointmentForm
                serviceId={serviceId}
                employees={employees}
                barberShopId={barberShopId}
              />
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CreateAppointmentDialog;