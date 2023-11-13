import React, { FunctionComponent } from "react";
import AppointmentCard from "../appointment-card";
import { getAppointmentsForBarberShop } from "services/appointment/get";
import QueryErrorComponent from "components/shared/query-error-component";

interface AppointmentsProps {
  barberShopId: number;
}

const Appointments: FunctionComponent<AppointmentsProps> = async ({
  barberShopId,
}) => {
  const appointments = await getAppointmentsForBarberShop(barberShopId);

  if (!appointments) {
    return <QueryErrorComponent />;
  }

  return (
    <ul className="flex md:flex-row flex-col gap-5">
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
