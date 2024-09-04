import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Register from "./pages/Registration";

function App() {

  
  return (
    <div className="w-full overflow-hidden ">
    <Router >
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} /> 
          </Routes>
          <Footer />
    </Router>
    </div>
  );
}

export default App;
