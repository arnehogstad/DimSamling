import React from 'react'

import Topbar from './components/static/Topbar'
import Toolcard from './components/static/Toolcard'
import Bigbanner from './components/static/Bigbanner'
import Footer from './components/static/Footer'
import Gulvvarme from './components/tools/gulvvarme/Gulvvarme'
import Ekspansjonskar from './components/tools/ekspansjonskar/Ekspansjonskar'
import Varmebehov from './components/tools/Varmebehov'
import Kjølebehov from './components/tools/Kjølebehov/Kjølebehov'
import Trykktap from './components/tools/trykktap/Trykktap'
import Diverse from './components/tools/Diverse'
import { nanoid } from 'nanoid'
import Varmtvann from './components/tools/varmtvann/Varmtvann'



export default function App() {

  //liste over verktøy
  const toolNames = [
  "Gulvvarme",
  "Ekspansjonskar",
  "Varmebehov",
  "Kjølebehov",
  "Varmtvann",
  "Trykkfall",
  "Div"
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
      <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
        <Topbar />
        <Bigbanner title='verktøy' />
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
          <Varmtvann
            toolId={toolId[4]}
            toolName={toolNames[4]}
          />
          <Trykktap
            toolId={toolId[5]}
            toolName={toolNames[5]}
          />
          <Diverse
            toolId={toolId[6]}
            toolName={toolNames[6]}
          />
        </div>
        <Footer />
    </div>
  );
}
