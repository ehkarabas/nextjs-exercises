// https://www.prisma.io/docs/orm/more/help-and-troubleshooting/help-articles/nextjs-prisma-client-dev-practices#solution
import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient();
};

// type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

// TypeScript, declare global bloğunu modül içinde tanımlanan tipleri veya değişkenleri global kapsamda kullanılabilir hale getirmek için kullanır. Bu blok, modül sistemi içinde tanımlanan bir şeyin (tip, sınıf, arayüz, vb.) modülün dışında da erişilebilir olmasını sağlar. Global kapsamda genellikle var kullanımı daha esneklik sağladığı için tercih edilir.
declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

// const globalForPrisma = globalThis as unknown as {
//   prisma: PrismaClientSingleton | undefined;
// };

const prisma = globalThis.prisma ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;
