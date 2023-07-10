import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import dateData from 'src/assets/date_data.json';
import { DateService } from 'src/app/services/common/date.service';
import {
  PageMetaPageInterval,
  PageMetaPageSet,
  PageMetaPageStatus,
  PageMetaPageTeam, PageMetaPageTeamOwner, PageMetaPageTeamTeamLeader, PageMetaPageTeamTeamMember
} from "../../../models/work-system/work-system-body";
import {
  IWorkImprovementCurrentStates, WorkImprovement, WorkImprovementContingencyPlanForBarriers,
  WorkImprovementCurrentStates, WorkImprovementInitiatives, WorkImprovementPDCAStatement,
  WorkImprovementPlanDirectionStatement,
  WorkImprovementPlanMeasures,
  WorkImprovementPlanOutcomes, WorkImprovementPotentialPlanBarriers
} from "../../../models/work-improvement/work-improvment";
import { WorkImprovementService } from "../../../services/work-improvement/work-improvement.service";
import { PageMeta } from "../../../models/work-system/work-system-header";
import { PageChecksService } from 'src/app/services/common/page-checks.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';
import { UserRole } from 'src/app/models/user/user';
import { PageTitleService } from 'src/app/services/page-title.service';


@Component({
  selector: 'app-mian-page-improvement',
  templateUrl: './mian-page-improvement.component.html',
  styleUrls: ['./mian-page-improvement.component.css']
})

export class MianPageImprovementComponent implements OnInit {
  workImprovementInterval: PageMetaPageInterval
  dateDataList;
  currntModuleTitle: string = 'Work Improvement'
  interval: any;
  frequencey: any;
  start_date: any;

  totalFieldsRequired: number = 19
  totalFieldsFilled: number = 0

  phaseFourModalFlag: Boolean = false;
  phaseFiveModalFlag: Boolean = false;
  phaseTwoModalFlag: Boolean = false;
  phaseOneModalFlag: Boolean = false;
  phaseThreeModalFlag: Boolean = false;
  lockstatus: Boolean;
  paintbyletters: Boolean;
  workImprovementCurrentStates: Array<WorkImprovementCurrentStates> = []
  workImprovementPlanDirections: Array<WorkImprovementPlanDirectionStatement> = []
  workImprovementPlanOutcomes: Array<WorkImprovementPlanOutcomes> = []
  workImprovementPlanMeasures: Array<WorkImprovementPlanMeasures> = []
  workImprovementPotentialPlans: Array<WorkImprovementPotentialPlanBarriers> = []
  workImprovementContingencyPlans: Array<WorkImprovementContingencyPlanForBarriers> = []
  workImprovementIInitiatives: Array<WorkImprovementInitiatives> = []
  workImprovementPDCAStatements: Array<WorkImprovementPDCAStatement> = []
  pageMeta: PageMeta = new PageMeta(
    null, null, null, null, null,
    new PageMetaPageSet(null, null), new PageMetaPageStatus(null, null),
    new PageMetaPageInterval(null,
      { ratingFrequency: null, ratingFrequencyUnit: null },
      null),
    new PageMetaPageTeam(new PageMetaPageTeamOwner(null, null),
      new PageMetaPageTeamTeamLeader(null, null), []), null, null, null, null, null
  )
  pageImprovementId: string
  pageName: String
  pageOwner: PageMetaPageTeamOwner = new PageMetaPageTeamOwner(null, null)
  userRole: UserRole
  constructor(public dateservice: DateService, protected workImprovementService: WorkImprovementService,
    private checkService: PageChecksService, private snackBar: MatSnackBar, private route: ActivatedRoute, private userService: UserService, private PageTitleService : PageTitleService) {

    this.dateDataList = dateData;
    this.interval = this.dateDataList.interval
    this.frequencey = this.dateDataList.frequencey
    this.start_date = this.dateDataList.startDate

    this.calculateEndDate()
  }
  ngOnInit(): void {
    this.PageTitleService.setPageTitle('Work Improvment')
    this.route.params.subscribe((params) => {
      if (params['id'])
        this.loadWorkImprovmentById(params['id'])
    })
  }

