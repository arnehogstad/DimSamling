import React from "react";
import { Page, Document, Image, StyleSheet } from "@react-pdf/renderer";
import ItemsTable from "./ItemsTable";

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
    logo: {
        height: 66,
        marginLeft: 'auto',
        marginRight: 'auto'
    }
  });


export default function Table(props){

  return(
    <>
        <Image style={styles.logo} src={props.logo} />
        <ItemsTable data={props.data} />
    </>
  )
}
