import React from 'react'
import { useSelector } from 'react-redux'

export default function Bigbanner(props){
  //state of tool - from redux-store
  const showTool = useSelector((state) => state.tool.visibleId)

  //getting the picture for the card
  let tempPic = require(`../../images/${props.title.replaceAll(" ","-")}bigbanner.png`)

  return(
    <div className= { showTool === 'all' ? "bigbanner" : "hiddenTool"}
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
