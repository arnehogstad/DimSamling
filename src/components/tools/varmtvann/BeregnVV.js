import React from "react"
import { byggTypeVVInnDataType, kWhDataFraCTC } from "./StaticData/VVStaticData"



export function kWhData(ByggType, antall) { ///Finds the Kwh Data from CTC table based on interpolation of values
    const isLarger = (arrayElement) => arrayElement >= parseInt(antall)
    let arrayIndexhigher = byggTypeVVInnDataType[ByggType].verdier.findIndex(isLarger)
    let arrayIndexlower = arrayIndexhigher - 1

    let kWh = kWhDataFraCTC[arrayIndexlower] + (parseInt(antall) - byggTypeVVInnDataType[ByggType].verdier[arrayIndexlower]) * (kWhDataFraCTC[arrayIndexhigher] - kWhDataFraCTC[arrayIndexlower]) / (byggTypeVVInnDataType[ByggType].verdier[arrayIndexhigher] - byggTypeVVInnDataType[ByggType].verdier[arrayIndexlower])
    //the formula for interpolatins is:
    //y=y1+(x-x1)*(y2-y1)/(x2-x1)    
    return kWh
}

export function BeregnVolEl(ByggType, antall, sliderX, kWhIn) {

    let kW_0 = 0.346 * kWhIn //determines the offsett based on the KWh maximum heating kW
    let volume_0 = kW_0 / 0.0259 //determines intercept at x=0, maximum volume 
    let kW = Math.round(-0.0259 * volume_0 * (sliderX / 100) + kW_0) //returns the kW for the given building type and number of people
    let volume = Math.round(volume_0 * (sliderX / 100)) //returns the volume for the given building type and number of people
    return [kW, volume]
}

export function BeregnForvarmSpiss(TotalVol70C, sliderForvarmingSpiss, settpunktVP, spissSettpunkt) {
    let forvarmetVann = 70 * TotalVol70C / (settpunktVP * sliderForvarmingSpiss / 100 + spissSettpunkt * (1 - sliderForvarmingSpiss / 100))
    let forvarmVol = Math.round(forvarmetVann * sliderForvarmingSpiss / 100)
    let spissVol = Math.round(forvarmetVann * (1 - sliderForvarmingSpiss / 100))
    return [forvarmVol, spissVol]
}


export function BeregnEffekt(volume, kWhIn, settTemp) {
    let kW_0 = 0.346 * kWhIn //determines the offsett based on the KWh maximum heating kW
    let aktuelVolume = volume * 70 / settTemp
    let Effekt = Math.round(-0.0259 * aktuelVolume + kW_0)
    return Effekt
}

export function minVolVP(kW, kWhIn, settTemp, dekningGradProsent) {
    let kW_0 = 0.346 * kWhIn * dekningGradProsent / 100 //determines the offsett based on the KWh maximum heating 
    let Vol70C = (kW - kW_0) / -0.0259
    let volume = Math.round(Vol70C * 70 / settTemp)

    return volume
}


