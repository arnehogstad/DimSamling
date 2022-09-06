import React from 'react'
import InndataVarme from './components/InndataVarme'
import InndataTappevann from './components/InndataTappevann'
import Beregning from './components/Beregning'
import Produkter from './components/Produkter'
import Banner from '../../../components/static/Banner'
import mockDatabase from "./components/mockDatabase.js"
import { useSelector } from 'react-redux'
//CSS-files importeres her for å holde prosjektoppsummeringen ryddigere
import "../../../styles/ekspansjonskar/ekspansjonskar.css";

export default function Ekspansjonskar(props){
  //redux bestemmer om vi skal vise app eller ikke
  const showTool = useSelector((state) => state.tool.visibleId)
  //state for om det beregnes for tappevann eller for varme
  const [beregningsType, setBeregningsType] = React.useState("varme")
  //state over inndata for ekspansjonskar varmeanlegg
  const [dataVarme, setDataVarme] = React.useState({
    ladetrykk: 0.5,
    sikkerhetsventil:2.5,
    vannvolum: 0,
    turtemp: 42,
    returtemp: 35,
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
    minimumVolum: 0,
    arbeidsTrykk: 0,
    arbeidsTemp: 0,
    sikkerhetsTrykk:0
  })

  //state of Result
  const [showResult,setShowResult] = React.useState(false)
  //endrer inndata
  function updateDataVarme(event){
    const {name, value} = event.target
    setDataVarme(oldData => (
        {...dataVarme,
        [name]:name === "fluid" ? value : parseFloat(value)
      }
    ))
  }
  //endrer inndata tappevann
  function updateDataTappevann(event){
    const {name, value} = event.target
    setDataTappevann(oldData => (
        {...dataTappevann,
        [name]: parseFloat(value),
        ladetrykk: name === "nettvann" ? parseFloat(value)-0.5 : oldData.ladetrykk
      }
    ))
  }

  //endrer beregnet ekspansjon
  function updateExpansionVarme(){
    let tempObj=calcExpansionVarme()
    setExpansion(tempObj)
  }

  //endrer beregnet ekspansjon
  function updateExpansionTappevann(){
    let tempObj=calcExpansionTappevann()
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

  //beregner utvidelse for varme
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
    let tempExpHigh = Math.ceil(dataVarme.vannvolum*tempFluidArr[highIndex]*10)/10
    let tempExpLow = Math.ceil(dataVarme.vannvolum*tempFluidArr[lowIndex]*10)/10
    //interpolerer for å finne faktisk ekspansjon
    let tempExp = 0
    if (meanTempLow === meanTempHigh){
      tempExp = tempExpHigh
    }else{
      tempExp = (meanTemp-meanTempLow)/(meanTempHigh-meanTempLow)*(tempExpHigh-tempExpLow)+(tempExpLow)
    }
    //results for the object
    let expansion = dataVarme.vannvolum === 0 ? 0 : Math.round((tempExp + safetyMargin)*10)/10
    let usablePercentage = calcUsablePercentageVarme()
    let minVolum = Math.ceil(expansion/usablePercentage)

    let returnObj = {
      ekspansjon: expansion,
      nytteeffekt: usablePercentage,
      minimumVolum: minVolum,
      arbeidsTrykk: dataVarme.ladetrykk,
      arbeidsTemp: dataVarme.returtemp,
      sikkerhetsTrykk:dataVarme.sikkerhetsventil
    }

    return returnObj
  }

  //beregner utvidelse for varme
  function calcExpansionTappevann(){
    //henter makstemperatur for valgte fluid
    let tempMaxTempForFluid = 90
    //runder temp opp og ned for å få 2 punkter for interpoliering
    let meanTempHigh = Math.ceil(dataTappevann.temperatur/5)*5
    let meanTempLow = Math.floor(dataTappevann.temperatur/5)*5
    //henter relevant ekspansjonsmatrise basert på fluid
    let tempFluidArr = EkspansjonsData['Vann']
    //finner matriseposisjonene
    let highIndex =  EkspansjonsData.Temperatur.findIndex((temp) => temp >= meanTempHigh)
    let lowIndex =  EkspansjonsData.Temperatur.findIndex((temp) => temp >= meanTempLow)
    //beregner stor og liten ekspansjon
    let tempExpHigh = Math.ceil(dataTappevann.vannvolum*tempFluidArr[highIndex]*10)/10
    let tempExpLow = Math.ceil(dataTappevann.vannvolum*tempFluidArr[lowIndex]*10)/10
    //interpolerer for å finne faktisk ekspansjon
    let tempExp = 0
    if (meanTempLow === meanTempHigh){
      tempExp = tempExpHigh
    }else{
      tempExp = (dataTappevann.temperatur-meanTempLow)/(meanTempHigh-meanTempLow)*(tempExpHigh-tempExpLow)+(tempExpLow)
    }
    //results for the object
    let expansion = dataTappevann.vannvolum === 0 ? 0 : Math.round((tempExp)*10)/10
    let usablePercentage = calcUsablePercentageTappevann()
    let minVolum = Math.ceil(expansion/usablePercentage)

    let returnObj = {
      ekspansjon: expansion,
      nytteeffekt: usablePercentage,
      minimumVolum: minVolum,
      arbeidsTrykk: dataTappevann.ladetrykk,
      arbeidsTemp: dataTappevann.temperatur,
      sikkerhetsTrykk:dataTappevann.sikkerhetsventil
    }

    return returnObj
  }
  //beregner utnyttelsesgraden av ekspansjonskar for varmeanlegg
  function calcUsablePercentageVarme(){
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
  //beregner utnyttelsesgraden av ekspansjonskar for tappevann
  function calcUsablePercentageTappevann(){
    //statisk trykk
    let staticP = parseFloat(dataTappevann.ladetrykk)
    //blåsetrykk
    let valveSafetyMargin = dataTappevann.sikkerhetsventil*0.1
    let safetyValveP = parseFloat(dataTappevann.sikkerhetsventil-valveSafetyMargin)
    //atmosfæreisk trykk
    let atmosP = 1
    //ekspansjonskarets nytteeffekt
    let usablePercentage = (Math.ceil(((safetyValveP+atmosP-(staticP+atmosP))/(safetyValveP+atmosP))*100)/100)
    return usablePercentage
  }
  //oppdaterer beregningsType
  function updateBeregningsType(event){
    setBeregningsType(event.target.value)
    if (event.target.value !== "tappevann"){
        if (event.target.value === "varme"){
          setDataVarme(oldDataVarme => (
              {...oldDataVarme,
                turtemp: 42,
                returtemp: 35,
                fluid: "Vann",
              }
          ))
        }else if(event.target.value === "varmeopptak"){
          setDataVarme(oldDataVarme => (
              {...oldDataVarme,
                turtemp: 3,
                returtemp: 0,
                fluid: "HX35",
              }
          ))
        }else{
          setDataVarme(oldDataVarme => (
              {...oldDataVarme,
                turtemp: 7,
                returtemp: 12,
                fluid: "Vann",
              }
          ))
        }
      updateExpansionVarme()
    }else{
      updateExpansionTappevann()
    }
  }

  //oppdaterer ekspansjonsberegning og skjuler resultater ved endringer i inndata til varmeanlegg
  React.useEffect(()=>{
    updateExpansionVarme()
    if(showResult === true){
      setShowResult(false)
    }
  },[dataVarme])
  //oppdaterer ekspansjonsberegning og skjuler resultater ved endringer i inndata til tappevann
  React.useEffect(()=>{
    updateExpansionTappevann()
    if(showResult === true){
      setShowResult(false)
    }
  },[dataTappevann])
  React.useEffect(()=>{
    setShowResult(false)
  },[beregningsType])

  return(
    <div className= {props.toolId === showTool ? "toolArea" : "hiddenTool"}>
      <div className="toolBanner">
        <Banner title={props.toolName} />
      </div>
      <div className="dataArea">
        <div className="toolInfo">
          Finn passende ekspansjonskar ved å legge inn anleggsinformasjon<br></br>
          Merk at det er bladibladi
        </div>
        <div className="ekspansjonskar-inndatalinje">
          <div className="ekspansjonskar-inndataTittel">
            Anleggstype
          </div>
          <div className="ekspansjonskar-inndataVerdi">
            <select
              name="sikkerhetsventil"
              className="ekspansjonskar-select"
              value={beregningsType}
              onChange={(event) => updateBeregningsType(event)}
              >
              <option key="varme" value="varme">Varmeanlegg</option>
              <option key="kjøle" value="kjøle">Kjøleanlegg</option>
              <option key="varmeopptak" value="varmeopptak">Varmeopptak</option>
              <option key="tappevann" value="tappevann">Tappevann</option>
            </select>
          </div>
        </div>
        <>
        {beregningsType !== "tappevann" ?
          <InndataVarme
            data={dataVarme}
            updateData={updateDataVarme}
            fluidListe={fluidListe}
          />
          :
          <InndataTappevann
            data={dataTappevann}
            updateData={updateDataTappevann}
          />
        }
        </>
        <Beregning
          expansion={expansion}
        />
        <Produkter
          products={Ekspansjonskar}
          expansion={expansion}
          type={beregningsType !== "tappevann" ? "varme" : "tappevann"}
          showResult = {showResult}
          setShowResult = {setShowResult}
        />
      </div>
  </div>
)

}
