import React from "react"
import { vindu_rettning, Avsjkermings } from "./StaticData/KJstaticData"
import * as beregn from "./beregn"
import { nanoid } from "@reduxjs/toolkit"

export default function Vindu(props) {
    const [vinduData, setVinduData] = React.useState(
        {
            vinduArealet: 1,
            avskjerming: "Uten Avskjerming",
            vinduRettning: "Sør",
            uid: nanoid()
        }
    )

    let { vinduRettning, avskjerming, vinduArealet } = vinduData
   

    const avskjerming_type = Object.keys(Avsjkermings)

    const [vindus, setVindus] = React.useState(props.vindus)

    function handleChange(event) {
        const { name, value } = event.target
        setVinduData(prev => {
            return {
                ...prev,
                [name]: value,
            }
        })
        console.log(props.innDatas)
    }


    const handleDelete = (item) => {
        setVindus(vindus.filter(i => i !== item))
    }


    //logs the data from vinduData(the current page) to a matrix of all vindus//Adds a id for deletion fuctoin
    function saveVindu() {
        setVindus(prev =>
            [...prev, {
                vinduArealet: vinduArealet,
                avskjerming: avskjerming,
                vinduRettning: vinduRettning,
                strål: strålEffekt(vinduRettning, avskjerming, vinduArealet),
                uid: nanoid()
                  }])
    }



    function strålEffekt(vinduRettning, avskjermingtype, vinduArealet) {
        avskjerming = Avsjkermings[avskjermingtype]
        let strål = 0

        switch (vinduRettning) {
            case "Sør":
                strål = Math.round((44 + 7 * 32) * vinduArealet * avskjerming)
                break

            case "Vest-Øst":
                strål = Math.round((11) * vinduArealet * avskjerming * 32)
                break

            case "Nord":
                strål = Math.round((6) * vinduArealet * avskjerming * 32)
                break

            default:
                return 0
        }
        return strål
    }





    //maps the data from vindus (all the windows) to the jsx
    let vinduTable = vindus.map((item) => (
        <tr key={nanoid()} className="tbro">
            <td key={nanoid()} className="tbel">{item.avskjerming}</td>
            <td key={nanoid()} className="tbel">{item.vinduRettning}</td>
            <td key={nanoid()} className="tbel">{item.vinduArealet}</td>
                 <td key={nanoid()} className="tbel">{item.strål}</td>
            <td key={nanoid()} className="tbel"><button className="fjern" onClick={() => handleDelete(item)}>Fjern</button></td>
        </tr>
    ))



    return (
        <div >
            <div className="border">

            <div className="knapper" >
        <button className="KJButtons" onClick={() => {props.vindu_data(vindus) ; props.pageModifier("InnData")}}>Inndata</button>
        <button className="KJButtonsActive" onClick={() => {props.vindu_data(vindus) ;props.pageModifier("vindu")}}>Vindu</button>
        <button className="KJButtons" onClick={() =>  {props.vindu_data(vindus) ; props.pageModifier("ovrige")}}>Øvrige laster</button>
        <button className="KJButtons" onClick={() => {props.vindu_data(vindus) ; props.pageModifier("oversikt")}}>Oversikt</button>
        </div>

                <form className="formInnData">

                    <div className="label">
                        <label htmlFor="avskjerming">Avsjkerming:</label>
                        <select
                            className="select"
                            id="avskjerming"
                            value={vinduData.avskjerming}
                            onChange={handleChange}
                            name="avskjerming"
                        >
                            {avskjerming_type.map((item) => (
                                <option key={nanoid()} value={item}>{item}</option>
                            ))}
                        </select>
                    </div>

                    <div className="label">
                        <label htmlFor="vinduRettning">Vindu Rettning:</label>
                        <select
                            className="select"
                            id="vinduRettning"
                            value={vinduData.vinduRettning}
                            onChange={handleChange}
                            name="vinduRettning"
                        >
                            {vindu_rettning.map((item) => (
                                <option key={nanoid()} value={item}>{item}</option>
                            ))}
                        </select>
                    </div>


                    <label className="label">Vindu Arealet [m&#xB2;]:
                        <input
                            className="input"
                            type="number"
                            onChange={handleChange}
                            name="vinduArealet"
                            value={vinduData.vinduArealet}
                        /></label>


                </form>
                <div className="knapper">
                    <button className="sisteNeste" onClick={saveVindu}>Legg inn vindu</button>
                </div>

                {vindus.length !== 0 ? (
                    <div className="table">
                        <table>
                            <thead>
                                <tr>
                                    <th className="tbhr">Avskjerming</th>
                                    <th className="tbhr">Vindu Rettning</th>
                                    <th className="tbhr">Vindu Arealet [m2]</th>
                                     <th className="tbhr">Stråling last [W]</th>
                                    <th className="tbhr">Fjern</th>
                                </tr>
                            </thead>
                            <tbody>{vinduTable}</tbody>
                        </table>
                    </div>
                ) : null}

            </div>




         

        </div>
    )
}