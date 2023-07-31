import { Card, CardContent, CardFooter, CardHeader } from "components/ui/card";
import React, { FunctionComponent } from "react";

import { Button } from "components/ui/button";
import Image from "next/image";

interface BarberShopCardProps {
  name: string;
  address: string;
}

const BarberShopCard: FunctionComponent<BarberShopCardProps> = ({
  name,
  address,
}) => {
  return (
    <Card className="rounded-md shadow-lg overflow-hidden">
      <CardHeader className="relative h-[150px]">
        <Image
          layout="fill"
          objectFit="cover"
          className="w-full"
          src="https://images.unsplash.com/photo-1590509294910-32752e061399?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8YmFyYmVyfHx8fHx8MTY5MDgzNjAzMw&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080"
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
