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
    backgroundColor: 'gray',
    color: 'white',
    width: "100%",
  },
  description: {
    width: "15%",
  },
  xyz: {
    width: "15%",
  },
  tableContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 20,
  },
});

export default function TableRow(props){


  const tempSortByFloor = props.unit.rooms.slice().sort((a,b)=>a.floor.localeCompare(b.floor))
  const sortedByFloor = tempSortByFloor.map((room)=> ({...room, floor: room.floor.replace(' - bjelkelag', '').replace(' - betong', '')}))


  const rows = sortedByFloor.map((room,index) =>(
    <Fragment key={`${props.unit.unitId}${room.id}`}>
    {index === 1 ?
      <View style={styles.rowSummation} key={`${props.unit.unitId}${room.floor}2`}>
        <Text style={styles.description}>{room.floor}</Text>
        <Text style={styles.description}></Text>
        <Text style={styles.description}>
          {sortedByFloor.filter((rooms) => rooms.floor === room.floor).length} stk
        </Text>
        <Text style={styles.description}>
          {sortedByFloor.filter((rooms) => rooms.floor === room.floor).reduce((prev,curr)=>prev+parseFloat(curr.area),0)}
        </Text>
        <Text style={styles.xyz}></Text>
        <Text style={styles.xyz}>
          {sortedByFloor.filter((rooms) => rooms.floor === room.floor).reduce((prev,curr)=>prev+curr.circuits,0)}
        </Text>
      </View>
      :
      index > 1 && sortedByFloor[index-1].floor !== room.floor ?
      <View style={styles.rowSummation} key={`${props.unit.unitId}${room.floor}2`}>
        <Text style={styles.description}>{room.floor}</Text>
        <Text style={styles.description}></Text>
        <Text style={styles.description}>
          {sortedByFloor.filter((rooms) => rooms.floor === room.floor).length} stk
        </Text>
        <Text style={styles.description}>
          {sortedByFloor.filter((rooms) => rooms.floor === room.floor).reduce((prev,curr)=>prev+parseFloat(curr.area),0)}
        </Text>
        <Text style={styles.xyz}></Text>
        <Text style={styles.xyz}>
          {sortedByFloor.filter((rooms) => rooms.floor === room.floor).reduce((prev,curr)=>prev+curr.circuits,0)}
        </Text>
      </View>
      : null
    }
      <View style={styles.row} key={room.id.toString()}>
        <Text style={styles.description}></Text>
        <Text style={styles.description}></Text>
        <Text style={styles.description}>{room.name}</Text>
        <Text style={styles.description}>{room.area}</Text>
        <Text style={styles.xyz}>{room.cc}</Text>
        <Text style={styles.xyz}>{room.circuits}</Text>
      </View>
    </Fragment>
  ))

  return (
    <Fragment>
      <TableHeader unitId ={props.unit.unitId} />
      {rows}
    </Fragment>)
}

function TableHeader(props) {
  return(
    <View style={styles.tableContainer}>
      <View style={styles.rowHeader} key={`${props.unitId}1`}>
        <Text style={styles.description}></Text>
        <Text style={styles.description}></Text>
        <Text style={styles.description}>Rom</Text>
        <Text style={styles.description}>Areal</Text>
        <Text style={styles.xyz}>Røravstand</Text>
        <Text style={styles.xyz}>Antall kurser</Text>
      </View>
      <View style={styles.rowHeader}key={`${props.unitId}2`}>
        <Text style={styles.description}></Text>
        <Text style={styles.description}></Text>
        <Text style={styles.description}>[]</Text>
        <Text style={styles.description}>[m2]</Text>
        <Text style={styles.xyz}>[mm]</Text>
        <Text style={styles.xyz}>[stk]</Text>
      </View>
    </View>
  )
}

function UnitHeadline(props) {


  return (
    null
  )
}
