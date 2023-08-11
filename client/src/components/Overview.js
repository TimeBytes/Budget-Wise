import React from "react";
import { Bar, Pie } from "react-chartjs-2";
import Chart from "chart.js/auto";

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
    "Other",
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
        data: [30, 25, 15, 20, 10], // Sample data for expense categories
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#33cc33",
          "#FF5733",
        ],
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
    <div>
      <h2>Overview</h2>
      <Bar data={chartData} options={chartOptions} />
      <h2>Income Categories Distribution</h2>
      <Pie data={pieIncomeData} />
      <h2>Expense Categories Distribution</h2>
      <Pie data={pieExpenseData} />
    </div>
  );
};

export default OverviewComponent;
