import { PrismaClient, Service } from "@prisma/client";

const prisma = new PrismaClient();

const getServicesForBusiness = async (
  barberShopId: number
): Promise<Array<Service>> => {
  const services = await prisma.service.findMany({
    where: {
      barberShopId,
    },
  });

  if (!services) {
    throw new Error("Services not found");
  }

  return services;
};

export default getServicesForBusiness;
