import { Component, OnInit } from '@angular/core';
import { PageMeta } from "../../../models/work-system/work-system-header";
import {
  PageMetaPageInterval,
  PageMetaPageSet,
  PageMetaPageStatus,
  PageMetaPageTeam, PageMetaPageTeamOwner, PageMetaPageTeamTeamLeader, PageMetaPageTeamTeamMember
} from "../../../models/work-system/work-system-body";
import { IWorkDirection, PageDirectionalStatement, WorkDirection } from "../../../models/work-direction/work-direction";
import { WorkDirectionService } from "../../../services/work-direction/work-direction.service";
import { PageChecksService } from 'src/app/services/common/page-checks.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';
import { UserRole } from 'src/app/models/user/user';
import { PageTitleService } from 'src/app/services/page-title.service';


@Component({
  selector: 'app-main-page-work-direction',
  templateUrl: './main-page-work-direction.component.html',
  styleUrls: ['./main-page-work-direction.component.css'],
})
export class MainPageWorkDirectionComponent implements OnInit {

  currntModuleTitle = 'Work Direction';
  paintbyletters: Boolean;
  lockstatus: Boolean = false;
  pageMeta: PageMeta = new PageMeta(
    null, null, null, null, null, new PageMetaPageSet(null, null),
    new PageMetaPageStatus(null, null), new PageMetaPageInterval(
      null,
      { ratingFrequency: null, ratingFrequencyUnit: null },
      null),
    new PageMetaPageTeam(new PageMetaPageTeamOwner(null, null), new PageMetaPageTeamTeamLeader(null, null), []), null, null, null, null, null
  )
  pageStatements: Array<PageDirectionalStatement>
  totalRequiredFields: number = 15
  totalFieldsFilled: number = 0
  pageDirectionId: string
  pageName: String
  pageOwner: PageMetaPageTeamOwner
  constructor(private workDirectionService: WorkDirectionService,
    private checkService: PageChecksService, private snackBar: MatSnackBar, private route: ActivatedRoute, private userService: UserService, private PageTitleService : PageTitleService) {
  }
  ngOnInit(): void {
    this.PageTitleService.setPageTitle('Work Direction')
    this.route.params.subscribe((params) => {
      if (params['id'])
        this.loadWorkDirectionById(params['id'])
    })
  }

  loadWorkDirectionById(id: string) {
    this.workDirectionService.findById(id).subscribe((wd: WorkDirection) => {
      if (wd)
        this.fillFormForWorkDirection(wd)
    })
  }

  userRole: UserRole

  fillFormForWorkDirection(wd: WorkDirection) {
    this.pageDirectionId = wd.id
    if(wd.pageMeta) {
      this.pageName = wd.pageMeta.pageName
      if(wd.pageMeta.team) {
        this.pageOwner = wd.pageMeta.team.owner
        this.userRole = this.userService.getLoggedInUserRole(wd.pageMeta.team)
      }
      this.pageMeta = wd.pageMeta
    }
    if (wd.pageData)
      this.pageStatements = wd.pageData.directionalStatements
    this.updateFieldsStatus()
  }

  updateFieldsStatus() {
    this.pageMeta.lastUpdatedDate = new Date()
    this.totalFieldsFilled = 0

    if (this.pageMeta) {
      if (this.pageMeta.interval)
        if (!this.checkService.isDateEmpty(this.pageMeta.interval.startDate)) {
          this.totalFieldsFilled++
        }

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

      if (!this.checkService.isDateEmpty(this.pageMeta.creationDate)) {
        this.totalFieldsFilled++
      }

      if (!this.checkService.isStringEmpty(this.pageMeta.planPurpose))
        this.totalFieldsFilled++
    }
    if (this.pageStatements) {
      if (this.pageStatements.length > 0) {
        if (this.pageStatements.length > 2)
          this.totalFieldsFilled++
        if (!this.checkService.isPurposeEmptyForAllStatements(this.pageStatements))
          this.totalFieldsFilled
        //input rating not present in api
        if (!this.checkService.isStatementInputsCountMatches(this.pageStatements, 2))
          this.totalFieldsFilled++
        //opportunity not present in api as well in design for now
        if (!this.checkService.isOppotunityNotEnoughInInputs(this.pageStatements))
          this.totalFieldsFilled++
        if (!this.checkService.isAnyElementCountMatchesInStatementInputs(this.pageStatements, 1))
          this.totalFieldsFilled++
        if (!this.checkService.isAnyOutcomesTextEmptyInStatements(this.pageStatements))
          this.totalFieldsFilled++
        if (!this.checkService.isStatementOwnerEmptyInStatements(this.pageStatements))
          this.totalFieldsFilled++
        if (!this.checkService.isPDCAEmptyInStatements(this.pageStatements))
          this.totalFieldsFilled++
        if (!this.checkService.isRatingEmptyinStatements(this.pageStatements))
          this.totalFieldsFilled++
        //no priority in api
        // if (this.pageStatements.filter((s, i) => {
        //   return s.data.inputs.filter((input, index) => input)
        // }))
      }
    }
    this.pageMeta.percentageOfCompletion = ((this.totalFieldsFilled / this.totalRequiredFields) * 100).toString()
  }

  getLockStatus(value) {
    this.lockstatus = value;
    this.pageMeta.pageStatus.state = value ? "LOCKED" : "UNLOCKED"
    console.log('Getting Lock status in Work Direction:', this.lockstatus);
  }
  getTeamLeader(teamLeader: PageMetaPageTeamTeamLeader) {
    this.pageMeta.team.teamLeader = teamLeader
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
  getPageInterval(interval: PageMetaPageInterval) {
    
    this.pageMeta.interval = interval
    this.updateFieldsStatus()
  }
  getCreationDate(c: Date) {
    this.pageMeta.creationDate = c
    this.updateFieldsStatus()
  }
  getPageName(pageName) {
    this.pageMeta.pageName = pageName
    this.updateFieldsStatus()
  }
  getPageOwner(pageOwner) {
    this.pageMeta.team.owner = pageOwner
    this.updateFieldsStatus()
  }
  getPagePurpose(pagePurpose) {
    this.pageMeta.planPurpose = pagePurpose
    this.updateFieldsStatus()
  }
  getPageStatements(statements: Array<PageDirectionalStatement>) {
    this.pageStatements = statements
    this.updateFieldsStatus()
  }
  savePage() {
    if (this.pageDirectionId) {
      const workDirection: WorkDirection = new WorkDirection(this.pageDirectionId, this.pageMeta,
        { directionalStatements: this.pageStatements })
      this.workDirectionService.createWorkDirection(workDirection).subscribe((res: WorkDirection) => {
        console.log(res)
        this.showSuccessMessage(res)
      })
    }
  }
  showSuccessMessage(res: any) {
    if (res)
      this.snackBar.open('Page saved successfully ', 'Close',
        { duration: 1500, verticalPosition: "top", panelClass: "mat-snack-bar-success" });
  }
}
