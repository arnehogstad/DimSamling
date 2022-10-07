import React, { Fragment } from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "left",
    width: "100%",
  },
  rowSummation: {
    flexDirection: "row",
    alignItems: "left",
    borderTopColor: 'black',
    borderTopWidth: 0.5,
    borderBottomColor: 'black',
    borderBottomWidth: 0.5,
    width: "100%",

  },
  rowHeader: {
    flexDirection: "row",
    alignItems: "left",
    borderColor: 'black',
    borderWidth: 0,
    backgroundColor: 'black',
    color: 'white',
    width: "100%",
  },
  description: {
    width: "15%",
  },
  descriptionLarge: {
    width: "35%",
  },
  descriptionSmall: {
    width: "10%",
    paddingLeft: 10,
  },
  descriptionSmallNumber: {
    textAlign: "right",
    width: "10%",
  },
  tableContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 5,
  },
  tableHeadline: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
  },
});

export default function TableRow(props){

  const tempSortByFloor = props.unit.rooms.slice().sort((a,b)=>a.floor.localeCompare(b.floor))
  const sortedByFloor = tempSortByFloor.map((room)=> ({...room, floor: room.floor.replace(' - bjelkelag', '').replace(' - betong', '')}))

  console.log(props);

  const rows = sortedByFloor.map((room,index) =>(
    <Fragment key={`${props.unit.unitId}${room.id}`}>
    {index === 1 ?
      <View style={styles.rowSummation} key={`${props.unit.unitId}${room.floor}2`}>
        <Text style={styles.descriptionSmall}>{room.floor}</Text>
        <Text style={styles.description}></Text>
        <Text style={styles.descriptionSmall}>
          {sortedByFloor.filter((rooms) => rooms.floor === room.floor).length} stk
        </Text>
        <Text style={styles.descriptionSmall}>
          {sortedByFloor.filter((rooms) => rooms.floor === room.floor).reduce((prev,curr)=>prev+parseFloat(curr.area),0)}
        </Text>
        <Text style={styles.descriptionSmall}>
          {sortedByFloor.filter((rooms) => rooms.floor === room.floor).reduce((prev,curr)=>prev+curr.circuits,0)}
        </Text>
        <Text style={styles.descriptionLarge}></Text>
      </View>
      :
      index > 1 && sortedByFloor[index-1].floor !== room.floor ?
      <View style={styles.rowSummation} key={`${props.unit.unitId}${room.floor}2`}>
        <Text style={styles.descriptionSmall}>{room.floor}</Text>
        <Text style={styles.description}></Text>
        <Text style={styles.descriptionSmall}>
          {sortedByFloor.filter((rooms) => rooms.floor === room.floor).length} stk
        </Text>
        <Text style={styles.descriptionSmall}>
          {sortedByFloor.filter((rooms) => rooms.floor === room.floor).reduce((prev,curr)=>prev+parseFloat(curr.area),0)}
        </Text>
        <Text style={styles.descriptionSmall}>
          {sortedByFloor.filter((rooms) => rooms.floor === room.floor).reduce((prev,curr)=>prev+curr.circuits,0)}
        </Text>
        <Text style={styles.descriptionLarge}></Text>
      </View>
      : null
    }
      <View style={styles.row} key={room.id.toString()}>
        <Text style={styles.descriptionSmall}></Text>
        <Text style={styles.description}>{room.name}</Text>
        <Text style={styles.descriptionSmall}>{room.area}</Text>
        <Text style={styles.descriptionSmall}>{room.cc}</Text>
        <Text style={styles.descriptionSmall}>{room.circuits}</Text>
        <Text style={styles.descriptionLarge}>{room.pipetype}</Text>
      </View>
    </Fragment>
  ))

  return (
    <View wrap={false}>
      <UnitHeadline unit = {props.unit}/>
      <TableHeader unitId ={props.unit.unitId} />
      {rows}
    </View>)
}

function TableHeader(props) {
  return(
    <View style={styles.tableContainer}>
      <View style={styles.rowHeader} key={`${props.unitId}1`}>
        <Text style={styles.descriptionSmall}></Text>
        <Text style={styles.description}>Rom</Text>
        <Text style={styles.descriptionSmall}>Areal</Text>
        <Text style={styles.descriptionSmall}>CC</Text>
        <Text style={styles.descriptionSmall}>Kurser</Text>
        <Text style={styles.descriptionLarge}>Rørtype</Text>
      </View>
      <View style={styles.rowHeader}key={`${props.unitId}2`}>
        <Text style={styles.descriptionSmall}></Text>
        <Text style={styles.description}>[]</Text>
        <Text style={styles.descriptionSmall}>[m2]</Text>
        <Text style={styles.descriptionSmall}>[mm]</Text>
        <Text style={styles.descriptionLarge}>[]</Text>
      </View>
    </View>
  )
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
        <Text style={styles.row}>
          Romoversikt {props.unit.unitName}
        </Text>
        <Text style={styles.row}>
          Regulering: {props.unit.termostatType} - {props.unit.termostatStandard}
        </Text>
        <View style={styles.row}>
          <Text style={styles.descriptionSmall}>
            Areal
          </Text>
          <Text style={styles.descriptionSmallNumber}>
            {area}
          </Text>
          <Text style={styles.descriptionSmall}>
            m2
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.descriptionSmall}>
            Kurser
          </Text>
          <Text style={styles.descriptionSmallNumber}>
            {circuits}
          </Text>
          <Text style={styles.descriptionSmall}>
            stk
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.descriptionSmall}>
            Rom
          </Text>
          <Text style={styles.descriptionSmallNumber}>
            {rooms}
          </Text>
          <Text style={styles.descriptionSmall}>
            stk
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.descriptionSmall}>
            Etasjer
          </Text>
          <Text style={styles.descriptionSmallNumber}>
            {floors}
          </Text>
          <Text style={styles.descriptionSmall}>
            stk
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.descriptionSmall}>
            Våtrom
          </Text>
          <Text style={styles.descriptionSmallNumber}>
            {wetrooms}
          </Text>
          <Text style={styles.descriptionSmall}>
            stk
          </Text>
        </View>
      </View>
  )
}
