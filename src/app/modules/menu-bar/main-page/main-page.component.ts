import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PageMeta } from 'src/app/models/work-system/work-system-header';
import { PageMetaPageTeamTeamLeader, PageMetaPageTeamTeamMember } from "../../../models/work-system/work-system-body";
import { TeamMemebers } from "../../../models/team-memebers";
import { UserRole } from 'src/app/models/user/user';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  paintbyletters: Boolean;

  @Input() moduleNameVal: string
  @Input() isLocked: boolean
  @Input() teamLeader: PageMetaPageTeamTeamLeader
  @Input() teamMembers: Array<PageMetaPageTeamTeamMember>
  @Input() userRole: UserRole
  @Input() totalRequiredFields: number = 0
  @Input() totalFieldsFilled: number = 0
  @Output() sendLockStatus = new EventEmitter();
  @Output() sendPaintByLetters = new EventEmitter();
  @Output() pushTeamMemebrs = new EventEmitter();
  @Output() pushTeamLead = new EventEmitter();
  @Output() savePdfEvent = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
    console.log("Main component........?", this.moduleNameVal)
  }

  lockstatus: Boolean;
  getLockStatus(value) {
    this.lockstatus = value;
    console.log('Getting Lock Status from the toolbar2:', this.lockstatus);
    this.sendLockStatus.emit(this.lockstatus);
  }
  getPaintByLetters(value) {
    this.paintbyletters = value;
    console.log(
      'Getting Paint by Status from menu-header:',
      this.paintbyletters
    );
    this.sendPaintByLetters.emit(this.paintbyletters);
  }
  saveTeamMemersList(values) {
    this.pushTeamMemebrs.emit(values)
  }
  saveTeamLead(value) {
    this.pushTeamLead.emit(value)
  }
  savePageToPdf() {
    this.savePdfEvent.emit()
  }
  HeaderPageMeta: PageMeta

  // pushBackenedData() {
  //   this.HeaderPageMeta.pageSet
  // }
}
