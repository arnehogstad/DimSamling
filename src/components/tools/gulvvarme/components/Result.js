import React from 'react'
import { CSVLink } from "react-csv"
import { PDFViewer } from "@react-pdf/renderer";
import Print from "./printComponents/Print";
import PrintIcon from '@mui/icons-material/Print';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

export default function Result(props){
  //array for all units in project
  const totArray = []
  //array holding values for the pdf
  const unitPDFArray = []

  //databases for lookup
  const stokkDb = props.dataBase.rørfordeler.fordeler
  const skapDb = props.dataBase.fordelerskap
  const roomControlDb = props.dataBase.romregulering
  const packageDb = props.dataBase.forpakningsStørrelse
  //loops through all units
  for (let i = 0; i<props.units.length;i++){
    //definerer unitArray
    const unitArray = []
    //defining temporary unit for print
    let tempPDFUnit = {
      id: `${i}-${props.units[i].unitId}`,
      items: []
    }
    let unitArea = 0
    let unitZones = 0
    let unitCircuits = 0
    let unitCircuitArray = []
    let unitWetRooms = 0
    //sets temp current unit
    let tempUnit = props.units[i]
    //loops through all rooms
    for(let j = 0;j<tempUnit.rooms.length-1; j++){
      //sets temp current room
      let tempRoom = tempUnit.rooms[j]
      //makes sure room has data
      if(tempRoom.area !== "" && tempRoom.pipetype !== "" && tempRoom.circuits !== ""){
        //defining temporary PDF room object
        let tempPDFRoom = {
          id: tempRoom.id,


        }
        //increments total area
        unitArea = parseFloat(unitArea + 1*tempRoom.area)
        unitZones = parseFloat(unitZones + 1)
        unitCircuits = parseFloat(unitCircuits + 1*tempRoom.circuits)
        unitCircuitArray.push([tempRoom.circuits,tempRoom.floor.replace(' - betong').replace(' - bjelkelag')])
        unitWetRooms = parseFloat(unitWetRooms + 1*tempRoom.wetroom)
        //gets temp pipe package for room
        let tempItems = props.dataBase.gulvvarmePakker[tempRoom.pipetype]
        //gets temp pipe multiplier from the rooms CC
        let tempItemsMult = tempItems.cc[tempRoom.cc]
        //loops through each article in package
        for (let k = 0; k<tempItems.artikkelnavn.length;k++){
          //checks if article already in array
          let tempIndex = unitArray.findIndex((articleList) => articleList.artnmbr === tempItems.artikkelnummer[k])
          let prevCount = 0
          if (tempIndex !== -1){
            prevCount = unitArray[tempIndex].artcount
            unitArray.splice(tempIndex,1)
          }
          //calculates quantity
          let tempCount = tempItems.beregningsmetode[k] === "pr kvm" ?
          Math.ceil(tempItemsMult.antall[k]*tempRoom.area) :
          tempItems.beregningsmetode[k] === "pr kurs" ?
          tempItemsMult.antall[k]*tempRoom.circuits :
          tempItems.beregningsmetode[k] === "omkrets" ?
          Math.ceil(tempItemsMult.antall[k]*Math.sqrt(tempRoom.area)*4) :
          tempItems.beregningsmetode[k] === "mellom plater" ?
          Math.ceil(tempItemsMult.antall[k]*2*Math.sqrt(tempRoom.area)*(Math.sqrt(tempRoom.area)-1)) :
          99
          //defines tempobject for returning each value
          let tempArticle = {
            artnmbr: tempItems.artikkelnummer[k],
            artname: tempItems.artikkelnavn[k],
            artcount: Math.round(parseFloat(tempCount + prevCount)*10)/10,
            artdim: tempItems.benevning[k]
          }
          unitArray.push(tempArticle)
        }
      }
    }
    //checks if anythinh to add
    if (unitArea > 0 && unitCircuits > 0 && unitZones > 0 ){
      //defines temperary array for all additional gear
      let tempReturnArr = []
      //adds thermostat and actuator
      if (tempUnit.termostatType !== "Uten termostat"){
        let tempActuator = {
          artnmbr: roomControlDb.Aktuator.artikkelnummer,
          artname: roomControlDb.Aktuator.artikkelnavn,
          artcount: unitCircuits,
          artdim: "stk"
        }
        tempReturnArr.push(tempActuator)
        //gets information for master,thermostat and app
        if (tempUnit.termostatType === "ALPHA"){
          var loopDb = roomControlDb.alpha.romtermostat
          var masterDb = roomControlDb.alpha.master
          var appDb = false
        }else{
          var loopDb = roomControlDb.icon.romtermostat
          var masterDb = roomControlDb.icon.master
          var appDb = false
          if (tempUnit.termostatType === "ICON (med appstyring)"){
            appDb = roomControlDb.icon.appmodul
          }
        }
      }else{
        var masterDb = false
        var loopDb = false
        var appDb = false
      }

      //gets information for type of fordelerskap
      if (tempUnit.fordelerskap === "På vegg"){
        var tempSkapDb = skapDb.påVegg
      }else if(tempUnit.fordelerskap === "I vegg"){
        var tempSkapDb = skapDb.iVegg
      }else if(tempUnit.fordelerskap === "I vegg inkl fordeler"){
        var tempSkapDb = skapDb.iVeggMedFordeler
      }else{
        var tempSkapDb = false
      }
      //gets information for bypass
      if (tempUnit.fordelerstokk === "Uten bypass"){
        var tempBypassDb = false
      }else{
        var tempBypassDb = props.dataBase.rørfordeler.bypass
      }
      //gets thermostat for the entire unit
      if (loopDb !== false){
        let tempThermostatArr = getThermostat(loopDb,tempUnit.termostatStandard,unitWetRooms,unitZones)
        for (let i = 0; i < tempThermostatArr.length;i++){
          tempReturnArr.push(tempThermostatArr[i])
        }
      }
      //gets master/Stokk/Skap/App for each unique floor in unit
      const uniqueFloors = unitCircuitArray.flat().filter((room, index, array) => array.indexOf(room) == index).filter(val => typeof val === 'string')
      //loops through each unique floor
      for (let j = 0; j < uniqueFloors.length; j++){
        let tempFloorArr = unitCircuitArray.filter(room => room[1] === uniqueFloors[j])
        let tempMasterStokkSkapApp = getMasterStokkSkapApp(tempFloorArr,stokkDb,masterDb,tempSkapDb,tempBypassDb,appDb)
        for (let i = 0; i < tempMasterStokkSkapApp.length;i++){
          tempReturnArr.push(tempMasterStokkSkapApp[i])
        }
      }
      //removing duplicates from the tempReturnArr
      for (let i = 0; i<tempReturnArr.length;i++){
        //checks if article already in array
        let tempIndex = unitArray.findIndex((articleList) => articleList.artnmbr === tempReturnArr[i].artnmbr)
        let prevCount = 0
        if (tempIndex !== -1){
          prevCount = unitArray[tempIndex].artcount
          unitArray.splice(tempIndex,1)
        }
        unitArray.push(tempReturnArr[i])
        unitArray[unitArray.length-1].artcount = parseFloat(prevCount + tempReturnArr[i].artcount)
      }

      let unitValues = {
          unitid: tempUnit.unitId,
          unitname: tempUnit.unitName,
          unitzones: unitZones,
          unitarea: unitArea,
          unitcircuits: unitCircuits,
          unititems: [...unitArray].sort((a,b) =>{ return a.artnmbr - b.artnmbr})
      }
      totArray.push({...unitValues})
    }
  }

  function getThermostat(loopDb,termostatStandard,nWetRooms,nRooms){
    let returArr = []
    let loopStart = 0
    let wetCount = nWetRooms
    if (termostatStandard !== "kun på våtrom"){
      loopStart = 1
      wetCount = nRooms
    }

    for (let i = loopStart; i<loopDb.artikkelnummer.length;i++){
      let tempThermostat = {
        artnmbr: loopDb.artikkelnummer[i],
        artname: loopDb.artikkelnavn[i],
        artcount: i === 0 ? (nRooms-wetCount) :
        i === 2 ? nWetRooms : wetCount,
        artdim: "stk"
      }
      if (tempThermostat.artcount > 0){
        returArr.push(tempThermostat)
      }
    }
    return returArr
  }

  function getMasterStokkSkapApp(circuitArray,stokkDb,masterDb,skapDb,bypassDb,appDb){
    const returArr = []
    const indeksStokk = []
    const indeksMaster = []
    const indeksSkap = []
    const onlyCircuitsArray = [...circuitArray].flat().filter(val => typeof val !== 'string')
    let maksPerStokk = stokkDb.makskurser[stokkDb.makskurser.length-1]
    let maksPerMaster = masterDb !== false ? masterDb.makssoner[masterDb.makssoner.length-1] : 0
    //removes edge cases -> one room needing more than one stokk
    const tempCircuitArray = [...onlyCircuitsArray].filter( val => val <= maksPerStokk)
    let tempSum = tempCircuitArray.length > 0 ? tempCircuitArray.reduce((a,b) => a+b) : 0
    let nStokk = Math.ceil(tempSum/maksPerStokk)
    let nMaster = masterDb !== false ? Math.ceil(tempCircuitArray.length/maksPerMaster) : 0
    nStokk = nMaster = Math.max(nStokk,nMaster)

    //only 1 of each
    if(nStokk === 1){
      indeksStokk[0] = stokkDb.makskurser.findIndex((maksKurser) => maksKurser >= tempSum)
      indeksMaster[0] = masterDb !== false ? masterDb.makssoner.findIndex((maksSoner) => maksSoner >= tempCircuitArray.length) : 0
      indeksSkap[0] = skapDb !== false ? skapDb.makskurser.findIndex((maksKurser) => maksKurser >= tempSum) : 0
    }else{
      //if more than 1 - find possible array combinations
      //in practice this requires Balanced Number partitioning, a variant of multiway number partitioning
      //as this is programatically heavy we will implement a naive solution here
      //sort room array from highest nmbr of circuits to lowest
      //filters out rooms that are edge cases needing more than one stokk by themselves
      let sortedCiruitArray = [...tempCircuitArray].sort((a,b) => {return b-a})
      //define number of subsets equal to the needed number of masters/stokker
      let subsetArray = new Array(nStokk).fill([0])
      //loop through sortedCircuitArray and add the largest number to the smallest array
      for (let i = 0; i<sortedCiruitArray.length;i++){
        //loop through the subsetArray
        for (let j = 0; j<subsetArray.length-1;j++){
          //define the current and next sum
          let firstSum = subsetArray[j].reduce((a,b)=>a+b)
          let secondSum = subsetArray[j+1].reduce((a,b)=>a+b)
          //adds the next room to the array with the smalles circuit count
          if(firstSum < secondSum){
            let tempArr = subsetArray[j][0] === 0 ?
            [sortedCiruitArray[i]] :
            [...subsetArray[j],sortedCiruitArray[i]]
            subsetArray[j] = tempArr
            break
          }else if(j === subsetArray.length-2){
            let tempArr = subsetArray[j+1][0] === 0 ?
            [sortedCiruitArray[i]] :
            [...subsetArray[j+1],sortedCiruitArray[i]]
            subsetArray[j+1] = tempArr
          }
        }
      }
      //setting the index for each master/stokk combination
      for (let i = 0; i < subsetArray.length;i++){
        let tempSumKurs = subsetArray[i].reduce((a,b)=>a+b)
        let tempSumSone = subsetArray[i].length
        indeksStokk[i] = stokkDb.makskurser.findIndex((maksKurser) => maksKurser >= tempSumKurs)
        indeksMaster[i] = masterDb !== false ? masterDb.makssoner.findIndex((maksSoner) => maksSoner >= tempSumSone) : 0
        indeksSkap[i] = skapDb !== false ? skapDb.makskurser.findIndex((maksKurser) => maksKurser >= tempSumKurs) : 0
      }

    }

    //adding data for the edgecases
    const edgeCaseArr =  [...onlyCircuitsArray].filter( val => val > maksPerStokk)
    const edgeCaseCountArr = []
    if (edgeCaseArr.length > 0){
      for (let i = 0; i < edgeCaseArr.length; i++){
        let tempNStokk = Math.ceil(edgeCaseArr[i]/maksPerStokk)
        let tempNMaster = Math.ceil(edgeCaseArr[i]/15)
        let tempSumKurs = Math.ceil(edgeCaseArr[i]/tempNStokk)

        edgeCaseCountArr[indeksStokk.length] = {
          nstokk: tempNStokk,
          nmaster: tempNMaster
        }
        indeksStokk[indeksStokk.length] = stokkDb.makskurser.findIndex((maksKurser) => maksKurser >= tempSumKurs)
        indeksMaster[indeksMaster.length] = masterDb !== false ? masterDb.makssoner.length-1 : 0
        indeksSkap[indeksSkap.length] = skapDb !== false ? skapDb.makskurser.findIndex((maksKurser) => maksKurser >= tempSumKurs) : 0
      }
    }

    //getting stokk
    for (let i = 0; i<indeksStokk.length;i++){
      let tempStokk = {
        artnmbr: stokkDb.artikkelnummer[indeksStokk[i]],
        artname: stokkDb.artikkelnavn[indeksStokk[i]],
        artcount: edgeCaseArr.length > 0 && edgeCaseCountArr[i] !== undefined ?
        edgeCaseCountArr[i].nstokk : 1,
        artdim: "stk"
      }
      if(skapDb.Name !== "iVeggMedFordeler"){
        //returns the stokk
        returArr.push(tempStokk)
      }
      //getting fordelerskap
      if (skapDb !== false){
        let tempSkap = {
          artnmbr: skapDb.artikkelnummer[indeksSkap[i]],
          artname: skapDb.artikkelnavn[indeksSkap[i]],
          artcount: edgeCaseArr.length > 0 && edgeCaseCountArr[i] !== undefined ?
          edgeCaseCountArr[i].nstokk : 1,
          artdim: "stk"
        }
        //returns the skap
        returArr.push(tempSkap)
      }
      //getting bypass
      if (bypassDb !== false){
        let tempBypass = {
          artnmbr: bypassDb.artikkelnummer,
          artname: bypassDb.artikkelnavn,
          artcount: edgeCaseArr.length > 0 && edgeCaseCountArr[i] !== undefined ?
          edgeCaseCountArr[i].nstokk : 1,
          artdim: "stk"
        }
        //returns the bypass
        returArr.push(tempBypass)
      }
    }
    if (masterDb !== false){
      //getting Master
      for (let i = 0; i<indeksMaster.length;i++){
        let tempMaster = {
          artnmbr: masterDb.artikkelnummer[indeksMaster[i]],
          artname: masterDb.artikkelnavn[indeksMaster[i]],
          artcount: edgeCaseArr.length > 0 && edgeCaseCountArr[i] !== undefined ?
          edgeCaseCountArr[i].nmaster : 1,
          artdim: "stk"
        }
        //returns the master
        returArr.push(tempMaster)
        //getting app and radio module
        if(appDb !== false){
          for (let j = 0; j < 2; j++){
            let tempApp = {
              artnmbr: appDb.artikkelnummer[j],
              artname: appDb.artikkelnavn[j],
              artcount: edgeCaseArr.length > 0 && edgeCaseCountArr[i] !== undefined ?
              edgeCaseCountArr[i].nmaster : 1,
              artdim: "stk"
            }
            //returns the master
            returArr.push(tempApp)
          }
        }
      }
    }
    //getting appmodul
    return returArr
  }

  function getPackagesNumberAndSize(itemArray,packageDb){
    const returnArr = [...itemArray]
    const packagesArticleNmbrArr = Object.keys(packageDb)
    const itemWithPackageIndexArr = packagesArticleNmbrArr.map(packageNmbr => itemArray.findIndex((articleList) => articleList.artnmbr === parseInt(packageNmbr)))

    for (let i = 0; i < itemWithPackageIndexArr.length; i++){
      if(itemWithPackageIndexArr[i] !== -1){
        let targetVal = returnArr[itemWithPackageIndexArr[i]].artcount
        let pack = {
          largeartnmbr: packageDb[packagesArticleNmbrArr[i]].PakkeStor.Artikkelnr,
          largesize: packageDb[packagesArticleNmbrArr[i]].PakkeStor.Størrelse,
          largebenevning: `${packageDb[packagesArticleNmbrArr[i]].Type} à ${packageDb[packagesArticleNmbrArr[i]].PakkeStor.Størrelse} ${returnArr[itemWithPackageIndexArr[i]].artdim}`,
          smallartnmbr: packageDb[packagesArticleNmbrArr[i]].PakkeLiten.Artikkelnr,
          smallsize: packageDb[packagesArticleNmbrArr[i]].PakkeLiten.Størrelse,
          smallbenevning: `${packageDb[packagesArticleNmbrArr[i]].Type} à ${packageDb[packagesArticleNmbrArr[i]].PakkeLiten.Størrelse} ${returnArr[itemWithPackageIndexArr[i]].artdim}`,
        }
        let tempLarge = {
          artnmbr: pack.largeartnmbr,
          artname: returnArr[itemWithPackageIndexArr[i]].artname,
          artcount:0,
          artdim: pack.largebenevning
        }
        let tempSmall = {
          artnmbr: pack.smallartnmbr,
          artname: returnArr[itemWithPackageIndexArr[i]].artname,
          artcount:0,
          artdim: pack.smallbenevning
        }

        if(pack.smallsize !== 0 && pack.smallsize !== "0"){
          const gcd = (a, b) => a ? gcd(b % a, a) : b;
          const lcm = (a, b) => a * b / gcd(a, b);
          const combinationArray = []
          let leastCommonMultiple = [pack.smallsize, pack.largesize].reduce(lcm)
          let maxNSmall = leastCommonMultiple/pack.smallsize-1
          let maxNLarge = Math.ceil(targetVal/pack.largesize)
          let minNLarge = Math.max(0,maxNLarge-leastCommonMultiple/pack.largesize)

          for (let j = minNLarge; j <= maxNLarge; j++){
            for (let k = 0; k<= maxNSmall; k++){
              let dataPoint = {
                nlarge: j,
                nsmall: k,
                value: parseFloat(j*pack.largesize+k*pack.smallsize)
              }
              combinationArray.push(dataPoint)
              if (dataPoint.value > targetVal){
                break
              }
            }
          }
          combinationArray.sort((a,b) =>{ return a.value - b.value})
          tempLarge.artcount = combinationArray.filter(dataPoint => dataPoint.value >= targetVal)[0].nlarge
          tempSmall.artcount = combinationArray.filter(dataPoint => dataPoint.value >= targetVal)[0].nsmall
        }else{
          tempLarge.artcount = Math.ceil(targetVal/pack.largesize)
        }
        returnArr.splice(itemWithPackageIndexArr[i],1,
          tempSmall.artcount > 0 ?
          (tempLarge.artcount > 0 ? [tempLarge,tempSmall] : tempSmall)
          :
          tempLarge
        )
      }
    }
    //making sure all artcounts are whole numbers, flattening and rounding returnarray
    const roundedReturnArr = returnArr.flat().map((item) => (
        { ...item,
          artcount: Math.ceil(item.artcount)
        }
      ))

    return roundedReturnArr
  }

  var printArray = []
  //if more than one unit there is a combination
  if (totArray.length > 1){
    let projectArray = []
    let projectZones = 0
    let projectArea = 0
    let projectCircuits = 0
    //loops all unitArrays
    for (let i = 0; i < totArray.length; i++){
        let tempUnit = totArray[i]
        let tempItems = [...tempUnit.unititems]
        //loops all items in unit
        for(let j = 0; j<tempItems.length;j++){

          let tempIndex = projectArray.findIndex((articleList) => articleList.artnmbr === tempItems[j].artnmbr)
          let prevCount = 0
          if (tempIndex !== -1){
            prevCount = projectArray[tempIndex].artcount
            projectArray.splice(tempIndex,1)
          }
          //defines tempobject for returning each value
          let tempArticle = {
            artnmbr: tempItems[j].artnmbr,
            artname: tempItems[j].artname,
            artcount: parseFloat(tempItems[j].artcount + prevCount),
            artdim: tempItems[j].artdim
          }
          projectArray.push(tempArticle)
        }
        projectZones = parseFloat(tempUnit.unitzones + projectZones)
        projectArea = parseFloat(tempUnit.unitarea + projectArea)
        projectCircuits = parseFloat(tempUnit.unitcircuits + projectCircuits)
    }
    let projectValues = {
        unitid: "Prosjekt",
        unitname: props.projectName,
        unitzones: projectZones,
        unitarea: projectArea,
        unitcircuits: projectCircuits,
        unititems: [...projectArray].sort((a,b) =>{ return a.artnmbr - b.artnmbr})
    }
    printArray = [{...projectValues},...totArray]
  }else{
    printArray = [...totArray]
  }

  const unitElements = printArray.map((unit,index) => (
    <ResultForUnit
      key={`result${unit.unitid}`}
      unit = {unit}
      unitObjects = {props.units}
      unitObjectIndex = {index}
      articleList = {getPackagesNumberAndSize(unit.unititems,packageDb)}
      projectName={props.projectName}
    />

  ))

  return (
    <div className="result-part">
      {unitElements[0]}
    </div>
  )
}

