import React, { useState, useEffect } from "react";
import Budget from "../components/Budget";
import Transaction from "../components/Transaction";
import Overview from "../components/Overview";
import Category from "../components/Category";
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
    <div className="d-flex flex-column justify-content-around">
      <Overview />
      <div>
        <div className="w-25 m-auto">
          <nav className="d-flex justify-content-between">
            <h1 className="text-center display-1">Transactions</h1>
            <button className="btn" onClick={handleTransactionTab}>
              Income
            </button>
            <button className="btn" onClick={handleTransactionTab}>
              Expense
            </button>
          </nav>

          <Transaction type={transaction} />
        </div>
      </div>
      <h1 className="text-center display-1">Budgets</h1>
      <Budget />
    </div>
  );
};

export default Profile;
