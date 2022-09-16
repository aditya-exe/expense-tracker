// src/server/router/index.ts
import {createRouter} from "./context";
import superjson from "superjson";
import {walletRouter} from "./routes/wallet.router";
import {expenseRouter} from "@/server/router/routes/expense.router";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("wallet.", walletRouter)
  .merge("expense.", expenseRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
