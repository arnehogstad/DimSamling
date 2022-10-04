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
});

export default function TableRow(props){

  console.log(props.data)

  const rows = props.data.map((unit) =>(
      unit.rooms.map((item, index) => (
    <View style={styles.row} key={item.id.toString()}>
      <Text style={styles.description}>{item.name}</Text>
      <Text style={styles.description}>{item.area}</Text>
      <Text style={styles.xyz}>{item.cc}</Text>
      <Text style={styles.xyz}>{item.circuits}</Text>
    </View>
  ))))



  return (
    <Fragment>
      <TableHeader />
      {rows}
    </Fragment>)
}

function TableHeader() {
  return(
    <Fragment>
    <View style={styles.rowHeader} key="TableHeader1">
      <Text style={styles.description}>Rom</Text>
      <Text style={styles.description}>Areal</Text>
      <Text style={styles.xyz}>Røravstand</Text>
      <Text style={styles.xyz}>Antall kurser</Text>
    </View>
    <View style={styles.rowHeader} key="TableHeader2">
      <Text style={styles.description}>[]</Text>
      <Text style={styles.description}>[m2]</Text>
      <Text style={styles.xyz}>[mm]</Text>
      <Text style={styles.xyz}>[stk]</Text>
    </View>
    </Fragment>
  )
}
