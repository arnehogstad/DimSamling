import React from 'react'
import Topbar from './components/static/Topbar'
import Toolcard from './components/static/Toolcard'
import Counter from './components/tools/Counter'
import Gulvvarme from './components/tools/Gulvvarme'
import Ekspansjonskar from './components/tools/Ekspansjonskar'
import Varmebehov from './components/tools/Varmebehov'
import Kjølebehov from './components/tools/Kjølebehov'
import Diverse from './components/tools/Diverse'
import { nanoid } from 'nanoid'

export default function App() {

  //liste over verktøy
  const toolNames = [
  "Gulvvarmevelger",
  "Ekspansjonskarsvelger",
  "Beregning varmebehov",
  "Beregning kjølebehov",
  "Estimat andre greier"
  ]
  //genererer ID til alle verktøy
  const toolId = toolNames.map((name) =>
    nanoid()
  )


  const toolElements = toolNames.map((name,index) =>
    <Toolcard
      toolName={name}
      key = {index}
      toolid = {toolId[index]}
      picName = {name}
    />
  )

  return (
    <div className="App">
        <Topbar />
        <div className="toolList">
          {toolElements}
        </div>
        <Gulvvarme toolId={toolId[0]} />
        <Ekspansjonskar toolId={toolId[1]}/>
        <Varmebehov toolId={toolId[2]}/>
        <Kjølebehov toolId={toolId[3]}/>
        <Diverse toolId={toolId[4]}/>
    </div>
  );
}
