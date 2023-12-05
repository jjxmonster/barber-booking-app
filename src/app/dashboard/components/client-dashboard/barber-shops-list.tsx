"use client";

import React, { FunctionComponent } from "react";

import { BarberShop } from "@prisma/client";
import BarberShopCard from "../barber-shop-card";
import LoadingIndicator from "components/shared/loading-indicator";
import QueryErrorComponent from "components/shared/query-error-component";
import useBarberShopsByCity from "hooks/use-barber-shops-by-city";
import { fetchBarberShopsByCity } from "data/barber-shop";
import { getBarberShopsByCity } from "services/barber/get";
import { useQuery } from "@tanstack/react-query";

interface BarberShopsListProps {
  city: string;
}

const BarberShopsList: FunctionComponent<BarberShopsListProps> = ({ city }) => {
  const { data: barber_shops, error } = useQuery({
    queryKey: ["barber-shops", city],
    queryFn: () => getBarberShopsByCity(city),
  });

  if (error) {
    return <QueryErrorComponent />;
  }

  if (!barber_shops) return null;

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
    <section className="mt-12 grid gap-6 grid-cols-3">
      {renderBarberShops}
    </section>
  );
};

export default BarberShopsList;
