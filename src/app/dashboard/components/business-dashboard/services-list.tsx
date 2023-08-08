import { DeleteIcon, Edit, Trash } from "lucide-react";
import { Employee, Service } from "@prisma/client";
import React, { FunctionComponent } from "react";

import { Button } from "components/ui/button";
import { formatCurrency } from "lib/utils";
import { useQuery } from "@tanstack/react-query";

interface ServicesProps {
  barberShopId: number;
}

const Services: FunctionComponent<ServicesProps> = ({ barberShopId }) => {
  const { data } = useQuery(["services"], () =>
    fetch(`/api/services?id=${barberShopId}`).then(res => res.json())
  );

  const { services } = data || { services: [] };

  if (!services.length) {
    return (
      <div className="w-full h-20 text-gray-400 flex items-center justify-center">
        <span>No services yet, add your first now!</span>
      </div>
    );
  }

  const renderServices = services.map(({ id, name, price }: Service) => (
    <div
      key={id}
      className="text-white p-5 border-l-4 shadow-lg flex items-center justify-between"
    >
      <div>
        <span>{name}</span> | <span>{formatCurrency.format(price)}</span>
      </div>
      <div className="flex gap-2">
        <Button variant="secondary" size="icon">
          <Edit className="h-4 w-4 text-primary" />
        </Button>
        <Button variant="secondary" size="icon">
          <Trash className="h-4 w-4 text-destructive" />
        </Button>
      </div>
    </div>
  ));

  return <div className="grid gap-6 grid-cols-2">{renderServices}</div>;
};

export default Services;
