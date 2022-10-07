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

const tables =
  props.data.map((unit, index) => (
    <TableRow
      key={`${unit.unitId}table`}
      unit={unit}
      unitInfo={props.unitInfo}
      articleList = {props.articleList} 
    />
  ))

return (
  <Fragment>
    {props.dataIndex === 0 ?
      tables :
      tables[props.dataIndex-1]
    }
    {/*<TableFooter items={data.items} />*/}
  </Fragment>
)
}
