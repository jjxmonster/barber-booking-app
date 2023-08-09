import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const updateService = async (id: number, name: string, price: number) => {
  const service = await prisma.service.update({
    where: {
      id,
    },
    data: {
      name,
      price,
    },
  });

  return service;
};

export default updateService;
