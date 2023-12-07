import React, { FunctionComponent } from "react";

import { getBarberShopByID } from "services/barber/get";
import { BarberShopCard } from "./components/barber-shop-card";
import { Hydrate, QueryClient, dehydrate } from "@tanstack/react-query";

interface BarberShopPageProps {
  params: { id: number };
}

const BarberShopPage: FunctionComponent<BarberShopPageProps> = async ({
  params: { id },
}) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(["barberShop", Number(id)], () =>
    getBarberShopByID(Number(id))
  );

  return (
    <section className="mt-20 w-full">
      <Hydrate state={dehydrate(queryClient)}>
        <BarberShopCard barberShopId={Number(id)} />
      </Hydrate>
    </section>
  );
};

export default BarberShopPage;
