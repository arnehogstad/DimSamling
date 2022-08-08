import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { showAll, showOne } from '../../features/toolSlice'

export default function Toolcard(props){
  //connecting to the store
  const showTool = useSelector((state) => state.tool.visibleId)
  const dispatch = useDispatch()

  //getting the picture for the card
  let tempPic = require(`../../images/${props.picName}.png`)


  return(
    <div className= {showTool === props.toolid || showTool === 'all' ? "toolCard" : "hiddenCard"}
      onClick = {() => dispatch(showOne(props.toolid))}
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
