import React, { useState } from 'react'


/* - Contains inputs for "title" and "amount".
 * - Sends the new expense to the parent (Home.jsx) using addExpense().
 */

const ExpenseForm = ({ addExpense }) => {

  const [title, setTitle] = useState("")

  const [amount, setAmount] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    // Basic validation to avoid empty submissions
    if (!title || !amount) {
      alert("Please enter both title and amount")
      return
    }
    // Pass new expense object to Home.jsx
    addExpense({
      title,
      amount: parseFloat(amount),// Convert text to number
    })
    // To clear form after submission
    setTitle("")
    setAmount("")
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white/90 backdrop-blur p-6 rounded-xl shadow-md border mb-6">


      <h3>Add Expense</h3>

      <div>
        <label>Expense title</label>
        <input
          type="text"
          className="w-full p-2 border rounded mt-2 mb-4"

          value={title}
          placeholder="e.g. Food"
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div>
        <label>Amount</label>
        <input
          type="number"
          value={amount}
          placeholder="Enter amount"
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Add Expense
      </button>
    </form>
  )
}

export default ExpenseForm
