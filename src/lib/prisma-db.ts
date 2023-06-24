import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as {
  prisma: PrismaClient | undefined;
};

let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();  // no log for production
} else {
  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma =   new PrismaClient({
           log: ['query'],
          });
  }
  prisma = globalForPrisma.prisma;
}

export default prisma;
