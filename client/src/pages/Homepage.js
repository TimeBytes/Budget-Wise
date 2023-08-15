import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import logoImage from "../assets/images/budgetwise.png";
import expenseimg from "../assets/images/expensetracking.jpg";
import chartimg from "../assets/images/charts.jpg";
import analyticsimg from "../assets/images/analytics.jpg";

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
</div>
  );
};
export default HomePage;