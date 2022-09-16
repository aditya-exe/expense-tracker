import {trpc} from "@/utils/trpc";
import Transaction from "@/components/transaction";

const TransactionList = () => {
  const {data: expenses} = trpc.useQuery(["expense.get-all"]);

  return (
    <>
      <h3 className={"text-fuchsia-300 font-bold text-2xl"}>History</h3>
      <ul>
        {expenses?.map(exp => <Transaction key={exp.id} expense={exp}/>)}
      </ul>
    </>
  )
};

export default TransactionList;