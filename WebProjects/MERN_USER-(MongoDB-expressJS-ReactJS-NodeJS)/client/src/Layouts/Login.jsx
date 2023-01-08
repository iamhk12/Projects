import React from "react";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom"
import "./Login.css"

import { userContext } from '../App'

const Login = () => {
    /* eslint-disable no-unused-vars */
    const { state, dispatch } = useContext(userContext)
    /* eslint-enable no-unused-vars */

    const navigate = useNavigate()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const loginUser = async (e) => {

        e.preventDefault()

        // const res = await fetch("/loginuser", {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json"
        //     },
        //     body: JSON.stringify({
        //         email,password
        //     })

        // });

        if (email === "" || password === "") {
            window.alert("Enter Details")
            return
        }

        const res = await fetch("/loginuser", {
            method: "POST",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email, password
            })
        });

        const data = await res.json();

        if (res.status === 401 || !data) {
            window.alert("Kindly register")
        }
        else if (res.status === 421 || !data) {
            window.alert("Incorrect details")
        }
        else {
            dispatch({ type: "USER", payload: true })
            window.alert("Login Successful");
            console.log("login Successful");
            navigate("/")
        }
    }


    return (
        <>

            <div className="login">
                <div className="loginform">
                    <h1>SIGN IN</h1>
                    <form method="post">
                        <div className="detailslogin">
                            <input type="text" name="email" onChange={(e) => {
                                setEmail(e.target.value)
                            }}
                                value={email}
                                placeholder="Enter your email"
                                className="form-input" />

                            <input type="password" name="password" onChange={(e) => {
                                setPassword(e.target.value)
                            }}
                                value={password}
                                placeholder="Enter your password"
                                className="form-input" />
                            <input onClick={loginUser} type="submit" value="Login" />
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login