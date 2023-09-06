import React, { FunctionComponent } from "react";

import { Badge } from "components/ui/badge";
import { Clock } from "lucide-react";
import LoadingIndicator from "components/shared/loading-indicator";
import QueryErrorComponent from "components/shared/query-error-component";
import { format } from "date-fns";
import useIncomingAppointment from "hooks/use-incoming-appointment";
import { useSession } from "next-auth/react";

interface AppointmentCardProps {
  service_name: string;
  barber_shop_name: string;
  date: Date;
  appointmentTime: string;
}

const AppointmentCard: FunctionComponent<AppointmentCardProps> = ({
  service_name,
  barber_shop_name,
  date,
  appointmentTime,
}) => {
  return (
    <li className="flex rounded-md overflow-hidden">
      <div className="flex flex-col justify-center pl-4 pr-20 bg-primary">
        <p className="text-secondary text-md font-medium">{service_name}</p>
        <p className="text-white text-xs uppercase">{barber_shop_name}</p>
      </div>
      <div className="bg-red flex flex-col justify-center text-md font-bold items-center p-3 bg-secondary text-white">
        <Clock className="w-5 mr-1" /> {format(new Date(date), "MMM dd")} |{" "}
        {appointmentTime}
      </div>
    </li>
  );
};

export default AppointmentCard;
