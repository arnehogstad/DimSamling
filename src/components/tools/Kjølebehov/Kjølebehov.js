import { React, useState } from 'react'
import { useSelector } from 'react-redux'
import InnData from './components/InnData'
import Vindu from "./components/Vindu"
import Ovrigelast from './components/Ovrigelast'
import "../../../styles/kjølebehov/kjølebehov.css"
import Oversikt from './components/Oversikt'

export default function Kjølebehov(props) {
  const showTool = useSelector((state) => state.tool.visibleId)


  //To move data up a compnonet from a child component for the data in InnData.js
  const [lasts, setLasts] = useState([]);
  const last_data = (last) => { setLasts(last) }

//To move data up a compnonet from a child component for the data in Vindus.js
const [vindus, setVindus] = useState([]);
const vindu_data = (vindu) => { setVindus(vindu) }  

//To move data up a compnonet from a child component for the data in Øvrigelast.js
const [ovriges, setOvriges] = useState([]);
const ovrige_data = (ovrige) => { setOvriges(ovrige) }

console.log(lasts)
  return (
    <div className={props.toolId === showTool ? "toolArea" : "hiddenTool"}>
      <div className="toolInfo">

           

         
         {lasts.length ==0 ?   <InnData last_data={last_data} /> : null} 
         {lasts.length !=0 & vindus.length==0   ?  <Vindu   vindu_data={vindu_data} />: null} 
         {vindus.length !=0 & ovriges.length ==0  ?   <Ovrigelast ovrige_data={ovrige_data} /> : null} 
        
      
     {ovriges.length !=0 ? <Oversikt lasts={lasts} ovrige={ovriges} vindus={vindus}/> : null}    
    </div>
    </div>
  )

}
