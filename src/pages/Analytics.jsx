import React, { useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";
/*
 * - Reads all transactions stored in localStorage
 * - Calculates total income, total expense, and balance
 * - displays a Pie Chart using Chart.js
 * - Allows users to download monthly expenses in CSV format
 */
const Analytics = () => {

    const transactions =
        JSON.parse(localStorage.getItem("transactions")) || []; // Load all transactions from localStorage


    const chartRef = useRef(null);
    const chartInstance = useRef(null);// Stores existing chart to destroy old one
    // Filter only expense data from transactions
    const expenses = transactions.filter(
        (t) => t.type === "expense"
    );


    const totalIncome = transactions
        .filter((t) => t.type === "income")
        .reduce((sum, t) => sum + t.amount, 0);

    const totalExpense = expenses.reduce(
        (sum, t) => sum + t.amount,
        0
    );

    const balance = totalIncome - totalExpense;
    /**
      * useEffect()
      * -----------
      * - Runs every time "transactions" changes
      * - Groups expenses by category
      * - Creates a Pie Chart using Chart.js
      * - Destroys previous chart instance to avoid duplicates
      */
    useEffect(() => {
        if (chartInstance.current) {   // Destroy previous chart instance if it exists
            chartInstance.current.destroy();
        }

        const categoryTotals = {};// Group expenses by title (category)

        expenses.forEach((e) => {
            categoryTotals[e.title] =
                (categoryTotals[e.title] || 0) + e.amount;
        });

        const labels = Object.keys(categoryTotals);  // Category names
        const data = Object.values(categoryTotals);  // Category total

        const ctx = chartRef.current.getContext("2d");
        // Create a new Pie Chart
        chartInstance.current = new Chart(ctx, {
            type: "pie",
            data: {
                labels,
                datasets: [
                    {
                        data,
                    },
                ],
            },
        });
    }, [transactions]);

    return (
        <div className="w-full text-center">
            <h1 className="text-3xl font-bold mb-4">
                Analytics Dashboard
            </h1>

            <p>
                <strong>Total Income:</strong> ₹{totalIncome}
            </p>
            <p>
                <strong>Total Expense:</strong> ₹{totalExpense}
            </p>
            <p>
                <strong>Balance:</strong> ₹{balance}
            </p>


            <div className="w-full flex justify-center mt-8">
                <div className="w-[300px] h-[300px]">
                    <canvas ref={chartRef}></canvas>
                </div>
            </div>



            <button
                className="mt-6 bg-blue-600 text-white px-4 py-2 rounded"
                onClick={() => {
                    let csv = "Title,Amount,Date\n";

                    expenses.forEach((e) => {
                        csv += `${e.title},${e.amount},${e.date}\n`;
                    });

                    const blob = new Blob([csv], {
                        type: "text/csv",
                    });
                    const url = URL.createObjectURL(blob);

                    const a = document.createElement("a");
                    a.href = url;
                    a.download = "monthly_spendings.csv";
                    a.click();
                }}
            >
                Download This Month's Spendings
            </button>
        </div>
    );
};

export default Analytics;
