import React from 'react';
import ReactDOM from 'react-dom';
import { Document, Page, Text, View, StyleSheet,Image    } from '@react-pdf/renderer';
import abkqvillerlogo from "../../../../images/abkqvillerlogo.jpg"

export default function PrintOversikt(props) {
 
// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  section: {
    margin: 10,
    padding: 10,
    
  },
  abklogo: {
    position: 'absolute',
    width: 80,
    height: 45,
    marginLeft: 10,
    marginTop: 10,
    right: 0,
},
});

let ovriges= props.ovrige.map((item) => {
  <tr className="tbro">
  <td  className="tbel">{item[0]}</td>
  <td  className="tbel">{item[1]}</td>
</tr>
})  

return (
// Create Document Component

  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>Section #1</Text>
        <Image src={abkqvillerlogo} style={styles.abklogo} />
       <table>
        {ovriges}
        </table>
      </View>
     

    </Page>
  </Document>
);

}