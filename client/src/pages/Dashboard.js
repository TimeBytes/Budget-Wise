import { useQuery } from "@apollo/client";
import { Button } from "@chakra-ui/react";
import "bootstrap/dist/css/bootstrap.css";
import React, { useState } from "react";
import Budget from "../components/Budget";
import Overview from "../components/Overview";
import Transaction from "../components/Transaction";
import { QUERY_USER } from "../utils/queries";

const Dashboard = () => {
  const [transaction, setTransaction] = useState("Income");
  const handleTransactionTab = (event) => {
    setTransaction(event.target.textContent);
  };
  const user = useQuery(QUERY_USER);

  if (user.loading) {
    return <div className="text-center display-5 vh-100">Loading...</div>;
  }

  const categoryData = user.data?.user?.categories;
  const incomes = user.data?.user?.incomes;
  const Expenses = user.data?.user?.expenses;
  const groupedIncome = {};
  const categoryMap = {};

  categoryData.forEach((category) => {
    categoryMap[category._id] = category.name;
  });
  // Iterate through each income item
  incomes.forEach((income) => {
    const categoryID = income.category._id;
    const categoryName = categoryMap[categoryID];

    if (!groupedIncome[categoryName]) {
      groupedIncome[categoryName] = 0;
    }

    groupedIncome[categoryName] += income.amount;
  });
  const groupedExpense = {};
  // Iterate through each income item
  Expenses.forEach((expense) => {
    const categoryID = expense.category._id;
    const categoryName = categoryMap[categoryID];

    if (!groupedExpense[categoryName]) {
      groupedExpense[categoryName] = 0;
    }

    groupedExpense[categoryName] += expense.amount;
  });

  // console.log(user.data?.user?.expenses);

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

  return (
    <div className="d-flex flex-column justify-content-around">
      <Overview
        props={{
          incomeData,
          expenseData,
          differenceData,
          groupedIncome,
          groupedExpense,
        }}
      />
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
          <Transaction type={transaction} refetchQueries={user} />
        </div>
        <span className="border-top border-black my-5 d-lg-none"></span>
        <span className="border-start my-5 d-none d-lg-block"></span>
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
