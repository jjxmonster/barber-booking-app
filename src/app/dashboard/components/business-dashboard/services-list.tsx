"use client";
import React, { FunctionComponent } from "react";

import QueryErrorComponent from "components/shared/query-error-component";
import { Service } from "@prisma/client";
import ServiceItem from "./service-item";
import { useQuery } from "@tanstack/react-query";
import { getBarberShopByID } from "services/barber/get";

interface ServicesProps {
  isForClient: boolean;
  barberShopId: number;
}

const Services: FunctionComponent<ServicesProps> = ({
  barberShopId,
  isForClient,
}) => {
  const { data } = useQuery(["barberShop", barberShopId], () =>
    getBarberShopByID(barberShopId)
  );

  const { services } = data ?? { services: [] };

  if (!services) {
    return <QueryErrorComponent />;
  }

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
      barberShopId={barberShopId}
    />
  ));

  return <div className="grid gap-6 md:grid-cols-2">{renderServices}</div>;
};

export default Services;
