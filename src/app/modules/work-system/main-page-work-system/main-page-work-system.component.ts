import { MatSnackBar } from '@angular/material/snack-bar';
import {
  Component,
  OnInit,
} from '@angular/core';
import { PageBody } from 'src/app/models/work-system/work-system-body';
import {
  IPageDataManagementRail, PageDataManagementRail, PageMeta
} from 'src/app/models/work-system/work-system-header';
import { PageData } from 'src/app/models/work-system/work-system-header';
import { WorkSystem } from 'src/app/models/work-system/work-system';
import {
  PageDataLeadershipRailRaiting,
  PageDataWorkTypes,
  PageDataManagementSystems,
  PageDataLeadershipRail,
} from '../../../models/work-system/work-system-header';
import {
  PageMetaPageSet,
  PageMetaPageStatus,
  PageMetaPageInterval,
  PageMetaPageTeamOwner,
  PageMetaPageTeamTeamLeader,
  PageMetaPageTeamTeamMember,
  PageMetaPageTeam,
} from '../../../models/work-system/work-system-body';
import {
  RatingTask
} from '../../../models/common/rating';
import { WorkSystemService } from "../../../services/work-system/work-system.service";
import { PageChecksService } from 'src/app/services/common/page-checks.service';
// import jsPDF from 'jspdf';
import { PdfService } from 'src/app/services/pdf.service';
import { ActivatedRoute } from '@angular/router';
import { UserRole } from 'src/app/models/user/user';
import { UserService } from 'src/app/services/user/user.service';
import { PageTitleService } from 'src/app/services/page-title.service';

@Component({
  selector: 'app-main-page-work-system',
  templateUrl: './main-page-work-system.component.html',
  styleUrls: ['./main-page-work-system.component.css'],
})
export class MainPageWorkSystemComponent implements OnInit {
  pageName;
  isShowPage = true
  pageNameNotes;
  pageNameOpportunity;
  pageNameTask: RatingTask;
  pageNameDecision;
  pageOwner: PageMetaPageTeamOwner = new PageMetaPageTeamOwner(null, null);
  teamMembers: Array<PageMetaPageTeamTeamMember> = [];
  teamLead: PageMetaPageTeamTeamLeader | null = null;
  leaderShipRail: PageDataLeadershipRail | null = null;
  leaderShipRailRating: PageDataLeadershipRailRaiting | null = null
  managementRail: PageDataManagementRail | null = null;
  phases: PageBody | null = null;
  workType: Array<PageDataWorkTypes> = [];
  managementSystem: Array<PageDataManagementSystems> = [];

  userRole: UserRole
  workSystem: WorkSystem | null = null
  workSystemList: Array<WorkSystem> = []
  pageInterval: PageMetaPageInterval = new PageMetaPageInterval(
    null,
    { ratingFrequency: null, ratingFrequencyUnit: null },
    null)


  paintbyletters: boolean;
  currentModuleTitle = 'Work System';
  phaseItemModalFlag: boolean;

  isPhasesOn: boolean = false;
  isPageDataOn: boolean = false;
  pageMeta: PageMeta

  constructor(protected workSystemService: WorkSystemService, private snackBar: MatSnackBar,
    private checkService: PageChecksService, private pdfService: PdfService, private route: ActivatedRoute,
    private userService: UserService, private PageTitleService: PageTitleService) {
  }

  ngOnInit(): void {
    this.PageTitleService.setPageTitle('Work System')
    this.route.params.subscribe((params) => {
      if (params['id'])
        this.loadWorkSystemById(params['id'])
    })
  }

  loadWorkSystemById(id: string) {
    this.workSystemService.findById(id).subscribe((res: WorkSystem) => {
      if (res)
        this.fillFormForWorkSystem(res)
    })
  }

  lockstatus: boolean = false;

  totalFieldsRequired: number = 15
  totalFieldsFilled: number = 0
  percentageOfCompletion
  creationDate: Date

