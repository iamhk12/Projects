import react, { useState } from 'react'
import Listitem from './Listitem'
const App = () => {
    const [items, setitems] = useState([])
    const [inputlist, setList] = useState("")


    const itemEvent = (event) => {
        setList(event.target.value)
    }

    const addItem = () => {
        if (inputlist === "") {
            alert("Cannot add an empty task")
        }
        else {
            setitems((arr) => {
                return [...arr, inputlist]
            })
            setList("")
        }
    }

    const deleteitem = (id) => {
        setitems((arr) => {
            return arr.filter((arrElem, index) => {
                return index !== id;
            })
        })
    }

    return (
        <>
            <div className='container'>
                <div className='backdrop'>
                    <div className='centerdiv'>
                        <h1>To-Do List</h1>
                        <br />
                        <div className='input-div'>
                            <input type="text"
                                value={inputlist}
                                onChange={itemEvent}
                                placeholder='Add a Task'
                            />
                            <button onClick={addItem}
                                title="Click to add the task"
                            > + </button>
                        </div>

                        <ol>
                            {
                                items.map((val, index) => {
                                    return (
                                        <>
                                            <Listitem
                                                key={index}
                                                id={index}
                                                text={val}
                                                delete={deleteitem}
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