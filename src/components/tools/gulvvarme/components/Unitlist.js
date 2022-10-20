import React from 'react'
import nyLinjePic from '../../../../images/nyLinjeBilde.png'
import editNamePic from '../../../../images/rediger.png'
import delUnitPic from '../../../../images/Slett.jpg'

export default function Unitlist(props){

  const listElements = props.units.map(unit => (
      <div key={unit.unitId}>
        <div className={`unit-list-item ${
          unit.unitId === props.currentUnit.unitId ? "selected-unit-list-item" : ""
        }`}
          onClick={() => props.setCurrentUnitId(unit.unitId)}
        >
          <div className="unit-list-item-name">{unit.unitName}</div>
          <button className="delete-btn">
            <img
              className="button-col-img"
              src={editNamePic}
              alt="Endrer navn på boenhet"
              onClick={(event) => props.setShowModal({show:true,modalName:"editNameUnit"})}
              />
          </button>
          <button
              className="delete-btn"
              onClick={(event) => props.setShowModal({show:true,modalName:"deleteUnit"})}
          >
            <img
              className="button-col-img"
              src={delUnitPic}
              alt="Sletter boenhet"
              />
          </button>
        </div>
      </div>
    ))




  return (
    <div className="unitListDiv">
        <div className="unitListDiv-overskrift">
          <div className="unitListDiv-overskrift-tekst">
          Boenheter
          </div>
          <img
          className="unitListDiv-overskrift-knapp"
          src={nyLinjePic}
          alt="Legg til ny boenhet"
          onClick={(event) => props.setShowModal({show:true,modalName:"newUnit"})}
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
