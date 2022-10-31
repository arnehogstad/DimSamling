import React, { Fragment } from "react"
import { nanoid } from "@reduxjs/toolkit"
import { isLeilighetFucntion, sizeVP, minVolSpiss, minVolVP, BeregnEffekt, kWhData, BeregnVolEl, BeregnForvarmSpiss } from "./BeregnVV"
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { Stack } from "@mui/system"


export default function SpiralSys(props) {

let  {netVannTemp, tappeVannTemp, perPersonVV, spissSettpunkt, settpunktVP} = props.prosjektData
let  {Navn,kWh} = props.kWhEnheter
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

let {vpEffekt,forvarmingELeffekt, spissElEffekt,  dekningGradProsent, backupType} = spiral
 
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
let [sizeVpUpper, sizeVpLower] = sizeVP(props.kWhEnheter, perPersonVV, spissSettpunkt, netVannTemp, settpunktVP, tappeVannTemp)

return(

<Fragment>
    <h3>Spiral:</h3>
                {isLeilighetFucntion(Navn) ? 
                <p className="longText">Anbefalt varmepumpe størelse basert på driftstid er minst {sizeVpLower} kW og maks {sizeVpUpper} kW. </p> : null}
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

                <p className="longText"> Med slider kan man velge mellom akesptabelle verdier for forvarmingsbereder og spissbereder. Merk at med høyere volum kan man bennytte varmepumpen på en mer effektivt måte. </p>

              
                    <Box sx={{ width: 200, m: 3,  mx: 'auto' }}  >
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
            
           

                 <p style={{fontStyle: "italic", fontSize: 10}}>{`Maks teoretisk dekning grad er ${dekningGradMaksProsent}%,  Valgt dekningsgrad: ${dekningGradProsent}%`}</p>               


                <p>Volume for forvarmingbereder er {minimumVPVol} liter og for spissbereder er {minimumSpissVol} liter.</p>
              </Fragment>

)    
}