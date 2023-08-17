import React from "react";
import { Bar, Pie } from "react-chartjs-2";
import Chart from "chart.js/auto";
import "bootstrap/dist/css/bootstrap.css";
import Card from 'react-bootstrap/Card';
import { Container, Row, Col } from 'react-bootstrap';
import { from } from "@apollo/client";

const OverviewComponent = () => {
  const sampleIncomeData = [15, 20, 18, 22, 25, 21];
  const sampleExpenseData = [12, 13, 14, 16, 18, 17];
  const sampleNetIncome = [3, 7, 4, 8, 7, 4];

  const chartData = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Income",
        data: sampleIncomeData,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
      {
        label: "Expenses",
        data: sampleExpenseData,
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
      {
        label: "Net Income",
        data: sampleNetIncome,
        backgroundColor: "rgba(255, 206, 86, 0.2)",
        borderColor: "rgba(255, 206, 86, 1)",
        borderWidth: 1,
      },
    ],
  };

  const incomeCategories = ["Salary", "Freelance", "Investments", "Other"];
  const expenseCategories = [
    "Rent",
    "Groceries",
    "Utilities",
    "Entertainment",
  ];

  const pieIncomeData = {
    labels: incomeCategories,
    datasets: [
      {
        data: [40, 20, 15, 25], // Sample data for income categories
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#33cc33"],
      },
    ],
  };

  const pieExpenseData = {
    labels: expenseCategories,
    datasets: [
      {
        data: [30, 25, 15, 20], // Sample data for expense categories
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#33cc33",
        ],
      },
    ],
  };

  const borderRight = {
    borderRight: "1px solid rgb(222,226,230)",
  }
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
    <h1 className="display-2 text-center my-4" style={{fontFamily:'Titan One', color:"#037390"}}>Overview</h1>
    <Row className="justify-content-around">
      <Container className=" border col-10">
      <Col className="mb-4 ">
        <div className=" p-3">
          <h3 className="display-5 text-center mb-3">Income vs Expenses</h3>
          <Bar data={chartData} options={chartOptions} />
        </div>
      </Col>
      <Container className=" d-flex border-top pt-3">
      <Col className="mb-4 col-6"  style={borderRight}>
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
