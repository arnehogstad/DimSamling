import React from 'react'
import nyLinjePic from '../../../../images/nyLinjeBilde.png'

export default function Unitlist(props){

  const listElements = props.units.map(unit => (
      <div key={unit.unitId}>
        <div className={`unit-list-item ${
          unit.unitId === props.currentUnit.unitId ? "selected-unit-list-item" : ""
        }`}
          onClick={() => props.setCurrentUnitId(unit.unitId)}
        >
          <div>{unit.unitName}</div>
          <button
              className="delete-btn"
              onClick={(event) => props.deleteUnit(event, unit.unitId)}
          >
              <i className="gg-trash trash-icon"></i>
          </button>
        </div>
      </div>
    ))

  return (
    <div className="unitListDiv">
        <div className="unitListDiv-overskrift">
          <div className="unitListDiv-overskrift-tekst">
            Boenheter {props.projectName}
          </div>
          <img
            className="unitListDiv-overskrift-knapp"
            src={nyLinjePic}
            alt="Legg til ny boenhet"
            onClick={(event) => props.setShowModal(true)}
          />
        </div>
        <div className="unitListDiv-liste">
          <div>
            {listElements}
          </div>
        </div>
    </div>
  )
}