function ResultForUnit(props){

  const deepCopyFunction = (inObject) => {
    let outObject, value, key
    if (typeof inObject !== "object" || inObject === null) {
      return inObject // Return the value if inObject is not an object
    }
    // Create an array or object to hold the values
    outObject = Array.isArray(inObject) ? [] : {}
    for (key in inObject) {
      value = inObject[key]
      // Recursively (deep) copy for nested objects, including arrays
      outObject[key] = deepCopyFunction(value)
    }
    return outObject
  }

  let tempArticleList = deepCopyFunction(props.articleList)
  let tempUnitItems = deepCopyFunction(props.unit.unititems)
  let mergedArticleList = []
  let roundedUnitItems = tempUnitItems.map(article => ({...article, artcount: Math.ceil(article.artcount)}))


  tempArticleList.forEach(function(item) {
  var existing = mergedArticleList.filter(function(v, i) {
    return v.artname == item.artname;
  });
  if (existing.length) {
    var existingIndex = mergedArticleList.indexOf(existing[0]);
    mergedArticleList[existingIndex].artnmbr = `${mergedArticleList[existingIndex].artnmbr} ${'\n'} ${item.artnmbr}`;
    mergedArticleList[existingIndex].artdim = `${mergedArticleList[existingIndex].artdim} ${'\n'} ${item.artcount} stk ${item.artdim}`
    mergedArticleList[existingIndex].korrigertAntall = parseFloat(mergedArticleList[existingIndex].korrigertAntall+item.artdim.replace(/\D/g,'')*item.artcount)
  } else {
    item.artcount = Math.ceil(item.artcount)
    item.korrigertAntall = parseFloat(item.artdim.replace(/\D/g,'')*item.artcount)
    item.artdim = `${item.artcount} stk ${item.artdim}`
    mergedArticleList.push(item);
  }
  });

  const [showProducts,setShowProducts] = React.useState(true)

  const lineElements = mergedArticleList.map((article,index) =>
    <ResultArticleLines
      key = {`row${index}${props.unit.unitid}`}
      article = {article}
      roundedUnitItems = {roundedUnitItems}
      index={index}
    />
  )

  return(
    <div>
      <ResultHeader
        unit = {props.unit}
        unitObjects = {props.unitObjects}
        unitObjectIndex = {props.unitObjectIndex}
        showProducts = {showProducts}
        toggleShowProducts = {() => setShowProducts(!showProducts)}
        mergedArticleList = {mergedArticleList}
        roundedUnitItems = {roundedUnitItems}
        articleList = {props.articleList}
        projectName={props.projectName}
      />
      {showProducts === true ?
      <div className="result-article-line-wrapper">
        <div className="result-article-line topline">
          <div className="result-article-line-headline result-headline-small">Artikkelnummer</div>
          <div className="result-article-line-headline result-headline-large">Artikkelnavn</div>
          <div className="result-article-line-headline result-headline-small text-center">Antall</div>
          <div className="result-article-line-headline result-headline-small text-center">Korrigert antall</div>
          <div className="result-article-line-headline result-headline-small text-center">Forpakning</div>
        </div>
        {lineElements}
      </div>
      :
      ""
      }
    </div>
  )

}


