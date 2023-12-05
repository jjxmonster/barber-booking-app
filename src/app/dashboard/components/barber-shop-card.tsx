"use client";
import { Card, CardHeader } from "components/ui/card";
import React, { FunctionComponent } from "react";

import { Button } from "components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface BarberShopCardProps {
  name: string;
  address: string;
  image: string;
}

const BarberShopCard: FunctionComponent<BarberShopCardProps> = ({
  name,
  address,
  image,
}) => {
  const { push } = useRouter();
  return (
    <Card className="rounded-md shadow-lg overflow-hidden">
      <CardHeader className="relative h-[150px]">
        <Image
          layout="fill"
          objectFit="cover"
          className="w-full"
          src={image}
          alt={`${name} - Image`}
        />
      </CardHeader>
      <div className="max-w-sm rounded overflow-hidden relative">
        <div className="px-3 py-4">
          <div className="font-medium text-xl text-primary mb-2">{name}</div>
          <p className="text-gray-400 text-base mb-3">{address}</p>
          <Button
            className="w-full"
            onClick={() => push(`/barber-shop/${1}`)}
            variant="secondary"
          >
            Check out the offer
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default BarberShopCard;
