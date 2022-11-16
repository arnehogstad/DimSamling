import React, { Fragment } from "react"
import { elEnergiForbrukAquaefficency, isLeilighetFucntion } from "./BeregnVV"
import { AquaEfficencyData } from "./components/StaticData/VVStaticData"


export default function AquaEfficency(props) {

    let kWh = props.kWhEnheter
    let { ByggType, antall, isEkonomiInkludert, SCOP, strømpris, perPersonVV, netVannTemp, tappeVannTemp } = props.prosjektData


    let isLeilighet = isLeilighetFucntion(ByggType) ///Decides if all of the units are apartments or not

    let antallSmåLeilighet = 0
    let antallStorLeilighet = 0

    let { storeLeilighet, småLeilighet, kW, volume, vpEffekt, artikkel, artikkelNr } = AquaEfficencyData

    let unit = [0]

    if (isLeilighet === true) {

        if (ByggType === "Leilighet (3+ personer)") antallStorLeilighet += antall
        if (ByggType === "Leilighet (2-3 personer)") antallSmåLeilighet += antall
        if (ByggType === "Leilighet (1-2 personer)") antallSmåLeilighet += antall

        let kWTotal = (kWhData(antallSmåLeilighet, "små") ** 2 + kWhData(antallStorLeilighet, "store") ** 2) ** 0.5  ///estimert effekt med samtidighet faktor
        unit = unitVelger(kWTotal) ///velger riktig unit 

    } else if (isLeilighet === false) { ////if the units are not apartments then KWH from CTC is used
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


    let [totalenergiForbruk, totalVPenergiForbruk, energiSpart, energiSpartProsent, SpartKroner] = elEnergiForbrukAquaefficency(ByggType, antall, perPersonVV, netVannTemp, tappeVannTemp, SCOP, strømpris)


    let resultstoPrint = {
        unit: unit,
        "Total energi forbruk": totalenergiForbruk,
        "Total varmepumpe energi forbruk": totalVPenergiForbruk,
        "Energi spart": energiSpart,
        "Energi spart i prosent": energiSpartProsent,
        "Spart kroner": SpartKroner,
    }



    return (
        <div>
            <h3>AquaEfficency</h3>

            {unit.ByggType ?    //checks if the unit is defined, not defined means too big  demand.
                <div>
                    <ul>
                        <li >Anbefalt system er  <a href={`https://www.abkqviller.no/sok/?query=${unit.artikkelNumber}`} target="_blank">{unit.ByggType}</a>. </li>
                        <li>Artikkelnummer: {unit.artikkelNumber}.</li>
                        <li>Minimum anbefalt akkumulerings tanks volum er {unit.AkVol} liter.</li>
                        <li>Minimum anbefalt effekt av varmepumpe er {unit.Effekt} kW.</li>
                    </ul>
                </div>
                : <p>Tappe vann behov er for stor for en AquaEfficency modul. Må fordeles på 2 stk. </p>}


            {isLeilighet ?
                <p className="longText" style={{ fontStyle: "italic", fontWeight: "bold", fontSize: 10 }}>Beregning er basert på Cetetherm methodik for boligblokker.</p>
                : <p className="longText" style={{ fontStyle: "italic", fontWeight: "bold", fontSize: 10 }}>Beregning metodik for byggtyper utenom boligblokk er estimater og er ikke basert på veiledende verdier fra Cetetherm, da det ikke er gitt. </p>
            }


            {(isLeilighetFucntion(ByggType) && isEkonomiInkludert === "Ja") ?
                <Fragment>
                    <h3>Ekonomisk Beregning:</h3>
                    <ul >
                        <li>Årlig strømforbruk ved bruk av el-kjell ville ha vært {totalenergiForbruk} kWh.</li>
                        <li>Årlig strømforbruk av varmepumpe vil være {totalVPenergiForbruk} kWh.</li>
                        <li>Strømforbruk er redusert med {energiSpartProsent} % ved bruk av varmepumpe .</li>
                        <li>Årlig energisparing ved bruk av varmepumpe er {energiSpart} kWh.</li>
                        <li>Årlig sparing ved bruk av varmepumpe er {SpartKroner} NOK.</li>
                    </ul>

                </Fragment>
                : null}

            <button className="KJButtons" onClick={(e) => { props.AquaEfficencyResultat(e, resultstoPrint); props.isPrintFn(e) }}> Print data </button>


        </div>

    )
}