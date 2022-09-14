import React from 'react'

export default function ButtonLine(props){

  function generateResult(){
    props.showResult(true)
  }

  return (
    <div className="button-line-div">
      <button className="handlingsKnapp" onClick={generateResult}>Generer utstyrsliste</button>
      <button className="handlingsKnapp" onClick={(event) => props.setShowModal({show:true,modalName:"saveProject"})} >Lagre prosjekt</button>
      <button className="handlingsKnapp" onClick={(event) => props.setShowModal({show:true,modalName:"openProject"})} >Åpne prosjekt</button>
      <button className="handlingsKnapp" onClick={(event) => props.setShowModal({show:true,modalName:"newProject"})} >Nytt prosjekt</button>
    </div>
  )

}
