import { PrismaClient } from "@prisma/client";

const client = global.prismadb || new PrismaClient();
if (process.env.NODE_ENV == "production") global.prismadb = client;

export default client;

// We do this because of Hot Reloading
// The hot reloading feature allows you to inject newly edited files at runtime without stopping the app
