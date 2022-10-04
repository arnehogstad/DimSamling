
import React from "react"
import { UData } from "../../../static/staticData"

////Luft last

export function Infiltrasjon(år, takhøyde, areal, MaksT, ØnsketT) {
    let u_infiltrasjon = UData.Infiltrasjon[år] * 0.07
    return Math.round(0.35 * u_infiltrasjon * takhøyde * areal * (MaksT - ØnsketT))
}

export function luftPrint (byggtype,areal) {
    return UData.luftmengde[byggtype]*areal
}

export function Ventilasjon(ventilasjonType, luftmengdeIN, år, byggtype, areal, MaksT, ØnsketT, gjennvinner) {
    let u_luftmengde = UData.luftmengde[byggtype]
    let u_infiltrasjon = UData.Infiltrasjon[år] * 0.07

    if (ventilasjonType === "Gjennvinner basert på TEK") {
        return Math.round(0.35 * u_luftmengde * areal * (1 - gjennvinner / 100) * (MaksT - ØnsketT) + u_infiltrasjon / 3600 * 1.5 * 1000)
    } else if(ventilasjonType === "Gjennvinner basert på luftmengde") {
        return Math.round(0.35 * luftmengdeIN * (MaksT - ØnsketT) * (1 - gjennvinner / 100))
    } else if(ventilasjonType === "Uten gjennvinner basert på TEK"){
        return Math.round(0.35 * u_luftmengde * areal * (MaksT - ØnsketT) + u_infiltrasjon / 3600 * 1.5 * 1000)
    } else if(ventilasjonType === "Uten gjennvinner basert på luftmengde"){
        return Math.round(0.35 * luftmengdeIN * (MaksT - ØnsketT))
    }else if(ventilasjonType === "Uten ventilasjon"){
        return 0
    }
}

    //////Transmission last

    export function Vegg_trans(år, areal, veggmotnabo, takhøyde, MaksT, ØnsketT) {
        let u_vegg = UData.Fasade[år]
        return Math.round(u_vegg * (Math.sqrt(areal) * 4 - veggmotnabo) * takhøyde * (MaksT - ØnsketT))
    }

      
    export function Tak_trans(år, areal, loft, MaksT, ØnsketT) {
        let u_tak = UData.Tak[år]
        return Math.round(u_tak * (areal - loft) * (MaksT - ØnsketT))
    }

    export function loft_trans(år, loft, loftT, ØnsketT) {
        let u_tak = UData.Tak[år]
        return Math.round(u_tak * (loft) * (loftT - ØnsketT))
    }

    export function gulv_trans(år, gulvmotluft, MaksT, ØnsketT) {
        let u_gulv = UData.Gulv[år]
        return Math.round(u_gulv * (gulvmotluft) * (MaksT - ØnsketT))
    }

    export function Vindu_trans(år, areal, MaksT, ØnsketT) {
        let u_vindu = UData.Vindu[år]
        return Math.round(u_vindu * areal * (MaksT - ØnsketT))
    }


    ////////Intern Last
    export function belysning(byggtype, areal) {
        let u_belysning = UData.Belysning[byggtype]
        return Math.round(u_belysning * areal)
    }



    export function utstyr(byggtype, areal) {
        let u_utstyr = UData.utstyr[byggtype]
        return Math.round(u_utstyr * areal)
    }



    export function personer(byggtype, areal) {
        let u_personer = UData.personer[byggtype]
        return Math.round(u_personer * areal)
    }