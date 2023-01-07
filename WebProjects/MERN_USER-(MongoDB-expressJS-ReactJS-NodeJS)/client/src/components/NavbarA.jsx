import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css"
import logo from "./HIMKOTLOGO.png"
import { userContext } from '../App'


const NavbarA = () => {
    
    /* eslint-disable no-unused-vars */
    const { state, dispatch } = useContext(userContext)
    /* eslint-enable no-unused-vars */


    const RenderNavs = () => {

        if (state) {
            return (
                <>
                    <NavLink to="/" >Home</NavLink>
                    <NavLink to="/myprofile" >My Profile</NavLink>
                    <NavLink to="/contact" >Contact Me</NavLink>
                    <NavLink to="/logout" >Log out</NavLink>
                </>
            )
        }
        else {
            return (
                <>
                    <NavLink to="/" >Home</NavLink>
                    <NavLink to="/login" >Login</NavLink>
                    <NavLink to="/register" >Register</NavLink>
                </>

            )

        }



        // return (<>
        //     <NavLink to="/" >Home</NavLink>
        //     <NavLink to="/myprofile" >My Profile</NavLink>
        //     <NavLink to="/contact" >Contact Me</NavLink>
        //     <NavLink to="/login" >Login</NavLink>
        //     <NavLink to="/register" >Register</NavLink>
        //     <NavLink to="/logout" >Log out</NavLink>
        // </>
        // )
    }

    return (
        <>
            <div className="nav">
                <input type="checkbox" id="nav-check" />
                <div className="nav-header">
                    <div className="nav-title"
                        style={{ paddingLeft: "10px" }}>
                        <img src={logo} alt="LOGO" />
                    </div>
                </div>
                <div className="nav-btn">
                    <label htmlFor="nav-check">
                        <span></span>
                        <span></span>
                        <span></span>
                    </label>
                </div>

                <div className="nav-links">
                    <RenderNavs />
                </div>
            </div>
        </>
    )
}
export default NavbarA