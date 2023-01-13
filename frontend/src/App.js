import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import WelcomeText from "./components/Home/Home";
import CurrenciesList from "./components/Currencies/Currencies";
import SharesList from "./components/Shares/Shares";
import Calculator from "./components/Calculator/Calculator";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Help from "./components/Help/Help"
import NotFound from "./mainComponents/NotFound";
//import Nav from "./Navigation";
import './App.css'

function App() {
  return (
    
    <Router>
      <Routes>
        <Route path="/" element={<WelcomeText />} />
        <Route path="/waluty" element={<CurrenciesList />} />
        <Route path="/spolki" element={<SharesList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/kalkulator" element={<Calculator />} />
        <Route path="/help" element={<Help />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
