import React from 'react'

export default function ButtonLine(props){

  function generateResult(){
    let validData = true
    let tempUnitId = ""
    let tempRoomId = ""
    props.units.forEach((unit) => (
      unit.rooms.forEach((room,index) => {
        if (index < unit.rooms.length-1){
          if(room.floor === ""    ||
            room.name === ""      ||
            room.area === ""      ||
            room.pipetype === ""  ||
            room.cc === ""        ||
            room.circuits === ""
          ){
            validData = false
            tempUnitId = unit.unitId
            tempRoomId = room.id
          }
        }
      })
    ))
    if (validData === true) {
      props.showResult(true)
    }else{
      props.setCurrentUnitId(tempUnitId)
      console.log(tempRoomId);
    }
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
