import React, { useState, useEffect } from 'react'
import SummaryCard from '../components/SummaryCard'
import IncomeForm from '../components/IncomeForm'
import ExpenseForm from '../components/ExpenseForm'
import ExpenseList from '../components/ExpenseList'
/**
 * Home Component
 * - Acts as the main page of the app.
 * - Manages all global state: income, expenses, and transactions.
 * - Handles adding income, adding expenses, and deleting expenses.
 * - Saves all data to localStorage for persistence.
 */
const Home = () => {

  const [income, setIncome] = useState(
    Number(localStorage.getItem("income")) || 0
    /**
   * Load saved income from localStorage (fallback = 0)
   */
  )
  /**
   * Load expenses array from localStorage
   */
  const [expenses, setExpense] = useState(
    JSON.parse(localStorage.getItem("expenses")) || []
  )
  /**
    * Load all transactions (income + expenses)
    * Used for Analytics and History
    */
  const [transactions, setTransactions] = useState(
    JSON.parse(localStorage.getItem("transactions")) || []
  )
  // Persist income to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("income", income)
  }, [income])
  //Persist expenses list to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses))
  }, [expenses])
  //Persist full transactions list to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions))
  }, [transactions])
  /*
   * addIncome()
   * - Creates a new income transaction object
   * - Updates income state
   * - Adds the transaction to the full transactions list
   */
  const addIncome = (amount) => {
    const newTransaction = {
      type: "income",
      title: "Income",
      amount: amount,
      date: new Date().toLocaleDateString(),
    };

    const updated = [...transactions, newTransaction];
    // Update full transaction history
    setTransactions(updated);
    localStorage.setItem("transactions", JSON.stringify(updated));

    setIncome((prev) => prev + amount);
  };

  /**
    * addExpense()
    * ------------
    * - Creates a new expense transaction
    * - Updates expense list
    * - Adds it to the transaction history
    */
  const addExpense = (expense) => {
    const newTransaction = {
      type: "expense",
      title: expense.title,
      amount: expense.amount,
      date: new Date().toLocaleDateString(),
    };

    const updated = [...transactions, newTransaction];
    // Update transaction list
    setTransactions(updated);
    localStorage.setItem("transactions", JSON.stringify(updated));
    // Add expense to local list
    setExpense((prev) => [...prev, expense]);
  };
  /*
    * deleteExpense()
    * ---------------
    * - Removes an expense by index
    * - Updates both expenses[] and transactions[]
    */
  const deleteExpense = (index) => {
    // Remove expense from expense list
    const updatedExpenses = expenses.filter((_, i) => i !== index);
    setExpense(updatedExpenses);
    // Remove matching transaction
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
