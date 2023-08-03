import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createEmployee = async (name: string, barberShopId: number) => {
  const { url: avatarUrl } = await fetch(
    "https://source.unsplash.com/random/900%C3%97700/?avatar"
  );

  const employee = await prisma.employee.create({
    data: {
      name,
      barberShopId,
      avatarUrl,
    },
  });

  return employee;
};

export default createEmployee;
