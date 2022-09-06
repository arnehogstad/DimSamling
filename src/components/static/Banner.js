import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { show } from '../../features/toolSlice'

export default function Banner(props){
  //connecting to the store
  const showTool = useSelector((state) => state.tool.visibleId)
  const dispatch = useDispatch()

  //getting the picture for the card
  let tempPic = require(`../../images/${props.title.replaceAll(" ","-")}.png`)

  return(
    <div className="banner"
      style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.5), rgba(255,255,255,0.5)), url(${tempPic})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
      }}
    >

      <div className="toolCardBack"
        onClick = {() => dispatch(show('all'))}
      >
        <div> &larr; TILBAKE TIL ALLE VERKTØY </div>
      </div>
      <div className="toolHeadLine">
        {props.title}
      </div>
      <div className="filler"></div>
    </div>
  )

}
