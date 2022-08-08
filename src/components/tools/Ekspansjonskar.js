import React from 'react'
import { useSelector } from 'react-redux'

export default function Ekspansjonskar(props){
  const showTool = useSelector((state) => state.tool.visibleId)
  return(
    <div className= {props.toolId === showTool ? "toolArea" : "hiddenTool"}>
      <div className="toolInfo">
        Test av render EkspansjonsKar ved bruk av redux
      </div>
  </div>
)

}
