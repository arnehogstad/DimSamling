import React, { useEffect } from "react"



export default function Ovrigelast(props) {
    const [last, setLast] = React.useState({
        navn: "Øvrigelast",
        effekt: 0
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
        // setLast(current => [...current, {[name]: value}])
    }

    function saveData() {
        setLasts(prev => [...prev, last])
    }

    const handleDelete = (item) => {
        setLasts(lasts.filter(i => i !== item))
    }

    useEffect(() => {
        setLastsTable(lasts.map((item) => (
            <tr>
                <td className="tbel">{item.navn}</td>
                <td className="tbel">{item.effekt}</td>
                <td className="tbel"><button className="fjern" onClick={() => handleDelete(item)}>Fjern</button></td>
            </tr>
        )))
    }, [lasts])


    /// add the effekt to the total effekt 
    let ovrige_Effekt =  [ lasts.reduce((a, b) => a + parseInt(b.effekt), 0) ]
    return (
        <div>

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
           <button className="handlingsKnapp" onClick={saveData}>Lagre last</button>
            <div className="table">
            <table >
                <tr>
                    <th className="tbel">Last Navn</th>
                    <th className="tbel">Effekt [W]</th>
                    <th className="tbel">Fjern</th>
                </tr>
                {lastsTable}
            </table>
            </div>
            <p>Total øvrige last: {ovrige_Effekt} W</p>


            
            <button className="handlingsKnapp" onClick={() => props.ovrige_data(ovrige_Effekt)}>Ferdigstill beregning</button>


        </div>
    )
}
