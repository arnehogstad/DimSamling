import React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";
import { nanoid } from "@reduxjs/toolkit";
import * as staticData from "../StaticData/VVStaticData"

export function InnDataOversikt({ styles, prosjektData }) {
    let innDataOversikt = []
    let prosjektDataObj = []



let antallBeskrivelse = staticData.byggTypeVVInnDataType[prosjektData.ByggType].navn //The type of antall that is used in the table

  
        prosjektDataObj = [
            ["Prosjekt Navn","", prosjektData.Navn],
            ["ABK Referanse", "",prosjektData.Referanse],
            ["Bygg Type","", prosjektData.ByggType],
            [antallBeskrivelse, "",prosjektData.antall],
            ["Net vann temperatur ", "[\u00B0C]",prosjektData.netVannTemp],
            ["Tappevann temperatur ","[\u00B0C]", prosjektData.tappeVannTemp],
            ["Varmtvann per person per dag","[L]",  prosjektData.perPersonVV],
            ["Varmepumpe effekt ","[kW]", prosjektData.vpEffekt],
            ["Varmepumpe set punkt ","[\u00B0C]", prosjektData.settpunktVP],
            ["Spiss bereder set punkt ", "[\u00B0C]",prosjektData.spissSettpunkt],
          
        ]

 
    


    for (const element of prosjektDataObj) {
        innDataOversikt.push(
            <View key={nanoid()} wrap={false}>
              
                    <View key={nanoid()} style={styles.tableRow} >
                        <Text key={nanoid()} style={styles.descriptionLarge}> {element[0]}</Text>
                        <Text key={nanoid()} style={styles.descriptionLarge}>{element[2]}</Text>
                        <Text key={nanoid()} style={styles.descriptionLarge}>{element[1]}</Text>
                </View>
            </View>
        )
    }


    return innDataOversikt
}


export function SystemløsningPrint({ styles, valgtdata }) {

    let systemløsningPrint = []

    const systemløsningPrintObj = [
        ["Varmepumpe Effekt " ,valgtdata.vpEffekt,"[kW]"],
        ["El-kolbe i forvarming effekt ",valgtdata.forvarmingELeffekt,"[kW]"],
        ["El-kolbe i spissbereder effekt ",valgtdata.spissElEffekt,"[kW]"],
        ["Back Up Type",valgtdata.backupType,""],
    ]

    for (const element of systemløsningPrintObj) {
        systemløsningPrint.push(
            <View key={nanoid()} wrap={false}>
              
                    <View key={nanoid()} style={styles.tableRow} >
                        <Text key={nanoid()} style={styles.descriptionLarge}> {element[0]}</Text>
                        <Text key={nanoid()} style={styles.descriptionLarge}>{element[1]}</Text>
                        <Text key={nanoid()} style={styles.descriptionLarge}>{element[2]}</Text>
                </View>
            </View>
        )
    }
    
    return systemløsningPrint
}


export function EkonomiskBeregning({ styles, løsningResultat, prosjektData }) {

    let ekonomiskDataOver = []

    const ekonomiskData = [
        ["Gjennomsnittig strøm pris", "[Øre/kWh]" ,prosjektData.strømpris],
        ["Seasonal Coefficient of Performance","[-]",prosjektData.SCOP],
        ["Årlig energibehov","[kWh]",løsningResultat["Total energi forbruk"]],
        ["Årlig strøm forbruk av varmepumpe","[kWh]",løsningResultat["Total varmepumpe energi forbruk"]],
        ["Årlig strømforbruk reduksjon ","[%]",løsningResultat["Energi spart i prosent"]],
        ["Årlig energi besparelse ","[kWh]",løsningResultat["Energi spart"]],
        ["Årlig sparing ved bruk av varmepumpe","[NOK]",løsningResultat["Spart kroner"]]
    ]
 
    for (const element of ekonomiskData) {
        ekonomiskDataOver.push(
            <View key={nanoid()} wrap={false}>
              
                    <View key={nanoid()} style={styles.tableRow} >
                        <Text key={nanoid()} style={styles.descriptionLarge}> {element[0]}</Text>
                        <Text key={nanoid()} style={styles.descriptionLarge}>{element[2]}</Text>
                        <Text key={nanoid()} style={styles.descriptionLarge}>{element[1]}</Text>
                </View>
            </View>
        )
    }
    return ekonomiskDataOver
}