function ResultHeader(props){
  const [showModal,setShowModal] = React.useState(false)



  const cleanLink  = {
    color: "black",
    textDecoration:"none",
    paddingTop: "10px",
    paddingBottom: "10px",
  }

  const headers=[
    {
      label: "Artikkelnummer", key:"artnmbr"
    },
    {
      label: "Artikkelnavn", key:"artname"
    },
    {
      label: "Antall", key:"artcount"
    },
    {
      label: "Benevning", key:"artdim"
    }
  ]

  function toggleModal(visible){
    setShowModal(visible)
  }

  function modalClick(event){
    if (event.target.className === "modal" ||
      event.target.className === "modal-cancel-div" ||
      event.target.className === "handlingsKnapp avbrytknapp"){
      setShowModal(false)
    }
  }

  let tempFooterText = "Test av footerText. Alle feil er på kundens egen risiko og kostnad. bladibladi"

  return(

    <div className="result-header">
    {showModal === true ?
      <div className="modal" style={{display:"flex",}} onClick={(event) => modalClick(event)}> >
        <div className="modal-content-print">
          <div className="modal-header">
            <div className="modal-header-text">Forhåndsvisning utskrift</div>
            <div className="modal-cancel-div">x</div>
          </div>
        <>
          <PDFViewer width="100%" height="100%">
            <Print
              data={props.unitObjects}
              unitInfo={props.unit}
              articleList = {props.mergedArticleList}
              roundedUnitItems = {props.roundedUnitItems}
              dataIndex={props.unitObjectIndex}
              headline={`Materialliste - ${props.projectName}`}
              footerText = {tempFooterText}
            />
          </PDFViewer>
        </>
        </div>
      </div>
      :
      null
    }


      <div className="result-header-headline headline-content">
        <div className="result-header-line">
          <h4>
            {props.unit.unitname} - gulvvarmeutstyr
          </h4>
          <p>
            Uttak av utstyr dekker {props.unit.unitarea} m<sup>2</sup> vannbåren gulvvarme.
          </p>
          <p>
          {props.unit.unitname} består av {props.unit.unitzones} rom og har {props.unit.unitcircuits} kurser
          </p>
          <br></br>
          <div className="result-header-toggleContents">
            <button className="toggleContentsButton" onClick={props.toggleShowProducts}>
              <span>
                {props.showProducts === true ?
                  "Skjul produkter" :
                  "Vis produkter"
                }
              </span>
            </button>
          </div>
        </div>
        <div className="result-header-actionbutton">
          <div
            className="project-headline-knapp-div"
            alt="Skriv ut"
            onClick={(event) => toggleModal(true)}
          >
            <PrintIcon />
            LAST NED
          </div>

            <CSVLink
              data={props.articleList}
              filename={`Handleliste-${props.unit.unitname}.csv`}
              style={cleanLink}
              headers={headers}
            >
            <div
            className="project-headline-knapp-div"
            alt="Legg i handlekurv"
            >
              <ShoppingCartIcon />
              LEGG I HANDLEKURV
              </div>
            </CSVLink>


        </div>
      </div>
    </div>
  )
}

function ResultArticleLines(props){

  return(
    <div className="result-article-line">
      <div className="result-article-line-datapoint result-headline-small">
        {props.article.artnmbr}
      </div>
      <div className="result-article-line-datapoint result-headline-large">
        {props.article.artname}
      </div>
      {props.roundedUnitItems.filter(item => item.artname === props.article.artname).reduce((prev,curr)=>prev+curr.artcount,0) !== Math.ceil(props.article.artcount) ?
      <>
        <div className="result-article-line-datapoint result-headline-small text-center">
          {props.roundedUnitItems[props.index].artcount}
        </div>
        <div className="result-article-line-datapoint result-headline-small text-center">
          {props.article.korrigertAntall}
        </div>
        <div className="result-article-line-datapoint result-headline-small text-center">
          {props.article.artdim}
        </div>
      </>
      :
      <>
        <div className="result-article-line-datapoint result-headline-small text-center">
          {props.article.artcount}
        </div>
        <div className="result-article-line-datapoint result-headline-small text-center">
          {props.article.artcount}
        </div>
        <div className="result-article-line-datapoint result-headline-small text-center">
        </div>
      </>
      }
    </div>
  )
}
