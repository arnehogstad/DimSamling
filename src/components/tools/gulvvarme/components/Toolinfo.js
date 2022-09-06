import React from 'react'

export default function Toolinfo(){

  /**
  <div className="nav-placement">
    <div className="nav-pos">DIMENSJONERINGSVERKTØY</div>
    <div className="nav-pos">/</div>
    <div className="nav-pos nav-pos-active" >GULVVARME</div>
  </div>
  **/


  return (
    <div className="current-placement">
      <div>
        <div className="tool-description">
          <div>Dette er et verktøy for å automatisk generere en handlekurv basert på faktiske prosjektdata</div>
          <div>Nedenfor kan du legge inn en eller flere boenheter og rom for rom bestemme rørtype og CC</div>
          <div>Uttaket beregnes ihht håndbok for gulvvarme. Ettersom føringsveier er ukjente antas 10% av kurslengde til transport</div>
          <div>Bladibladi andre interessante ting om verktøyet</div>
        </div>
      </div>
    </div>

  )

}
