import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client.js";

const connectionString = `${process.env.DATABASE_URL}`;

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

// forma antiga de usar o PrismaClient
// const prisma = new PrismaClient();

export { prisma };

export const connection = async () => {
  try {
    await prisma.$connect();
    console.log("Conectado ao banco de dados");
  } catch (error) {
    console.log("Erro ao conectar ao banco de dados");
    throw error;
  }
};

const createuser = async () => {
  try {
    await prisma.user.create({
      data: {
        name: "Becher",
        email: "becher@asd.com",
        password: "4321",
        cep: "11111-001",
      },
    });
  } catch (error) {
    throw error;
  }
};
// createuser();
