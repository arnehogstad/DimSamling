import React from 'react'

export default function Beregning(props){
  const ekspansjon = props.expansion.ekspansjon === undefined ? 0 : props.expansion.ekspansjon
  const nytteEffekt = props.expansion.nytteeffekt *100
  const minVolum = props.expansion.minimumVolum
  return(
    <div className="ekspansjonskar-beregning">
      <ul>
        <li>Total ekspansjon er estimert til {ekspansjon} L </li>
        <li>Karutnyttelse er {nytteEffekt} %</li>
        <li>Anbefalt minimum karstørrelse: {minVolum} L</li>
      </ul>
    </div>

  )

}
