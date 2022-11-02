import React from "react"
import { nanoid } from "@reduxjs/toolkit"


export default function Ovrigelast(props) {
    const [last, setLast] = React.useState({
        navn: "Øvrigelast",
        effekt: 1000,
        uid: nanoid()
      })

    const [lasts, setLasts] = React.useState(props.ovriges)


    function handleChange(event) {
        const { name, value } = event.target
        setLast(prev => {
            return {
                ...prev,
                [name]: value,
                uid: nanoid()
            }
        })

    }

    function saveData() {
       setLast(prev => {
        return {...prev, uid: nanoid()}////to make sure the uid is unique for each line 
        })
       setLasts(prev => [...prev, last])
    }

    const handleDelete = (item) => {
        setLasts(lasts.filter(i => i !== item))
    }


    let lastsTable = lasts.map((item) => (
        <tr key={nanoid()} className="tbro">
            <td key={nanoid()} className="tbel">{item.navn}</td>
            <td key={nanoid()} className="tbel">{item.effekt}</td>
            <td key={nanoid()} className="tbel"><button className="fjern" onClick={() => handleDelete(item)}>Fjern</button></td>
        </tr>
    ))



    return (
  
            <div className="border">

        <div className="knapper">
        <button className="KJButtons" onClick={() => {props.ovrige_data(lasts); props.pageModifier("InnData")}}>Inndata</button>
        <button className="KJButtons" onClick={() => {props.ovrige_data(lasts);props.pageModifier("vindu")}}>Vindu</button>
        <button className="KJButtonsActive" onClick={() =>  {props.ovrige_data(lasts); props.pageModifier("ovrige")}}>Øvrige laster</button>
        <button className="KJButtons" onClick={() => {props.ovrige_data(lasts); props.pageModifier("oversikt")}}>Oversikt</button>
        </div>




                <form  className="formInnData">

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
                    <button className="sisteNeste" onClick={saveData}>Legg inn ekstra last</button>
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
                

            </div>


          

      
    )
}
