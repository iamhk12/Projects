import react from 'react'

const Listitem = (props) => {

    return (
        <div className='item'>
            <button
            title='Delete task'
                onClick={() => {
                    props.delete(props.id)
                }}>
                x
            </button>
            <li> {props.text} </li>
        </div>
    )
}


export default Listitem