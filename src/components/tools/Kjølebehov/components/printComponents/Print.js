import React from 'react';
import { Page, Document, StyleSheet, Image, Text } from '@react-pdf/renderer';
import Table from './Table'
import Header from './Header'
import Footer from './Footer'
import logo from "../../../../../images/abkqvillerlogo.jpg"

export default function Print(props) {

  const styles = StyleSheet.create({
    page: {
      fontFamily: 'Helvetica',
      fontSize: 8,
      paddingTop: 20,
      paddingLeft: 30,
      paddingRight: 30,
      paddingBottom: 20,
      lineHeight: 1.5,
      flexDirection: 'column',
    },
    table: {
      marginTop: 15,
    }
  }
  )

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Header />

        <Table
          innDatas={props.innDatas}
          lasts={props.lasts}
          vindus={props.vindus}
          ovriges={props.ovriges}
          styleTable={styles.table}
        />



     
        <Footer />
      </Page>
    </Document>
  )
}
