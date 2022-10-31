import { React, useState } from 'react'
import Banner from '../../../components/static/Banner'
import { useSelector } from 'react-redux'
import InnData from './components/InnData'
import Vindu from "./components/Vindu"
import Ovrigelast from './components/Ovrigelast'
import "../../../styles/kjølebehov/kjølebehov.css"
import Oversikt from './components/Oversikt'
import { PDFViewer } from "@react-pdf/renderer";
import Print from './components/printComponents/Print'

export default function Kjølebehov(props) {
  const showTool = useSelector((state) => state.tool.visibleId)

  const [page, setPage] = useState("InnData");



  //To move data up a compnonet from a child component for the data in InnData.js
  const [lasts, setLasts] = useState([]);
  const last_data = (last) => { setLasts(last) }

  //To move data up a compnonet from a child component for the data in Vindus.js
  const [vindus, setVindus] = useState([]);
  const vindu_data = (vindu) => { setVindus(vindu) }
  // To calculate the total effect of the windows 
  let totalVindu = vindus.reduce((a, b) => a + parseInt(b.strål) + parseInt(b.trans), 0)



  //To move data up a compnonet from a child component for the data in Øvrigelast.js
  const [ovriges, setOvriges] = useState([]);
  const ovrige_data = (ovrige) => { setOvriges(ovrige) }
  //calculate the total of ovriges
  let totalOvriges = ovriges.reduce((a, b) => a + parseInt(b.effekt), 0)


  const [innDatas, setInnDatas] = useState([]);
  const innDatas_data = (data) => { setInnDatas(data) }


  let total ={ovrige: totalOvriges , vindu:totalVindu , internt: Math.round(((lasts.reduce((a, b) => a + parseInt(b), 0)+totalOvriges+totalVindu)*(1+innDatas.SikkerhetsMargin/100))) } 

  return (
    <div className={props.toolId === showTool ? "toolArea" : "hiddenTool"}>

      <Banner title={props.toolName} />
      <div className="toolInfo">


        <div className='KJCentered'>
        
        <div >
        <button className="KJButtons" onClick={() => setPage("InnData")}>Inndata</button>
        <button className="KJButtons" onClick={() => setPage("vindu")}>Vindu</button>
        <button className="KJButtons" onClick={() => setPage("ovrige")}>Øvrige laster</button>
        <button className="KJButtons" onClick={() => setPage("oversikt")}>Oversikt</button>
        </div>

        {page === "InnData" ? <InnData last_data={last_data} innDatas_data={innDatas_data} /> : null}
        {page === "vindu" ? <Vindu innDatas={innDatas}  vindu_data={vindu_data} vindus={vindus}/> : null}
        {page === "ovrige" ? <Ovrigelast ovrige_data={ovrige_data}  ovriges={ovriges}/> : null}

       { page === "oversikt" ? (
         <div className='oversikt'>
            <PDFViewer width={1000} height={1500}>
            <Print innDatas={innDatas}  vindus={vindus} ovriges={ovriges} lasts={lasts} total={total}/>
            </PDFViewer>
             </div>
          ) : null}

          </div>
      </div>
    </div>
  )

}
