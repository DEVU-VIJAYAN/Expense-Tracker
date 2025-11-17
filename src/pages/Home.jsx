import React, { useState, useEffect } from 'react'
import SummaryCard from '../components/SummaryCard'
import IncomeForm from '../components/IncomeForm'
import ExpenseForm from '../components/ExpenseForm'
import ExpenseList from '../components/ExpenseList'

const Home = () => {

  const [income, setIncome] = useState(
    Number(localStorage.getItem("income")) || 0
  )

  const [expenses, setExpense] = useState(
    JSON.parse(localStorage.getItem("expenses")) || []
  )

  const [transactions, setTransactions] = useState(
    JSON.parse(localStorage.getItem("transactions")) || []
  )

  useEffect(() => {
    localStorage.setItem("income", income)
  }, [income])

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses))
  }, [expenses])

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions))
  }, [transactions])

  const addIncome = (amount) => {
    const newTransaction = {
      type: "income",
      title: "Income",
      amount: amount,
      date: new Date().toLocaleDateString(),
    };

    const updated = [...transactions, newTransaction];

    setTransactions(updated);
    localStorage.setItem("transactions", JSON.stringify(updated));

    setIncome((prev) => prev + amount);
  };


  const addExpense = (expense) => {
    const newTransaction = {
      type: "expense",
      title: expense.title,
      amount: expense.amount,
      date: new Date().toLocaleDateString(),
    };

    const updated = [...transactions, newTransaction];

    setTransactions(updated);
    localStorage.setItem("transactions", JSON.stringify(updated));

    setExpense((prev) => [...prev, expense]);
  };

  const deleteExpense = (index) => {

    const updatedExpenses = expenses.filter((_, i) => i !== index);
    setExpense(updatedExpenses);

    const updatedTransactions = transactions.filter((t, i) => !(t.type === "expense" && i === index));
    setTransactions(updatedTransactions);
  };

  const totalExpense = expenses.reduce((sum, item) => sum + item.amount, 0);


  return (
    <div className="w-full max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Expense Tracker</h1>

      <SummaryCard income={income} expense={totalExpense} />

      <IncomeForm addIncome={addIncome} />

      <ExpenseForm addExpense={addExpense} />

      <ExpenseList expenses={expenses} />
    </div>
  )
}

export default Home
