import React from "react";
import { Page, Document, Image, View } from "@react-pdf/renderer";
import ItemsTable from "./ItemsTable";


export default function Table(props){





  return(
    <View style={props.styleTable}>
        <ItemsTable
          data={props.data}
          dataIndex={props.dataIndex} 
        />
    </View>
  )
}
