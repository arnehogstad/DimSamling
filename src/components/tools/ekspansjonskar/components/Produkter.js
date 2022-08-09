import React from 'react'

export default function Produkter(props){

  const [produkt,setProdukt] = React.useState([])

  const produktElementer =
    produkt.length === 0 ?
    <div>Finner ingen passende produkter!</div> :
    produkt.map((name) =>
    (
    <div key={name}>{name}</div>
  ))


  function getProducts(){
    props.setShowResult(true)
  }


  return(
    <div className="ekspansjonskar-beregning">
      <button
        className="handlingsKnapp"
        onClick={getProducts}
        >
        Finn passende produkter
      </button>
      {props.showResult === true ?
      <div className="ekspansjonskar-beregning">
      {produktElementer}
      </div>
      :
      ""}
    </div>
  )

}
