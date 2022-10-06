
import React from "react"
import { byggTypeVVInnDataType, kWhDataFraCTC } from "../../static/staticData"



export function kWhData (ByggType, antall) { ///Finds the Kwh Data from CTC table based on interpolation of values
    const isLarger =(arrayElement) => arrayElement >= parseInt(antall)
   let arrayIndexhigher= byggTypeVVInnDataType[ByggType].verdier.findIndex(isLarger)
   let  arrayIndexlower=arrayIndexhigher-1
   
    //let kWh=-(kWhDataFraCTC[arrayIndexlower]*(byggTypeVVInnDataType[ByggType].verdier[arrayIndexhigher]-parseInt(antall))+kWhDataFraCTC[arrayIndexhigher]*(parseInt(antall)-byggTypeVVInnDataType[ByggType].verdier[arrayIndexlower]))/(byggTypeVVInnDataType[ByggType].verdier[arrayIndexlower]-byggTypeVVInnDataType[ByggType].verdier[arrayIndexhigher])
     //the formula for interpolatins is:
    //y=(y0*(x1-x)+y1*(x-x0))/(x1-x0) 

    let kWh=kWhDataFraCTC[arrayIndexlower]+(parseInt(antall)-byggTypeVVInnDataType[ByggType].verdier[arrayIndexlower])*(kWhDataFraCTC[arrayIndexhigher]-kWhDataFraCTC[arrayIndexlower])/(byggTypeVVInnDataType[ByggType].verdier[arrayIndexhigher]-byggTypeVVInnDataType[ByggType].verdier[arrayIndexlower])
   //the formula for interpolatins is:
   //y=y1+(x-x1)*(y2-y1)/(x2-x1)    
    return kWh
}

export  function BeregnVolEl(ByggType, antall,sliderX,kWhIn) {
  
      
    let kW_0 = 0.346*kWhIn //determines the offsett based on the KWh maximum heating kW
    //console.log(kWhData(ByggType, antall))
    let volume_0 = kW_0/0.0259 //determines intercept at x=0, maximum volume 
    
    let kW=Math.round(-0.0259*volume_0*(1-sliderX/100)+kW_0) //returns the kW for the given building type and number of people
    let volume=Math.round(volume_0*(1-sliderX/100)) //returns the volume for the given building type and number of people
    return [kW,volume]
}
    
export function BeregnForvarmSpiss(TotalVol70C,sliderForvarmingSpiss,settpunktVP,spissSettpunkt) {
    let forvarmetVann = 70*TotalVol70C/(settpunktVP*sliderForvarmingSpiss/100+spissSettpunkt*(1-sliderForvarmingSpiss/100))
    let forvarmVol=Math.round(forvarmetVann*sliderForvarmingSpiss/100)
    let spissVol= Math.round(forvarmetVann*(1-sliderForvarmingSpiss/100))
    return [forvarmVol,spissVol]
}
