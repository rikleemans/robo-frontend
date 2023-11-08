import "./styles/style.css";
import Register from "./Pages/Register.js";
import Login from "./Pages/Login.js";
import Profile from "./Pages/Profile.js";
import React from "react";
import { Route, useLocation, Routes } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import AboutUs from "./Pages/Aboutus";

const AnimatedSwitch = () => {
  const location = useLocation();
  return (
    <TransitionGroup>
      <CSSTransition key={location.key} classNames='transition' timeout={700} unmountOnExit>
        <Routes>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/profile' element={<Profile location={useLocation()} />}></Route>
          <Route path='/register' element={<Register />}></Route>
          <Route path='/aboutus' element={<AboutUs />}></Route>
          <Route exact path='/' element={<Login />}></Route>
        </Routes>
      </CSSTransition>
    </TransitionGroup>
  );
};
export default function App() {
  return (
    <>
      <AnimatedSwitch />
    </>
  );
}
