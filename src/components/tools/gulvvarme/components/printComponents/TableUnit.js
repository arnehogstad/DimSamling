import React, { Fragment } from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'left',
    width: '100%',
  },
  rowSummation: {
    flexDirection: 'row',
    alignItems: 'left',
    borderBottomColor: 'rgb(80,80,80)',
    borderBottomWidth: 0.5,
    width: '97.5%',
    color: 'rgb(80,80,80)',
    marginTop: 2,
    marginLeft: 10,

  },
  rowHeader: {
    flexDirection: 'row',
    alignItems: 'left',
    borderColor: 'black',
    borderWidth: 0,
    backgroundColor: 'black',
    color: 'white',
    width: '100%',
  },
  description: {
    width: '15%',
  },
  descriptionLargeLeft: {
    width: '40%',
    textAlign: 'left',
  },
  descriptionMediumRight: {
    width: '25%',
    textAlign: 'right',
    paddingRight: 5,
  },
  descriptionSmall: {
    width: '10%',
    paddingLeft: 0,
  },
  descriptionSmallNumber: {
    textAlign: 'right',
    width: '10%',
  },
  tableContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 5,
  },
  tableHeadline: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
    marginBottom: 5,
  },
  unitName: {
    fontSize: 11,
    fontWeight: 'bold',
    letterSpacing: 1,

  },
  unitDescription: {
    paddingLeft: 10,
    letterSpacing: 0.5,
    color: 'rgb(80,80,80)',
  },
});

export default function TableUnit(props){

  const tempSortByFloor = props.unit.rooms.slice().sort((a,b)=>a.floor.localeCompare(b.floor))
  const sortedByFloor = tempSortByFloor.map((room)=> ({...room, floor: room.floor.replace(' - bjelkelag', '').replace(' - betong', '')}))

  console.log(props)

  const rows = sortedByFloor.map((room,index) =>(
    <Fragment key={`${props.unit.unitId}${room.id}`}>
    {index === 1 ?
      <View style={styles.rowSummation} key={`${props.unit.unitId}${room.floor}2`}>
        <Text style={styles.descriptionSmall}>{room.floor}</Text>
        <Text style={styles.description}></Text>
        <Text style={styles.descriptionLargeLeft}></Text>
        <Text style={styles.descriptionSmallNumber}>
          {sortedByFloor.filter((rooms) => rooms.floor === room.floor).reduce((prev,curr)=>prev+parseFloat(curr.area),0)} m&#xB2;
        </Text>
        <Text style={styles.descriptionMediumRight}>
          {sortedByFloor.filter((rooms) => rooms.floor === room.floor).length} rom, {sortedByFloor.filter((rooms) => rooms.floor === room.floor).reduce((prev,curr)=>prev+curr.circuits,0)} kurser
        </Text>
      </View>
      :
      index > 1 && sortedByFloor[index-1].floor !== room.floor ?
      <View style={styles.rowSummation} key={`${props.unit.unitId}${room.floor}2`}>
        <Text style={styles.descriptionSmall}>{room.floor}</Text>
        <Text style={styles.description}></Text>
        <Text style={styles.descriptionLargeLeft}></Text>
        <Text style={styles.descriptionSmallNumber}>
          {sortedByFloor.filter((rooms) => rooms.floor === room.floor).reduce((prev,curr)=>prev+parseFloat(curr.area),0)}  m&#xB2;
        </Text>
        <Text style={styles.descriptionMediumRight}>
          {sortedByFloor.filter((rooms) => rooms.floor === room.floor).length} rom, {sortedByFloor.filter((rooms) => rooms.floor === room.floor).reduce((prev,curr)=>prev+curr.circuits,0)} kurser
        </Text>
      </View>

      : null
    }
    {room.name !== '' ?
      <View style={styles.row} key={room.id.toString()}>
        <Text style={styles.descriptionSmall}></Text>
        <Text style={styles.description}>{room.name}</Text>
        <Text style={styles.descriptionLargeLeft}>{room.pipetype}</Text>
        <Text style={styles.descriptionSmallNumber}>{room.area}  m&#xB2;</Text>
        <Text style={styles.descriptionMediumRight}>{room.circuits} kurs{room.circuits === 1 ? null : 'er'}, {room.cc} mm</Text>
      </View>
      :
      null
    }
    </Fragment>
  ))



  return (
    <View wrap={false}>
      <UnitHeadline unit = {props.unit}/>
      {rows}
    </View>)
}

function UnitHeadline(props) {

  let area = props.unit.rooms.filter((room) => room.floor !== "").reduce((prev,curr)=>prev+parseFloat(curr.area),0)
  let rooms = props.unit.rooms.filter((room) => room.floor !== "").length
  let circuits = props.unit.rooms.reduce((prev,curr)=>prev+curr.circuits,0)
  let wetrooms = props.unit.rooms.reduce((prev,curr)=>prev+curr.wetroom,0)
  let floors = props.unit.rooms.filter((room) => room.floor !== "").reduce(function(values, v) {
    if (!values.set[v.floor]) {
      values.set[v.floor] = 1;
      values.count++;
    }
    return values;
  }, { set: {}, count: 0 }).count

  return (
    <View style={styles.tableHeadline}>
      <View style={styles.row}>
        <Text style={styles.unitName}>
          Romoversikt {props.unit.unitName}
        </Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.unitDescription}>
          Regulering: {props.unit.termostatType} - {props.unit.termostatStandard}
        </Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.unitDescription}>
            Totalt {area} m&#xB2;, {circuits} kurser, {rooms} rom (hvorav {wetrooms} våtrom), {floors} etasjer
        </Text>
      </View>
    </View>
  )
}
