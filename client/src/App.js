import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Register from "./components/Register/Register";
import Home from "./Pages/Home";
import Login from "./components/Login/Login";
import CreatePassword from "./components/Password/CreatePassword";
import Verification from "./components/Verification";
import RegenerateToken from "./components/RegenerateToken";
import ResetPassword from "./components/Password/ResetPassword";
import AboutUs from "./components/AboutUs";
import Dashboard from "./components/Dashboard";
import DisplayData from "./components/Dashboard/DisplayData";

import DisplayPatient from "./components/Dashboard/DisplayPatient";
import DisplayMedicine from "./components/Dashboard/DisplayMedicine";
import DisplayDisease from "./components/Dashboard/DisplayDisease";

function App() {
  return (
    <div className="flex flex-col min-h-screen ">
      <Header />
      <div className="flex flex-col flex-1">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path=":role" element={<DisplayData />} />
            <Route path="Patient" element={<DisplayPatient />} />
            <Route path="Medicine" element={<DisplayMedicine />} />
            <Route path="Disease" element={<DisplayDisease />} />
          </Route>

          <Route path="/token/verify/:token" element={<Verification />}></Route>
          <Route
            path="/token/regenerate/:token"
            element={<RegenerateToken />}
          ></Route>
          <Route
            path="/set-password/:token"
            element={<CreatePassword />}
          ></Route>
          <Route path="/password-reset" element={<ResetPassword />}></Route>
          <Route path="/about-us" element={<AboutUs />}></Route>
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
