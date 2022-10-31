import React from "react";
import { Page, Document, Image, View } from "@react-pdf/renderer";
import TableArticles from "./TableArticles";


export default function Table(props) {
  
  return (
    <View style={props.styleTable}>
      <TableArticles
        innDatas={props.innDatas}
        lasts={props.lasts}
        vindus={props.vindus}
        ovriges={props.ovriges}
        total={props.total}

      />
    </View>
  )
}
