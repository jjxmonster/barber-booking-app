import React, { FunctionComponent } from "react";

import { Service } from "@prisma/client";
import ServiceItem from "./service-item";
import { useQuery } from "@tanstack/react-query";
import useServices from "hooks/use-services";

interface ServicesProps {
  barberShopId: number;
  isForClient: boolean;
}

const Services: FunctionComponent<ServicesProps> = ({
  barberShopId,
  isForClient,
}) => {
  const services = useServices(barberShopId);

  if (!services.length) {
    return (
      <div className="w-full h-20 text-gray-400 flex items-center justify-center">
        <span>No services yet, add your first now!</span>
      </div>
    );
  }

  const renderServices = services.map(({ id, name, price }: Service) => (
    <ServiceItem
      name={name}
      price={price}
      id={id}
      key={id}
      isForClient={isForClient}
    />
  ));

  return <div className="grid gap-6 grid-cols-2">{renderServices}</div>;
};

export default Services;
