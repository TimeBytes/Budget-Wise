import { useQuery, useMutation } from "@apollo/client";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import {
  FormCheck,
  FormGroup,
  FormLabel,
  FormSelect,
  Alert,
} from "react-bootstrap";
import {
  QUERY_CATEGORY_BY_TYPE,
  QUERY_USER,
  QUERY_ALL_BUDGET,
} from "../utils/queries";
import { ADD_INCOME, ADD_EXPENSE } from "../utils/mutations";
import { Button } from "@chakra-ui/react";

const TransactionComponent = ({ type, refetchQueries }) => {
  const { data, refetch } = useQuery(QUERY_CATEGORY_BY_TYPE, {
    variables: { type },
    refetchQueries: [{ query: QUERY_CATEGORY_BY_TYPE }],
  });
  const categories = data?.categoryByType || [];
  const [successMessage, setSuccessMessage] = useState("");
  const successMessageDuration = 3000; // Duration in milliseconds (3 seconds)
  const [selectedCategory, setSelectedCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [dateOfTransaction, setDateOfTransaction] = useState("");
  const [recurring, setRecurring] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [addIncome] = useMutation(ADD_INCOME);
  const [addExpense] = useMutation(ADD_EXPENSE);

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

  const handleTransactionSubmit = async () => {
    if (!selectedCategory || !amount || !dateOfTransaction) {
      setShowWarning(true);
      return;
    }

    setShowWarning(false);

    const transactionVariables = {
      category: selectedCategory,
      amount: parseFloat(amount),
      name: description,
      date: dateOfTransaction,
      isRecurring: recurring || false,
    };

    try {
      if (type === "Income") {
        await addIncome(
          { variables: transactionVariables },
          {
            refetchQueries: [
              { query: QUERY_USER },
              { query: QUERY_ALL_BUDGET },
            ],
          }
        );
      } else {
        await addExpense(
          { variables: transactionVariables },
          { refetchQueries: [{ query: QUERY_USER }] }
        );
      }

      // Show success message
      setSuccessMessage(
        `${type === "Income" ? "Income" : "Expense"} added successfully!`
      );
      refetchQueries.refetch();
      setSelectedCategory("");
      setAmount("");
      setDescription("");
      setDateOfTransaction("");
      setRecurring(false);
    } catch (error) {
      console.error(error);
      // Handle error and show appropriate message to the user
      setSuccessMessage("An error occurred. Please try again later.");
    }
  };

  useEffect(() => {
    refetch();
  }, [successMessage, type]);

  return (
    <div className="d-flex flex-column mt-4 ">
      {/* Display success message if available */}

      <h2 className="my-2 display-5 text-center">
        Add New {type === "Income" ? "Income" : "Expense"}
      </h2>
      {showWarning && (
        <p style={{ color: "red" }}>Please fill in all required fields.</p>
      )}

      <FormGroup>
        <FormLabel>Category:</FormLabel>
        <FormSelect value={selectedCategory} onChange={handleCategoryChange}>
          <option value="">Select a Category</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </FormSelect>
      </FormGroup>

      <FormGroup>
        <FormLabel>Amount:</FormLabel>
        <input
          type="number"
          className="form-control"
          placeholder="Amount"
          value={amount}
          onChange={handleAmountChange}
        />
      </FormGroup>

      <FormGroup>
        <FormLabel>Description:</FormLabel>
        <input
          type="text"
          className="form-control"
          placeholder="Description"
          value={description}
          onChange={handleDescriptionChange}
        />
      </FormGroup>

      <FormGroup>
        <FormLabel>
          Date of {type === "Income" ? "Income" : "Expense"}:
        </FormLabel>
        <input
          type="date"
          className="form-control"
          value={dateOfTransaction}
          onChange={handleDateChange}
        />
      </FormGroup>

      <FormGroup className="my-3">
        <FormCheck
          type="checkbox"
          label="Recurring"
          checked={recurring}
          onChange={handleRecurringChange}
        />
      </FormGroup>

      <Button
        className="m-auto"
        onClick={() => {
          handleTransactionSubmit();
        }}
        bg={"blue.600"}
        color={"white"}
        _hover={{
          bg: "blue.700",
        }}
        minWidth="200px"
      >
        Add {type === "Income" ? "Income" : "Expense"}
      </Button>
      {successMessage && (
        <Alert
          variant="success"
          className="mt-3 m-auto text-center w-100"
          style={{ maxWidth: "300px" }}
        >
          {successMessage}
        </Alert>
      )}
    </div>
  );
};

export default TransactionComponent;
