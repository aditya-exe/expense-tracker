import {trpc} from "@/utils/trpc";

const Balance = () => {
  const {data: expenses, isLoading} = trpc.useQuery(["expense.get-all"]);
  // const amounts = expenses?.map(expense => expense.value);
  const income = expenses?.filter(expense => expense.type === "CREDIT").reduce((acc, item) => (acc + item.value), 0);
  const expense = expenses?.filter(expense => expense.type === "DEBIT").reduce((acc, item) => (acc + item.value), 0);
  // console.log(income, expense);
  let total;
  if (typeof income === "number" && typeof expense === "number") {
    total = income - expense;
  }

  return (
    <div className={"flex min-w-[486px] pt-4"}>
      <h4 className={"text-2xl text-fuchsia-300 select-none font-bold"}>Your Balance</h4>
      <h1 className={"text-2xl text-fuchsia-700 font-bold ml-2"}>{total}</h1>
    </div>
  )
}

export default Balance