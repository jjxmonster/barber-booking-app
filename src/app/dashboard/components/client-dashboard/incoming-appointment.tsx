import LoadingIndicator from "components/shared/loading-indicator";
import QueryErrorComponent from "components/shared/query-error-component";

import { useSession } from "next-auth/react";
import React, { FunctionComponent } from "react";
import AppointmentCard from "../appointment-card";
import { getAppointmentForUser } from "services/appointment/get";
import { getServerSession } from "next-auth";

interface IncomingAppointmentProps {}

const IncomingAppointment: FunctionComponent<
  IncomingAppointmentProps
> = async () => {
  const session_data = await getServerSession();
  const appointment = await getAppointmentForUser(
    session_data?.user.email ?? ""
  );

  if (!appointment) {
    return (
      <div className="w-full h-20 text-gray-400 flex items-center justify-center">
        <span>No incoming appointments</span>
      </div>
    );
  }
  const { appointmentTime, date, barberShop, service } = appointment;
  return (
    <AppointmentCard
      service_name={service.name}
      barber_shop_name={barberShop.name}
      appointmentTime={appointmentTime}
      date={date}
    />
  );
};

export default IncomingAppointment;
