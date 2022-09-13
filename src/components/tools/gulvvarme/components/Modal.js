import React from 'react'

export default function Modal(props){

  const styles = {display: props.showModal.show === true ? "flex" : "none"}

  function toggleVisibility(event){
    if (event.target.className === "modal" ||
      event.target.className === "modal-cancel-div" ||
      event.target.className === "handlingsKnapp avbrytknapp"){
      props.setShowModal({show:false,modalName:""})
    }
  }

  return (

      <>
        {
          props.showModal.modalName === "newUnit" ?
          <AddUnitModal
            showModal={props.showModal}
            setShowModal={props.setShowModal}
            projectName={props.projectName}
            setProjectName={props.setProjectName}
            units={props.units}
            addUnit={props.addUnit}
            setCurrentUnitId={props.setCurrentUnitId}
            copyUnit={props.copyUnit}
            toggleVisibility = {toggleVisibility}
            styles={styles}
          />
          :
          props.showModal.modalName === "editNameUnit" ?
          <RenameUnitModal
            showModal={props.showModal}
            setShowModal={props.setShowModal}
            units={props.units}
            findCurrentUnit = {props.findCurrentUnit}
            changeNameUnit ={props.changeNameUnit}
            toggleVisibility = {toggleVisibility}
            styles={styles}
          />
          :
          props.showModal.modalName === "editNameProject" ?
          <RenameProjectModal
            showModal={props.showModal}
            setShowModal={props.setShowModal}
            projectName={props.projectName}
            setProjectName={props.setProjectName}
            toggleVisibility = {toggleVisibility}
            styles={styles}
          />
          :
          props.showModal.modalName === "deleteUnit" ?
          <DeleteUnitModal
            showModal={props.showModal}
            setShowModal={props.setShowModal}
            units={props.units}
            deleteUnit={props.deleteUnit}
            currentUnitId = {props.currentUnitId}
            findCurrentUnit = {props.findCurrentUnit}
            toggleVisibility = {toggleVisibility}
            styles={styles}
          />
          :
          props.showModal.modalName === "newProject" ?
          <NewProjectModal
            showModal={props.showModal}
            setShowModal={props.setShowModal}
            units={props.units}
            deleteUnit={props.deleteUnit}
            toggleVisibility = {toggleVisibility}
            styles={styles}
          />
          :
          props.showModal.modalName === "openProject" ?
          <OpenProjectModal
            showModal={props.showModal}
            setShowModal={props.setShowModal}
            units={props.units}
            deleteUnit={props.deleteUnit}
            toggleVisibility = {toggleVisibility}
            styles={styles}
          />
          :
          props.showModal.modalName === "openCSV" ?
          <OpenCSVModal
            showModal={props.showModal}
            setShowModal={props.setShowModal}
            units={props.units}
            deleteUnit={props.deleteUnit}
            toggleVisibility = {toggleVisibility}
            styles={styles}
            addUnit={props.addUnit}
          />
          :
          null
        }
      </>


  )
}

///////////////////////////////////////////////////////////////////////////
///////             MODAL FOR DELETING UNIT                   ////////////
//////////////////////////////////////////////////////////////////////////


function DeleteUnitModal(props){
  const [unitToDel,setunitToDel] = React.useState({
    name: props.units.length > 0 ? props.findCurrentUnit().unitName : "",
    unitId: props.units.length > 0 ? props.findCurrentUnit().unitId : "",
  })

  function delUnit(){
    //props.setProjectName(newProjectName.newname)
    props.setShowModal({show:false,modalName:""})
    props.deleteUnit(unitToDel.unitId)
  }

  //Listener on changes in selected unit, changes unitToDel
  React.useEffect(()=>{
    setunitToDel(
        {name: props.units.length > 0 ? props.findCurrentUnit().unitName : "",
        unitId: props.units.length > 0 ? props.findCurrentUnit().unitId : ""}
    )
  },[props.currentUnitId])

  return (
    <div className="modal" style={props.styles} onClick={(event) => props.toggleVisibility(event)}>
      <div className="modal-content">
        <div className="modal-header">
          <div className="modal-header-text">Slett boenhet</div>
          <div className="modal-cancel-div">x</div>
        </div>
        <div className="modal-input-container">
          <div>
            Dette vil slette boenheten permanent.
            Er du sikker på at du vil slette følgende boenhet?
            <p></p>
          </div>
          <div className="modal-input-line">
            <div className="modal-input-title">
                Navn på boenhet
            </div>
            <div className="modal-input-value">
              <input
                name="name"
                type="search"
                autoComplete="off"
                value={unitToDel.name}
                disabled= {true}
              />
            </div>
          </div>
        </div>
        <div className="modal-buttons">
          <button onClick={delUnit} className="handlingsKnapp">Bekreft</button>
          <button className="handlingsKnapp avbrytknapp">Avbryt</button>
        </div>
      </div>
    </div>
  )
}

