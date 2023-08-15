import React, { useState } from "react";
import { useLazyQuery, useQuery, useMutation } from "@apollo/client";
import {
  QUERY_ALL_CATEGORIES,
  QUERY_USER,
  UPDATE_USER,
} from "../utils/queries";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import { FormGroup, FormLabel, FormSelect, FormCheck } from "react-bootstrap";

const CategoryComponent = () => {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [checked, setChecked] = useState(false);
  const [categoryList, setCategoryList] = useState([]);
  const [getCategories, { loading, data }] = useLazyQuery(QUERY_ALL_CATEGORIES);
  const { data: userData } = useQuery(QUERY_USER);
  // const [updateUser] = useMutation(UPDATE_USER);

  // const handleFormSubmit = async (event) => {
  //   event.preventDefault();
  //   try {
  //     const mutationResponse = await updateUser({
  //       variables: {
  //         categories: categoryList,
  //       },
  //     });
  //     console.log(mutationResponse);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  const handleChange = (event) => {
    const { value } = event.target;
    setCategory(value);
    setCategoryList([...categoryList, value]);
    console.log(categoryList);
  };

  const handleCheck = (event) => {
    const { checked } = event.target;
    setChecked(checked);
    console.log(checked);
  };

  const handleGetCategories = async () => {
    try {
      const { data } = await getCategories();
      const categoryData = data.categories;
      setCategories(categoryData);
    } catch (e) {
      console.log(e);
    }
  };
  {
    /* <form onSubmit={handleFormSubmit}></form> */
  }
  return (
    <div>
      <form>
        <FormGroup>
          <FormLabel>Categories</FormLabel>
          <FormSelect onChange={handleChange}>
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </FormSelect>
        </FormGroup>
        <FormGroup>
          <FormCheck
            type="checkbox"
            label="I'm done selecting categories"
            onChange={handleCheck}
          />
        </FormGroup>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CategoryComponent;
