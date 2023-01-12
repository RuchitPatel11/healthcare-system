import { Route, Routes } from "react-router-dom";
import "./App.css";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Register from "./components/Register/Register";
import Home from "./Pages/Home";
import Login from "./components/Login/Login";
import CreatePassword from "./components/Password/CreatePassword";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/set-password" element={<CreatePassword />}></Route>
          <Route path="/reset-password" element={<CreatePassword />}></Route>
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
