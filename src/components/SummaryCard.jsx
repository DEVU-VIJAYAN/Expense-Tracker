import React from 'react'
/**
 * SummaryCard Component
 * - Displays a quick summary of the user's financial status.
 * - Shows total income, total expenses, and calculated balance.
 * - Receives income & expense from Home.jsx.
 */
const SummaryCard = ({ income, expense }) => {
  // Calculate remaining balance
  const balance = income - expense
  return (
    <div className="bg-white/90 backdrop-blur shadow-md rounded-xl p-6 mb-6 border">

      <h2>Summary</h2>
      <p><strong>Total Income:</strong> ₹{income}</p>
      <p><strong>Total Expense:</strong> ₹{expense}</p>
      <h3 style={{ marginTop: "10px" }}>
        <strong>Balance:</strong> ₹{balance}
      </h3>

    </div>
  )
}

export default SummaryCard
