import React, { useState, useEffect } from "react";
import Budget from "../components/Budget";
import Transaction from "../components/Transaction";
import Overview from "../components/Overview";
import Category from "../components/Category";
import { Container } from "react-bootstrap";
import { Button } from "@chakra-ui/react";

import "bootstrap/dist/css/bootstrap.css";

const Dashboard = () => {
  const [transaction, setTransaction] = useState("Income");
  const handleTransactionTab = (event) => {
    setTransaction(event.target.textContent);
  };

  return (
    <div className="d-flex flex-column justify-content-around">
      <Overview />
      <div className="border col-10 col-md-8 col-xlg-7 p-3 m-auto my-3 d-flex flex-column flex-lg-row justify-content-between">
        <div className="col-12 col-lg-6 ">
          <h3 className="text-center display-3 my-2 border border rounded-3 pb-2 bg-gradient ">
            Transactions
          </h3>
          <nav className="d-flex justify-content-around">
            <Button
              className="btn"
              onClick={handleTransactionTab}
              bg={"blue.600"}
              color={"white"}
              _hover={{
                bg: "blue.700",
              }}
            >
              Income
            </Button>
            <Button
              className="btn"
              onClick={handleTransactionTab}
              bg={"blue.600"}
              color={"white"}
              _hover={{
                bg: "blue.700",
              }}
            >
              Expense
            </Button>
          </nav>
          <Transaction type={transaction} />
        </div>
        <span className="border-top border-black my-5 d-lg-none"></span>
        <section className="col-12 col-lg-6">
          <h3 className="text-center display-3 my-2 border border rounded-3 pb-2 bg-gradient">
            Budgets
          </h3>
          <Budget />
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
