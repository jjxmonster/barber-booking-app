import { Employee, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getEmployeesForBusiness = async (
  barberShopId: number
): Promise<Array<Employee>> => {
  const employees = await prisma.employee.findMany({
    where: {
      barberShopId,
    },
  });

  if (!employees) {
    throw new Error("Employees for Barber Shop not found");
  }

  return employees;
};

export default getEmployeesForBusiness;
