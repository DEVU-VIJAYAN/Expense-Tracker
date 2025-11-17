import React from "react";

const Transactions = () => {
  const data = JSON.parse(localStorage.getItem("transactions")) || [];

  return (
    <div>
      <h1>All Transactions</h1>

      {data.length === 0 ? (
        <p>No transactions yet.</p>
      ) : (
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>Date</th>
              <th>Type</th>
              <th>Title</th>
              <th>Amount</th>
            </tr>
          </thead>

          <tbody>
            {data.map((t, index) => (
              <tr key={index}>
                <td>{t.date}</td>
                <td>{t.type}</td>
                <td>{t.title}</td>
                <td>₹{t.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Transactions;
