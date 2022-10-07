import React from "react"
import { nanoid } from '@reduxjs/toolkit'
import * as staticData from '../../static/staticData'
import { minVolSpiss,minVolVP, BeregnEffekt, kWhData, BeregnVolEl, BeregnForvarmSpiss } from "./BeregnVV"
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';
import "../../../styles/varmtvann/VVStyle.css"
import Stack from '@mui/material/Stack';
import ElectricMeterIcon from '@mui/icons-material/ElectricMeter';
import PropaneTankIcon from '@mui/icons-material/PropaneTank';
import OfflineBoltIcon from '@mui/icons-material/OfflineBolt';
import HvacIcon from '@mui/icons-material/Hvac';
import { flexbox } from "@mui/system";
import { Row } from "jspdf-autotable";


export default function ProsjektData(props) {

    const [prosjketData, setProsjektData] = React.useState(
        {
            Navn: "Prosjekt Navn",
            Referanse: "Navn",
            ByggType: "Boligblokk (3+ personer)",
            antall: 10, // For CTC file to caculate kWh, can be number of students, guests or dusje
            leiligheter: 10,
            årsforbruk: 0,

            netVannTemp: 7,
            tappeVannTemp: 40,



            vpEffekt: 11,
            settpunktVP: 55,
            spiralVolume: 500,
            startVolume: 200,
            startTemp: 52,
            forvarmingELeffekt: 0,

            spissElEffekt: 15,
            spissSettpunkt: 65,
            spissVolume: 400,

            backupType: "Spiss el-kolbe som dekker 100% av behov",

            uid: nanoid(),
            sliderVolEl: 40,
            sliderForvarmingSpiss: 60,
        }
    )

    const { Navn, Referanse, ByggType, bra, leiligheter, antall, årsforbruk, netVannTemp, tappeVannTemp, vpEffekt, settpunktVP, spiralVolume, startVolume, startTemp,forvarmingELeffekt, spissElEffekt, spissSettpunkt, spissVolume, backupType, uid, sliderVolEl, sliderForvarmingSpiss } = prosjketData




    function handleChange(event) {
        const { name, value } = event.target
        if (name === "ByggType") {
            setProsjektData(prevFormData => {
                return {
                    ...prevFormData,
                    [name]: value,
                    antall: staticData.byggTypeVVInnDataType[value].verdier[4],
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

    const [kWhEnheter, setKWhEnheter] = React.useState([])
    const [kWh, setkWh] = React.useState(0) //total kWh 



    function leggtil(e) {
        e.preventDefault()
        setkWh(prev => prev + kWhData(ByggType, antall))
        setKWhEnheter(prev => [...prev, { Navn: ByggType, Antall: antall, kWh: kWhData(ByggType, antall), uid: nanoid() }])
    }

    const handleDelete = (item) => {
        setKWhEnheter(kWhEnheter.filter(i => i !== item))
        setkWh(prev => prev - item.kWh)
    }

    let kWTabel = kWhEnheter.map((item) => (
        <tr key={nanoid()} className="tbro">
            <td key={nanoid()} className="tbel">{item.Navn}</td>
            <td key={nanoid()} className="tbel">{item.Antall}</td>
            <td key={nanoid()} className="tbel"><button className="fjern" onClick={() => handleDelete(item)}>Fjern</button></td>
        </tr>
    ))


    let [kW, TotalVol70C] = BeregnVolEl(ByggType, antall, sliderVolEl, kWh)
    let [forvarmingVol, spissVol] = BeregnForvarmSpiss(TotalVol70C, sliderForvarmingSpiss, settpunktVP, spissSettpunkt)

    let dekningGradMaks = (settpunktVP - netVannTemp) / (spissSettpunkt - netVannTemp)
    let spisseff = BeregnEffekt(spissVol, kWh, spissSettpunkt)
    let vpefff = BeregnEffekt(forvarmingVol, kWh * dekningGradMaks, settpunktVP)


    let minVolume = {
        minimumVPVol: minVolVP(vpEffekt, kWh * dekningGradMaks, settpunktVP),
        minimumSpissVol: minVolSpiss(spissElEffekt, kWh, spissSettpunkt,backupType,dekningGradMaks,forvarmingELeffekt)
    }

    console.log(minVolume.minimumVPVol, minVolume.minimumSpissVol, dekningGradMaks)
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


                <div className="selected">
                    <label className="label" htmlFor="ByggType">Bygg Type:</label>
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


                <label className="label">Spiss settpunkt[{'\u00b0'}C]:
                    <input
                        className="input"
                        type="number"
                        onChange={handleChange}
                        name="spissSettpunkt"
                        value={spissSettpunkt}
                    /></label>

                <label className="label" >VP setpunkt [{'\u00b0'}C]:
                    <input
                        className="input"
                        type="number"
                        onChange={handleChange}
                        name="settpunktVP"
                        value={settpunktVP}
                    /></label>

                <label className="label" >Nett vann  temperatur [{'\u00b0'}C]:
                    <input
                        className="input"
                        type="number"
                        onChange={handleChange}
                        name="netVannTemp"
                        value={netVannTemp}
                    /></label>



                <button className="sisteNeste" onClick={leggtil}>Legg til enhet</button>

                {kWhEnheter.length !== 0 ? (




                    <div className="VVresults">
                        <div className="VVtable">
                            <table>
                                <thead>
                                    <tr>
                                        <th className="tbhr">Navn</th>
                                        <th className="tbhr">Antall</th>
                                        <th className="tbhr">Fjern</th>
                                    </tr>
                                </thead>
                                <tbody>{kWTabel}</tbody>
                            </table>
                        </div>


                        <label className="label" >VP effekt [kW]:
                            <input
                                className="input"
                                type="number"
                                onChange={handleChange}
                                name="vpEffekt"
                                value={vpEffekt}
                            /></label>

                        <label className="label" >Spiss el-kolbe effekt [kW]:
                            <input
                                className="input"
                                type="number"
                                onChange={handleChange}
                                name="spissElEffekt"
                                value={spissElEffekt}
                            /></label>

                        <div className="selected">
                            <label className="label" htmlFor="backUpType">Backup type:</label>
                            <select
                                className="select"
                                id="backupType"
                                value={backupType}
                                onChange={handleChange}
                                name="backupType"
                            >
                                <option key={nanoid()} value="Spiss el-kolbe som dekker 100% av behov">Spiss dekker 100% av behov</option>
                                <option key={nanoid()} value="Spiss el-kolbe">Spiss el-kolbe</option>
                                <option key={nanoid()} value="Spiss el-kolbe plus el-kolbe i forvarming">Spiss el-kolbe plus el-kolbe i forvarming </option>
                            </select>
                        </div>




                        {backupType === "Spiss el-kolbe plus el-kolbe i forvarming" ? (
                            <div className="VVresults">
                           <label className="label" >El-kolbe effekt i forvarming tanke: [kW]:
                                <input
                                    className="input"
                                    type="number"
                                    onChange={handleChange}
                                    name="forvarmingELeffekt"
                                    value={forvarmingELeffekt}
                                /></label>
                                    </div>
                        ) : null}

                            <p>Minimum anbefalt volume for forvarmingbereder er {minVolume.minimumVPVol} liter og for spissbereder er {minVolume.minimumSpissVol} liter.</p>     
                        <div className="VVSlider">

                            <Box sx={{ width: 500, mt: 5 }}  >


                                <Stack spacing={2} direction="row" alignItems="center">
                                    <OfflineBoltIcon sx={{ height: 50 }} />
                                    <Slider
                                        name="sliderVolEl"
                                        value={sliderVolEl}
                                        min={20}
                                        max={80}
                                        marks={[{ value: 20, label: "Mer effekt" }, { value: 80, label: "Mer VV volum" }]}
                                        onChange={handleChange} />
                                    <PropaneTankIcon sx={{ height: 50 }} />
                                </Stack>
                            </Box>
                            <p>Samlet effekt av Varmepumpe og el-kolbe i spissbereder: {kW} kW </p>
                            <p> VV 70C volum: {TotalVol70C} L</p>
                        </div>



                        <div className="VVSlider">
                            <Box sx={{ width: 500, mt: 5 }}  >

                                <Stack spacing={2} direction="row" alignItems="center">
                                    <ElectricMeterIcon sx={{ height: 50 }} />
                                    <Slider
                                        name="sliderForvarmingSpiss"
                                        value={sliderForvarmingSpiss}
                                        min={20}
                                        max={70}
                                        marks={[{ value: 20, label: "Mer spiss volume" }, { value: 70, label: "Mer formvarming volum" }]}
                                        onChange={handleChange} />
                                    <HvacIcon sx={{ height: 50 }} />
                                </Stack>


                                <Stack spacing={2} mt={5} direction="row" alignItems="center" justifyContent='space-between'>
                                    <p>Spiss: {spissVol} L og {spisseff} kW </p>
                                    <p >Forvarming: {forvarmingVol} L og {vpefff} kW </p>

                                </Stack>


                            </Box>

                        </div>

                    </div>

                ) : null}


                {/*

<label className="label">Antall leiligheter:
    <input
        className="input"
        type="text"
        onChange={handleChange}
        name="leiligheter"
        value={leiligheter}
    /></label>



<label className="label">Antall personer per leilighet:
    <input
        className="input"
        type="text"
        onChange={handleChange}
        name="antall"
        value={antall}
    /></label>




                <label className="label">Års energiforbruk [kWh]:
                    <input
                        className="input"
                        type="text"
                        onChange={handleChange}
                        name="årsforbruk"
                        value={årsforbruk}
                    /></label>





                <label className="label">Net vann temperatur [{'\u00b0'}C]:
                    <input
                        className="input"
                        type="text"
                        onChange={handleChange}
                        name="netVannTemp"
                        value={netVannTemp}
                    /></label>





                <label className="label">Ønsket tappevann temperatur [{'\u00b0'}C]:
                    <input
                        className="input"
                        type="text"
                        onChange={handleChange}
                        name="tappeVannTemp"
                        value={tappeVannTemp}
                    /></label>



                <label className="label">Settpunkt på bereder [{'\u00b0'}C]:
                    <input
                        className="input"
                        type="text"
                        onChange={handleChange}
                        name="berederTemp"
                        value={berederTemp}
                    /></label>


                <label className="label">Varmepumpe effekt [kW]:
                    <input
                        className="input"
                        type="text"
                        onChange={handleChange}
                        name="vpEffekt"
                        value={vpEffekt}
                    /></label>




                <label className="label">Start volume spiralbereder [l]:
                    <input
                        className="input"
                        type="text"
                        onChange={handleChange}
                        name="startVolume"
                        value={startVolume}
                    /></label>


                <label className="label">Temperatur på startvolum [{'\u00b0'}C]:
                    <input
                        className="input"
                        type="text"
                        onChange={handleChange}
                        name="startTemp"
                        value={startTemp}
                    /></label>


                <label className="label">Effekt av spissbereder el-kolbe[kW]:
                    <input
                        className="input"
                        type="text"
                        onChange={handleChange}
                        name="spissElEffekt"
                        value={spissElEffekt}
                    /></label>



                <label className="label">Volume of spissbereder [l]:
                    <input
                        className="input"
                        type="text"
                        onChange={handleChange}
                        name="spissVolume"
                        value={spissVolume}
                    /></label>



*/}

            </form>
        </div>


    )
}