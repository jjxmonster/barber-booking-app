"use client";

import React, { FunctionComponent } from "react";

import { Card } from "components/ui/card";
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
  return <Card>{barber_shop.name}</Card>;
};

export default BarberShopPage;
