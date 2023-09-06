import { Appointment } from "@prisma/client";
import LoadingIndicator from "components/shared/loading-indicator";
import QueryErrorComponent from "components/shared/query-error-component";
import useAppointments from "hooks/use-appointments";
import React, { FunctionComponent } from "react";
import AppointmentCard from "../appointment-card";

interface AppointmentsProps {
  barberShopId: number;
}

const Appointments: FunctionComponent<AppointmentsProps> = ({
  barberShopId,
}) => {
  const { data, isLoading, isError } = useAppointments(barberShopId);
  if (isLoading) {
    return <LoadingIndicator />;
  }

  if (isError) {
    return <QueryErrorComponent />;
  }

  const { appointments } = data;

  return (
    <ul>
      {appointments.map((appointment: any) => {
        const { id, appointmentTime, date, barberShop, service } = appointment;

        return (
          <AppointmentCard
            key={id}
            service_name={service.name}
            barber_shop_name={barberShop.name}
            appointmentTime={appointmentTime}
            date={date}
          />
        );
      })}
    </ul>
  );
};

export default Appointments;
