import React from 'react'

export default function Beregning(props){
  const ekspansjon = props.data === undefined ? 0 : props.data.ekspansjon
  

  return(
    <div className="ekspansjonskar-beregning">
      Total ekspansjon er estimert til {ekspansjon} L
    </div>

  )

}
