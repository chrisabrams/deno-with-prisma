import { createRequire } from "node:module";
import type { PrismaClient } from "./generated/client/index.d.ts";

const require = createRequire(import.meta.url);
const Prisma = require("./generated/client/index.cjs");
export const prisma: PrismaClient = new Prisma.PrismaClient();

export * from "./generated/client/index.d.ts";
