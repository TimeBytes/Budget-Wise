import { useMutation, useQuery } from "@apollo/client";
import { Button } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import {
  Alert,
  FormControl,
  FormGroup,
  FormSelect,
  InputGroup,
  ListGroup,
} from "react-bootstrap";
import { ADD_BUDGET } from "../utils/mutations";
import { QUERY_ALL_BUDGET, QUERY_CATEGORY_BY_TYPE } from "../utils/queries";

const BudgetComponent = () => {
  const [budgets, setBudgets] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const successMessageDuration = 3000; // Duration in milliseconds (3 seconds)
  // Queries the Categories for the dropdown
  const queryCategoryList = useQuery(QUERY_CATEGORY_BY_TYPE, {
    variables: { type: "Budget" },
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
    queryCategoryList.refetch({
      variables: { type: "Budget" },
    });
  }, []);

  useEffect(() => {
    refetch();
  }, [successMessage]);

  const handleBudgetChange = (index, event) => {
    const updatedBudgets = [...budgets];
    updatedBudgets[index].amount = event.target.value;
    setBudgets(updatedBudgets);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleNewBudgetAmountChange = (event) => {
    setNewBudgetAmount(parseFloat(event.target.value));
  };

  const handleAddBudget = async () => {
    try {
      if (selectedCategory && newBudgetAmount) {
        await addBudget();
        setSelectedCategory("");
        setNewBudgetAmount("");
        setSuccessMessage("Budget added successfully!");
      }
    } catch (error) {
      console.error(error);
      setSuccessMessage("An error occurred. Please try again later.");
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
          <FormControl
            type="number"
            placeholder="Budget Amount"
            value={newBudgetAmount}
            onChange={handleNewBudgetAmountChange}
          />
          <Button
            onClick={handleAddBudget}
            className="m-auto"
            bg={"blue.600"}
            color={"white"}
            _hover={{
              bg: "blue.700",
            }}
            minWidth="200px"
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
      <ListGroup className="list-unstyled px-2 my-2 py-2">
        {budgetList.map((budget, index) => (
          <li
            key={index}
            className="my-4 d-flex justify-content-center border border rounded-2 p-3 bg"
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
          </li>
        ))}
      </ListGroup>
    </div>
  );
};

export default BudgetComponent;
