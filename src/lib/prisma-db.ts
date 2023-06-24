import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as {
  db: PrismaClient | undefined;
};

let db: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  db = new PrismaClient();  // no log for production
} else {
  if (!globalForPrisma.db) {
    globalForPrisma.db =   new PrismaClient({
           log: ['query'],
          });
  }
  db = globalForPrisma.db;
}

export default db;
