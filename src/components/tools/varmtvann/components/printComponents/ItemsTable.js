import React from "react";
import { View, StyleSheet } from "@react-pdf/renderer";
import TableRow from "./TableRow";

const styles = StyleSheet.create({
  tableContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});

export default function ItemsTable(props){

return (
  <View style={styles.tableContainer}>
    {/*<TableHeader />*/}
    <TableRow
      data={props.data} 
      
    />
    {/*<TableFooter items={data.items} />*/}
  </View>
)
}
