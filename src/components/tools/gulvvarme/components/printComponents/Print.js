import React from 'react';
import { Page, Document, StyleSheet, Text } from '@react-pdf/renderer';
import Table from './Table'
import Header from './Header'
import Footer from './Footer'


export default function Print(props){

  const styles = StyleSheet.create({
    page: {
        fontFamily: 'Helvetica',
        fontSize: 9,
        paddingTop: 20,
        paddingLeft:30,
        paddingRight:30,
        paddingBottom:30,
        lineHeight: 1.5,
        flexDirection: 'column',
    },
    table:{
      marginTop: 0,
    }

}
)

  return(
    <Document>
      <Page size="A4" style={styles.page} wrap>
        <Header
          headline={props.headline}
        />
        <Table
          data={props.data}
          unitInfo={props.unitInfo}
          articleList = {props.articleList}
          dataIndex = {props.dataIndex}
          styleTable={styles.table}
        />
        <Footer />
      </Page>
    </Document>
  )
}
