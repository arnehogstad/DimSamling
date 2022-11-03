import React from "react"
import { isLeilighetFucntion } from "./BeregnVV"
import { AquaEfficencyData } from "./StaticData/VVStaticData"

export default function AquaEfficency(props) {

    let kWh = props.kWhEnheter
    let { ByggType, antall,isEkonomiInkludert, SCOP, strømpris } = props.prosjektData
    

    let isLeilighet = isLeilighetFucntion(ByggType) ///Decides if all of the units are apartments or not

    let antallSmåLeilighet = 0
    let antallStorLeilighet = 0

    let { storeLeilighet, småLeilighet, kW, volume, vpEffekt, artikkel, artikkelNr } = AquaEfficencyData

    let unit = [0]

    if (isLeilighet === true) {

            if (ByggType === "Leilighet (3+ personer)")  antallStorLeilighet += antall
            if (ByggType === "Leilighet (2-3 personer)") antallSmåLeilighet += antall
            if (ByggType === "Leilighet (1-2 personer)") antallSmåLeilighet += antall
        
        let kWTotal = (kWhData(antallSmåLeilighet, "små") ** 2 + kWhData(antallStorLeilighet, "store") ** 2) ** 0.5  ///estimert effekt med samtidighet faktor
        unit = unitVelger(kWTotal) ///velger riktig unit 

        }else if(isLeilighet === false){ ////if the units are not apartments then KWH from CTC is used
         unit = unitVelger(kWh)
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

        let unit = { ByggType: artikkel[arrayIndex], AkVol: volume[arrayIndex], Effekt: vpEffekt[arrayIndex], artikkelNumber: artikkelNr[arrayIndex] }
        return unit
    }




    return (
        <div>
            <h3>AquaEfficency</h3>

            {unit.ByggType ?    //checks if the unit is defined, not defined means too big  demand.
                <div>
                    <ul>
                    <li >Anbefalt system er  <a href={`https://www.abkqviller.no/sok/?query=${unit.artikkelNumber}` } target="_blank">{unit.ByggType}</a>. </li>
                    <li>Artikkelnummer: {unit.artikkelNumber}.</li>
                    <li>Minimum anbefalt akkumulerings tanks volum er {unit.AkVol} liter.</li>
                    <li>Minimum anbefalt effekt av varmepumpe er {unit.Effekt} kW.</li>
                    </ul>
                </div>
                : <p>Tappe vann behov er for stor for en AquaEfficency modul. Må fordeles på 2 stk. </p>}


            {isLeilighet ?
                <p  className="longText"  style={{ fontStyle: "italic", fontWeight: "bold", fontSize: 10 }}>Beregning er basert på Cetetherm methodik for boligblokker.</p>
                : <p className="longText" style={{ fontStyle: "italic", fontWeight: "bold", fontSize: 10 }}>Beregning metodik for byggtyper utenom boligblokk er estimater og er ikke basert på veiledende verdier fra Cetetherm, da det ikke er gitt. </p>
            }


        </div>

    )
}