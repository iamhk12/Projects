import React from 'react'




function Card(props) {
    return (

        <div className='card'>
            <img src={props.imgsrc} alt='mypic' className='cardimg' />
            <div className='cardinfo'>
                <span className='cardcategory'>{props.title}</span>
                <h3 className='cardtitle'>{props.name}</h3>
                <a href={props.link} target='_blank' rel='noreferrer'>
                    <button>Watch Now</button>
                </a>
            </div>
        </div>

    )
}

export default Card