import React, { useEffect } from "react"
import { vindu_rettning, Avsjkermings } from "./StaticData/KJstaticData"
import * as beregn from "./beregn"
import { nanoid } from "@reduxjs/toolkit"

export default function Vindu(props) {
    const [vinduData, setVinduData] = React.useState(
        {
            vinduArealet: 1,
            avskjerming: "Uten Avskjerming",
            vinduRettning: "Sør",
            strål: 268,
            trans: 100,
            uid: nanoid()
        }
    )


    const [vindus, setVindus] = React.useState([])
    const [vinduTable, setVinduTable] = React.useState([])

    const avskjerming_type = Object.keys(Avsjkermings)

    function handleChange(event) {
        const { name, value } = event.target
        setVinduData(prev => {
            return {
                ...prev,
                [name]: value,
            }
        })
    }


    const handleDelete = (item) => {
        setVindus(vindus.filter(i => i !== item))
    }


    //calls on the soleffect function to add the strål the strål (last) to the vinduData after the data is taken in
    useEffect(() => {
        //Writes the effect to the vinduData  
        function solEffect(vinduRettning, avskjerming, vinduArealet) {

            setVinduData(prev => {
                return {
                    ...prev,
                    trans: beregn.Vindu_trans(props.innDatas.Byggeår, vinduArealet, props.innDatas.MaksT, props.innDatas.ØnsketT),
                }
            })

            if (vinduRettning === "Sør") {
                setVinduData(prev => {
                    return {
                        ...prev,
                        strål: Math.round((44 + 7 * 32) * vinduArealet * avskjerming)
                    }
                })
                //
            } else if (vinduRettning === "Vest-Øst") {
                setVinduData(prev => {
                    return {
                        ...prev,
                        strål: Math.round((11) * vinduArealet * avskjerming * 32)
                    }
                })
            } else if (vinduRettning === "Nord") {
                setVinduData(prev => {
                    return {
                        ...prev,

                        strål: Math.round((6) * vinduArealet * avskjerming * 32)
                    }
                })
            }

        }


        solEffect(vinduData.vinduRettning, Avsjkermings[vinduData.avskjerming], vinduData.vinduArealet)

    }, [vinduData.vinduArealet, vinduData.avskjerming, vinduData.vinduRettning])



    //logs the data from vinduData(the current page) to a matrix of all windows//Adds a id for deletion fuctoin
    function saveVindu() {
        setVinduData(prev => {
            return {
                ...prev,
                uid: nanoid()
            }
        })
        setVindus(prev => [...prev, vinduData])
    }


    let vindusPrint = vindus.map((item) => (Object.values(item)))



    //maps the data from vindus (all the windows) to the jsx
    useEffect(() => {
        setVinduTable(vindus.map((item) => (
            <tr key={nanoid()} className="tbro">
                <td key={nanoid()} className="tbel">{item.vinduArealet}</td>
                <td key={nanoid()} className="tbel">{item.avskjerming}</td>
                <td key={nanoid()} className="tbel">{item.vinduRettning}</td>
                <td key={nanoid()} className="tbel">{item.trans}</td>
                <td key={nanoid()} className="tbel">{item.strål}</td>
                <td key={nanoid()} className="tbel"><button className="fjern" onClick={() => handleDelete(item)}>Fjern</button></td>
            </tr>
        )))
    }, [vindus])



    return (
        <div >
            <div className="border">
                <form className="formInnData">

                    <div className="selected">
                        <label className="label" htmlFor="avskjerming">Avsjkerming:</label>
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

                    <div className="selected">
                        <label className="label" htmlFor="vinduRettning">Vindu Rettning:</label>
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


                    <label className="label">Vindu Arealet [m2]:
                        <input
                            className="input"
                            type="number"
                            onChange={handleChange}
                            name="vinduArealet"
                            value={vinduData.vinduArealet}
                        /></label>


                </form>
                <div className="knapper">
                    <button className="handlingsKnapp" onClick={saveVindu}>Lagre Vindu</button>
                </div>

            {vindus.length !== 0 ? (
                <div className="table">
                    <table>
                        <thead>
                            <tr>
                                <th className="tbhr">Vindu Arealet [m2]</th>
                                <th className="tbhr">Avskjerming</th>
                                <th className="tbhr">Vindu Rettning</th>
                                <th className="tbhr">Transmisjon last [W]</th>
                                <th className="tbhr">Sol Strål [W]</th>
                                <th className="tbhr">Fjern</th>
                            </tr>
                        </thead>
                        <tbody>{vinduTable}</tbody>
                    </table>
                </div>
            ) : null}
            
            </div>




            <div className="knapper">
                <button className="sisteNeste" onClick={() => { props.pageView("InnData") }}>Forrige Steg</button>
                <button className="sisteNeste" onClick={() => { props.vindu_data(vindusPrint); props.pageView("ovrige") }}>Neste Steg</button>
            </div>

        </div>
    )
}