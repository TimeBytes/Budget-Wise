import React, { useEffect, useState } from "react";

import { useMutation, useQuery } from "@apollo/client";
import { Button } from "@chakra-ui/react";
import { Alert, FormCheck, FormGroup, ListGroup } from "react-bootstrap";
import { ADD_CATEGORY, REMOVE_CATEGORY } from "../utils/mutations";
import { QUERY_ALL_CATEGORIES, QUERY_CATEGORY_BY_TYPE } from "../utils/queries";

const CategoryComponent = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [isIncome, setIsIncome] = useState(false);
  const [isExpense, setIsExpense] = useState(false);
  const [isBudget, setIsBudget] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const successMessageDuration = 3000;
  // Queries all existing categories
  const { data } = useQuery(QUERY_ALL_CATEGORIES);
  const categoryList = data?.allCategories || [];

  const handleIsIncome = () => {
    setIsIncome(!isIncome);
  };
  const handleIsExpense = () => {
    setIsExpense(!isExpense);
  };
  const handleIsBudget = () => {
    setIsBudget(!isBudget);
  };
  const [addCategory] = useMutation(ADD_CATEGORY);

  const [deleteCategory] = useMutation(REMOVE_CATEGORY);

  const handleNewCategoryChange = (event) => {
    setNewCategory(event.target.value);
  };
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

  const handleAddCategory = () => {
    if (newCategory) {
      addCategory({
        variables: {
          name: newCategory,
          isIncome: isIncome,
          isExpense: isExpense,
          isBudget: isBudget,
        },
        refetchQueries: [
          { query: QUERY_ALL_CATEGORIES },
          { query: QUERY_CATEGORY_BY_TYPE, variables: { type: "Income" } },
        ],
      });
      setCategories([
        ...categories,
        {
          name: newCategory,
          isIncome: isIncome,
          isExpense: isExpense,
          isBudget: isBudget,
        },
      ]);
      setNewCategory("");
      setIsIncome(false);
      setIsExpense(false);
      setIsBudget(false);
      setSuccessMessage("Category added successfully!");
    }
  };

  const handleDeleteCategory = (categoryId) => {
    deleteCategory({
      variables: {
        category: categoryId,
      },
      refetchQueries: [{ query: QUERY_ALL_CATEGORIES }],
    });
  };

  return (
    <div className="m-auto col-10 my-5 border" style={{ fontWeight: "bold" }}>
      <div className="border-bottom">
        <h2
          className="display-5 text-center"
          style={{ fontFamily: "Titan One", color: "#037390" }}
        >
          Customize Your Categories
        </h2>
        {successMessage && (
          <Alert
            variant="success"
            className="mt-3 text-center m-auto w-100"
            style={{ maxWidth: "300px" }}
          >
            {successMessage}
          </Alert>
        )}
        <FormGroup className="mt-5 d-flex flex-column align-content-center flex-wrap p-3 bg">
          <div>
            <input
              type="text"
              placeholder="Category Name"
              value={newCategory}
              onChange={handleNewCategoryChange}
              style={{
                fontWeight: "bold",
                borderColor: "#037390",
                borderWidth: "1px",
              }}
            />
            <Button
              onClick={handleAddCategory}
              className="mx-3"
              bg={"blue.600"}
              color={"white"}
              _hover={{
                bg: "blue.700",
              }}
            >
              Add Category
            </Button>
          </div>
          <div className="m-auto">
            <FormGroup className="m-3">
              <FormCheck
                type="checkbox"
                label="Add as Income"
                checked={isIncome}
                onChange={handleIsIncome}
              />
            </FormGroup>
            <FormGroup className="m-3">
              <FormCheck
                type="checkbox"
                label="Add as Expense"
                checked={isExpense}
                onChange={handleIsExpense}
              />
            </FormGroup>
            <FormGroup className="m-3">
              <FormCheck
                type="checkbox"
                label="Add as Budget"
                checked={isBudget}
                onChange={handleIsBudget}
              />
            </FormGroup>
          </div>
        </FormGroup>
      </div>
      <ListGroup className="list-unstyled px-2 my-2 py-2 d-flex flex-row flex-wrap justify-content-center">
        {categoryList.map((category) => (
          <li
            key={category._id}
            className="my-4 d-flex justify-content-between border d-flex flex-column col-3 align-items-center"
          >
            <span className="m-2">
              Category: {category.name}
              <br />
              Income: {category.isIncome ? "Yes" : "No"}
              <br />
              Expense: {category.isExpense ? "Yes" : "No"}
              <br />
              Budget: {category.isBudget ? "Yes" : "No"}
            </span>
            <Button
              value={category._id}
              onClick={() => handleDeleteCategory(category._id)}
              bg={"blue.600"}
              color={"white"}
              _hover={{
                bg: "blue.700",
              }}
              className="mx-5 my-2"
            >
              Delete
            </Button>
          </li>
        ))}
      </ListGroup>
    </div>
  );
};

export default CategoryComponent;
