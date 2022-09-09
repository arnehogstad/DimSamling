import React from 'react'
import { CSVLink } from "react-csv"

export default function ButtonLine(props){

  function generateResult(){
    props.showResult(true)
  }

  const cleanLink  = {
    textDecoration:"none",
    textAlign: "center",
    paddingTop: "18px"
  }

  return (
    <div className="button-line-div">
      <button className="handlingsKnapp" onClick={generateResult}>Generer utstyrsliste</button>

        {props.units === undefined ? "Lagre prosjekt" :
        <CSVLink
          className="handlingsKnapp"
          data={props.units}
          filename={`Inndata-${props.projectName}.csv`}
          style={cleanLink}
        >
          Lagre prosjekt
        </CSVLink>
        }

      <button className="handlingsKnapp">Åpne prosjekt</button>
      <button className="handlingsKnapp" onClick={(event) => props.setShowModal({show:true,modalName:"newProject"})} >Nytt prosjekt</button>
    </div>
  )

}
