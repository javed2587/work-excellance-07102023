import { Component, OnInit, ViewChild } from '@angular/core';
import { SortEvent } from 'primeng/api';
import { Table } from 'primeng/table';
import { DashboardTask } from 'src/app/models/dashboard-task';
import { DashboardFocus } from 'src/app/models/DashboardFocus';
import { DashboardService } from 'src/app/services/dashboard.service';
import { HttpClient } from '@angular/common/http';
import { OrganizationService } from 'src/app/services/organization/organization.service';
import {
  IOrganizationLevels,
  IOrganizationPageSet,
  Nodes,
} from 'src/app/models/organization-levels/organization-levels';
import { Router } from '@angular/router';
import { ToolbarService } from 'src/app/services/menubar/toolbar/toolbar.service';
import { RatingTask } from 'src/app/models/common/rating';
import { User } from 'src/app/models/user/user';
import { UserService } from 'src/app/services/user/user.service';


interface City {
  name?: string;
}
@Component({
  selector: 'app-task-focus',
  templateUrl: './task-focus.component.html',
  styleUrls: ['./task-focus.component.css'],
})
export class TaskFocusComponent implements OnInit {
  pageSetArray = [];
  pageSetObjects = [];
  selectedRow: any = null;

  statusTask: Boolean = false;
  dataID: any;
  showTaskModal: Boolean = false;
  displayToolbar: Boolean;
  displayVal: Boolean;
  taskValues: RatingTask[];
  focusValues: DashboardFocus[];
  pageOwner: any[];
  pageName: any[];
  pageType: any[];
  cities: City[];
  @ViewChild('dt') table: Table | undefined;
  @ViewChild('dt1') table1: Table | undefined;
  selectedCity1: any;
  searchValue: any;

  cardData: any[] = [
    {
      dateCreated: '08-12-2022',
      lastUpdate: 'Jacob',
      pageOwner: 'Increase Sales',
      pageType: 'WS',
      pageName: 'WS',
    },
    {
      dateCreated: '08-12-2022',
      lastUpdate: 'Jacob',
      pageOwner: 'Increase Sales',
      pageType: 'WS',
      pageName: 'WS',
    },
    {
      dateCreated: '08-12-2022',
      lastUpdate: 'Jacob',
      pageOwner: 'Increase Sales',
      pageType: 'WS',
      pageName: 'WS',
    },
    {
      dateCreated: '08-12-2022',
      lastUpdate: 'Jacob',
      pageOwner: 'Increase Sales',
      pageType: 'WS',
      pageName: 'WS',
    },
    {
      dateCreated: '08-12-2022',
      lastUpdate: 'Jacob',
      pageOwner: 'Increase Sales',
      pageType: 'WS',
      pageName: 'WS',
    },
    {
      dateCreated: '08-12-2022',
      lastUpdate: 'Jacob',
      pageOwner: 'Increase Sales',
      pageType: 'WS',
      pageName: 'WS',
    },
    {
      dateCreated: '08-12-2022',
      lastUpdate: 'Jacob',
      pageOwner: 'Increase Sales',
      pageType: 'WS',
      pageName: 'WS',
    },
  ];

  taskStatus = {
    NOT_STARTED: 'Not Started',
    COMPLETED: 'Completed',
    IN_PROGRESS: 'In Progress',
    WAITING_ON_SOMEONE_ELSE: 'Waiting On Someone Else',
    DEFERRED: 'Deffered',
  };

  tasksColors = {
    NOT_STARTED: 'black',
    COMPLETED: 'green',
    IN_PROGRESS: 'yellow',
    WAITING_ON_SOMEONE_ELSE: 'red',
    DEFERRED: 'blue',
  };

  userList: Array<User>;

  constructor(
    private dashboardService: DashboardService,
    private nodeService: OrganizationService,
    private router: Router,
    private toolbarService: ToolbarService,
    private userService: UserService
  ) {
    this.cities = [
      { name: 'Page Type' },
      { name: 'Work System' },
      { name: 'Work Improvement' },
      { name: 'Work Measurement' },
      { name: 'Work Direction' },
    ];
    this.pageOwner = [
      { label: 'Jacob', value: 'Jacob' },
      { label: 'JohnDevid', value: 'JohnDevid' },
    ];
    this.pageName = [
      {
        label: 'Increase the Sales Funnels',
        value: 'Increase the Sales Funnels',
      },
      { label: 'Close the Sale', value: 'Close the Sale' },
      { label: 'Finalize the Order', value: 'Finalize the Order' },
    ];
    this.pageType = [
      { label: 'WORK_SYSTEM', value: 'WORK_SYSTEM'},
      { label: 'WORK_MEASUREMENT', value: 'WORK_MEASUREMENT' },
      { label: 'WORK_IMPROVEMENT', value: 'WORK_IMPROVEMENT' },
      { label: 'WORK_DIRECTION', value: 'WORK_DIRECTION' }
    ];
  }
  pages: Array<IOrganizationPageSet> = [];
  ngOnInit(): void {
    this.getUserList();
    this.dashboardService.getTasks().subscribe((res: Array<RatingTask>) => {
      if (res) {
        this.taskValues = res;
      }
    });
    this.dashboardService.getFocus().then((data) => (this.focusValues = data));
    console.log('Task values....' + this.taskValues);
    console.log('Focus values....' + this.dashboardService.getFocus());

    this.nodeService
      .findMyFocusPages()
      .subscribe((pages: Array<IOrganizationPageSet>) => {
        if (pages) {
          this.pageOwner = [];
          this.pageName = []
          this.pages = pages;
          pages.forEach((p) => {
            let format4 = null;
            if (p?.dueDate) format4 = new Date(p?.dueDate);
            this.pageSetObjects.push({
              nodeId: p?.nodeId,
              id: p.id,
              type: p.type,
              ownerUserId: p?.owner?.userId,
              ownerName: p?.owner?.name,
              name: p?.name,
              dueDate: format4,
              completionPercentage: p?.percentageOfCompletion
            });
            

            if (p?.name) {
              if (this.pageName.filter(name => name.label == p.name).length == 0)
                this.pageName.push({ label: p.name, value: p.name });
            }

            if (p?.owner?.name) {
              if (this.pageOwner.filter(owner => owner.label == p.owner.name).length == 0)
                this.pageOwner.push({ label: p.owner.name, value: p.owner.name });
            }

          });
        }
      });



    // if (this.nodeService.findNodesByOrgId()) {
    //   this.nodeService.findNodesByOrgId().subscribe((data: Array<IOrganizationLevels>) => {
    //     this.nodes = data
    //     console.log(data);
    //     data.forEach(d => {
    //       d.pageSet.forEach(ps => {
    //         this.pageSetObjects.push({
    //           nodeId: d.id,
    //           id: ps.id,
    //           type: ps.type,
    //           ownerUserId: ps.owner.userId,
    //           ownerName: ps.owner.name,
    //           name: ps.name,
    //         })
    //       })
    //     })
    //     console.log(this.pageSetObjects);
    //   });
    // }
  }

