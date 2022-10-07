
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
    
    let volume_0 = kW_0/0.0259 //determines intercept at x=0, maximum volume 
    
    let kW=Math.round(-0.0259*volume_0*(sliderX/100)+kW_0) //returns the kW for the given building type and number of people
    let volume=Math.round(volume_0*(sliderX/100)) //returns the volume for the given building type and number of people
    return [kW,volume]
}
    
export function BeregnForvarmSpiss(TotalVol70C,sliderForvarmingSpiss,settpunktVP,spissSettpunkt) {
    let forvarmetVann = 70*TotalVol70C/(settpunktVP*sliderForvarmingSpiss/100+spissSettpunkt*(1-sliderForvarmingSpiss/100))
    let forvarmVol=Math.round(forvarmetVann*sliderForvarmingSpiss/100)
    let spissVol= Math.round(forvarmetVann*(1-sliderForvarmingSpiss/100))
    return [forvarmVol,spissVol]
}


export  function BeregnEffekt (volume,kWhIn,settTemp) {
    let kW_0 = 0.346*kWhIn //determines the offsett based on the KWh maximum heating kW
   let aktuelVolume= volume*70/settTemp
    let Effekt=Math.round(-0.0259*aktuelVolume+kW_0)
return Effekt
}

export function minVolVP (kW,kWhIn,settTemp){
    let kW_0 = 0.346*kWhIn //determines the offsett based on the KWh maximum heating 
    let Vol70C= (kW-kW_0)/-0.0259
    let volume=Math.round(Vol70C*70/settTemp)
    return volume
}


export function minVolSpiss (kW,kWhIn,settTemp,backUpType,dekningGradMaks,forvarmingELeffekt){
   if (backUpType==="Spiss el-kolbe som dekker 100% av behov"){
   
    let kW_0 = 0.346*kWhIn //determines the offsett based on the KWh maximum heating 
    let Vol70C= (kW-kW_0)/-0.0259
    let volume=Math.round(Vol70C*70/settTemp)
    return volume  } 
    
    else if  (backUpType==="Spiss el-kolbe")
    { let kW_0 = 0.346*kWhIn*(1-dekningGradMaks) //determines the offsett based on the KWh maximum heating 
    let Vol70C= (kW-kW_0)/-0.0259
    let volume=Math.round(Vol70C*70/settTemp)>0 ? Math.round(Vol70C*70/settTemp) : 0
    return volume}
    
    else if (backUpType==="Spiss el-kolbe plus el-kolbe i forvarming"){
        
        let kW_0 = 0.346*kWhIn //determines the offsett based on the KWh maximum heating 
        let Vol70C= (kW+forvarmingELeffekt-kW_0)/-0.0259
        let volume=Math.round(Vol70C*70/settTemp)-minVolVP (kW,kWhIn,settTemp)>0 ? Math.round(Vol70C*70/settTemp)-minVolVP (kW,kWhIn,settTemp) : 0
        return volume  }

}