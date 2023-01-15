import React, { useState } from 'react'
import Listitem from './Listitem'
const App = () => {
    const [items, setitems] = useState([])
    const [inputName, setName] = useState("")
    const [inputRoll, setRoll] = useState("")


    const itemEventName = (event) => {
        setName(event.target.value)
    }
    const itemEventRoll = (event) => {
        setRoll(event.target.value)
    }

    const addItem = () => {
        if (inputName === "" || inputRoll === "") {
            alert("Field cannot be empty")
        }
        else {
            setitems((arr) => {
                return [...arr, { name: inputName, roll: inputRoll }]
            })
            setName("")
            setRoll("")
        }
    }



    return (
        <>
            <div className='container'>
                <div className='backdrop'>
                    <div className='centerdiv'>
                        <h1>Student Attendance</h1>
                        <br />
                        <div className='input-div'>
                            <input type="text"
                                value={inputName}
                                onChange={itemEventName}
                                placeholder='Enter your name'
                            />
                            <input type="text"
                                value={inputRoll}
                                onChange={itemEventRoll}
                                placeholder='Enter your Roll no.'
                            />
                            <button onClick={addItem} type="submit"
                                title="Click to add the task"
                            >Submit</button>
                        </div>

                    </div>
                    <div className="rightcon">
                        <h1>Today's Attendance</h1>
                        <ol>
                            {
                                items.map((val, index) => {
                                    return (
                                        <>
                                            <Listitem
                                                name={val.name}
                                                roll={val.roll}
                                            />

                                        </>
                                    )
                                })
                            }
                        </ol>
                    </div>
                </div>
            </div>
        </>
    )
}
export default App