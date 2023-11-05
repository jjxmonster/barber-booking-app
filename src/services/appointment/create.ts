"use server";
import { AppointmentPayload } from "types/common";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createAppointment = async ({
  barberShopId,
  employeeId,
  date,
  appointmentTime,
  clientEmail,
  serviceId,
}: AppointmentPayload) => {
  const employee = await prisma.appointment.create({
    data: {
      barberShopId: Number(barberShopId),
      employeeId: Number(employeeId),
      serviceId: Number(serviceId),
      date,
      appointmentTime,
      clientEmail,
    },
  });

  if (!employee) {
    throw new Error("Something went wrong when creating an appointment");
  }

  return employee;
};

export default createAppointment;
