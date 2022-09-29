import React from 'react';
import { Page, Document, StyleSheet, Image, Text } from '@react-pdf/renderer';
import Table from './Table'
import Header from './Header'
import logo from "../../../../../images/abkqvillerlogo.jpg"

export default function Print(props){

  const styles = StyleSheet.create({
    page: {
        fontFamily: 'Helvetica',
        fontSize: 11,
        paddingTop: 20,
        paddingLeft:30,
        paddingRight:30,
        paddingBottom:30,
        lineHeight: 1.5,
        flexDirection: 'column',
    },
    header:{
      fontSize: 20,
      textAlign: 'left',
      marginBottom: 10,
    },
    headerLine:{
      flexDirection: 'row',
    },
    logo: {
      height: 80,
      top:0,
      right:0,
    },
    leftColumn: {
      flexDirection: 'column',
      paddingTop: 10,
      paddingRight: 15,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    table:{
      marginTop: 15,
    }

}
)

  return(
    <Document>
      <Page size="A4" style={styles.page}>
        <Header
          headline={"Kjølebehov Dimensjonering Verktøy"}
          styleHeader={styles.header}
          styleHeaderLine={styles.headerLine}
          styleLogo ={styles.logo}
          styleLeft={styles.leftColumn}
        />
        
        <Table
          data={props.ovrige}
          styleTable={styles.table}
           />

        
        
        <Table
          data={props.ovrige}
          styleTable={styles.table}
        />



      </Page>
    </Document>
  )
}
