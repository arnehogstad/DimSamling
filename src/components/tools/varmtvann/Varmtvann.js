import React from 'react'
import Banner from '../../static/Banner'
import { useSelector } from 'react-redux'
import ProsjektData from './ProsjektData'



export default function Varmtvann(props) {
    const showTool = useSelector((state) => state.tool.visibleId)


    return (
        <div className={props.toolId === showTool ? "toolArea" : "hiddenTool"}>
            <Banner title={props.toolName} />
            <div className="toolInfo">
                <ProsjektData />

            </div>
        </div>
    )

}




