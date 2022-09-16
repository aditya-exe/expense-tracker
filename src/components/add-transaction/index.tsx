import {useState} from "react";
import {trpc} from "@/utils/trpc";

const AddTransaction = () => {
  const [message, setMessage] = useState<string>("");
  const [value, setValue] = useState<number>();
  const [type, setType] = useState<string>("CREDIT");
  const ctx = trpc.useContext();

  const addExpense = trpc.useMutation(["expense.add-transaction"], {
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

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    if (typeof value === "number") {
      addExpense.mutate({
        message: message,
        value: value,
        type: type,
      })
    }
    setType("CREDIT");
    setMessage("");
    setValue(0);
  }

  return (
    <>
      <h3 className={"font-bold text-fuchsia-300 pt-2 text-lg"}>Add Expense</h3>
      <form onSubmit={handleSubmit}>
        <div className={"justify-between flex"}>
          <p className={"text-fuchsia-300 font-bold text-md"}>Message</p>
          <input type="text" value={message} onChange={(e) => setMessage(e.target.value)}
                 placeholder={"Enter text..."} className={"ml-2 rounded-lg p-1 active:ring-none bg-purple-300"}/>
        </div>
        <div className={"justify-between flex pt-1"}>
          <p className={"text-fuchsia-300 font-bold text-md"}>Value</p>
          <input type="number" value={value} onChange={(e) => setValue(parseInt(e.target.value))}
                 placeholder={"Enter value..."} className={"ml-2 rounded-lg focus:border-none p-1 bg-purple-300"}/>
        </div>
        <div className={"justify-between flex pt-1"}>
          <p className={"text-fuchsia-300 font-bold text-md"}>
            Type
          </p>
          <select value={type} onChange={(e) => setType(e.target.value)} className={"text-black bg-purple-300 rounded-lg p-1 font-semibold"}>
            <option value="CREDIT">CREDIT</option>
            <option value="DEBIT">DEBIT</option>
          </select>
        </div>
        <button
          className={"p-2 font-bold text-black bg-purple-400 hover:bg-purple-700 transition ease-in-out mt-5 rounded-full"}>Add
          Expense
        </button>
      </form>
    </>
  );
}

export default AddTransaction;