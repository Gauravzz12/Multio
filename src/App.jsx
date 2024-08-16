import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import { BackgroundGradientAnimation } from "./components/UI/Gradient";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
        {/* <BackgroundGradientAnimation/> */}
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
          </Routes>
          <Footer />
    </Router>
  );
}

export default App;
