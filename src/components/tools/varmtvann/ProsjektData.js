import React from "react"
import { nanoid } from '@reduxjs/toolkit'
import * as staticData from '../../static/staticData'
import { isLeilighetFucntion, sizeVP, minVolSpiss, minVolVP, BeregnEffekt, kWhData, BeregnVolEl, BeregnForvarmSpiss } from "./BeregnVV"
import "../../../styles/varmtvann/VVStyle.css"
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { Stack } from "@mui/system"



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
            spiralVolume: 500,
            startVolume: 200,
            startTemp: 52,
            forvarmingELeffekt: 5,

            spissElEffekt: 15,
            spissSettpunkt: 65,
            spissVolume: 400,

            dekningGradProsent: 70,
            backupType: "Spiss el-kolbe som dekker 100% av behov",

            uid: nanoid(),
            sliderVolEl: 40,
            sliderForvarmingSpiss: 60,
        }
    )

    const { Navn, Referanse, ByggType, bra, leiligheter, antall, årsforbruk, netVannTemp, tappeVannTemp, perPersonVV, vpEffekt, settpunktVP, spiralVolume, startVolume, startTemp, forvarmingELeffekt, spissElEffekt, spissSettpunkt, spissVolume, dekningGradProsent, backupType, uid, sliderVolEl, sliderForvarmingSpiss } = prosjketData




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


    let dekningGradMaksProsent = Math.round((settpunktVP - netVannTemp) / (spissSettpunkt - netVannTemp) * 100)

    let minimumVPVol = minVolVP(vpEffekt, kWh, settpunktVP, dekningGradProsent)
    let minimumSpissVol = minVolSpiss(spissElEffekt, kWh, spissSettpunkt, backupType, dekningGradProsent, forvarmingELeffekt, minimumVPVol)


    let [sizeVpUpper, sizeVpLower] = sizeVP(kWhEnheter, perPersonVV, spissSettpunkt, netVannTemp, settpunktVP, tappeVannTemp)

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

                {ByggType === "Leilighet (3+ personer)" || ByggType === "Leilighet (2-3 personer)" || ByggType === "Leilighet (1-2 personer)" ? (

                    <div >
                        <label className="label">Tappevann forbruk per person per dag [L]:
                            <input
                                className="input"
                                type="number"
                                onChange={handleChange}
                                name="perPersonVV"
                                value={perPersonVV}
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





                <label className="label">Spiss settpunkt [{'\u00b0'}C]:
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

                        {isLeilighetFucntion(kWhEnheter) ? <p style={{ fontStyle: "italic", marginBottom: 6 }}>Anbefalt varmepumpe størelse basert på driftstid er minst {sizeVpLower} kW og maks {sizeVpUpper} kW. </p> : null}
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

                        <p style={{ fontStyle: "italic", textAlign: 'center' }}>Fra slider ned kan man velge mellom akseptable volumer. Høyere volumer er mer ønskelig. </p>

                        <div className="VVSlider">
                            <Box sx={{ width: 400, mt: 5 }}  >
                                <Stack spacing={2} direction="row" alignItems="center">
                                    <Slider
                                        name="dekningGradProsent"
                                        value={dekningGradProsent}
                                        sx={{
                                            color: '#fbab18'
                                        }}
                                        min={60}
                                        max={dekningGradMaksProsent}
                                        marks={[{ value: 60, label: "Mer volum og effekt fra VP" }, { value: dekningGradMaksProsent, label: "Mer volum og effekt fra VP" }]}
                                        onChange={handleChange} />
                                </Stack>
                            </Box>
                        </div>

                        <p>Volume for forvarmingbereder er {minimumVPVol} liter og for spissbereder er {minimumSpissVol} liter.</p>


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