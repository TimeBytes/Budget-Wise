import React, { useState, useEffect } from "react";
import Budget from "../components/Budget";
import Transaction from "../components/Transaction";
import Overview from "../components/Overview";
import Category from "../components/Category";
import { Container } from "react-bootstrap";
import { Button } from "@chakra-ui/react";
import { useQuery } from "@apollo/client";
import { QUERY_USER } from "../utils/queries";
import "bootstrap/dist/css/bootstrap.css";
import { set } from "../../../server/models/Category";

const Dashboard = () => {
  const [checkMessage, setCheckMessage] = useState(false);
  const [transaction, setTransaction] = useState("Income");
  const [income, setIncome] = useState([]);
  const [expense, setExpense] = useState([]);
  const [difference, setDifference] = useState([]);
  const handleTransactionTab = (event) => {
    setTransaction(event.target.textContent);
  };
  const user = useQuery(QUERY_USER, {
    refetchQueries: [{ query: QUERY_USER }],
  });
  if (user.loading) {
    return <div className="text-center display-5 vh-100">Loading...</div>;
  }
  console.log(user);
  const userData = user?.data || [];
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let incomeList = [];
  if (userData?.user) {
    incomeList = userData?.user?.incomes.map((userData) => {
      return {
        income: userData.amount,
        month: parseInt(userData.date.split("-")[1]),
      };
    });
  }
  let expenseList = [];
  if (userData?.user) {
    expenseList = userData?.user?.expenses.map((userData) => {
      return {
        expense: userData.amount,
        month: parseInt(userData.date.split("-")[1]),
      };
    });
  }

  const incomeData = {};
  for (const monthName of monthNames) {
    incomeData[monthName] = 0;
  }
  incomeList.forEach((curr) => {
    const monthIndex = curr.month - 1;
    const income = curr.income;
    const monthName = monthNames[monthIndex];
    incomeData[monthName] += income;
  });

  const expenseData = {};
  for (const monthName of monthNames) {
    expenseData[monthName] = 0;
  }
  expenseList.forEach((curr) => {
    const monthIndex = curr.month - 1;
    const expense = curr.expense;
    const monthName = monthNames[monthIndex];
    expenseData[monthName] += expense;
  });

  const differenceData = {};
  for (const monthName in incomeData) {
    if (expenseData.hasOwnProperty(monthName)) {
      differenceData[monthName] =
        incomeData[monthName] - expenseData[monthName];
    } else {
      differenceData[monthName] = incomeData[monthName];
    }
  }

  const refetchUser = async () => {
    setExpense(expenseData);
    setDifference(differenceData);
    setCheckMessage(!checkMessage);
  };
  console.log(incomeData, expenseData, differenceData);

  return (
    <div className="d-flex flex-column justify-content-around">
      <Overview props={{ income, expense, difference }} />
      <div className="border col-10 col-md-12 col-lg-7 p-3 m-auto my-3 d-flex flex-column flex-lg-row align-items-center justify-lg-content-between">
        <div className="col-6">
          <h1 className="text-center display-1 my-2 border border rounded-3 pb-2 bg-gradient ">
            Transactions
          </h1>
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
          <Transaction type={transaction} check={refetchUser} />
        </div>
        <section className="col-6">
          <h1 className="text-center display-1 my-2 border border rounded-3 pb-2 bg-gradient">
            Budgets
          </h1>
          <Budget />
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
