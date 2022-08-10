import React from 'react'
import Inndata from './components/Inndata'
import Beregning from './components/Beregning'
import Produkter from './components/Produkter'
import mockDatabase from "./components/mockDatabase.js"
import { useSelector } from 'react-redux'
//CSS-files importeres her for å holde prosjektoppsummeringen ryddigere
import "../../../styles/ekspansjonskar/ekspansjonskar.css";

export default function Ekspansjonskar(props){
  //redux bestemmer om vi skal vise app eller ikke
  const showTool = useSelector((state) => state.tool.visibleId)
  //state over inndata
  const [data, setData] = React.useState({
    ladetrykk: 1.5,
    sikkerhetsventil:3.5,
    vannvolum: 0,
    turtemp: 45,
    returtemp: 30,
    fluid: "Vann",
  })
  const [expansion, setExpansion] = React.useState({
    ekspansjon: 0,
    nytteeffekt: 0,
    minimumVolum: 0
  })

  //state of Result
  const [showResult,setShowResult] = React.useState(false)
  //endrer inndata
  function updateData(event){
    const {name, value} = event.target
    setData(oldData => (
        {...data,
        [name]:name === "fluid" ? value : parseFloat(value)
      }
    ))
  }

  //endrer beregnet ekspansjon
  function updateExpansion(){
    let tempObj=calcExpansion()
    console.log(tempObj);
    setExpansion(tempObj)
  }



  //mock database for testing calulation etc
  const dataBase = mockDatabase.Ekspansjonsdata
  //elements for dropdown lists -> fluidtype
  const fluidListe = []
  fluidListe.push(<option key="" value=""></option>)
  for (const key in dataBase){
    if (key !== "Temperatur"){
      fluidListe.push(<option key={key} value={key}>{key}</option>)
    }
  }

  function calcExpansion(){
    //beregner gj.sn temp
    let meanTemp = (data.turtemp + data.returtemp)/2
    //beregner sikkerhetsmargin, største verdi av 5% av volum og 3 liter
    let safetyMargin = Math.max(0.005*data.vannvolum,3)
    //henter makstemperatur for valgte fluid
    let tempMaxTempForFluid = dataBase.Temperatur[(dataBase[data.fluid].length-1)]
    //runder temp opp og ned for å få 2 punkter for interpoliering
    let meanTempHigh = Math.ceil(meanTemp/5)*5
    let meanTempLow = Math.floor(meanTemp/5)*5
    //henter relevant ekspansjonsmatrise basert på fluid
    let tempFluidArr = dataBase[data.fluid]
    //finner matriseposisjonene
    let highIndex =  dataBase.Temperatur.findIndex((temp) => temp >= meanTempHigh)
    let lowIndex =  dataBase.Temperatur.findIndex((temp) => temp >= meanTempLow)
    //beregner stor og liten ekspansjon
    let tempExpHigh = Math.ceil(data.vannvolum*tempFluidArr[highIndex])
    let tempExpLow = Math.ceil(data.vannvolum*tempFluidArr[lowIndex])
    //interpolerer for å finne faktisk ekspansjon
    let tempExp = 0
    if (meanTempLow === meanTempHigh){
      tempExp = tempExpHigh
    }else{
      tempExp = (meanTemp-meanTempLow)/(meanTempHigh-meanTempLow)*(tempExpHigh-tempExpLow)+(tempExpLow)
    }
    //results for the object
    let expansion = data.vannvolum === 0 ? 0 : Math.round((tempExp + safetyMargin)*10)/10
    let usablePercentage = calcUsablePercentage()
    let minVolum = Math.ceil(expansion/usablePercentage)

    let returnObj = {
      ekspansjon: expansion,
      nytteeffekt: usablePercentage,
      minimumVolum: minVolum
    }

    return returnObj
  }

  function calcUsablePercentage(){
    //statisk trykk
    let staticSafetyMargin = 0.2
    let staticP = parseFloat(data.ladetrykk+staticSafetyMargin)
    //blåsetrykk
    let valveSafetyMargin = 0.5
    let safetyValveP = parseFloat(data.sikkerhetsventil-valveSafetyMargin)
    //atmosfæreisk trykk
    let atmosP = 1
    //ekspansjonskarets nytteeffekt
    let usablePercentage = (Math.ceil(((safetyValveP+atmosP-(staticP+atmosP))/(safetyValveP+atmosP))*100)/100)
    return usablePercentage
  }

  React.useEffect(()=>{
    updateExpansion()
    if(showResult === true){
      setShowResult(false)
    }
  },[data])

  return(
    <div className= {props.toolId === showTool ? "toolArea" : "hiddenTool"}>
      <div className="dataArea">
        <div className="toolInfo">
          Test av render EkspansjonsKar ved bruk av redux
        </div>
        <Inndata
          data={data}
          updateData={updateData}
          fluidListe={fluidListe}
        />
        <Beregning
          expansion={expansion}
        />
        <Produkter
          data={data}
          showResult = {showResult}
          setShowResult = {setShowResult}
        />
      </div>
  </div>
)

}
