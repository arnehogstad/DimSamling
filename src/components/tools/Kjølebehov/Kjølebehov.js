import React from 'react'
import { useSelector } from 'react-redux'
import InnData from './components/InnData'
import Banner from '../../../components/static/Banner'
import "./Kjølebehov.css"

export default function Kjølebehov(props){
  const showTool = useSelector((state) => state.tool.visibleId)

  ////////

  return(
    <div className= {props.toolId === showTool ? "toolArea" : "hiddenTool"}>
      <Banner />
      <div className="toolInfo">
        <InnData/>
      </div>
  </div>
)

}
