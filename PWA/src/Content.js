import './App.css'

import {useParams} from "react-router-dom"


function Content() {

  const content = useParams();

  console.log(content);
  return (
    <div>
      <h1>{content.name}</h1>
      <img src={"https://butlerbird.herokuapp.com/data/img/"+ "61b17597a767018dc2c57d81/" + content.catid + "/" +  content.contentid + "/page"}/>
      
    </div>
  );
}


export default Content;
