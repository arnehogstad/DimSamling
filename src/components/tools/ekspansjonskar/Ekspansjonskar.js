import React from 'react'
import InndataVarme from './components/InndataVarme'
import InndataTappevann from './components/InndataTappevann'
import Beregning from './components/Beregning'
import Produkter from './components/Produkter'
import mockDatabase from "./components/mockDatabase.js"
import { useSelector } from 'react-redux'
//CSS-files importeres her for å holde prosjektoppsummeringen ryddigere
import "../../../styles/ekspansjonskar/ekspansjonskar.css";

export default function Ekspansjonskar(props){
  //redux bestemmer om vi skal vise app eller ikke
  const showTool = useSelector((state) => state.tool.visibleId)
  //state for om det beregnes for tappevann eller for varme
  const [beregningsType, setBeregningsType] = React.useState("Varme")
  //state over inndata for ekspansjonskar varmeanlegg
  const [dataVarme, setDataVarme] = React.useState({
    ladetrykk: 1.5,
    sikkerhetsventil:3.5,
    vannvolum: 0,
    turtemp: 45,
    returtemp: 30,
    fluid: "Vann",
  })

  //state over inndata for ekspansjonskar varmeanlegg
  const [dataTappevann, setDataTappevann] = React.useState({
    ladetrykk: 5.5,
    nettvann: 6,
    sikkerhetsventil:9,
    vannvolum: 0,
    temperatur: 65,
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
    setDataVarme(oldData => (
        {...dataVarme,
        [name]:name === "fluid" ? value : parseFloat(value)
      }
    ))
  }

  //endrer beregnet ekspansjon
  function updateExpansion(){
    let tempObj=calcExpansionVarme()
    setExpansion(tempObj)
  }



  //mock database for testing calulation etc
  const EkspansjonsData = mockDatabase.Ekspansjonsdata
  const Ekspansjonskar = mockDatabase.Ekspansjonskar

  //elements for dropdown lists -> fluidtype
  const fluidListe = []

  for (const key in EkspansjonsData){
    if (key !== "Temperatur"){
      fluidListe.push(<option key={key} value={key}>{key}</option>)
    }
  }

  function calcExpansionVarme(){
    //beregner gj.sn temp
    let meanTemp = (dataVarme.turtemp + dataVarme.returtemp)/2
    //beregner sikkerhetsmargin, største verdi av 5% av volum og 3 liter
    let safetyMargin = Math.max(0.005*dataVarme.vannvolum,3)
    //henter makstemperatur for valgte fluid
    let tempMaxTempForFluid = EkspansjonsData.Temperatur[(EkspansjonsData[dataVarme.fluid].length-1)]
    //runder temp opp og ned for å få 2 punkter for interpoliering
    let meanTempHigh = Math.ceil(meanTemp/5)*5
    let meanTempLow = Math.floor(meanTemp/5)*5
    //henter relevant ekspansjonsmatrise basert på fluid
    let tempFluidArr = EkspansjonsData[dataVarme.fluid]
    //finner matriseposisjonene
    let highIndex =  EkspansjonsData.Temperatur.findIndex((temp) => temp >= meanTempHigh)
    let lowIndex =  EkspansjonsData.Temperatur.findIndex((temp) => temp >= meanTempLow)
    //beregner stor og liten ekspansjon
    let tempExpHigh = Math.ceil(dataVarme.vannvolum*tempFluidArr[highIndex])
    let tempExpLow = Math.ceil(dataVarme.vannvolum*tempFluidArr[lowIndex])
    //interpolerer for å finne faktisk ekspansjon
    let tempExp = 0
    if (meanTempLow === meanTempHigh){
      tempExp = tempExpHigh
    }else{
      tempExp = (meanTemp-meanTempLow)/(meanTempHigh-meanTempLow)*(tempExpHigh-tempExpLow)+(tempExpLow)
    }
    //results for the object
    let expansion = dataVarme.vannvolum === 0 ? 0 : Math.round((tempExp + safetyMargin)*10)/10
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
    let staticP = parseFloat(dataVarme.ladetrykk+staticSafetyMargin)
    //blåsetrykk
    let valveSafetyMargin = 0.5
    let safetyValveP = parseFloat(dataVarme.sikkerhetsventil-valveSafetyMargin)
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
  },[dataVarme])

  return(
    <div className= {props.toolId === showTool ? "toolArea" : "hiddenTool"}>
      <div className="dataArea">
        <div className="toolInfo">
          Finn passende ekspansjonskar ved å legge inn anleggsinformasjon<br></br>
          Merk at det er bladibladi
        </div>
        <div className="ekspansjonskar-inndatalinje">
          <div className="ekspansjonskar-inndataTittel">
            Type ekspansjonskar
          </div>
          <div className="ekspansjonskar-inndataVerdi">
            <select
              name="sikkerhetsventil"
              className="ekspansjonskar-select"
              value={beregningsType}
              onChange={(event) => setBeregningsType(event.target.value)}
              >
              <option key="varme" value="varme">Varme-/kjøleanlegg</option>
              <option key="tappevan" value="tappevan">Tappevan</option>
            </select>
          </div>
        </div>
        <>
        {beregningsType === "varme" ?
          <InndataVarme
            data={dataVarme}
            updateData={updateData}
            fluidListe={fluidListe}
          />
          :
          <InndataTappevann
            data={dataVarme}
            updateData={updateData}
            fluidListe={fluidListe}
          />
        }
        </>
        <Beregning
          expansion={expansion}
        />
        <Produkter
          data={dataVarme}
          showResult = {showResult}
          setShowResult = {setShowResult}
        />
      </div>
  </div>
)

}
