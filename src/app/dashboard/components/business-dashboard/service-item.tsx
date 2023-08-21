import { Edit, Trash } from "lucide-react";
import React, { FunctionComponent } from "react";

import { Button } from "components/ui/button";
import UpdateServiceDialog from "./update-service-dialog";
import { formatCurrency } from "lib/utils";
import useCreateAppointment from "hooks/use-create-appointment";
import useDeleteService from "hooks/use-delete-service";

interface ServiceItemProps {
  name: string;
  price: number;
  id: number;
  isForClient: boolean;
}

const ServiceItem: FunctionComponent<ServiceItemProps> = ({
  name,
  price,
  id,
  isForClient,
}) => {
  const { mutate: delete_service } = useDeleteService();
  // const {mutate:create_appointment} = useCreateAppointment()

  return (
    <div className="text-white p-5 border-l-4 shadow-lg flex items-center justify-between">
      <div>
        <span>{name}</span> | <span>{formatCurrency.format(price)}</span>
      </div>
      <div className="flex gap-2">
        {isForClient ? (
          <Button>Book</Button>
        ) : (
          <>
            <UpdateServiceDialog serviceId={id} name={name} price={price} />
            <Button
              variant="secondary"
              size="icon"
              onClick={() => delete_service(id)}
            >
              <Trash className="h-4 w-4 text-destructive" />
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default ServiceItem;
