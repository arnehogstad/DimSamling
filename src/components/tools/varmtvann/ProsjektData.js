import React from "react"
import { nanoid } from '@reduxjs/toolkit'
import * as staticData from '../../static/staticData'
import BeregnVV from "./BeregnVV"
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';



export default function ProsjektData(props) {

    const [prosjketData, setProsjektData] = React.useState(
        {
            Navn: "Prosjekt Navn",
            Referanse: "Navn",
            ByggType: "Bar",
            antall: 330, // For CTC file to caculate kWh, can be number of students, guests or dusje
            leiligheter: 10,
            årsforbruk: 0,

            netVannTemp: 7,
            tappeVannTemp: 40,
            berederTemp: 70,


            vpEffekt: 11,
            settpunktVP: 55,
            spiralVolume: 500,
            startVolume: 200,
            startTemp: 52,

            spissElEffekt: 15,
            spissSettpunkt: 70,
            spissVolume: 400,

            uid: nanoid(),
            sliderX: 50,
        }
    )

    const { Navn, Referanse, ByggType, bra, leiligheter, antall, årsforbruk, netVannTemp, tappeVannTemp, berederTemp, vpEffekt, settpunktVP, spiralVolume, startVolume, startTemp, spissElEffekt, spissSettpunkt, spissVolume, uid, sliderX } = prosjketData



    function handleChange(event) {
        const { name, value } = event.target
        setProsjektData(prevFormData => {
            return {
                ...prevFormData,
                [name]: value,
            }
        })
    }

   
const kW = BeregnVV(ByggType,antall,sliderX)




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



                <div className="selected">
                    <label className="label" htmlFor="ByggType">{staticData.byggTypeVVInnDataType[ByggType].navn}:</label>
                    <select
                        className="select"
                        id="antall"
                        value={antall}
                        onChange={handleChange}
                        name="antall"
                    >
                        {staticData.byggTypeVVInnDataType[ByggType].verdier.map((item) => (
                            <option key={nanoid()} value={item}>{item}</option>
                        ))}
                    </select>
                </div>

<p>Elektrik verdi: {kW}</p>

<Box sx={{ width: 200 }}>
<Slider name="sliderX" value={sliderX}  min={30} max={90} onChange={handleChange} />
</Box>
               

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


                <label className="label">Varmepumpe settpunkt [{'\u00b0'}C]:
                    <input
                        className="input"
                        type="text"
                        onChange={handleChange}
                        name="settpunktVP"
                        value={settpunktVP}
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


                <label className="label">Sett punkt for spissbereder [{'\u00b0'}C]
                    <input
                        className="input"
                        type="text"
                        onChange={handleChange}
                        name="spissSettpunkt"
                        value={spissSettpunkt}
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