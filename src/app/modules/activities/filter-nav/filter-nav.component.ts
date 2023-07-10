import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ActivityRequest } from 'src/app/models/activities/activities';
import { User } from 'src/app/models/user/user';
import { PageMetaPageTeamOwner } from 'src/app/models/work-system/work-system-body';
import { UserService } from 'src/app/services/user/user.service';
import html2pdf from 'html2pdf.js';
import { DataSharingService } from 'src/app/services/data-sharing.service';
import { DatePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-filter-nav',
  templateUrl: './filter-nav.component.html',
  styleUrls: ['./filter-nav.component.css']
})
export class FilterNavComponent implements OnInit {
  pages: any[];
  wsComponents: any[];
  wmComponents: any[];
  wiComponents: any[]
  wdComponents: any[];
  ratingComponents: any[];
  wdRatingComponents: any[];
  selectedAuthor: User
  selectedOwner: User
  selectedTaskOwner: User
  selectedTaskContributor: User
  userList: Array<User> = []
  taskPeriorities: Array<any>
  selectedTaskPriority: any
  ratingValues: any[]
  authors: any[];
  owners: any[];
  status: any[];
  roles: any[];
  states: any[];
  selectedState: any;
  selectedRole: any;
  selectedStatus: any;
  selectedColor: any;
  selectedRatingComponent: any
  selectedPage: any;
  selectedPageComponent: any;
  showFilters = {
    show: false,
  };
  duedate: Date;
  maxdate: any;
  searchvalue: any;
  sendMailflag: boolean = false;

  mailFlag: boolean = false;

  @Input() isSendMailActive: Boolean
  @Output() sendFilters: EventEmitter<ActivityRequest> = new EventEmitter<ActivityRequest>();
  @Output() sendmail: EventEmitter<Boolean> = new EventEmitter<Boolean>();


