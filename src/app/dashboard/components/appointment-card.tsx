import React, { FunctionComponentFactory } from "react";

import { Badge } from "components/ui/badge";
import { Clock } from "lucide-react";
import LoadingIndicator from "components/shared/loading-indicator";
import QueryErrorComponent from "components/shared/query-error-component";
import { format } from "date-fns";
import useIncomingAppointment from "hooks/use-incoming-appointment";
import { useSession } from "next-auth/react";

interface AppointmentCardProps {}

const AppointmentCard: FunctionComponentFactory<AppointmentCardProps> = () => {
  const { data: session_data } = useSession();
  const { data, isLoading, isError, error } = useIncomingAppointment(
    session_data?.user.email ?? ""
  );
  if (isLoading) {
    return <LoadingIndicator />;
  }

  if (isError) {
    return <QueryErrorComponent />;
  }
  const { appointment } = data;
  const { appointmentTime, date, barberShop, service } = appointment;

  return (
    <div className="flex rounded-md overflow-hidden">
      <div className="flex flex-col justify-center pl-4 pr-20 bg-primary">
        <p className="text-secondary text-md font-medium">{service.name}</p>
        <p className="text-white text-xs uppercase">{barberShop.name}</p>
      </div>
      <div className="bg-red flex flex-col justify-center text-md font-bold items-center p-3 bg-secondary text-white">
        <Clock className="w-5 mr-1" /> {format(new Date(date), "MMM dd")} |{" "}
        {appointmentTime}
      </div>
    </div>
  );
};

export default AppointmentCard;
