import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import logoImage from "../assets/images/budgetwise.png";
import expenseimg from "../assets/images/expensetracking.jpg";
import chartimg from "../assets/images/charts.jpg";
import analyticsimg from "../assets/images/analytics.jpg";

const HomePage = () => {
  
  return (
    <div className="homepage-container">
      <section className="hero-section">
      <img src={logoImage} class="mx-auto d-block"  alt="Budget Wise Logo" className="logo" height="800" width="800" />
      </section>
      <div class="container text-center">    
  <div class="container-fluid bg-3 text-center bg-red">    
  <div class="row">
    <div class="col-sm-4">
    <h3>Expense Tracker</h3>
    <p class="text-info">Effortlessly monitor your expenses and stay on top of your budget.</p>
      {<img src={expenseimg} class="responsive" alt="Expense img example" className="logo" />}
    </div>
    <div class="col-sm-4"> 
    <h3>Analytics</h3>
    <p class="text-info">Receive tips for recurring bill payments and learn how to budget.</p>
      {<img src={analyticsimg} class="responsive" alt="analytics img example" className="logo" />}
    </div>
    <div class="col-sm-4"> 
    <h3>Data Visualization</h3>
    <p class="text-info">Visualize your financial progress with intuitive graphs and charts.</p>
      {<img src={chartimg} class="responsive" alt="Chart example" className="logo" />}
    </div>
  </div>
</div>
</div>
=======
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

const HomePage = () => {
  const [transaction, setTransaction] = useState("Income");

  const handleTransactionTab = (event) => {
    setTransaction(event.target.textContent);
  };

  useEffect(() => {
    console.log(transaction);
  }, [transaction]);

  return (
    <div className="homepage-container">
      <header className="header text-center py-5">
        <h1 className="title">Budget Wise</h1>
        <p className="subtitle">Your Personal Expense Tracker</p>
        <button className="btn btn-primary cta-btn">Get Started</button>
      </header>
      <section className="hero-section">{/* budgetwise icon */}</section>
      <section className="features-section bg-light py-5">
        <div className="container text-center">
          <div className="row">
            <div className="col-md-4 mb-4">
              {}
              <h3>Expense Tracking</h3>
              <p>
                Effortlessly monitor your expenses and stay on top of your
                budget.
              </p>
            </div>
            <div className="col-md-4 mb-4">
              {}
              <h3>Bill Notifications</h3>
              <p>
                Receive alerts for recurring bill payments to avoid missing
                deadlines.
              </p>
            </div>
            <div className="col-md-4 mb-4">
              {}
              <h3>Data Visualization</h3>
              <p>
                Visualize your financial progress with intuitive graphs and
                charts.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="overview-section py-5">
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <Overview />
            </div>
            <div className="col-md-4">
              <div className="transaction-section">
                <h2>Manage Your Transactions</h2>
                <Transaction type={transaction} />
              </div>
              <Budget />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
