// import "dotenv/config"; // <-- Asegura que cargue el .env si este archivo se evalúa antes
// import { PrismaClient } from "@prisma/client";
// import { PrismaMariaDb } from "@prisma/adapter-mariadb";

// // Crea el adapter usando la URL de tu .env
// const adapter = new PrismaMariaDb({
//     // url: process.env.DATABASE_URL!, // ← propiedad correcta: "url"
//     connectionString: process.env.DATABASE_URL!, 
// } as any)

// // Creamos una única instancia del cliente para reutilizar la conexión a MySQL
// export const prisma = new PrismaClient({
//      adapter,
//     log: ['error', 'warn'], // Muestra advertencias y errores en consola si algo falla
// });






import "dotenv/config"; // Carga el .env antes que cualquier otra cosa
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