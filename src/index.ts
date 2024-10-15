import { server } from './server/server';
import { configDotenv } from 'dotenv';
import { PrismaClient } from "@prisma/client";
configDotenv();
export const prisma = new PrismaClient();

server.listen(process.env.PORT || 80, async() => {
  await prisma.$connect().then(() => {
    console.log('[ Prisma-MongoDb ] Database connected!')
    console.log('[ Bot ] Starter Bot is running!')
    console.log('[ SERVER ] Server is running on port '+ process.env.PORT || 80)
  }).catch(() => {
    console.log('[ Prisma-MongoDb ] Database connection failed!')
    console.log('[ Bot ] No Bot is running!')
    console.log('[ SERVER ] Server is not running!')

  })
});

