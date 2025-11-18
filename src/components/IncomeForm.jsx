import React, { useState } from 'react'

    const IncomeForm=({addIncome})=>{
        const[amount,setAmount]=useState("");

        const handleSubmit=(e)=>{
            e.preventDefault();

            

            if(!amount) return;

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
