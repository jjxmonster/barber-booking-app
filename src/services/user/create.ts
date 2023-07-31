import { BusinessPayload, UserPayload } from "types/common";
import { PrismaClient, Role, User } from "@prisma/client";

import Joi from "joi";
import { hash } from "bcrypt";

const prisma = new PrismaClient();

const getSchema = (role: Role) => {
  const business_fields = {
    role: Joi.string().valid(Role.CLIENT, Role.SALON_OWNER).required(),
    address: Joi.string().required(),
    city: Joi.string().required(),
    business_name: Joi.string().required(),
  };
  const client_field = { name: Joi.string().required() };

  const common_schema = {
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    role: Joi.string().valid(Role.CLIENT, Role.SALON_OWNER).required(),
  };

  if (role === Role.CLIENT) {
    return Joi.object({ ...common_schema, ...client_field });
  } else {
    return Joi.object({
      ...common_schema,
      ...business_fields,
    });
  }
};

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
  const { email, name, password, role, business_name, address, city } =
    await getSchema(payload.role).validateAsync({
      ...payload,
      role: Role[payload.role],
    });

  await checkEmail(email);

  const hashedPassword = (await hash(password, 12)) as string;
  const user = await prisma.user.create({
    data: {
      name: name ?? "",
      email,
      password: hashedPassword,
      role,
    },
  });

  if (role === Role.SALON_OWNER) {
    try {
      await createBarberShop({ business_name, address, city }, user);
    } catch (error) {
      throw new Error("Something went wrong when creating the barber shop");
    }
  }

  return user;
};

const createBarberShop = async (payload: BusinessPayload, user: User) => {
  const { business_name, address, city } = payload;
  const { url } = await fetch(
    "https://source.unsplash.com/random/900%C3%97700/?barber"
  );

  const barber_shop = prisma.barberShop.create({
    data: {
      user: {
        connect: {
          id: user.id,
        },
      },
      imageUrl: url,
      name: business_name,
      address,
      city,
    },
  });

  return barber_shop;
};

export default create;