  updateFieldsStatus() {
    
    this.totalFieldsFilled = 0

    if (this.pageInterval)
      if (!this.checkService.isDateEmpty(this.pageInterval.startDate))
        this.totalFieldsFilled++

    if (!this.checkService.isPageIntervalEmpty(this.pageInterval))
      this.totalFieldsFilled++

    if (!this.checkService.isStringEmpty(this.pageName))
      this.totalFieldsFilled++

    if (!this.checkService.isPageTeamLeaderEmpty(this.teamLead))
      this.totalFieldsFilled++

    if (!this.checkService.isPageOwnerEmpty(this.pageOwner))
      this.totalFieldsFilled++

    if (!this.checkService.isDateEmpty(this.creationDate))
      this.totalFieldsFilled++

    if (this.phases) {
      if (this.phases.phases) {
        if (this.phases.phases.length > 0) {
          if (!this.checkService.isPhasesCountNotMatch(this.phases.phases, 2))
            this.totalFieldsFilled++

          if (!this.checkService.isPhasesStepCountNotMatch(this.phases.phases, 2))
            this.totalFieldsFilled++

          if (!this.checkService.isTitleEmptyInAnyPhase(this.phases.phases))
            this.totalFieldsFilled++

          if (!this.checkService.isEntryGateEmptyInAnyPhase(this.phases.phases))
            this.totalFieldsFilled++

          if (!this.checkService.isPurposeEmptyInAnyPhase(this.phases.phases))
            this.totalFieldsFilled++

          if (!this.checkService.isPurposeMeasureCountNotMatch(this.phases.phases, 2))
            this.totalFieldsFilled++
        }
      }
    }
    if (this.managementSystem) {
      if (this.managementSystem.length > 0) {
        if (!this.checkService.isManagementSystemCountNotMatch(this.managementSystem, 2))
          this.totalFieldsFilled++
      }
    }

    if (this.workType) {
      if (this.workType.length > 0) {
        if (!this.checkService.isWorkTypesCountNotMatch(this.workType, 1))
          this.totalFieldsFilled++
      }
    }

    if (this.leaderShipRail)
      if (!this.checkService.isStringEmpty(this.leaderShipRail.text))
        this.totalFieldsFilled++
    if (this.managementRail)
      if (!this.checkService.isStringEmpty(this.managementRail.text))
        this.totalFieldsFilled++
    this.percentageOfCompletion = ((this.totalFieldsFilled / this.totalFieldsRequired) * 100).toString()
  }


  getLockStatus(value) {
    this.lockstatus = value;
    console.log('Getting Lock Status From Main Page:', this.lockstatus);
  }

  getPaintByLetters(value) {
    this.paintbyletters = value;
    console.log(
      'Getting Paint by Letters from Main Page:',
      this.paintbyletters
    );
  }

  headerSectionModalFlag: boolean = false;
  phaseListModalFlag: boolean = false;

  getHeaderSectionShowModalFlag(value) {
    console.log('values....', value);
    this.headerSectionModalFlag = value;
    this.phaseListModalFlag = false;
  }

  getPhaseListModalFlag(value) {
    this.phaseListModalFlag = value;
    this.headerSectionModalFlag = false;
  }

  getMetaInterval(interval: PageMetaPageInterval) {
    this.pageInterval = interval
    this.updateFieldsStatus()
  }

  getCreationDate(d: Date) {
    this.creationDate = d
    this.updateFieldsStatus()
  }

  getPhaseItemModalFlag(value) {
    this.phaseItemModalFlag = value;
  }

  saveValue(values) {
    this.isPhasesOn = true;
    this.isPageDataOn = true;
  }

  savePage() {
    this.save()
    this.isPhasesOn = false;
    this.isPageDataOn = false
  }

  getBackEndData(phases: PageBody) {
    console.log('getBakendDate...', phases);
    this.phases = phases;
    this.updateFieldsStatus()
  }

  //  getHeaderBackendData(headerPageData: PageData) {
  getHeaderBackendData(headerPageData) {
    console.log('getHeaderBackendData....:', headerPageData);
  }

  getTeamMemebersForBakend(values: Array<PageMetaPageTeamTeamMember>) {
    console.log('getTeamMemebersForBakend', values);
    this.teamMembers = values;
  }

