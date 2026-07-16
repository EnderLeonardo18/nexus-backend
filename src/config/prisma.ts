import "dotenv/config"; // Carga el .env 
import { PrismaClient } from "@prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

// PrismaMariaDb acepta directamente la cadena de conexión (string) como parámetro.
// Al pasarle process.env.DATABASE_URL, TypeScript compilará perfectamente sin "as any".
const adapter = new PrismaMariaDb(process.env.DATABASE_URL!);

// Creamos la instancia oficial del cliente de Prisma v7
export const prisma = new PrismaClient({
    adapter,
    log: ['error', 'warn'], 
});