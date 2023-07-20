import { Role, User } from "@prisma/client";

// USER
export type AuthorizeUserPayload = Pick<User, "email" | "role" | "name"> & {
  id: string;
};

export type UserPayload = {
  email: string;
  name: string;
  password: string;
  role: Role;
};
