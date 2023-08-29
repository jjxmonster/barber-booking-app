import React, { FunctionComponent } from "react";

import { BarberShop } from "@prisma/client";
import BarberShopCard from "../barber-shop-card";
import LoadingIndicator from "components/shared/loading-indicator";
import QueryErrorComponent from "components/shared/query-error-component";
import useBarberShopsByCity from "hooks/use-barber-shops-by-city";

interface BarberShopsListProps {
  city: string;
}

const BarberShopsList: FunctionComponent<BarberShopsListProps> = ({ city }) => {
  const { data, isLoading, isError } = useBarberShopsByCity(city);

  if (isLoading) {
    return <LoadingIndicator />;
  }

  if (isError) {
    return <QueryErrorComponent />;
  }

  const { barber_shops } = data || { barber_shops: [] };

  if (!barber_shops.length) {
    return (
      <div className="w-full h-20 text-gray-400 flex items-center justify-center">
        <span>No barber shops found in {city}</span>
      </div>
    );
  }

  const renderBarberShops = barber_shops.map(
    ({ id, name, address, city, imageUrl }: BarberShop) => {
      return (
        <BarberShopCard
          image={imageUrl}
          key={id}
          name={name as string}
          address={`${address}, ${city}`}
        />
      );
    }
  );

  return (
    <div className="mt-12 grid gap-6 grid-cols-3">{renderBarberShops}</div>
  );
};

export default BarberShopsList;
