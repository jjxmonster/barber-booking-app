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

export const getBarberShopDataForToken = async (
  userEmail: string
): Promise<{ name: string; id: number }> => {
  const result = await prisma.barberShop.findFirst({
    where: {
      userEmail,
    },
  });

  return { name: result?.name ?? "not_found", id: result?.id ?? 0 };
};
