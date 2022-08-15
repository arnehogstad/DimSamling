import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { show } from '../../features/toolSlice'

export default function Banner(props){
  //connecting to the store
  const showTool = useSelector((state) => state.tool.visibleId)
  const dispatch = useDispatch()

  //getting the picture for the card
  let tempPic = require(`../../images/Tilbake til alle verktøy.png`)


  return(
    <div className="banner">
      <div className="toolCard"
        onClick = {() => dispatch(show('all'))}
      >
        <div className="cardTitle">Tilbake til alle verktøy</div>
        <div className="cardInfo">
          <img
            className="cardPic"
            //src = {picTest}
            src = {tempPic}
          />
        </div>
      </div>
    </div>
  )

}
