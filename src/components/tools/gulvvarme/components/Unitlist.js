import React from 'react'
import nyLinjePic from '../../../../images/nyLinjeBilde.png'
import editNamePic from '../../../../images/rediger.png'
import delUnitPic from '../../../../images/Slett.jpg'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'




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
            <EditIcon
              className="button-col-img"
              onClick={(event) => props.setShowModal({show:true,modalName:"editNameUnit"})}
              />
          </button>
          <button
              className="delete-btn"
              onClick={(event) => props.setShowModal({show:true,modalName:"deleteUnit"})}
          >
            <DeleteIcon
              className="button-col-img"
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
        </div>
        <div className="unitListDiv-liste">
          <div>
            {listElements}
          </div>
        </div>
        <div>
          <button
            className="handlingsKnapp handlingsKnapp-unitList"
            onClick={(event) => props.setShowModal({show:true,modalName:"newUnit"})}
          >
            LEGG TIL NY BOENHET
          </button>
        </div>
    </div>
  )
}
