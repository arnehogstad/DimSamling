import React from 'react';
import { Page, Document, StyleSheet } from '@react-pdf/renderer';
import Table from './Table'
import logo from "../../../../../images/abkqvillerlogo.jpg"

export default function Print(props){

  const styles = StyleSheet.create({
    page: {
        fontFamily: 'Helvetica',
        fontSize: 11,
        paddingTop: 30,
        paddingLeft:60,
        paddingRight:60,
        lineHeight: 1.5,
        flexDirection: 'column',
    },
  });

  return(
    <Document>
      <Page size="A4" style={styles.page}>
        <Table
          data={props.data}
          logo={logo}
        />
      </Page>
    </Document>
  )
}
