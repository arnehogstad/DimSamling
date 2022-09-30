import React from "react";
import { Page, Document, Image, Text, View } from "@react-pdf/renderer";
import logo from "../../../../../images/abkqvillerlogo.jpg"

export default function Header(props){

   //get the current date 
   const current = new Date();
   const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;
  


  return(
    <View style={props.styleHeaderLine} fixed>
      <View style={props.styleLeft} >
        <Text style={props.styleHeader} >{props.headline}</Text>
        <Text>{date}</Text>
      </View>
      <Image style={props.styleLogo} src={logo} />
    </View>
  )
}
