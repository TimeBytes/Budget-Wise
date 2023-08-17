import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container, Modal, Tab } from "react-bootstrap";
import SignUpForm from "../pages/SignupForm";
import LoginForm from "../pages/LoginForm";

import Auth from "../utils/auth";
import { Heading, color } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const AppNavbar = () => {
  // set modal display state
  const [showModal, setShowModal] = useState(false);

  const navbarStyle = {
    backgroundColor: "#037390",
  };

  return (
    <>
      <Navbar
        collapseOnSelect
        variant="light"
        expand="lg"
        className="navbar py-3 fs-4"
        style={navbarStyle}
      >
        <Container fluid className="d-flex justify-content-between">
          <Navbar.Brand as={Link} to="/">
            <h1
              className="display-1 "
              style={{ fontFamily: "Titan One", color: "white" }}
            >
              BudgetWise
            </h1>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar" style={{ color: "white" }} />
          <Navbar.Collapse
            id="navbar "
            style={{ color: "white" }}
            className="d-flex justify-content-end"
          >
            <Nav>
              {/* if user is logged in show and Enter Transactions and Logout */}
              {Auth.loggedIn() ? (
                <>
                  <Nav.Link
                    eventKey="2"
                    as={Link}
                    to="/dashboard "
                    style={{
                      fontFamily: "fira code",
                      color: "white",
                      fontWeight: "bold",
                    }}
                  >
                    Dashboard
                  </Nav.Link>
                  <Nav.Link
                    eventKey="3"
                    as={Link}
                    to="/categories"
                    style={{
                      fontFamily: "fira code",
                      color: "white",
                      fontWeight: "bold",
                    }}
                  >
                    Categories
                  </Nav.Link>
                  <Nav.Link
                    eventKey="5"
                    as={Link}
                    to="/donate"
                    style={{
                      fontFamily: "fira code",
                      color: "white",
                      fontWeight: "bold",
                    }}
                  >
                    Donate
                  </Nav.Link>
                  <Nav.Link
                    eventKey="6"
                    onClick={Auth.logout}
                    style={{
                      fontFamily: "fira code",
                      color: "white",
                      fontWeight: "bold",
                    }}
                  >
                    Logout
                  </Nav.Link>
                </>
              ) : (
                <Nav.Link
                  eventKey="5"
                  onClick={() => setShowModal(true)}
                  style={{
                    fontFamily: "fira code",
                    color: "white",
                    fontWeight: "bold",
                  }}
                >
                  Login/Sign Up
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* set modal data up */}
      <Modal
        size="lg"
        show={showModal}
        onHide={() => setShowModal(false)}
        aria-labelledby="signup-modal"
      >
        {/* tab container to do either signup or login component */}
        <Tab.Container defaultActiveKey="login">
          <Modal.Header closeButton>
            <Modal.Title id="signup-modal">
              <Nav variant="pills">
                <Nav.Item>
                  <Nav.Link eventKey="login">Login</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="signup">Sign Up</Nav.Link>
                </Nav.Item>
              </Nav>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Tab.Content>
              <Tab.Pane eventKey="login">
                <LoginForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
              <Tab.Pane eventKey="signup">
                <SignUpForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
            </Tab.Content>
          </Modal.Body>
        </Tab.Container>
      </Modal>
    </>
  );
};
export default AppNavbar;
