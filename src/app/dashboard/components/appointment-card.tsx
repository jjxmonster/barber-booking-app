import React, { FunctionComponentFactory } from "react";

import { Badge } from "components/ui/badge";
import { Clock } from "lucide-react";

interface AppointmentCardProps {}

const AppointmentCard: FunctionComponentFactory<AppointmentCardProps> = () => {
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
        <Clock className="w-5 mr-1" /> Jun 21 | 8:00
      </div>
    </div>
  );
};

export default AppointmentCard;
