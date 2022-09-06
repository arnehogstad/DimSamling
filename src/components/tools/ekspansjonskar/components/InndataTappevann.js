import React from 'react'

export default function InndataTappevann(props){

  //inndatafelter
  const inndataFelter = [
    "Nettvannstrykk [bar]",
    "Ladetrykk [bar]",
    "Blåsetrykk sikkerhetsventil [bar]",
    "Totalt vannvolum [l]",
    "Settpunkt tappevann [°C]",
  ]
  //list over blåsetrykk/Ladetrykk
  const trykkValg = [3,3.5,4,4.5,5,5.5,6,6.5,7,7.5,8,8.5,9,9.5,10]
  const trykkListe = trykkValg.map((trykk) =>(
    <option key={trykk} value={trykk}>{trykk}</option>
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
            name="nettvann"
            onChange={props.updateData}
            value={props.data.nettvann}
            >
            {trykkListe}
          </select>
        </div>
      </div>
      <div className="ekspansjonskar-inndatalinje">
        <div className="ekspansjonskar-inndataTittel">
          {inndataFelter[1]}
        </div>
        <div className="ekspansjonskar-inndataVerdi inndata-disabled">
          <input
            className="ekspansjonskar-input inndata-disabled"
            name="nettvann"
            value={props.data.ladetrykk}
            disabled
            >
          </input>
        </div>
      </div>
      <div className="ekspansjonskar-inndatalinje">
        <div className="ekspansjonskar-inndataTittel">
          {inndataFelter[2]}
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
          {inndataFelter[3]}
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
          {inndataFelter[4]}
        </div>
        <div className="ekspansjonskar-inndataVerdi">
          <input
            type="number"
            min="0"
            className="ekspansjonskar-input"
            name="temperatur"
            value={props.data.temperatur}
            onChange={props.updateData}
          />
        </div>
      </div>
    </div>
  )
}
