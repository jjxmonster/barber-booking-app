import { PrismaClient, User } from "@prisma/client";

import { AuthorizeUserPayload } from "types/common";
import { compare } from "bcrypt";

const prisma = new PrismaClient();

const authorize = async (
  payload: Pick<User, "password" | "email">
): Promise<AuthorizeUserPayload | null> => {
  const user = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
  });

  if (!user) {
    return null;
  }

  const isPasswordValid = await compare(payload.password, user.password);

  if (!isPasswordValid) {
    return null;
  }

  return {
    id: user.id + "",
    email: user.email,
    name: user.name,
    role: user.role,
  };
};

export default authorize;
