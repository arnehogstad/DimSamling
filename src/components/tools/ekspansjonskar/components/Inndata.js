import React from 'react'

export default function Inndata(props){

  //inndatafelter
  const inndataFelter = [
    "Ladetrykk [bar]",
    "Blåsetrykk sikkerhetsventil [bar]",
    "Totalt vannvolum [l]",
    "Turledningstemperatur [°C]",
    "Returledningstemperatur [°C]",
    "Type væske"
  ]
  //list over blåsetrykk/Ladetrykk
  const trykkValg = [0.5,1,1.5,2,2.5,3,3.5,4,4.5,5]
  const trykkListe = trykkValg.map((trykk) =>(
    <option key={trykk} value={trykk}>{trykk}</option>
  ))
  const fluidValg = ["Vann","HX35","Glykol 5%","Glykol 10%","Glykol 15%","Glykol 20%","Glykol 25%","Glykol 30%","Glykol 35%","Glykol 40%","Glykol 45%","Glykol 50%"]
  //dropdownverdier
  const fluidListe = fluidValg.map((fluid) =>(
    <option key={fluid} value={fluid}>{fluid}</option>
  ))

  return(
    <div className="ekspansjonskar-inndataArea">
      <div className="ekspansjonskar-inndatalinje">
        <div className="ekspansjonskar-inndataTittel">
          {inndataFelter[0]}
        </div>
        <div className="ekspansjonskar-inndataVerdi">
          <select
            className="ekspansjonskar-select"
            name="ladetrykk"
            onChange={props.updateData}
            value={props.data.ladetrykk}
            >
            {trykkListe}
          </select>
        </div>
      </div>
      <div className="ekspansjonskar-inndatalinje">
        <div className="ekspansjonskar-inndataTittel">
          {inndataFelter[1]}
        </div>
        <div className="ekspansjonskar-inndataVerdi">
          <select
            name="sikkerhetsventil"
            className="ekspansjonskar-select"
            value={props.data.sikkerhetsventil}
            onChange={props.updateData}
            >
            {trykkListe}
          </select>
        </div>
      </div>
      <div className="ekspansjonskar-inndatalinje">
        <div className="ekspansjonskar-inndataTittel">
          {inndataFelter[2]}
        </div>
        <div className="ekspansjonskar-inndataVerdi">
          <input
            type="number"
            min="0"
            className="ekspansjonskar-input"
            name="vannvolum"
            value={props.data.vannvolum}
            onChange={props.updateData}
          />
        </div>
      </div>
      <div className="ekspansjonskar-inndatalinje">
        <div className="ekspansjonskar-inndataTittel">
          {inndataFelter[3]}
        </div>
        <div className="ekspansjonskar-inndataVerdi">
          <input
            type="number"
            min="0"
            className="ekspansjonskar-input"
            name="turtemp"
            value={props.data.turtemp}
            onChange={props.updateData}
          />
        </div>
      </div>
      <div className="ekspansjonskar-inndatalinje">
        <div className="ekspansjonskar-inndataTittel">
          {inndataFelter[4]}
        </div>
        <div className="ekspansjonskar-inndataVerdi">
          <input
            type="number"
            min="0"
            className="ekspansjonskar-input"
            name="returtemp"
            value={props.data.returtemp}
            onChange={props.updateData}
          />
        </div>
      </div>
      <div className="ekspansjonskar-inndatalinje">
        <div className="ekspansjonskar-inndataTittel">
          {inndataFelter[5]}
        </div>
        <div className="ekspansjonskar-inndataVerdi">
          <select
            name="ladetrykk"
            className="ekspansjonskar-select"
            value={props.data.fluid}
            onChange={props.updateData}
            >
            {fluidListe}
          </select>
        </div>
      </div>
    </div>
  )
}
