import "bootstrap/dist/css/bootstrap.css";
import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Bar, Pie } from "react-chartjs-2";
import Chart from "chart.js/auto";
import "../index.css";

const OverviewComponent = (props) => {
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
  console.log(props.props.groupedIncome);
  const incomeCategories = Object.keys(props.props.groupedIncome);
  const expenseCategories = Object.keys(props.props.groupedExpense);

  const pieIncomeData = {
    labels: Object.keys(props.props.groupedIncome),
    datasets: [
      {
        data: Object.values(props.props.groupedIncome), // Sample data for income categories
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#33cc33"],
      },
    ],
  };

  const pieExpenseData = {
    labels: Object.keys(props.props.groupedExpense),
    datasets: [
      {
        data: Object.values(props.props.groupedExpense), // Sample data for expense categories
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#33cc33"],
      },
    ],
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
                <Pie data={pieIncomeData} className="m-auto" />
              </div>
            </Col>
            <span className="border-top pt-5 d-lg-none"></span>
            <span className="d-none d-lg-block border"></span>
            <Col className="mb-4 col-12 col-lg-6 ">
              <div className=" m-1">
                <h3 className="display-5 text-center mb-3">
                  Expense Distribution
                </h3>
                <Pie data={pieExpenseData} className="m-auto" />
              </div>
            </Col>
          </Container>
        </Container>
      </Row>
    </Container>
  );
};

export default OverviewComponent;
