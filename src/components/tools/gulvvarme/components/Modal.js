import React from 'react'

export default function Modal(props){

  const styles = {display: props.showModal === true ? "flex" : "none"}
  const [newProjectVals,setNewProjectVals] = React.useState({
    projectname: "",
    unitname:"",
    copyunit:"",
    rooms: 5,
    floorshift:0
  })


  function toggleVisibility(event){
    if (event.target.className === "modal" ||
      event.target.className === "modal-cancel-div" ||
      event.target.className === "handlingsKnapp avbrytknapp"){
      props.setShowModal(false)
    }
  }

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
    props.setShowModal(false)
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
    <div className="modal" style={styles} onClick={(event) => toggleVisibility(event)}>
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
