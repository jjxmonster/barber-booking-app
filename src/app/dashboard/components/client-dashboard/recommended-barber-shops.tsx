import * as React from "react";

import { BarberShop } from "@prisma/client";
import BarberShopCard from "../barber-shop-card";
import { useQuery } from "@tanstack/react-query";

const Recommended = () => {
  const { data } = useQuery(["barber_shops"], () =>
    fetch(`/api/barber-shops`).then(res => res.json())
  );

  const { barber_shops } = data || { barber_shops: [] };

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

  return <div className="grid gap-6 grid-cols-3">{renderBarberShops}</div>;
};

export default Recommended;
