import React from "react";
import { useSelector } from 'react-redux'
import Toolinfo from './components/Toolinfo'
import Unit from './components/Unit'
import Result from './components/Result'
import ButtonLine from './components/ButtonLine'
import Modal from './components/Modal'
import Banner from '../../../components/static/Banner'
import { nanoid } from 'nanoid'
import mockDatabase from "./components/mockDatabase.js"

//CSS-files importeres her for å holde prosjektoppsummeringen ryddigere
import "../../../styles/gulvvarme/style.css";
import "../../../styles/gulvvarme/main.css";
import "../../../styles/gulvvarme/result.css";
import "../../../styles/gulvvarme/unit.css";
import "../../../styles/gulvvarme/table.css";
import "../../../styles/gulvvarme/modal.css";
import "../../../styles/gulvvarme/radiobuttons.css";


export default function Gulvvarme(props){

  //state of tool - from redux-store
  const showTool = useSelector((state) => state.tool.visibleId)
  //state of units
  const [units, setUnits] = React.useState([])
  //tracking the current active unit
  const [currentUnitId, setCurrentUnitId] = React.useState(
      (units[0] && units[0].unitId) || ""
  )
  //state of result
  const [showResult,setShowResult] = React.useState(false)
  //state of modals
  const [showModal,setShowModal] = React.useState({
    show: false,
    modalName: ""
  })
  //name of the project
  const [projectName,setProjectName] = React.useState("")

  //mock database for testing calulation etc
  const dataBase = mockDatabase

  //elements for dropdown lists -> floorpos
  const floorListValues = []
  const floorListText = []
  floorListValues.push(<option key="" value=""></option>)
  floorListText.push("")
  for (const key in dataBase.Etasjeliste){
    floorListValues.push(<option key={key} value={key}>{key}</option>)
    floorListText.push(key)
  }

  //elements for dropdown lists -> pipetype
  const pipeListValues = []
  pipeListValues.push(<option key="" value=""></option>)
  for (const key in dataBase.gulvvarmePakker){
    pipeListValues.push(<option key={key} value={key}>{key}</option>)
  }

  //gulvvarmePakker
  const gulvvarmePakker = dataBase.gulvvarmePakker


  //function initializing empty roomRow
  function emptyRoom(){
    return {
      floor: "",
      name: "",
      area:"",
      pipetype: "",
      cc:"",
      circuits:"",
      wetroom: false,
      missingdata: false,
      id: nanoid()
    }
  }

  //function for initializing  a new empty unit, 10 empty rows/rooms default
  function emptyUnit(nRooms,unitNmbr,unitName){

    let roomArray = new Array(nRooms)

    for (let i = 0; i<=nRooms; i++){
      roomArray[i] = emptyRoom()
    }

    return {
        unitId: nanoid(),
        unitName: unitName === undefined ?`Test ${unitNmbr}` : unitName,
        rooms: roomArray,
        fordelerskap: "På vegg",
        fordelerstokk: "Uten bypass",
        termostatType: "ALPHA",
        termostatStandard: "kun på bad",
    }
  }

  //function for adding a new unit
  function addUnit(nRooms,unitName, loadedUnit){
    let tempRooms = nRooms === undefined ? 11 : nRooms
    let newUnit = loadedUnit === undefined ? emptyUnit(tempRooms,units.length+1,unitName) : loadedUnit
    setUnits(oldUnits => [...oldUnits,newUnit ])
    setCurrentUnitId(newUnit.unitId)
  }

  //function identifying the active unit
  function findCurrentUnit(){
    return units.find(unit => {
        return unit.unitId === currentUnitId
    }) || units[0]
  }

  //function changing name of a unit
  function changeNameUnit(newName){
    setUnits(oldUnits => oldUnits.map(unit =>
      (
        unit.unitId === currentUnitId ?
         {...unit,
         unitName: newName}
         :
         {...unit}
      )))
  }

  //function deleting unit
  function deleteUnit(unitId){

    setUnits(oldUnits => oldUnits.filter(unit => unit.unitId!== unitId))
  }

  //function copying a unit
  function copyUnit(unitId,unitName,floorShift){
    let tempUnit = [...units].filter(unit => unit.unitId=== unitId)[0]
    let tempRooms = tempUnit.rooms.map(room => ({...room,id:nanoid()}))
    let newUnit = {
      ...tempUnit,
      unitId: nanoid(),
      unitName: unitName,
      rooms: [...tempRooms]
    }
    setUnits(oldUnits => [...oldUnits,newUnit ])
    setCurrentUnitId(newUnit.unitId)
    if (floorShift !== 0){
      shiftFloors(newUnit.unitId,newUnit.rooms,floorShift)
    }
  }

  //function shifting floors of unit
  function shiftFloors(unitId,unitRooms,floorShift){
    let tempRooms = unitRooms.map(room => (
      {...room,
      floor: floorListText.findIndex((floorname) => floorname === room.floor) > 0 && parseInt(floorListText.findIndex((floorname) => floorname === room.floor)+1*floorShift) > 0  && parseInt(floorListText.findIndex((floorname) => floorname === room.floor)+1*floorShift) < floorListText.length ?
        parseInt(floorListText.findIndex((floorname) => floorname === room.floor)+1*floorShift) === 3 && 1*floorShift < 0 ?
        floorListText[2] :floorListText.findIndex((floorname) => floorname === room.floor) === 2 && 1*floorShift > 0 ?
        floorListText[parseInt(floorListText.findIndex((floorname) => floorname === room.floor)+1+1*floorShift)] :
        floorListText[parseInt(floorListText.findIndex((floorname) => floorname === room.floor)+1*floorShift)]
        :
        room.floor
      }
    ))
    setUnits(oldUnits => oldUnits.map(unit =>
      (
        unit.unitId === unitId ?
         {...unit,
         rooms: [...tempRooms]
        }
         :
         {...unit}
      )))
  }


  //function inserting row and returning new matrix
  function injectRow(unitRooms,roomIndex){
    let newRows = [...unitRooms]
    newRows.splice(roomIndex,0,emptyRoom())
    return newRows
  }
  //function removing row and returning new matrix
  function ejectRow(unitRooms,roomIndex){
    let newRows = [...unitRooms]
    newRows.splice(roomIndex,1)
    return newRows
  }

  //function adding row
  function newRowClick(event,unitId,roomIndex) {
    event.stopPropagation()
    setUnits(oldUnits => oldUnits.map(unit =>
      (
        unit.unitId === unitId ?
         {...unit,
         rooms: injectRow(unit.rooms,roomIndex)
        }
         :
         {...unit}
      )))
}

  //function deleting row
  function delRowClick(event,unitId,roomIndex){
    event.stopPropagation()
    setUnits(oldUnits => oldUnits.map(unit =>
      (
        unit.unitId === unitId ?
         {...unit,
         rooms: ejectRow(unit.rooms,roomIndex)
        }
         :
         {...unit}
      )))
  }

  //function handling change of radioButtonvalue
  function radioButtonClick(event, unitId) {
      const {name, value} = event.target
      const cleanName = name.replace(unitId,"")

      setUnits(oldUnits => oldUnits.map(unit =>
        (
          unit.unitId === unitId ?
           {...unit,
           [cleanName]: value}
           :
           {...unit}
        )))
    }

    //function updating roomdata
    function updateRoomData(rooms,roomIndex,name,value){
      let tempRooms = [...rooms]
      tempRooms[roomIndex][name] = value
      if (name !== 'missingdata'){
        tempRooms[roomIndex]['missingdata'] = false
      }
      return tempRooms
    }

    //function updating state of units with values from input
    function roomDataInput(event, unitId, roomIndex,manualCall) {
        const {name, value} = manualCall === undefined ? event.target : manualCall
        setUnits(oldUnits => oldUnits.map(unit =>
          (
            unit.unitId === unitId ?
             {...unit,
             rooms: updateRoomData(unit.rooms,roomIndex,name,value)
           }
             :
             {...unit}
          )))
      }

    //Listener on changes in units, toggles showResult back to false if set to true
    React.useEffect(()=>{
      if(showResult === true){
        setShowResult(false)
      }
    },[units])

  return(
    <div className= {props.toolId === showTool ? "toolArea" : "hiddenTool"}>
      <Banner title={props.toolName} />
      <div className="container">
          <Toolinfo />
          <Modal
            showModal={showModal}
            setShowModal={setShowModal}
            projectName={projectName}
            setProjectName={setProjectName}
            units={units}
            addUnit={addUnit}
            changeNameUnit={changeNameUnit}
            findCurrentUnit={findCurrentUnit}
            setCurrentUnitId={setCurrentUnitId}
            currentUnitId = {currentUnitId}
            copyUnit={copyUnit}
            deleteUnit={deleteUnit}
          />
          { units.length > 0 ?
            <div>
              <Unit
                units={units}
                currentUnit={findCurrentUnit()}
                setCurrentUnitId={setCurrentUnitId}
                radioButtonClick={radioButtonClick}
                newRowClick={newRowClick}
                delRowClick={delRowClick}
                roomDataInput={roomDataInput}
                floorListValues={floorListValues}
                pipeListValues={pipeListValues}
                gulvvarmePakker = {gulvvarmePakker}
                projectName={projectName}
                setShowModal={setShowModal}
              />
              <ButtonLine
                units={units}
                projectName={projectName}
                showResult = {setShowResult}
                setShowModal={setShowModal}
                setCurrentUnitId={setCurrentUnitId}
                roomDataInput={roomDataInput}
              />
              { showResult === true ?
                <Result
                  units={units}
                  dataBase={dataBase}
                  projectName={projectName}
                />
                :
                ""
              }
            </div>
            :
            <div className='inputArea'>

              <div className="addUnitPrompt" >
                <div className="addUnitPrompt-line">
                  <button onClick={(event) => setShowModal({show:true,modalName:"newUnit"})} className="handlingsKnapp handlingsKnappFokus">
                    Nytt prosjekt
                  </button>
                  <button onClick={(event) => setShowModal({show:true,modalName:"openCSV"})} className="handlingsKnapp">
                    Åpne prosjekt
                  </button>
                </div>
              </div>
            </div>
          }
      </div>
    </div>
  )

}
