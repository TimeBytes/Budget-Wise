import React, { useState, useEffect } from "react";
import Budget from "./Budget";
import Transaction from "../pages/Transaction";
import Overview from "../pages/Overview";
import Category from "./Category";
import "bootstrap/dist/css/bootstrap.css";

const Profile = () => {
  const [transaction, setTransaction] = useState("Income");
  const handleTransactionTab = (event) => {
    setTransaction(event.target.textContent);
  };
  useEffect(() => {
    console.log(transaction);
  }, [transaction]);

  return (
    <div className="d-flex justify-content-around">
      <Overview />
      <div>
        <nav className="d-flex justify-content-between">
          <button className="btn" onClick={handleTransactionTab}>
            Income
          </button>
          <button className="btn" onClick={handleTransactionTab}>
            Expense
          </button>
        </nav>
        <Transaction type={transaction} />
      </div>
      <Budget />
    </div>
  );
};

export default Profile;
