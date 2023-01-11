import { Route, Routes } from "react-router-dom";
import "./App.css";

import Header from "./components/Header";
import Footer from "./components/Footer/Footer";

import Register from "./components/Register";
import Home from "./Pages/Home";
import Login from "./components/Login/Login";
import CreatePassword from "./components/Password/CreatePassword";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Register />}></Route>
        <Route path="/set-password" element={<CreatePassword />}></Route>
        <Route path="/reset-password" element={<Register />}></Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
