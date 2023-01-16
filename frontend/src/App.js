import React from "react";
import { Routes, Route} from "react-router-dom";
import WelcomePage from "./components/WelcomePage/WelcomePage";
import CurrenciesList from "./components/Currencies/Currencies";
import SharesList from "./components/Shares/Shares";
import Calculator from "./components/Calculator/Calculator";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Help from "./components/Help/Help";
import NotFound from "./mainComponents/NotFound";
import Layout from "./components/Layout";
import RequireAuth from './components/RequireAuth';
import Home from "./components/Home/Home";
import AccountOptions from "./components/AccountOptions/AccountOptions";
import "./App.css";
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
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* publiczne szieżki */}
        <Route path="/" element={<WelcomePage />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="help" element={<Help />} />
        <Route path="kalkulator" element={<Calculator />} />
        
        {/* chronione ścieżki - wystarczy przeniesc powyzej jk nie chcecie sie logowac */}
        <Route element={<RequireAuth />}>
          <Route path="home" element={<Home />} />
          <Route path="waluty" element={<TableContainer><CurrenciesList /></TableContainer>}/>
          <Route path="spolki" element={<TableContainer><SharesList /></TableContainer>}/>
          <Route path="settings" element={<AccountOptions />}/>
          
        </Route>

        {/* catch all */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}


export default App;