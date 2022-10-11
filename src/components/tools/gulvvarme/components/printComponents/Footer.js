import React from "react";
import { Image, StyleSheet, Text, View } from "@react-pdf/renderer";



export default function Footer(props){

  const styles = StyleSheet.create({
    footer:{
      fontSize: 15,
      textAlign: 'right',
      marginBottom: 10,
    },
    footerLine:{
      flexDirection: 'row',
      width:  '100%',
      position: 'absolute',
      fontSize: 10,
      bottom: 30,
    },
    rightColumn: {
      flexDirection: 'column',
      paddingTop: 10,
      paddingRight: 0,
      marginLeft: 'auto',
      marginRight: 0,
      right: 0,
      textAlign: 'right',
    }
  })

  return(
    <View style={styles.footerLine} fixed>
      <View  style={styles.rightColumn}>
        <Text  render={({ pageNumber, totalPages }) => (
          `Side ${pageNumber} / ${totalPages}`
        )} fixed />
      </View>
    </View>
  )
}
