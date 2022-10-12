import React from "react";
import { View } from "@react-pdf/renderer";
import TableUnit from "./TableUnit";
import TableArticles from "./TableArticles";


export default function Table(props){

  const tables =
    props.data.map((unit, index) => (
      <TableUnit
        key={`${unit.unitId}table`}
        unit={unit}
      />
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
    />
    </View>
  )
}
