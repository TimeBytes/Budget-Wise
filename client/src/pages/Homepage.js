import React, { useState, useEffect } from "react";
import Budget from "../components/Budget";
import Transaction from "../components/Transaction";
import Overview from "../components/Overview";
import Category from "../components/Category";
import "bootstrap/dist/css/bootstrap.css";

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
        <header className="header">
          <h1>Welcome to Budget Wise</h1>
          <p>Your Personal Expense Tracker</p>
        </header>
        <section className="content-section">
          <Overview />
          <div className="transaction-section">
            <nav className="transaction-tabs">
              <button className={`tab-btn ${transaction === "Income" ? "active" : ""}`} onClick={handleTransactionTab}>
                Income
              </button>
              <button className={`tab-btn ${transaction === "Expense" ? "active" : ""}`} onClick={handleTransactionTab}>
                Expense
              </button>
            </nav>
            <Transaction type={transaction} />
          </div>
          <Budget />
          <div className="features-section">
            <h2>Key Features</h2>
            <p>Budget Wise presents a platform that enables users to monitor their expenses and establish notifications for recurring bill payments and shows visual graphs/charts of current progress.</p>
          </div>
        </section>
      </div>
    );
  };
  
  export default HomePage;
  