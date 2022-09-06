import React from 'react'

import Topbar from './components/static/Topbar'
import Toolcard from './components/static/Toolcard'
import Footer from './components/static/Footer'
import Gulvvarme from './components/tools/gulvvarme/Gulvvarme'
import Ekspansjonskar from './components/tools/ekspansjonskar/Ekspansjonskar'
import Varmebehov from './components/tools/Varmebehov'
import Kjølebehov from './components/tools/Kjølebehov/Kjølebehov'
import Diverse from './components/tools/Diverse'
import { nanoid } from 'nanoid'


export default function App() {
  //status om man skal vie tool-list eller ikke

  //liste over verktøy
  const toolNames = [
  "Gulvvarmevelger",
  "Ekspansjonskarsvelger",
  "Beregning varmebehov",
  "Beregning kjølebehov",
  "Estimat andre greier"
  ]
  //genererer ID til alle verktøy
  const toolId = toolNames.map((name,index) =>
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
        <div className="contentWrapper">
          <div className= "toolList" >
            {toolElements}
          </div>
          <Gulvvarme
            toolId={toolId[0]}
            toolName={toolNames[0]}
          />
          <Ekspansjonskar
            toolId={toolId[1]}
            toolName={toolNames[1]}
          />
          <Varmebehov
            toolId={toolId[2]}
            toolName={toolNames[2]}
          />
          <Kjølebehov
            toolId={toolId[3]}
            toolName={toolNames[3]}
          />
          <Diverse
            toolId={toolId[4]}
            toolName={toolNames[4]}
          />
        </div>
        <Footer />
    </div>
  );
}
