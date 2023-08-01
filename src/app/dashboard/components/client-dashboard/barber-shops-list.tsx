import React, { FunctionComponent } from "react";

import { BarberShop } from "@prisma/client";
import BarberShopCard from "../barber-shop-card";
import { useQuery } from "@tanstack/react-query";

interface BarberShopsListProps {
  city: string;
}

const BarberShopsList: FunctionComponent<BarberShopsListProps> = ({ city }) => {
  const { data } = useQuery(["barber_shops", city], () =>
    fetch(`/api/barber-shops?city=${city}`).then(res => res.json())
  );

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
