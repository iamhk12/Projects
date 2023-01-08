import React from 'react'
import Card from './Card';
import sData from './sData';

const Netflix = () => {

    return (
        <Card
            key={sData[0].key}
            name={sData[0].name}
            imgsrc={sData[0].imgsrc}
            title={sData[0].title}
            link={sData[0].link}
        />
    );


}

export default Netflix