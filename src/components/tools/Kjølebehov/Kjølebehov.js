import { React, useState } from 'react'
import Banner from '../../../components/static/Banner'
import { useSelector } from 'react-redux'
import InnData from './components/InnData'
import Vindu from "./components/Vindu"
import Ovrigelast from './components/Ovrigelast'
import "../../../styles/kjølebehov/kjølebehov.css"
import Oversikt from './components/Oversikt'
import print from "./components/print"


export default function Kjølebehov(props) {
  const showTool = useSelector((state) => state.tool.visibleId)


  //To move data up a compnonet from a child component for the data in InnData.js
  const [lasts, setLasts] = useState([]);
  const last_data = (last) => { setLasts(last) }

  //To move data up a compnonet from a child component for the data in Vindus.js
  const [vindus, setVindus] = useState([]);
  const vindu_data = (vindu) => { setVindus(vindu) }
// To calculate the total effect of the windows 
let vindu_effekt = vindus.reduce((a, b) => a + parseInt(b[3])+ parseInt(b[4]), 0)




  //To move data up a compnonet from a child component for the data in Øvrigelast.js
  const [ovriges, setOvriges] = useState([]);
  const ovrige_data = (ovrige) => { setOvriges(ovrige) }
  //calculate the total of ovriges
  let ovrige_Effekt = ovriges.reduce((a, b) => a + parseInt(b[1]), 0)
  

  const [innDatas, setInnDatas] = useState([]);
  const innDatas_data = (data) => { setInnDatas(data) }

//calculate the total of the last
let total= ovrige_Effekt+vindu_effekt+lasts.reduce((a, b) => a + parseInt(b), 0)

  return (
    <div className={props.toolId === showTool ? "toolArea" : "hiddenTool"}>
      <Banner title={props.toolName} />
      <div className="toolInfo">

        {lasts.length === 0 ? <InnData last_data={last_data} innDatas_data={innDatas_data} /> : null}
        {lasts.length !== 0 & vindus.length === 0 ? <Vindu innDatas={innDatas} vindu_data={vindu_data} /> : null}
        {vindus.length !== 0 & ovriges.length === 0 ? <Ovrigelast ovrige_data={ovrige_data} /> : null}


        {ovriges.length !== 0 ? (
          <div className='oversikt'>
            <Oversikt total={total} lasts={lasts} ovrige={ovrige_Effekt} vindus={vindu_effekt} />
            <button className='handlingsKnapp' onClick={() => print(lasts,vindus,ovriges, innDatas, [vindu_effekt],[ovrige_Effekt],[total])}>Print to PDF</button>
          </div>
        ) : null}


      </div>
    </div>
  )

}
