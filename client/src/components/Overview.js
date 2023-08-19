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
import { Tooltip } from "react-tippy";
import "../index.css";

const OverviewComponent = (props) => {
  const [showIncomeOverlay, setShowIncomeOverlay] = useState(false);
  const [showExpenseOverlay, setShowExpenseOverlay] = useState(false);
  const chartData = {
    datasets: [
      {
        label: "Income",
        data: props.props.incomeData,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
      {
        label: "Expenses",
        data: props.props.expenseData,
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
      {
        label: "Net Income",
        data: props.props.differenceData,
        backgroundColor: "rgba(255, 206, 86, 0.2)",
        borderColor: "rgba(255, 206, 86, 1)",
        borderWidth: 1,
      },
    ],
  };

  const incomeCategories = ["Salary", "Freelance", "Investments", "Other"];
  const expenseCategories = ["Rent", "Groceries", "Utilities", "Entertainment"];

  const pieIncomeData = {
    labels: incomeCategories,
    datasets: [
      {
        data: [30, 25, 15, 20], // Sample data for income categories
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#33cc33"],
        onMouseEnter: () => setShowIncomeOverlay(true),
        onMouseLeave: () => setShowIncomeOverlay(false),
      },
    ],
  };

  const pieExpenseData = {
    labels: expenseCategories,
    datasets: [
      {
        data: [30, 25, 15, 20], // Sample data for expense categories
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#33cc33"],
        onMouseEnter: () => setShowExpenseOverlay(true),
        onMouseLeave: () => setShowExpenseOverlay(false),
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
          <Container className=" d-flex flex-column flex-lg-row border-top pt-3 ">
            <Col className="mb-4 col-12 col-lg-6">
              <div className=" m-1">
                <h3 className="display-5 text-center mb-3 ">
                  Income Distribution
                </h3>
                <Tooltip
                  title="Coming Soon"
                  position="top"
                  trigger="mouseenter"
                  size="big"
                >
                  <Pie data={pieIncomeData} className="m-auto" />
                </Tooltip>
              </div>
            </Col>
            <span className="border-top pt-5 d-lg-none"></span>
            <Col className="mb-4 col-12 col-lg-6 ">
              <div className=" m-1">
                <h3 className="display-5 text-center mb-3">
                  Expense Distribution
                </h3>
                <Tooltip
                  title="Coming Soon"
                  position="top"
                  trigger="mouseenter"
                  size="big"
                >
                  <Pie data={pieExpenseData} className="m-auto" />
                </Tooltip>
              </div>
            </Col>
          </Container>
        </Container>
      </Row>
    </Container>
  );
};

export default OverviewComponent;
