import { jsPDF } from "jspdf";
import abkqvillerlogo from "../../../../images/abkqvillerlogo.jpg"



export default function print (total,ovrige) {
// Default export is a4 paper, portrait, using millimeters for units
const doc = new jsPDF();


//get the current date 
const current = new Date();
const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;



doc.addImage(abkqvillerlogo, 'JPEG', 130, 0, 80, 45);
doc.text("ABK Qviller AS", 10, 10);
doc.text(date, 10, 30);
doc.text(`Total last er ${JSON.stringify(total)} W`, 10, 100);
doc.text(`Øvrige last er ${JSON.stringify(ovrige)} W`, 10, 130);
doc.save("a4.pdf");


}