  constructor( private userService: UserService, private  DataSharingService: DataSharingService, private datePipe: DatePipe, private snackBar: MatSnackBar) {}
  ngOnInit(): void {
    this.DataSharingService.getSharedData().subscribe(data => {
      
      this.mailFlag = data;
      console.log(data)
    })
    this.loadUsers()
    this.states = [
      {
        name: 'Acive(Default)',
      },
      {
        name: 'Completed',
      },
      {
        name: 'Cancel',
      },
    ];
    this.roles = [
      {
        name: 'Super User',
      },
      {
        name: 'Team Leader',
      },
      {
        name: 'Page Owner',
      },
      {
        name: 'Team Member',
      },
      {
        name: 'WE Coach',
      },
      {
        name: 'WE SME',
      },
    ];
    this.status = [
      {
        name: 'Not Started',
      },
      {
        name: 'Completed',
      },
      {
        name: 'In Progress',
      },
      {
        name: 'Waiting',
      },
      {
        name: 'Deferred',
      },
    ];
    this.owners = [
      {
        name: 'John',
      },
      {
        name: 'Steve',
      },
      {
        name: 'Abraham',
      },
      {
        name: 'Michael',
      },
    ];
    this.authors = [
      {
        name: 'Adam',
      },
      {
        name: 'John',
      },
      {
        name: 'David',
      },
      {
        name: 'Edward',
      },
    ];
    this.ratingValues = [
      {
        name: 'Red',
        value: 'RED'
      },
      {
        name: 'Blue',
        value: 'BLUE'
      },
      {
        name: 'Green',
        value: 'GREEN'
      },
      {
        name: 'Yellow',
        value: 'YELLOW'
      },
      {
        name: 'No Color',
        value: null
      }
    ];
    this.pages = [
      {
        name: 'Work System',
        value: 'WORK_SYSTEM'
      },
      {
        name: 'Work Improvement',
        value: 'WORK_IMPROVEMENT'
      },
      {
        name: 'Work Measurement',
        value: 'WORK_MEASUREMENT'
      },
      {
        name: 'Work Direction',
        value: 'WORK_DIRECTION'
      }
    ];
    this.wiComponents = [
      {
        name: 'Current State',
        value: 'currentStates'
      },
      {
        name: 'Plan Direction Statements',
        value: 'planDirectionStatements'
      },
      {
        name: 'Plan Outcomes',
        value: 'planOutcomes'
      },
      {
        name: 'Plan Measures',
        value: 'planMeasures'
      },
      {
        name: 'Potential Plan Barriers',
        value: 'potentialPlanBarriers'
      },
      {
        name: 'Contingency Plan For Barriers',
        value: 'contingencyPlanForBarriers'
      },
      {
        name: 'PDCA',
        value: 'pdca'
      },
    ]
    this.wmComponents = [
      {
        name: 'Current State',
        value: 'currentStates'
      },
      {
        name: 'PDCA',
        value: 'pdca'
      },
      {
        name: 'Graph',
        value: 'graph'
      }
      
    ]
    this.wdComponents = [
      {
        name: 'Directional Statement',
        value: 'directionalStatements'
      },
      {
        name: 'Statement Owner',
        value: 'statementOwner'
      }
    ]
    this.wsComponents = [
      {
        name: 'Phases',
        value: 'phases'
      },
      {
        name: 'Management Systems',
        value: 'managementSystems'
      },
      {
        name: 'Work Types',
        value: 'workTypes'
      },
      {
        name: 'Leadership Rails',
        value: 'leadershipRail'
      },
      {
        name: 'Management Rails',
        value: 'managementRail'
      }
    ]
    this.wdRatingComponents = [
      {
        name: 'Rating',
        value: 'rate'
      },
      {
        name: 'Owner',
        value: 'owner'
      }
    ]
    this.ratingComponents = [
      {
        name: 'Opportunity',
        value: 'opportunity'
      },
      {
        name: 'Decision',
        value: 'decision'
      },
      {
        name: 'Note',
        value: 'note'
      },
      {
        name: 'Task',
        value: 'task'
      },
      {
        name: 'Rating',
        value: 'rate'
      }
    ]
    this.taskPeriorities = [
      {
        name: 'Critical',
        value: 'CRITICAL'
      },
      {
        name: 'Medium',
        value: 'MEDIUM'
      },
      {
        name: 'Low',
        value: 'LOW'
      },
      {
        name: 'High',
        value: 'HIGH'
      }
    ]
    // this.countries = [
    //   {
    //     name: 'Work System',
    //     code: 'AU',
    //     cities: [
    //       { cname: 'Phases' },
    //       { cname: 'Work Steps' },
    //       { cname: 'Management Systems' },
    //       { cname: 'Work Types' },
    //       { cname: 'Gates' },
    //       { cname: 'Leadership Roles' },
    //     ],
    //   },
    //   {
    //     name: 'Work Improvement',
    //     code: 'AU',
    //     cities: [
    //       { cname: 'Work Improvement All' },
    //       { cname: 'Plan Purpose' },
    //       { cname: 'Current State (The Story)' },
    //       { cname: 'Plan Directional Statements' },
    //       { cname: 'Initiatives' },
    //       { cname: 'Planned Steps' },
    //       { cname: 'Plan Outcomes' },
    //       { cname: 'Plan Measures' },
    //       { cname: 'Plan Potential Plan Barries' },
    //       { cname: 'Contingency Plan of Barries' },
    //       { cname: 'PDCA Statements' },
    //     ],
    //   },
    //   {
    //     name: 'Work Measurement',
    //     code: 'AU',
    //     cities: [
    //       { cname: 'Work Measurement' },
    //       { cname: 'Key Measure' },
    //       { cname: 'Current State (The Story)' },
    //       { cname: 'PDCA Statements' },
    //     ],
    //   },
    //   {
    //     name: 'Work Direction',
    //     code: 'AU',
    //     cities: [
    //       { cname: 'Work Direction All' },
    //       { cname: 'Overall Work Direction Purpose' },
    //       { cname: 'Directional Statement' },
    //       { cname: 'Statement Purpose' },
    //       { cname: 'Inputs' },
    //       { cname: 'Elements' },
    //       { cname: 'Outcomes' },
    //       { cname: 'PDCA Statements' },
    //     ],
    //   },
    // ];
  }
  loadUsers() {
    this.userService.findByOrgId().subscribe((users: Array<User>) => {
      if (users) {
        this.userList = users
        this.setUserNameOfUsers()
      }
    })
  }
  setUserNameOfUsers() {
    if (this.userList.length > 0) {
      this.userList.forEach((m, i) => {
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
  }

  clearFilters() {
    this.selectedPage = null
    this.selectedPageComponent = null
    this.selectedRatingComponent = null
    this.selectedTaskPriority = null
    this.selectedOwner = null
    this.selectedAuthor = null
    this.selectedColor = null
    this.duedate = null
  }

  searchActivities() {
    let owner: PageMetaPageTeamOwner = null
    if (this.selectedOwner)
      owner = { name: this.selectedOwner.username, userId: this.selectedOwner.id }
    else if(this.selectedAuthor)
      owner = { name: this.selectedAuthor.username, userId: this.selectedAuthor.id }
      const activityRequest: ActivityRequest = {
      pageType: this.selectedPage ? this.selectedPage.value: null,
      pageComponent: this.selectedPageComponent ? this.selectedPageComponent.value: null,
      ratingComponent: this.selectedRatingComponent ? this.selectedRatingComponent.value: null,
      priority: this.selectedTaskPriority ? this.selectedTaskPriority.value : null,
      owner: owner ? (owner.userId ? owner.userId : null) : null,
      contributor: this.selectedTaskContributor ? (this.selectedTaskContributor.id ? this.selectedTaskContributor.id : null) : null,
      color: this.selectedColor ? this.selectedColor.value : null,
      date: this.duedate ? this.datePipe.transform(this.duedate, "yyyy-MM-dd") : null
    }

    if (
      !activityRequest.pageType &&
      !activityRequest.pageComponent &&
      !activityRequest.ratingComponent &&
      !activityRequest.priority &&
      !activityRequest.owner &&
      !activityRequest.contributor &&
      !activityRequest.color &&
      !activityRequest.date
    ) {
      // Display MatSnackBar notification
      this.snackBar.open('No filters selected.', 'Close', {
        duration: 3000,
      });
      return;
    }
  
    this.sendFilters.emit(activityRequest)
  }
  myFunction() {
    var x = document.getElementById('myTopnav');
    if (x.className === 'topnav') {
      x.className += ' responsive';
    } else {
      x.className = 'topnav';
    }
  }
  sendMaildata(){
    this.sendMailflag = true;
    this.sendmail.emit(this.sendMailflag);
  }

  // generatePDF() {
  //   var PDF_Width = 11.7 * 72; // 11.7 inches converted to points
  //   var PDF_Height = 16.5 * 72; // 16.5 inches converted to points

  //   html2pdf()
  //     .set({
  //       filename: 'Activities.pdf',
  //       image: { type: 'jpeg', quality: 1.0 },
  //       html2canvas: {
  //         scale: 2,
  //         useCORS: true,
  //       },
  //       jsPDF: {
  //         unit: 'pt',
  //         format: [PDF_Width, PDF_Height],
  //         orientation: 'landscape',
  //       },
  //     })
  //     .from(document.body)
  //     .save();  
  // }
  
  
  generatePDF() {
    var PDF_Width = 11.7 * 72; // 11.7 inches converted to points
    var PDF_Height = 16.5 * 72; // 16.5 inches converted to points
  
    html2pdf()
      .set({
        filename: 'Activities.pdf',
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
      .save()
      .then(() => {
        // Display success message for PDF creation
        this.snackBar.open('PDF downlaoded successfully.', 'Close', {
          duration: 3000,
          panelClass: 'mat-snack-bar-success'
        });
      })
      .catch((error: any) => {
        // Display error message for PDF generation error
        this.snackBar.open('Unable to download PDF', 'Close', {
          duration: 3000,
          panelClass: 'mat-snack-bar-error'
        });
      });
  }
  
  
}
