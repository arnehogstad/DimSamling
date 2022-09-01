import React from "react"
import { Byggeårs, Byggtypes, UData } from "./data"
import * as beregn from "./beregn"


export default function InnData() {
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

  //console.log(beregn.Infiltrasjon(formData.Byggeår,formData.takhøyde,formData.bra,formData.MaksT,formData.ØnsketT))
  //console.log(beregn.Ventilasjon(formData.Byggeår,formData.ByggType,formData.bra,formData.MaksT,formData.ØnsketT,formData.gjennvinn))
  //console.log(beregn.Vegg_trans(formData.Byggeår,formData.bra,formData.veggmotnabo,formData.takhøyde,formData.MaksT,formData.ØnsketT))
  //console.log(beregn.Tak_trans(formData.Byggeår,formData.bra,formData.takmotloft,formData.MaksT,formData.ØnsketT))
  //console.log(beregn.loft_trans(formData.Byggeår,formData.takmotloft,formData.taktemp,formData.ØnsketT))
  //console.log(beregn.gulv_trans(formData.Byggeår, formData.gulvmotluft, formData.MaksT, formData.ØnsketT))
//console.log(beregn.utstyr(formData.ByggType,formData.bra))

  function handleChange(event) {

    const { name, value } = event.target
    setFormData(prevFormData => {
      return {
        ...prevFormData,
        [name]: value
      }
    })
  }

  return (
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
  )
}
