import React from "react"



export default function Oversikt(props) {
   
    let lastsTable = props.lasts.map((item) => (
       <td className="tbel">{item}</td>
    ))


return (
        <div className="border">

            <div className="table">
                <table >
                    <tr className="tbhr">

                        <th className="tbel" colspan="2" >Luft effekt</th>
                        <th className="tbel" colspan="4" >Transmission effekt</th>
                        <th className="tbel" colspan="2" >Annet effekt</th>
                    </tr>

                    <tr className="tbro">

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
            
            <h2>Total last er: {props.total} W </h2>

            <button className="sisteNeste" onClick={() => {  props.pageView("ovrige") }}>Gå Tilbake</button>
        
            
        </div>
    )
}
