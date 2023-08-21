"use client";

import { Card, CardContent, CardHeader, CardTitle } from "components/ui/card";
import React, { FunctionComponent, Suspense } from "react";

import Employees from "app/dashboard/components/business-dashboard/employees-list";
import Head from "next/head";
import Image from "next/image";
import LoadingIndicator from "components/shared/loading-indicator";
import Services from "app/dashboard/components/business-dashboard/services-list";
import { useQuery } from "@tanstack/react-query";

interface BarberShopPageProps {
  params: { id: number };
}

const BarberShopPage: FunctionComponent<BarberShopPageProps> = ({
  params: { id },
}) => {
  const { data } = useQuery(["barber-shop"], () =>
    fetch(`/api/barber-shop?id=${id}`).then(res => res.json())
  );

  const { barber_shop } = data;
  console.log(barber_shop);
  return (
    <div className="mt-20 w-full">
      <Head>
        <title>{barber_shop.name} | Barber Booking App</title>
      </Head>
      <Card>
        <CardHeader className="relative h-[500px]">
          <Image
            layout="fill"
            objectFit="cover"
            className="w-full rounded-xl p-5"
            src={barber_shop.imageUrl}
            alt={`${barber_shop.name} - Image`}
          />
        </CardHeader>
        <CardContent className="pt-5">
          <p className="text-white text-2xl font-medium">{barber_shop.name}</p>
          <p className="text-gray-500 text-xl font-medium">{`${barber_shop.address}, ${barber_shop.city}`}</p>
          <div className="mt-10">
            <CardTitle>SERVICES</CardTitle>
            <div className="mt-5">
              <Suspense fallback={<LoadingIndicator />}>
                <Services barberShopId={id} isForClient={true} />
              </Suspense>
            </div>
          </div>
          <div className="mt-10">
            <CardTitle>Staffers</CardTitle>
            <div className="mt-5">
              <Suspense fallback={<LoadingIndicator />}>
                <Employees barberShopId={id} />
              </Suspense>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BarberShopPage;
