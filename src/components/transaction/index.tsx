import {trpc} from "@/utils/trpc";

interface TransactionProps {
  id: string;
  value: number;
  message: string;
  type: string;
  walletId: string;
}

const Transaction = ({expense}: { expense: TransactionProps }) => {
  const ctx = trpc.useContext();
  const deleteTransaction = trpc.useMutation(["expense.delete-transaction"], {
    onMutate: () => {
      ctx.cancelQuery(["expense.get-all"]);

      const optimisticUpdate = ctx.getQueryData(["expense.get-all"]);
      if (optimisticUpdate) {
        ctx.setQueryData(["expense.get-all"], optimisticUpdate);
      }
    },
    onSettled: () => {
      ctx.invalidateQueries(["expense.get-all"]);
    }
  });

  const sign = expense.type === "DEBIT" ? '-' : '+';

  const handleDelete = (id: string) => {
    deleteTransaction.mutate({expenseId: id})
  }

  return (
    <div className={"group flex"}>
      <div className={"justify-between min-w-[486px] items-center  flex"}>
        <li className={"text-fuchsia-300 cursor-pointer"}>
          {expense.message} <span
          className={`${sign == '+' ? "text-green-500" : "text-red-500"} ml-[400px]`}>{sign}₹{expense.value}</span>
        </li>
      </div>
      <button
        className={"bg-red-800 text-white p-2 rounded-full font-bold scale-0 group-hover:scale-100 items-center justify-center "}
        onClick={() => handleDelete(expense.id)}>x
      </button>
    </div>
  )
}

export default Transaction;