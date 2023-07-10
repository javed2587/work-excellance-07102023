import {Component, EventEmitter, Input, OnInit, Output, OnChanges, SimpleChanges} from '@angular/core';
import {TeamMembersService} from 'src/app/services/team-members.service';
import {VoiceToTextServiceService} from 'src/app/services/voice-to-text-service.service';
import {WorkImprovementPageData} from "../../../models/work-improvement/work-improvment";
import {PageDataManagementRailRaiting} from "../../../models/work-system/work-system-header";
import {User} from "../../../models/user/user";
import { PageMetaPageTeamOwner } from 'src/app/models/work-system/work-system-body';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-phase-one',
  templateUrl: './phase-one.component.html',
  styleUrls: ['./phase-one.component.css']
})
export class PhaseOneComponent implements OnInit, OnChanges {

  flagg = true;
  up = true;
  down = false;
  @Input() textAreaVal: string
  moduleName: string = 'Work Improvement Name'
  modalDescription: string = " The name of this Work Improvement.(Examples Include: Sales, Human Resources, Information Technology, Production, Finance, Purchasing.)"

  users: Array<User> = []
  discription: string = ''
  items: any[] = [];
  rating = true
  showInfoModal: Boolean = false;
  showLightModal: Boolean = false;
  voiceservice: Boolean = false;
  showMicForTextArea: Boolean = false;
  collapseCard = true;
  upArrow = true;
  downArrow = false;
  statementsList = [];
  memebrs = []
  results: User[] = []
  text: string
  @Input() pageName: String
  @Input() pageOwner: PageMetaPageTeamOwner
  pageOwnerUser: User = new User(null, null, null, null, null, [], null, null)
  @Input() planPurpose: string
  removestatementindex;
  @Input() lockstatus: Boolean = false;
  @Output() sendPhaseOneModalFlag = new EventEmitter();
  @Output() sendPageName: EventEmitter<String> = new EventEmitter<String>()
  @Output() sendPageOwner: EventEmitter<PageMetaPageTeamOwner> = new EventEmitter<PageMetaPageTeamOwner>()
  @Output() sendPlanPurpose: EventEmitter<String> = new EventEmitter<String>()
  @Input() phaseOneModalFlag;
  @Input() phaseTwoModalFlag;
  @Input() phaseThreeModalFlag;
  @Input() phaseFourModalFlag;
  @Input() phaseFiveModalFlag;

  constructor(
    private voiceToTextService: VoiceToTextServiceService,
    private teamMemeberService: TeamMembersService,
    private userService: UserService
  ) {
    this.voiceToTextService.init()
    voiceToTextService.text = '';
  }

  setUserNameForOwner() {
    const m: User = this.pageOwnerUser
    if (!m.username && (m.firstName || m.lastName)) {
      if (m.firstName)
        m.username = m.firstName.valueOf()
      else m.username = ''
      if (m.lastName)
        m.username = m.username + ' ' + m.lastName
    }
    if (!m.username)
      m.username = ''
    this.pageOwnerUser = m
  }

  ngOnChanges(changes: SimpleChanges) {
    for (const propName in changes) {
      if (propName == "pageOwner") {
        // if (this.pageOwner.userId)
        //   this.userService.findById(this.pageOwner.userId.valueOf()).subscribe((user: User) => {
        //     this.pageOwnerUser = user
        //     this.setUserNameForOwner()
        //   })
      }
    }
  }
  ngOnInit(): void {
    this.loadUsers()
  }
  setUserNameForUsers() {
    this.users.forEach(m => {
      if (!m.username && (m.firstName || m.lastName)) {
        if (m.firstName)
          m.username = m.firstName.valueOf()
        else m.username = ''
        if (m.lastName)
          m.username = m.username + ' ' + m.lastName
      }
      if (!m.username)
        m.username = ''
    })
  }
  loadUsers() {
    if (this.userService.findByOrgId()) {
      this.userService.findByOrgId().subscribe((users: Array<User>) => {
        this.users = users
        this.setUserNameForUsers()
      })
    }
  }

  // toggle() {
  //   this.flagg = !this.flagg;
  //   this.up = !this.up;
  //   this.down = !this.down;
  // }
  setPageName() {
    this.sendPageName.emit(this.pageName);
  }
  setPageOwner(o) {
    const owner: PageMetaPageTeamOwner = new PageMetaPageTeamOwner(o.id, o.username)
    this.sendPageOwner.emit(owner)
  }
  setPlanPurpose() {
    this.sendPlanPurpose.emit(this.textAreaVal)
  }
  toggle() {
    this.flagg = !this.flagg;
    this.collapseCard = !this.collapseCard;
    this.upArrow = !this.upArrow;
    this.downArrow = !this.downArrow;
  }

  openInfoCard() {
    if (this.lockstatus == false || this.lockstatus == undefined) {
      this.showInfoModal = !this.showInfoModal;
    }
  }

  // openLightCard() {
  //   this.showLightModal = !this.showLightModal;
  // }
  openLightCard() {
    if (this.lockstatus == false || this.lockstatus == undefined) {
      this.sendPhaseOneModalFlag.emit(true);
      if (
        this.phaseOneModalFlag == true &&
        this.phaseTwoModalFlag == false &&
        this.phaseFourModalFlag == false &&
        this.phaseFiveModalFlag == false &&
        this.phaseThreeModalFlag == false
      ) {
        this.showLightModal = !this.showLightModal;
      }
    }
  }

  addFields() {
    this.items.push([''])
  }

  removeFields() {
    this.items.pop()
  }

  onClickShowMic() {
    console.log("onClickShowMic......")
    this.showMicForTextArea = true
  }

  startService() {

    if (this.voiceservice == false) {
      this.voiceToTextService.start()
      this.voiceservice = true;
      // this.textAreaVal = this.voiceToTextService.text
      console.log("........", this.textAreaVal)
      window['listenInterval'] = setInterval(() => {
        this.textAreaVal = this.voiceToTextService.text
        this.sendPlanPurpose.emit(this.textAreaVal)
      }, 500)
    } else {
      this.textAreaVal = this.voiceToTextService.text
      this.sendPlanPurpose.emit(this.textAreaVal)
      clearInterval(window['listenInterval'])
      this.stopService();
    }

  }

  stopService() {
    if (this.voiceservice) {
      this.voiceToTextService.stop();
      this.voiceservice = false;
    }
  }

  addStatement() {
    console.log("helloworld adda staten");
    this.statementsList.push('')


  }

  removeStatement() {
    console.log("before from remove ", this.statementsList)

    if (this.removestatementindex == undefined || this.removestatementindex == 0) {
      this.statementsList.pop();
    } else {

      this.statementsList.splice(this.removestatementindex, this.removestatementindex);
    }

    console.log(" After from remove ", this.statementsList, this.removestatementindex)
    // this.statementsList.pop();
  }

  removeStatementIndex(index: number) {
    console.log("delete index", index)
    this.removestatementindex = index
  }

  addMemebers() {
    this.memebrs.push('')
  }

  removeMembers() {
    this.memebrs.pop()
  }

  search(event) {
    console.log("serch method called..." + event.query)
    this.results = this.teamMemeberService.search(event.query)
  }
}
