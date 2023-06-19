import React, { Fragment, useEffect } from 'react'
import * as Beregn from './Beregn'
import { NIBE, kollektorDimensjoner, påfyllings } from './static/staticData'
import { nanoid } from '@reduxjs/toolkit'
import Charts from './Chart'
import { MouseOverPopover, popoverText } from './static/MouseOverPopover'
import  '../../../styles/trykktap/trykktap.css'

export default function InnData() {

    const [InnData, setInnData] = React.useState({
        varmepumpeType: "NIBE F1155",
        VPKapasitet: 16,
        antallVarmepumper: 1,
        antallBrønner: 1,
        brønnDybde: 200,
        diameterKollektor: 45,
        påfyllingsSett: "Nei",
        isSamlekum: "",
        samlekumDistanse: 20,
        samlekumDiameter: 45,//fra brønn til samlekum
        maskinromDistanse: 50,
        maskinromDiameter: 110,
        øvrigeTrykkTap: 10,
    })

    const { varmepumpeType, VPKapasitet, antallVarmepumper, antallBrønner, brønnDybde, diameterKollektor, påfyllingsSett, isSamlekum,samlekumDistanse,samlekumDiameter,maskinromDistanse,maskinromDiameter,øvrigeTrykkTap } = InnData

    function handleChange(event) {
        const { name, value, type } = event.target

        if (type === "number") setInnData(prev => ({ ...prev, [name]: Number(value) }))

        else if (name === "varmepumpeType") {
            setInnData(prev => {////Sets the right default value for VPKapasitet for the selected varmepumpe
                return {
                    ...prev,
                    [name]: value,
                    VPKapasitet: Object.keys(NIBE[value])[0]
                }
            })

        } else setInnData(prev => ({ ...prev, [name]: value }))

    }



    const [pressureDropMatrix, setPressureDropMatrix] = React.useState([])

    const [isVisning, setIsVisning] = React.useState({///Which part of the page is to be shown
        chart: false

    })



    function handleVisning(name, value) {//Deals with the isVisning of the page
        setIsVisning(prevFormData => {
            return {
                ...prevFormData,
                [name]: value,
            }
        })
    }

const [nomTrykktap, setNomTrykktap] = React.useState(0)

    function handleSubmit() {
        setPressureDropMatrix(Beregn.pressureDropMatrixFn(NIBE[varmepumpeType][VPKapasitet].nomBrine, InnData, 955, 0.00714, 0.0005))
        setNomTrykktap( Beregn.nomTrykktapFn(NIBE[varmepumpeType][VPKapasitet].nomBrine, InnData, 955, 0.00714, 0.0005) )
    }
console.log(nomTrykktap)
    useEffect(() => handleSubmit(), [InnData])




    return (
        <div className="border">
            <form className="formInnData">
                <h2>Input data</h2>


                <label className="label">
                    Varmepumpe model:
                    <select className="select" name="varmepumpeType" value={varmepumpeType} onChange={handleChange}>
                        {Object.keys(NIBE).map((item) => (
                            <option key={nanoid()} value={item}>{item}</option>
                        ))}
                    </select>
                </label>

                <label className="label">
                    Varmepumpe kapasitet [kW]:
                    <select className="select" name="VPKapasitet" value={VPKapasitet} onChange={handleChange}>
                        {Object.keys(NIBE[varmepumpeType]).map((item) => (
                            <option key={nanoid()} value={item}>{item}</option>
                        ))}
                    </select>
                </label>

                <label className="label">
                    Antall varmepumper:
                    <input
                        className="input"
                        type="number"
                        name="antallVarmepumper"
                        value={antallVarmepumper}
                        onChange={handleChange}
                    />
                </label>
                <label className="label">
                    Antall brønner:
                    <input
                        className="input"
                        type="number"
                        name="antallBrønner"
                        value={antallBrønner}
                        onChange={handleChange}
                    />
                </label>
                <label className="label">
                    Brønndybde [m]:
                    <input
                        className="input"
                        type="number"
                        name="brønnDybde"
                        value={brønnDybde}
                        onChange={handleChange}
                        step={10}
                       />
                 
                </label>

                <label className="label">
                    Diameter Kollektor [mm]:
                    <select className="select" name="diameterKollektor" value={diameterKollektor} onChange={handleChange}>
                        {Object.keys(kollektorDimensjoner.brønn).map((item) => (
                            <option key={nanoid()} value={item}>{item}</option>
                        ))}
                    </select>
                </label>

                <label className="label">
                    Trykkfall ventil/bend/filter [kPa]:
                <div className="flex-end">
                        <MouseOverPopover popoverText={popoverText.øvrigetap} />
                    <input
                        className="input"
                        type="number"
                        name="øvrigeTrykkTap"
                        value={øvrigeTrykkTap}
                        onChange={handleChange}
                    />
                    </div>
                </label>

                <label className="label">
                    Påfyllingssett :
                    <div className="flex-end">
                        <MouseOverPopover popoverText={popoverText.påfylling} />
                        <select className="select" name="påfyllingsSett" value={påfyllingsSett} onChange={handleChange}>
                            {påfyllings.map((item) => (
                                <option key={nanoid()} value={item}>{item}</option>
                            ))}
                        </select>
                        <span className='TTspan'> {`${nomTrykktap.påfyllingDp} kPa`}</span>
                    </div>
                </label>



                <label className="label">
                    Samlekum:
                    <select className="select" name="isSamlekum" value={isSamlekum} onChange={handleChange}>
                    <option key={nanoid()} value="">Nei</option>
                    <option key={nanoid()} value="true">Ja</option> {/*"" is false, "true" is true*/}
                    </select>

                </label>



        {isSamlekum ?       
                    <Fragment>

                    <label className="label">
                    Distanse fra brønn til samlekum [m]:
                    <div className="flex-end">
                        <MouseOverPopover popoverText={popoverText.samlekum} />
                    <input
                        className="input"
                        type="number"
                        name="samlekumDistanse"
                        value={samlekumDistanse}
                        onChange={handleChange}
                    />
                    </div>
                       </label>
                

              <label className="label">
                  Rørdiameter, brønn til samlekum [mm]:
                    <select className="select" name="samlekumDiameter" value={samlekumDiameter} onChange={handleChange}>
                        {Object.keys(kollektorDimensjoner.brønn).map((item) => (
                            <option key={nanoid()} value={item}>{item}</option>
                        ))}
                    </select>
                </label>


                <label className="label">
                Distanse fra samlekum til tekniskrom [m]:          
                <input
                    className="input"
                    type="number"
                    name="maskinromDistanse"
                    value={maskinromDistanse}
                    onChange={handleChange}
                />
                </label>
            

                <label className="label">
                    Rørdiameter, samlekum til tekniskrom [mm]:
                    <select className="select" name="maskinromDiameter" value={maskinromDiameter} onChange={handleChange}>
                        {Object.keys(kollektorDimensjoner.ovrflatt).map((item) => (
                            <option key={nanoid()} value={item}>{item}</option>
                        ))}
                    </select>
                </label>

                </Fragment>
                : null}


            </form>

            {isVisning.chart ? null : <button className="sisteNeste" onClick={() => (handleSubmit(), handleVisning("chart", true))}>Beregn</button>}

            {isVisning.chart ? <div style={{ width: 600, height: 600 }}>
                <Charts pressureDropMatrix={pressureDropMatrix} minBrine={NIBE[varmepumpeType][VPKapasitet].minBrine * antallVarmepumper / antallBrønner} nomBrine={NIBE[varmepumpeType][VPKapasitet].nomBrine * antallVarmepumper / antallBrønner} />
            </div> : null}
        </div>
    )
}

