import React, { Fragment } from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";
import TableRow from "./TableRow";

const styles = StyleSheet.create({
  tableContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});

export default function ItemsTable(props){

const tables = props.data.map((unit) => (
  <TableRow
    unit={unit}
  />
))


return (
  <Fragment>
    {tables}
    {/*<TableFooter items={data.items} />*/}
  </Fragment>
)
}
