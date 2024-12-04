import "jsr:@std/dotenv@^0.225.2/load";
import { prisma } from "./prisma/client.ts";

const users = await prisma.user.findMany({
  where: { name: { contains: "John" } },
});

console.log(users);
