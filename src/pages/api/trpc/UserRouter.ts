import { prisma } from "@/server/db/client";
import { publicProcedure, router } from "./_trpc";

export const userRouter = router({
  getAll: publicProcedure.query(async () => {
    return await prisma.user.findMany();
  }),
});