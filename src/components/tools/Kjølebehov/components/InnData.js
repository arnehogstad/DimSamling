import React from "react"
import { Byggeårs, Byggtypes } from "./data"
import * as beregn from "./beregn"
import "../../../../styles/kjølebehov/kjølebehov.css"
import { nanoid } from "@reduxjs/toolkit"


export default function InnData(props) {
  const [formData, setFormData] = React.useState(
    {
      Navn: "Prosjekt Navn",
      Referanse: "Navn",
      ByggType: "Småhus",
      Byggeår: "2017-nå",
      MaksT: 32,
      ØnsketT: 21,
      bra: 200,
      takhøyde: 3,
      takmotloft: 0,
      taktemp: 50,
      gulvmotluft: 0,
      veggmotnabo: 0,
      gjennvinn: 80,
      ventilasjonType: "Gjennvinner basert på TEK",
      luftmengde: 0,
      uid: nanoid()
    }
  )

  const { Navn, Referanse, ByggType, Byggeår, MaksT, ØnsketT, bra, takhøyde, takmotloft, taktemp, gulvmotluft, veggmotnabo, gjennvinn, ventilasjonType, luftmengde, uid } = formData


  //const [options, setOptions] = React.useState([])

  function handleChange(event) {

    const { name, value } = event.target

    setFormData(prevFormData => {
      return {
        ...prevFormData,
        [name]: value
      }
    })
  }



  let luft_effekt = {
    infiltrasjon: (beregn.Infiltrasjon(Byggeår, takhøyde, bra, MaksT, ØnsketT)),
    ventilasjon: (beregn.Ventilasjon(ventilasjonType, luftmengde, Byggeår, ByggType, bra, MaksT, ØnsketT, gjennvinn))
  }


  let trans_effekt = {
    vegg: beregn.Vegg_trans(Byggeår, bra, veggmotnabo, takhøyde, MaksT, ØnsketT),
    tak: beregn.Tak_trans(Byggeår, bra, takmotloft, MaksT, ØnsketT),
    loft: beregn.loft_trans(Byggeår, takmotloft, taktemp, ØnsketT),
    gulv: beregn.gulv_trans(Byggeår, gulvmotluft, MaksT, ØnsketT)

  }
  let annet_effekt = {
    utstyr: beregn.utstyr(ByggType, bra),
    personer: beregn.personer(ByggType, bra)
  }


  let effekt = [luft_effekt.infiltrasjon, luft_effekt.ventilasjon, trans_effekt.vegg, trans_effekt.tak, trans_effekt.loft, trans_effekt.gulv, annet_effekt.utstyr, annet_effekt.personer]

  return (
    <div className="formInnData">

      <form>
        <label className="label">Prosjekt Navn:
          <input
            className="input"
            type="text"
            onChange={handleChange}
            name="Navn"
            value={Navn}
          /></label>

        <label className="label">ABK Referanse:
          <input
            className="input"
            type="text"
            onChange={handleChange}
            name="Referanse"
            value={Referanse}
          /></label>


        <div className="selected">
          <label className="label" htmlFor="ByggType">Bygg Type:</label>
          <select
            className="select"
            id="ByggType"
            value={ByggType}
            onChange={handleChange}
            name="ByggType"
          >
            {Byggtypes.map((item) => (
              <option value={item}>{item}</option>
            ))}
          </select>
        </div>

        <div className="selected">
          <label className="label" htmlFor="Byggeår">Bygge år:</label>
          <select
            className="select"
            id="Byggeår"
            value={Byggeår}
            onChange={handleChange}
            name="Byggeår"
          >
            {Byggeårs.map((item) => (
              <option value={item}>{item}</option>
            ))}
          </select>
        </div>

        {0 ? (
          <>
            <label className="label">Maks mulig ute Temperatur:
              <input
                className="input"
                type="number"
                onChange={handleChange}
                name="MaksT"
                value={MaksT}
              /></label>
            <label className="label">Ønsket Intern Temperatur:
              <input
                className="input"
                type="number"
                onChange={handleChange}
                name="ØnsketT"
                value={ØnsketT}
              /></label>
          </>
        ) : null}

        <label className="label">Arealet BRA [m]:
          <input
            className="input"
            type="number"
            onChange={handleChange}
            name="bra"
            value={bra}
          /></label>

        <label className="label">Tak høyde [m]:
          <input
            className="input"
            type="number"
            onChange={handleChange}
            name="takhøyde"
            value={takhøyde}
          /></label>

        {ByggType === "Småhus" ? (
          <>
            <label className="label">Tak mot loft [m]:
              <input
                className="input"
                type="number"
                onChange={handleChange}
                name="takmotloft"
                value={takmotloft}
              /></label>

            <label className="label">Loft Temperatur [{'\u00b0'}C]:
              <input
                className="input"
                type="number"
                onChange={handleChange}
                name="taktemp"
                value={taktemp}
              /></label>

            <label className="label">Gulv mot  fri luft [{'\u00b0'}C]:
              <input
                className="input"
                type="number"
                onChange={handleChange}
                name="gulvmotluft"
                value={gulvmotluft}
              /></label>


            <label className="label">Vegg mot nabo [m]:
              <input
                className="input"
                type="number"
                onChange={handleChange}
                name="veggmotnabo"
                value={veggmotnabo}
              /></label>
          </>
        ) : null}



        <div className="selected">
          <label className="label" htmlFor="ventilasjonType">Ventilasjon:</label>
          <select
            className="select"
            id="ventilasjonType"
            value={ventilasjonType}
            onChange={handleChange}
            name="ventilasjonType"
          >
            <option>Gjennvinner basert på TEK</option>
            <option>Gjennvinner basert på luftmengde</option>
            <option>Uten gjennvinner basert på TEK </option>
            <option>Uten gjennvinner basert på luftmengde </option>
            <option>Uten ventilasjon</option>
          </select>
        </div>

        {ventilasjonType === "Gjennvinner basert på TEK" || ventilasjonType === "Gjennvinner basert på luftmengde" ? (
          <>
            <label className="label">Gjennvinner Virknningsgrad [%]:
              <input
                className="input"
                type="number"
                onChange={handleChange}
                name="gjennvinn"
                value={gjennvinn}
              /></label>
          </>
        ) : null}


        {ventilasjonType === "Uten gjennvinner basert på luftmengde" || ventilasjonType === "Gjennvinner basert på luftmengde" ? (
          <>
            <label className="label">Luft Mengde[m{'3'}/h]:
              <input
                className="input"
                type="number"
                onChange={handleChange}
                name="luftmengde"
                value={luftmengde}
              /></label>
          </>
        ) : null}


        {ventilasjonType === "Gjennvinner basert på TEK" || ventilasjonType === "Uten gjennvinner basert på TEK" ? (
          <>
            <p className="text">Luftmengde er {beregn.luftPrint(ByggType,bra)} m3/h</p>
          </>
        ) : null}

      </form>
      <button className="handlingsKnapp" onClick={() => {props.last_data(effekt);props.innDatas_data(formData)}}>Neste Steg</button>
    </div>
  )
}
