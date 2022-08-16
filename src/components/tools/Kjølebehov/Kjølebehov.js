import React from 'react'
import { useSelector } from 'react-redux'
import InnData from './components/InnData'
import Vindu from "./components/Vindu"
import "../../../styles/kjølebehov/kjølebehov.css"

export default function Kjølebehov(props){
  const showTool = useSelector((state) => state.tool.visibleId)

  ////////

  return(
    <div className= {props.toolId === showTool ? "toolArea" : "hiddenTool"}>
      <div className="toolInfo">
       {/* <InnData/>*/}
        <Vindu/>
      </div>
  </div>
)

}
