import { jsPDF } from "jspdf";
import abkqvillerlogo from "../../../../images/abkqvillerlogo.jpg"
import autoTable from 'jspdf-autotable';


export default function print(lasts, vindus, ovriges, innDatas, vindu_effekt, ovrige_Effekt, total) {
    // Default export is a4 paper, portrait, using millimeters for units


    const doc = new jsPDF();


    //get the current date 
    const current = new Date();
    const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;
   
function header () {

    return [
    doc.addImage(abkqvillerlogo, 'JPEG', 130, 0, 80, 45),
    doc.setFontSize(16),
    doc.text("ABK Qviller AS", 10, 10),
    doc.text(`Dato: ${date}`, 10, 20),
    doc.text(`Kjølebehov beregning`, 10, 35),
    doc.setFontSize(12)
    ]}


function footer () {    
    return [
        doc.setFont("times", "italic"),
        doc.setFontSize(10),
        doc.text("Vi tar forbehold om feil i beregninger, modellen kan endres uten varsel. \n Merk også at estimatene er basert på normtall og vil ikke tilsvare faktisk forbruk.", 105, 280, null, null, "center"),
        doc.setFont("helvetica", "normal"),
    ]}

   
    header();

    doc.text(`Inn Data:`, 10, 55);
    doc.autoTable({
        startY: 60,
        body: [
            ["Prosjekt Navn:", innDatas.Navn],
            ["ABK Referanse:", innDatas.Referanse],
            ["Bygg Type:", innDatas.ByggType],
            ["Bygge år:", innDatas.Byggeår],
            ["Arealet (BRA) [m3]", innDatas.bra],
            ["Tak høyde [m]", innDatas.takhøyde],
            ["Ventilasjon Type", innDatas.ventilasjonType],
            innDatas.luftmengde !== 0 ?  ["Ventilasjon luft mengde [m3/h]", innDatas.luftmengde]: 0
        ]
    })

console.log(innDatas.luftmengde)

doc.autoTable({
    startY: 130,
    head: [
        [{ content: 'Luft effekt', colSpan: 2 }, { content: 'Transmission Effekt', colSpan: 4 }, { content: 'Annet Effekt', colSpan: 2 }],
        ["Infiltrasjon", "Ventilasjon", "Vegg", "Tak", "Loft", "Gulv", "Utstyr", "Personer"]],
    body: [lasts],
})


doc.text(`Last fra vinduer:`, 10, 175);
doc.autoTable({
    startY: 180,
    head: [["Vindu Arealet [m2]", "Avskjerming", "Vindu Rettning", "Transmission last [W]", "Sol Strål [W]"]],
    body: vindus,
})
doc.text(`Total last fra vinduerer ${vindu_effekt} W`, 10, (vindus.length) * 8 + 175+20);
   
   
    footer();


    doc.addPage("a4");
    header();
    doc.text(`Øvrige definert last:`, 10, 55);
    doc.autoTable({
        startY: 60,
        head: [
            ["Navn", "Last"]],
        body: ovriges,
    })
    doc.text(`Total av øvrige definert last er ${ovrige_Effekt} W`, 10, ovriges.length * 8 + 55 + 20);


    doc.setFontSize(16);
    doc.text(`Total kjølebehov er ${total} W.`, 105, ovriges.length * 8 + 75 + 20, null, null, "center");
    footer();

doc.save(`${innDatas.Navn} Kjølebehov beregning .pdf`)

   


}