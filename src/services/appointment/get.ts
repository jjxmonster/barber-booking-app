"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAppointmentForUser = async (email: string) => {
  const appointments = await prisma.appointment.findMany({
    where: {
      clientEmail: email,
      date: {
        gte: new Date(),
      },
    },
    orderBy: {
      date: "asc",
    },
    include: {
      barberShop: true,
      service: true,
    },
  });

  if (!appointments) {
    throw new Error("Something went wrong.");
  }

  return appointments[0];
};

export const getAppointmentsForBarberShop = async (barberShopId: number) => {
  const appointment = await prisma.appointment.findMany({
    where: {
      barberShopId,
    },
    orderBy: {
      date: "asc",
    },
    include: {
      barberShop: true,
      service: true,
    },
  });

  if (!appointment) {
    throw new Error("Something went wrong.");
  }

  return appointment;
};
