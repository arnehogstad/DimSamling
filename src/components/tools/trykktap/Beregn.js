import { NIBE, kollektorDimensjoner } from "./static/staticData";

export function reynoldsNumber(diameter, velocity, density, viscosity) {
    return diameter * velocity * density / viscosity;
}


export function frictionFactor(diameter, velocity, density, viscosity, roughness) {
    let reynolds = reynoldsNumber(diameter, velocity, density, viscosity);
    let f;

    let fLaminar = 64 / reynolds;
    let fTurbulent = 0.0055 * (1 + ((2 * 10 ** 4) * roughness / diameter + 10 ** 6 / reynolds) ** 0.333)

    if (reynolds < 2300) {
        f = fLaminar;
    } else if (2300 < reynolds < 4000) {
        let smoothingFaktor = (reynolds - 2300) / (4000 - 2300);
        f = (fLaminar * (1 - smoothingFaktor) + fTurbulent * smoothingFaktor);
    } else {
        f = fTurbulent; ///if turbulent reynolds > 4000
    }

    return f;
}

export function strømPerBrønnFn(strømPerMaskin, antallmaskiner, antalbrønner) {
    return strømPerMaskin * antallmaskiner / antalbrønner
}

export function velocityFn(diameter, strømPerBrønn, density) {
    let Area = Math.PI * (diameter / 2) ** 2;

    return Math.round(strømPerBrønn / Area / density * 1000) / 1000;
}


export function pressureDropFn(diameter, velocity, density, viscosity, roughness) {
    let f = frictionFactor(diameter, velocity, density, viscosity, roughness);
    let pressureDrop = 0.5 * density * velocity ** 2 * f / diameter;
    return Math.round(pressureDrop);
}


export function påfyllingDpFn(strøm, InnData) { //////is missing F1345

    if ((InnData.varmepumpeType === "NIBE F1345" || InnData.varmepumpeType === "NIBE F1355") && (InnData.påfyllingsSett === "KB25" || InnData.påfyllingsSett === "KB35")) {
        strøm = strøm * InnData.antallBrønner / (InnData.antallVarmepumper * 2);
    } else {
        strøm = strøm * InnData.antallBrønner
    }


    switch (InnData.påfyllingsSett) {
        case "Nei":
            return 0;
        case "KB25":
            return Math.round(3.3792 * strøm ** 3 + 11.968 * strøm ** 2 + 2.7309 * strøm + 0.0186);
        case "KB32":
            return Math.round(-0.0681 * strøm ** 3 + 5.9435 * strøm ** 2 + 0.0258 * strøm + 0.0191);
        case "Påfylling 1 1/2 inch":
            return Math.round(0.9782 * strøm ** 2 - 0.2786 * strøm + 0.2083);
        case "Påfylling 2 inch":
            return Math.round(0.3709 * strøm ** 2 - 0.1945 * strøm + 0.1717);
    }
}



