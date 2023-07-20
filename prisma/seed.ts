const { PrismaClient, Role } = require("@prisma/client");
const { hash } = require("bcrypt");

const prisma = new PrismaClient();

const main = async () => {
  const password = await hash("test", 12);
  const user = await prisma.user.upsert({
    where: { email: "test@test.com" },
    update: {},
    create: {
      email: "test@test.com",
      name: "Test User",
      password,
      role: Role.CLIENT,
    },
  });

  console.log(user);
};

main()
  .then(() => prisma.$disconnect())
  .catch(async e => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
