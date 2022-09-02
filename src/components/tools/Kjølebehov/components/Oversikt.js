import React, { useEffect } from "react"



export default function Oversikt(props) {
   
    let lastsTable = props.lasts.map((item) => (
       <td>{item}</td>
    ))
let total= props.ovrige[0]+props.vindus[0]+props.lasts.reduce((a, b) => a + parseInt(b), 0)
   
return (
        <div className="oversikt">

            <div className="table">
                <table >
                    <tr>

                        <th colspan="2" >Luft effekt</th>
                        <th colspan="4" >Transmission effekt</th>
                        <th colspan="2" >Annet effekt</th>
                    </tr>

                    <tr>

                        <th>Infiltrasjon</th>
                        <th>Ventilasjon</th>

                        <th>Vegg</th>
                        <th>Tak</th>
                        <th>Loft</th>
                        <th>Gulv</th>

                        <th>Utstyr</th>
                        <th>Personer</th>

                    </tr>
                    {lastsTable}
                </table>
            </div>


            <h3>Øvriger last er {props.ovrige} W</h3>
            <h3>Last fra vinduer er: {props.vindus}</h3>
            <h2>Total last er: {total} W </h2>

        </div>
    )
}
