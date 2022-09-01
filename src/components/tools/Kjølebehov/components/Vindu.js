import React, { useEffect } from "react"
import { vindu_rettning, Avsjkermings } from "./data"


export default function InnData() {
    const [vinduData, setVinduData] = React.useState(
        {
            vinduArealet: 1,
            avskjerming: "Uten Avskjerming",
            vinduRettning: "Sør",
            effekt: 12
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
    //Writes the effect to the vinduData  //32 should be changed to get data from Inndata
    function solEffect(vinduRettning, avskjerming, vinduArealet) {

        if (vinduRettning === "Sør") {
            setVinduData(prev => {
                return {
                    ...prev,
                    effekt: (44 + 7 * 32) * vinduArealet * avskjerming
                }
            })
            //
        } else if (vinduRettning === "Vest-Øst") {
            setVinduData(prev => {
                return {
                    ...prev,
                    effekt: (11) * vinduArealet * avskjerming * 32
                }
            })
        } else if (vinduRettning === "Nord") {
            setVinduData(prev => {
                return {
                    ...prev,
                    effekt: (6) * vinduArealet * avskjerming * 32
                }
            })
        }

    }


    let totalEffekt = 0
    //logs the data from vinduData(the curret page) toa matrix of all windows
    function saveVindu() { setVindus(prev => [...prev, { vinduData }]) }

    //calls on the soleffect function to add the effet the effekt (last) to the vinduData after the data is taken in
    useEffect(() => {
        solEffect(vinduData.vinduRettning, Avsjkermings[vinduData.avskjerming], vinduData.vinduArealet)

        totalEffekt = totalEffekt + vinduData.effekt
    }

        , [vinduData.vinduArealet, vinduData.avskjerming, vinduData.vinduRettning])

    //maps the data from vindus (all the windows) to the jsx
    useEffect(() => {
        setVinduTable(vindus.map((item) => (
            <tr>
                <td>{item.vinduData.vinduArealet}</td>
                <td>{item.vinduData.avskjerming}</td>
                <td>{item.vinduData.vinduRettning}</td>
                <td>{item.vinduData.effekt}</td>
            </tr>
        )))
    }, [vindus])

    return (
        <div>

            <form>

                <label htmlFor="avskjerming">Avsjkerming:</label>
                <select
                    id="avskjerming"
                    value={vinduData.avskjerming}
                    onChange={handleChange}
                    name="avskjerming"
                >
                    {avskjerming_type.map((item) => (
                        <option value={item}>{item}</option>
                    ))}
                </select>

                <label htmlFor="vinduRettning">Vindu Rettning:</label>
                <select
                    id="vinduRettning"
                    value={vinduData.vinduRettning}
                    onChange={handleChange}
                    name="vinduRettning"
                >
                    {vindu_rettning.map((item) => (
                        <option value={item}>{item}</option>
                    ))}
                </select>

                <label>Vindu Arealet [m2]:
                    <input
                        type="number"
                        onChange={handleChange}
                        name="vinduArealet"
                        value={vinduData.vinduArealet}
                    /></label>


            </form>
            <button className="handlingsKnapp" onClick={saveVindu}>Lagre Vindu</button>





            <div className="table">
                <table>
                    <tr>
                        <th>Vindu Arealet [m2]</th>
                        <th>Avskjerming</th>
                        <th>Vindu Rettning</th>
                        <th>Last [W]</th>
                    </tr>
                    {vinduTable}
                </table>
            </div>
        </div>
    )
}