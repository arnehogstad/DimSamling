import React from 'react'

export default function Produkter(props){

  const [produkt,setProdukt] = React.useState([])
  const prodHeadlines =
  <div className="ekspansjonskar-resultatOverskrift" key="headLine">
    <div className= "ekspansjonskar-resultatcelle eksp-resultat-large">Produkt</div>
    <div className= "ekspansjonskar-resultatcelle eksp-resultat-medium">Artikkelnr</div>
    <div className= "ekspansjonskar-resultatcelle eksp-resultat-small">Volum</div>
    <div className= "ekspansjonskar-resultatcelle eksp-resultat-small">Maks Temp</div>
    <div className= "ekspansjonskar-resultatcelle eksp-resultat-medium">Maks Trykk</div>
    <div className= "ekspansjonskar-resultatcelle eksp-resultat-medium">Lenke</div>
  </div>
  //<div className= "ekspansjonskar-resultatcelle eksp-resultat-medium">Maks fortrykk</div>

  var produktElementer = ""

  function getProducts(){
    //returnerer alle varer som har passende array
    //trykk og type skal også være korrekt
    let prodArray = props.products.filter(produkt =>
      produkt.Volum >= props.expansion.minimumVolum &&
      produkt.Volum <= props.expansion.minimumVolum*2 &&
      //produkt.MaksTemp >= props.expansion.arbeidsTemp &&
      produkt.MinTemp <= props.expansion.arbeidsTemp &&
      produkt.MaksSysTrykk >= props.expansion.sikkerhetsTrykk &&
      //produkt.MaksForTrykk>= props.expansion.arbeidsTrykk &&
      (produkt.Type === props.type || produkt.Type === 'alle' || produkt.Type === props.type+"gjstr")
    )
    produktElementer =
      prodArray.length === 0 ?
      <div key={""}>Finner ingen produkter</div>
      :
      prodArray.map((produkt) =>
      (
      <div className="ekspansjonskar-resultatLinje" key={produkt.Artikkelnr}>
        <div className= "ekspansjonskar-resultatcelle eksp-resultat-large">{produkt.Navn}</div>
        <div className= "ekspansjonskar-resultatcelle eksp-resultat-medium">{produkt.Artikkelnr}</div>
        <div className= "ekspansjonskar-resultatcelle eksp-resultat-small">{produkt.Volum} l</div>
        <div className= "ekspansjonskar-resultatcelle eksp-resultat-small">{produkt.MaksTemp} °C</div>
        <div className= "ekspansjonskar-resultatcelle eksp-resultat-medium">{produkt.MaksSysTrykk} bar</div>
        <div className= "ekspansjonskar-resultatcelle eksp-resultat-medium"><a href={produkt.Lenke} target="_blank">Se på nettbutikk</a></div>
      </div>
      //<div className= "ekspansjonskar-resultatcelle eksp-resultat-medium">{produkt.MaksForTrykk} bar</div>
    ))
    setProdukt([prodHeadlines,produktElementer])
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
      {produkt}
      </div>
      :
      ""}
    </div>
  )

}
