import { Role, User } from "@prisma/client";

// USER
export type AuthorizeUserPayload = Pick<User, "email" | "role" | "name"> & {
  id: string;
};

export type UserPayload = {
  email: string;
  name?: string;
  password: string;
  role: Role;
  business_name?: string;
  address?: string;
  city?: string;
};

export type BusinessPayload = {
  business_name: string;
  address: string;
  city: string;
};

// APPOINTMENT
export type AppointmentPayload = {
  barberShopId: number;
  employeeId: number;
  date: Date;
  appointmentTime: string;
  clientEmail: string;
  serviceId: number;
};
