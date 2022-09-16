import {createRouter} from "@/server/router/context";
import {z} from "zod";

export const expenseRouter = createRouter()
  .query("get-all", {
    resolve: async ({ctx}) => {
      const wallet = await ctx.prisma.wallet.findUnique({
        where: {
          userId: ctx.session?.user?.id
        }
      })

      return await ctx.prisma.expenses.findMany({
        where: {
          walletId: wallet?.id
        }
      });
    }
  })
  .mutation("add-transaction", {
    input: z.object({
      value: z.number(),
      message: z.string(),
      type: z.string(),
    }),
    resolve: async ({ctx, input}) => {
      const wallet = await ctx.prisma.wallet.findUnique({
        where: {
          userId: ctx.session?.user?.id
        }
      })

      return ctx.prisma.expenses.create({
        data: {
          ...input,
          wallet: {
            connect: {
              id: wallet?.id,
            }
          },
        }
      });
    }
  })
  .mutation("delete-transaction", {
    input: z.object({
      expenseId: z.string(),
    }),
    resolve: async ({ctx, input}) => {
      return ctx.prisma.expenses.delete({
        where: {
          id: input.expenseId,
        }
      })
    }
  })