  loadWorkImprovmentById(id: string) {
    this.workImprovementService.findById(id).subscribe((wi: WorkImprovement) => {
      if (wi)
        this.fillFormForWorkImprovment(wi)
    })
  }

  fillFormForWorkImprovment(wi: WorkImprovement) {
    this.pageImprovementId = wi.id
    if (wi.pageMeta) {
      this.pageName = wi.pageMeta.pageName
      if (wi.pageMeta.team) {
        this.pageOwner = wi.pageMeta.team.owner
        this.userRole = this.userService.getLoggedInUserRole(wi.pageMeta.team)
      }
      this.pageMeta = wi.pageMeta
    }
    if (wi.pageData) {
      this.workImprovementCurrentStates = wi.pageData.currentStates
      this.workImprovementIInitiatives = wi.pageData.initiatives
      this.workImprovementPlanDirections = wi.pageData.planDirectionStatements
      this.workImprovementPlanMeasures = wi.pageData.planMeasures
      this.workImprovementPlanOutcomes = wi.pageData.planOutcomes
      this.workImprovementPotentialPlans = wi.pageData.potentialPlanBarriers
      this.workImprovementContingencyPlans = wi.pageData.contingencyPlanForBarriers
      this.workImprovementPDCAStatements = wi.pageData.pdca
    }
    this.updateFieldsStatus()
  }
  calculateEndDate() {

    this.end_date = new Date().setDate(new Date(this.start_date).getDate())
    this.end_date = new Date(this.end_date).setMonth(new Date(this.start_date).getMonth() + parseInt(this.interval))
    this.end_date = this.dateservice.mdyFormatter(this.end_date)
    if (this.dateservice.findDay(this.end_date) == "Sat") {
      this.end_date = this.dateservice.strmdyFormattee(this.dateservice.addNoOfDays(new Date(this.end_date), -1).toString())
    }
    else if (this.dateservice.findDay(this.end_date) == "Sun") {
      this.end_date = this.dateservice.strmdyFormattee(this.dateservice.addNoOfDays(new Date(this.end_date), -2).toString())
    }
  }

  up = true;
  down = false;

  end_date: any;
  toggle() {
    // this.flagg = !this.flagg;
    this.up = !this.up;
    this.down = !this.down;
  }

  sethDateValue(value: PageMetaPageInterval) {
    this.workImprovementInterval = value
  }
  getAdjustFrequency(f: String) {
    this.pageMeta.adjustFrequency = f
    this.updateFieldsStatus()
  }

  getCreationDate(c: Date) {
    this.pageMeta.creationDate = c
    this.updateFieldsStatus()
  }

  getPlanDate(p: Date) {
    this.pageMeta.planDate = p
    this.updateFieldsStatus()
  }