///////////////////////////////////////////////////////////////////////////
///////       MODAL FOR OPENING A PROJECT - DELETING EXISTING DATA   //////
//////////////////////////////////////////////////////////////////////////

function OpenProjectModal(props){

  function delProject(){
    props.units.forEach(unit => props.deleteUnit(unit.unitId))
    props.setShowModal({show:true,modalName:"openCSV"})
  }

  return (
    <div className="modal" style={props.styles} onClick={(event) => props.toggleVisibility(event)}>
      <div className="modal-content">
        <div className="modal-header">
          <div className="modal-header-text">Åpne lagret prosjekt</div>
          <div className="modal-cancel-div">x</div>
        </div>
        <div className="modal-input-container">
          <div>
            Dette vil slette aktivt prosjekt permanent. <br></br>
            Er du sikker på at du vil slette aktivt prosjekt?<p></p>
            Det er ikke mulig å angre denne handlingen
            <p></p>
          </div>
        </div>
        <div className="modal-buttons">
          <button onClick={delProject} className="handlingsKnapp">Bekreft</button>
          <button className="handlingsKnapp avbrytknapp">Avbryt</button>
        </div>
      </div>
    </div>
  )
}

///////////////////////////////////////////////////////////////////////////
///////       MODAL FOR OPENING A PROJECT - OPENING CSV FILE   //////
//////////////////////////////////////////////////////////////////////////

