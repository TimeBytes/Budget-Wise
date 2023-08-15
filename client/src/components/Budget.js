import React, { useState } from "react";
import {
  Button,
  FormGroup,
  FormLabel,
  FormSelect,
  FormCheck,
  ListGroup,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import { useLazyQuery } from "@apollo/client";
import { QUERY_ALL_CATEGORIES } from "../utils/queries";

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
    <div className="m-auto">
      <div>
        <FormGroup className="d-flex flex-wrap justify-content-center border border-info rounded-2 p-3 bg-info">
          <FormSelect
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="my-2"
          >
            <option value="">Select a Category</option>
            {sampleCategories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </FormSelect>
          <input
            type="number"
            placeholder="Budget Amount"
            value={newBudgetAmount}
            onChange={handleNewBudgetAmountChange}
          />
          <Button onClick={handleAddBudget} className="mx-3">
            Add Budget
          </Button>
        </FormGroup>
      </div>
      <ListGroup className="list-unstyled bg-info rounded-2 px-2 my-2 py-2">
        {budgets.map((budget, index) => (
          <ListGroup.Item
            key={index}
            className="my-4 d-flex justify-content-between"
          >
            {editingBudget === index ? (
              <InputGroup>
                <FormControl
                  type="number"
                  value={budget.amount}
                  onChange={(event) => handleBudgetChange(index, event)}
                />
              </InputGroup>
            ) : (
              <span className="m-2">
                Budget for {budget.category} is currently set to {budget.amount}
              </span>
            )}
            {editingBudget !== index ? (
              <Button
                variant="secondary"
                onClick={() => handleEditBudget(index)}
              >
                Edit
              </Button>
            ) : (
              <Button variant="primary" onClick={() => handleSaveBudget(index)}>
                Save
              </Button>
            )}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default BudgetComponent;