export function minVolSpiss(kW, kWhIn, settTemp, backUpType, dekningGradProsent, forvarmingELeffekt, minimumVPVol) {


    if (backUpType === "Spiss el-kolbe som dekker 100% av behov") {

        let kW_0 = 0.346 * kWhIn //determines the offsett based on the KWh maximum heating 
        let Vol70C = (kW - kW_0) / -0.0259
        let volume = Math.round(Vol70C * 70 / settTemp)
        return volume
    }

    else if (backUpType === "Spiss el-kolbe") {
        let kW_0 = 0.346 * kWhIn * (1 - dekningGradProsent / 100) //determines the offsett based on the KWh maximum heating 
        let Vol70C = (kW - kW_0) / -0.0259
        let volume = Math.round(Vol70C * 70 / settTemp) > 400 ? Math.round(Vol70C * 70 / settTemp) : 400
        return volume
    }

    else if (backUpType === "Spiss el-kolbe plus el-kolbe i forvarming") {

        let kW_0 = 0.346 * kWhIn //determines the offsett based on the KWh maximum heating 
        let Vol70C = (kW + forvarmingELeffekt - kW_0) / -0.0259
        let volume = Math.round(Vol70C * 70 / settTemp) - minimumVPVol > 400 ? Math.round(Vol70C * 70 / settTemp) - minimumVPVol : 400


        return volume
    }

}
export function sizeVP(kWhEnheter, perPersonVV, spissSettpunkt, netVannTemp, settpunktVP, tappeVannTemp) {
    
    
    let total40Cforbruk = total40CforbrukFn (kWhEnheter.Navn,kWhEnheter.Antall,perPersonVV)
    let totalBerederForbruk = (tappeVannTemp * total40Cforbruk - netVannTemp * total40Cforbruk) / (spissSettpunkt - netVannTemp)

    let energiForbruk = totalBerederForbruk * (settpunktVP - netVannTemp) * 4.2 / (3600 * 24)  //Energi use in Kj and then divided for 24h
    let [sizeVpUpper, sizeVpLower] = [Math.round(energiForbruk * 24 / 10), Math.round(energiForbruk * 24 / 20)] //10 to 20 hours of working hours considered acceptable 

    return [sizeVpUpper, sizeVpLower]
}

export function isLeilighetFucntion(navn) {
    let isLeilighet = true
    navn === "Leilighet (3+ personer)" || navn === "Leilighet (2-3 personer)" || navn === "Leilighet (1-2 personer)" ? isLeilighet = true : isLeilighet = false
    return isLeilighet
}

export function elEnergiForbrukFn (kWhEnheter, perPersonVV, spissSettpunkt, netVannTemp, settpunktVP, tappeVannTemp,dekningGradProsent,SCOP,strømpris){
    let total40Cforbruk = total40CforbrukFn (kWhEnheter.Navn,kWhEnheter.Antall,perPersonVV) //daglig forbruk av vann
    let SpissStrøm = (tappeVannTemp * total40Cforbruk - netVannTemp * total40Cforbruk) / (spissSettpunkt - netVannTemp)//Flow through the spiss per dag
    let totalenergiForbruk = SpissStrøm * (spissSettpunkt - netVannTemp) * 4.2 / (3600)*365  //divided by 3600 to turn J to Kwh multiplied by 365 to get an annular kwh use
   console.log("totalenergiForbruk",totalenergiForbruk, "SpissStrøm",SpissStrøm,"total40Cforbruk",total40Cforbruk)
   let spissElForbruk = totalenergiForbruk * (1-dekningGradProsent/100) //energy [kWh] used by spiss to increase the temperature 
   let VPdekning = totalenergiForbruk * (dekningGradProsent/100)   //energy [kWh] covered by VP to increase the temperature from nettvann to settpunkt
   let VPEnergibruk = VPdekning /SCOP   //electricity use of VP
   let energiSpart = totalenergiForbruk - VPEnergibruk - spissElForbruk  //energy saved by using VP
   let energiSpartProsent = energiSpart / totalenergiForbruk * 100 //energy saved in percent
   let SpartKroner = energiSpart * strømpris/100 //energy saved in kroner divided by 100 to change from øre to kroner
    return [Math.round(totalenergiForbruk), Math.round(spissElForbruk), Math.round(VPEnergibruk), Math.round(energiSpart), Math.round(energiSpartProsent), Math.round(SpartKroner)]
}


function total40CforbrukFn(Navn,Antall,perPersonVV) {
    let antallPersoner = 0
    
    if (Navn === "Leilighet (3+ personer)") antallPersoner += 3.5 *Antall
    if (Navn === "Leilighet (2-3 personer)") antallPersoner += 2.5 * Antall
    if (Navn === "Leilighet (1-2 personer)") antallPersoner += 1.5 * Antall

return antallPersoner * perPersonVV
}