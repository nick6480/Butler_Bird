import React, { useState, useEffect} from 'react';

import axios from 'axios';
import {Link} from 'react-router-dom';



import Carousel from 'react-elastic-carousel'
import {FetchContent} from './api/fetchData';

const breakPoints = [
  { width: 1, itemsToShow: 1.1 },
  { width: 550, itemsToShow: 2, itemsToScroll: 2 },
  { width: 768, itemsToShow: 3 },
  { width: 1200, itemsToShow: 4 }
];




function Hotel({fetchUrl}) {
  const [category, setCategorys] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);

  const {
    content,
    hasMore,
    loading,
    error
  } = FetchContent('hotel', pageNumber)




            return (
              <div className="categoryWrap">
                {content.map((categorys, index) => {
                  console.log(content);
                  return (

                    <div className="category" id={categorys.category.catid}>
                    <h3 className="categoryName">{categorys.category.name}</h3>
                    <div className="contentWrap">
                      <Carousel breakPoints={breakPoints} showArrows={false} pagination={false}>

                        {categorys.category.content.map(box => {

                          return (
                          <div className="contentBox" id={box.name} >

                            <Link to={`/content/${categorys.category.name}/${categorys.category.catid}/${box._id}`}>
                            <div className="previewWrap">
                              <div className="previewImg" style={{
                                backgroundImage: "url(" + "https://butlerbird.herokuapp.com/data/img/"+ "61b69314c7b6ccf56a46e34e/" + categorys.category.catid + "/" +  box._id + "/preview" + ")",
                                backgroundPosition: 'center',
                                backgroundSize: 'cover',
                                backgroundRepeat: 'no-repeat'
                              }}>
                                <div className="previewOverlay">
                                  <div><h4>{box.name}</h4></div>
                                  <p>{box.preview.text}</p>
                                </div>
                              </div>


                            </div>
                            </Link>
                          </div>
                          )
                        })
                      }

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








export default Hotel
