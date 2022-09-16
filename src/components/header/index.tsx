import {signIn, signOut, useSession} from "next-auth/react";
import {trpc} from "@/utils/trpc";
import {UserCircleIcon} from "@heroicons/react/20/solid";

const Header = () => {
  const {data: session} = useSession();
  const createWallet = trpc.useMutation(["wallet.create"]);
  const getWalletId = trpc.useQuery(["wallet.get-wallet-id"]);

  const handleLogIn = async () => {
    await signIn("discord");
    if (session?.user) {
      createWallet.mutate();
      // session.user.walletId = getWalletId.data;
    }
  }

  return (
    <div className={"flex flex-col items-center"}>
      <h1
        className="font-extrabold text-transparent select-none text-6xl bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
        Expense Tracker
        {/*{session?.user?.walletId}*/}
      </h1>
      <div className={"pb-10"}/>

      {session ? (
        <div className={"flex justify-between min-w-full items-center"}>
          <div className={"flex items-center"}>
            {(session?.user?.image !== null) ?
              (<img src={session?.user?.image} alt={"user-image"}
                    className={"rounded-full h-12 ring-1 hover:ring-4 ring-zinc-600"}/>) : (<UserCircleIcon/>)}
            <div className={"flex flex-col ml-2"}>
              <p className={"text-fuchsia-300 select-none font-bold"}>{session.user?.name}</p>
              <p className={"text-fuchsia-300 font-bold"}>Wallet
                ID: {getWalletId.isLoading ? "Loading" : getWalletId.data}</p>
            </div>
          </div>
          < button
            className="p-2 font-bold text-black bg-purple-400 hover:bg-purple-700 transition ease-in-out  rounded-full"
            onClick={() => signOut()}>Log Out
          </button>
        </div>
      ) : (
        <button
          className="p-4 font-bold text-black bg-purple-400 hover:bg-purple-700 transition ease-in-out rounded-full"
          onClick={handleLogIn}>Log In</button>
      )}
    </div>
  )
}

export default Header;