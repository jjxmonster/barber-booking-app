import LoadingIndicator from "components/shared/loading-indicator";
import QueryErrorComponent from "components/shared/query-error-component";
import useIncomingAppointment from "hooks/use-incoming-appointment";
import { useSession } from "next-auth/react";
import React, { FunctionComponent } from "react";
import AppointmentCard from "../appointment-card";

interface IncomingAppointmentProps {}

const IncomingAppointment: FunctionComponent<IncomingAppointmentProps> = () => {
  const { data: session_data } = useSession();
  const { data, isLoading, isError } = useIncomingAppointment(
    session_data?.user.email ?? ""
  );
  if (isLoading) {
    return <LoadingIndicator />;
  }

  if (isError) {
    return <QueryErrorComponent />;
  }

  const { appointment } = data;

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
