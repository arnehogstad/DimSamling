import React from 'react'

export default function Bigbanner(props){

  //getting the picture for the card
  let tempPic = require(`../../images/${props.title.replaceAll(" ","-")}bigbanner.png`)

  return(
    <div className="bigbanner"
      style={{
        backgroundImage: `url(${tempPic})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
      }}
    >
    </div>
  )

}
