import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const deleteService = async (id: number) => {
  const service = await prisma.service.delete({
    where: {
      id,
    },
  });

  return service;
};

export default deleteService;
