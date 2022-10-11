import React from "react";
import { Image, StyleSheet, Text, View } from "@react-pdf/renderer";
import logo from "../../../../../images/abkqvillerlogo.jpg"



export default function Header(props){

  const styles = StyleSheet.create({
    header:{
      fontSize: 15,
      textAlign: 'right',
      marginBottom: 10,
      letterSpacing: 1.5,
    },
    headerLine:{
      flexDirection: 'row',
    },
    logo: {
      height: 40,
      top:0,
      right:0,
    },
    date: {
      marginTop: 10,
      fontSize: 10,
    },
    leftColumn: {
      flexDirection: 'column',
      paddingTop: 10,
      paddingRight: 15,
      marginLeft: 'auto',
      marginRight: 'auto',
    }
  })

  var today = new Date()



  return(
    <View style={styles.headerLine} fixed>
      <Text style = {styles.date} >{today.getDate()}.{today.getMonth()+1}.{today.getFullYear()} </Text>
      <View style={styles.leftColumn} >
        <Text style={styles.header} >{props.headline}</Text>
      </View>
      <Image style={styles.logo} src={logo} />
    </View>
  )
}
