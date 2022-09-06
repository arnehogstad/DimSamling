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
      uid: nanoid()
    }
  )



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
    infiltrasjon: (beregn.Infiltrasjon(formData.Byggeår, formData.takhøyde, formData.bra, formData.MaksT, formData.ØnsketT)),
    ventilasjon: (beregn.Ventilasjon(formData.Byggeår, formData.ByggType, formData.bra, formData.MaksT, formData.ØnsketT, formData.gjennvinn))
  }


  let trans_effekt = {
    vegg: beregn.Vegg_trans(formData.Byggeår, formData.bra, formData.veggmotnabo, formData.takhøyde, formData.MaksT, formData.ØnsketT),
    tak: beregn.Tak_trans(formData.Byggeår, formData.bra, formData.takmotloft, formData.MaksT, formData.ØnsketT),
    loft: beregn.loft_trans(formData.Byggeår, formData.takmotloft, formData.taktemp, formData.ØnsketT),
    gulv: beregn.gulv_trans(formData.Byggeår, formData.gulvmotluft, formData.MaksT, formData.ØnsketT)

  }
  let annet_effekt = {
    utstyr: beregn.utstyr(formData.ByggType, formData.bra),
    personer: beregn.personer(formData.ByggType, formData.bra)
  }


  let effekt = [luft_effekt.infiltrasjon, luft_effekt.ventilasjon, trans_effekt.vegg, trans_effekt.tak, trans_effekt.loft, trans_effekt.gulv, annet_effekt.utstyr, annet_effekt.personer]


  return (
    <div className="formInnData">

      <form >

        <label className="label">Prosjekt Navn:
          <input
            className="input"
            type="text"
            onChange={handleChange}
            name="Navn"
            value={formData.Navn}
          /></label>

        <label className="label">ABK Referanse:
          <input
            className="input"
            type="text"
            onChange={handleChange}
            name="Referanse"
            value={formData.Referanse}
          /></label>

        <label className="label" htmlFor="ByggType">Bygg Type:</label>
        <select
          className="select"
          id="ByggType"
          value={formData.ByggType}
          onChange={handleChange}
          name="ByggType"
        >
          {Byggtypes.map((item) => (
            <option value={item}>{item}</option>
          ))}
        </select>

        <label className="label" htmlFor="Byggeår">Bygge år:</label>
        <select
          className="select"
          id="Byggeår"
          value={formData.Byggeår}
          onChange={handleChange}
          name="Byggeår"
        >
          {Byggeårs.map((item) => (
            <option value={item}>{item}</option>
          ))}
        </select>


        <label className="label">Maks mulig ute Temperatur:
          <input
            className="input"
            type="number"
            onChange={handleChange}
            name="MaksT"
            value={formData.MaksT}
          /></label>


        <label className="label">Ønsket Intern Temperatur:
          <input
            className="input"
            type="number"
            onChange={handleChange}
            name="ØnsketT"
            value={formData.ØnsketT}
          /></label>


        <label className="label">Arealet BRA [m]:
          <input
            className="input"
            type="number"
            onChange={handleChange}
            name="bra"
            value={formData.bra}
          /></label>

        <label className="label">Tak høyde [m]:
          <input
            className="input"
            type="number"
            onChange={handleChange}
            name="takhøyde"
            value={formData.takhøyde}
          /></label>

        <label className="label">Tak mot loft [m]:
          <input
            className="input"
            type="number"
            onChange={handleChange}
            name="takmotloft"
            value={formData.takmotloft}
          /></label>

        <label className="label">Loft Temperatur [C]:
          <input
            className="input"
            type="number"
            onChange={handleChange}
            name="taktemp"
            value={formData.taktemp}
          /></label>

        <label className="label">Gulv mot  fri luft [C]:
          <input
            className="input"
            type="number"
            onChange={handleChange}
            name="gulvmotluft"
            value={formData.gulvmotluft}
          /></label>


        <label className="label">Vegg mot nabo [m]:
          <input
            className="input"
            type="number"
            onChange={handleChange}
            name="veggmotnabo"
            value={formData.veggmotnabo}
          /></label>

        <label className="label">Gjennvinner Virknningsgrad [%]:
          <input
            className="input"
            type="number"
            onChange={handleChange}
            name="gjennvinn"
            value={formData.gjennvinn}
          /></label>

      </form>
      <button className="handlingsKnapp" onClick={() => props.last_data(effekt)}>Lagre date</button>
    </div>
  )
}
