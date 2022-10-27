import React from "react"
import { isLeilighetFucntion } from "./BeregnVV"
import { AquaEfficencyData } from "./StaticData/VVStaticData"

export default function AquaEfficency(props) {

    let isLeilighet = isLeilighetFucntion(props.kWhEnheter) ///Decides if all of the units are apartments or not

    let antallSmåLeilighet = 0
    let antallStorLeilighet = 0

    let { storeLeilighet, småLeilighet, kW, volume, vpEffekt, artikkel, artikkelNr } = AquaEfficencyData

    let unit = [0]

    if (isLeilighet === true) {

        props.kWhEnheter.forEach(element => {
            if (element.Navn === "Leilighet (3+ personer)") antallStorLeilighet += element.Antall
            if (element.Navn === "Leilighet (2-3 personer)") antallSmåLeilighet += element.Antall
            if (element.Navn === "Leilighet (1-2 personer)") antallSmåLeilighet += element.Antall
        })

        let kWTotal = (kWhData(antallSmåLeilighet, "små") ** 2 + kWhData(antallStorLeilighet, "store") ** 2) ** 0.5  ///estimert effekt med samtidighet faktor
        unit = unitVelger(kWTotal) ///velger riktig unit 

        }else if(isLeilighet === false){ ////if the units are not apartments then KWH from CTC is used
        let kWTotal = props.kWh
        unit = unitVelger(kWTotal)
    }
    
    function kWhData(antall, type) {

        if (type === "små") {
            if (antall === 0) return 0
            const isLarger = (arrayElement) => arrayElement >= antall
            let arrayIndexhigher = (småLeilighet.findIndex(isLarger) ? småLeilighet.findIndex(isLarger) : 1)
            let arrayIndexlower = arrayIndexhigher - 1
            let kWTotal = kW[arrayIndexlower] + (antall - småLeilighet[arrayIndexlower]) * (kW[arrayIndexhigher] - kW[arrayIndexlower]) / (småLeilighet[arrayIndexhigher] - småLeilighet[arrayIndexlower])
            console.log("små", kWTotal)
            return kWTotal
            //the formula for interpolatins is:
            //y=y1+(x-x1)*(y2-y1)/(x2-x1)    
        }
        if (type === "store") {
            if (antall === 0) return 0
            const isLarger = (arrayElement) => arrayElement >= antall
            let arrayIndexhigher = (storeLeilighet.findIndex(isLarger) ? storeLeilighet.findIndex(isLarger) : 1)
            let arrayIndexlower = arrayIndexhigher - 1
            let kWTotal = kW[arrayIndexlower] + (antall - storeLeilighet[arrayIndexlower]) * (kW[arrayIndexhigher] - kW[arrayIndexlower]) / (storeLeilighet[arrayIndexhigher] - storeLeilighet[arrayIndexlower])

            return kWTotal
            //the formula for interpolatins is:
            //y=y1+(x-x1)*(y2-y1)/(x2-x1)    
        }



    }
    function unitVelger(kWTotal) {
        const isLarger = (arrayElement) => arrayElement >= kWTotal
        let arrayIndex = kW.findIndex(isLarger)

        let unit = { navn: artikkel[arrayIndex], AkVol: volume[arrayIndex], Effekt: vpEffekt[arrayIndex], artikkelNumber: artikkelNr[arrayIndex] }
        return unit
    }




    return (
        <div>
            <h3>AquaEfficency</h3>

            {unit.navn ?    //checks if the unit is defined, not defined means too big  demand.
                <div>
                    <p >Anbefalt system er  <a href={`https://www.abkqviller.no/sok/?query=${unit.artikkelNumber}`}>{unit.navn}</a> med artikkelnummer: {unit.artikkelNumber}</p>
                    <p>Minimum anbefalt akkumulerings tanks volum er {unit.AkVol} liter.</p>
                    <p>Minimum anbefalt effekt av varmepumpe er {unit.Effekt} kW.</p>
                </div>
                : <p>Tappe vann behov er for stor for en AquaEfficency modul. Må fordeles på 2 stk. </p>}


            {isLeilighet ?
                <p style={{ fontStyle: "italic", fontWeight: "bold", fontSize: 10 }}>Beregning er basert på Cetetherm methodik for boligblokker.</p>
                : <p style={{ fontStyle: "italic", fontWeight: "bold", fontSize: 10 }}>Beregning metodik for byggtyper utenom boligblokk er estimater og er ikke basert på veiledende verdier fra Cetetherm, da det ikke er gitt. </p>
            }


        </div>

    )
}