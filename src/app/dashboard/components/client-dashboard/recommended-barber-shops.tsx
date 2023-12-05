import * as React from "react";

import { BarberShop } from "@prisma/client";
import BarberShopCard from "../barber-shop-card";
import { getBarberShops } from "services/barber/get";

const Recommended = async () => {
  const barber_shops = await getBarberShops();

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
