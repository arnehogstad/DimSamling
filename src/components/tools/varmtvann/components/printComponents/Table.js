import React from "react";
import {  View } from "@react-pdf/renderer";
import TableArticles from "./TableArticles";


export default function Table(props) {
  
  return (
    <View style={props.styleTable}>
    
    <TableArticles   prosjektData={props.prosjektData} systemValg={props.systemValg} løsningResultat={props.løsningResultat} />
    </View>
  )
}
