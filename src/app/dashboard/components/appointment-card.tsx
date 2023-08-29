import React, { FunctionComponentFactory } from "react";

import { Badge } from "components/ui/badge";
import { Clock } from "lucide-react";
import LoadingIndicator from "components/shared/loading-indicator";
import QueryErrorComponent from "components/shared/query-error-component";
import useIncomingAppointment from "hooks/use-incoming-appointment";
import { useSession } from "next-auth/react";

interface AppointmentCardProps {}

const AppointmentCard: FunctionComponentFactory<AppointmentCardProps> = () => {
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
  const { appointmentTime, date } = appointment;
  return (
    <div className="flex rounded-md overflow-hidden">
      <div className="p-3 pr-20 bg-primary">
        <Badge variant="secondary">FINISHED</Badge>
        <div className="mt-3">
          <p className="text-secondary text-md font-medium">
            Combo Hair + Beard
          </p>
          <p className="text-white text-xs uppercase">JJ Barber Shop</p>
        </div>
      </div>
      <div className="bg-red flex flex-col justify-center text-md font-bold items-center p-3 bg-secondary text-white">
        <Clock className="w-5 mr-1" /> Jun 21 | {appointmentTime}
      </div>
    </div>
  );
};

export default AppointmentCard;
