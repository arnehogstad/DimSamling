import React, { Fragment } from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";
import { nanoid } from 'nanoid'

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "left",
    width: "100%",
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
  },
  description: {
    width: "15%",
  },
  descriptionSmall: {
    width: "10%",
    paddingLeft: 10,
  },
  descriptionSmallNumber: {
    textAlign: "right",
    width: "10%",
  },
  descriptionLarge: {
    width: "50%",
  },
  descriptionNumber: {
    textAlign: "center",
    width: "15%",
  },
  tableContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 5,
  },
  tableHeadline: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
  },
});

export default function TableArticles(props){


  const rows = props.articleList.map((article,index) =>(
    <Fragment key={nanoid()}>
      <View style={styles.row} key={nanoid()}>
        <Text style={styles.description}>{article.artnmbr}</Text>
        <Text style={styles.descriptionLarge}>{article.artname}</Text>
        <Text style={styles.descriptionNumber}>{article.artcount}</Text>
        <Text style={styles.description}>{article.artdim}</Text>
      </View>
    </Fragment>
  ))

  return (
    <View wrap={false}>
      <UnitHeadlineArticles unitInfo = {props.unitInfo}/>
      <TableHeaderArticles />
      {rows}
    </View>)
}

function TableHeaderArticles() {
  return(
    <View style={styles.tableContainer}>
      <View style={styles.rowHeader} key={nanoid()}>
        <Text style={styles.description}>Artikkelnr</Text>
        <Text style={styles.descriptionLarge}>Artikkel</Text>
        <Text style={styles.descriptionNumber}>Antall</Text>
        <Text style={styles.description}>Benevning</Text>
      </View>
    </View>
  )
}

function UnitHeadlineArticles(props) {

  let pipeLength = props.unitInfo.unititems.filter(item => item.artnmbr < 200).reduce((prev,curr)=>prev+curr.artcount,0)
  console.log(props);
  console.log(pipeLength);

  return (
    <View style={styles.tableHeadline}>
        <Text style={styles.row}>
          Materialliste for {props.unitInfo.unitname}
        </Text>
        {props.unitInfo.unitid === "Prosjekt" ?
        <>
        <View style={styles.row}>
          <Text style={styles.descriptionSmall}>
            Areal
          </Text>
          <Text style={styles.descriptionSmallNumber}>
            {props.unitInfo.unitarea}
          </Text>
          <Text style={styles.descriptionSmall}>
            m2
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.descriptionSmall}>
            Kurser
          </Text>
          <Text style={styles.descriptionSmallNumber}>
            {props.unitInfo.unitcircuits}
          </Text>
          <Text style={styles.descriptionSmall}>
            stk
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.descriptionSmall}>
            Rom
          </Text>
          <Text style={styles.descriptionSmallNumber}>
            {props.unitInfo.unitzones}
          </Text>
          <Text style={styles.descriptionSmall}>
            stk
          </Text>
        </View>
        </>
        :
        null
        }
        <View style={styles.row}>
          <Text style={styles.descriptionSmall}>
            Rørlengde
          </Text>
          <Text style={styles.descriptionSmallNumber}>
            {pipeLength}
          </Text>
          <Text style={styles.descriptionSmall}>
            m
          </Text>
        </View>
      </View>
  )
}
