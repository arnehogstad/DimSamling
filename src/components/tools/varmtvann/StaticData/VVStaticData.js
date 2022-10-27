import React from "react"


export const AquaEfficencyData = {
    storeLeilighet: [10, 20, 25, 30, 35, 50, 60, 70, 85, 100, 110],
    småLeilighet: [15, 28, 35, 41, 48, 68, 82, 95, 115, 143, 158],
    kW: [143, 205, 232, 256, 279, 342, 381, 418, 469, 538, 570],
    volume: [750, 1500, 1750, 2000, 2250, 3000, 3500, 4000, 4500, 5000, 6000],
    vpEffekt: [12, 15, 12, 20, 30, 40, 40, 60, 60, 90, 90],
    artikkel: [
        "AquaEfficency EFB6050ISR 143 kW",
        "AquaEfficency EFB6060ISR 205 kW",
        "AquaEfficency EFB11250ISR 279 kW",
        "AquaEfficency EFB11250ISR 279 kW",
        "AquaEfficency EFB11250ISR 279 kW",
        "AquaEfficency EFB11270ISR 469 kW",
        "AquaEfficency EFB11270ISR 469 kW",
        "AquaEfficency EFB11270ISR 469 kW",
        "AquaEfficency EFB11270ISR 469 kW",
        "AquaEfficency EFB112130ISR 570 kW",
        "AquaEfficency EFB112130ISR 570 kW",
    ],
    artikkelNr: [526089, 526090, 526091, 526091, 526091,526092, 526092, 526092, 526092, 526093, 526093]
        
      
}



export const byggTypeVarmtVann = ["Leilighet (3+ personer)", "Leilighet (2-3 personer)", "Leilighet (1-2 personer)", "Bed&breakfast", "Hotell m/restaurant", "Hotell m/sv.b og restaurant", "Sykehus", "Sykehjem", "Idrettsanlegg på Skolen", "Svømmehall", "Idrettsdusjer", "Offentlige bad, helsestudio", "Skol m/svømmehall og gymsal", "Skol m/Gymsal", "Restaurant 1.kl", "Restaurant 2.kl", "Kafè", "Bar", "Kontorbygg m/kantine- Gulvvask", "Kontorbygg m/kantine-Moppevask", "Industri Garderobe-Vanlig smuss", "Industri Garderobe-Mye smuss"]
//verdier tilsvarer til CTC pdf file, null is to make it easier to convert to kWh per tabler later.
export const byggTypeVVInnDataType = {
    "Leilighet (3+ personer)": { navn: "Antall leiligheter", verdier: [6, 8, 12, 19, 28, 40, 55, 67, 81, 105, 135, 170, 200, 240, 260, 280, 300] },
    "Leilighet (2-3 personer)": { navn: "Antall leiligheter", verdier: [7, 10, 15, 28, 47, 62, 77, 90, 107, 140, 180, 230, 268, 320, 355, 400, 430] },
    "Leilighet (1-2 personer)": { navn: "Antall leiligheter", verdier: [10, 18, 28, 48, 70, 95, 120, 140, 160, 200, 240, 290, 330, 410, 480, 540, 590] },
    "Bed&breakfast": { navn: "Antall gjester", verdier: [20, 30, 40, 75, 110, 140, 170, 200, 230, 290, 340, 390, 440, 490, 540, 590, 640] },
    "Hotell m/restaurant": { navn: "Antall gjester", verdier: [null, null, 35, 60, 85, 105, 125, 145, 165, 200, 250, 300, 350, 400, 440, 490, 530] },
    "Hotell m/sv.b og restaurant": { navn: "Antall gjester", verdier: [null, null, 30, 50, 65, 85, 105, 122, 140, 180, 220, 270, 310, 350, 380, 420, 450] },
    "Sykehus": { navn: "Antall pasienter", verdier: [null, null, 20, 30, 40, 50, 60, 70, 80, 100, 120, 140, 160, 180, 200, 210, 220] },
    "Sykehjem": { navn: "Antall pasienter", verdier: [null, null, 30, 40, 50, 62, 75, 87, 100, 120, 150, 170, 190, 220, 240, 260, 290] },
    "Idrettsanlegg på Skolen": { navn: "Antall personer", verdier: [35, 53, 70, 110, 140, 180, 210, 250, 280, 350, 430, 500, 570, 640, 710, 780, 860] },
    "Svømmehall": { navn: "Antall personer", verdier: [18, 29, 40, 60, 75, 95, 115, 135, 160, 210, 240, 285, 325, 370, 410, 450, 490] },
    "Idrettsdusjer": { navn: "Antall personer", verdier: [26, 42, 57, 85, 115, 142, 170, 200, 230, 290, 340, 400, 460, 515, 570, 630, 680] },
    "Offentlige bad, helsestudio": { navn: "Antall personer", verdier: [20, 33, 45, 72, 100, 125, 150, 180, 210, 260, 310, 360, 420, 470, 520, 570, 620] },
    "Skol m/svømmehall og gymsal": { navn: "Antall elever", verdier: [30, 45, 75, 100, 150, 200, 250, 290, 330, 400, 490, 570, 650, 740, 820, 920, 1000] },
    "Skol m/Gymsal": { navn: "Antall elever", verdier: [40, 65, 95, 140, 230, 290, 350, 400, 460, 570, 690, 800, 920, 1030, 1450, 1260, 1380] },
    "Restaurant 1.kl": { navn: "Antall gjester", verdier: [70, 100, 130, 180, 270, 340, 410, 480, 550, 690, 830, 970, 1100, 1250, 1380, 1530, 1660] },
    "Restaurant 2.kl": { navn: "Antall gjester", verdier: [100, 150, 200, 300, 400, 500, 600, 700, 800, 1000, 1200, 1400, 1600, 1800, 2000, 2200, 2400] },
    "Kafè": { navn: "Antall gjester", verdier: [200, 300, 400, 600, 800, 1000, 1200, 1400, 1600, 2000, 2400, 2800, 3200, 3600, 4000, 4500, 5000] },
    "Bar": { navn: "Antall gjester", verdier: [330, 500, 660, 1000, 1300, 1650, 2000, 2300, 2600, 3300, 4000, null, null, null, null, null, null] },
    "Kontorbygg m/kantine- Gulvvask": { navn: "Arealet [m2]", verdier: [1000, 1500, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 10000, 12000, 14000, 16000, 18000, 20000, null, null] },
    "Kontorbygg m/kantine-Moppevask": { navn: "Arealet [m2]", verdier: [2000, 3000, 4000, 6000, 8000, 10000, 12000, 14000, 16000, 20000, 24000, 28000, 32000, 36000, 40000, null, null] },
    "Industri Garderobe-Vanlig smuss": { navn: "Antall dusj", verdier: [23, 34, 45, 70, 95, 120, 140, 160, 185, 230, 275, 330, 375, 420, 465, 510, 555] },
    "Industri Garderobe-Mye smuss": { navn: "Antall dusj", verdier: [17, 26, 35, 52, 70, 90, 110, 125, 140, 175, 210, 250, 285, 320, 355, 390, 430] }
}

export const kWhDataFraCTC = [58.10, 87.20, 116.30, 174.40, 232.50, 290.70, 348.80, 407.00, 465.10, 581.40, 697.70, 814.00, 930.20, 1046.50, 1162.80, 1279.00, 1395.30,]