function OpenCSVModal(props){
  const [csvFile, setCsvFile] = React.useState();
  const [csvArray, setCsvArray] = React.useState([]);



  //funksjon som returnerer CSV tilbake til object
  const processCSV = (str, delim=',') => {
          const headers = str.slice(0,str.indexOf('\n')).split(delim);
          const rows = str.slice(str.indexOf('\n')+1).split('\n');

          const newArray = rows.map( row => {
              const values = row.split(delim);
              const eachObject = headers.reduce((obj, header, i) => {
                  obj[header] = values[i].replaceAll('\"','');
                  return obj;
              }, {})
              return eachObject;
          })
          setCsvArray(newArray)
      }

      //funksjon som henter CSV fil
      const submit = () => {
          const file = csvFile;
          const reader = new FileReader();

          reader.onload = function(e) {
              const text = e.target.result;
              processCSV(text)
          }
          reader.readAsText(file);
      }

      function returnEmptyRoom(){
        let tempRoom = {
          floor: "",
          name: "",
          area:"",
          pipetype: "",
          cc:"",
          circuits:"",
          wetroom: false,
          id: ""
        }
        return tempRoom
      }

      //function parsing unit into object
      function deconstructUnit(unit){
        const tempRoomArr = []
        var roomNames  = []
        var roomArr = []

        //defines the unit object
        let tempUnit = {
          unitId: "",
          unitName: "",
          rooms: [],
          fordelerskap: "",
          fordelerstokk: "",
          termostatType: "",
          termostatStandard: "",
        }

        for (const [key, value] of Object.entries(unit)) {
          //setting values for the unit
          if(key.includes("Room")===false){
            if(key.includes("unitId")){
              tempUnit.unitId=value
            }else if (key.includes("unitName")){
              tempUnit.unitName=value
            }else if (key.includes("fordelerskap")){
              tempUnit.fordelerskap=value
            }else if (key.includes("fordelerstokk")){
              tempUnit.fordelerstokk=value
            }else if (key.includes("termostatType")){
              tempUnit.termostatType=value
            }else if (key.includes("termostatStandard")){
              tempUnit.termostatStandard=value
            }
          }else{
            //setting the values for the rooms
            console.log(`${key}: ${value}`);
            let roomPrefix = key.substring(0, 6)
            //if new room - create new empty room and save the new name of the room
            if(roomNames.includes(roomPrefix) === false){
              let tempRoom = returnEmptyRoom()
              roomArr.push(tempRoom)
              roomNames.push(roomPrefix)
            }
            //gettin arrayposion of the room
            let roomPos = roomNames.indexOf(roomPrefix)
            //updating the relevant room value
            if (key.includes("floor")){
              console.log(key);
              roomArr[roomPos].floor=value
            }else if (key.includes("name")){
              roomArr[roomPos].name=value
            }else if (key.includes("area")){
              roomArr[roomPos].area=value
            }else if (key.includes("pipetype")){
              roomArr[roomPos].pipetype=value
            }else if (key.includes("cc")){
              roomArr[roomPos].cc=value
            }else if (key.includes("circuits")){
              roomArr[roomPos].circuits=value
            }else if (key.includes("wetroom")){
              roomArr[roomPos].wetroom=value
            }else if (key.includes("id")){
              roomArr[roomPos].id=value
            }
          }
        }
        //fjerner tomme rom
        let finalRoomArr = roomArr.filter(room => (
          room.floor !== "" ||
          room.name !== "" ||
          room.area !== "" ||
          room.pipetype !== "" ||
          room.cc !== "" ||
          room.circuits !== ""
        ))
        //defines the room object
        let lastRoom = returnEmptyRoom()
        finalRoomArr.push(lastRoom)
        tempUnit.rooms=finalRoomArr
        console.log(tempUnit);
        return tempUnit
      }

      //Listener on changes in units, toggles showResult back to false if set to true
      React.useEffect(()=>{

        if(csvArray.length > 0){
          csvArray.forEach((unit,index) => {
            let tempUnit = deconstructUnit(unit)
            props.addUnit("","",tempUnit)
          })
          props.setShowModal({show:false,modalName:""})
        }

      },[csvArray])


  return (
    <div className="modal" style={props.styles} onClick={(event) => props.toggleVisibility(event)}>
      <div className="modal-content">
        <div className="modal-header">
          <div className="modal-header-text">Åpne lagret prosjekt</div>
          <div className="modal-cancel-div">x</div>
        </div>
        <div className="modal-input-container">

            <div className="modal-input-value">

                <input
                    type='file'
                    accept='.csv'
                    id='csvFile'
                    onChange={(e) => {
                        setCsvFile(e.target.files[0])
                    }}
                >
                </input>
              </div>

        </div>
        <div className="modal-buttons">
          <button className="handlingsKnapp" onClick={(e) => {if(csvFile)submit()}} >Bekreft</button>
          <button className="handlingsKnapp avbrytknapp">Avbryt</button>
        </div>
      </div>
    </div>
  )
}


///////////////////////////////////////////////////////////////////////////
///////       MODAL FOR NEW PROJECT - DELETING EXISTING DATA   ////////////
//////////////////////////////////////////////////////////////////////////
function NewProjectModal(props){

  function delProject(){
    props.units.forEach(unit => props.deleteUnit(unit.unitId))
    props.setShowModal({show:true,modalName:"newUnit"})
  }

  return (
    <div className="modal" style={props.styles} onClick={(event) => props.toggleVisibility(event)}>
      <div className="modal-content">
        <div className="modal-header">
          <div className="modal-header-text">Nytt prosjekt</div>
          <div className="modal-cancel-div">x</div>
        </div>
        <div className="modal-input-container">
          <div>
            Dette vil slette aktivt prosjekt permanent. <br></br>
            Er du sikker på at du vil slette aktivt prosjekt?<p></p>
            Det er ikke mulig å angre denne handlingen
            <p></p>
          </div>
        </div>
        <div className="modal-buttons">
          <button onClick={delProject} className="handlingsKnapp">Bekreft</button>
          <button className="handlingsKnapp avbrytknapp">Avbryt</button>
        </div>
      </div>
    </div>
  )
}




///////////////////////////////////////////////////////////////////////////
///////             MODAL FOR CHANGING UNIT  NAME            ////////////
//////////////////////////////////////////////////////////////////////////

