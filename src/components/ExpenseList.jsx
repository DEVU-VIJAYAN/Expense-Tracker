import React from "react";

const ExpenseList = ({ expenses }) => {
  return (
<div className="bg-white/90 backdrop-blur p-6 rounded-xl shadow-md border">

      <h3>Expenses</h3>

      {expenses.length === 0 && <p>No expenses added yet.</p>}

      <ul>
        {expenses.map((item, index) => (
          <li key={index}>
            <strong>{item.title}</strong> — ₹{item.amount}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseList;
