import React, { FunctionComponent } from "react";

import Head from "next/head";

import { getBarberShopByID } from "services/barber/get";
import { BarberShopCard } from "./components/barber-shop-card";
import getEmployeesForBusiness from "services/employees/get";

interface BarberShopPageProps {
  params: { id: number };
}

const BarberShopPage: FunctionComponent<BarberShopPageProps> = async ({
  params: { id },
}) => {
  const barber_shop = await getBarberShopByID(Number(id));
  const employees = await getEmployeesForBusiness(Number(id));

  if (!barber_shop) {
    return (
      <div className="w-full flex items-center justify-center mt-20">
        <p className="text-gray-500 text-xl">Barber Shop not found</p>
      </div>
    );
  }

  return (
    <div className="mt-20 w-full">
      <Head>
        <title>{barber_shop.name} | Barber Booking App</title>
      </Head>
      <BarberShopCard employees={employees} barber_shop={barber_shop} />
    </div>
  );
};

export default BarberShopPage;
