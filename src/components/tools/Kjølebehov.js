import React from 'react'
import { useSelector } from 'react-redux'

export default function Kjølebehov(props){
  const showTool = useSelector((state) => state.tool.visibleId)
  return(
    <div className= {props.toolId === showTool ? "toolArea" : "hiddenTool"}>
      <div className="toolInfo">
        Test av render Kjølebehov ved bruk av redux
      </div>
  </div>
)

}
