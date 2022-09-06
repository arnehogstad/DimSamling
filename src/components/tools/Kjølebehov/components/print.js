import { jsPDF } from "jspdf";
import abkqvillerlogo from "../../../../images/abkqvillerlogo.jpg"



export default function print (props){
// Default export is a4 paper, portrait, using millimeters for units
const doc = new jsPDF();


//get the current date 
const current = new Date();
const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;



doc.addImage(abkqvillerlogo, 'JPEG', 130, 0, 80, 45);
doc.text("ABK Qviller AS", 10, 10);
doc.text(date, 10, 30);
doc.text(JSON.stringify(props), 100, 100);
doc.save("a4.pdf");


}