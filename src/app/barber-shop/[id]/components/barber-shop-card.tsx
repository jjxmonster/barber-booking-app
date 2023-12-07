"use client";
import Image from "next/image";
import { Separator } from "components/ui/separator";
import Services from "app/dashboard/components/business-dashboard/services-list";
import Employees from "app/dashboard/components/business-dashboard/employees-list";
import { Card, CardContent, CardHeader, CardTitle } from "components/ui/card";
import { BarberShopType } from "types/common";
import { useQuery } from "@tanstack/react-query";
import { getBarberShopByID } from "services/barber/get";
import LoadingIndicator from "components/shared/loading-indicator";

interface BarberShopCardProps {
  barberShopId: number;
}

export const BarberShopCard = ({ barberShopId }: BarberShopCardProps) => {
  const { data: barber_shop, isLoading } = useQuery({
    queryKey: ["barberShop", barberShopId],
    queryFn: () => getBarberShopByID(barberShopId),
  });

  if (isLoading) {
    return <LoadingIndicator />;
  }

  if (!barber_shop) {
    return (
      <div className="w-full flex items-center justify-center mt-20">
        <p className="text-gray-500 text-xl">Barber Shop not found</p>
      </div>
    );
  }

  return (
    <Card>
      <CardHeader className="relative h-[500px]">
        <Image
          layout="fill"
          objectFit="cover"
          className="w-full rounded-xl p-5"
          src={barber_shop.imageUrl as string}
          alt={`${barber_shop.name} - Image`}
        />
      </CardHeader>
      <CardContent className="pt-5">
        <p className="text-white text-2xl font-medium">{barber_shop.name}</p>
        <p className="text-gray-500 text-xl font-medium">{`${barber_shop.address}, ${barber_shop.city}`}</p>
        <Separator className="my-5" />
        <div>
          <CardTitle>SERVICES</CardTitle>
          <div className="mt-5">
            <Services barberShopId={barberShopId} isForClient={true} />
          </div>
        </div>
        <div className="mt-10">
          <CardTitle>Staffers</CardTitle>
          <div className="mt-5">
            <Employees barberShopId={barberShopId} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
