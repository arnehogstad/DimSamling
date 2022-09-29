import React, { useEffect } from "react"
import { nanoid } from "@reduxjs/toolkit"


export default function Ovrigelast(props) {
    const [last, setLast] = React.useState({
        navn: "Øvrigelast",
        effekt: 0,
        uid: nanoid()

    })
    const [lasts, setLasts] = React.useState([])
    const [lastsTable, setLastsTable] = React.useState([])

    function handleChange(event) {
        const { name, value } = event.target
        setLast(prev => {
            return {
                ...prev,
                [name]: value,
            }
        })

    }

    function saveData() {
        setLast(prev => {
            return {
                ...prev,
                uid: nanoid()
            }
        })

        setLasts(prev => [...prev, last])
    }

    const handleDelete = (item) => {
        setLasts(lasts.filter(i => i !== item))
    }

    useEffect(() => {
        setLastsTable(lasts.map((item) => (
            <tr key={nanoid()} className="tbro">
                <td key={nanoid()} className="tbel">{item.navn}</td>
                <td key={nanoid()} className="tbel">{item.effekt}</td>
                <td key={nanoid()} className="tbel"><button className="fjern" onClick={() => handleDelete(item)}>Fjern</button></td>
            </tr>
        )))
    }, [lasts])


    let lastPrint = lasts.map((item) => (Object.values(item)))


    return (
        <div>
            <div className="border">

                <form className="formInnData">
                    <label className="label">Last Navn:
                        <input
                            className="input"
                            type="text"
                            onChange={handleChange}
                            name="navn"
                            value={last.navn}
                        /></label>

                    <label className="label">Effekt [W]:
                        <input
                            className="input"
                            type="number"
                            onChange={handleChange}
                            name="effekt"
                            value={last.effekt}
                        /></label>

                </form>
                <div className="knapper">
                    <button className="handlingsKnapp" onClick={saveData}>Lagre last</button>
                </div>
            </div>

            {lasts.length !== 0 ? (
                <>
                    <div className="table">
                        <table >
                            <thead>
                                <tr>
                                    <th className="tbhr">Last Navn</th>
                                    <th className="tbhr">Effekt [W]</th>
                                    <th className="tbhr">Fjern</th>
                                </tr>
                            </thead>
                            <tbody>
                                {lastsTable}
                            </tbody>
                        </table>
                    </div>
                </>
            ) : null}

            <div className="knapper">
                <button className="sisteNeste" onClick={() => { props.pageView("vindu") }}>Forrige steg</button>
                <button className="sisteNeste" onClick={() => { props.ovrige_data(lastPrint); props.pageView("oversikt") }}>Ferdigstill beregning</button>
            </div>

        </div>
    )
}
