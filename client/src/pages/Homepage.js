import React from "react";
import "bootstrap/dist/css/bootstrap.css";

import logoImage from "../assets/images/budgetwise.png";
import expenseimg from "../assets/images/expensetracking.jpg";
import chartimg from "../assets/images/charts.jpg";
import analyticsimg from "../assets/images/analytics.jpg";

const HomePage = () => {
  return (
    <div className="homepage-container">
      <section className="hero-section text-center">
        <img src={logoImage} alt="Budget Wise Logo" className="logo" />
      </section>

      <div className="container text-center features-section">    
        <FeatureCard 
          title="Expense Tracker" 
          description="Effortlessly monitor your expenses and stay on top of your budget." 
          imgSrc={expenseimg} 
          altText="Expense img example"
        />
        <FeatureCard 
          title="Analytics" 
          description="Receive tips for recurring bill payments and learn how to budget." 
          imgSrc={analyticsimg} 
          altText="analytics img example"
        />
        <FeatureCard 
          title="Data Visualization" 
          description="Visualize your financial progress with intuitive graphs and charts." 
          imgSrc={chartimg} 
          altText="Chart example"
        />
      </div>
    </div>
  );
};

const FeatureCard = ({ title, description, imgSrc, altText }) => (
  <div className="feature-card">
    <img src={imgSrc} alt={altText} className="feature-img" />
    <h3 className="feature-title">{title}</h3>
    <p className="feature-description">{description}</p>
  </div>
);

export default HomePage;
