import { PrismaClient, Role } from "@prisma/client";

import Joi from "joi";
import { UserPayload } from "types/common";
import { hash } from "bcrypt";

const prisma = new PrismaClient();

const schema = Joi.object({
  email: Joi.string().email().required(),
  name: Joi.string().required(),
  password: Joi.string().required(),
  role: Joi.string().valid(Role).required(),
});

const checkEmail = async (email: string) => {
  const userExists = await prisma.user.count({
    where: {
      email,
    },
  });

  if (userExists) {
    throw new Error("email_taken");
  }
};

const create = async (payload: UserPayload) => {
  const { email, name, password, role } = payload;
  await checkEmail(email);
  const hashedPassword = (await hash(password, 12)) as string;

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role,
    },
  });

  return user;
};

export default create;
