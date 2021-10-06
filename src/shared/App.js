import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Home from "../pages/Home";

import "../style/Home.scss";

import SignUp from "../pages/SignUp";
import Navbar from "../components/Navbar";
import SignIn from "../pages/SignIn";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar></Navbar>
        <Route path="/" exact component={Home} />
        <Route path="/signup" exact component={SignUp} />
        <Route path="/signin" exact component={SignIn} />
      </BrowserRouter>
    </div>
  );
}

export default App;
