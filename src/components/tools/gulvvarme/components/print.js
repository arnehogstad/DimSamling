import { jsPDF } from "jspdf";
import abkqvillerlogo from "../../../../images/abkqvillerlogo.jpg"
import autoTable from 'jspdf-autotable';


export default function print() {
    // Default export is a4 paper, portrait, using millimeters for units


    const doc = new jsPDF();


    //get the current date
    const current = new Date();
    const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;

function header () {

    return [
    doc.addImage(abkqvillerlogo, 'JPEG', 175, 0, 30, 17),
    doc.setFontSize(16),
    doc.text("ABK Qviller AS", 10, 10),
    doc.text(`Dato: ${date}`, 10, 20),
    doc.text(`Gulvvarme`, 10, 35),
    doc.setFontSize(12)
    ]}


function footer () {
    return [
        doc.setFont("times", "italic"),
        doc.setFontSize(10),
        doc.text("Vi tar forbehold om feil i beregninger, modellen kan endres uten varsel. \n Merk også at estimatene er basert på normtall og vil ikke tilsvare faktisk forbruk.", 105, 280, null, null, "center"),
        doc.setFont("helvetica", "normal"),
    ]}
    header()
    footer()

doc.save(`Gulvvarme.pdf`)




}