  calanderVal = [
    {
      label: 'Start Date ',
      date: Date.now() - 30
    },
    {
      label: 'Interval ',
      date: '600',
    },
    {
      label: 'End Date :',
      date: Date.now() + 60
    },
    {
      label: 'Created ',
      date: Date.now() - 5
    },
    {
      label: 'Updated ',
      date: Date.now()
    }
  ];
  getMetaInterval(interval: PageMetaPageInterval) {
    this.workImprovementInterval = interval
    this.pageMeta.interval = interval
    this.updateFieldsStatus()
  }
  getPageName(name) {
    this.pageMeta.pageName = name
    this.updateFieldsStatus()
  }
  getPageOwner(owner) {
    this.pageMeta.team.owner = owner
    this.updateFieldsStatus()
  }
  getPlanPurpose(planPurpose) {
    this.pageMeta.planPurpose = planPurpose
    this.updateFieldsStatus()
  }
  getPhaseOneModalFlag(value) {
    this.phaseOneModalFlag = value;
    this.phaseTwoModalFlag = false;
    this.phaseThreeModalFlag = false;
    this.phaseFourModalFlag = false;
    this.phaseFiveModalFlag = false;
  }
  getPhaseTwoModalFlag(value) {
    this.phaseTwoModalFlag = value;
    this.phaseOneModalFlag = false;
    this.phaseThreeModalFlag = false;
    this.phaseFourModalFlag = false;
    this.phaseFiveModalFlag = false;
  }
  getPhaseThreeModalFlag(value) {
    this.phaseThreeModalFlag = value;
    this.phaseOneModalFlag = false;
    this.phaseTwoModalFlag = false;
    this.phaseFourModalFlag = false;
    this.phaseFiveModalFlag = false;
  }
  getPhaseFourModalFlag(value) {
    this.phaseFourModalFlag = value;
    this.phaseOneModalFlag = false;
    this.phaseThreeModalFlag = false;
    this.phaseTwoModalFlag = false;
    this.phaseFiveModalFlag = false;
  }
  getPhaseFiveModalFlag(value) {
    this.phaseFiveModalFlag = value;
    this.phaseOneModalFlag = false;
    this.phaseThreeModalFlag = false;
    this.phaseTwoModalFlag = false;
    this.phaseFourModalFlag = false;
  }
  getLockStatus(value) {
    this.lockstatus = value;
    if (this.lockstatus) {
      this.pageMeta.pageStatus.state = "LOCKED"
    } else {
      this.pageMeta.pageStatus.state = "UNLOCKED"
    }
    console.log('Getting Lock Status From Main Page:', this.lockstatus);
  }
  getTeamLeader(leader: PageMetaPageTeamTeamLeader) {
    this.pageMeta.team.teamLeader = leader
    this.updateFieldsStatus()
  }
  getTeamMembers(members: Array<PageMetaPageTeamTeamMember>) {
    this.pageMeta.team.teamMembers = members
  }
  getPaintByLetters(value) {
    this.paintbyletters = value;
    console.log(
      'Getting Paint by Letters from Main Page:',
      this.paintbyletters
    );
  }
  getCurrentPhaseData(currentPhases: Array<WorkImprovementCurrentStates>) {
    this.workImprovementCurrentStates = currentPhases
    this.updateFieldsStatus()
  }
  getPlanDirectionPhaseData(planPhases: Array<WorkImprovementPlanDirectionStatement>) {
    this.workImprovementPlanDirections = planPhases
    this.updateFieldsStatus()
  }
  getPlanOutcomesPhaseData(planOutcomes: Array<WorkImprovementPlanOutcomes>) {
    this.workImprovementPlanOutcomes = planOutcomes
    this.updateFieldsStatus()
  }
  getPlanMeasuresPhaseData(planMeasures: Array<WorkImprovementPlanMeasures>) {
    this.workImprovementPlanMeasures = planMeasures
    this.updateFieldsStatus()
  }
  getPotentialPlansPhaseData(potentialPlans: Array<WorkImprovementPotentialPlanBarriers>) {
    this.workImprovementPotentialPlans = potentialPlans
    this.updateFieldsStatus()
  }
  getContingencyPlansPhaseData(contingencyPlans: Array<WorkImprovementContingencyPlanForBarriers>) {
    this.workImprovementContingencyPlans = contingencyPlans
    this.updateFieldsStatus()
  }
  getWorkImprovementInitiatives(initiatives: Array<WorkImprovementInitiatives>) {
    this.workImprovementIInitiatives = initiatives
    this.updateFieldsStatus()
  }
  getWorkImprovementPDCAStatements(statements: Array<WorkImprovementPDCAStatement>) {
    this.workImprovementPDCAStatements = statements
    this.updateFieldsStatus()
  }

