import React from "react";
import { Image, StyleSheet, Text, View } from "@react-pdf/renderer";



export default function Footer(props){

  const styles = StyleSheet.create({
    footer:{
      textAlign: 'right',
      marginBottom: 10,
    },
    footerLine:{
      flexDirection: 'row',
      width:  '100%',
      position: 'absolute',
      fontSize: 8,
      bottom: 10,
      marginLeft: 30,
      marginRight: 30,
    },
    rightColumn: {
      flexDirection: 'column',
      paddingTop: 10,
      paddingRight: 0,
      marginLeft: 'auto',
      marginRight: 0,
      right: 0,
      textAlign: 'center',
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
