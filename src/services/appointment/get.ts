import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAppointmentForUser = async (email: string) => {
  const appointment = await prisma.appointment.findFirst({
    where: {
      clientEmail: email,
      date: {
        gte: new Date(),
      },
    },
    orderBy: {
      date: "asc",
    },
  });

  if (!appointment) {
    throw new Error("Appointment not found");
  }

  return appointment;
};
