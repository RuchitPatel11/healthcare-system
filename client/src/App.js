import { Route, Routes } from "react-router-dom";
import "./App.css";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Register from "./components/Register/Register";
import Home from "./Pages/Home";
import Login from "./components/Login/Login";
import CreatePassword from "./components/Password/CreatePassword";
import Dashboard from "./components/Dashboard";
import Verification from "./components/Verification";
import RegenerateToken from "./components/RegenerateToken";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>
          <Route path="/token/verify/:token" element={<Verification />}></Route>
          <Route
            path="/token/regenerate/:token"
            element={<RegenerateToken />}
          ></Route>
          <Route
            path="/create-password/:token"
            element={<CreatePassword />}
          ></Route>
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
