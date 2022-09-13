import React from 'react'
import { CSVLink, CSVDownload  } from "react-csv"

export default function ButtonLine(props){
  const [data,setData] = React.useState([])

  //function preparing the units object for csv download
  function prepareData(units){
    var tempData = [...units]
    var returnData = []
    //loops through each unit
    tempData.forEach(unit => {
      //loops through each room in the current unit
      unit.rooms.forEach((room,index) =>{
        if(index < unit.rooms.length-1){
          //sets dynamic keys
          let tempKeyfloor = `Room${index}-floor`
          let tempKeyname = `Room${index}-name`
          let tempKeyarea = `Room${index}-area`
          let tempKeypipetype = `Room${index}-pipetype`
          let tempKeycc = `Room${index}-cc`
          let tempKeycircuits = `Room${index}-circuits`
          let tempKeywetroom = `Room${index}-wetroom`
          let tempKeyid = `Room${index}-id`
          //adds the values
          unit['projectName'] = props.projectName
          unit[tempKeyfloor] = room.floor
          unit[tempKeyname] = room.name
          unit[tempKeyarea] = room.area
          unit[tempKeypipetype] = room.pipetype
          unit[tempKeycc] = room.cc
          unit[tempKeycircuits] = room.circuits
          unit[tempKeywetroom] = room.wetroom
          unit[tempKeyid] = room.id
        }
      })
    })

    tempData.forEach(unit => {
      let {rooms, ...cleanUnit} = unit
      returnData.push(cleanUnit)
    })

    console.log(returnData);
    return returnData
  }


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
      <CSVLink
        className="handlingsKnapp"
        data={data}
        onClick={(event) => setData(prepareData(props.units))}
        filename={`Inndata-${props.projectName}.csv`}
        style={cleanLink}
      >
      Lagre prosjekt
      </ CSVLink>

      <button className="handlingsKnapp" onClick={(event) => props.setShowModal({show:true,modalName:"openProject"})} >Åpne prosjekt</button>
      <button className="handlingsKnapp" onClick={(event) => props.setShowModal({show:true,modalName:"newProject"})} >Nytt prosjekt</button>
    </div>
  )

}
