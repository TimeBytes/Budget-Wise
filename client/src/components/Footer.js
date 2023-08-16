// import React from 'react';
// // import '../styles/Home.css';
// import {} from "react-bootstrap";


// const Footer = () => {

//   return (
    
//     <div className="footer text-center mt-5 py-3 text-dark" style={footerStyle}>
//             <div className="row">
//               <div className="col-md-4">
//                 <a href="https://www.facebook.com">
//                   <i className="fab fa-facebook fa-2x text-dark mr-2"></i>
//                 </a>
//                 <a href="https://www.twitter.com">
//                   <i className="fab fa-twitter fa-2x text-dark mr-2"></i>
//                 </a>
//                 <a href="https://www.instagram.com">
//                   <i className="fab fa-instagram fa-2x text-dark"></i>
//                 </a>
//               </div>
//               <div className="col-md-4">
//                 <p className="m-0">Contact <br></br> budgetwise@email.com</p>

//               </div>
//             </div>
//             <div className="mt-1">
//               <h2 className="footer-text">
//                 &copy; 2023. Created by Andy, Gurveer, Mahdi, Mehdi, Kajian
//               </h2>
//             </div>
//           </div>
//   )
// }

// export default Footer

import React from 'react';
import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faTwitter, faInstagram } from "@fortawesome/free-brands-svg-icons";
// import "./Footer.css"; // You can create a separate CSS file for additional styling if needed

const Footer = () => {
  const footerStyle = {
    backgroundColor: "#037390",
    // Add other styling properties here if needed
  };
  return (
    <Container fluid className="footer-container text-center py-5" style={footerStyle}>
      <Row>
        <Col md={4}>
          <a href="https://www.facebook.com">
            <FontAwesomeIcon icon={faFacebook} className="social-icon" />
          </a>
          <a href="https://www.twitter.com">
            <FontAwesomeIcon icon={faTwitter} className="social-icon" />
          </a>
          <a href="https://www.instagram.com">
            <FontAwesomeIcon icon={faInstagram} className="social-icon" />
          </a>
        </Col>
        <Col md={4}>
          <p className="contact-info">Contact <br /> budgetwise@email.com</p>
        </Col>
      </Row>
      <div className="mt-1">
        <h2 className="footer-text">
          &copy; 2023. Created by Andy, Gurveer, Mahdi, Mehdi, Kajian
        </h2>
      </div>
    </Container>
  );
}

export default Footer;
