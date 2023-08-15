import React, { useState, useEffect } from "react";
import Budget from "../components/Budget";
import Transaction from "../components/Transaction";
import Overview from "../components/Overview";
import Category from "../components/Category";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";

const Dashboard = () => {
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
      <div className="d-flex justify-content-around">
        <div className="w-25 border border-info border-2 p-3">
          <h1 className="text-center display-1 my-2 border border-info rounded-3 pb-2 bg-info bg-gradient">
            Transactions
          </h1>
          <nav className="d-flex justify-content-around">
            <Button className="btn" onClick={handleTransactionTab}>
              Income
            </Button>
            <Button className="btn" onClick={handleTransactionTab}>
              Expense
            </Button>
          </nav>
          <Transaction type={transaction} />
        </div>
        <section className="w-25 border border-info border-2 p-3">
          <h1 className="text-center display-1 my-2 border border-info rounded-3 pb-2 bg-info bg-gradient">
            Budgets
          </h1>
          <Budget />
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
