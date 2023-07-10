import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PdfService } from 'src/app/services/pdf.service';
import { PageMetaPageTeamTeamLeader, PageMetaPageTeamTeamMember } from "../../../models/work-system/work-system-body";
import { TeamMemebrs } from "../../../models/common/team-members";
import { TeamMemebers } from "../../../models/team-memebers";
import { UserRole, UserRoles } from 'src/app/models/user/user';


import { PageMeta } from 'src/app/models/work-system/work-system-header';
import html2pdf from 'html2pdf.js';
import { PageTitleService } from 'src/app/services/page-title.service';


@Component({
  selector: 'app-menu-header',
  templateUrl: './menu-header.component.html',
  styleUrls: ['./menu-header.component.css'],
})
export class MenuHeaderComponent implements OnInit {

  math = Math
  @Input()recieveDataWD: PageMeta

  userRoles = UserRoles
  @Input() moduleName: string;
  @Input() teamLeader: PageMetaPageTeamTeamLeader
  @Input() teamMembers: Array<PageMetaPageTeamTeamMember>
  @Input() totalRequiredFields: number = 0
  @Input() userRole: UserRole
  @Input() totalFieldsFilled: number = 0
  @Output() sendlockstatus = new EventEmitter();
  @Input() lockstatus: Boolean = false;
  TeamMember: Boolean = false;
  closeTeamModal: Boolean = false;
  TeamMembers: any = [];
  paintbyletters: Boolean = false;
  @Output() sendPaintByLetters = new EventEmitter();
  @Output() pushTeamMembersList = new EventEmitter()
  @Output() pushTeamLead = new EventEmitter();
  @Output() savePdfEvent = new EventEmitter();

  pageTitle;


  constructor(private pdfService: PdfService, private PageTitleService: PageTitleService) { }
  ngOnInit(): void { 
    this.pageTitle = this.PageTitleService.getPageTitle();
    
    // JSON.stringify(this.workDirectionData)
    // console.log(this.workDirectionData)
  }
  changeLockStatus() {

    if (this.lockstatus == false) {
      this.lockstatus = true;
      this.sendlockstatus.emit(this.lockstatus);
    } else if (this.lockstatus == true) {
      this.lockstatus = false;
      this.sendlockstatus.emit(this.lockstatus);
    }
    console.log('Changing Lock Status:', this.lockstatus);
  }
  showTeamMember() {
    if (this.TeamMember == false) {
      this.TeamMember = true;
      console.log('Making Team Member true');
      this.closeTeamModal = false;
    } else if (this.TeamMember == true) {
      this.TeamMember = false;
      console.log('Making Team Member false');
      this.closeTeamModal = true;
    }
  }
  getTeamMembers(value) {
    this.pushTeamMembersList.emit(value)
    // this.TeamMembers = value;
    // console.log('Team Members coming from child:', this.TeamMembers);
  }
  getTeamLead(value) {
    this.pushTeamLead.emit(value)
  }
  getFlagValue(value) {

    this.TeamMember = value;
  }
  showPaintByLetters() {

    if (this.paintbyletters == false) {
      this.paintbyletters = true;
      this.sendPaintByLetters.emit(this.paintbyletters);
    } else if (this.paintbyletters == true) {
      this.paintbyletters = false;
      this.sendPaintByLetters.emit(this.paintbyletters);
    }
  }
    // downloadPDF() {
    //   const options = { scale: 2 };
    //   const element = document.body;
    //   html2canvas(element, options).then((canvas) => {
    //     const imgData = canvas.toDataURL('image/png');
    //     const pdf = new jsPDF('landscape', 'mm', 'a3'); // Set A3 size in landscape orientation (mm units)
    //     const imgWidth = pdf.internal.pageSize.getWidth();
    //     const imgHeight = pdf.internal.pageSize.getHeight();
    //     pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
    //     pdf.save('screenshot.pdf');
    //   });
    // } 

    downloadPDF() {
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
