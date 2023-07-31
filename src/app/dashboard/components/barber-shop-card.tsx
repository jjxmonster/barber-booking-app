import { Card, CardContent, CardFooter, CardHeader } from "components/ui/card";
import React, { FunctionComponent } from "react";

import { Button } from "components/ui/button";
import Image from "next/image";

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
  return (
    <Card className="rounded-md shadow-lg overflow-hidden">
      <CardHeader className="relative h-[150px]">
        <Image
          layout="fill"
          objectFit="cover"
          className="w-full"
          src={image}
          alt="Sunset in the mountains"
        />
      </CardHeader>
      <div className="max-w-sm rounded overflow-hidden relative">
        <div className="px-3 py-4">
          <div className="font-medium text-xl text-primary mb-2">{name}</div>
          <p className="text-gray-400 text-base mb-3">{address}</p>
          <Button className="w-full" variant="secondary">
            Check out the offer
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default BarberShopCard;
