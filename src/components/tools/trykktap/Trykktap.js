import React from 'react'
import Banner from '../../static/Banner'
import { useSelector } from 'react-redux'
import InnData from './InnData'



export default function Trykktap(props) {
    const showTool = useSelector((state) => state.tool.visibleId)


    return (
        <div className={props.toolId === showTool ? "toolArea" : "hiddenTool"}>
            
            <Banner title={props.toolName} />
            <div className="toolInfo">
               
                <InnData />
            </div>
        </div>
    )

}


