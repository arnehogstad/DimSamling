import React from 'react'

export default function ButtonLine(props){

  function generateResult(){
    props.showResult(true)
  }

  return (
    <div className="button-line-div">
      <button className="handlingsKnapp" onClick={generateResult}>Generer utstyrsliste</button>
      <button className="handlingsKnapp">Lagre prosjekt</button>
      <button className="handlingsKnapp">Åpne prosjekt</button>
      <button className="handlingsKnapp">Nytt prosjekt</button>
    </div>
  )

}
