import { userRouter } from "./UserRouter";
import { router } from "./_trpc";
export const appRouter = router({
  user: userRouter,
});
export type AppRouter = typeof appRouter;