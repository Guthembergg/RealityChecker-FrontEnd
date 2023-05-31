import { BrowserRouter, Route, Routes } from "react-router-dom";
import Journal from "./components/journal/Journal.jsx";
import Login from "./components/login/login.jsx";
import Homepage from "./components/homepage/homepage.jsx";
import Navbar from "./components/homepage/NavbarCustom";
import Interpretation from "./components/interpretation/Interpretation.jsx";
import FullClock from "./components/clock/FullClock.jsx";
import React from "react";
import WithoutNav from "./WithoutNav.js";
import WithNav from "./WithNav.js";
import CheckoutForm from "./components/checkout/Checkout.jsx";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {" "}
          <Route element={<WithoutNav />}>
            <Route path="/" element={<Login />} />
          </Route>
          <Route element={<WithNav />}>
            <Route path="/homepage" element={<Homepage />}></Route>
          </Route>
          <Route element={<WithNav />}>
            <Route path="/journal" element={<Journal />}></Route>
          </Route>
          <Route element={<WithNav />}>
            <Route path="/interpretation" element={<Interpretation />}>
              {" "}
            </Route>
          </Route>
          <Route element={<WithNav />}>
            <Route path="/alarm" element={<FullClock />}></Route>
          </Route>{" "}
          <Route element={<WithNav />}>
            <Route path="/checkout" element={<CheckoutForm />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
