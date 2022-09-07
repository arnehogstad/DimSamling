import { jsPDF } from "jspdf";
import abkqvillerlogo from "../../../../images/abkqvillerlogo.jpg"
import autoTable from 'jspdf-autotable';


export default function print(lasts, vindus, ovriges,innDatas) {
    // Default export is a4 paper, portrait, using millimeters for units


    const doc = new jsPDF();
    

    //get the current date 
    const current = new Date();
    const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;

    
    doc.addImage(abkqvillerlogo, 'JPEG', 130, 0, 80, 45);
    doc.text("ABK Qviller AS", 10, 10);    
    doc.text(`Dato: ${date}`, 10, 20);
    doc.text(`Kjølebehov beregning`, 10, 35);


    doc.autoTable({
        startY: 60,
        body:[
            ["Prosjekt Navn:" , innDatas.Navn],
            ["ABK Referanse:" , innDatas.Referanse],
            ["Bygg Type:" , innDatas.ByggType],
            ["Bygge år:" , innDatas.Byggeår],
            ["Arealet (BRA) [m3]" , innDatas.bra],
            ["Tak høyde [m]" , innDatas.takhøyde],
            ["Ventilasjon Type" , innDatas.ventilasjonType],
            ["Luft mengde [m3/h]" , innDatas.luftmengde]
        ]
       })
    

    doc.addPage("a4");

    
    doc.autoTable({
        startY: 60,
        head: [
            [{ content: 'Luft effekt', colSpan: 2 }, { content: 'Transmission Effekt', colSpan: 4 }, { content: 'Annet Effekt', colSpan: 2 }],
            ["Infiltrasjon", "Ventilasjon", "Vegg", "Tak", "Loft", "Gulv", "Utstyr", "Personer"]],
        body: [lasts],
    })
    
    
    doc.text(`Øvrige definert last:`, 10, 80);

    doc.autoTable({
        startY: 100,
        head: [
            ["Navn","Last"]],
           body:ovriges,
    })
    


    
    doc.text(`Total last er ${JSON.stringify(lasts)} W`, 10, 130);
    doc.text(`Total last fra vinduer er ${JSON.stringify(vindus)} W`, 10, 140);
    doc.text(`Øvrige last er ${JSON.stringify(ovriges)} W`, 10, 150);

    doc.setFont("times", "italic");
    doc.setFontSize(10);
    doc.text("Vi tar forbehold om feil i beregninger, modellen kan endres uten varsel. \n Merk også at estimatene er basert på normtall og vil ikke tilsvare faktisk forbruk eller besparelse", 105, 280, null, null, "center");
    doc.save("a4.pdf");



}