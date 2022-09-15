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

  const rows = props.data.items.map((item) => (
    <View style={styles.row} key={item.sr.toString()}>
      <Text style={styles.description}>{item.desc}</Text>
      <Text style={styles.description}>{item.desc}</Text>
      <Text style={styles.xyz}>{item.xyz}</Text>
      <Text style={styles.xyz}>Test {item.xyz}</Text>
    </View>
  ))
  return (<Fragment>{rows}</Fragment>)
}
