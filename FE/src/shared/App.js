import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Home from "../pages/Home";
import SignUp from "../pages/SignUp";
import Navbar from "../components/Navbar";
import SignIn from "../pages/SignIn";
import Footer from "../components/Footer";

import "../style/App.scss";
import Detail from "../pages/Detail";
import MyPage from "../pages/MyPage";

function App() {
  return (
    <React.Fragment>
      <div className="App">
        <BrowserRouter>
          <Navbar></Navbar>
          <Route path="/" exact component={Home} />
          <Route path="/signup" exact component={SignUp} />
          <Route path="/signin" exact component={SignIn} />
          <Route path="/detail/:id" exact component={Detail} />
          <Route path="/mypage" exact component={MyPage} />
        </BrowserRouter>
      </div>
      <Footer></Footer>
    </React.Fragment>
  );
}

export default App;
