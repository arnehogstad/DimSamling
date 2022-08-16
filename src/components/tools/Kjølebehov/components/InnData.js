import React from "react"
import {Byggeårs, Byggtypes } from "./data"

export default function InnData() {
    const [formData, setFormData] = React.useState(
        {
            Navn: "", 
            Referanse: "", 
            ByggType: "Småhus",
            Byggeår: "2017-nå",
            MaksT:32,
            ØnsketT:21,
            bra:200,
            takhøyde:3,
            takmotloft:0,
            taktemp:50,
            gulvmotluft:0,
            veggmotnabo:0
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
    console.log(formData.MaksT * 2)
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
          name="takhøyde"
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



    </form>
  )
}
