import React from "react";
import { View } from "@react-pdf/renderer";
import TableUnit from "./TableUnit";
import TableArticles from "./TableArticles";


export default function Table(props){
  const tables =
    props.data.map((unit, index) => (
      (unit.rooms.filter((room) => room.floor !== "").length > 0 ?
      <TableUnit
        key={`${unit.unitId}table`}
        unit={unit}
      />
      :
      null)
    ))

  return(
    <View style={props.styleTable}>
      {props.dataIndex === 0 ?
        tables :
        tables[props.dataIndex-1]
      }
      <TableArticles
        articleList = {props.articleList}
        unitInfo={props.unitInfo}
        roundedUnitItems = {props.roundedUnitItems}
    />
    </View>
  )
}
