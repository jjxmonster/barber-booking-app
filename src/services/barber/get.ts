import { BarberShop, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getBarberShopsByCity = async (
  city: string
): Promise<Array<BarberShop>> => {
  const result = await prisma.barberShop.findMany({
    where: {
      city: city,
    },
  });
  return result;
};

export const getBarberShops = async (): Promise<Array<BarberShop>> => {
  const result = await prisma.barberShop.findMany();
  return result;
};