  getTeamLeadForBackend(value) {
    console.log('Team Lead for Backend', value);
    this.teamLead = value;
    this.updateFieldsStatus()
  }
  // pdf = new jsPDF()
  // savePageToPdf() {
  //   this.pdf = this.pdfService.appendHeadingAndValueInPdf("Page Name", this.pageName)
  //   this.pdf = this.pdfService.appendDataAsSectionInPdf(this.pdf, "Page Owner", ["userId", "name"], [this.pageOwner.userId, this.pageOwner.name])
  //   this.pdf = this.pdfService.appendDataAsSectionInPdf(this.pdf, "Leader Ship Rail", ["Text", "Rating Color", "Rating Notes", "Rating Opportunity", ""], [this.leaderShipRail.text, this.leaderShipRail.rating.color])
  //   this.pdfService.downloadPDFFromJsPDF(this.pdf, "Work System")
  // }

  getWorkTypeForBackend(value: Array<PageDataWorkTypes>) {
    console.log('Work Type for Backend:', value);
    this.workType = value;
    this.updateFieldsStatus()
  }

  getManagementTypeForBackend(value: Array<PageDataManagementSystems>) {
    console.log('Management Type for Backend:', value);
    this.managementSystem = value;
    this.updateFieldsStatus()
  }

  getPageOwnerForBackend(value) {
    console.log('Page Owner for Backend', value);
    this.pageOwner = value;
    this.updateFieldsStatus()
  }

  getPageNameForBackend(value) {
    console.log('Page Name for backend', value);
    this.pageName = value;
    this.updateFieldsStatus()
  }

  getPageNameNotesForBackend(value) {
    console.log('Page Name Notes for backend', value);
    this.pageNameNotes = value;
  }

  getPageNameTaskForBackend(value) {
    console.log('Page Name Task for Backend', value);
    this.pageNameTask = value;
  }

  getPageNameOpportunityForBackend(value) {
    console.log('Page Name Opportunity for Backend', value);
    this.pageNameOpportunity = value;
  }

  getPageNameDecisionForBackend(value) {
    console.log('Page Name Decsion for Backend', value);
    this.pageNameDecision = value;
  }

  getLeaderShipRailForBackend(value: PageDataLeadershipRail) {
    console.log('LeaderShip Rail for backend', value);
    this.leaderShipRail = value;
    this.updateFieldsStatus()
  }

  getManagementRailForBackend(value) {
    console.log('Management Rail for backend', value);
    this.managementRail = value;
    this.updateFieldsStatus()
  }

  getPhasesListForBackend(phases) {
    console.log('Phases List:', phases);
  }

  save() {
    if (this.workSystemPageId) {
      // Setting Page Meta
      // Page Set
      // Status of Page
      const pageStatus: PageMetaPageStatus = new PageMetaPageStatus(
        this.lockstatus ? "LOCKED" : "UNLOCKED", null
      );
      // Interval of Page
      // Team Owner
      const owner: PageMetaPageTeamOwner = this.pageOwner
      // Team Leader
      const leader: PageMetaPageTeamTeamLeader = this.teamLead
      // Team Members
      // const teamMember1: PageMetaPageTeamTeamMember = new PageMetaPageTeamTeamMember(this.teamMembers[0].id, this.teamMembers[0].names);
      // const teamMembers2: PageMetaPageTeamTeamMember = new PageMetaPageTeamTeamMember(this.teamMembers[1].id, this.teamMembers[1].names);
      // Team
      const team: PageMetaPageTeam = new PageMetaPageTeam(
        owner,
        leader,
        this.teamMembers
      );
      // Setting Page Meta Complete
      this.pageMeta.pageName = this.pageName
      this.pageMeta.pageStatus = pageStatus
      this.pageMeta.interval = this.pageInterval
      this.pageMeta.team = team
      this.pageMeta.creationDate = this.creationDate
      this.pageMeta.percentageOfCompletion = this.percentageOfCompletion

      // Logging Page Meta
      console.log('Page Meta:', this.pageMeta);

      if (this.leaderShipRail)
        this.leaderShipRail.rating.color = this.managementRail?.rating?.color == '' ? null : this.leaderShipRail?.rating?.color
      if (this.managementRail)
        this.managementRail.rating.color = this.managementRail?.rating?.color == '' ? null : this.managementRail?.rating?.color
      this.managementSystem.forEach((m, i) => {
        this.managementSystem[i].rating.color = this.managementSystem[i]?.rating?.color == '' ? null : this.managementSystem[i]?.rating?.color
      })
      this.workType.forEach((w, i) => {
        this.workType[i].rating.color = this.workType[i]?.rating?.color == '' ? null : this.workType[i]?.rating?.color
      })
      // Setting Page Data
      const pageData: PageData = new PageData(
        this.leaderShipRail, this.managementRail, this.workType, this.managementSystem
      )

      const pageBody: PageBody = this.phases
      const workSystem: WorkSystem = new WorkSystem(this.workSystemPageId, this.pageMeta, pageData, pageBody)
      // this.workSystemList.push(workSystem)
      this.workSystemService.updateWorkSystem(workSystem).subscribe(res => {
        if (res) {
          this.showSuccessMessage(res)
          console.log(res)
        }
      })
    }
  }
  showSuccessMessage(res: any) {
    if (res)
      this.snackBar.open('Page saved successfully', 'Close',
        { duration: 1500, verticalPosition: "top", panelClass: "mat-snack-bar-success" });
  }

