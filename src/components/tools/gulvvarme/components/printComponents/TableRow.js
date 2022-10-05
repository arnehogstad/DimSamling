import React, { Fragment } from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "left",
    borderColor: 'black',
    borderWidth: 0.5,
  },
  rowHeader: {
    flexDirection: "row",
    alignItems: "left",
    borderColor: 'black',
    borderWidth: 0,
    backgroundColor: 'gray',
    color: 'white',
  },
  description: {
    width: "30%",
  },
  xyz: {
    width: "20%",
  },
  tableContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 20,
  },
});

export default function TableRow(props){

  console.log(props.unit)

  const rows = props.unit.rooms.map((room,index) =>(
    <View style={styles.row} key={room.id.toString()}>
      <Text style={styles.description}>{room.name}</Text>
      <Text style={styles.description}>{room.area}</Text>
      <Text style={styles.xyz}>{room.cc}</Text>
      <Text style={styles.xyz}>{room.circuits}</Text>
    </View>
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
        <Text style={styles.description}>Rom</Text>
        <Text style={styles.description}>Areal</Text>
        <Text style={styles.xyz}>Røravstand</Text>
        <Text style={styles.xyz}>Antall kurser</Text>
      </View>
      <View style={styles.rowHeader}key={`${props.unitId}2`}>
        <Text style={styles.description}>[]</Text>
        <Text style={styles.description}>[m2]</Text>
        <Text style={styles.xyz}>[mm]</Text>
        <Text style={styles.xyz}>[stk]</Text>
      </View>
    </View>
  )
}
