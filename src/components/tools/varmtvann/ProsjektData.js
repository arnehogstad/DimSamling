import React, { Fragment } from "react"
import { nanoid } from '@reduxjs/toolkit'
import * as staticData from "./components/StaticData/VVStaticData"
import { kWhData, isLeilighetFucntion } from "./BeregnVV"
import "../../../styles/varmtvann/VVStyle.css"
import SpiralSys from "./SpiralSys"
import LøsningTyper from "./LøsningTyper"
import AquaEfficency from "./AquaEfficency"
import MouseOverPopover from "../../static/Popover"
import { inputDesciption } from "./components/StaticData/VVStaticData"
import { PDFViewer } from "@react-pdf/renderer";
import Print from './components/printComponents/Print'

export default function ProsjektData(props) {

    const [prosjketData, setProsjektData] = React.useState(
        {
            Navn: "Prosjekt Navn",
            Referanse: "Navn",
            ByggType: "Leilighet (2-3 personer)",
            antall: 47, // For CTC file to caculate kWh, can be number of students, guests or dusje

            netVannTemp: 7,
            tappeVannTemp: 40,
            perPersonVV: 75,

            vpEffekt: 11,
            settpunktVP: 55,
            spissSettpunkt: 65,

            isEkonomiInkludert: "Nei",
            strømpris: 120,
            SCOP: "2,5",

        }
    )

    const { Navn, Referanse, ByggType, antall, netVannTemp, tappeVannTemp, perPersonVV, settpunktVP, spissSettpunkt, isEkonomiInkludert, strømpris, SCOP } = prosjketData

    
    
    function handleChange(event) {
        const { name, value, type } = event.target
        if (name === "ByggType") {
            setProsjektData(prevFormData => {
                return {
                    ...prevFormData,
                    [name]: value,
                    antall: staticData.byggTypeVVInnDataType[value].verdier[4],
                }
            })
        } else {
            if (type === "number") {
                setProsjektData(prevFormData => {
                    return {
                        ...prevFormData,
                        [name]: parseFloat(value),
                    }
                })
                
            } else {
                setProsjektData(prevFormData => {
                    return {
                        ...prevFormData,
                        [name]: value,
                    }
                })
            }
        }
    }
    
    
    let kWhCTC = kWhData(ByggType, antall)
    
    const [systemValg, setSystemValg] = React.useState("None")///Updates the page based on the type of system soloution 
    
    const setSystem = (e, text) => {
        e.preventDefault()
        setSystemValg(text)
    }
    
    const [løsningResultat, setLøsningResultat] = React.useState()
    const printResultat = (e, results) => {
        e.preventDefault()
        setLøsningResultat(results)
    }
    
    
    const [isVisning, setIsVisning] = React.useState( ///Which part of the page is to be shown
        {
            Beregning:true,
            løsning:false,
            print: false,
            avanserteStillinger: false,
        }
    )


    function handleVisning(event, {name, value}) {//Deals with the isVisning of the page
       event.preventDefault()
       
        setIsVisning(prevFormData => {
            return {
                ...prevFormData,
                [name]: value,
            }
        })
    }

   
    

    
    
    return (
        <div className="border">

            {isVisning.print ?  //If the user wants to print the result remove everytghing else
                    <Fragment>
                    <button className="sisteNeste" onClick={(e)=>handleVisning(e,{name:"print",value:false}) }>Tilbake</button>
                  
                    <PDFViewer width={700} height={1000}>
                        <Print prosjektData={prosjketData} systemValg={systemValg} løsningResultat={løsningResultat} />
                    </PDFViewer >
                
                      </Fragment>
                
                : 


                <form className="formInnData">

                    <label className="label">Prosjekt Navn:
                        <input
                            className="input"
                            type="text"
                            onChange={handleChange}
                            name="Navn"
                            value={Navn}
                        /></label>

                    <label className="label">ABK Referanse:
                        <input
                            className="input"
                            type="text"
                            onChange={handleChange}
                            name="Referanse"
                            value={Referanse}
                        /></label>


                    <div className="label">
                        <label htmlFor="ByggType">Bygg Type:</label>
                        <select
                            className="select"
                            id="ByggType"
                            value={ByggType}
                            onChange={handleChange}
                            name="ByggType"
                        >
                            {staticData.byggTypeVarmtVann.map((item) => (
                                <option key={nanoid()} value={item}>{item}</option>
                            ))}
                        </select>
                    </div>

                    <label className="label">{staticData.byggTypeVVInnDataType[ByggType].navn} (Min: {Math.min(...staticData.byggTypeVVInnDataType[ByggType].verdier)}, Maks: {Math.max(...staticData.byggTypeVVInnDataType[ByggType].verdier)}):
                        <input
                            className="input"
                            type="number"
                            onChange={handleChange}
                            name="antall"
                            value={antall}
                        /></label>

                    {ByggType === "Leilighet (3+ personer)" || ByggType === "Leilighet (2-3 personer)" || ByggType === "Leilighet (1-2 personer)" ? (

                        <div >
                            <label className="label">Tappevann per person per dag [L]:
                                <input
                                    className="input"
                                    type="number"
                                    onChange={handleChange}
                                    name="perPersonVV"
                                    value={perPersonVV}
                                    min={60}
                                    max={90}
                                /></label>



                            <label className="label">Tappe vann temperatur [L]:
                                <input
                                    className="input"
                                    type="number"
                                    onChange={handleChange}
                                    name="tappeVannTemp"
                                    value={tappeVannTemp}
                                /></label>
                        </div>
                    ) : null}

                    <label className="label" >Nett vann  temperatur [{'\u00b0'}C]:
                        <input
                            className="input"
                            type="number"
                            onChange={handleChange}
                            name="netVannTemp"
                            value={netVannTemp}
                            min={4}
                            max={20}
                        /></label>


                    <label className="label">Spiss settpunkt [{'\u00b0'}C]:
                        <input
                            className="input"
                            type="number"
                            onChange={handleChange}
                            name="spissSettpunkt"
                            value={spissSettpunkt}
                            min={60}
                            max={80}
                        /></label>

                    <label className="label" >VP setpunkt [{'\u00b0'}C]:
                        <input
                            className="input"
                            type="number"
                            onChange={handleChange}
                            name="settpunktVP"
                            value={settpunktVP}
                            min={50}
                            max={75}
                        /></label>



                    {isLeilighetFucntion(ByggType) ? (
                        <label className="label">Inkluder ekonomisk beregning:
                            <select
                                className="select"
                                id="isEkonomiInkludert"
                                value={isEkonomiInkludert}
                                onChange={handleChange}
                                name="isEkonomiInkludert"
                            >
                                <option key={nanoid()} value={"Ja"}>Ja</option>
                                <option key={nanoid()} value={"Nei"}>Nei</option>
                            </select>
                        </label>
                    ) : null}


                    {(isLeilighetFucntion(ByggType) && isEkonomiInkludert === "Ja") ?
                        <Fragment>
                            <label className="label">Strøm Pris: [Øre/kWh]
                                <input
                                    className="input"
                                    type="number"
                                    onChange={handleChange}
                                    name="strømpris"
                                    value={strømpris}
                                    min={5}
                                    max={1200} />
                            </label>

                            <label className="label">SCOP:
                                <div className="flex-end">
                                    <MouseOverPopover popoverText={inputDesciption.SCOP} />
                                    <input
                                        className="input"
                                        type="text"
                                        onChange={handleChange}
                                        name="SCOP"
                                        value={SCOP}

                                    />
                                </div>
                            </label>

                        </Fragment>
                        : null}


                 


                    {isVisning.løsning ?    <LøsningTyper kWh={kWhCTC} setSystem={setSystem} />
                    : <button className="sisteNeste" onClick={(e)=>handleVisning(e,{name:"løsning",value:true}) }>Beregn</button> }



                    {systemValg === "Spiral" ? <SpiralSys kWhEnheter={kWhCTC} prosjektData={prosjketData} handleChange={handleChange} spiralResultat={printResultat} handleVisning={handleVisning} />
                        : null}
                    {systemValg === "Veksler" ? <SpiralSys kWhEnheter={kWhCTC} prosjektData={prosjketData} handleChange={handleChange} spiralResultat={printResultat} handleVisning={handleVisning} />
                        : null}
                    {systemValg === "AquaEfficency" ? <AquaEfficency kWhEnheter={kWhCTC} prosjektData={prosjketData} AquaEfficencyResultat={printResultat} handleVisning={handleVisning} />
                        : null}


                </form>



                }


        </div>


    )
}