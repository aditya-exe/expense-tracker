import {createRouter} from "../context";

export const walletRouter = createRouter()
  .mutation("create", {
    resolve: async ({ctx}) => {
      const sessionUserId = ctx.session?.user?.id;
      return ctx.prisma.wallet.create({
        data: {
          user: {
            connect: {
              id: sessionUserId,
            }
          }
        }
      });
    }
  })
  .query("get-wallet-id", {
    resolve: async ({ctx}) => {
      const wallet = await ctx.prisma.wallet.findUnique({
        where: {
          userId: ctx.session?.user?.id
        }
      })
      return wallet?.id;
    }
  })