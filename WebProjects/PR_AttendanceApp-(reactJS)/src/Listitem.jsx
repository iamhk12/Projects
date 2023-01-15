import React from 'react'

const Listitem = (props) => {

    let hour = new Date().getHours()
    let min = new Date().getMinutes()

    let date = hour + " : " + min;
    return (
        <div className='item'>
            <li>
            <span className='stname' >Name: {props.name}</span> <br />
                <span className="stroll">Rollno.:{props.roll}</span> <br />
                <span className="sttime">Time of Login : {date}</span>
                <hr />
            </li>
        </div>
    )
}


export default Listitem