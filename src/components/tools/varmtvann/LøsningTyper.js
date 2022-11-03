import React from "react"



export default function LøsningTyper(props){
let {kWh}=props
function løsningType(kWh) {
    

    let løsningType = {Spiral: false, Veksler: false, AquaEfficency:false }
     if (kWh<290) {
         løsningType.Spiral = true
     }else if (kWh>290) {
         løsningType.Veksler = true
         løsningType.AquaEfficency = true
     }
     return løsningType
    }


    return (
        <div >
            <h3>Anbefalte system løsninger:</h3>
            {løsningType(kWh).Spiral===true ? <button className="sisteNesteVV" onClick={(e)=> props.setSystem(e,"Spiral")}> Spiral</button> : null}
            {løsningType(kWh).Veksler===true ? <button className="sisteNesteVV"onClick={(e)=> props.setSystem(e,"Veksler")}> Veksler</button> : null}
            {løsningType(kWh).AquaEfficency===true ? <button className="sisteNesteVV" onClick={(e)=> props.setSystem(e,"AquaEfficency")}> AquaEfficency</button> : null}
            <h3>Andre system løsninger:</h3>
            {løsningType(kWh).Spiral===false ? <button className="handlingsKnappVV" onClick={(e)=> props.setSystem(e,"Spiral")}> Spiral</button> : null}
            {løsningType(kWh).Veksler===false ? <button className="handlingsKnappVV" onClick={(e)=> props.setSystem(e,"Veksler")}> Veksler</button> : null}
            {løsningType(kWh).AquaEfficency===false ? <button className="handlingsKnappVV" onClick={(e)=> props.setSystem(e,"AquaEfficency")}> AquaEfficency</button> : null}

        </div>
    )
}