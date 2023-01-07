import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import "./Home.css"

const Home = () => {

    const [userData, setUserData] = useState("")
    const [show, SetShow] = useState(false)
    // const navigate = useNavigate()

    const callHomePage = async () => {
        try {
            const resFromBack = await fetch('/getdata', {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            })

            const data = await resFromBack.json()
            setUserData(data.name)
            if (data.name) { SetShow(true) }

            // if (resFromBack.status !== 200 || !data) {
            //     window.alert("Please log in")
            //     navigate("/login")
            // }

        }
        catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        callHomePage()
    }, [])


    return (
        <>
            <div className="home">
                <div className="inhome">
                    <h3>Welcome</h3>
                    <h1 id="name">{userData}</h1>
                    <h1>{show ? "Happy to see you back" : "This is a MERN project"}</h1>
                </div>
            </div>
        </>
    )
}

export default Home