  updateFieldsStatus() {
    this.totalFieldsFilled = 0

    if (this.pageMeta) {
      if (this.pageMeta.interval)
        if (!this.checkService.isDateEmpty(this.pageMeta.interval.startDate))
          this.totalFieldsFilled++

      if (!this.checkService.isPageIntervalEmpty(this.pageMeta.interval)) {
        this.totalFieldsFilled++
      }

      if (!this.checkService.isStringEmpty(this.pageMeta.pageName)) {
        this.totalFieldsFilled++
      }

      if (this.pageMeta.team) {
        if (!this.checkService.isPageTeamLeaderEmpty(this.pageMeta.team.teamLeader)) {
          this.totalFieldsFilled++
        }

        if (!this.checkService.isPageOwnerEmpty(this.pageMeta.team.owner)) {
          this.totalFieldsFilled++
        }
      }
      if (!this.checkService.isDateEmpty(this.pageMeta.planDate)) {
        this.totalFieldsFilled++
      }

      if (!this.checkService.isDateEmpty(this.pageMeta.creationDate)) {
        this.totalFieldsFilled++
      }

      if (!this.checkService.isStringEmpty(this.pageMeta.adjustFrequency))
        this.totalFieldsFilled++

      if (!this.checkService.isStringEmpty(this.pageMeta.planPurpose))
        this.totalFieldsFilled++
    }
    if (this.workImprovementCurrentStates) {
      if (this.workImprovementCurrentStates.length > 0) {
        if (!this.checkService.isTextNotEnoughForCurrentStateByCounts(this.workImprovementCurrentStates, 35))
          this.totalFieldsFilled++
      }
    }
    if (this.workImprovementPlanDirections) {
      if (this.workImprovementPlanDirections.length > 0) {
        if (!this.checkService.isTextNotEnoughForPlanDirectionsByCounts(this.workImprovementPlanDirections, 35))
          this.totalFieldsFilled++
      }
    }
    if (this.workImprovementPlanOutcomes) {
      if (this.workImprovementPlanOutcomes.length > 0) {
        if (!this.checkService.isTextNotEnoughForPlanOutcomesByCounts(this.workImprovementPlanOutcomes, 35))
          this.totalFieldsFilled++
      }
    }
    if (this.workImprovementPlanMeasures) {
      if (this.workImprovementPlanMeasures.length > 0) {
        if (this.checkService.isOneMeasureCompleted(this.workImprovementPlanMeasures))
          this.totalFieldsFilled++
      }
    }
    if (this.workImprovementIInitiatives) {
      if (this.workImprovementIInitiatives.length > 0) {

        if (this.checkService.isOneKeyInitiativeCompleted(this.workImprovementIInitiatives))
          this.totalFieldsFilled++

        if (this.checkService.isOnePlanStepForEachInitiativeCompleted(this.workImprovementIInitiatives))
          this.totalFieldsFilled++

        //timeline duration
        if (!this.checkService.isAnyTimelineMissingInPlanStepInInitiative(this.workImprovementIInitiatives))
          this.totalFieldsFilled++
      }
    }
    if (this.workImprovementContingencyPlans) {
      if (this.workImprovementContingencyPlans.length > 0) {
        if (this.checkService.isOneContingencyPlanBarriersCompleted(this.workImprovementContingencyPlans))
          this.totalFieldsFilled++
      }
    }
    if (this.workImprovementPotentialPlans) {
      if (this.workImprovementPotentialPlans.length > 0) {
        if (this.checkService.isOnePotentialPlanBarriersCompleted(this.workImprovementPotentialPlans))
          this.totalFieldsFilled++
      }
    }
    if (this.workImprovementPDCAStatements) {
      if (this.workImprovementPDCAStatements.length > 0) {
        if (this.checkService.isOnePDCAStatementCompleted(this.workImprovementPDCAStatements))
          this.totalFieldsFilled++
      }
    }
    this.pageMeta.percentageOfCompletion = ((this.totalFieldsFilled / this.totalFieldsRequired) * 100).toString()
  }
  savePage() {
    if (this.pageImprovementId) {
      this.pageMeta.lastUpdatedDate = new Date()
      const workImprovement: WorkImprovement = new WorkImprovement(
        this.pageImprovementId, this.pageMeta, {
        currentStates: this.workImprovementCurrentStates,
        initiatives: this.workImprovementIInitiatives,
        planDirectionStatements: this.workImprovementPlanDirections,
        planMeasures: this.workImprovementPlanMeasures,
        planOutcomes: this.workImprovementPlanOutcomes,
        potentialPlanBarriers: this.workImprovementPotentialPlans,
        contingencyPlanForBarriers: this.workImprovementContingencyPlans,
        pdca: this.workImprovementPDCAStatements
      }
      )
      
      this.workImprovementService.createWorkImprovement(workImprovement).subscribe(res => {
        console.log(res)
        this.showSuccessMessage(res)
      })
    }
  }
  showSuccessMessage(res: any) {
    if (res)
      this.snackBar.open('Page saved successfully', 'Close',
        { duration: 1500, verticalPosition: "top", panelClass: "mat-snack-bar-success" });
  }
}