  highlightRow(pageSetObject: any) {
    this.selectedRow = pageSetObject;
  }

  setUserNameOfUsers() {
    if (this.userList.length > 0) {
      this.userList.forEach((m, i) => {
        if (!m.username && (m.firstName || m.lastName)) {
          if (m.firstName) m.username = m.firstName.valueOf();
          else m.username = '';
          if (m.lastName) m.username = m.username + ' ' + m.lastName;
        }
        if (!m.username) m.username = '';
      });
    }
  }

  getUserList() {
    this.userService.findAll().subscribe((users: Array<User>) => {
      if (users) this.userList = users;
      this.setUserNameOfUsers();
    });
  }

  setContributor(e) {
    const user: User = e.target.value;
    this.selectedTask.contributor = { name: user.username, userId: user.id };
  }

  setOwner(e) {
    const user: User = e.target.value;
    this.selectedTask.owner = { name: user.username, userId: user.id };
  }

  navigatePage(nodeId: string, id: string, pageType: string) {
    const type = {
      WORK_SYSTEM: 'workSystem',
      WORK_IMPROVEMENT: 'workImprovement',
      WORK_DIRECTION: 'workDirection',
      WORK_MEASUREMENT: 'workMeasurement',
    };
    if (this.pages.filter((n) => n.id == id)[0]) {
      this.toolbarService.nodeEmitter.emit(
        this.pages.filter((n) => n.id == id)[0]
      );
      this.router.navigate(['page-set', type[pageType], id]);
    }
  }
  onActivityChange(event: any) {
    const value = event.target.value;
    if (value && value.trim().length) {
      const activity = parseInt(value);
      if (!isNaN(activity)) {
        this.table.filter(activity, 'activity', 'gte');
      }
    }
  }
  customSort(event: SortEvent) {
    event.data.sort((data1, data2) => {
      let value1 = data1[event.field];
      let value2 = data2[event.field];
      let result = null;
      if (value1 == null && value2 != null) result = -1;
      else if (value1 != null && value2 == null) result = 1;
      else if (value1 == null && value2 == null) result = 0;
      else if (typeof value1 === 'string' && typeof value2 === 'string')
        result = value1.localeCompare(value2);
      else result = value1 < value2 ? -1 : value1 > value2 ? 1 : 0;
      return event.order * result;
    });
  }
  saveSelectedTask(od: any) {
    if (this.selectedTask)
      this.dashboardService
        .updateTask(this.selectedTask)
        .subscribe((res: RatingTask) => {
          console.log(res);
          this.taskValues.forEach((task, i) => {
            if (task.id == res.id) this.taskValues[i] = res;
          });
          od.hide()
        });
  }
  selectedTask: RatingTask;
  showTask(task: RatingTask, od: any, e: any) {
    if (task.id) {
      this.selectedTask = {
        contributor: {
          name: task?.contributor?.name,
          userId: task?.contributor?.userId,
        },
        dueDate: task?.dueDate,
        id: task?.id,
        notes: task?.notes,
        owner: { name: task?.owner?.name, userId: task?.owner?.userId },
        priority: task?.priority,
        status: task?.status,
        task: task?.task,
        pageComponent: task?.pageComponent,
        pageId: task?.pageId,
        pageType: task?.pageType,
        ratingComponent: task?.ratingComponent
      };
      od.toggle(e);
      this.showTaskModal = true;
      this.displayToolbar = true;
      this.displayVal = true;
      this.statusTask = !this.statusTask;
    }
  }
  getCloseFlag(val) {
    this.showTaskModal = val;
  }
  deleteTableData() {
    if (this.dataID == null || this.dataID == undefined) {
      this.focusValues.pop();
    } else {
      this.focusValues = this.focusValues.filter((object) => {
        return object.id !== this.dataID.id;
      });
    }
    this.dataID = null;
  }
  getID(i) {
    this.dataID = i;
    console.log('ID of Data:', i);
    console.log(this.focusValues);
  }
}
