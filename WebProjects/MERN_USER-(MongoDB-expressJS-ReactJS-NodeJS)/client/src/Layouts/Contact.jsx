import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Contact.css"
const Contact = () => {
    let navigate = useNavigate()
    const [userData, setUserData] = useState({ name: "", email: "", message: "" })

    const callContactPage = async () => {
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
            setUserData({ ...userData, name: data.name, email: data.email })


            if (resFromBack.status !== 200 || !data) {
                window.alert("Please log in")
                navigate("/login")
            }

        }
        catch (err) {
            console.log(err)
        }
    }


    useEffect(() => {
        callContactPage()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleInputs = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setUserData({ ...userData, [name]: value })

    }

    const ContactForm = async (e) =>{
        e.preventDefault()

        const {name, email, message } = userData

        const response =  await fetch('/contact', {
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({
                name, email, message
            })
        })

        const data = await response.json();

        if(!data){
            console.log("Not contacted")
        }else{
            window.alert("Message sent.");
            setUserData({...userData, message : ""})
        }
    }




    return (
        <>

            <section id="contact">
                <div className="contact-content">

                    <div className="content" data-aos="fade-up">
                        <h2 className="center">Contact Me</h2>
                        <p className="center contact-detail">
                            Will be glad to work over all kinds of services based on my skills.
                            <br /> Feel free to contact anytime.
                        </p>
                    </div>
                    <a href="https://www.linkedin.com/in/himanshu-kothari-a62413243" rel="noreferrer" target="_blank" title="LinkedIn" className="btn btn-linkedin btn-lg"> Linked<i className="fa fa-linkedin fa-fw"></i></a>
                    <div className="cont" data-aos="fade-up">
                        {/* <p>Email <span>:</span> <a href="mailto:hkothar247@gmail.com">hkothar247@gmail.com</a></p> */}
                    </div>

                    <h2 id="getin">Get in touch</h2>
                    <div className="detailscont">
                        <form ></form>
                        <input type="text"
                            placeholder="Enter your name"
                            onChange={handleInputs}
                            name="name"
                            value={userData.name}
                        />
                        <input type="text"
                            placeholder="Enter your email"
                            // onChange={}
                            onChange={handleInputs}
                            name="email"
                            value={userData.email}
                        />

                        <textarea
                            placeholder="Enter your concern"
                            onChange={handleInputs}
                            name="message"
                            value={userData.message}
                            rows="10" />

                        <input type="submit" onClick={ContactForm} />
                    </div>


                </div>
            </section>
        </>
    )
}

export default Contact