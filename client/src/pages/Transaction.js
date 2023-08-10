import React, { useState } from "react";

const TransactionComponent = ({ type }) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [dateOfTransaction, setDateOfTransaction] = useState("");
  const [recurring, setRecurring] = useState(false);
  const [showWarning, setShowWarning] = useState(false); // State for showing warning

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleDateChange = (event) => {
    setDateOfTransaction(event.target.value);
  };

  const handleRecurringChange = () => {
    setRecurring(!recurring);
  };

  const handleTransactionSubmit = () => {
    if (!selectedCategory || !amount || !dateOfTransaction) {
      // Show warning if any required fields are empty
      setShowWarning(true);
      return;
    }

    // Clear warning if all required fields are filled
    setShowWarning(false);

    // Implement API call to submit the transaction data to the backend
  };

  return (
    <div className="d-flex flex-column">
      <h2>Add New {type === "Income" ? "Income" : "Expense"}</h2>
      {showWarning && (
        <p style={{ color: "red" }}>Please fill in all required fields.</p>
      )}
      <label>
        Category:
        <select value={selectedCategory} onChange={handleCategoryChange}>
          <option value="">Select a Category</option>
          {/* Map over your income/expense categories and generate options */}
        </select>
      </label>
      <label>
        Amount:
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={handleAmountChange}
        />
      </label>
      <label>
        Description:
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={handleDescriptionChange}
        />
      </label>
      <label>
        Date of {type === "Income" ? "Income" : "Expense"}:
        <input
          type="date"
          value={dateOfTransaction}
          onChange={handleDateChange}
        />
      </label>
      <label>
        Recurring:
        <input
          type="checkbox"
          checked={recurring}
          onChange={handleRecurringChange}
        />
      </label>
      <button onClick={handleTransactionSubmit}>
        Add {type === "Income" ? "Income" : "Expense"}
      </button>
    </div>
  );
};

export default TransactionComponent;
