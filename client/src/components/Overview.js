import React, { useState, useEffect } from "react";
import { Bar, Pie } from "react-chartjs-2";
import Chart from "chart.js/auto";
import "bootstrap/dist/css/bootstrap.css";
import Card from "react-bootstrap/Card";
import { Container, Row, Col } from "react-bootstrap";
import { from } from "@apollo/client";
import { useQuery } from "@apollo/client";
import {
  QUERY_USER,
  QUERY_INCOME_BY_CATEGORY,
  QUERY_EXPENSE_BY_CATEGORY,
  QUERY_ALL_INCOME,
} from "../utils/queries";

const OverviewComponent = (props) => {
  console.log(props);
  const chartData = {
    datasets: [
      {
        label: "Income",
        data: props.props.income,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
      {
        label: "Expenses",
        data: props.props.expense,
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
      {
        label: "Net Income",
        data: props.props.difference,
        backgroundColor: "rgba(255, 206, 86, 0.2)",
        borderColor: "rgba(255, 206, 86, 1)",
        borderWidth: 1,
      },
    ],
  };

  // const allIncomeRaw = useQuery(QUERY_ALL_INCOME);
  // const allIncomeData = allIncomeRaw?.data || [];
  // const allIncomeList = allIncomeData?.allIncomes || [];
  // console.log(allIncomeList);
  // const listOfCategoryIDs = allIncomeList.map((income) => {
  //   return income.category._id;
  // });

  // console.log(userData?.user?.incomes);
  // const incomeCategory = useQuery(QUERY_INCOME_BY_CATEGORY, {
  //   variables: { categoryID: "60f9b0b0f0f0f0f0f0f0f0f0" },
  // });
  // const incomeCategoryData = incomeCategory?.data || [];
  // const expenseCategory = useQuery(QUERY_EXPENSE_BY_CATEGORY);
  // const expenseCategoryData = expenseCategory?.data || [];
  // console.log(incomeCategoryData);
  // console.log(expenseCategoryData);

  // useEffect(() => {
  //   incomeCategory.refetch();
  // });

  // useEffect(() => {
  //   expenseCategory.refetch();
  // });

  const incomeCategories = ["Salary", "Freelance", "Investments", "Other"];
  const expenseCategories = ["Rent", "Groceries", "Utilities", "Entertainment"];

  const pieIncomeData = {
    labels: incomeCategories,
    datasets: [
      {
        data: [30, 25, 15, 20], // Sample data for income categories
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#33cc33"],
      },
    ],
  };

  const pieExpenseData = {
    labels: expenseCategories,
    datasets: [
      {
        data: [30, 25, 15, 20], // Sample data for expense categories
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#33cc33"],
      },
    ],
  };

  const borderRight = {
    borderRight: "1px solid rgb(222,226,230)",
  };
  const chartOptions = {
    scales: {
      x: {
        type: "category",
        title: {
          display: true,
          text: "Month",
        },
      },
    },
    maintainAspectRatio: true,
  };

  return (
    <Container className="mt-4 col-12">
      <h1
        className="display-2 text-center my-4"
        style={{ fontFamily: "Titan One", color: "#037390" }}
      >
        Dashboard
      </h1>
      <Row className="justify-content-around">
        <Container className=" border col-10">
          <Col className="mb-4 ">
            <div className=" p-3">
              <h3 className="display-5 text-center mb-3">Income vs Expenses</h3>
              <Bar data={chartData} options={chartOptions} />
            </div>
          </Col>
          <Container className=" d-flex border-top pt-3">
            <Col className="mb-4 col-6" style={borderRight}>
              <div className=" m-1 ">
                <h3 className="display-5 text-center mb-3 ">
                  Income Distribution
                </h3>
                <Pie data={pieIncomeData} />
              </div>
            </Col>
            <Col className="mb-4 col-6">
              <div className=" m-1">
                <h3 className="display-5 text-center mb-3">
                  Expense Distribution
                </h3>
                <Pie data={pieExpenseData} />
              </div>
            </Col>
          </Container>
        </Container>
      </Row>
    </Container>
  );
};

export default OverviewComponent;
