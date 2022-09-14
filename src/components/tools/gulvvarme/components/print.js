import { jsPDF } from "jspdf";
import abkqvillerlogo from "../../../../images/abkqvillerlogo.jpg"
import autoTable from 'jspdf-autotable';


export default function print(projectName) {
  // Default export is a4 paper, portrait, using millimeters for units
  const doc = new jsPDF();

  //get the currentDate
  const currentDate = new Date();
  //format the date for print
  const date = `${currentDate.getDate()}.${currentDate.getMonth() + 1}.${currentDate.getFullYear()}`;
  //get the current position
  var distFromTop = 20

  //function creating the header
  function header (pdf, headerText,pageNumber,pagesTotal) {
      return [
        pdf.addImage(abkqvillerlogo, 'JPEG', 175, 0, 30, 17),
        pdf.setFont("helvetica", "normal"),
        pdf.setFontSize(8),
        pdf.text("ABK Qviller AS", 10, 10),
        pdf.text(`Dato: ${date}`, 10, 15),
        pdf.setFontSize(16),
        pdf.text(headerText, 90, 10),
        pdf.setFontSize(10)
      ]
  }

  //function creating the body
  function body(pdf){
    let bodyText = []
    //tast av å generere en tekstblob
    for (let i = 0;i<20;i++){
        distFromTop = distFromTop + 5
        bodyText.push(pdf.text(`test av funksjoner: ${i}`, 10, distFromTop),)
    }
    return bodyText
  }
  //function returning a table
  function table(pdf){
    distFromTop = distFromTop+5
    autoTable(pdf, {
      styles: { fontSize: 8 },
      margin: { top: distFromTop , left: 10, right:10},
      head: [['Name', 'Email', 'Country']],
      body: [
        ['David', 'david@example.com', 'Sweden'],
        ['Castille', 'castille@example.com', 'Spain']
      ],
    })
  }

  //function creating the footer

    header(doc,`Materialliste ${projectName}`)
    body(doc)
    table(doc)
    doc.save(`Gulvvarme.pdf`)

}
