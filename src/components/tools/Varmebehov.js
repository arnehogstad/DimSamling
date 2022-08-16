import React from 'react'
import Banner from '../../components/static/Banner'
import { useSelector } from 'react-redux'

export default function Varmebehov(props){
  const showTool = useSelector((state) => state.tool.visibleId)
  return(
    <div className= {props.toolId === showTool ? "toolArea" : "hiddenTool"}>
      <Banner title={props.toolName} />
      <div className="toolInfo">
        Test av render Varmebehov ved bruk av redux
      </div>
  </div>
)

}
