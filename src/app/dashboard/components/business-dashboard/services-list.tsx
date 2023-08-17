import React, { FunctionComponent } from "react";

import { Service } from "@prisma/client";
import ServiceItem from "./service-item";
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
    <ServiceItem name={name} price={price} id={id} key={id} />
  ));

  return <div className="grid gap-6 grid-cols-2">{renderServices}</div>;
};

export default Services;
