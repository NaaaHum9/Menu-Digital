/** 
import React from "react";
import Header from "./components/Header";
import Arroz from "./pages/Arroz";
import Guisados from "./pages/Guisados";
import Sopas from "./pages/Sopas";
import './App.css'

function App() {
  return(
    <>
      <Header />
      <Sopas/>
      <Arroz/>
      <Guisados/>
    </>
  );
}

export default App;
*/

import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Menu from "./components/Menu";
import Admin from "./components/Admin";
import ProtectedRoute from "./components/ProtectedRoute"

export default function App() {
const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <Routes>
      <Route path="/login" element={<Login onLogin={handleLogin} />} />
      <Route path="/menu" element={<Menu />} />
      <Route
        path="/admin"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <Admin />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Menu />} />
    </Routes>
  );
}

