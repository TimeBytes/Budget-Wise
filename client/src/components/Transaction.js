// import { useQuery, useMutation } from "@apollo/client";
// import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
// import React, { useState, useEffect } from "react";
// import { FormCheck, FormGroup, FormLabel, FormSelect } from "react-bootstrap"; // Import Bootstrap components
// import { QUERY_USER,QUERY_CATEGORY_BY_TYPE} from "../utils/queries";
// import { ADD_INCOME, ADD_EXPENSE } from "../utils/mutations";

// const TransactionComponent = ({ type }) => {
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [amount, setAmount] = useState("");
//   const [description, setDescription] = useState("");
//   const [dateOfTransaction, setDateOfTransaction] = useState("");
//   const [recurring, setRecurring] = useState(false);
//   const [showWarning, setShowWarning] = useState(false); // State for showing warning
//   const [addIncome, { errorIncome }] = useMutation(ADD_INCOME);
//   const [addExpense, { errorExpense }] = useMutation(ADD_EXPENSE);
//   const { loading, error, data } = useQuery(QUERY_CATEGORY_BY_TYPE, {
//     variables: { type },
//   });
//   const categories = data?.categoryByType || [];

//   const handleCategoryChange = (event) => {
//     setSelectedCategory(event.target.value);
//   };

//   const handleAmountChange = (event) => {
//     setAmount(event.target.value);
//   };

//   const handleDescriptionChange = (event) => {
//     setDescription(event.target.value);
//   };

//   const handleDateChange = (event) => {
//     setDateOfTransaction(event.target.value);
//   };

//   const handleRecurringChange = () => {
//     setRecurring(!recurring);
//   };

//   const handleTransactionSubmit = () => {
//     if (!selectedCategory || !amount || !dateOfTransaction) {
//       // Show warning if any required fields are empty
//       setShowWarning(true);
//       return;
//     }

//     // Clear warning if all required fields are filled
//     setShowWarning(false);

//     // Implement API call to submit the transaction data to the backend
//     if (type === "Income") {
//       addIncome({
//         variables: {
//           category: selectedCategory,
//           amount: parseFloat(amount),
//           description,
//           date: dateOfTransaction,
//           recurring,
//         },
//       });
//     } else {
//       addExpense({
//         variables: {
//           category: selectedCategory,
//           amount: parseFloat(amount),
//           description,
//           date: dateOfTransaction,
//           recurring,
//         },
//       });
//     }
//   };


//   return (
//     <div className="d-flex flex-column mt-4">
//       <h2 className="my-2 display-5 text-center">
//         Add New {type === "Income" ? "Income" : "Expense"}
//       </h2>
//       {showWarning && (
//         <p style={{ color: "red" }}>Please fill in all required fields.</p>
//       )}

//       <FormGroup>
//         <FormLabel>Category:</FormLabel>
//         <FormSelect value={selectedCategory} onChange={handleCategoryChange}>
//           <option value="">Select a Category</option>
//           {categories.map((category) => (
//             <option key={category._id} value={category._id}>
//               {category.name}
//             </option>
//           ))}
//         </FormSelect>
//       </FormGroup>

//       <FormGroup>
//         <FormLabel>Amount:</FormLabel>
//         <input
//           type="number"
//           className="form-control"
//           placeholder="Amount"
//           value={amount}
//           onChange={handleAmountChange}
//         />
//       </FormGroup>

//       <FormGroup>
//         <FormLabel>Description:</FormLabel>
//         <input
//           type="description"
//           className="form-control"
//           placeholder="Description"
//           value={description}
//           onChange={handleDescriptionChange}
//         />
//       </FormGroup>

//       <FormGroup>
//         <FormLabel>
//           Date of {type === "Income" ? "Income" : "Expense"}:
//         </FormLabel>
//         <input
//           type="date"
//           className="form-control"
//           value={dateOfTransaction}
//           onChange={handleDateChange}
//         />
//       </FormGroup>

//       <FormGroup className="my-3">
//         <FormCheck
//           type="checkbox"
//           label="Recurring"
//           checked={recurring}
//           onChange={handleRecurringChange}
//         />
//       </FormGroup>

//       <button className="btn btn-primary" onClick={handleTransactionSubmit}>
//         Add {type === "Income" ? "Income" : "Expense"}
//       </button>
//     </div>
//   );
// };

// export default TransactionComponent;

import { useQuery, useMutation } from "@apollo/client";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import { FormCheck, FormGroup, FormLabel, FormSelect } from "react-bootstrap";
import { QUERY_CATEGORY_BY_TYPE } from "../utils/queries";
import { ADD_INCOME, ADD_EXPENSE } from "../utils/mutations";

const TransactionComponent = ({ type }) => {
  const { loading, error, data } = useQuery(QUERY_CATEGORY_BY_TYPE, {
    variables: { type },
  });
  const categories = data?.categoryByType || [];

  const [selectedCategory, setSelectedCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [dateOfTransaction, setDateOfTransaction] = useState("");
  const [recurring, setRecurring] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [addIncome, { error: errorIncome }] = useMutation(ADD_INCOME);
  const [addExpense, { error: errorExpense }] = useMutation(ADD_EXPENSE);

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

  const handleTransactionSubmit = () => {
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
    console.log(transactionVariables);

    if (type === "income") {
      addIncome({ variables: transactionVariables });
    } else {
      addExpense({ variables: transactionVariables });
    }
  };

  return (
    <div className="d-flex flex-column mt-4">
      <h2 className="my-2 display-5 text-center">
        Add New {type === "income" ? "income" : "expense"}
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
          Date of {type === "income" ? "income" : "expense"}:
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

      <button className="btn btn-primary" onClick={handleTransactionSubmit}>
        Add {type === "Income" ? "Income" : "Expense"}
      </button>
    </div>
  );
};

export default TransactionComponent;