import { Component, Input, OnInit } from '@angular/core';
import { OrganizationService } from "../../../../services/organization/organization.service";
import { MatSnackBar } from '@angular/material/snack-bar';
// import {jsPDF} from 'jspdf'
import html2canvas from 'html2canvas';
import html2pdf from 'html2pdf.js';
import { PageTitleService } from 'src/app/services/page-title.service';

@Component({
  selector: 'app-menu-header',
  templateUrl: './menu-header.component.html',
  styleUrls: ['./menu-header.component.css'],
})
export class MenuHeaderComponent implements OnInit {

  workDirectionData ;

  isActive = false;
  imgURL;
  A3style;
  currentFile;
  pageTitle: string = ''
  @Input() pageName;
  constructor(protected organizationService: OrganizationService, private snackBar: MatSnackBar, private PageTitleService: PageTitleService) { }

  ngOnInit(): void {
   this.pageTitle =  this.PageTitleService.getPageTitle()
    if (this.pageName == 'setup') {
      this.pageTitle = 'Setup Org'
      this.imgURL = '../../../../assets/images/configuration-images/A3 Dashboard Icons-08.svg';

    } else {
      this.pageTitle = 'Page Set'
      this.imgURL = '../../../../assets/images/configuration-images/A3.1.png'
      this.isActive = true;
    }

  }



  // uploadCSV() {
  //   console.log("Button Clicked!")
  //   this.organizationService.bulkImportCsvUsers(this.currentFile, this.o).subscribe((res) => {
  //     console.log(res)
  //     this.showSuccessMessage(res)
  //   })
  // }
  showSuccessMessage(res: any) {
    if (res)
      this.snackBar.open('Success message', 'Close',
        { duration: 1500, verticalPosition: "top", panelClass: "mat-snack-bar-success" });
  }

  selectFile(event) {
    this.currentFile = event.target.files[0];
    console.log(this.currentFile)
  }

  generatePDF() {
    var PDF_Width = 11.7 * 72; // 11.7 inches converted to points
    var PDF_Height = 16.5 * 72; // 16.5 inches converted to points

    html2pdf()
      .set({
        filename: `${this.pageTitle}.pdf`,
        image: { type: 'jpeg', quality: 1.0 },
        html2canvas: {
          scale: 2,
          useCORS: true,
        },
        jsPDF: {
          unit: 'pt',
          format: [PDF_Width, PDF_Height],
          orientation: 'landscape',
        },
      })
      .from(document.body)
      .save();
  }

}
