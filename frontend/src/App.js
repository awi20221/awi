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
import tw from "twin.macro";

const TableContainer = tw.div`
  w-full
  max-w-full
  flex
  flex-col
  items-center
  justify-center
  pl-10
  pr-10
  pb-32
`;

function App() {
  return (
    
    <Router>
      <Routes>
        <Route path="/" element={<WelcomeText />} />
        <Route path="/waluty" element={<TableContainer><CurrenciesList /></TableContainer>} />
        <Route path="/spolki" element={<TableContainer><SharesList /></TableContainer>} />
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
