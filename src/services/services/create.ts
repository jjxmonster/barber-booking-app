import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createService = async (
  name: string,
  price: number,
  barberShopId: number
) => {
  const service = await prisma.service.create({
    data: {
      name,
      price,
      barberShopId,
    },
  });

  return service;
};

export default createService;
