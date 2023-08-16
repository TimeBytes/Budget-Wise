import React, { useState, useEffect } from "react";
import Budget from "../components/Budget";
import Transaction from "../components/Transaction";
import Overview from "../components/Overview";
import Footer from "../components/Footer";
import "bootstrap/dist/css/bootstrap.css";
import logoImage from "../assets/images/budgetwise.png";

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
        <img
          src={logoImage}
          class="mx-auto d-block"
          alt="Budget Wise Logo"
          className="logo"
          height="800"
          width="800"
        />
      </section>
      <section className="overview-section py-5">
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <Overview />
            </div>
            <div className="col-md-4">
              <div className="transaction-section">
                <h1>Manage Your Transactions</h1>
                <Transaction type={transaction} />
              </div>
              <h1>Take a peek at your Budget</h1>
              <Budget />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
