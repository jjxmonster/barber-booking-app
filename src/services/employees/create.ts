import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createEmployee = async (name: string, barber_shop_id: number) => {
  const { url } = await fetch(
    "https://source.unsplash.com/random/900%C3%97700/?avatar"
  );

  const result = await prisma.employee.create({
    data: {
      name,
      barberShopId: barber_shop_id,
      avatarUrl: url,
    },
  });

  return result;
};

export default createEmployee;
