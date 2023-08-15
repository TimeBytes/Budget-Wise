import React, { useState } from "react";
import { useLazyQuery } from "@apollo/client";
import {QUERY_ALL_CATEGORIES} from "../utils/queries";
import {
  Button,
  InputGroup,
  FormControl,
  ListGroup,
  Form,
} from 'react-bootstrap';

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
    <div className="m-auto border border-dark border-2 p-3">
      <div className="mb-3">
        <Form.Select
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          <option value="">Select a Category</option>
          {sampleCategories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </Form.Select>
        <InputGroup className="mb-3">
          <FormControl
            type="number"
            placeholder="Budget Amount"
            value={newBudgetAmount}
            onChange={handleNewBudgetAmountChange}
          />
          <Button variant="primary" onClick={handleAddBudget}>
            Add Budget
          </Button>
        </InputGroup>
      </div>
      <ListGroup className="mt-4">
        {budgets.map((budget, index) => (
          <ListGroup.Item key={index} className="mb-3">
            {editingBudget === index ? (
              <InputGroup>
                <FormControl
                  type="number"
                  value={budget.amount}
                  onChange={(event) => handleBudgetChange(index, event)}
                />
              </InputGroup>
            ) : (
              <p>
                Budget for {budget.category} is currently set to {budget.amount}
              </p>
            )}
            {editingBudget !== index ? (
              <Button
                variant="secondary"
                onClick={() => handleEditBudget(index)}
              >
                Edit
              </Button>
            ) : (
              <Button
                variant="primary"
                onClick={() => handleSaveBudget(index)}
              >
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
