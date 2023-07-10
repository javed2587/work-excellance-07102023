import { Injectable } from '@angular/core';
import { Employees } from '../models/employees';
import pdfData from '../../assets/data/pdf.json';
// import jsPDF from '../../../node_modules/jspdf/dist/jspdf.umd.js';
// import { applyPlugin } from 'jspdf-autotable';
// applyPlugin(jsPDF)
@Injectable({
  providedIn: 'root'
})
export class PdfService {

  title = 'Import JSON Data from Assets Folder';
  Employees: Employees[] = pdfData;
  // doc = new jsPDF();
  info: any[] = [];

  constructor() {
    this.Employees.forEach(element => {
      this.info.push([element.name,element.username,element.email])
    })
  //   this.doc.autoTable({
  //     head:[['Name','Username','Email']],
  //     body:this.info
  // })
}


  //  downloadPdf(){
  //   this.doc.save("a4.pdf");
  //  }

  //  appendDataAsSectionInPdf(pdfHandler: jsPDF, sectionHeading: string, headingList: string[], values: String[]) {
  //   const pageHeight = pdfHandler.internal.pageSize.getHeight();
  //   const startY = pdfHandler.autoTable.previous.finalY || 0;
  //   const remainingHeight = pageHeight - startY;

  //   const sectionHeight = 10 + (headingList.length * 7) + (values.length * 7);

  //   if (sectionHeight > remainingHeight) {
  //     pdfHandler.addPage();
  //   }

  //   pdfHandler.setFontSize(14);
  //   pdfHandler.text(sectionHeading, 15, pdfHandler.autoTable.previous.finalY + 20);
  //   pdfHandler.autoTable({
  //     startY: pdfHandler.autoTable.previous.finalY + 30,
  //     head: [headingList],
  //     body: [values],
  //     margin: { top: 50 },
  //   });
  //   return pdfHandler
  // }

  // appendTableInPdf(pdfHandler: jsPDF, tableHeading: String, columns: string[], values: any[][]) {
  //   const pageHeight = pdfHandler.internal.pageSize.getHeight();
  //   const startY = pdfHandler.autoTable.previous.finalY || 0;
  //   const remainingHeight = pageHeight - startY;

  //   const headingHeight = 20;
  //   const rowHeight = 10;
  //   const rowCount = values.length;
  //   const tableHeight = headingHeight + (rowCount * rowHeight);

  //   if (tableHeight > remainingHeight) {
  //     pdfHandler.addPage();
  //   }

  //   pdfHandler.setFontSize(18);
  //   pdfHandler.text(tableHeading, 15, pdfHandler.autoTable.previous.finalY + 20);

  //   pdfHandler.autoTable({
  //     startY: pdfHandler.autoTable.previous.finalY + 30,
  //     head: [columns],
  //     body: values,
  //     margin: { top: 10 },
  //   });
  // }

  // appendHeadingAndValueInPdf(heading: string, value: string): jsPDF {
  //   let pdfHandler = new jsPDF()
  //   const pageHeight = pdfHandler.internal.pageSize.getHeight();
  //   const startY = pdfHandler.autoTable.previous.finalY || 0;
  //   const remainingHeight = pageHeight - startY;

  //   const headingHeight = 20;
  //   const valueHeight = 10;

  //   if ((headingHeight + valueHeight) > remainingHeight) {
  //     pdfHandler.addPage();
  //   }

  //   pdfHandler.setFontSize(14);
  //   pdfHandler.text(heading, 15, pdfHandler.autoTable.previous.finalY + 20);

  //   pdfHandler.setFontSize(12);
  //   pdfHandler.text(value, 15, pdfHandler.autoTable.previous.finalY + 30);
  //   return pdfHandler;
  // }
  // downloadPDFFromJsPDF(jsPDFHandler: jsPDF, fileName: String) {
  //   if (fileName)
  //     jsPDFHandler.save(fileName + ".pdf")
  // }
}
