
// Top 5 netflix --> REACT PROPS

import React from 'react';
import reactDOM from 'react-dom';
import Card from './Card'
import './index.css'
import sData from "./sData"

// function allcard(val) {

//   return (
//     <Card
//       name={val.name}
//       imgsrc={val.imgsrc}
//       title={val.title}
//       link={val.link}
//     />
//     );
// }

reactDOM.render(
  <>
    <section className='containerofcards'>
      <h1>LIST OF TOP 5 SERIES</h1>
      <div className='cards'>
        {/* <Card
                    name={sData[0].name}
                    imgsrc={sData[0].imgsrc}
                    title={sData[0].title}
                    link={sData[0].link}
                />
                <Card
                    name={sData[1].name}
                    imgsrc={sData[1].imgsrc}
                    title={sData[1].title}
                    link={sData[1].link}
                />
                <Card
                    name={sData[2].name}
                    imgsrc={sData[2].imgsrc}
                    title={sData[2].title}
                    link={sData[2].link}
                />
                <Card
                    name={sData[3].name}
                    imgsrc={sData[3].imgsrc}
                    title={sData[3].title}
                    link={sData[3].link}
                />
                <Card
                    name={sData[4].name}
                    imgsrc={sData[4].imgsrc}
                    title={sData[4].title}
                    link={sData[4].link}
                /> */}

        {
          //array.map(function(value,index,arrayName),thisValue)
          sData.map((val) => {
            return (
              <Card
                key={val.key}
                name={val.name}
                imgsrc={val.imgsrc}
                title={val.title}
                link={val.link}
              />

            );
          })
        };

      </div>
    </section>
  </>,
  document.getElementById('root')
);