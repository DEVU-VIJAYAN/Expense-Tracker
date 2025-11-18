import React, { useState } from 'react'
/*
 * - Collects the income amount from the user.
 * - Sends the entered value to the  Home.jsx using addIncome().
 * - Maintains a local state to track the input field.
 */
const IncomeForm = ({ addIncome }) => {

  // Local state to store the entered income amount
  const [amount, setAmount] = useState("");
  /*
   * handleSubmit()
   * - Prevents page refresh
   * - Validates input
   * - Sends income amount to parent component
   * - Clears the input field afterward
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!amount) return;

    addIncome(Number(amount));
    setAmount("");

  };

  return (
    <form onSubmit={handleSubmit} className="bg-white/90 backdrop-blur p-6 rounded-xl shadow-md border mb-6">


      <h3>Add Income</h3>

      <input
        type="number"
        placeholder="Enter amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full p-2 border rounded mt-2 mb-4"
      />


      <button
        type="submit"
        className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Add Income
      </button>


    </form>
  )
}
export default IncomeForm;
