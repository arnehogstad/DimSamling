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
    ekspansjon: 0
  })
  //state of Result
  const [showResult,setShowResult] = React.useState(false)
  //endrer inndata
  function updateData(event){
    const {name, value} = event.target
    setData(oldData => (
        {...data,
        [name]:name === "fluid" ? value : parseFloat(value),
        ekspansjon: data.ekspansjon+10
      }
    ))
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
    let tempExpHigh = Math.round(data.vannvolum*tempFluidArr[highIndex])
    let tempExpLow = Math.round(data.vannvolum*tempFluidArr[lowIndex])


    console.log(highIndex);
    console.log(lowIndex);
    console.log(tempFluidArr[highIndex]);
    console.log(tempFluidArr[lowIndex]);
    console.log(tempExpHigh);
    console.log(tempExpLow);

    //console.log(tempExpHigh);
  }

  React.useEffect(()=>{
    calcExpansion()
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
          data={data}
          setData={setData}

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
