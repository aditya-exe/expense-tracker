import NextAuth, {type NextAuthOptions} from "next-auth";
import DiscordProvider from "next-auth/providers/discord";

// Prisma adapter for NextAuth, optional and can be removed
import {PrismaAdapter} from "@next-auth/prisma-adapter";
import {prisma} from "@/server/db/client";
import {env} from "@/env/server.mjs";
import {trpc} from "@/utils/trpc";

// let walletId: string | undefined="hello";
// const initializeWallet = () => {
//   const {mutate} = trpc.useMutation(["wallet.create"]);
//   mutate();
//   const {data} = trpc.useQuery(["wallet.get-wallet-id"]);
//   walletId = data;
// }


export const authOptions: NextAuthOptions = {
  // Include user.id on session
  // Include
  callbacks: {
    session({session, user}) {
      if (session.user) {
        session.user.id = user.id;
        // initializeWallet();
        // session.user.walletId = trpc.useQuery(["wallet.get-wallet-id"]).data;
      }
      return session;
    },
  },
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  providers: [
    DiscordProvider({
      clientId: env.DISCORD_CLIENT_ID,
      clientSecret: env.DISCORD_CLIENT_SECRET,
    }),
    // ...add more providers here
  ],
};

export default NextAuth(authOptions);
