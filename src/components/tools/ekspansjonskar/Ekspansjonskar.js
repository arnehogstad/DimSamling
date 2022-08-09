import React from 'react'
import Inndata from './components/Inndata'
import Beregning from './components/Beregning'
import Produkter from './components/Produkter'
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
    fluid: "vann",
    ekspansjon: 0
  })
  //state of Result
  const [showResult,setShowResult] = React.useState(false)
  //endrer inndata
  function updateData(event){
    const {name, value} = event.target
    setData(oldData => (
        {...data,
        [name]:value
      }
    ))
  }

  React.useEffect(()=>{
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
