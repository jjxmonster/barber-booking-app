"use server";

import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

export const createEmployee = async (formData: FormData) => {
  const avatarUrl = faker.image.avatar();

  const employee = await prisma.employee.create({
    data: {
      name: formData.get("name") as string,
      barberShopId: Number(formData.get("barberShopId")),
      avatarUrl,
    },
  });

  revalidatePath("/dashboard");

  return employee;
};

export const createService = async (formData: FormData) => {
  const service = await prisma.service.create({
    data: {
      name: formData.get("service") as string,
      price: Number(formData.get("price")),
      barberShopId: Number(formData.get("barberShopId")),
    },
  });

  return service;
};
