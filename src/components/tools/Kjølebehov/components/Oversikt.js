import React from "react"



export default function Oversikt(props) {
   
    let lastsTable = props.lasts.map((item) => (
       <td className="tbel">{item}</td>
    ))
let total= props.ovrige[0]+props.vindus[0]+props.lasts.reduce((a, b) => a + parseInt(b), 0)

return (
        <div className="oversikt">

            <div className="table">
                <table >
                    <tr>

                        <th className="tbel" colspan="2" >Luft effekt</th>
                        <th className="tbel" colspan="4" >Transmission effekt</th>
                        <th className="tbel" colspan="2" >Annet effekt</th>
                    </tr>

                    <tr>

                        <th className="tbel">Infiltrasjon</th>
                        <th className="tbel">Ventilasjon</th>

                        <th className="tbel">Vegg</th>
                        <th className="tbel">Tak</th>
                        <th className="tbel">Loft</th>
                        <th className="tbel">Gulv</th>

                        <th className="tbel">Utstyr</th>
                        <th className="tbel">Personer</th>

                    </tr>
                    {lastsTable}
                </table>
            </div>

            <h3>Last fra vinduer er: {props.vindus}</h3>
            <h3>Øvriger last er {props.ovrige} W</h3>
            
            <h2>Total last er: {total} W </h2>


            
        </div>
    )
}
