import {trpc} from "@/utils/trpc";

const IncomeExpenses = () => {
  const {data: expenses} = trpc.useQuery(["expense.get-all"]);

  const income = expenses?.filter(expense => expense.type === "CREDIT").reduce((acc, item) => (acc + item.value), 0);
  const expense = expenses?.filter(expense => expense.type === "DEBIT").reduce((acc, item) => (acc + item.value), 0);

  return (
    <div className={"mt-2 flex text-2xl justify-between"}>
      <div className={"flex p-10"}>
        <h4 className={"text-green-500 font-bold"}>Income</h4>
        <p className={"text-green-500 font-bold ml-2"}>{income}</p>
      </div>
      <div className={"flex p-10"}>
        <h4 className={"text-red-500 font-bold"}>Expense</h4>
        <p className={"text-red-500 font-bold ml-2"}>{expense}</p>
      </div>
    </div>
  )
};

export default IncomeExpenses;