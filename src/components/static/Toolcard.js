import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { show } from '../../features/toolSlice'

export default function Toolcard(props){
  //connecting to the store
  const showTool = useSelector((state) => state.tool.visibleId)
  const dispatch = useDispatch()

  //getting the picture for the card
  let tempPic = require(`../../images/${props.picName}.png`)


  return(
    <div className=
      {showTool === 'all' && props.toolid === 'all' ? "hiddenCard" :
      showTool !== 'all' && props.toolid === 'all' ? "toolCardBack" :
      showTool === 'all' ?
      "toolCard" : "hiddenCard"
    }
      onClick = {() => dispatch(show(props.toolid))}
    >
      <div className="cardTitle">{props.toolName}</div>
      <div className="cardInfo">
        <img
          className="cardPic"
          //src = {picTest}
          src = {tempPic}
        />
      </div>
    </div>
  )

}
