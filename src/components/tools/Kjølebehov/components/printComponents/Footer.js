import React from "react";
import { Image, StyleSheet, Text, View } from "@react-pdf/renderer";



export default function Footer(props){

  const styles = StyleSheet.create({
    footer:{
      fontStyle: 'italic',
    },
    footerLine:{
      flexDirection: 'row',
      width:  '100%',
      position: 'absolute',
      fontSize: 8,
      bottom: 10,
      paddingTop: 10,
      marginLeft: 30,
      marginRight: 30,
      marginBottom: 10,
    },
    rightColumn: {
      flexDirection: 'column',
      textAlign: 'right',
      width: "10%",
    },
    leftColumn: {
      flexDirection: 'column',
      width: "10%",
      textAlign: 'left',
    },
    centerColumn: {
      flexDirection: 'column',
      width: "80%",
      textAlign: 'center',
    }
  })
 let footerText ="Vi tar forbehold om feil i beregninger, modellen kan endres uten varsel. \n Merk også at estimatene er basert på normtall og vil ikke tilsvare faktisk forbruk."
  return(
    <View style={styles.footerLine} fixed>
      <View style={styles.leftColumn} >
      </View>
      <View style={styles.centerColumn} >
        <Text style={styles.footer} >{footerText}</Text>
      </View>
      <View  style={styles.rightColumn}>
        <Text  render={({ pageNumber, totalPages }) => (
          `Side ${pageNumber} / ${totalPages}`
        )} fixed />
      </View>
    </View>
  )
}
