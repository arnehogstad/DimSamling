import React, { Fragment } from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "left",
    borderColor: 'black',
    borderWidth: 0.5,
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
  console.log(props.dataIndex);

  const rows = props.data.map((unit) =>(
      unit.rooms.map((item) => (
    <View style={styles.row} key={item.id.toString()}>
      <Text style={styles.description}>{item.name}</Text>
      <Text style={styles.description}>{item.area}</Text>
      <Text style={styles.xyz}>{item.cc}</Text>
      <Text style={styles.xyz}>{item.circuits}</Text>
    </View>
  ))))



  return (<Fragment>{rows}</Fragment>)
}
