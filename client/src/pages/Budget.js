// import React, { useState } from "react";

// const BudgetComponent = ({ categories }) => {
//   const [budgets, setBudgets] = useState([]);
//   const [editingBudget, setEditingBudget] = useState(null);
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [newBudgetAmount, setNewBudgetAmount] = useState("");

//   const handleBudgetChange = (index, event) => {
//     const updatedBudgets = [...budgets];
//     updatedBudgets[index] = event.target.value;
//     setBudgets(updatedBudgets);
//   };

//   const handleEditBudget = (index) => {
//     setEditingBudget(index);
//   };

//   const handleSaveBudget = (index) => {
//     setEditingBudget(null);
//     // Implement API call to update the budget for a specific category
//   };

//   const handleCategoryChange = (event) => {
//     setSelectedCategory(event.target.value);
//   };

//   const handleNewBudgetAmountChange = (event) => {
//     setNewBudgetAmount(event.target.value);
//   };

//   const handleAddBudget = () => {
//     if (selectedCategory && newBudgetAmount) {
//       setBudgets([...budgets, newBudgetAmount]);
//       setSelectedCategory("");
//       setNewBudgetAmount("");
//     }
//   };

//   return (
//     <div>
//       <h2>Budgets</h2>
//       <div>
//         <select value={selectedCategory} onChange={handleCategoryChange}>
//           <option value="">Select a Category</option>
//           {categories.map((category, index) => (
//             <option key={index} value={category}>
//               {category}
//             </option>
//           ))}
//         </select>
//         <input
//           type="number"
//           placeholder="Budget Amount"
//           value={newBudgetAmount}
//           onChange={handleNewBudgetAmountChange}
//         />
//         <button onClick={handleAddBudget}>Add Budget</button>
//       </div>
//       <ul>
//         {budgets.map((budget, index) => (
//           <li key={index}>
//             {editingBudget === index ? (
//               <input
//                 type="number"
//                 value={budget}
//                 onChange={(event) => handleBudgetChange(index, event)}
//               />
//             ) : (
//               <span>{budget}</span>
//             )}
//             {editingBudget !== index ? (
//               <button onClick={() => handleEditBudget(index)}>Edit</button>
//             ) : (
//               <button onClick={() => handleSaveBudget(index)}>Save</button>
//             )}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default BudgetComponent;
import React, { useState } from "react";

const BudgetComponent = () => {
  const sampleCategories = ["Groceries", "Utilities", "Entertainment", "Other"];
  const [budgets, setBudgets] = useState([
    { category: "Groceries", amount: 200 },
    { category: "Utilities", amount: 150 },
    { category: "Entertainment", amount: 100 },
    { category: "Other", amount: 50 },
  ]);
  const [editingBudget, setEditingBudget] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [newBudgetAmount, setNewBudgetAmount] = useState("");

  const handleBudgetChange = (index, event) => {
    const updatedBudgets = [...budgets];
    updatedBudgets[index].amount = event.target.value;
    setBudgets(updatedBudgets);
  };

  const handleEditBudget = (index) => {
    setEditingBudget(index);
  };

  const handleSaveBudget = (index) => {
    setEditingBudget(null);
    // Implement API call to update the budget for a specific category
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleNewBudgetAmountChange = (event) => {
    setNewBudgetAmount(event.target.value);
  };

  const handleAddBudget = () => {
    if (selectedCategory && newBudgetAmount) {
      setBudgets([
        ...budgets,
        { category: selectedCategory, amount: newBudgetAmount },
      ]);
      setSelectedCategory("");
      setNewBudgetAmount("");
    }
  };

  return (
    <div>
      <h2>Budgets</h2>
      <div>
        <select value={selectedCategory} onChange={handleCategoryChange}>
          <option value="">Select a Category</option>
          {sampleCategories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Budget Amount"
          value={newBudgetAmount}
          onChange={handleNewBudgetAmountChange}
        />
        <button onClick={handleAddBudget}>Add Budget</button>
      </div>
      <ul>
        {budgets.map((budget, index) => (
          <li key={index}>
            {editingBudget === index ? (
              <input
                type="number"
                value={budget.amount}
                onChange={(event) => handleBudgetChange(index, event)}
              />
            ) : (
              <span>
                Budget for {budget.category} is currently set to {budget.amount}
              </span>
            )}
            {editingBudget !== index ? (
              <button onClick={() => handleEditBudget(index)}>Edit</button>
            ) : (
              <button onClick={() => handleSaveBudget(index)}>Save</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BudgetComponent;
