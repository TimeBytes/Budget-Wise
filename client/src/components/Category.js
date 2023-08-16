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
} from "../utils/mutations";
import { QUERY_ALL_CATEGORIES } from "../utils/queries";

const CategoryComponent = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");

  // Queries all existing categories
  const { loading, error, data } = useQuery(QUERY_ALL_CATEGORIES);
  const categoryList = data?.allCategories || [];

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

  return (
    <div className="m-auto">
      <div>
        <FormGroup className="d-flex flex-wrap justify-content-center border border-info rounded-2 p-3 bg-info">
          <input
            type="text"
            placeholder="Category Name"
            value={newCategory}
            onChange={handleNewCategoryChange}
          />
          <Button onClick={handleAddCategory} className="mx-3">
            Add Category
          </Button>
        </FormGroup>
      </div>
      <ListGroup className="list-unstyled bg-info rounded-2 px-2 my-2 py-2">
        {categoryList.map((category) => (
          <ListGroup.Item key={category._id} className="my-4 d-flex justify-content-between">
            <span className="m-2">
              {category.name}
            </span>
            <div>
              <Button variant="danger" onClick={() => handleDeleteCategory(category._id)}>
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
