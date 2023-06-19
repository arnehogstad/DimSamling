import React from 'react'
import abklogo from './abkqvillerlogo.jpg';

import Topbar from './components/static/Topbar'
import Toolcard from './components/static/Toolcard'
import Footer from './components/static/Footer'
import Gulvvarme from './components/tools/gulvvarme/Gulvvarme'
import Ekspansjonskar from './components/tools/ekspansjonskar/Ekspansjonskar'
import Varmebehov from './components/tools/Varmebehov'
import Kjølebehov from './components/tools/Kjølebehov/Kjølebehov'
import Trykktap from './components/tools/trykktap/Trykktap'
import Diverse from './components/tools/Diverse'
import { nanoid } from 'nanoid'
import Varmtvann from './components/tools/varmtvann/Varmtvann'
import styled from 'styled-components';


const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  align-self: center;
  height: 100vh;
  text-align: center;
  background-color: #fbac1833;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;

const Description = styled.p`
  font-size: 1.25rem;
  margin-bottom: 2rem;
`;

export default function App() {
  //status om man skal vie tool-list eller ikke

  //liste over verktøy
  const toolNames = [
  "Gulvvarmevelger",
  "Ekspansjonskarsvelger",
  "Beregning varmebehov",
  "Beregning kjølebehov",
  "Varmtvann",
  "Trykktap",
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
/*     <div className="App">
      <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
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
    </div> */

    <Container>
    <div className="section-white_WO_flex">
      <img src={abklogo} alt="Logo" style={{ height: "10rem" }} />
      <Description>
        Apollo er faset ut, bruk <a href="https://dim.abkqviller.no/">dim.abkqviller.no</a> for å få tilgang til ABKQ-DIM.
      </Description>
    
      </div>
    
  </Container>



    
  );
}
