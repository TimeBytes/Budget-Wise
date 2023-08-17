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
import { useLazyQuery, useQuery, useMutation } from "@apollo/client";
import { QUERY_ALL_BUDGET, QUERY_CATEGORY_BY_TYPE } from "../utils/queries";
import { ADD_BUDGET } from "../utils/mutations";

const BudgetComponent = () => {
  const [budgets, setBudgets] = useState([]);

  // Queries the Categories for the dropdown
  const queryCategoryList = useQuery(QUERY_CATEGORY_BY_TYPE, {
    variables: { type: "budget" },
  });
  const categoriesList = queryCategoryList?.data?.categoryByType || [];
  console.log(categoriesList);

  // Queries the Budgets for the list
  const { loading, error, data } = useQuery(QUERY_ALL_BUDGET);
  console.log(data);
  const budgetList = data?.allBudgets || [];
  console.log(budgetList);

  const [editingBudget, setEditingBudget] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [newBudgetAmount, setNewBudgetAmount] = useState("");

  const [addBudget] = useMutation(ADD_BUDGET, {
    variables: { category: selectedCategory, amount: newBudgetAmount },
  });

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
    setNewBudgetAmount(parseFloat(event.target.value));
  };

  const handleAddBudget = () => {
    if (selectedCategory && newBudgetAmount) {
      addBudget();
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
            {categoriesList.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
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
        {budgetList.map((budget, index) => (
          <ListGroup.Item
            key={index}
            className="my-4 d-flex justify-content-between"
          >
            {editingBudget === index ? (
              <InputGroup>
                <FormControl
                  type="number"
                  value={editingBudget}
                  onChange={(event) => handleBudgetChange(index, event)}
                />
              </InputGroup>
            ) : (
              <span className="m-2">
                Budget for {budget.name} is currently set to ${budget.amount}
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
