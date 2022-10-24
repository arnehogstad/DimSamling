import React from 'react'
import delPic from '../../../../images/Slett.jpg'
import nyLinjePic from '../../../../images/nyLinjeBilde.jpg'

const wetRoomNames = ["bad", "wc","våtrom","vask","vaskerom","teknisk rom","dusj","toalett"]

export default function Roomtable(props){
  const styles = {
      display: props.currentUnitId === props.unit.unitId ? "inline-block" : "none"
  }


  const rowElements = props.unitRooms.map((row,index) =>
    index !== props.unitRooms.length -1 ?
    <Row
      item={row}
      key = {row.id}
      indeks = {index}
      newRowClick={(event) => props.newRowClick(event, props.unit.unitId,index)}
      delRowClick={(event) => props.delRowClick(event, props.unit.unitId,index)}
      roomDataInput={(event) => props.roomDataInput(event, props.unit.unitId,index)}
      floorListValues={props.floorListValues}
      pipeListValues={props.pipeListValues}
      ccListValues={props.ccListValues}
      gulvvarmePakker = {props.gulvvarmePakker}
      unit={props.unit}
      autoFillFunc = {props.roomDataInput}
    />
      :
      <Ghostrow
        key = {row.id}
        newRowClick={(event) => props.newRowClick(event,props.unit.unitId,index)}
      />
    )

  return (
    <div className="tableDiv" style={styles}>
      <div className="tableDiv-overskrift">
        Romoversikt {props.unit.unitName}
      </div>
      <div className="tableDiv-tabell">
        <table>
          <tbody>
            <Tableheader />
            {rowElements}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function Row(props){
  const [ccList, setCCList] = React.useState([""])
  const ccListValues = ccList.map(cc =>(
    <option key={cc} value={cc}>{cc}</option>
  ))

  //listener
  //FLOOR change updates the selected pipetyoe
  React.useEffect(() => {
    let tempFloor = props.unit.rooms[props.indeks].floor
    let tempWet = props.unit.rooms[props.indeks].wetroom
    const manualEvent =
    {
      name:"pipetype",
      value: tempFloor==="1 etasje - betong" || tempFloor==="Kjeller" || tempFloor==="Garasje" || tempWet === true ?
      Object.keys(props.gulvvarmePakker)[0] :
      tempFloor!=="" ?
      Object.keys(props.gulvvarmePakker)[15]:
      ""
    }
    if (tempFloor !== manualEvent.value){
      props.autoFillFunc("",props.unit.unitId,props.indeks,manualEvent)
    }
  },[
    props.unit.rooms[props.indeks].floor,
    props.unit.rooms[props.indeks].wetroom
    ])

  //listener
  //ROOMNAME -> updates pipetype if wetroom found
  React.useEffect(() => {
    let tempName = props.unit.rooms[props.indeks].name
    let tempWet = props.unit.rooms[props.indeks].wetroom
      let tempWetroomArray = wetRoomNames.map(roomName => tempName.toLowerCase().includes(roomName))
      let result = tempWetroomArray.reduce((prevVal, currVal) => prevVal + currVal,0)
      const manualEvent =
      {
        name:"wetroom",
        value: result > 0 ? true : false
      }
      if (tempWet !== manualEvent.value){
        props.autoFillFunc("",props.unit.unitId,props.indeks,manualEvent)
      }
  },[props.unit.rooms[props.indeks].name])

  //Listener
  // PIPETYPE change updates the cc list accordingly
  React.useEffect(() => {
    let tempNavn = props.unit.rooms[props.indeks].pipetype
    let tempPakke = props.gulvvarmePakker[tempNavn]
    let tempCCList = [""]
    if (tempPakke !== undefined){
      for (const key in tempPakke.cc.CCvalg){
        tempCCList.push(tempPakke.cc.CCvalg[key])
      }
    }
    setCCList(tempCCList)
  },[props.unit.rooms[props.indeks].pipetype])

  //Listener
  //UNIT in area, pipetype or CC recalculates circtuis
  React.useEffect(() => {
    let tempPipe = props.unit.rooms[props.indeks].pipetype
    let tempArea = props.unit.rooms[props.indeks].area
    let tempCC = props.unit.rooms[props.indeks].cc
    let tempCircuits = ""
    if (tempPipe!=="" && tempArea !== "" && tempCC !== "") {
      tempCircuits = Math.ceil(tempArea*props.gulvvarmePakker[tempPipe].cc[tempCC].antall[0]/100)
    }
    const manualEvent =
    {
      name:"circuits",
      value: tempCircuits
    }
    props.autoFillFunc("",props.unit.unitId,props.indeks,manualEvent)
  },[
    props.unit.rooms[props.indeks].pipetype,
    props.unit.rooms[props.indeks].area,
    props.unit.rooms[props.indeks].cc
  ])

  //listener to CClistChange updates the selected CC to first option
  React.useEffect(() => {
    const manualEvent = {name:"cc",value: ccList.length > 1 ? `${ccList[1]}` : `${ccList[0]}`}
    props.autoFillFunc("",props.unit.unitId,props.indeks,manualEvent)
  },[ccList])

  //listener to circuits - updates if user tries to set value lesser than minimum
  React.useEffect(() => {
    let tempPipe = props.unit.rooms[props.indeks].pipetype
    let tempArea = props.unit.rooms[props.indeks].area
    let tempCC = props.unit.rooms[props.indeks].cc
    let tempCircuits = ""
    if (tempPipe!=="" && tempArea !== "" && tempCC !== "") {
      tempCircuits = Math.ceil(tempArea*props.gulvvarmePakker[tempPipe].cc[tempCC].antall[0]/100)
    }
    const manualEvent =
    {
      name:"circuits",
      value: tempCircuits
    }
    if (props.unit.rooms[props.indeks].circuits < tempCircuits){
      props.autoFillFunc("",props.unit.unitId,props.indeks,manualEvent)
    }
  },[props.unit.rooms[props.indeks].circuits])

  //function automatically suggesting floor/pipetype equal to prior choice
  function suggestPrior(event, index){
    if (index > 0) {
      const {name} = event.target
      let suggestion = props.unit.rooms[props.indeks-1][name]
      if(ccList.indexOf(suggestion)!== -1 || name !== "cc"){
        const manualEvent =
        {
          name:[name],
          value: suggestion
        }
        props.autoFillFunc("",props.unit.unitId,index,manualEvent)
      }
    }
  }

  return(
    <tr>
      <td className="button-col">
        <img
          className="button-col-img"
          src={delPic}
          onClick={props.delRowClick}
          alt="Sletter rad"
        />
      </td>
      <td className={"floor-col " + (props.item.missingdata ? props.item.floor === "" ? "missing-data-col" : null : null)}>
        <select
          name="floor"
          onFocus={(event) => suggestPrior(event,props.indeks)}
          onChange={props.roomDataInput}
          value={props.item.floor}
        >
          {props.floorListValues}
        </select>
      </td>
      <td className={"room-name-col " + (props.item.missingdata ? props.item.name === "" ? "missing-data-col" : null : null)}>
        <input
          name="name"
          type="search"
          autoComplete="off"
          onChange={props.roomDataInput}
          value={props.item.name}
        />
      </td>
      <td className={"area-col " + (props.item.missingdata ? props.item.area === "" ? "missing-data-col" : null : null)}>
        <input
          name="area"
          type="number"
          min="0"
          onChange={props.roomDataInput}
          value={props.item.area}
          className="text-center"
        />
      </td>
      <td className={"pipe-type-col " + (props.item.missingdata ? props.item.pipetype === "" ? "missing-data-col" : null : null)}>
        <select
          name="pipetype"
          onFocus={(event) => suggestPrior(event,props.indeks)}
          onChange={props.roomDataInput}
          value={props.item.pipetype}
        >
          {props.pipeListValues}
        </select>
      </td>
      <td className={"cc-col " + (props.item.missingdata ? props.item.cc === "" ? "missing-data-col" : null : null)}>
        <select
          name="cc"
          onFocus={(event) => suggestPrior(event,props.indeks)}
          onChange={props.roomDataInput}
          value={props.item.cc}
        >
          {ccListValues}
        </select>
      </td>
      <td className={"circuit-col " + (props.item.missingdata ? props.item.circuits === "" ? "missing-data-col" : null : null)}>
        <input
          name="circuits"
          type="number"
          min="0"
          onChange={props.roomDataInput}
          value={props.item.circuits}
          className="text-center"
        />
      </td>
      <td className="button-col">
        <img
          className="button-col-img"
          src={nyLinjePic}
          onClick={props.newRowClick}
          alt="Legger til ny rad"
        />
      </td>
    </tr>
  )
}

function Tableheader(){
  return(
    <tr >
      <th className="button-col"></th>
      <th className="floor-col">Etasje</th>
      <th className="room-name-col">Romnavn</th>
      <th className="area-col">Areal</th>
      <th className="pipe-type-col">Rørtype</th>
      <th className="cc-col">CC</th>
      <th className="circuit-col">Kurser</th>
      <th className="button-col"></th>
    </tr>
  )
}

function Ghostrow(props){
  return(
    <tr >
      <td className="button-col ghostCell"></td>
      <td className="floor-col ghostCell"></td>
      <td className="room-name-col ghostCell"></td>
      <td className="area-col ghostCell"></td>
      <td className="pipe-type-col ghostCell"></td>
      <td className="cc-col ghostCell"></td>
      <td className="circuit-col ghostCell"></td>
      <td className="button-col">
        <img
          className="button-col-img"
          src={nyLinjePic}
          onClick={props.newRowClick}
          alt="Legger til ny rad"
          />
      </td>
    </tr>
  )
}
