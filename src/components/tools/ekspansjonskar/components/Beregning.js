import React from 'react'

export default function Beregning(props){
  const ekspansjon = props.inndata === undefined ? 0 : props.inndata.ekspansjon


  return(
    <div className="ekspansjonskar-beregning">
      Total ekspansjon er estimert til {ekspansjon} L
    </div>

  )

}
