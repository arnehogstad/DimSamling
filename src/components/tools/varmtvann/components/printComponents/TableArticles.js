import React, { Fragment } from "react";
import { Text, View, StyleSheet, Link } from "@react-pdf/renderer";
import { nanoid } from 'nanoid'
import { EkonomiskBeregning, InnDataOversikt, SystemløsningPrint } from './GenerateTableRow'
import { isLeilighetFucntion } from "../../BeregnVV";

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
    margin: 10,
    letterSpacing: 1,

  },
  results: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 15,
    letterSpacing: 1,

  },
  unitDescription: {
    fontSize: 11,
    paddingLeft: 20,
    letterSpacing: 0.5,
    
  },

  resultsDescription: {
    fontSize: 10,
    marginTop: 20,
    letterSpacing: 0.5,
    fontFamily: 'Helvetica-Oblique',
    
  },
});



export default function TableArticles(props) {

  let systemValgNavn = 0

  switch (props.systemValg) {
    case "Spiral": systemValgNavn = "Forvarmingbereder med spissbereder og spiralvarmeveksler"
      break;
    case "Veksler": systemValgNavn = "Plate varmeveksler koblet til forvarmingbereder og spissbereder"
      break;
    case "AquaEfficency": systemValgNavn = "Cetetherm AquaEfficency"
      break;
    default: break;
  }



 let CetethermDIMMethod = null

if (isLeilighetFucntion(props.prosjektData.ByggType)) {
    CetethermDIMMethod= <Text style={styles.resultsDescription}> Beregning er basert på Cetetherm methodik for boligblokker.</Text>
        
}else{
  CetethermDIMMethod= <Text style={styles.resultsDescription}> Beregning metodik for byggtyper utenom boligblokk er estimater og er ikke basert på veiledende verdier fra Cetetherm, da det ikke er gitt.   </Text>
}

console.log(props)


  return (
    <View wrap={false}>

      <InnDataOversikt styles={styles} prosjektData={props.prosjektData} />

      <View><Text style={styles.unitName}> Valgt system løsningen er {systemValgNavn}. </Text> </View>


      {props.systemValg === "Spiral" || props.systemValg === "Veksler" ? (
        <Fragment>

          <View><Text style={styles.unitName}> Anbefalt varmepumpe størelse basert på driftstid er minst {props.løsningResultat["Anbefalt Min Varmepumpe størrelse"]} kW og maks {props.løsningResultat["Anbefalt Maks Varmepumpe størrelse"]} kW.</Text> </View>
          <Text key={nanoid()} style={styles.unitName}>Varmepumpe løsnings detaljer:</Text>
          <SystemløsningPrint styles={styles} valgtdata={props.løsningResultat.valgtdata} />
          <View><Text style={styles.unitName}> Volume for forvarmingbereder er {props.løsningResultat["Minimum forvarming volum"]} liter og for spissbereder er {props.løsningResultat["Minimum Spiss volum"]} liter.</Text> </View>
          <View><Text style={styles.unitName}> Dette tilsvarer til en dekningsgrad av {props.løsningResultat["Dekningsgrad"]} % mens maksimum mulig dekningsgrad er {props.løsningResultat["Maksimal dekningsgrad"]} %</Text> </View>

        </Fragment>
      )
        : null}

      {props.systemValg === "AquaEfficency" ? 
        <Fragment>

          <View>
            <Text style={styles.unitDescription}> Anbefalt system er {props.løsningResultat.unit.ByggType}  </Text>
            <Text style={styles.unitDescription}> Artikkelnummer: {props.løsningResultat.unit.artikkelNumber} </Text>
            <Text style={styles.unitDescription}> Minimum anbefalt akkumulerings tanks volum er {props.løsningResultat.unit.AkVol} liter. </Text>
            <Text style={styles.unitDescription}> Minimum anbefalt effekt av varmepumpe er {props.løsningResultat.unit.Effekt} kW.</Text>
          {CetethermDIMMethod}
          </View>
        </Fragment>
        
        : null}

      

      {isLeilighetFucntion(props.prosjektData.ByggType) &&  props.prosjektData.isEkonomiInkludert === "Ja" ? (
        <Fragment>

          <View><Text style={styles.unitName}> Ekonomisk Beregning: </Text> </View>
          <EkonomiskBeregning styles={styles} løsningResultat={props.løsningResultat} prosjektData={props.prosjektData} />

        </Fragment>
      )
        : null}




    </View>
  )
}

