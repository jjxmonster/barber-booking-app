import { BarberShop, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getBarberShopsByCity = async (
  city: string
): Promise<Array<BarberShop>> => {
  const result = await prisma.barberShop.findMany({
    where: {
      city: city,
    },
  });
  return result;
};

export default getBarberShopsByCity;
