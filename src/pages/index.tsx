import type {NextPage} from "next";
import {signIn, signOut, useSession} from "next-auth/react";
import Head from "next/head";
import {trpc} from "@/utils/trpc";
import Header from "@/components/header";
import Balance from "@/components/balance";
import IncomeExpenses from "@/components/income-expenses";
import TransactionList from "@/components/transaction-list";
import AddTransaction from "@/components/add-transaction";

const Home: NextPage = () => {
  const {data: session, status} = useSession();

  //Check session
  if (status === "loading") {
    return <h1 className={"flex flex-col items-center pt-4"}>Loading...</h1>
  }

  return (
    <>
      <Head>
        <title>Expense Tracker</title>
        <meta name="description" content="Generated by create-t3-app"/>
        <link rel="icon" href="/favicon.ico"/>
      </Head>

      <main className={"flex flex-col items-center"}>
        <Header/>
        {session &&
          <div>
            <Balance/>
            <IncomeExpenses/>
            <TransactionList/>
            <AddTransaction/>
          </div>
        }
      </main>
    </>
  );
};

export default Home;
