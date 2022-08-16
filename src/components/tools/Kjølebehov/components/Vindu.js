import React from "react"
import { vindu_rettning, Avsjkerming } from "./data"


export default function InnData() {
    const [vinduData, setVinduData] = React.useState(
        {
            vinduArealet: 1,
            avskjerming: "Uten Avskjerming",
            vinduRettning: "Sør",
            effekt:100
        }
    )


    const [vindus, setVindus] = React.useState([])
    const [vinduTable,setVinduTable]=React.useState([])


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

    function solEffect(vinduRettning,avskjerming, vinduArealet) {
     
        let last =100
        if (vinduRettning === "Sør") {
           last= (44+7*32)*vinduArealet*avskjerming 
        }else if (vinduRettning === "Vest-Øst"){
            last = (11)*vinduArealet*avskjerming*32
        }else if(vinduRettning === "Nord"){
            last= (6)*vinduArealet*avskjerming*32
        }
        console.log(Avsjkerming[avskjerming])
        setVinduData(prev => {
             return {...prev,
                effekt:last  }
             })
    }
   
    
    function saveVindu() {
        console.log(vinduData)
       solEffect(vinduData.vinduRettning,Avsjkerming[vinduData.avskjerming],vinduData.vinduArealet)
          
       
       setVindus(prev => [...prev, { vinduData }])
       
       setVinduTable(vindus.map( (item) =>(
        <tr>
        <td>{item.vinduData.vinduArealet}</td>
        <td>{item.vinduData.avskjerming}</td>
        <td>{item.vinduData.vinduRettning}</td>
        <td>{item.vinduData.effekt}</td>
        </tr>   
       )))
                
}


 
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