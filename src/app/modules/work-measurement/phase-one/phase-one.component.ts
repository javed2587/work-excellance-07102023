import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {
  WorkImprovementCurrentStates,
  WorkImprovementPDCAStatement
} from "../../../models/work-improvement/work-improvment";
import {WorkMeasurementData} from "../../../models/work-measurement/work-measurement";
import { User } from 'src/app/models/user/user';
import { PageMetaPageTeamOwner } from 'src/app/models/work-system/work-system-body';
import { UserService } from 'src/app/services/user/user.service';
export interface MeasurementDataWithIndex {
  index: number,
  data: WorkMeasurementData
}
@Component({
  selector: 'app-phase-one',
  templateUrl: './phase-one.component.html',
  styleUrls: ['./phase-one.component.css']
})
export class PhaseOneComponent implements OnInit, OnChanges {

  flage = true;
  up = true;
  down = false;
  GraphList = [];
  @Input() pageName: String
  @Input() pageOwner: PageMetaPageTeamOwner
  period: string
  users: Array<User>;
  pageOwnerUser: User = new User(null, null, null, null, null, [], null, null)
  measurementList: Array<WorkMeasurementData> = []
  @Output() sendWorkMeasurementList: EventEmitter<Array<WorkMeasurementData>> = new EventEmitter<Array<WorkMeasurementData>>()

  @Output() sendPageName: EventEmitter<any> = new EventEmitter<any>()
  @Output() sendPageOwner: EventEmitter<any> = new EventEmitter<any>()
  @Output() sendPeriod: EventEmitter<any> = new EventEmitter<any>()
  @Output() sendSavePage: EventEmitter<void> = new EventEmitter<void>()

  @Input() graphData: Array<WorkMeasurementData>
  @Input() lockstatus: Boolean = false;
  removeMeasureIndex: number;

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.loadUsers()
    this.addGraph()
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

  ngOnChanges(changes: SimpleChanges): void {
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

  toggle() {
    this.flage = !this.flage;
    this.up = !this.up;
    this.down = !this.down;
  }

  addGraph() {
    if (this.GraphList.length < 10) {
      if (this.lockstatus == false || this.lockstatus == undefined) {
        this.GraphList.push({
          listOfPDCA: [],
          listOfCurrentState: [],
          showModal: false,
        });
        this.measurementList.push(new WorkMeasurementData(
          null, null, null, null, null, null, null,[], []
        ))
      }
    }
  }

  deleteGraph() {
    if (this.lockstatus == false || this.lockstatus == undefined) {
      if (this.removeMeasureIndex == undefined || this.removeMeasureIndex == 0) {
        this.GraphList.pop();
        this.measurementList.pop()
      } else {
        this.GraphList.splice(this.removeMeasureIndex, 1);
        this.measurementList.splice(this.removeMeasureIndex, 1)
      }
    }
  }
  savePage() {
    this.sendSavePage.emit()
  }

  removeStatementIndex(index: number) {
    console.log("delete index", index)
    this.removeMeasureIndex = index
  }

  getMeasurementData(data: MeasurementDataWithIndex) {
    this.measurementList[data.index] = data.data
    this.sendWorkMeasurementList.emit(this.measurementList)
  }

  getPageName() {
    this.sendPageName.emit(this.pageName)
  }
  getPageOwner(e) {
    const owner: PageMetaPageTeamOwner = new PageMetaPageTeamOwner(e.value.id, e.value.username)
    this.sendPageOwner.emit(owner)
  }
  getPeriod() {
    this.sendPeriod.emit(this.period)
  }

  getShowModal(value) {
    if (this.lockstatus == false || this.lockstatus == undefined) {
      if (this.GraphList[this.removeMeasureIndex].showModal == false) {
        this.GraphList[this.removeMeasureIndex].showModal = value;
        for (let i = 0; i < this.GraphList.length; i++) {
          if (i !== this.removeMeasureIndex) {
            this.GraphList[i].showModal = false;
          }
        }
      } else if (this.GraphList[this.removeMeasureIndex].showModal == true) {
        this.GraphList[this.removeMeasureIndex].showModal = true;
        for (let i = 0; i < this.GraphList.length; i++) {
          if (i !== this.removeMeasureIndex) {
            this.GraphList[i].showModal = false;
          }
        }
      }
      console.log('Latest Graph List after show Modal update:', this.GraphList);
    }
  }
}
