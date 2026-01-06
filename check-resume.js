const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function check() {
  const resume = await prisma.resume.findUnique({
    where: { id: 'cmk2l6lk9000011vzechlhlzk' },
  });
  console.log(JSON.stringify(resume, null, 2));
}

check().catch(console.error).finally(() => prisma.$disconnect());
