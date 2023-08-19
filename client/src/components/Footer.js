import React from "react";
import { Container, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  const footerStyle = {
    backgroundColor: "#037390",
    justifyContent: "center",
    fontWeight: "bolder",
  };
  return (
    <Container
      fluid
      className="d-flex flex-column align-items-center footer-container text-center py-5 sticky-footer"
      style={footerStyle}
    >
      <Col md={4}>
        <a
          href="https://www.facebook.com"
          className="text-white"
          target="_blank"
          rel="noreferrer"
        >
          <FontAwesomeIcon icon={faFacebook} className="social-icon" />
        </a>
        <a
          href="https://www.x.com"
          className="text-white"
          target="_blank"
          rel="noreferrer"
        >
          <FontAwesomeIcon icon={faTwitter} className="social-icon" />
        </a>
        <a
          href="https://www.instagram.com"
          className="text-white"
          target="_blank"
          rel="noreferrer"
        >
          <FontAwesomeIcon icon={faInstagram} className="social-icon" />
        </a>
      </Col>
      <Col md={4}>
        <p className="contact-info text-white">
          Contact <br /> budgetwise@email.com
        </p>
      </Col>

      <div className="mt-1">
        <h2 className="footer-text text-white">
          &copy; Made with ❤️️ by Andy, Gurveer, Mahdi M, Mahdi E, Kajian
        </h2>
      </div>
    </Container>
  );
};

export default Footer;