function RenameUnitModal(props){
  const [newNameUnit,setNewNameUnit] = React.useState({
    oldname: props.findCurrentUnit().unitName,
    newname:"",
  })

  function updateUnitName(){
    //props.setProjectName(newProjectName.newname)
    props.setShowModal({show:false,modalName:""})
    props.changeNameUnit(newNameUnit.newname)
  }

  function changeName(event){
    const {name, value} = event.target
    setNewNameUnit(oldVals =>
      (
         {...oldVals,
         [name]: value
       }
     ))
  }


  return (
    <div className="modal" style={props.styles} onClick={(event) => props.toggleVisibility(event)}>
      <div className="modal-content">
        <div className="modal-header">
          <div className="modal-header-text">Endre navn på boenhet</div>
          <div className="modal-cancel-div">x</div>
        </div>
        <div className="modal-input-container">
          <div className="modal-input-line">
            <div className="modal-input-title">
                Navn på boenhet
            </div>
            <div className="modal-input-value">
              <input
                name="oldname"
                type="search"
                autoComplete="off"
                value={newNameUnit.oldname}
                disabled= {true}
              />
            </div>
          </div>
          <div className="modal-input-line">
            <div className="modal-input-title">
                Nytt navn på boenhet
            </div>
            <div className="modal-input-value">
              <input
                name="newname"
                type="search"
                autoComplete="off"
                autoFocus = {true}
                value={newNameUnit.newname}
                onChange={(event)=>changeName(event)}

              />
            </div>
          </div>
        </div>
        <div className="modal-buttons">
          <button onClick={updateUnitName} className="handlingsKnapp">Bekreft</button>
          <button className="handlingsKnapp avbrytknapp">Avbryt</button>
        </div>
      </div>
    </div>
  )
}


///////////////////////////////////////////////////////////////////////////
///////             MODAL FOR CHANGING PROJECT NAME            ////////////
//////////////////////////////////////////////////////////////////////////


function RenameProjectModal(props){
  const [newProjectName,setNewProjectName] = React.useState({
    oldname: props.projectName,
    newname:""
  })

  function updateProject(){
    props.setProjectName(newProjectName.newname)
    props.setShowModal({show:false,modalName:""})
  }

  function changeName(event){
    const {name, value} = event.target
    setNewProjectName(oldVals =>
      (
         {...oldVals,
         [name]: value
       }
     ))
  }


  return (
    <div className="modal" style={props.styles} onClick={(event) => props.toggleVisibility(event)}>
      <div className="modal-content">
        <div className="modal-header">
          <div className="modal-header-text">Endre prosjektnavn</div>
          <div className="modal-cancel-div">x</div>
        </div>
        <div className="modal-input-container">
          <div className="modal-input-line">
            <div className="modal-input-title">
                Prosjektnavn
            </div>
            <div className="modal-input-value">
              <input
                name="oldname"
                type="search"
                autoComplete="off"
                value={newProjectName.oldname}
                disabled= {true}
              />
            </div>
          </div>
          <div className="modal-input-line">
            <div className="modal-input-title">
                Nytt Prosjektnavn
            </div>
            <div className="modal-input-value">
              <input
                name="newname"
                type="search"
                autoComplete="off"
                autoFocus = {true}
                value={newProjectName.newname}
                onChange={(event)=>changeName(event)}
              />
            </div>
          </div>
        </div>
        <div className="modal-buttons">
          <button onClick={updateProject} className="handlingsKnapp">Bekreft</button>
          <button className="handlingsKnapp avbrytknapp">Avbryt</button>
        </div>
      </div>
    </div>
  )
}

///////////////////////////////////////////////////////////////////////////
///////    MODAL FOR ADDING A NEW PROJECT OR NEW UNIT         ////////////
//////////////////////////////////////////////////////////////////////////

