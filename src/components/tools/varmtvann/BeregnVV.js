
import React from "react"
import { byggTypeVVInnDataType, kWhDataFraCTC } from "../../static/staticData"



export default function BeregnVV(ByggType, antall,sliderX) {
   let indexCTCkWhTable= byggTypeVVInnDataType[ByggType].verdier.indexOf(parseInt(antall))
      
    let kW_0 = 0.346*kWhDataFraCTC[indexCTCkWhTable] //determines the offsett based on the KWh maximum heating kW
    let volume_0 = kW_0/0.0259 //determines intercept at x=0, maximum volume 
    
    
    return Math.round(-0.0259*volume_0*(1-sliderX/100)+kW_0) //returns the kW for the given building type and number of people
}
    

