import './App.css'



import React, { useState, useEffect} from 'react';

import axios from 'axios';
import {Link} from 'react-router-dom';



import Carousel from 'react-elastic-carousel'
import {FetchContent} from './api/fetchData';

const breakPoints = [
  { width: 1, itemsToShow: 1.5 },
  { width: 550, itemsToShow: 2, itemsToScroll: 2 },
  { width: 768, itemsToShow: 3 },
  { width: 1200, itemsToShow: 4 }
];




function Activities({fetchUrl}) {
  const [category, setCategorys] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);

  const {
    content,
    hasMore,
    loading,
    error
  } = FetchContent('activity', pageNumber)

  console.log(content);

  return (
    <div className="categoryWrap">
      {content.map((categorys, index) => {
        console.log(categorys);
        console.log(content[index][0].businessType);
        return (

          <div className="category" id={category.name}>
          <h3 className="categoryName">{content[index][0].businessType}</h3>
          <div className="contentWrap">
            <Carousel breakPoints={breakPoints} showArrows={false} pagination={false}>

              {content[index].map((box) => {
                console.log(content[index][0]._id);
                return (
                  <div className="contentBox" id={box.name} >
                  <Link to={`/activities/${content[index][0].name}`}>
                    <div><h4>{box.name}</h4></div>
                    <div className="previewWrap">

                      <img className="previewImg" src={"http://localhost:4000/data/img/activity/" + content[index][0]._id + "/preview"}/>
                      <p>{box.butlerbirdActivity.preview.text}</p>
                    </div>
                    </Link>
                  </div>
                )
              })}

            </Carousel>
          </div>
        </div>

        )


      })}

      <div>{loading && 'Loading...'}</div>
      <div>{error && 'Error'}</div>
    </div>
  )
}








export default Activities
