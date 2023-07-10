import { Component, OnInit } from '@angular/core';
import { PageMeta } from "../../../models/work-system/work-system-header";
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  PageMetaPageInterval,
  PageMetaPageTeam,
  PageMetaPageTeamOwner,
  PageMetaPageTeamTeamLeader,
  PageMetaPageTeamTeamMember
} from "../../../models/work-system/work-system-body";
import { WorkMeasurement, WorkMeasurementData } from "../../../models/work-measurement/work-measurement";
import { WorkMeasurementService } from "../../../services/work-measurement/work-measurement.service";
import { PageChecksService } from "../../../services/common/page-checks.service";
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';
import { UserRole } from 'src/app/models/user/user';
import { PageTitleService } from 'src/app/services/page-title.service';

@Component({
  selector: 'app-main-page-measurement',
  templateUrl: './main-page-measurement.component.html',
  styleUrls: ['./main-page-measurement.component.css']
})
export class MainPageMeasurementComponent implements OnInit {

  currntModuleTitle = 'Work Measurement';
  paintbyletters: Boolean;
  lockstatus: Boolean = false;
  totalFieldsFilled: number = 0
  totalFieldsRequired: number = 18
  pageData: Array<WorkMeasurementData> = []
  pageMeta: PageMeta = new PageMeta(null, null, null, null, null,
    { pageSetId: null, pageSetOwnerId: null }, { state: null, updatedBy: null },
    new PageMetaPageInterval(null,
      { ratingFrequency: null, ratingFrequencyUnit: null },
      null),
    new PageMetaPageTeam(new PageMetaPageTeamOwner(null, null),
      new PageMetaPageTeamTeamLeader(null, null), []), null, null, null, null, null)

  constructor(private workMeasurementService: WorkMeasurementService,
    private checkService: PageChecksService, private snackBar: MatSnackBar, private route: ActivatedRoute,
    private userService: UserService, private PageTitleService: PageTitleService) {
  }

  pageName: String
  pageOwner: PageMetaPageTeamOwner = new PageMetaPageTeamOwner(null, null)

  ngOnInit(): void {
    this.PageTitleService.setPageTitle('Work Measurment')
    this.route.params.subscribe((params) => {
      if (params['id'])
        this.loadWorkMeasurementById(params['id'])
    })
  }

  loadWorkMeasurementById(id: string) {
    this.workMeasurementService.findById(id).subscribe((wm: WorkMeasurement) => {
      if (wm)
        this.fillFormForWorkMeasurement(wm)
    })
  }

  pageMeaurementId: string
  userRole: UserRole

  fillFormForWorkMeasurement(wm: WorkMeasurement) {
    this.pageMeaurementId = wm.id
    if (wm.pageMeta) {
      this.pageName = wm.pageMeta.pageName
      if (wm.pageMeta.team) {
        this.pageOwner = wm.pageMeta.team.owner
        this.userRole = this.userService.getLoggedInUserRole(wm.pageMeta.team)
      }
      this.pageMeta = wm.pageMeta
    }
    if (wm.pageData)
      this.pageData = wm.pageData.measurements
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

      if (!this.checkService.isStringEmpty(this.pageMeta.adjustFrequency)) {
        this.totalFieldsFilled++
      }

      if (!this.checkService.isStringEmpty(this.pageMeta.pageName)) {
        this.totalFieldsFilled++
      }
      if (!this.checkService.isStringEmpty(this.pageMeta.period)) {
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
    }
    if (this.pageData) {
      if (this.pageData.length > 0) {
        if (!this.checkService.isMeasureNameExistsForOneMeasure(this.pageData))
          this.totalFieldsFilled++
      }
    }
    if (this.pageData) {
      if (this.pageData.length > 0) {
        if (!this.checkService.isAnyMeasureOwnerEmpty(this.pageData))
          this.totalFieldsFilled++
      }
    }
    if (this.pageData) {
      if (this.pageData.length > 0) {
        if (!this.checkService.isScopeNotExistsForAllMeasure(this.pageData))
          this.totalFieldsFilled++
      }
    }
    if (this.pageData) {
      if (this.pageData.length > 0) {
        if (!this.checkService.isSourceNotExistsForAllMeasure(this.pageData))
          this.totalFieldsFilled++
      }
    }
    //rating not added in api

    if (this.pageData) {
      if (this.pageData.length > 0) {
        if (!this.checkService.isActualNotExistsForAllMeasure(this.pageData))
          this.totalFieldsFilled++
      }
    }

    if (this.pageData) {
      if (this.pageData.length > 0) {
        if (!this.checkService.isEmptyDateTableInputForAnyMeasure(this.pageData)) {
          this.totalFieldsFilled++
        }
      }
    }
    if (this.pageData) {
      if (this.pageData.length > 0) {
        if (!this.checkService.isWordCountNotMatchesForMeasureCurrentState(this.pageData, 20))
          this.totalFieldsFilled++
      }
    }
    if (this.pageData) {
      if (this.pageData.length > 0) {
        if (!this.checkService.isWordCountNotMatchesForMeasurePDCA(this.pageData, 10))
          this.totalFieldsFilled++
      }
    }
    this.pageMeta.percentageOfCompletion = ((this.totalFieldsFilled / this.totalFieldsRequired) * 100).toString()
    //period not understand
  }


  getLockStatus(value) {
    this.lockstatus = value;
    console.log('Pinging from Main Page Measurement:', this.lockstatus);
  }

  getPaintByLetters(value) {
    this.paintbyletters = value;
    console.log(
      'Getting Paint by Letters from Main Page:',
      this.paintbyletters
    );
  }

  getPageLockStatus(lockStatus: boolean) {
    this.pageMeta.pageStatus.state = lockStatus ? "LOCKED" : "UNLOCKED"
  }

  getPageTeamLeader(teamLeader: PageMetaPageTeamTeamLeader) {
    this.pageMeta.team.teamLeader = teamLeader
    this.updateFieldsStatus()
  }

  getPageTeamMembers(members: Array<PageMetaPageTeamTeamMember>) {
    this.pageMeta.team.teamMembers = members
  }

  getPageInterval(interval: PageMetaPageInterval) {
    this.pageMeta.interval = interval
    this.updateFieldsStatus()
  }

  getAdjustFrequency(f: String) {
    this.pageMeta.adjustFrequency = f
    this.updateFieldsStatus()
  }

  getCreationDate(c: Date) {
    this.pageMeta.creationDate = c
    this.updateFieldsStatus()
  }

  getWorkMeasurementList(measurements: Array<WorkMeasurementData>) {
    this.pageData = measurements
    this.updateFieldsStatus()
  }

  getPageName(name) {
    this.pageMeta.pageName = name
    this.updateFieldsStatus()
  }

  getPagePeriod(period) {
    this.pageMeta.period = period
    this.updateFieldsStatus()
  }

  getPageOwner(owner) {
    this.pageMeta.team.owner = owner
    this.updateFieldsStatus()
  }

  getSavePage($event) {
    
    if (this.pageMeaurementId) {
      const pageMeasurement: WorkMeasurement = new WorkMeasurement(
        this.pageMeaurementId,
        this.pageMeta,
        { measurements: this.pageData }
      )
      this.workMeasurementService.createWorkMeasurement(pageMeasurement).subscribe((res: WorkMeasurement) => {
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
