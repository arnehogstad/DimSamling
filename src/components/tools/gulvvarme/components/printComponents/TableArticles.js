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


  const rows = props.articleList.map((article,index) =>(
    <Fragment key={nanoid()}>
      <View style={styles.tableRow} key={nanoid()}>
        <Text style={styles.descriptionSmall}>{article.artnmbr}</Text>
        <Text style={styles.descriptionLarge}>{article.artname}</Text>
        {props.roundedUnitItems.filter(item => item.artname === article.artname).reduce((prev,curr)=>prev+curr.artcount,0) !== Math.ceil(article.artcount) ?
        <>
          <Text style={styles.descriptionNumber}>
            {props.roundedUnitItems[index].artcount}
          </Text>
          <Text style={styles.descriptionNumber}>
            {article.korrigertAntall}
          </Text>
          <Text style={styles.description}>
            {article.artdim}
          </Text>
        </>
        :
        <>
          <Text style={styles.descriptionNumber}>
            {article.artcount}
          </Text>
          <Text style={styles.descriptionNumber}>
            {article.artcount}
          </Text>
          <Text style={styles.description}>
          </Text>
        </>
        }
      </View>
    </Fragment>
  ))

  return (
    <View wrap={false}>
      <UnitHeadlineArticles unitInfo = {props.unitInfo}/>
      <TableHeaderArticles />
      <View style={styles.tableContainer}>
        {rows}
      </View>
    </View>)
}

function TableHeaderArticles() {
  return(
    <View style={styles.tableContainer}>
      <View style={styles.rowHeader} key={nanoid()}>
        <Text style={styles.descriptionSmall}>Artikkelnr</Text>
        <Text style={styles.descriptionLarge}>Artikkel</Text>
        <Text style={styles.descriptionNumber}>Antall</Text>
        <Text style={styles.descriptionNumber}>Korrigert antall</Text>
        <Text style={styles.descriptionHeader}>Forpakning</Text>
      </View>
    </View>
  )
}

function UnitHeadlineArticles(props) {

  let pipeLength = Math.ceil(props.unitInfo.unititems.filter(item => item.artnmbr < 200).reduce((prev,curr)=>prev+curr.artcount,0))
  let area = props.unitInfo.unitarea
  let circuits = props.unitInfo.unitcircuits
  let rooms = props.unitInfo.unitzones
  let unitId = props.unitInfo.unitid


  return (
    <View style={styles.tableHeadline}>
      <View style={styles.row}>
        <Text style={styles.unitName}>
          Materialliste for {props.unitInfo.unitname}
        </Text>
      </View>
      <View style={styles.row}>
        {unitId === 'Prosjekt' ?
        <Text style={styles.unitDescription}>
            Totalt {area} m&#xB2;, {circuits} kurser, {rooms} rom, {pipeLength} meter rør
        </Text>
        :
        <Text style={styles.unitDescription}>
            Totalt {pipeLength} meter rør
        </Text>
        }
      </View>
    </View>
  )
}
