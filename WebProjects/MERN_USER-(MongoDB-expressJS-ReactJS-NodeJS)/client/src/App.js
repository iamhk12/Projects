import React, { createContext, useReducer } from "react";
import { Route, Routes } from "react-router-dom";
import NavbarA from "./components/NavbarA"
import Home from "./Layouts/Home"
import Myprofile from "./Layouts/Myprofile"
import Login from "./Layouts/Login"
import Contact from "./Layouts/Contact"
import Register from "./Layouts/Register"
import Logout from "./Layouts/Logout"

import { reducer, initialState } from './reducer/useReducer'


export const userContext = createContext()

function App() {


  const AllRoutes = () => {
    return (
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route exact path="/myprofile" element={<Myprofile />}></Route>
        <Route exact path="/login" element={<Login />}></Route>
        <Route exact path="/register" element={<Register />}></Route>
        <Route exact path="/logout" element={<Logout />}></Route>
        <Route exact path="/contact" element={<Contact />}></Route>
        <Route path="*" element={<h1>Error 404. Page not found</h1>}></Route>
      </Routes>
    )
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <>
      <userContext.Provider value={{ state, dispatch }}>
        <NavbarA />
        <AllRoutes />
      </userContext.Provider>
    </>
  )
}

export default App;
