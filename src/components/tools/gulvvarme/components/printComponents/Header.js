import React from "react";
import { Page, Document, Image, Text, View } from "@react-pdf/renderer";
import logo from "../../../../../images/abkqvillerlogo.jpg"

export default function Header(props){

  return(
    <View style={props.styleHeaderLine} fixed>
    <Text render={({ pageNumber, totalPages }) => (
      `Side ${pageNumber} / ${totalPages}`
    )} fixed />
      <View style={props.styleLeft} >
        <Text style={props.styleHeader} >{props.headline}</Text>
      </View>
      <Image style={props.styleLogo} src={logo} />
    </View>
  )
}
