import React, { Fragment } from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";
import { nanoid } from 'nanoid'

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "left",
    width: "100%",
  },
  tableRow: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    borderBottomColor: 'rgb(200,200,200)',
    borderBottomWidth: 0.5,
    paddingTop: 2,
  },
  rowSummation: {
    flexDirection: "row",
    alignItems: "left",
    borderTopColor: 'black',
    borderTopWidth: 0.5,
    borderBottomColor: 'black',
    borderBottomWidth: 0.5,
    width: "100%",

  },
  rowHeader: {
    flexDirection: "row",
    alignItems: "left",
    borderColor: 'black',
    borderWidth: 0,
    backgroundColor: 'black',
    color: 'white',
    width: "100%",
    paddingTop: 3,
  },
  description: {
    width: "15%",
    textAlign: 'right',
  },
  descriptionHeader: {
    width: "15%",
    textAlign: 'center',
  },
  descriptionSmall: {
    width: "12%",
    paddingLeft: 10,
  },
  descriptionSmallNumber: {
    textAlign: "right",
    width: "10%",
  },
  descriptionLarge: {
    width: "53%",

  },
  descriptionNumber: {
    textAlign: "center",
    width: "10%",
  },
  tableContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 2,
    marginLeft: 10,
    marginRight: 5,
  },
  tableHeadline: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 20,
  },
  unitName: {
    fontSize: 11,
    fontWeight: 'bold',
    letterSpacing: 1,

  },
  unitDescription: {
    paddingLeft: 10,
    letterSpacing: 0.5,
    color: 'rgb(80,80,80)',
  },
});



export default function TableArticles(props){

  return (
    <View wrap={false}>
     <InnDataOversikt innDatas={props.innDatas}/>
    </View>
  )
}


function InnDataOversikt (props){

 
 
  let rows = (
    <View style={styles.tableRow} >
    <Text style={styles.descriptionSmall}>{23}</Text>
    <Text style={styles.descriptionLarge}>{32}</Text>
    </View>
  )
      console.log(rows)
  return (    
    <View wrap={false}>
    <View style={styles.tableContainer}>
    
       </View>
      </View>
)}
