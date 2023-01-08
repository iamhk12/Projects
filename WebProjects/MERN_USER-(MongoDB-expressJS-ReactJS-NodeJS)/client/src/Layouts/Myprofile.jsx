import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Myprofile.css"
import pic from "../components/profilepic.jpg"
import defpp from "../components/defpp.jpg"

const About = () => {

    const navigate = useNavigate()
    const callProfilePage = async () => {
        try {
            const resFromBack = await fetch('/myprofile', {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                }, 
                credentials: "include"
            })

            const data = await resFromBack.json()
            setUserData(data)

            if (resFromBack.status !== 200 || !data) {
                console.log("Not logged in")
                window.alert("Please log in")
                navigate("/login")
            }

        }
        catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        callProfilePage()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const [userData, setUserData] = useState({})

    return (
        <>
            <div className="mypro">
                <div className="inmypro">
                    <div className="mpleft">
                        <img src={userData.email === "hkothari247@gmail.com"? pic : defpp} alt="Profile" />
                    </div>
                    <div className="myproright">
                        <form action="">
                            <div className="det">
                                <p className="detuserid">User Id : <span>{userData._id}</span> </p>
                                <p className="detname">Name : <span>{userData.name}</span> </p>
                                <p className="detemail">Email : <span>{userData.email}</span> </p>
                                <p className="detphone">Phone : <span>{userData.phone}</span> </p>
                                <p className="detwork">Profession : <span>{userData.work}</span></p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default About