export function pressureDropMatrixFn(nomBrinePerMaksin, InnData, density, viscosity, roughness) {
    const { a, b, c, d, e } = NIBE[InnData.varmepumpeType][InnData.VPKapasitet].kurveFitCoef


    let strømPerBrønn = nomBrinePerMaksin * InnData.antallVarmepumper / InnData.antallBrønner;
    let diameterinBrønn = kollektorDimensjoner.brønn[InnData.diameterKollektor] / 10 ** 3
    let diameterToSamlekum = kollektorDimensjoner.brønn[InnData.samlekumDiameter] / 10 ** 3
    let diameterToMaskinrom = kollektorDimensjoner.ovrflatt[InnData.maskinromDiameter] / 10 ** 3

    let brønntilSmalekumDp = 0
    let samlekumtilMaskinromDp = 0

    let pressureDropMatrix = []// the data that goes to the chart is stored here

    for (let strøm = 0.001; strøm < strømPerBrønn * 1.2; strøm = Math.round((strøm + strømPerBrønn / 40) * 1000) / 1000) {

        let velocity = velocityFn(diameterinBrønn, strøm, density);
        let velocityToMaskinrom = velocityFn(diameterToMaskinrom, strøm * InnData.antallBrønner, density);

        let brønnPressureDrop = pressureDropFn(diameterinBrønn, velocity, density, viscosity, roughness) * InnData.brønnDybde * 2 / (10 ** 3)//in kPa

        let påfyllingDp = påfyllingDpFn(strøm, InnData);


        if (InnData.isSamlekum) {
            brønntilSmalekumDp = pressureDropFn(diameterToSamlekum, velocity, density, viscosity, roughness) * InnData.samlekumDistanse * 2 / (10 ** 3)//in kPa
            samlekumtilMaskinromDp = pressureDropFn(diameterToMaskinrom, velocityToMaskinrom, density, viscosity, roughness) * InnData.maskinromDistanse * 2 / (10 ** 3)//in kPa
        }


        let øvrigetap = InnData.øvrigeTrykkTap * strøm / strømPerBrønn //in kPa

        let totalPressureDrop = påfyllingDp + brønnPressureDrop + brønntilSmalekumDp + samlekumtilMaskinromDp + øvrigetap //in kPa;

        pressureDropMatrix.push({ strøm: strøm, totalPressureDrop: totalPressureDrop })
    }

    for (let strøm = 0.001; strøm < nomBrinePerMaksin * 1.2; strøm = Math.round((strøm + nomBrinePerMaksin / 40) * 1000) / 1000) {
        let head = Math.round((a * strøm ** 4 + b * strøm ** 3 + c * strøm ** 2 + d * strøm + e) * 1000) / 1000   //in kPa

        pressureDropMatrix.push({ strøm: strøm * InnData.antallVarmepumper / InnData.antallBrønner, head: head })
    }

    return pressureDropMatrix;
}



export function nomTrykktapFn(nomBrinePerMaksin, InnData, density, viscosity, roughness) {

    let strømPerBrønn = nomBrinePerMaksin * InnData.antallVarmepumper / InnData.antallBrønner;
    let diameterinBrønn = kollektorDimensjoner.brønn[InnData.diameterKollektor] / 10 ** 3
    let diameterToSamlekum = kollektorDimensjoner.brønn[InnData.samlekumDiameter] / 10 ** 3
    let diameterToMaskinrom = kollektorDimensjoner.ovrflatt[InnData.maskinromDiameter] / 10 ** 3
    
    let velocity = velocityFn(diameterinBrønn, strømPerBrønn, density);
    let velocityToMaskinrom = velocityFn(diameterToMaskinrom, strømPerBrønn*InnData.antallBrønner, density);
    let brønnPressureDrop = pressureDropFn(diameterinBrønn, velocity, density, viscosity, roughness) * InnData.brønnDybde * 2 / (10 ** 3)//in kPa

    let påfyllingDp = påfyllingDpFn(strømPerBrønn, InnData);
 

    let brønntilSmalekumDp = 0
    let samlekumtilMaskinromDp = 0

    if (InnData.isSamlekum) {
        brønntilSmalekumDp = pressureDropFn(diameterToSamlekum, velocity, density, viscosity, roughness) * InnData.samlekumDistanse * 2 / (10 ** 3)//in kPa
        samlekumtilMaskinromDp = pressureDropFn(diameterToMaskinrom, velocityToMaskinrom, density, viscosity, roughness) * InnData.maskinromDistanse * 2 / (10 ** 3)//in kPa
    }


    let nomPressureDrop =
    {påfyllingDp: påfyllingDp,
    brønnPressureDrop: brønnPressureDrop,
    brønntilSmalekumDp: brønntilSmalekumDp,
    samlekumtilMaskinromDp: samlekumtilMaskinromDp,
    øvrigetap: InnData.øvrigeTrykkTap,
    totalPressureDrop: påfyllingDp + brønnPressureDrop + brønntilSmalekumDp + samlekumtilMaskinromDp + InnData.øvrigeTrykkTap
    } 

    return nomPressureDrop;
}
