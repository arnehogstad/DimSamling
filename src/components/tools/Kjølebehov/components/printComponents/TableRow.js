import React, { Fragment } from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "left",
    borderColor: 'black',
    borderWidth: 1,
    borderStyle: 'solid',
    flexGrow: 1,
    padding: 5,
  },
  description: {
    width: "30%",
  },
  xyz: {
    width: "20%",
  },
  header2: {
    fontSize: 15,
    fontWeight: "bold",
  },
});

export default function TableRow(props) {

  console.log(props.data)


  const rows = props.data.map((item) => (

    <View style={styles.row} >
      <Text style={styles.description}>{item[0]}</Text>
      <Text style={styles.description}>{item[1]}</Text>
    </View>
  ))




  return (
    <View>
      <Text style={styles.header2} > Øvrige definert last: </Text>
            <Fragment>{rows}</Fragment>
    </View>
  )
}
