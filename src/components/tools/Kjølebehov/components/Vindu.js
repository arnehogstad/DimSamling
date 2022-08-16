import React, { useEffect } from "react"
import { vindu_rettning, Avsjkerming } from "./data"


export default function InnData() {
    const [vinduData, setVinduData] = React.useState(
        {
            vinduArealet: 1,
            avskjerming: "Uten Avskjerming",
            vinduRettning: "Sør",
            effekt: 100
        }
    )


    const [vindus, setVindus] = React.useState([])
    const [vinduTable, setVinduTable] = React.useState([])


    const avskjerming_type = Object.keys(Avsjkerming)


    function handleChange(event) {
        const { name, value } = event.target
        setVinduData(prev => {
            return {
                ...prev,
                [name]: value,
            }
        })
    }

    function solEffect(vinduRettning, avskjerming, vinduArealet) {
     
        if (vinduRettning === "Sør") {
            return  523
            // (44 + 7 * 32) * vinduArealet * avskjerming
        } else if (vinduRettning === "Vest-Øst") {
            return (11) * vinduArealet * avskjerming * 32
        } else if (vinduRettning === "Nord") {
            return (6) * vinduArealet * avskjerming * 32
        }
                
    }


    function saveVindu() {

        
        setVinduData(prev => {
            return {
                ...prev,
                effekt: solEffect(vinduData.vinduRettning, Avsjkerming[vinduData.avskjerming], vinduData.vinduArealet)
            }
        })
        
        setVindus(prev => [...prev, { vinduData }])

        }

   useEffect(()=>{ 
        setVinduTable(vindus.map((item) => (
        <tr>
            <td>{item.vinduData.vinduArealet}</td>
            <td>{item.vinduData.avskjerming}</td>
            <td>{item.vinduData.vinduRettning}</td>
            <td>{item.vinduData.effekt}</td>
        </tr>
    )))
},[vinduData])

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