import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css"

const Register = () => {
    let navigate = useNavigate();

    const [user, setUser] = useState({
        name: "",
        email: "",
        phone: "",
        work: "",
        password: "",
        cpassword: ""
    })

    const handleInputs = (e) => {
        let name = e.target.name
        let value = e.target.value

        setUser({ ...user, [name]: value })
    }

    const SubmitFunc = async (e) => {

        e.preventDefault();

        try {
            let { name, email, phone, work, password, cpassword } = user;

            phone = parseInt(phone)
            // const res = await fetch("https://localhost:5000/registernew", { #This gives CORS error
            const res = await fetch("/registernew", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name, email, phone, work, password, cpassword
                })

            });

            const data = await res.json();

            if (res.status === 422 || !data) {
                window.alert("Failed to register")
            }
            else if (res.status === 421 || !data) {
                window.alert("Already registered")
            }
            else {
                window.alert("Registration Successful");
                console.log("Registration Successful");
                navigate("/login")
            }
        }
        catch (err) {
            console.log(err)
        }
    }


    return (
        <>
            <div className="reg">
                <div className="regform">
                    <div className="filterregform">
                        <div className="leftreg">
                            <h1>Create account</h1>
                            {/* <hr style={{ color: "black", width: "100%", height : "1px"}} /> */}
                            <form method="post">
                                <div className="detailsreg">
                                    <input type="text" name="name" className="form-input"
                                        placeholder="Enter your name"
                                        onChange={handleInputs}
                                        value={user.name} />

                                    <input type="text" name="email"
                                        placeholder="Enter your email"
                                        value={user.email}
                                        onChange={handleInputs}
                                        className="form-input" />

                                    <input type="text" name="phone"
                                        placeholder="Enter your Phone number"
                                        value={user.phone}
                                        onChange={handleInputs}
                                        className="form-input" />

                                    <input type="text" name="work" className="form-input"
                                        placeholder="Enter your work"
                                        value={user.work}
                                        onChange={handleInputs}
                                    />
                                    <input type="password" name="password"
                                        placeholder="Enter your password"
                                        value={user.password}
                                        onChange={handleInputs}
                                        className="form-input" />

                                    <input type="password" name="cpassword"
                                        placeholder="Confirm password"
                                        value={user.cpassword}
                                        onChange={handleInputs}
                                        className="form-input" />

                                    <input type="submit" value="Register" onClick={SubmitFunc} />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Register