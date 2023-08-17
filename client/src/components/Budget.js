import React, { useState, useEffect } from "react";
import {
  FormGroup,
  FormLabel,
  FormSelect,
  FormCheck,
  ListGroup,
  InputGroup,
  FormControl,
  Alert,
} from "react-bootstrap";
import { Button } from "@chakra-ui/react";
import { useLazyQuery, useQuery, useMutation } from "@apollo/client";
import { QUERY_ALL_BUDGET, QUERY_CATEGORY_BY_TYPE } from "../utils/queries";
import { ADD_BUDGET } from "../utils/mutations";

const BudgetComponent = () => {
  const [budgets, setBudgets] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const successMessageDuration = 3000; // Duration in milliseconds (3 seconds)
  // Queries the Categories for the dropdown
  const queryCategoryList = useQuery(QUERY_CATEGORY_BY_TYPE, {
    variables: { type: "Budget" },
    refetchQueries: [{ query: QUERY_CATEGORY_BY_TYPE }],
  });
  const categoriesList = queryCategoryList?.data?.categoryByType || [];

  // Queries the Budgets for the list
  const { loading, error, data, refetch } = useQuery(QUERY_ALL_BUDGET);
  const budgetList = data?.allBudgets || [];

  const [editingBudget, setEditingBudget] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [newBudgetAmount, setNewBudgetAmount] = useState("");

  const [addBudget] = useMutation(ADD_BUDGET, {
    variables: { category: selectedCategory, amount: newBudgetAmount },
    refetchQueries: [{ query: QUERY_ALL_BUDGET }],
  });

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage("");
      }, successMessageDuration);

      return () => {
        clearTimeout(timer); // Clear the timer if the component unmounts
      };
    }
  }, [successMessage]);

  useEffect(() => {
    queryCategoryList.refetch();
  }, []);

  useEffect(() => {
    refetch();
  }, [successMessage]);

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

  const handleAddBudget = async () => {
    if (selectedCategory && newBudgetAmount) {
      try {
        await addBudget();
        const updatedBudgets = [...budgets];
        updatedBudgets.push({
          name: selectedCategory,
          amount: newBudgetAmount,
        });
        setBudgets(updatedBudgets);
        setSelectedCategory("");
        setNewBudgetAmount("");
        setSuccessMessage("Budget added successfully!");
      } catch (error) {
        console.error(error);
        setSuccessMessage("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <div className="m-auto">
      <div>
        <FormGroup className="d-flex flex-wrap justify-content-center border border rounded-2 p-3 bg">
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
          <Button
            onClick={handleAddBudget}
            className="mx-3"
            bg={"blue.600"}
            color={"white"}
            _hover={{
              bg: "blue.700",
            }}
          >
            Add Budget
          </Button>
        </FormGroup>
      </div>
      <div className="d-flex justify-content-center">
        {successMessage && (
          <Alert
            variant="success"
            className="mt-3 mx-0 text-center w-100"
            style={{ maxWidth: "300px" }}
          >
            {successMessage}
          </Alert>
        )}
      </div>
      <ListGroup className="list-unstyled bg rounded-2 px-2 my-2 py-2">
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
