import React, { Fragment } from "react"
import { nanoid } from "@reduxjs/toolkit"
import { isLeilighetFucntion, sizeVP, minVolSpiss, minVolVP, elEnergiForbrukFn } from "./BeregnVV"
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { Stack } from "@mui/system"
import MouseOverPopover from "../../static/Popover";
import { inputDesciption } from "./StaticData/VVStaticData"



export default function SpiralSys(props) {

    let { ByggType,antall,netVannTemp, tappeVannTemp, perPersonVV, spissSettpunkt, settpunktVP, isEkonomiInkludert, SCOP, strømpris } = props.prosjektData
    let  kWh  = props.kWhEnheter

    const [spiral, setSpiral] = React.useState(
        {
            vpEffekt: 15,
            forvarmingELeffekt: 5,
            spissElEffekt: 15,
            spissVolume: 400,

            dekningGradProsent: 70,
            backupType: "Spiss el-kolbe som dekker 100% av behov",

            sliderVolEl: 40,
            sliderForvarmingSpiss: 60,
        }
    )

    let { vpEffekt, forvarmingELeffekt, spissElEffekt, dekningGradProsent, backupType } = spiral

    function handleChange(event) {
        const { name, value, type } = event.target
        if (type === "number") {
            setSpiral(prevFormData => {
                return {
                    ...prevFormData,
                    [name]: parseInt(value),
                }
            })
        } else {
            setSpiral(prevFormData => {
                return {
                    ...prevFormData,
                    [name]: value,
                }
            })
        }
    }


    let dekningGradMaksProsent = Math.round((settpunktVP - netVannTemp) / (spissSettpunkt - netVannTemp) * 100)
    let minimumVPVol = minVolVP(vpEffekt, kWh, settpunktVP, dekningGradProsent)
    let minimumSpissVol = minVolSpiss(spissElEffekt, kWh, spissSettpunkt, backupType, dekningGradProsent, forvarmingELeffekt, minimumVPVol)
    let [sizeVpUpper, sizeVpLower] = sizeVP(ByggType,antall, perPersonVV, spissSettpunkt, netVannTemp, settpunktVP, tappeVannTemp)
    let [totalenergiForbruk, spissElForbruk, VPEnergibruk, energiSpart, energiSpartProsent, SpartKroner] = elEnergiForbrukFn(ByggType,antall, perPersonVV, spissSettpunkt, netVannTemp, tappeVannTemp, dekningGradProsent, SCOP, strømpris)

    
    return (

        <Fragment>
            <h3>Spiral:</h3>

            {isLeilighetFucntion(ByggType) ?
                <p className="longText">Anbefalt varmepumpe størelse basert på driftstid er minst {sizeVpLower} kW og maks {sizeVpUpper} kW. </p>
                : null}

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

            <div className="label">
                <label htmlFor="backUpType">Backup type:</label>
                <div className="flex-end">
                    <MouseOverPopover popoverText={inputDesciption.backupType} />
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

            <p className="longText"> Med slider kan man velge mellom akesptabelle verdier for volum av forvarmingsbereder og spissbereder. Merk at med høyere volum kan man bennytte varmepumpen på en mer effektivt måte. </p>


            <Box sx={{ width: 200, m: 3, mx: 'auto' }}  >
                <Stack spacing={2} direction="row" alignItems="center">
                    <Slider
                        name="dekningGradProsent"
                        value={dekningGradProsent}
                        sx={{
                            color: '#fbab18'
                        }}
                        min={60}
                        max={dekningGradMaksProsent}
                        marks={[{ value: 60, label: "Mindre volum og effekt fra VP" }, { value: dekningGradMaksProsent, label: "Mer volum og effekt fra VP" }]}
                        onChange={handleChange} />
                </Stack>
            </Box>



            <p style={{ fontStyle: "italic", fontSize: 10 }}>{`Maks teoretisk dekning grad er ${dekningGradMaksProsent}%,  Valgt dekningsgrad: ${dekningGradProsent}%`}</p>


            <p>Volume for forvarmingbereder er {minimumVPVol} liter og for spissbereder er {minimumSpissVol} liter.</p>
           
            {(isLeilighetFucntion(ByggType) && isEkonomiInkludert==="Ja") ?
                <Fragment>
                    <h3>Ekonomisk Beregning:</h3>
                    <ul style={{ maxWidth: 500 }}>
                        <li>Årlig strømforbruk ved bruk av el-kjell ville ha vært {totalenergiForbruk} kWh.</li>
                        <li>Årlig strømforbruk av varmepumpe og spissbereder vil være {VPEnergibruk+spissElForbruk} kWh.</li>
                        <li>Strømforbruk er redusert med {energiSpartProsent} % ved bruk av varmepumpe .</li>
                        <li>Årlig energisparing ved bruk av varmepumpe er {energiSpart} kWh.</li>
                        <li>Årlig sparing ved bruk av varmepumpe er {SpartKroner} NOK.</li>
                    </ul>

               </Fragment>
                : null}
        </Fragment>

    )
}