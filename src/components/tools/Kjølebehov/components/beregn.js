
import React from "react"
import { UData } from "./data"

////Luft last

export function Infiltrasjon (år,takhøyde,areal,MaksT,ØnsketT){
let u_infiltrasjon= UData.Infiltrasjon[år]*0.07
return Math.round(0.35*u_infiltrasjon*takhøyde*areal*(MaksT-ØnsketT))
}


export function Ventilasjon (år,byggtype,areal,MaksT,ØnsketT,gjennvinner){
let u_luftmengde = UData.luftmengde[byggtype]
let u_infiltrasjon= UData.Infiltrasjon[år]*0.07
return Math.round(0.35*u_luftmengde*areal*(1-gjennvinner/100)*(MaksT-ØnsketT)+u_infiltrasjon/3600*1.5*1000)
}

//////Transmission last

export function Vegg_trans (år,areal,veggmotnabo,takhøyde,MaksT,ØnsketT){
let u_vegg=UData.Fasade[år]
return Math.round( u_vegg*(Math.sqrt(areal)*4-veggmotnabo)*takhøyde*(MaksT-ØnsketT)  )
}


export function Tak_trans (år,areal,loft,MaksT,ØnsketT){
    let u_tak=UData.Tak[år]
    return Math.round( u_tak*(areal-loft)*(MaksT-ØnsketT)  )
}

export function loft_trans (år,loft,loftT,ØnsketT){
    let u_tak=UData.Tak[år]
    return Math.round( u_tak*(loft)*(loftT-ØnsketT)  )
}

export function gulv_trans (år,gulvmotluft,MaksT,ØnsketT){
    let u_gulv=UData.Gulv[år]
    return Math.round( u_gulv*(gulvmotluft)*(MaksT-ØnsketT)  )
}


////////Intern Last
export function Belysning (byggtype,areal){
   let u_belysning= UData.Belysning[byggtype]
    return Math.round( u_belysning*areal  )
}



export function utstyr (byggtype,areal){
    let u_utstyr= UData.utstyr[byggtype]
     return Math.round( u_utstyr*areal  )
 }


 
export function personer (byggtype,areal){
    let u_personer= UData.utstyr[byggtype]
     return Math.round( u_personer*areal  )
 }