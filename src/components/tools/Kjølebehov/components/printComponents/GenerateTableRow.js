import React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";
import { nanoid } from "@reduxjs/toolkit";


export function InnDataOversikt({ styles, innDatas }) {
    let innDataOver = []
    let innDatasObj = []
    if (innDatas.ByggType === "Småhus") {
        innDatasObj = [
            ["Prosjekt Navn", innDatas.Navn],
            ["ABK Referanse", innDatas.Referanse],
            ["Bygg Type", innDatas.ByggType],
            ["Bygge år", innDatas.Byggeår],
            ["Arealet [m2]", innDatas.bra],
            ["Tak høyde", innDatas.takhøyde],
            ["Tak mot loft", innDatas.takmotloft],
            ["Tak temperatur", innDatas.taktemp],
            ["Ventilasjon Type", innDatas.ventilasjonType],
            ["Sikkerhets margin [%]", innDatas.SikkerhetsMargin],
        ]
    } else {
        innDatasObj = [
            ["Prosjekt Navn", innDatas.Navn],
            ["ABK Referanse", innDatas.Referanse],
            ["Bygg Type", innDatas.ByggType],
            ["Bygge år", innDatas.Byggeår],
            ["Arealet [m2]", innDatas.bra],
            ["Ventilasjon Type", innDatas.ventilasjonType],
            ["Sikkerhets margin [%]", innDatas.SikkerhetsMargin],
        ]
    }


    for (const element of innDatasObj) {
        innDataOver.push(
            <View key={nanoid()} wrap={false}>
              
                    <View key={nanoid()} style={styles.tableRow} >
                        <Text key={nanoid()} style={styles.descriptionLarge}> {element[0]}</Text>
                        <Text key={nanoid()} style={styles.descriptionLarge}>{element[1]}</Text>
                  
                </View>
            </View>
        )
    }


    return innDataOver
}


export function HeaderType({ styles, headerType }) {

    let header = []
    if (headerType === "vindu") {
        header = (
            <View key={nanoid()} wrap={false}>
                
                    <View key={nanoid()} style={styles.rowHeader} >
                        <Text key={nanoid()} style={styles.descriptionLarge}> Vindu Arealet [m&#xB2;]</Text>
                        <Text key={nanoid()} style={styles.descriptionLarge}>Avskjerming type</Text>
                        <Text key={nanoid()} style={styles.descriptionLarge}>Himmel rettning</Text>
                        <Text key={nanoid()} style={styles.descriptionLarge}>Stråling last [W]</Text>
                        <Text key={nanoid()} style={styles.descriptionLarge}>Transmisjon last [W]</Text>
                    
                </View>
            </View>)
    } else if (headerType === "lasts") {
        header = (
            <View key={nanoid()} wrap={false}>
                
                    <View key={nanoid()} style={styles.rowHeader} >
                        <Text key={nanoid()} style={styles.descriptionLarge}>Infiltasjon</Text>
                        <Text key={nanoid()} style={styles.descriptionLarge}>Ventilasjon</Text>
                        <Text key={nanoid()} style={styles.descriptionLarge}>Vegg</Text>
                        <Text key={nanoid()} style={styles.descriptionLarge}>Tak</Text>
                        <Text key={nanoid()} style={styles.descriptionLarge}>Loft</Text>
                        <Text key={nanoid()} style={styles.descriptionLarge}>Gulv</Text>
                        <Text key={nanoid()} style={styles.descriptionLarge}>Utstyr</Text>
                        <Text key={nanoid()} style={styles.descriptionLarge}>Personer</Text>
                        <Text key={nanoid()} style={styles.descriptionLarge}>Belysning</Text>
                    </View>
               
            </View>)
    } else if (headerType === "ovrige") {
        header = (
            <View key={nanoid()} wrap={false}>
              
                    <View key={nanoid()} style={styles.rowHeader} >
                        <Text key={nanoid()} style={styles.descriptionLarge}>Navn</Text>
                        <Text key={nanoid()} style={styles.descriptionLarge}>Effekt [W]</Text>
                    
                </View>
            </View>)
    }
    return header
}


export function VinduOversikt({ styles, vindus }) {

    let vinduOver = []

    for (const element of vindus) {
        vinduOver.push(
            <View key={nanoid()} wrap={false}>
                
                    <View key={nanoid()} style={styles.tableRow} >
                        <Text key={nanoid()} style={styles.descriptionLarge}> {element[0]}</Text>
                        <Text key={nanoid()} style={styles.descriptionLarge}>{element[1]}</Text>
                        <Text key={nanoid()} style={styles.descriptionLarge}>{element[2]}</Text>
                        <Text key={nanoid()} style={styles.descriptionLarge}>{element[3]}</Text>
                        <Text key={nanoid()} style={styles.descriptionLarge}>{element[4]}</Text>
                   
                </View>
            </View>
        )
    }
    return vinduOver
}

export function LastsOversikt({ styles, lasts }) {

    let lastOver = [
        <View key={nanoid()} wrap={false}>
            
                <View key={nanoid()} style={styles.tableRow} >
                    <Text key={nanoid()} style={styles.descriptionLarge}>{lasts[0]}</Text>
                    <Text key={nanoid()} style={styles.descriptionLarge}>{lasts[1]}</Text>
                    <Text key={nanoid()} style={styles.descriptionLarge}>{lasts[2]}</Text>
                    <Text key={nanoid()} style={styles.descriptionLarge}>{lasts[3]}</Text>
                    <Text key={nanoid()} style={styles.descriptionLarge}>{lasts[4]}</Text>
                    <Text key={nanoid()} style={styles.descriptionLarge}>{lasts[5]}</Text>
                    <Text key={nanoid()} style={styles.descriptionLarge}>{lasts[6]}</Text>
                    <Text key={nanoid()} style={styles.descriptionLarge}>{lasts[7]}</Text>
                    <Text key={nanoid()} style={styles.descriptionLarge}>{lasts[8]}</Text>
                </View>
         
        </View>
    ]

    return lastOver
}


export function OvrigeOversikt({ styles, ovriges }) {

    let OvrigeOver = []

    for (const element of ovriges) {
        OvrigeOver.push(
            <View key={nanoid()} wrap={false}>
             
                    <View key={nanoid()} style={styles.tableRow} >
                        <Text key={nanoid()} style={styles.descriptionLarge}>{element[0]}</Text>
                        <Text key={nanoid()} style={styles.descriptionLarge}>{element[1]}</Text>
                    
                </View>
                
            </View>
        )
    }
    return OvrigeOver
}