import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "@/pages/api/trpc/root";

export const trpc = createTRPCReact<AppRouter>();