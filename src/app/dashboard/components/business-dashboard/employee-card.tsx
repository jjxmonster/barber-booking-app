import { Card, CardHeader } from "components/ui/card";
import React, { FunctionComponent } from "react";

import Image from "next/image";

interface EmployeeCardProps {
  name: string;
  image: string;
}

const EmployeeCard: FunctionComponent<EmployeeCardProps> = ({
  name,
  image,
}) => {
  return (
    <>
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
          </div>
        </div>
      </Card>
    </>
  );
};

export default EmployeeCard;
