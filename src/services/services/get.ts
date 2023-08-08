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

  return services;
};

export default getServicesForBusiness;