  clearLeadershipRailData() {
    this.leaderShipRail = {
      rating: {
        color: "",
        note: { date: new Date(), text: null, owner: { name: null, userId: null } },
        opportunity: { date: new Date(), text: null, owner: { name: null, userId: null } },
        task: {
          id: null,
          owner: {
            userId: "",
            name: "",
          },
          priority: null,
          contributor: {
            userId: "",
            name: ""
          },
          task: "",
          notes: "",
          status: null,
          dueDate: null
        },
        decision: {
          date: new Date(),
          owner: {
            userId: "",
            name: ""
          },
          summary: ""
        }

      },
      text: ""
    }
  }

  clearManagementRailData() {
    this.managementRail = {
      rating: {
        color: "",
        note: { date: new Date(), text: null, owner: { name: null, userId: null } },
        opportunity: { date: new Date(), text: null, owner: { name: null, userId: null } },
        task: {
          id: null,
          owner: {
            userId: "",
            name: "",
          },
          priority: null,
          contributor: {
            userId: "",
            name: ""
          },
          task: "",
          notes: "",
          status: null,
          dueDate: null
        },
        decision: {
          date: new Date(),
          owner: {
            userId: "",
            name: ""
          },
          summary: ""
        }

      },
      text: ""
    }
  }

  clearPhasesData() {
    this.phases = {
      phases: []
    }
  }

  clearTeamLeaderData() {
    this.teamLead = new PageMetaPageTeamTeamLeader(null, null)
  }

  clearData() {
    this.workSystem = null
    this.lockstatus = false
    this.teamMembers = []
    this.workType = []
    this.pageOwner = new PageMetaPageTeamOwner(null, null)
    this.pageName = ''
    this.clearTeamLeaderData()
    this.clearLeadershipRailData()
    this.clearManagementRailData()
    this.clearPhasesData()
    this.managementSystem = []
  }

  workSystemPageId: string

  public fillFormForWorkSystem(w: WorkSystem) {
    this.workSystemPageId = w.id
    this.workSystem = w
    if (w.pageMeta) {
      this.pageMeta = w.pageMeta
      this.creationDate = w.pageMeta.creationDate
      this.pageInterval = w.pageMeta.interval
      if (w.pageMeta.pageStatus)
        this.lockstatus = w.pageMeta.pageStatus.state == "LOCKED" ? true : false
      this.percentageOfCompletion = w.pageMeta.percentageOfCompletion
      if (w.pageMeta.team) {
        this.teamLead = w.pageMeta.team.teamLeader
        this.teamMembers = w.pageMeta.team.teamMembers
        this.pageOwner = w.pageMeta.team.owner
        this.userRole = this.userService.getLoggedInUserRole(w.pageMeta.team)
      }
      this.pageName = w.pageMeta.pageName
    }
    this.phases = w.body
    if (w.pageData) {
      this.leaderShipRail = w.pageData?.leadershipRail
      this.managementRail = w.pageData?.managementRail
      this.workType = w.pageData?.workTypes
      this.managementSystem = w.pageData?.managementSystems
    }
    this.updateFieldsStatus()
  }
}
