import React from 'react'
import Roomtable from './Roomtable'
import Radiobuttons from './Radiobuttons'
import Unitlist from './Unitlist'

export default function Unit(props) {

  const roomTableElements = props.units.map(unit =>
    <Roomtable
      key = {`${unit.unitId}table`}
      unitRooms={unit.rooms}
      currentUnitId={props.currentUnit.unitId}
      unit={unit}
      newRowClick={props.newRowClick}
      delRowClick={props.delRowClick}
      roomDataInput={props.roomDataInput}
      floorListValues={props.floorListValues}
      pipeListValues={props.pipeListValues}
      gulvvarmePakker={props.gulvvarmePakker}
    />
  )

  const radioButtonElements = props.units.map(unit =>
    <Radiobuttons
      key = {`${unit.unitId}radio`}
      unitId={unit.unitId}
      unit={unit}
      currentUnitId={props.currentUnit.unitId}
      unitName={unit.unitName}
      unitRadio = {unit.radioButtons}
      radioButtonClick={props.radioButtonClick}
    />
  )

  return (
    <div className='inputArea'>
          <Unitlist
            units={props.units}
            addUnit={props.addUnit}
            deleteUnit={props.deleteUnit}
            currentUnit={props.currentUnit}
            setCurrentUnitId={props.setCurrentUnitId}
            projectName = {props.projectName}
            setShowModal={props.setShowModal}
          />
        {roomTableElements}
        {radioButtonElements}
    </div>
)
}
