import React, { useState } from "react";
import { gql } from "@apollo/client";
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
import { useMutation, useQuery } from "@apollo/client";
import {
  ADD_CATEGORY,
  REMOVE_CATEGORY,
  EDIT_CATEGORY,
} from "../utils/mutations";
import { QUERY_ALL_CATEGORIES } from "../utils/queries";

const CategoryComponent = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [isIncome, setIsIncome] = useState(false);
  const [isExpense, setIsExpense] = useState(false);
  const [isBudget, setIsBudget] = useState(false);
  // Queries all existing categories
  const { loading, error, data } = useQuery(QUERY_ALL_CATEGORIES);
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
  const [addCategory] = useMutation(ADD_CATEGORY, {
    update(cache, { data: { addCategory } }) {
      // Update the cache with the new category
      cache.modify({
        fields: {
          allCategories(existingCategories = []) {
            const newCategoryRef = cache.writeFragment({
              data: addCategory,
              fragment: gql`
                fragment NewCategory on Category {
                  _id
                  name
                }
              `,
            });
            return [...existingCategories, newCategoryRef];
          },
        },
      });
    },
  });

  const [deleteCategory] = useMutation(REMOVE_CATEGORY, {
    update(cache, { data: { deleteCategory } }) {
      // Remove the deleted category from the cache
      cache.modify({
        fields: {
          allCategories(existingCategories = []) {
            return existingCategories.filter(
              (category) => category._id !== deleteCategory._id
            );
          },
        },
      });
    },
  });

  const [editCategory] = useMutation(EDIT_CATEGORY, {
    update(cache, { data: { editCategory } }) {
      // Update the cache with the new category
      cache.modify({
        fields: {
          allCategories(existingCategories = []) {
            const newCategoryRef = cache.writeFragment({
              data: editCategory,
              fragment: gql`
                fragment NewCategory on Category {
                  _id
                  name
                }
              `,
            });
            return [...existingCategories, newCategoryRef];
          },
        },
      });
    },
  });

  const handleNewCategoryChange = (event) => {
    setNewCategory(event.target.value);
  };

  const handleAddCategory = () => {
    if (newCategory) {
      addCategory({
        variables: {
          name: newCategory,
        },
      });
      setNewCategory("");
    }
  };

  const handleDeleteCategory = (categoryId) => {
    deleteCategory({
      variables: {
        id: categoryId,
      },
    });
  };
  const handleEditCategory = (categoryId) => {
    editCategory({
      variables: {
        id: categoryId,
      },
    });
  };

  return (
    <div className="m-auto">
      <div>
        <h2 className="display-5 text-center bg-info">
          Here you can customize the name of the Categories and which dropdown
          to include it into.
        </h2>
        <FormGroup className="d-flex flex-column align-content-center flex-wrap border border-info rounded-2 p-3 bg-info">
          <div>
            <input
              type="text"
              placeholder="Category Name"
              value={newCategory}
              onChange={handleNewCategoryChange}
            />
            <Button onClick={handleAddCategory} className="mx-3">
              Add Category
            </Button>
          </div>
          <div>
            <FormGroup className="m-3">
              <FormCheck
                type="checkbox"
                label="Add as income"
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
      <ListGroup className="list-unstyled bg-info rounded-2 px-2 my-2 py-2">
        {categoryList.map((category) => (
          <ListGroup.Item
            key={category._id}
            className="my-4 d-flex justify-content-between"
          >
            <span className="m-2">
              Category: {category.name}
              <br />
              Is an income: {category.isIncome.toString()}
              <br />
              Is an expense: {category.isExpense.toString()}
              <br />
              Is a Budget: {category.isBudget.toString()}
            </span>

            <div>
              <Button
                variant="secondary"
                onClick={() => handleEditCategory(category._id)}
              >
                Edit
              </Button>
              <Button
                variant="danger"
                onClick={() => handleDeleteCategory(category._id)}
              >
                Delete
              </Button>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default CategoryComponent;
