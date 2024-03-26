import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({ log: ['query'] });
seed(prisma)
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

//Main seed function with all contents initialization
async function seed(prisma: PrismaClient) {
  const data1 = {
    email: 'test@user.com',
    name: 'Test User',
    password: 'notsecurestorage',
  };

  {
    const existingUser1 = await prisma.user.findUnique({ where: data1 });

    if (!existingUser1) {
      await prisma.user.create({
        data: data1,
      });
    }
  }

  const data2 = {
    email: 'second@user.com',
    name: 'Second User',
    password: 'notsecurestorage',
  };

  {
    const existingUser2 = await prisma.user.findUnique({ where: data2 });

    if (!existingUser2) {
      await prisma.user.create({
        data: data2,
      });
    }
  }

  await prisma.room.createMany({
    data: new Array(10).fill({}),
  });
}
