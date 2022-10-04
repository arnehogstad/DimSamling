import React from "react"
import { nanoid } from "@reduxjs/toolkit"


export default function Oversikt(props) {
   
    let lastsTable = props.lasts.map((item) => (
       <td key={nanoid()} className="tbel">{item}</td>
    ))


return (
        <div className="border">

            <div className="table">
                <table >
                    <thead>
                    <tr className="tbhr">

                        <th className="tbel" colSpan="2" >Luft effekt</th>
                        <th className="tbel" colSpan="4" >Transmission effekt</th>
                        <th className="tbel" colSpan="3" >Annet effekt</th>
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
                        <th className="tbel">Belysning</th>

                    </tr>
                    </thead>
                    <tbody>
                    <tr className="tbro">
                    {lastsTable}
                    </tr>
                    </tbody>
                </table>
            </div>

            <h3>Last fra vinduer er: {props.vindus}</h3>
            <h3>Øvriger last er: {props.ovrige} W</h3>
            
            <h2>Total last er: {props.total} W </h2>

            <button className="sisteNeste" onClick={() => {  props.pageView("ovrige") }}>Gå Tilbake</button>
        
            
        </div>
    )
}
