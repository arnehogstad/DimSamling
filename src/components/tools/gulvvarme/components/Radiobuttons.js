import React from 'react'

export default function Radiobuttons(props){

  const styles = {
      display: props.currentUnitId === props.unitId ? "inline-block" : "none"
  }
  const radioStyle = {
    display: ""
  }
  const [standard,setStandard] = React.useState(
    props.unit.termostatType === "ALPHA" ? ["Digital kun på bad","Digital på alle rom"] :
    props.unit.termostatType !== "Uten termostat" ? ["IR kun på bad","IR i alle rom"] :
    ["N/A","N/A"]
  )

  function toggleText(event){
    const {value} = event.target
    if (value === "ALPHA"){
      if(standard[0]!=="Digital kun på bad"){
        setStandard(["Digital kun på bad","Digital på alle rom"])
      }
    }else if (value !== "Uten termostat"){
      if(standard[0]!=="IR kun på bad"){
        setStandard(["IR kun på bad","IR i alle rom"])
      }
    }else{
      setStandard(["N/A","N/A"])
    }
  }

  return (
    <div className="radioButtonDiv" style={styles}>
      <div className="radioButtonDiv-overskrift">
        TEKNISK ROM {props.unitName.toUpperCase()}
      </div>
      <fieldset>
        <legend>Type fordelerskap</legend>
        <input
             type="radio"
             id={`På vegg ${props.unitId}`}
             name={`fordelerskap${props.unitId}`}
             value="På vegg"
             checked={props.unit.fordelerskap === "På vegg"}
             onChange={(event) => props.radioButtonClick(event, props.unitId)}
         />
        <label htmlFor={`På vegg ${props.unitId}`}>På vegg</label>
        <br />

        <input
             type="radio"
             id={`I vegg ${props.unitId}`}
             name={`fordelerskap${props.unitId}`}
             value="I vegg"
             checked={props.unit.fordelerskap === "I vegg"}
             onChange={(event) => props.radioButtonClick(event, props.unitId)}
         />
        <label htmlFor={`I vegg ${props.unitId}`}>I vegg</label>
        <br />

        <input
             type="radio"
             id={`Uten skap ${props.unitId}`}
             name={`fordelerskap${props.unitId}`}
             value="Uten skap"
             checked={props.unit.fordelerskap === "Uten skap"}
             onChange={(event) => props.radioButtonClick(event, props.unitId)}
         />
        <label htmlFor={`Uten skap ${props.unitId}`}>Uten skap</label>
        <br />

      </fieldset>
      <fieldset>
        <legend>Type fordelerstokk</legend>
        <input
             type="radio"
             id={`Med bypass ${props.unitId}`}
             name={`fordelerstokk${props.unitId}`}
             value="Med bypass"
             checked={props.unit.fordelerstokk === "Med bypass"}
             onChange={(event) => props.radioButtonClick(event, props.unitId)}
         />
        <label htmlFor={`Med bypass ${props.unitId}`}>Med bypass</label>
        <br />

        <input
             type="radio"
             id={`Uten bypass ${props.unitId}`}
             name={`fordelerstokk${props.unitId}`}
             value="Uten bypass"
             checked={props.unit.fordelerstokk === "Uten bypass"}
             onChange={(event) => props.radioButtonClick(event, props.unitId)}
         />
        <label htmlFor={`Uten bypass ${props.unitId}`}>Uten bypass</label>
        <br />

      </fieldset>
      <fieldset>
        <legend>Type termostat</legend>
        <input
             type="radio"
             id={`ALPHA ${props.unitId}`}
             name={`termostatType${props.unitId}`}
             value="ALPHA"
             onClick={(event) => toggleText(event)}
             checked={props.unit.termostatType === "ALPHA"}
             onChange={(event) => props.radioButtonClick(event, props.unitId)}
         />
        <label htmlFor={`ALPHA ${props.unitId}`}>ALPHA</label>
        <br />

        <input
             type="radio"
             id={`ICON (uten appstyring) ${props.unitId}`}
             name={`termostatType${props.unitId}`}
             value="ICON (uten appstyring)"
             onClick={(event) => toggleText(event)}
             checked={props.unit.termostatType === "ICON (uten appstyring)"}
             onChange={(event) => props.radioButtonClick(event, props.unitId)}
         />
        <label htmlFor={`ICON (uten appstyring) ${props.unitId}`}>ICON (uten appstyring)</label>
        <br />

        <input
             type="radio"
             id={`ICON (med appstyring) ${props.unitId}`}
             name={`termostatType${props.unitId}`}
             value="ICON (med appstyring)"
             onClick={(event) => toggleText(event)}
             checked={props.unit.termostatType === "ICON (med appstyring)"}
             onChange={(event) => props.radioButtonClick(event, props.unitId)}
         />
        <label htmlFor={`ICON (med appstyring) ${props.unitId}`}>ICON (med appstyring)</label>
        <br />

        <input
             type="radio"
             id={`Uten termostat ${props.unitId}`}
             name={`termostatType${props.unitId}`}
             value="Uten termostat"
             onClick={(event) => toggleText(event)}
             checked={props.unit.termostatType === "Uten termostat"}
             onChange={(event) => props.radioButtonClick(event, props.unitId)}
         />
        <label htmlFor={`Uten termostat ${props.unitId}`}>Uten termostat</label>
        <br />


        <fieldset disabled = {standard[0] === "N/A" ? true : false}>
          <legend>Termostattype plassering</legend>
          <input
               type="radio"
               id={`kun på bad ${props.unitId}`}
               name={`termostatStandard${props.unitId}`}
               value="kun på bad"
               checked={props.unit.termostatStandard === "kun på bad"}
               onChange={(event) => props.radioButtonClick(event, props.unitId)}
           />
          <label htmlFor={`kun på bad ${props.unitId}`}>{standard[0]}</label>
          <br />

          <input
               type="radio"
               id={`alle rom ${props.unitId}`}
               name={`termostatStandard${props.unitId}`}
               value="alle rom"
               checked={props.unit.termostatStandard === "alle rom"}
               onChange={(event) => props.radioButtonClick(event, props.unitId)}
           />
          <label htmlFor={`alle rom ${props.unitId}`}>{standard[1]}</label>
          <br />

        </fieldset>
      </fieldset>
  </div>

  )
}
