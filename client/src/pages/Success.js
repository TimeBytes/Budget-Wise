import React, { useEffect } from "react";
import Jumbotron from "../components/Jumbotron";
import { useNavigate } from "react-router-dom";

function Success() {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to the dashboard page after a delay
    const timeout = setTimeout(() => {
      navigate("/dashboard"); // Replace with your dashboard route
    }, 6000); // 6 seconds in milliseconds

    return () => {
      clearTimeout(timeout);
    };
  }, [navigate]);

  return (
    <div>
      <Jumbotron>
        <h1 className="display-1">Success!</h1>
        <h2 className="display-3">Thank you for your donation!</h2>
        <h4 className="display-4">
          You will now be redirected to your Dashboard
        </h4>
      </Jumbotron>
    </div>
  );
}

export default Success;
