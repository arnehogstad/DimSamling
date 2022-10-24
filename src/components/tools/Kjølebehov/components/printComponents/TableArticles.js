import React, { Fragment } from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";
import { nanoid } from 'nanoid'
import {OvrigeOversikt ,LastsOversikt,VinduOversikt,InnDataOversikt, HeaderType} from './GenerateTableRow'

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
    marginTop: 20,
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
    marginTop: 10,
    letterSpacing: 1,

  },
  results: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 15,
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
     <InnDataOversikt styles={styles} innDatas={props.innDatas} />

     <View key={nanoid()} style={styles.tableContainer}>
     <View><Text style={styles.unitName}>Transmisjon, luft og interne laster[W]: </Text> </View>
     <HeaderType styles={styles} headerType="lasts"/>
     <LastsOversikt styles={styles} lasts={props.lasts}/>
     </View>

     {props.vindus.length  ? (
        <Fragment>
          <View key={nanoid()} style={styles.tableContainer}>
          <View><Text style={styles.unitName}>Last fra vinduer: </Text> </View>
     <HeaderType styles={styles} headerType="vindu"/>
     <VinduOversikt styles={styles} vindus={props.vindus}/>
     </View>
     <View><Text style={styles.unitName}>Total last fra vinuder er {props.total.vindu} W. </Text> </View>
        
      </Fragment> 
      ) : null} 

    {props.ovriges.length  ? (
      <Fragment>
         <View key={nanoid()} style={styles.tableContainer}>
         <View><Text style={styles.unitName}>Øvrige definerte laster: </Text> </View>
      <HeaderType  styles={styles} headerType="ovrige"/>
     <OvrigeOversikt  styles={styles} ovriges={props.ovriges}/>
     </View>
        <View><Text style={styles.unitName}>Total øvrige last er {props.total.ovrige} W. </Text> </View>
         </Fragment>) 
  :null }
      <View><Text style={styles.results}>Total kjølebehov er {props.total.internt } W. </Text> </View>
        
       </View>
  )
}

