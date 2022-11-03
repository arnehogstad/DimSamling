import React, { Fragment } from "react"
import { nanoid } from '@reduxjs/toolkit'
import * as staticData from "./StaticData/VVStaticData"
import { kWhData, isLeilighetFucntion } from "./BeregnVV"
import "../../../styles/varmtvann/VVStyle.css"
import SpiralSys from "./SpiralSys"
import LøsningTyper from "./LøsningTyper"
import AquaEfficency from "./AquaEfficency"
import { Switch } from "@mui/material"
import MouseOverPopover from "../../static/Popover"
import { inputDesciption } from "./StaticData/VVStaticData"

export default function ProsjektData(props) {

    const [prosjketData, setProsjektData] = React.useState(
        {
            Navn: "Prosjekt Navn",
            Referanse: "Navn",
            ByggType: "Leilighet (3+ personer)",
            antall: 10, // For CTC file to caculate kWh, can be number of students, guests or dusje
            leiligheter: 10,
            årsforbruk: 0,

            netVannTemp: 7,
            tappeVannTemp: 40,
            perPersonVV: 70,


            vpEffekt: 11,
            settpunktVP: 55,
            startVolume: 200,
            startTemp: 52,
            spissSettpunkt: 65,
            isEkonomiInkludert: "Nei",
            strømpris: 120,
            SCOP: 2.5,


        }
    )

    const { Navn, Referanse, ByggType, bra, antall, årsforbruk, netVannTemp, tappeVannTemp, perPersonVV, settpunktVP, spissSettpunkt, isEkonomiInkludert, strømpris, SCOP } = prosjketData

    const [visBeregning, setVisBeregning] = React.useState(false)


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
                        [name]: parseInt(value),
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


    // function beregn(e) {
    // e.preventDefault()
    //   setKWhEnheter({ Navn: ByggType, Antall: antall, kWh: kWhData(ByggType, antall), uid: nanoid() })

    //}

    let kWhCTC = kWhData(ByggType, antall)

    const [systemValg, setSystemValg] = React.useState("None")

    const setSystem = (e, text) => {
        e.preventDefault()
        setSystemValg(text)
    }



    return (
        <div className="border">

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
                                    type="number"
                                    onChange={handleChange}
                                    name="SCOP"
                                    value={SCOP}
                                    min={1.5}
                                    max={4} />
                            </div>
                        </label>

                    </Fragment>
                    : null}


                {visBeregning ? null : <button className="sisteNeste" onClick={(e) => (e.preventDefault, setVisBeregning(true))}>Beregn</button>}


                {visBeregning ? <LøsningTyper kWh={kWhCTC} setSystem={setSystem} /> : null}



                {systemValg === "Spiral" ? <SpiralSys kWhEnheter={kWhCTC} prosjektData={prosjketData} handleChange={handleChange} />
                    : null}
                {systemValg === "Veksler" ? <SpiralSys kWhEnheter={kWhCTC} prosjektData={prosjketData} handleChange={handleChange} />
                    : null}
                {systemValg === "AquaEfficency" ? <AquaEfficency kWhEnheter={kWhCTC} prosjektData={prosjketData} />
                    : null}





            </form>
        </div>


    )
}