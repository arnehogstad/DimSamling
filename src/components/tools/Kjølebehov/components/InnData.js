import React from "react"
import { Byggeårs, Byggtypes, UData } from "./data"
import * as beregn from "./beregn"


export default function InnData(props) {
  const [formData, setFormData] = React.useState(
    {
      Navn: "",
      Referanse: "",
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
      gjennvinn: 80
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


let effekt=[luft_effekt.infiltrasjon,luft_effekt.ventilasjon,trans_effekt.vegg,trans_effekt.gulv,trans_effekt.loft,trans_effekt.tak,trans_effekt.vegg,annet_effekt.personer,annet_effekt.utstyr]


  return (
    <div>
    <form className="form">
      <label>Prosjekt Navn:
        <input
          type="text"
          onChange={handleChange}
          name="Navn"
          value={formData.Navn}
        /></label>

      <label>ABK Referanse:
        <input
          type="text"
          onChange={handleChange}
          name="Referanse"
          value={formData.Referanse}
        /></label>

      <label htmlFor="ByggType">Bygg Type:</label>
      <select
        id="ByggType"
        value={formData.ByggType}
        onChange={handleChange}
        name="ByggType"
      >
        {Byggtypes.map((item) => (
          <option value={item}>{item}</option>
        ))}
      </select>

      <label htmlFor="Byggeår">Bygge år:</label>
      <select
        id="Byggeår"
        value={formData.Byggeår}
        onChange={handleChange}
        name="Byggeår"
      >
        {Byggeårs.map((item) => (
          <option value={item}>{item}</option>
        ))}
      </select>


      <label>Maks mulig ute Temperatur:
        <input
          type="number"
          onChange={handleChange}
          name="MaksT"
          value={formData.MaksT}
        /></label>


      <label>Ønsket Intern Temperatur:
        <input
          type="number"
          onChange={handleChange}
          name="ØnsketT"
          value={formData.ØnsketT}
        /></label>


      <label>Arealet BRA [m]:
        <input
          type="number"
          onChange={handleChange}
          name="bra"
          value={formData.bra}
        /></label>

      <label>Tak høyde [m]:
        <input
          type="number"
          onChange={handleChange}
          name="takhøyde"
          value={formData.takhøyde}
        /></label>

      <label>Tak mot loft [m]:
        <input
          type="number"
          onChange={handleChange}
          name="takmotloft"
          value={formData.takmotloft}
        /></label>

      <label>Loft Temperatur [C]:
        <input
          type="number"
          onChange={handleChange}
          name="taktemp"
          value={formData.taktemp}
        /></label>

      <label>Gulv mot  fri luft [C]:
        <input
          type="number"
          onChange={handleChange}
          name="gulvmotluft"
          value={formData.gulvmotluft}
        /></label>


      <label>Vegg mot nabo [m]:
        <input
          type="number"
          onChange={handleChange}
          name="veggmotnabo"
          value={formData.veggmotnabo}
        /></label>

      <label>Gjennvinner Virknningsgrad [m]:
        <input
          type="number"
          onChange={handleChange}
          name="gjennvinn"
          value={formData.gjennvinn}
        /></label>

    </form>
    <button className="handlingsKnapp" onClick={() => props.last_data(effekt)}>Oppdater lista</button>
</div>
  )
}