function AddUnitModal(props){

  const [newProjectVals,setNewProjectVals] = React.useState({
    projectname: props.units.length > 0 ? props.projectName : "",
    unitname:"",
    copyunit:"",
    rooms: 5,
    floorshift:0
  })

  //function updating state of units with values from input
  function projecInput(event) {
      const {name, value} = event.target
      setNewProjectVals(oldVals =>
        (
           {...oldVals,
           [name]: value <0 ? name === "rooms" ? value*-1 : value : value
         }
       ))
    }

    //listener to copyunitchange -> updates the selected unit
    React.useEffect(() => {
      if(newProjectVals.copyunit !== ""){
        props.setCurrentUnitId(newProjectVals.copyunit)
      }
    },[newProjectVals.copyunit])

  function updateUnits(){
    if (props.units.length === 0){
      props.setProjectName(newProjectVals.projectname)
    }
    if(newProjectVals.copyunit!==""){
      props.copyUnit(newProjectVals.copyunit,newProjectVals.unitname,newProjectVals.floorshift)
    }else{
    props.addUnit(newProjectVals.rooms,newProjectVals.unitname)
    }
    setNewProjectVals(oldVals =>
      (
         {...oldVals,
           copyunit:"",
           rooms: 5,
           floorshift:0
       }
     ))
    props.setShowModal({show:false,modalName:""})
  }

  var headerText = props.units.length === 0 ? "Nytt prosjekt" : "Legg til boenhet"

  const unitListElements = []
  const floorShifElements = []
  unitListElements.push(<option key="" value="">Ny tom boenhet</option>)
  for (let i = 0; i<props.units.length;i++){
    unitListElements.push(<option key={props.units[i].unitId} value={props.units[i].unitId}>Kopier {props.units[i].unitName}</option>)
  }
  for (let i = -5; i<=5;i++){
    floorShifElements.push(<option key={i} value={i}>{i}</option>)
  }

  return (
    <div className="modal" style={props.styles} onClick={(event) => props.toggleVisibility(event)}>
      <div className="modal-content">
        <div className="modal-header">
          <div className="modal-header-text">{headerText}</div>
          <div className="modal-cancel-div">x</div>
        </div>
        <div className="modal-input-container">
          <div className="modal-input-line">
            <div className="modal-input-title">
                Prosjektnavn
            </div>
            <div className="modal-input-value">
              <input
                name="projectname"
                type="search"
                autoComplete="off"
                autoFocus = {props.units.length === 0 ? true : false}
                value={newProjectVals.projectname}
                onChange={(event)=>projecInput(event)}
                disabled= {props.units.length === 0 ? false : true}
              />
            </div>
          </div>
          <div className="modal-input-line">
            <div className="modal-input-title">
                Navn på boenhet
            </div>
            <div className="modal-input-value">
              <input
                name="unitname"
                type="search"
                autoComplete="off"
                autoFocus = {props.units.length === 0 ? false : true}
                value={newProjectVals.unitname}
                onChange={(event)=>projecInput(event)}
              />
            </div>
          </div>
          {props.units.length === 0 ?
            <div className="modal-input-line">
              <div className="modal-input-title">
                  Antall rom
              </div>
              <div className="modal-input-value">
                <input className="text-center"
                  name="rooms"
                  type="number"
                  value={newProjectVals.rooms}
                  onChange={(event)=>projecInput(event)}
                  min="1"
                  max="99"
                />
              </div>
            </div>
          :
          <div>
          <div className="modal-input-line">
            <div className="modal-input-title">
                Type
            </div>
            <div className="modal-input-value">
              <select
                name="copyunit"
                onChange={(event)=>projecInput(event)}
                value={newProjectVals.copyunit}
              >
                {unitListElements}
              </select>
            </div>
          </div>
          {newProjectVals.copyunit === "" ?
            <div className="modal-input-line">
              <div className="modal-input-title">
                  Antall rom
              </div>
              <div className="modal-input-value">
                <input className="text-center"
                  name="rooms"
                  type="number"
                  value={newProjectVals.rooms}
                  onChange={(event)=>projecInput(event)}
                  min="1"
                  max="99"
                />
              </div>
            </div>
            :
            <div className="modal-input-line">
              <div className="modal-input-title">
                  Etasjeforskyving
              </div>
              <div className="modal-input-value">
                <select className="text-center"
                  name="floorshift"
                  onChange={(event)=>projecInput(event)}
                  value={newProjectVals.floorshift}
                >
                  {floorShifElements}
                </select>
              </div>
            </div>
          }
          </div>
        }
        </div>
        <div className="modal-buttons">
          <button onClick={updateUnits} className="handlingsKnapp">Bekreft</button>
          <button className="handlingsKnapp avbrytknapp">Avbryt</button>
        </div>
      </div>
    </div>
  )
}
