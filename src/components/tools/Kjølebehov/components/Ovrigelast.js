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
                <td>{item.navn}</td>
                <td>{item.effekt}</td>
                <td><button onClick={() => handleDelete(item)}>Delete</button></td>
            </tr>
        )))
    }, [lasts])


    /// add the effekt to the total effekt 
    let ovrige_Effekt =  [ lasts.reduce((a, b) => a + parseInt(b.effekt), 0) ]
    return (
        <div>
            <label>Last Navn:
                <input
                    type="text"
                    onChange={handleChange}
                    name="navn"
                    value={last.navn}
                /></label>

            <label>Effekt [w]:
                <input
                    type="number"
                    onChange={handleChange}
                    name="effekt"
                    value={last.effekt}
                /></label>
            <button className="handlingsKnapp" onClick={saveData}>Lagre last</button>

            <table className="table">
                <tr>
                    <th>Last Navn</th>
                    <th>Effekt [W]</th>
                </tr>
                {lastsTable}
            </table>
            <p>Total øvrige last: {ovrige_Effekt} W</p>


            
            <button className="handlingsKnapp" onClick={() => props.last_data(ovrige_Effekt)}>Oppdater lista</button>


        </div>
    )
}
