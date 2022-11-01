import React from 'react'

export default function ButtonLine(props){

  function generateResult(){
    checkIfValidData()
  }


  function checkIfValidData(){
    let validData = true
    let tempUnitId = ""
    let tempRoomId = ""
    let tempRoomIndex = 0
    props.units.every((unit) => {
      tempUnitId = unit.unitId
      unit.rooms.every((room,index) => {
        if (index < unit.rooms.length-1){
          tempRoomId = room.id
          tempRoomIndex =  index
          if(room.floor === ""    ||
            room.name === ""      ||
            room.area === ""      ||
            room.pipetype === ""  ||
            room.cc === ""        ||
            room.circuits === ""
          ){
            if(room.floor !== ""    ||
              room.name !== ""      ||
              room.area !== ""      ||
              room.pipetype !== ""  ||
              room.cc !== ""        ||
              room.circuits !== ""
            ){
              validData = false
            }
          }
        }
        if (!room.missingdata && !validData){
          const manualEvent = {
            name: "missingdata",
            value: !validData
          }
          props.roomDataInput("",tempUnitId,tempRoomIndex,manualEvent)
        }
        return validData
      })
      return validData
    })
    if (validData === false) {
      props.setCurrentUnitId(tempUnitId)
    }

    props.showResult(validData)
  }


  return (
    <div className="button-line-div">
      <button className="handlingsKnapp handlingsKnappFokus" onClick={generateResult}>Generer utstyrsliste</button>
      <button className="handlingsKnapp" onClick={(event) => props.setShowModal({show:true,modalName:"saveProject"})} >Lagre prosjekt</button>
      <button className="handlingsKnapp" onClick={(event) => props.setShowModal({show:true,modalName:"openProject"})} >Åpne prosjekt</button>
      <button className="handlingsKnapp" onClick={(event) => props.setShowModal({show:true,modalName:"newProject"})} >Nytt prosjekt</button>
    </div>
  )

}
