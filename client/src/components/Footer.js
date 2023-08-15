import React from 'react';
// import '../styles/Home.css';


const Footer = () => {
  const footerStyle = {
    backgroundColor: "#037390",
    // Add other styling properties here if needed
  };
  return (
    
    <div className="footer text-center mt-5 py-3 text-dark" style={footerStyle}>
            <div className="row">
              <div className="col-md-4">
                <a href="https://www.facebook.com">
                  <i className="fab fa-facebook fa-2x text-dark mr-2"></i>
                </a>
                <a href="https://www.twitter.com">
                  <i className="fab fa-twitter fa-2x text-dark mr-2"></i>
                </a>
                <a href="https://www.instagram.com">
                  <i className="fab fa-instagram fa-2x text-dark"></i>
                </a>
              </div>
              <div className="col-md-4">
                <p className="m-0">Contact <br></br> budgetwise@email.com</p>

              </div>
            </div>
            <div className="mt-1">
              <h2 className="footer-text">
                &copy; 2023. Created by Andy, Gurveer, Mahdi, Mehdi, Kaijan
              </h2>
            </div>
          </div>
  )
}

export default Footer