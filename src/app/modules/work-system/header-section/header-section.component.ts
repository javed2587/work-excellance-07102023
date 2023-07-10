import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ConfirmationService, MessageService, PrimeNGConfig } from 'primeng/api';
import { IRatingDecision, RatingDecision, RatingTask } from 'src/app/models/common/rating';
import { User } from 'src/app/models/user/user';
import { PageMetaPageTeamOwner } from 'src/app/models/work-system/work-system-body';
import { PageData, PageDataLeadershipRail, PageDataManagementSystems, PageDataWorkTypes, PageMeta } from 'src/app/models/work-system/work-system-header';
import { LogService } from 'src/app/services/log.service';
// import { RatingService } from 'src/app/services/rating.service';
import { TeamMembersService } from 'src/app/services/team-members.service';
import { UserService } from 'src/app/services/user/user.service';
import { VoiceToTextServiceService } from 'src/app/services/voice-to-text-service.service';
// import tooltips from '../../../../assets/data/tooltips.json';
@Component({
  selector: 'app-header-section',
  templateUrl: './header-section.component.html',
  styleUrls: ['./header-section.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class HeaderSectionComponent implements OnInit, OnChanges {

  showBody = true;
  upArrow = true;
  downArrow = false;
  currentModuleName: string = 'Work System Name'
  showSnakeBar: Boolean
  showModal: Boolean = false;
  trextTwoModal: Boolean = false;
  modal: Boolean = false;
  showLightModal: Boolean = false;

  firstTextVoiceservice = false;
  secondTextVoiceservice = false;
  workTypeVoiceservice = false;
  managmentVoiceservice = false;

  showMicForFirstTextArea = false;
  showMicForSecondTextArea = false;
  showMicForWorkType = false;
  showMicForManagment = false;
  isPrimeModal: boolean = false;
  worktypeModalFlag: Boolean = false;
  managementtypeModalFlag: Boolean = false;
  textAreaColor = ''
  firstTextAreaColor = ''
  addMessage: string = ''
  messageType: string = ''
  users: Array<User>;
  @Input() managment: PageDataManagementSystems[] = []
  @Input() workTypeList: PageDataWorkTypes[] = []
  // workTypeList: any[] = []

  secondWorkSystemDictonery: any = []
  selectiveIndex: number = -1
  @Input() leadershipTextValue = ""
  secondTextValue = "Ensure "
  results: any;
  pageOwnerUser: User = new User(null, null, null, null, null, [], null, null)
  @Input() pageOwner: PageMetaPageTeamOwner = new PageMetaPageTeamOwner(null, null)
  headerSectionShowModalFlag: Boolean = false;
  @Input() nameValue = ''
  nameForManagementRail = ''
  noteForManagemetRail = ''
  opertunityForManagmentRail = ''
  decisionForManagmentRail: RatingDecision = {} as RatingDecision
  taskForManagementRail: RatingTask = {} as RatingTask

  nameForLeaderRail = ''
  noteForLeaderRail = ''
  opertunityForLeaderRail = ''
  decisionForLeaderRail: RatingDecision = {} as RatingDecision
  taskForLeaderRail: RatingTask = {} as RatingTask

  @Input() headerSectionModalFlag;
  @Input() phaseListModalFlag;
  @Input() lockstatus: Boolean = false;
  @Input() isPageDataOn: boolean = false
  @Output() pusheaderBackendData = new EventEmitter();
  //  @Output() pusheaderBackendData = new EventEmitter<PageData>();
  @Output() sendHeaderSectionShowModalFlag = new EventEmitter();
  @Output() sendWorkType = new EventEmitter()
  @Output() sendManagementSystem: EventEmitter<Array<PageDataManagementSystems>> = new EventEmitter()
  @Output() sendManagementType = new EventEmitter()
  @Output() sendPageName = new EventEmitter()
  @Output() sendPageNameNotes = new EventEmitter();
  @Output() sendPageNameOpportunity = new EventEmitter();
  @Output() sendPageNameTask = new EventEmitter();
  @Output() sendPageNameDecision = new EventEmitter()
  @Output() sendPageOwner = new EventEmitter()
  @Output() sendLeaderShipRail = new EventEmitter()
  @Input() managementRailObj;
  managementRail: any = {
    rating: {
      color: null,
      note: { date: new Date(), text: null, owner: { name: null, userId: null } },
      opportunity: { date: new Date(), text: null, owner: { name: null, userId: null } },
      task: {
        owner: {
          userId: null,
          name: null,
        },
        priority: null,
        contributor: {
          userId: null,
          name: null
        },
        task: null,
        notes: null,
        status: null,
        dueDate: null
      },
      decision: {
        date: null,
        owner: {
          userId: null,
          name: null
        },
        summary: null
      }

    },
    text: null
  }
  @Input() leaderShipRailObj;
  leaderShipRail: PageDataLeadershipRail = {
    rating: {
      color: null,
      note: { date: new Date(), text: null, owner: { name: null, userId: null } },
      opportunity: { date: new Date(), text: null, owner: { name: null, userId: null } },
      task: {
        id: null,
        owner: {
          userId: null,
          name: null,
        },
        priority: null,
        contributor: {
          userId: null,
          name: null
        },
        task: null,
        notes: null,
        status: null,
        dueDate: null
      },
      decision: {
        date: null,
        owner: {
          userId: null,
          name: null
        },
        summary: null
      }

    },
    text: null
  }
  // isFirst: Boolean = false;
  // isSecond: Boolean = false;
  // alertFlag: boolean = false;
  // workTypeFlag: Boolean = false;
  //  managementFlag: Boolean = false;
  //  canDrag:boolean = true;
  // today: number = Date.now();
  // modalDescription:string = " The name of this Work System.(Examples Include: Sales, Human Resources, Information Technology, Production, Finance, Purchasing.)"
  // rating:Boolean = true
  // secondTextValue = ""
  // title: string = 'Management System';
  // isOenSnakBar: boolean = true;
  // index: number = -1
  // railNumIndex: number = -1;
  // fieldNumIndex: number = -1;
  // tooltipsJSON: any = tooltips.tooltipsworksystem;
  // calanderVal: any[] = []
  // teamMemebrs: any = []
  // leaderShip: any = []
  // secondRailDictonery: any = []
  // secondCarddictionery: any = []
  // inputFiledManagement: any = [];
  // @Output() sendPhaseListModalFlag = new EventEmitter();

  constructor(

    public _voiceToTextService: VoiceToTextServiceService,
    private primengConfig: PrimeNGConfig,
    private logService: LogService,
    private teamMemeberService: TeamMembersService,
    private userService: UserService
    // private messageService: MessageService,
    // private confirmationService: ConfirmationService,
    // private _serv: RatingService,

  ) {

    this._voiceToTextService.init()
    _voiceToTextService.text = '';
  }
  clearLeadershipData() {
  }

  clearManagementData() {
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
      if (propName == "isPageDataOn") {
        const chng = changes[propName];
        if (chng.currentValue)
          this.saveDataForBackend()
      } else if (propName == 'leaderShipRail') {
        if (this.leaderShipRailObj) {
          this.leadershipTextValue = this.leaderShipRail.text.valueOf()
        } else {
          this.clearLeadershipData()
        }
      } else if (propName == 'managementRail') {
        if (this.managementRailObj) {
          this.secondTextValue = this.managementRail.text
        } else {
          this.clearManagementData()
        }
      }
    }
  }
  initializeManagementRail() {
    this.managementRail = {
      rating: {
        color: null,
        note: { date: new Date(), text: null, owner: { name: null, userId: null } },
        opportunity: { date: new Date(), text: null, owner: { name: null, userId: null } },
        task: {
          owner: {
            userId: null,
            name: null,
          },
          priority: null,
          contributor: {
            userId: null,
            name: null
          },
          task: null,
          notes: null
        },
        decision: {
          date: null,
          owner: {
            userId: null,
            name: null
          },
          summary: null
        }

      },
      text: null
    }
  }
  initializeLeadershipRail() {
    this.leaderShipRail = {
      rating: {
        color: null,
        note: { date: new Date(), text: null, owner: { name: null, userId: null } },
        opportunity: { date: new Date(), text: null, owner: { name: null, userId: null } },
        task: {
          id: null,
          owner: {
            userId: null,
            name: null,
          },
          priority: null,
          contributor: {
            userId: null,
            name: null
          },
          task: null,
          notes: null,
          status: null,
          dueDate: null
        },
        decision: {
          date: null,
          owner: {
            userId: null,
            name: null
          },
          summary: null
        }

      },
      text: null
    }
  }
  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.loadUsers()
    if (this.leaderShipRail)
      this.initializeLeadershipRail()
  }
  loadUsers() {
    if (this.userService.findByOrgId()) {
      this.userService.findByOrgId().subscribe((users: Array<User>) => {
        this.users = users
      })
    }
  }
  // pageMeta : PageMeta
  // headerpageData : PageData
  // headerPageDate: PageData = {
  //   leadershipRail: undefined,
  //   managementRail: undefined,
  //   workTypes: undefined,
  //   managementSystems: PageDataManagementSystems = {} as PageDataManagementSystems
  // }.
  headerPhasesPage: PageData = {} as PageData;
  saveDataForBackend() {

    //  this.headerPhasesPage.leadershipRail = this.headerPhasesPage.leadershipRail {
    // leadershipRail: {
    //    rating: {
    //      color: this.colorForLeadershipRail,
    //      note: any,
    //      oppertunity: "",
    //      task: {
    //        owner: {userId:"1", name: "javed"},
    //        periority: worktype.periorityValue,
    //        contributor: {userId: '11', name: "javed iqbal"},
    //        task: worktype.taskTextArea,
    //        notes: worktype.noteTextArea
    //      },
    //      decision: {
    //       owner: {userId: "111", name: 'javed iqbal vera'},
    //       summery: 'abc'
    //      }
    //    },
    //    text: this.leadershipTextValue
    //  },
    //  managementRail:{
    //    rating: {
    //     color: worktype.color,
    //    },
    //    text: this.managmentRailValue
    //  }
    //  this.headerPhasesPage.workTypes =  this.headerPhasesPage.workTypes{

    //  },
    //  this.headerPhasesPage.managementSystems =  this.headerPhasesPage.managementSystems  {
    //         text:  this.managment[this.selectiveIndex].text,
    //         rating: {
    //           color: this.managment[this.selectiveIndex].rate.color,
    //           note:  this.managment[this.selectiveIndex].notes,
    //           oppertunity: this.managment[this.selectiveIndex].oppertunity,
    //           task: {
    //             owner: {userId:"1", name:   this.managment[this.selectiveIndex].task.owner},
    //             periority: this.managment[this.selectiveIndex].task.periority,
    //             contributor: {userId: '11', name: this.managment[this.selectiveIndex].task.contributor},
    //             task:  this.managment[this.selectiveIndex].task.task,
    //             notes: this.managment[this.selectiveIndex].task.notes
    //           },
    //           decision: {
    //            owner: {userId: "111", name: this.managment[this.selectiveIndex].decision.owner},
    //            summary: this.managment[this.selectiveIndex].decision.summary
    //         }
    //      }
    //     }
    this.pusheaderBackendData.emit("header push value..")
  }
  toggleBody() {
    this.upArrow = !this.upArrow;
    this.downArrow = !this.downArrow;
    this.showBody = !this.showBody;
    this.logService.log("toggle testing")
  }
  //? Name
  openLightCardOnName() {
    // if (this.lockstatus == false || this.lockstatus == undefined) { }
    this.sendHeaderSectionShowModalFlag.emit((this.headerSectionShowModalFlag = true));
    if (this.headerSectionModalFlag == true) {
      if (this.showLightModal == false) {
        this.showLightModal = true;
        this.showModal = false;
        this.trextTwoModal = false;
        this.worktypeModalFlag = false;
        this.managementtypeModalFlag = false;
      } else if (this.showLightModal == true) {
        this.showLightModal = false;
      }
    }
  }

  // Names attrs
  saveName(value) {
    console.log("saveName Value:", value)
    this.sendPageName.emit(value)
  }
  setNotesValueForNmae(notes) {
    console.log("Name notes:", notes)
    this.sendPageNameNotes.emit(notes)
  }
  setOppertunityForName(oppertunity) {
    console.log("Name Opportunity:", oppertunity)
    this.sendPageNameOpportunity.emit(oppertunity)
  }
  setDecisionValueForName(decision) {
    console.log("DecisionValue for Name:", decision)
    this.sendPageNameDecision.emit(decision)
  }
  setTaskValueForName(task) {
    console.log("Task Value for Name:", task)
    this.sendPageNameTask.emit(task)
  }

  //? PageOwner
  searchPageOwner(event) {
    this.results = this.teamMemeberService.search(event.query)
  }
  savePageOwner(values: User) {
    console.log("savePageOwner", values)
    const pageOwner: PageMetaPageTeamOwner = new PageMetaPageTeamOwner(values.id, values.username)
    this.sendPageOwner.emit(pageOwner)
  }
  //? Leadershaip Rail
  addTextAreaRatingForLeadershipRail() {
    // if (this.lockstatus == false || this.lockstatus == undefined) {}
    if (this.headerSectionModalFlag == true) {
      if (this.showModal == false) {
        this.showModal = true;
        this.showLightModal = false;
        this.trextTwoModal = false;
        this.worktypeModalFlag = false;
        this.managementtypeModalFlag = false;
      } else if (this.showModal == true) {
        this.showModal = false;
      }
    }
    this.sendHeaderSectionShowModalFlag.emit(
      (this.headerSectionShowModalFlag = true)
    );
  }
  // LeaderShip Rail content updation
  saveLaderShipRail(value) {
    console.log("saveLaderShip..", value)
    if (this.leaderShipRail)
      this.leaderShipRail.text = value;
    this.sendLeaderShipRail.emit(this.leaderShipRail)
    console.log(this.leaderShipRail)
  }
  setColorForLeadership(val: any) {
    this.firstTextAreaColor = val
    this.showModal = false;
    this.trextTwoModal = false;
    this.showSnakeBar = !this.showSnakeBar
    console.log("Color Rating for Leadership:", val)
    this.leaderShipRail.rating.color = val == '' ? null : val
    this.sendLeaderShipRail.emit(this.leaderShipRail)
    console.log(this.leaderShipRail)
  }
  setNotesValueForLeaderShipRail(notes) {
    console.log("Notes Value", notes)
    this.leaderShipRail.rating.note = notes;
    this.sendLeaderShipRail.emit(this.leaderShipRail)
    console.log(this.leaderShipRail)
  }
  setOppertunityForLeaderShipRail(oppertunity) {
    console.log("Opportunity Value", oppertunity)
    this.leaderShipRail.rating.opportunity = oppertunity
    this.sendLeaderShipRail.emit(this.leaderShipRail)
    console.log(this.leaderShipRail)
  }
  setTaskValueForLeaderShipRail(task) {
    console.log("Task Value", task)
    this.leaderShipRail.rating.task = task;
    this.sendLeaderShipRail.emit(this.leaderShipRail)
    console.log(this.leaderShipRail)
  }
  setDecisionValueForLeaderShipRail(decision) {
    console.log("Decision Value", decision);
    this.leaderShipRail.rating.decision = decision;
    this.sendLeaderShipRail.emit(this.leaderShipRail)
    console.log(this.leaderShipRail)
  }

  showMicForLeadership(val: string) {
    if (val == 'firstMic') {
      this.showMicForFirstTextArea = true;
      this.showMicForSecondTextArea = false;
    } else {
      this.showMicForSecondTextArea = true;
      this.showMicForFirstTextArea = false;
    }
  }

  //? Managment Rail
  textAreaRatingForManagmentRail() {

    // if (this.lockstatus == false || this.lockstatus == undefined) {}
    // this.sendPhaseListModalFlag.emit(this.phaseListModalFlag = false)
    this.sendHeaderSectionShowModalFlag.emit((this.headerSectionShowModalFlag = true));
    if (this.headerSectionModalFlag == true) {
      if (this.trextTwoModal == false) {
        this.trextTwoModal = true;
        this.showLightModal = false;
        this.showModal = false;
        this.worktypeModalFlag = false;
        this.managementtypeModalFlag = false;
      } else if ((this.trextTwoModal = true)) {
        this.trextTwoModal = false;
      }
    }
  }
  // Management Rail Content Updation
  saveManagementRail(value) {
    console.log("saveManagementRail..", value)
    if (this.managementRail)
      this.managementRail.text = value
    this.sendManagementType.emit(this.managementRail)
    console.log(this.managementRail)
  }
  setColorForManagementRail(val: any) {
    this.textAreaColor = val
    this.showModal = false;
    this.trextTwoModal = false;
    this.showSnakeBar = !this.showSnakeBar
    console.log("Management Rail Color Rating:", val)
    this.managementRail.rating.color = val == '' ? null : val
    this.sendManagementType.emit(this.managementRail)
    console.log(this.managementRail)
  }
  setNotesValueForMangementRail(notes) {
    this.noteForManagemetRail = notes
    console.log("note...", this.noteForManagemetRail)
    this.managementRail.rating.note = notes
    this.sendManagementType.emit(this.managementRail)
    console.log(this.managementRail)
  }
  setOppertunityForMangementRail(oppertunity) {
    this.opertunityForManagmentRail = oppertunity
    console.log("oppertunity...", this.opertunityForManagmentRail)
    this.managementRail.rating.opportunity = oppertunity
    this.sendManagementType.emit(this.managementRail)
    console.log(this.managementRail)

  }
  setDecisionValueForManagementRail(decision: IRatingDecision) {
    // const ownerName = decision.owner
    // const text = decision.summery
    // const dateVal = decision.date
    // console.log(this.decisionForManagmentRail)
    // console.log(this.decisionForManagmentRail.owner)
    // this.decisionForManagmentRail.owner.name = ownerName
    // this.decisionForManagmentRail.summary = text
    // this.decisionForManagmentRail.date = dateVal
    console.log("decision...", decision)
    this.managementRail.rating.decision = decision;
    this.sendManagementType.emit(this.managementRail)
    console.log(this.managementRail)
  }
  setTaskValueForManagemetRail(task) {
    // const ownerVal = task.owner
    // const perVal = task.periority
    // const contributor = task.contributor
    // const taskVal = task.task
    // const notesVal = task.notes
    // this.taskForManagementRail.owner.name = ownerVal
    // this.taskForManagementRail.contributor.name = contributor
    // this.taskForManagementRail.periority = perVal
    // this.taskForManagementRail.task = taskVal
    // this.taskForManagementRail.notes = notesVal
    console.log("task...", task)
    this.managementRail.rating.task = task;
    this.sendManagementType.emit(this.managementRail)
    console.log(this.managementRail)
  }


  //? Work Type
  addFieldsWorkType() {
    this.isPrimeModal = false;
    if (this.lockstatus == false || this.lockstatus == undefined) {
      if (this.workTypeList.length < 15) {
        let i = 0;
        this.workTypeList.push(
          {
            seqNumber: '',
            id: null,
            text: null,
            rating: {
              color: null,
              note: { date: new Date(), text: null, owner: { name: null, userId: null } },
              opportunity: { date: new Date(), text: null, owner: { name: null, userId: null } },
              task: {
                id: null,
                owner: { userId: null, name: null },
                priority: null,
                contributor: { userId: null, name: null },
                task: null,
                notes: null,
                status: null,
                dueDate: null
              },
              decision: {
                owner: { userId: null, name: null },
                summary: null,
                date: new Date()
              },
              showModal: false,
              isDisabledDragDrop: false
            }
          }
        )
        this.sendWorkType.emit(this.workTypeList)
        // note: ''
        // oppertunity:'',
        // task: {
        //   owner:{userId: "", name: ""},
        //   periority: {userId: "", name: ""},
        //   contributor: {userId: '', name: ""},
        //   task: '',
        //   notes: ''
        // },
        //   decision: {
        //    owner: {userId:'', name: ''},
        //    summery: ''
        // },
      } else {
        this.addMessage = "Generally 15 or less Work Types is sufficient."
        this.isPrimeModal = true;
        this.messageType = "Work Types"
      }
    }
  }
  removeFieldWorkType() {

    if (this.lockstatus == false || this.lockstatus == undefined) {
      if (this.selectiveIndex != -1) {
        this.workTypeList.splice(this.selectiveIndex, 1)
        this.sendWorkType.emit(this.workTypeList)
        this.selectiveIndex = -1

      } else {
        this.workTypeList.pop();
        this.sendWorkType.emit(this.workTypeList)
        if (this.workTypeList.length == 0) {
          this.showMicForWorkType = false;
        }
      }
    }
  }

  oenSnakbarForWorkType(i: number) {
    this.workTypeList[i].rating.isDisabledDragDrop = true;
    // if (this.lockstatus == false || this.lockstatus == undefined){}
    if (this.headerSectionModalFlag == true) {
      if (this.workTypeList[i]?.rating?.showModal == true) {
        this.workTypeList[i].rating.showModal = !this.workTypeList[i]?.rating?.showModal;
        this.worktypeModalFlag = false;
      } else {
        this.workTypeList.map((card) => {
          card.rating.showModal = false;
        });
        this.workTypeList[i].rating.showModal = true;
        this.worktypeModalFlag = true;
        this.showLightModal = false;
        this.showModal = false;
        this.trextTwoModal = false;
        this.managementtypeModalFlag = false;
        this.showSnakeBar = !this.showSnakeBar;
        this.selectiveIndex = i;
      }
    }
    this.sendHeaderSectionShowModalFlag.emit(
      (this.headerSectionShowModalFlag = true)
    );
  }
  setColorValueForWorkType(val: any) {

    this.workTypeList[this.selectiveIndex].rating.showModal = false
    this.workTypeList[this.selectiveIndex].rating.color = val == '' ? null : val
    this.sendWorkType.emit(this.workTypeList)
    console.log("Selected color is: ", val)
    console.log("Selected Color in List:", this.workTypeList)
    this.showSnakeBar = !this.showSnakeBar
  }
  setNotesValueForworkType(note) {
    this.workTypeList[this.selectiveIndex].rating.note = note;
    this.sendWorkType.emit(this.workTypeList)
    console.log(this.workTypeList)
    // this.showSnakeBar = !this.showSnakeBar
  }
  setOppertunityForWorkType(oppertunuty) {
    this.workTypeList[this.selectiveIndex].rating.opportunity = oppertunuty
    this.sendWorkType.emit(this.workTypeList)
    console.log(this.workTypeList)
    this.showSnakeBar = !this.showSnakeBar
  }
  setDecisionValueForWorktype(decision: IRatingDecision) {
    this.workTypeList[this.selectiveIndex].rating.decision = decision
    this.sendWorkType.emit(this.workTypeList)
    console.log(this.workTypeList)
    this.showSnakeBar = !this.showSnakeBar
  }
  setTaskValueForWorkType(task) {
    this.workTypeList[this.selectiveIndex].rating.task = task
    console.log(this.workTypeList)
    this.sendWorkType.emit(this.workTypeList)
    this.showSnakeBar = !this.showSnakeBar
  }
  dropWorkSystem(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.workTypeList, event.previousIndex, event.currentIndex);
    console.log(this.workTypeList)
  }
  fetchIndexForWorkType(i: number) {
    this.selectiveIndex = i
    this.showMicForWorkType = true;
    console.log("Index is :", i + 1)
    this.workTypeList[i].seqNumber = (i + 1).toString()
  }
  saveWorkType(value: string, index: number) {

    this.workTypeList[index].text = value
    this.workTypeList[this.selectiveIndex].seqNumber = (this.selectiveIndex + 1).toString()
    this.sendWorkType.emit(this.workTypeList)
    console.log("saveWorkType..", value)
    console.log("Work type List:", this.workTypeList)

  }
  //? Management System
  addFiledManagement() {
    this.isPrimeModal = false;
    if (this.lockstatus == false || this.lockstatus == undefined) {
      if (this.managment.length < 15) {
        this.managment.push(
          {
            seqNumber: '',
            id: null,
            text: null,
            rating: {
              color: null,
              note: { date: new Date(), text: null, owner: { name: null, userId: null } },
              opportunity: { date: new Date(), text: null, owner: { name: null, userId: null } },
              task: {id: null, owner: { userId: null, name: null }, priority: null, contributor: { userId: null, name: null }, task: null, notes: null, status: null, dueDate: null },
              decision: { owner: { userId: '', name: '' }, summary: '', date: new Date() },
              showModal: false,
              isDisabledDragDrop: false
            }
          }
        )
        this.sendManagementSystem.emit(this.managment)
      }
      else {
        this.addMessage = "Generally 15 Management Systems is sufficient."
        this.isPrimeModal = true;
        this.messageType = "Management System"
      }
    }
  }
  // addFiledManagement() {
  //   this.isPrimeModal = false;
  //   if (this.lockstatus == false || this.lockstatus == undefined){
  //   if(this.managment.length < 15){
  //     this.managment.push(
  //       {
  //         color: '',
  //         showModal: false,
  //         text: ''+'   Management System',
  //         isDisabledDragDrop : false
  //           }
  //            )
  //   }
  //   else {
  //     this.addMessage  = "Generally 15 Management Systems is sufficient."
  //     this.isPrimeModal = true;
  //     this.messageType = "Management System"
  //   }
  // }
  // }
  removeFiledManagement() {

    if (this.lockstatus == false || this.lockstatus == undefined) {
      if (this.selectiveIndex != - 1) {
        this.managment.splice(this.selectiveIndex, 1)
        this.sendManagementSystem.emit(this.managment)
        this.selectiveIndex = - 1
      } else {
        this.managment.pop();
        this.sendManagementSystem.emit(this.managment)
        if (this.workTypeList.length == 0) {
          this.showMicForManagment = false;
        }
      }
    }
  }
  openSankebarForManagment(i: number) {
    this.managment[i].rating.isDisabledDragDrop = true;
    this.sendHeaderSectionShowModalFlag.emit(
      (this.headerSectionShowModalFlag = true)
    );
    if (this.headerSectionModalFlag == true) {
      if (this.managment[i].rating.showModal == true) {
        this.managment[i].rating.showModal = !this.managment[i]?.rating?.showModal;
        this.managementtypeModalFlag = false;
      } else {
        this.managment.map((card) => {
          card.rating.showModal = false;
        });
        this.managment[i].rating.showModal = true;
        this.managementtypeModalFlag = true;
        this.showLightModal = false;
        this.showModal = false;
        this.trextTwoModal = false;
        this.worktypeModalFlag = false;
        this.showSnakeBar = !this.showSnakeBar;
        this.selectiveIndex = i;
      }
    }
  }
  setColorValueForManagment(val: any) {
    this.managment[this.selectiveIndex].rating.showModal = false
    this.managment[this.selectiveIndex].rating.color = val == '' ? null : val
    this.sendManagementSystem.emit(this.managment)
    this.showSnakeBar = !this.showSnakeBar
  }
  setNotesValue(notes) {

    this.managment[this.selectiveIndex].rating.showModal = false
    this.managment[this.selectiveIndex].rating.note = notes
    this.sendManagementSystem.emit(this.managment)
    this.showSnakeBar = !this.showSnakeBar
    console.log("setNotesValue for mangemetn", this.managment)
  }
  setOppertunityForManagment(value) {
    this.managment[this.selectiveIndex].rating.showModal = false;
    this.managment[this.selectiveIndex].rating.opportunity = value;
    this.sendManagementSystem.emit(this.managment)
    this.showSnakeBar = !this.showSnakeBar
    console.log("setNotesValue for mangemetn", this.managment)
  }
  setDecisionValue(value: RatingDecision) {
    console.log("Decision Value for management:", value)
    this.managment[this.selectiveIndex].rating.showModal = false;
    this.managment[this.selectiveIndex].rating.decision = value
    this.sendManagementSystem.emit(this.managment)
    this.showSnakeBar = !this.showSnakeBar
    console.log("setNotesValue for mangemetn", this.managment)
  }
  setTaskValue(values) {
    this.managment[this.selectiveIndex].rating.task = values
    this.sendManagementSystem.emit(this.managment)
    console.log(this.managment)
  }
  dropMangment(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.managment, event.previousIndex, event.currentIndex);
  }
  fetchIndexForManagment(i: number) {
    this.selectiveIndex = i
    this.showMicForManagment = true;
  }
  saveManagementValue(value: string, index: number) {
    this.managment[index].text = value;
    this.sendManagementSystem.emit(this.managment)
    console.log(this.managment);
  }
  setCursorForManagment(index) {
    let input = <HTMLInputElement>(
      document.getElementsByName('managementfield')[index]
    );
    input.setSelectionRange(0, 0);
    input.focus();
  }

  //? Others
  getIsDispalyPrimeAlrt(isEligible) {
    this.isPrimeModal = isEligible;
  }
  startService(event) {
    if (this.lockstatus == false || this.lockstatus == undefined) {
      if (event == "firstTextArea") {
        if (this.firstTextVoiceservice == false) {
          this._voiceToTextService.start()
          this.firstTextVoiceservice = true;
          console.log("selected index is", this.selectiveIndex)
          window['listenInterval'] = setInterval(() => {
            this.leadershipTextValue = this._voiceToTextService.text
            if (this.leaderShipRail)
              this.leaderShipRail.text = this._voiceToTextService.text;
            this.sendLeaderShipRail.emit(this.leaderShipRail)
          }, 500)
        }
        else {
          this.leadershipTextValue = this._voiceToTextService.text
          if (this.leaderShipRail)
            this.leaderShipRail.text = this._voiceToTextService.text;
          this.sendLeaderShipRail.emit(this.leaderShipRail)
          clearInterval(window['listenInterval'])
          this.stopService();
        }
      }
      else if (event == "secondTextArea") {
        if (this.secondTextVoiceservice == false) {
          this._voiceToTextService.start()
          this.secondTextVoiceservice = true;
          console.log("selected index is", this.selectiveIndex)
          window['listenInterval'] = setInterval(() => {
            this.secondTextValue = this._voiceToTextService.text
            if (this.managementRail)
              this.managementRail.text = this._voiceToTextService.text
            this.sendManagementType.emit(this.managementRail)
          }, 500)
        }
        else {
          this.secondTextValue = this._voiceToTextService.text
          if (this.managementRail)
            this.managementRail.text = this._voiceToTextService.text
          this.sendManagementType.emit(this.managementRail)
          clearInterval(window['listenInterval'])
          this.stopService();
        }
      } else if (event == "workType") {
        if (this.workTypeVoiceservice == false) {
          this._voiceToTextService.start()
          this.workTypeVoiceservice = true;
          console.log("selected index is", this.selectiveIndex)
          window['listenInterval'] = setInterval(() => {
            this.workTypeList[this.selectiveIndex].text = this._voiceToTextService.text
            this.sendWorkType.emit(this.workTypeList)
          }, 500)
        }
        else {
          this.workTypeList[this.selectiveIndex].text = this._voiceToTextService.text
          this.sendWorkType.emit(this.workTypeList)
          clearInterval(window['listenInterval'])
          this.stopService();
        }
      } else {
        if (this.managmentVoiceservice == false) {
          this._voiceToTextService.start()
          this.managmentVoiceservice = true;
          console.log("selected index is", this.selectiveIndex)
          window['listenInterval'] = setInterval(() => {
            this.managment[this.selectiveIndex].text = this._voiceToTextService.text
            this.sendManagementSystem.emit(this.managment)
          }, 500)
        }
        else {
          this.managment[this.selectiveIndex].text = this._voiceToTextService.text
          this.sendManagementSystem.emit(this.managment)
          clearInterval(window['listenInterval'])
          this.stopService();
        }
      }
    }
  }
  stopService() {
    if (this.firstTextVoiceservice) {
      this.firstTextVoiceservice = false;
    } else if (this.secondTextVoiceservice) {
      this.secondTextVoiceservice = false;
    } else if (this.workTypeVoiceservice) {
      this.workTypeVoiceservice = false;
    } else if (this.managmentVoiceservice) {
      this.managmentVoiceservice = false;
    }
    this._voiceToTextService.stop();
  }


  //
  // openInfoCard() {
  //   if (this.lockstatus == false || this.lockstatus == undefined) {
  //   this.showInfoModal = !this.showInfoModal;
  // }}
  // fetchIndexForTextArea(i: number) {
  //   this.selectiveIndex = i
  // }
  // -------------------Work Type content --------------------
  //  OpenSnakeBar() {
  //
  //   this.workTypeList[this.index]
  //  }
  // this.managment[i].isDisabledDragDrop = true;
  // this.selectiveIndex = i
  // this.showMicForManagment = true;
  // --        ------Managment content ----------------------
  // voice over code
  // updateValue(value) {
  //   this.secondTextValue = value;
  // }
  // isSnackBar(isOpen) {
  //
  //    this.canDrag = isOpen
  // }
  // getIsSnakBarOpened(isOpened) {
  //
  //   this.workTypeList[this.selectiveIndex].showModal = isOpened
  //   // this.showSnakeBar = isOpened;
  // }
  // console.log(this.today)
  // this.calanderVal = [
  //   {
  //     label: 'Start Date ',
  //     date: Date.now() - 30
  //   },
  //   {
  //     label: 'Interval ',
  //     date: '600',
  //   },
  //   {
  //     label: 'End Date :',
  //     date: Date.now() + 60
  //   },
  //   {
  //     label: 'Created ',
  //     date: Date.now() - 5
  //   },
  //   {
  //     label: 'Updated ',
  //     date: Date.now()
  //   }
  // ];
  // this.secondWorkSystemDictonery = [
  //   { color: { background: '#95F204' }, number: '4.0', placeHolder: 'Ken Burket' },
  //   { color: { background: '#02A7F0' }, number: '5.0', placeHolder: 'Ole underson' },
  //   { color: { background: '#FFFF00' }, number: '6.0', placeHolder: 'Liam' },
  //   { color: { background: '#EE1F55' }, number: '7.0', placeHolder: 'Oliver' },
  //   { color: { background: '#EE1F55' }, number: '8.0', placeHolder: 'William' },
  //   { color: { background: '#95F204' }, number: '9.0', placeHolder: 'James' },
  //   { color: { background: '#02A7F0' }, number: '0.0', placeHolder: 'joe' },
  // ];
  /*-- ---------------Leadership Rail------------------- */
  // this.leaderShip = [
  //   { placeHolder: 'Research industrty database', title: 'Leadership Rail' },
  //   { placeHolder: 'Research industrty database', title: 'Mangement Rail' },
  // ];
}
