import { Fragment, React, useState } from 'react'
import Banner from '../../../components/static/Banner'
import { useSelector } from 'react-redux'
import InnData from './components/InnData'
import Vindu from "./components/Vindu"
import Ovrigelast from './components/Ovrigelast'
import "../../../styles/kjølebehov/kjølebehov.css"

import { PDFViewer } from "@react-pdf/renderer";
import Print from './components/printComponents/Print'
import { nanoid } from "@reduxjs/toolkit"

export default function Kjølebehov(props) {
  const showTool = useSelector((state) => state.tool.visibleId)

  const [page, setPage] = useState("InnData");
  const pageModifier = (pageName) => { setPage(pageName) }



  //To move data up a compnonet from a child component for the data in InnData.js
  const [lasts, setLasts] = useState([]);
  const last_data = (last) => { setLasts(last) }

  //To move data up a compnonet from a child component for the data in Vindus.js
  const [vindus, setVindus] = useState([]);
  const vindu_data = (vindu) => { setVindus(vindu) }
  // To calculate the total effect of the windows
  let totalVindu = vindus.reduce((a, b) => a + parseInt(b.strål) , 0)



  //To move data up a compnonet from a child component for the data in Øvrigelast.js
  const [ovriges, setOvriges] = useState([]);
  const ovrige_data = (ovrige) => { setOvriges(ovrige) }
  //calculate the total of ovriges
  let totalOvriges = ovriges.reduce((a, b) => a + parseInt(b.effekt), 0)


  const [innDatas, setInnDatas] = useState({
    Navn: "Prosjekt Navn",
    Referanse: "Navn",
    ByggType: "Kontorbygning",
    Byggeår: "2017-nå",
    MaksT: 32,
    ØnsketT: 21,
    bra: 200,
    takhøyde: 3,
    takmotloft: 0,
    taktemp: 50,
    gulvmotluft: 0,
    veggmotnabo: 0,
    gjennvinn: 80,
    ventilasjonType: "Gjennvinner basert på TEK",
    luftmengde: 0,
    SikkerhetsMargin: 30,
    uid: nanoid(),
  });
  const innDatas_data = (data) => { setInnDatas(data) }


  let total ={ovrige: totalOvriges , vindu:totalVindu , internt: Math.round(((lasts.reduce((a, b) => a + parseInt(b), 0)+totalOvriges+totalVindu)*(1+innDatas.SikkerhetsMargin/100))) }

  return (
    <div className={props.toolId === showTool ? "toolArea" : "hiddenTool"}>

      <Banner title={props.toolName} />
      <div className="toolInfo">


        <div className='KJCentered'>


        {page === "InnData" ? <InnData last_data={last_data} innDatas_data={innDatas_data} innDatas={innDatas} pageModifier={pageModifier}/> : null}
        {page === "vindu" ? <Vindu innDatas={innDatas}  vindu_data={vindu_data} vindus={vindus} pageModifier={pageModifier}/> : null}
        {page === "ovrige" ? <Ovrigelast ovrige_data={ovrige_data}  ovriges={ovriges} pageModifier={pageModifier}/> : null}

       { page === "oversikt" ? (
        <Fragment>

        <div >
        <div className="knapper" >
        <button className="KJButtons" onClick={() => { pageModifier("InnData")}}>Inndata</button>
        <button className="KJButtons" onClick={() => {pageModifier("vindu")}}>Vindu</button>
        <button className="KJButtons" onClick={() =>  { pageModifier("ovrige")}}>Øvrige laster</button>
        <button className="KJButtonsActive" onClick={() => { pageModifier("oversikt")}}>Oversikt</button>
        </div>

            <PDFViewer width={700} height={1000}>
            <Print innDatas={innDatas}  vindus={vindus} ovriges={ovriges} lasts={lasts} total={total}/>
            </PDFViewer>
        </div>
             </Fragment>
          ) : null}

          </div>
      </div>
    </div>
  )

}
