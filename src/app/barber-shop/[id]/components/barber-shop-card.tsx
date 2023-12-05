"use client";
import Image from "next/image";
import { Separator } from "components/ui/separator";
import Services from "app/dashboard/components/business-dashboard/services-list";
import Employees from "app/dashboard/components/business-dashboard/employees-list";
import { Card, CardContent, CardHeader, CardTitle } from "components/ui/card";
import { BarberShop, Employee } from "@prisma/client";

interface BarberShopCardProps {
  barber_shop: BarberShop;
  employees: Employee[];
}

export const BarberShopCard = ({
  barber_shop,
  employees,
}: BarberShopCardProps) => {
  const { id } = barber_shop;
  return (
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
        <Separator className="my-5" />
        <div>
          <CardTitle>SERVICES</CardTitle>
          <div className="mt-5">
            <Services barberShopId={id} isForClient={true} />
          </div>
        </div>
        <div className="mt-10">
          <CardTitle>Staffers</CardTitle>
          <div className="mt-5">
            <Employees employees={employees} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
