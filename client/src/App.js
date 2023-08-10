import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useState } from "react";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import LoginForm from "./pages/LoginForm";
import SignupForm from "./pages/SignupForm";
import Profile from "./components/Profile";
// import Home from "./pages/Home";
import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("id_token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  const [transactions, setTransactions] = useState([]);

  return (
    <ApolloProvider client={client}>
      <Router basename={process.env.PUBLIC_URL}>
        <div>
          <Navbar />
          <Routes>
            {/* <Route path="/" element={<Home />} /> */}
            <Route path="/login" element={<LoginForm />} />
            <Route path="/signup" element={<SignupForm />} />
            <Route path="/profile" element={<Profile />} />
            <Route
              path="*"
              element={<h1 className="display-2">Wrong page!</h1>}
            />
          </Routes>
          {/* <Footer /> */}
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
