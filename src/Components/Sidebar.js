import React from "react";
import "../App.css";
import Form from "./Form";

const successGifs = [`https://i.giphy.com/media/g4eOulPFxnIEE/giphy.webp`,`https://i.giphy.com/media/g4eOulPFxnIEE/giphy.webp`, `https://i.giphy.com/media/3ov9jSmllAIKuthAe4/200w.webp`,`https://i.giphy.com/media/1xVbRS6j52YSzp9P7N/200.webp`, `https://i.giphy.com/media/xUA7aVZuDp4anJb3bO/giphy.webp`, `https://i.giphy.com/media/eB9MgVUCaiXL5sbqgT/200.webp`,`https://i.giphy.com/media/xT9DPiHFM8Iy3hiC3e/giphy.webp`]

class Sidebar extends React.Component {

  getGif= ()=>{
    return successGifs[(Math.floor(Math.random() * 6) + 1)]
  }

  render(){

  return (
    <div className="sidebar">
    {this.props.clicked===true?<img className="motivate" src={this.getGif()}/> : null}

    </div>
  );

}
}
export default Sidebar;
