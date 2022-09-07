import React, { useEffect } from "react"
import { vindu_rettning, Avsjkermings } from "./data"
import * as beregn from "./beregn"


export default function Vindu(props) {
    const [vinduData, setVinduData] = React.useState(
        {
            vinduArealet: 1,
            avskjerming: "Uten Avskjerming",
            vinduRettning: "Sør",
            strål: 268,
            trans: 100
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

    //Writes the effect to the vinduData  //32 should be changed to get data from Inndata
    function solEffect(vinduRettning, avskjerming, vinduArealet) {
        
        setVinduData(prev => {
            return {
                ...prev,
                trans: beregn.Vindu_trans(props.innDatas.Byggeår,vinduArealet,props.innDatas.MaksT,props.innDatas.ØnsketT),
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

    //logs the data from vinduData(the current page) to a matrix of all windows
    function saveVindu() { setVindus(prev => [...prev, { vinduData }]) }

    //calls on the soleffect function to add the strål the strål (last) to the vinduData after the data is taken in
    useEffect(() => {
        solEffect(vinduData.vinduRettning, Avsjkermings[vinduData.avskjerming], vinduData.vinduArealet)

    }, [vinduData.vinduArealet, vinduData.avskjerming, vinduData.vinduRettning])

    //maps the data from vindus (all the windows) to the jsx
    useEffect(() => {
        setVinduTable(vindus.map((item) => (
            <tr>
                <td className="tbel">{item.vinduData.vinduArealet}</td>
                <td className="tbel">{item.vinduData.avskjerming}</td>
                <td className="tbel">{item.vinduData.vinduRettning}</td>
                <td className="tbel">{item.vinduData.trans}</td>
                <td className="tbel">{item.vinduData.strål}</td>
                <td className="tbel"><button className="fjern" onClick={() => handleDelete(item)}>Fjern</button></td>
            </tr>
        )))
    }, [vindus])

    let total_strål = [vindus.reduce((a, b) => a + parseInt(b.vinduData.strål), 0)]

    return (
        <div>

            <form className="formInnData">

                <label className="label" htmlFor="avskjerming">Avsjkerming:</label>
                <select
                    className="select"
                    id="avskjerming"
                    value={vinduData.avskjerming}
                    onChange={handleChange}
                    name="avskjerming"
                >
                    {avskjerming_type.map((item) => (
                        <option value={item}>{item}</option>
                    ))}
                </select>

                <label className="label" htmlFor="vinduRettning">Vindu Rettning:</label>
                <select
                    className="select"
                    id="vinduRettning"
                    value={vinduData.vinduRettning}
                    onChange={handleChange}
                    name="vinduRettning"
                >
                    {vindu_rettning.map((item) => (
                        <option value={item}>{item}</option>
                    ))}
                </select>

                <label className="label">Vindu Arealet [m2]:
                    <input
                        className="input"
                        type="number"
                        onChange={handleChange}
                        name="vinduArealet"
                        value={vinduData.vinduArealet}
                    /></label>


            </form>
            <button className="handlingsKnapp" onClick={saveVindu}>Lagre Vindu</button>




            {vindus.length !== 0 ? (
                <div className="table">
                    <table>
                        <thead>
                            <tr>
                                <th className="tbel">Vindu Arealet [m2]</th>
                                <th className="tbel">Avskjerming</th>
                                <th className="tbel">Vindu Rettning</th>
                                <th className="tbel">Transmission last [W]</th>
                                <th className="tbel">Sol Strål [W]</th>
                            </tr>
                        </thead>
                        <tbody>{vinduTable}</tbody>
                    </table>
                </div>
            ) : null}

            <button className="handlingsKnapp" onClick={() => props.vindu_data(total_strål)}>Neste Steg</button>
        </div>
    )
}