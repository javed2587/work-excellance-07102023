import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import {
  OrganizationLevels,
  OrganizationUser,
  Nodes,
  IOrganizationLevels,
} from '../../../../models/organization-levels/organization-levels';
import { OrganizationService } from '../../../../services/organization/organization.service';
import {
  ILeaderShipLevel,
  Organization,
} from '../../../../models/organization/organization-main';
import { UserService } from 'src/app/services/user/user.service';
import { User } from '../../../../models/user/user';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { PageTitleService } from 'src/app/services/page-title.service';

interface Names {
  id: number;
  name: string;
}

interface company {
  id: number;
  designation: string;
  listOfName: Names[];
}

@Component({
  selector: 'app-org-levels',
  templateUrl: './org-levels-2.component.html',
  styleUrls: ['./org-levels-2.component.css'],
})
export class OrgLevelsComponent implements OnInit, OnChanges {
  // collapse: Boolea

  flagg = true;
  up = true;
  down = false;

  // designationList: string[] = []
  listOfUsers: User[] = [];

  prepopulatedText = 'Hello, World!';
  inputValue = '';
  //   [
  //   new User("212121", "dsfsdfds", "dsafaasdf@sdfsd.dsf", "fwefwefwe", "asdasdasda", []),
  //   new User("12312", "dsfsdfds", "dsferfs@sdfsd.dsf", "fwefwefwe", "asdasdasda", []),
  //   new User("234234", "dsfsdfds", "jtfdhtg@sdfsd.dsf", "fwefwefwe", "asdasdasda", []),
  //   new User("42343", "dsfsdfds", "rhtgfd@sdfsd.dsf", "fwefwefwe", "asdasdasda", []),
  //   new User("32423", "dsfsdfds", "rtgewf@sdfsd.dsf", "fwefwefwe", "asdasdasda", []),
  //   new User("23423", "dsfsdfds", "hrgewfd@sdfsd.dsf", "fwefwefwe", "asdasdasda", []),
  //   new User("324234", "dsfsdfds", "hrgtew@sdfsd.dsf", "fwefwefwe", "asdasdasda", []),
  //   new User("324242134", "dsfsdfds", "tyrhge@sdfsd.dsf", "fwefwefwe", "asdasdasda", []),
  //
  // ]
  modifiedListOfUsersLevel1: any[] = [];
  modifiedListOfUsersLevel2: any[] = [];
  modifiedListOfUsersLevel3: any[] = [];
  modifiedListOfUsersLevel4: any[] = [];
  modifiedListOfUsersLevel5: any[] = [];
  modifiedListOfUsersLevel6: any[] = [];

  // Response Objects
  responseLevel0: Nodes;
  responseLevel1: Nodes;
  responseLevel2: Nodes;
  responseLevel3: Nodes;
  responseLevel4: Nodes;
  responseLevel5: Nodes;
  responseLevel6: Nodes;

  levels: any[] = [];
  list: company[] = [];
  firstList: any[] = [];
  secondList: any[] = [];
  od: Boolean = false;
  pageSetManagement: any[] = [];
  workSystemCount = 0;
  workImprovementCount = 0;
  workMeasurementCount = 0;
  workDirectionCount = 0;
  organization: any;
  listOfLevels: any[] = [
    { lname: 'Node' },
    { lname: 'Node' },
    { lname: 'Node' },
    { lname: 'Node' },
    { lname: 'Node' },
    { lname: 'Node' },
    { lname: 'Node' },
  ];
  constructor(
    private OrganizationService: OrganizationService,
    private userService: UserService,
    private snackBar: MatSnackBar,
    public http: HttpClient,
    private PageTitleService: PageTitleService
  ) {}

  organizationId: string;

  setUserNameForUsers() {
    this.listOfUsers.forEach((m) => {
      if (!m.username && (m.firstName || m.lastName)) {
        if (m.firstName) m.username = m.firstName.valueOf();
        else m.username = '';
        if (m.lastName) m.username = m.username + ' ' + m.lastName;
      }
      if (!m.username) m.username = '';
    });
  }

  nodes: Array<IOrganizationLevels> = [];

  ngOnInit(): void {

    this.PageTitleService.setPageTitle('Page Set')
    // this.designationList = ['CEO', 'COO', 'CFO', 'HR', 'CTO', 'GM']
    //  const  myInput = document.getElementById("myInput") as HTMLInputElement;
    //   myInput.addEventListener("input", function() {
    //     if (!myInput.value.startsWith("Type your text here...")) {
    //       myInput.value = "Type your text here..." + myInput.value;
    //     }
    //   });

    let levels: ILeaderShipLevel = {
      company: null,
      division: null,
      location: null,
      department: null,
      function: null,
      group: null,
      activity: null,
    };
    if (this.userService.findByOrgId()) {
      this.organizationId = localStorage.getItem('organizationId');
      this.userService.findByOrgId().subscribe((res) => {
        console.log('Users Array', res);
        this.listOfUsers = res;
        this.setUserNameForUsers();
      });
      this.OrganizationService.findByOrgId().subscribe((res: Organization) => {
        if (res) {
          levels = res.leadershipLevel;
          this.initializeOrgLevels(levels);
          this.OrganizationService.findNodesByOrgId().subscribe(
            (nodeList: Array<IOrganizationLevels>) => {
              if (nodeList) {
                if (nodeList.length > 0) {
                  this.nodes = nodeList;
                  // function checkNodes(){
                  this.fillLevelesWithNodes(nodeList);
                } else if (
                  this.nodes.length == 0 &&
                  this.userService.getUserRole() !=
                    ('ROLE_ORG_ADMIN' || 'ROLE_ADMIN')
                ) {
                  this.snackBar.open(
                    'You are not authorized to view this page',
                    'Close',
                    {
                      duration: 15000,
                      verticalPosition: 'top',
                      panelClass: 'mat-snack-bar-error',
                    }
                  );
                }
              }
            }
          );
        }
      });
    }
  }
  pageTypes = [
    { key: 'WORK_SYSTEM', value: 'Work System', count: 4, show: true },
    {
      key: 'WORK_MEASUREMENT',
      value: 'Work Measurement',
      count: 4,
      show: true,
    },
    {
      key: 'WORK_IMPROVEMENT',
      value: 'Work Improvement',
      count: 3,
      show: true,
    },
    { key: 'WORK_DIRECTION', value: 'Work Direction', count: 1, show: true },
  ];

  ngOnChanges(changes: SimpleChanges): void {
    // for (const propName in changes) {
    //   if (propName == 'nodes') {
    //     if(this.nodes)
    //       this.fillLevelesWithNodes(this.nodes)
    //   }
    // }
  }
  getParentNodeName(levelIndex, nodeId) {
    // levelIndex++;
    if (nodeId) {
      this.OrganizationService.findNodeById(nodeId).subscribe(
        (node: IOrganizationLevels) => {
          if (node) {
            if (levelIndex == 1)
              this.modifiedListOfUsersLevel1.push({
                id: node.id,
                role: node.role,
              });
            if (levelIndex == 2)
              this.modifiedListOfUsersLevel2.push({
                id: node.id,
                role: node.role,
              });
            if (levelIndex == 3)
              this.modifiedListOfUsersLevel3.push({
                id: node.id,
                role: node.role,
              });
            if (levelIndex == 4)
              this.modifiedListOfUsersLevel4.push({
                id: node.id,
                role: node.role,
              });
            if (levelIndex == 5)
              this.modifiedListOfUsersLevel5.push({
                id: node.id,
                role: node.role,
              });
            if (levelIndex == 6)
              this.modifiedListOfUsersLevel6.push({
                id: node.id,
                role: node.role,
              });
          }
        }
      );
    } else {
      return null;
    }
  }

  parentLevelIndex: number;

  fillLevelesWithNodes(nodes: Array<IOrganizationLevels>) {
    const levels: Set<number> = new Set<number>();
    this.levels.forEach((level, li) => {
      nodes.forEach((node) => {
        if (li.toString() == node.level) {
          levels.add(li);
          level.firstArry[0].btnTitle.push({
            id: node.id,
            organizationId: node.organizationId,
            level: node.level,
            role: node.role,
            isRoleExists: node.role ? true : false,
            user: {
              username: node.user ? node.user.name : '',
              id: node.user ? node.user.userId : '',
            },
            reportsTo: node?.reportsTo,
            reportsToParent: node?.reportsTo,
          });
          // this.getParentNodeName(li, node?.reportsTo);
          level.secondArray[0].userValue.push({
            id: node.id,
            value: node.role + ' pageSet',
            pageSet: node.pageSet.map((p) => {
              const name =
                p.name.split('PageSet')[0] +
                'PageSet' +
                p.name.split('PageSet')[1].slice(0, 5);
              let tempName = p.name.split('PageSet')[1].slice(5);
              if (tempName == 'undefined') tempName = '';
              return {
                id: p.id,
                type: p.type,
                owner: { userId: p.owner.userId, name: p.owner.name },
                name: name,
                tempName: tempName,
              };
            }),
            pageSetTemp: [],
            pages: this.pageTypes,
          });
          level.lock = false;
        }
      });
      if (this.levels[li].secondArray[0].userValue) {
        this.levels[li].secondArray[0].userValue.forEach((v, ind) => {
          this.updatePageOwnerValues(li, ind)
        })
      }
    });
    this.parentLevelIndex = Math.min(...Array.from(levels.values()));
    this.levels.forEach((level, i) => {
      if (i > this.parentLevelIndex) {
        this.levels[i].isNodeAddable = true;
      }
    });
    this.levels.forEach((level, i) => {
      if (level.firstArry[0].btnTitle) {
        if (level.firstArry[0].btnTitle.length > 6)
          level.firstArry[0].btnTitle = level.firstArry[0].btnTitle.slice(0, 6);
      }
      if (level.secondArray[0].userValue) {
        if (level.secondArray[0].userValue.length > 6)
          level.secondArray[0].userValue = level.secondArray[0].userValue.slice(
            0,
            6
          );
      }
      // this.getParentNodeName(level.firstArry[0].btnTitle, ++i);
      this.modifyNodeRolesToArray(level.firstArry[0].btnTitle, ++i);
      this.updateParentLink();
    });
    // ;
  }
  updateParentLink() {
    this.levels.forEach((level, li) => {
      this.nodes.forEach((node) => {
        if (node?.reportsTo != null) {
          if (Number.parseInt(node.level) == 1 && li == 1)
            if (
              this.modifiedListOfUsersLevel1.filter(
                (l1) => l1.id == node.reportsTo
              ).length == 0
            ) {
              this.OrganizationService.findNodeById(node.reportsTo).subscribe(
                (res) => {
                  this.modifiedListOfUsersLevel1.push({
                    id: res.id,
                    role: res.role,
                  });
                }
              );
            }
          if (li == 2 && Number.parseInt(node.level) == 2) {
            if (
              this.modifiedListOfUsersLevel2.filter(
                (l1) => l1.id == node.reportsTo
              ).length == 0
            ) {
              this.OrganizationService.findNodeById(node.reportsTo).subscribe(
                (res) => {
                  this.modifiedListOfUsersLevel2.push({
                    id: res.id,
                    role: res.role,
                  });
                }
              );
            }
          }
          if (li == 3 && Number.parseInt(node.level) == 3) {
            if (
              this.modifiedListOfUsersLevel3.filter(
                (l1) => l1.id == node.reportsTo
              ).length == 0
            ) {
              this.OrganizationService.findNodeById(node.reportsTo).subscribe(
                (res) => {
                  this.modifiedListOfUsersLevel3.push({
                    id: res.id,
                    role: res.role,
                  });
                }
              );
            }
          }
          if (li == 4 && Number.parseInt(node.level) == 4) {
            if (
              this.modifiedListOfUsersLevel4.filter(
                (l1) => l1.id == node.reportsTo
              ).length == 0
            ) {
              this.OrganizationService.findNodeById(node.reportsTo).subscribe(
                (res) => {
                  this.modifiedListOfUsersLevel4.push({
                    id: res.id,
                    role: res.role,
                  });
                }
              );
            }
          }
          if (li == 5 && Number.parseInt(node.level) == 5) {
            if (
              this.modifiedListOfUsersLevel5.filter(
                (l1) => l1.id == node.reportsTo
              ).length == 0
            ) {
              this.OrganizationService.findNodeById(node.reportsTo).subscribe(
                (res) => {
                  this.modifiedListOfUsersLevel5.push({
                    id: res.id,
                    role: res.role,
                  });
                }
              );
            }
          }
          if (li == 6 && Number.parseInt(node.level) == 6) {
            if (
              this.modifiedListOfUsersLevel6.filter(
                (l1) => l1.id == node.reportsTo
              ).length == 0
            ) {
              this.OrganizationService.findNodeById(node.reportsTo).subscribe(
                (res) => {
                  this.modifiedListOfUsersLevel6.push({
                    id: res.id,
                    role: res.role,
                  });
                }
              );
            }
          }
        }
      });
    });
  }

  initializeOrgLevels(levels: ILeaderShipLevel) {
    if (levels.company && levels.company != '')
      this.levels.push({
        mainTitle: levels.company,
        collapse: true,
        firstTitle: 'Company',
        secondTitle: 'Page Set',
        firstArry: [{ btnTitle: [] }],
        secondArray: [{ userValue: [] }],
        optionalArray: [{ listValue: [] }],
        lock:
          this.userService.getUserRole() == ('ROLE_ORG_ADMIN' || 'ROLE_ADMIN')
            ? false
            : true,
        isNodeAddable:
          this.userService.getUserRole() == ('ROLE_ORG_ADMIN' || 'ROLE_ADMIN')
            ? true
            : false,
      });
    if (levels.division && levels.division != '')
      this.levels.push({
        mainTitle: levels.division,
        collapse: true,
        firstTitle: 'Company',
        secondTitle: 'Page Set',
        firstArry: [{ btnTitle: [] }],
        secondArray: [{ userValue: [] }],
        optionalArray: [{ listValue: [] }],
        lock: true,
        isNodeAddable:
          this.userService.getUserRole() == ('ROLE_ORG_ADMIN' || 'ROLE_ADMIN')
            ? true
            : false,
      });
    if (levels.location && levels.location != '')
      this.levels.push({
        mainTitle: levels.location,
        collapse: true,
        firstTitle: 'Company',
        secondTitle: 'Page Set',
        firstArry: [{ btnTitle: [] }],
        secondArray: [{ userValue: [] }],
        optionalArray: [{ listValue: [] }],
        lock: true,
        isNodeAddable:
          this.userService.getUserRole() == ('ROLE_ORG_ADMIN' || 'ROLE_ADMIN')
            ? true
            : false,
      });
    if (levels.department && levels.department != '')
      this.levels.push({
        mainTitle: levels.department,
        collapse: true,
        firstTitle: 'Company',
        secondTitle: 'Page Set',
        firstArry: [{ btnTitle: [] }],
        secondArray: [{ userValue: [] }],
        optionalArray: [{ listValue: [] }],
        lock: true,
        isNodeAddable:
          this.userService.getUserRole() == ('ROLE_ORG_ADMIN' || 'ROLE_ADMIN')
            ? true
            : false,
      });
    if (levels.function && levels.function != '')
      this.levels.push({
        mainTitle: levels.function,
        collapse: true,
        firstTitle: 'Company',
        secondTitle: 'Page Set',
        firstArry: [{ btnTitle: [] }],
        secondArray: [{ userValue: [] }],
        optionalArray: [{ listValue: [] }],
        lock: true,
        isNodeAddable:
          this.userService.getUserRole() == ('ROLE_ORG_ADMIN' || 'ROLE_ADMIN')
            ? true
            : false,
      });
    if (levels.group && levels.group != '')
      this.levels.push({
        mainTitle: levels.group,
        collapse: true,
        firstTitle: 'Company',
        secondTitle: 'Page Set',
        firstArry: [{ btnTitle: [] }],
        secondArray: [{ userValue: [] }],
        optionalArray: [{ listValue: [] }],
        lock: true,
        isNodeAddable:
          this.userService.getUserRole() == ('ROLE_ORG_ADMIN' || 'ROLE_ADMIN')
            ? true
            : false,
      });
    if (levels.activity && levels.activity != '')
      this.levels.push({
        mainTitle: levels.activity,
        collapse: true,
        firstTitle: 'Company',
        secondTitle: 'Page Set',
        firstArry: [{ btnTitle: [] }],
        secondArray: [{ userValue: [] }],
        optionalArray: [{ listValue: [] }],
        lock: true,
        isNodeAddable:
          this.userService.getUserRole() == ('ROLE_ORG_ADMIN' || 'ROLE_ADMIN')
            ? true
            : false,
      });
    console.log('levels arr... ' + this.levels);
  }

  toggle(index) {
    // this.collapse = !this.collapse;
    this.levels[index].collapse = !this.levels[index].collapse;
    this.up = !this.up;
    this.down = !this.down;
  }

  iterator: number = 0;

  addFirstLine(index) {
    if (this.levels[index].firstArry[0].btnTitle.length < 6) {
      this.levels[index].firstArry[0].btnTitle.push({
        level: '',
        role: '',
        user: { username: '' },
        reportsToParent: null,
      });
      this.levels[index].optionalArray[0].listValue.push({
        title: '',
        owner: '',
      });
      // ;
      this.levels[index].lock = false;
    }
  }
  removeFirstLine(index) {
    if (this.levels[index].firstArry[0].btnTitle.length < 6) {
      this.levels[index].firstArry[0].btnTitle.pop({
        level: '',
        role: '',
        user: { username: '' },
        reportsTo: { username: '' },
      });
      this.levels[index].optionalArray[0].listValue.push({
        title: '',
        owner: '',
      });
    }
  }

  addSecondLine(index) {
    //
    if (this.levels[index].secondArray[0].userValue.length < 6) {
      this.levels[index].secondArray[0].userValue.push({
        value: '',
        pageSet: [],
        pageSetTemp: [],
        pages: [
          { key: 'WORK_SYSTEM', value: 'Work System', count: 4, show: true },
          {
            key: 'WORK_MEASUREMENT',
            value: 'Work Measurement',
            count: 4,
            show: true,
          },
          {
            key: 'WORK_IMPROVEMENT',
            value: 'Work Improvement',
            count: 3,
            show: true,
          },
          {
            key: 'WORK_DIRECTION',
            value: 'Work Direction',
            count: 1,
            show: true,
          },
        ],
      });
      this.od = true;
      console.log(this.levels[index].secondArray.length);
    }

    // console.log(",,,,,,,,,,",this.levels[index].secondArray[0].userValue)
  }
  removeSecondLine(index) {
    //
    if (this.levels[index].secondArray[0].userValue.length < 6) {
      this.levels[index].secondArray[0].userValue.pop({
        value: '',
        pageSet: [],
      });
      this.od = true;
      console.log(this.levels[index].secondArray.length);
    }
    // console.log(",,,,,,,,,,",this.levels[index].secondArray[0].userValue)
  }

  updateFirstArrayUserSelection(event, index, btnIndex) {
    this.levels[index].firstArry[0].btnTitle[btnIndex].user =
      this.listOfUsers.find((userObj) => userObj.id === event.target.value);
    console.log('Levels Updated Array:', this.levels);
    if (index === 0) {
      console.log('List of Users:', this.listOfUsers);
      const user = this.listOfUsers.find(
        (userObj) => userObj.id === event.target.value
      );
    }
    if (index === 1) {
      console.log('List of Users:', this.listOfUsers);
      const user = this.listOfUsers.find(
        (userObj) => userObj.id === event.target.value
      );
    }
    if (index === 2) {
      console.log('List of Users:', this.listOfUsers);
      const user = this.listOfUsers.find(
        (userObj) => userObj.id === event.target.value
      );
    }
    if (index === 3) {
      console.log('List of Users:', this.listOfUsers);
      const user = this.listOfUsers.find(
        (userObj) => userObj.id === event.target.value
      );
    }
    if (index === 4) {
      console.log('List of Users:', this.listOfUsers);
      const user = this.listOfUsers.find(
        (userObj) => userObj.id === event.target.value
      );
    }
    if (index === 5) {
      console.log('List of Users:', this.listOfUsers);
      const user = this.listOfUsers.find(
        (userObj) => userObj.id === event.target.value
      );
    }
  }

  updateFirstArrayRoleValue(event, index, btnIndex) {
    this.levels[index].firstArry[0].btnTitle[btnIndex].role =
      event.target.value;
    console.log('Levels Updated Array:', this.levels);
  }

  updateLevel1ReportsTo(event, index, optionalIndex) {
    this.levels[index].firstArry[0].btnTitle[optionalIndex].reportsToParent =
      event.target.value;
    console.log('Levels Updated Array:', this.levels);
  }

  updateLevel2ReportsTo(event, index, optionalIndex) {
    this.levels[index].firstArry[0].btnTitle[optionalIndex].reportsToParent =
      event.target.value;
    console.log('Levels Updated Array:', this.levels);
  }

  updateLevel3ReportsTo(event, index, optionalIndex) {
    this.levels[index].firstArry[0].btnTitle[optionalIndex].reportsToParent =
      event.target.value;
    console.log('Levels Updated Array:', this.levels);
  }

  updateLevel4ReportsTo(event, index, optionalIndex) {
    this.levels[index].firstArry[0].btnTitle[optionalIndex].reportsToParent =
      event.target.value;
    console.log('Levels Updated Array:', this.levels);
  }

  updateLevel5ReportsTo(event, index, optionalIndex) {
    this.levels[index].firstArry[0].btnTitle[optionalIndex].reportsToParent =
      event.target.value;
    console.log('Levels Updated Array:', this.levels);
  }

  updateLevel6ReportsTo(event, index, optionalIndex) {
    this.levels[index].firstArry[0].btnTitle[optionalIndex].reportsToParent =
      event.target.value;
    console.log('Levels Updated Array:', this.levels);
  }

  updateSecondArray(event, index, fieldIndex) {
    this.levels[index]!.secondArray[0].userValue[fieldIndex].value =
      event.target.value;
    this.od = true;
    console.log('Levels Updated Array:', this.levels);
  }

  updateOptionalArray(event, index, optionalIndex) {
    this.levels[index]!.optionalArray[0].listValue[optionalIndex].owner =
      event.target.value;
    console.log('Levels Updated Arrat:', this.levels);
  }

  // temporaryPageSetIndex: number

  syncDefaulutNameAndInput(pageSet: Array<any>) {
    pageSet.forEach((p) => {
      p.name = p.name.slice(0, 16);
    });
  }

  // pageSetTemp: Array<any> = [];

  // closePageSetPopup(i, pageSetIndex) {
  //   this.levels[i].secondArray[0].userValue[pageSetIndex].pageSetTemp
  // }

  openPageSet(i, index) {
    // 
    // if (this.levels[i].secondArray[0].userValue[index].pageSetTemp)
    if (this.levels[i].secondArray[0].userValue[index].pageSetTemp.length > 0) {
      this.levels[i].secondArray[0].userValue[index].pageSet = [];
      this.levels[i].secondArray[0].userValue[index].pageSetTemp.forEach((page) =>
        this.levels[i].secondArray[0].userValue[index].pageSet.push({
          id: page.id ? page.id : null,
          name: page.name ? page.name : '',
          owner: { name: page.owner?.name, userId: page.owner?.userId },
          tempName: page.tempName ? page.tempName : '',
          type: page.type,
        })
      );
      this.updatePageOwnerValues(i, index)
      // this.pageSetTemp = []
    } else if (this.levels[i].secondArray[0].userValue[index].pageSet) {
      // console.log(typeof this.levels[i].secondArray[0].userValue[index].pageSet[0])
      this.levels[i].secondArray[0].userValue[index].pageSetTemp = [];
      this.levels[i].secondArray[0].userValue[index].pageSet.forEach((page) =>
        this.levels[i].secondArray[0].userValue[index].pageSetTemp.push({
          id: page.id ? page.id : null,
          name: page.name ? page.name : '',
          owner: { name: page.owner?.name, userId: page.owner?.userId },
          tempName: page.tempName ? page.tempName : '',
          type: page.type,
        })
      );
    }
    // this.syncDefaulutNameAndInput(this.levels[i].secondArray[0].userValue[index].pageSet)
    // if (this.temporaryPageSetIndex == null || this.temporaryPageSetIndex == undefined)
    //   return
    // if (this.temporaryPageSetIndex >= 0) {
    //   this.levels[i].secondArray[0].userValue[index].pageSet.splice(this.temporaryPageSetIndex)
    //   this.temporaryPageSetIndex = null
    // }
  }

  savePageSetUpdates(i, pageSetIndex) {
    this.levels[i].secondArray[0].userValue[pageSetIndex].pageSetTemp = [];
  }

  // cancelPageSetUpdates(i, index) {
  //   ;
  //   this.levels[i].secondArray[0].userValue[index].pageSet =
  //     this.levels[i].secondArray[0].userValue[index].pageSetTemp;
    // this.levels[i].secondArray[0].userValue[index].pageSetTemp = [];
    // if (this.temporaryPageSetIndex == null || this.temporaryPageSetIndex == undefined)
    //   return
    // if (this.temporaryPageSetIndex >= 0) {
    //   this.levels[i].secondArray[0].userValue[index].pageSet.splice(this.temporaryPageSetIndex)
    //   this.updatePageOwnerValues(i, index)
    //   this.temporaryPageSetIndex = null
    // }
  // }

  updatePageSet(i, index) {
    this.levels[i].secondArray[0].userValue[index].pageSet.push({
      type: null,
      owner: { userId: null, name: null },
      title: null,
      name: null,
      tempName: null,
    });
    // if (this.temporaryPageSetIndex == null || this.temporaryPageSetIndex == undefined) {
    //   this.temporaryPageSetIndex = this.levels[i].secondArray[0].userValue[index].pageSet.length - 1
    // }
  }

  updatePageSetValue(event, i, pageSetIndex) {
    this.levels[i].secondArray[0].userValue[pageSetIndex].value =
      event.target.value;
    console.log('Levels Updated Array:', this.levels);
  }

  removePageSet(index) {
    this.levels[index].secondArray[0].userValue.pop();
    console.log('Levels at PageSet:', this.levels);
  }

  setTemporaryPageName(event, index, pageSetIndex, pageIndex, name) {
    this.levels[index].secondArray[0].userValue[pageSetIndex].pageSet[
      pageIndex
    ].tempName = name + ' ' + event.target.value;
    // else if (event.target.value === 'WORK_IMPROVEMENT') {
    //   this.levels[index].secondArray[0].userValue[pageSetIndex].pageSet[pageIndex].name = this.levels[index].firstArry[0].btnTitle[pageSetIndex].role + ` PageSet ${pageSetIndex} WI ${++this.workImprovementCount}`;

    // } else if (event.target.value === 'WORK_MEASUREMENT') {
    //   this.levels[index].secondArray[0].userValue[pageSetIndex].pageSet[pageIndex].name = this.levels[index].firstArry[0].btnTitle[pageSetIndex].role + ` PageSet ${pageSetIndex} WM ${++this.workMeasurementCount}`;

    // } else if (event.target.value === 'WORK_DIRECTION') {
    //   this.levels[index].secondArray[0].userValue[pageSetIndex].pageSet[pageIndex].name = this.levels[index].firstArry[0].btnTitle[pageSetIndex].role + ` PageSet ${pageSetIndex} WD ${++this.workDirectionCount}`
    // }
    // this.levels[index].secondArray[0].userValue[pageSetIndex].pageSet[pageIndex].name = stickyName + ' ' + $event.target.value.split(stickyName)[1]
  }

  setPageName(index, pageSetIndex) {
    this.levels[index].firstArry[0].btnTitle[pageSetIndex].reportsTo =
      this.levels[index].firstArry[0]?.btnTitle[pageSetIndex]?.reportsToParent;
    this.levels[index].secondArray[0].userValue[pageSetIndex].pageSet.forEach(
      (page) => {
        page.name = page.name + (page.tempName ? page.tempName : '');
      }
    );
    // ;
  }

  errorMessages: Array<String> = [];
  notifyErrorMessage() {
    // this.showErrors = true
    this.errorMessages.forEach((e) => {
      this.snackBar.open(e.valueOf(), 'Ok', {
        verticalPosition: 'top',
        panelClass: 'mat-snack-bar-error',
        duration: 15000,
      });
    });
    setTimeout(() => {
      // this.showErrors = false
      this.errorMessages = [];
    }, 5000);
  }

  validatePageSet(nodeTitle: string, pages: Array<any>) {
    if (!pages) {
      this.errorMessages.push('node ' + nodeTitle + ' pageset is empty');
      this.notifyErrorMessage();
      return true;
    } else if (pages.length == 0) {
      this.errorMessages.push('node ' + nodeTitle + ' pageset is empty');
      this.notifyErrorMessage();
      return true;
    }
    return false;
  }

  validateNode(levelTitle: string, level) {
    if (level.length == 0) {
      this.errorMessages.push('level ' + levelTitle + ' is empty');
      this.notifyErrorMessage();
      return true;
    }
    return false;
  }

  updatePageOwnerValues(index, pageSetIndex) {
    let wsCount = 0;
    let wiCount = 0;
    let wmCount = 0;
    let wdCount = 0;
    this.levels[index].secondArray[0].userValue[pageSetIndex].pageSet.forEach(
      (page) => {
        if (page.type == 'WORK_SYSTEM') wsCount++;
        if (page.type == 'WORK_IMPROVEMENT') wiCount++;
        if (page.type == 'WORK_MEASUREMENT') wmCount++;
        if (page.type == 'WORK_DIRECTION') wdCount++;
      }
    );
    this.levels[index].secondArray[0].userValue[pageSetIndex].pages[0].show =
      this.levels[index].secondArray[0].userValue[pageSetIndex].pages[0]
        .count == wsCount
        ? false
        : true;
    this.levels[index].secondArray[0].userValue[pageSetIndex].pages[1].show =
      this.levels[index].secondArray[0].userValue[pageSetIndex].pages[1]
        .count == wmCount
        ? false
        : true;
    this.levels[index].secondArray[0].userValue[pageSetIndex].pages[2].show =
      this.levels[index].secondArray[0].userValue[pageSetIndex].pages[2]
        .count == wiCount
        ? false
        : true;
    this.levels[index].secondArray[0].userValue[pageSetIndex].pages[3].show =
      this.levels[index].secondArray[0].userValue[pageSetIndex].pages[3]
        .count == wdCount
        ? false
        : true;
  }

  updatePageName(event, index, pageSetIndex, pageIndex) {
    this.levels[index].secondArray[0].userValue[pageSetIndex].pageSet[
      pageIndex
    ].type = event.target.value;
    this.updatePageOwnerValues(index, pageSetIndex);
    if (event.target.value === 'WORK_SYSTEM') {
      this.levels[index].secondArray[0].userValue[pageSetIndex].pageSet[
        pageIndex
      ].name =
        this.levels[index].firstArry[0].btnTitle[pageSetIndex].role +
        ` PageSet WS ${++this.workSystemCount}`;
      // this.levels[index].secondArray[0].userValue[pageSetIndex].pageSet[pageIndex].tempName = this.levels[index].firstArry[0].btnTitle[pageSetIndex].role + ` PageSet WS ${++this.workSystemCount}`;
    } else if (event.target.value === 'WORK_IMPROVEMENT') {
      this.levels[index].secondArray[0].userValue[pageSetIndex].pageSet[
        pageIndex
      ].name =
        this.levels[index].firstArry[0].btnTitle[pageSetIndex].role +
        ` PageSet WI ${++this.workImprovementCount}`;
      // this.levels[index].secondArray[0].userValue[pageSetIndex].pageSet[pageIndex].tempName = this.levels[index].firstArry[0].btnTitle[pageSetIndex].role + ` PageSet WI ${++this.workImprovementCount}`;
    } else if (event.target.value === 'WORK_MEASUREMENT') {
      this.levels[index].secondArray[0].userValue[pageSetIndex].pageSet[
        pageIndex
      ].name =
        this.levels[index].firstArry[0].btnTitle[pageSetIndex].role +
        ` PageSet WM ${++this.workMeasurementCount}`;
      // this.levels[index].secondArray[0].userValue[pageSetIndex].pageSet[pageIndex].tempName = this.levels[index].firstArry[0].btnTitle[pageSetIndex].role + ` PageSet WM ${++this.workMeasurementCount}`;
    } else if (event.target.value === 'WORK_DIRECTION') {
      this.levels[index].secondArray[0].userValue[pageSetIndex].pageSet[
        pageIndex
      ].name =
        this.levels[index].firstArry[0].btnTitle[pageSetIndex].role +
        ` PageSet WD ${++this.workDirectionCount}`;
      // this.levels[index].secondArray[0].userValue[pageSetIndex].pageSet[pageIndex].tempName = this.levels[index].firstArry[0].btnTitle[pageSetIndex].role + ` PageSet WD ${++this.workDirectionCount}`;
    }

    console.log('Levels PageSet Updation', this.levels);
  }

  updatePageOwner(event, index, pageSetIndex, pageIndex) {
    const user = this.listOfUsers.find(
      (userObj) => userObj.id === event.target.value
    );
    this.levels[index].secondArray[0].userValue[pageSetIndex].pageSet[
      pageIndex
    ].owner.name = user.username;
    this.levels[index].secondArray[0].userValue[pageSetIndex].pageSet[
      pageIndex
    ].owner.userId = user.id;
    console.log('Levels PageSet Updation', this.levels);
  }

  showSuccessMessage(res: any) {
    if (res)
      this.snackBar.open('Node saved successfully', 'Close', {
        duration: 1500,
        verticalPosition: 'top',
        panelClass: 'mat-snack-bar-success',
      });
  }

  unloackLevel(index: number) {
    this.levels.forEach((l, i) => {
      if (i == index) {
        l.lock = false;
      }
    });
  }
  modifyNodeRolesToArray(nodes: Array<any>, listIndex) {
    for (let i = 0; i < nodes.length; i++) {
      if (listIndex == 1)
        this.modifiedListOfUsersLevel1.push({
          id: nodes[i].id,
          role: nodes[i].role,
        });
      if (listIndex == 2)
        this.modifiedListOfUsersLevel2.push({
          id: nodes[i].id,
          role: nodes[i].role,
        });
      if (listIndex == 3)
        this.modifiedListOfUsersLevel3.push({
          id: nodes[i].id,
          role: nodes[i].role,
        });
      if (listIndex == 4)
        this.modifiedListOfUsersLevel4.push({
          id: nodes[i].id,
          role: nodes[i].role,
        });
      if (listIndex == 5)
        this.modifiedListOfUsersLevel5.push({
          id: nodes[i].id,
          role: nodes[i].role,
        });
      if (listIndex == 6)
        this.modifiedListOfUsersLevel6.push({
          id: nodes[i].id,
          role: nodes[i].role,
        });
    }
  }

  Save(i) {
    // For Level 0
    if (i == 0) {
      if (this.levels[0].firstArry[0].btnTitle.length == 0) {
        if (
          this.validateNode(
            this.levels[0].mainTitle,
            this.levels[0].firstArry[0].btnTitle
          )
        )
          return;
      }
      const organizationLevels = [];
      for (let i = 0; i < this.levels[0].firstArry[0].btnTitle.length; i++) {
        this.setPageName(0, i);
        const organizationLevel = new OrganizationLevels(
          this.levels[0].firstArry[0].btnTitle[i].id,
          this.organizationId,
          '0',
          this.levels[0].firstArry[0].btnTitle[i].role,
          new OrganizationUser(
            this.levels[0].firstArry[0].btnTitle[i].user.id,
            this.levels[0].firstArry[0].btnTitle[i].user.username
          ),
          this.levels[0].secondArray[0].userValue[i].pageSet,
          null
        );
        organizationLevels.push(organizationLevel);
        if (
          this.validatePageSet(
            this.levels[0].firstArry[0].btnTitle[i].role,
            this.levels[0].secondArray[0].userValue[i].pageSet
          )
        )
          return;
      }

      const nodes = new Nodes(organizationLevels);
      console.log('Organization Levels:', nodes);
      this.OrganizationService.createOrganizationBulk(nodes).subscribe(
        (res) => {
          console.log('Response from Server of OrganizationLevels:', res);
          this.showSuccessMessage(res);
          this.responseLevel0 = res;
          this.modifiedListOfUsersLevel1 = [];
          this.unloackLevel(1);
          for (let i = 0; i < res?.nodes?.length; i++) {
            this.modifiedListOfUsersLevel1.push({
              id: res?.nodes[i].id,
              role: res?.nodes[i].role,
            });
            console.log(
              'Modified List of Users:',
              this.modifiedListOfUsersLevel1
            );
          }
        }
      );
    }

    // For Level 1
    if (i == 1) {
      if (this.levels[1].firstArry[0].btnTitle.length == 0) {
        if (
          this.validateNode(
            this.levels[1].mainTitle,
            this.levels[1].firstArry[0].btnTitle
          )
        )
          return;
      }
      const organizationLevels = [];
      for (let i = 0; i < this.levels[1].firstArry[0].btnTitle.length; i++) {
        this.setPageName(1, i);
        const organizationLevel = new OrganizationLevels(
          this.levels[1].firstArry[0].btnTitle[i].id,
          this.organizationId,
          '1',
          this.levels[1].firstArry[0].btnTitle[i].role,
          new OrganizationUser(
            this.levels[1].firstArry[0].btnTitle[i].user.id,
            this.levels[1].firstArry[0].btnTitle[i].user.username
          ),
          this.levels[1].secondArray[0].userValue[i].pageSet,
          this.levels[1].firstArry[0].btnTitle[i].reportsTo
        );
        organizationLevels.push(organizationLevel);
        if (
          this.validatePageSet(
            this.levels[1].firstArry[0].btnTitle[i].role,
            this.levels[1].secondArray[0].userValue[i].pageSet
          )
        )
          return;
      }
      const nodes = new Nodes(organizationLevels);
      console.log('Organization Levels:', nodes);
      this.OrganizationService.createOrganizationBulk(nodes).subscribe(
        (res) => {
          console.log('Response from Server of OrganizationLevels:', res);
          // console.log('Response Level 0:', this.responseLevel0.nodes);
          this.showSuccessMessage(res);
          this.responseLevel1 = res;
          this.modifiedListOfUsersLevel2 = [];
          this.unloackLevel(2);
          // ;
          for (let i = 0; i < res?.nodes?.length; i++) {
            this.modifiedListOfUsersLevel2.push({
              id: res?.nodes[i].id,
              role: res?.nodes[i].role,
            });
            console.log(
              'Modified List of Users:',
              this.modifiedListOfUsersLevel2
            );
          }
        }
      );
    }

    // For Level 2
    if (i == 2) {
      if (this.levels[2].firstArry[0].btnTitle.length == 0) {
        if (
          this.validateNode(
            this.levels[2].mainTitle,
            this.levels[2].firstArry[0].btnTitle
          )
        )
          return;
      }
      const organizationLevels = [];
      for (let i = 0; i < this.levels[2].firstArry[0].btnTitle.length; i++) {
        this.setPageName(2, i);
        const organizationLevel = new OrganizationLevels(
          this.levels[2].firstArry[0].btnTitle[i].id,
          this.organizationId,
          '2',
          this.levels[2].firstArry[0].btnTitle[i].role,
          new OrganizationUser(
            this.levels[2].firstArry[0].btnTitle[i].user.id,
            this.levels[2].firstArry[0].btnTitle[i].user.username
          ),
          this.levels[2].secondArray[0].userValue[i].pageSet,
          this.levels[2].firstArry[0].btnTitle[i].reportsTo
        );
        organizationLevels.push(organizationLevel);
        if (
          this.validatePageSet(
            this.levels[2].firstArry[0].btnTitle[i].role,
            this.levels[2].secondArray[0].userValue[i].pageSet
          )
        )
          return;
      }
      const nodes = new Nodes(organizationLevels);
      console.log('Organization Levels:', nodes);
      this.OrganizationService.createOrganizationBulk(nodes).subscribe(
        (res) => {
          console.log('Response from Server of OrganizationLevels:', res);
          // console.log('Response Level 0:', this.responseLevel1.nodes);
          this.responseLevel2 = res;
          this.showSuccessMessage(res);
          this.modifiedListOfUsersLevel3 = [];
          this.unloackLevel(3);
          for (let i = 0; i < res?.nodes?.length; i++) {
            this.modifiedListOfUsersLevel3.push({
              id: res?.nodes[i].id,
              role: res?.nodes[i].role,
            });
            console.log(
              'Modified List of Users:',
              this.modifiedListOfUsersLevel3
            );
          }
        }
      );
    }

    // For Level 3
    if (i == 3) {
      if (this.levels[3].firstArry[0].btnTitle.length == 0) {
        if (
          this.validateNode(
            this.levels[3].mainTitle,
            this.levels[3].firstArry[0].btnTitle
          )
        )
          return;
      }
      const organizationLevels = [];
      for (let i = 0; i < this.levels[3].firstArry[0].btnTitle.length; i++) {
        this.setPageName(3, i);
        const organizationLevel = new OrganizationLevels(
          this.levels[3].firstArry[0].btnTitle[i].id,
          this.organizationId,
          '3',
          this.levels[3].firstArry[0].btnTitle[i].role,
          new OrganizationUser(
            this.levels[3].firstArry[0].btnTitle[i].user.id,
            this.levels[3].firstArry[0].btnTitle[i].user.username
          ),
          this.levels[3].secondArray[0].userValue[i].pageSet,
          this.levels[3].firstArry[0].btnTitle[i].reportsTo
        );
        organizationLevels.push(organizationLevel);
        if (
          this.validatePageSet(
            this.levels[3].firstArry[0].btnTitle[i].role,
            this.levels[3].secondArray[0].userValue[i].pageSet
          )
        )
          return;
      }
      const nodes = new Nodes(organizationLevels);
      console.log('Organization Levels:', nodes);
      this.OrganizationService.createOrganizationBulk(nodes).subscribe(
        (res) => {
          console.log('Response from Server of OrganizationLevels:', res);
          // console.log('Response Level 0:', this.responseLevel2.nodes);
          this.responseLevel3 = res;
          this.showSuccessMessage(res);
          this.modifiedListOfUsersLevel4 = [];
          this.unloackLevel(4);
          for (let i = 0; i < res?.nodes?.length; i++) {
            this.modifiedListOfUsersLevel4.push({
              id: res?.nodes[i].id,
              role: res?.nodes[i].role,
            });
            console.log(
              'Modified List of Users:',
              this.modifiedListOfUsersLevel4
            );
          }
        }
      );
    }

    // For Level 4
    if (i == 4) {
      if (this.levels[4].firstArry[0].btnTitle.length == 0) {
        if (
          this.validateNode(
            this.levels[4].mainTitle,
            this.levels[4].firstArry[0].btnTitle
          )
        )
          return;
      }
      const organizationLevels = [];
      for (let i = 0; i < this.levels[4].firstArry[0].btnTitle.length; i++) {
        this.setPageName(4, i);
        const organizationLevel = new OrganizationLevels(
          this.levels[4].firstArry[0].btnTitle[i].id,
          this.organizationId,
          '4',
          this.levels[4].firstArry[0].btnTitle[i].role,
          new OrganizationUser(
            this.levels[4].firstArry[0].btnTitle[i].user.id,
            this.levels[4].firstArry[0].btnTitle[i].user.username
          ),
          this.levels[4].secondArray[0].userValue[i].pageSet,
          this.levels[4].firstArry[0].btnTitle[i].reportsTo
        );
        organizationLevels.push(organizationLevel);
        if (
          this.validatePageSet(
            this.levels[4].firstArry[0].btnTitle[i].role,
            this.levels[4].secondArray[0].userValue[i].pageSet
          )
        )
          return;
      }
      const nodes = new Nodes(organizationLevels);
      console.log('Organization Levels:', nodes);
      this.OrganizationService.createOrganizationBulk(nodes).subscribe(
        (res) => {
          console.log('Response from Server of OrganizationLevels:', res);
          // console.log('Response Level 0:', this.responseLevel3.nodes);
          this.responseLevel4 = res;
          this.showSuccessMessage(res);
          this.modifiedListOfUsersLevel5 = [];
          this.unloackLevel(5);
          for (let i = 0; i < res?.nodes?.length; i++) {
            this.modifiedListOfUsersLevel5.push({
              id: res?.nodes[i].id,
              role: res?.nodes[i].role,
            });
            console.log(
              'Modified List of Users:',
              this.modifiedListOfUsersLevel5
            );
          }
        }
      );
    }

    // For Level 5
    if (i == 5) {
      if (this.levels[5].firstArry[0].btnTitle.length == 0) {
        if (
          this.validateNode(
            this.levels[5].mainTitle,
            this.levels[5].firstArry[0].btnTitle
          )
        )
          return;
      }
      const organizationLevels = [];
      for (let i = 0; i < this.levels[5].firstArry[0].btnTitle.length; i++) {
        this.setPageName(5, i);
        const organizationLevel = new OrganizationLevels(
          this.levels[5].firstArry[0].btnTitle[i].id,
          this.organizationId,
          '5',
          this.levels[5].firstArry[0].btnTitle[i].role,
          new OrganizationUser(
            this.levels[5].firstArry[0].btnTitle[i].user.id,
            this.levels[5].firstArry[0].btnTitle[i].user.username
          ),
          this.levels[5].secondArray[0].userValue[i].pageSet,
          this.levels[5].firstArry[0].btnTitle[i].reportsTo
        );
        organizationLevels.push(organizationLevel);
        if (
          this.validatePageSet(
            this.levels[5].firstArry[0].btnTitle[i].role,
            this.levels[5].secondArray[0].userValue[i].pageSet
          )
        )
          return;
      }
      const nodes = new Nodes(organizationLevels);
      console.log('Organization Levels:', nodes);
      this.OrganizationService.createOrganizationBulk(nodes).subscribe(
        (res) => {
          console.log('Response from Server of OrganizationLevels:', res);
          // console.log('Response Level 0:', this.responseLevel4.nodes);
          this.responseLevel5 = res;
          this.showSuccessMessage(res);
          this.modifiedListOfUsersLevel6 = [];
          this.unloackLevel(6);
          for (let i = 0; i < res?.nodes?.length; i++) {
            this.modifiedListOfUsersLevel6.push({
              id: res?.nodes[i].id,
              role: res?.nodes[i].role,
            });
            console.log(
              'Modified List of Users:',
              this.modifiedListOfUsersLevel6
            );
          }
        }
      );
    }

    // For Level 6
    if (i == 6) {
      if (this.levels[6].firstArry[0].btnTitle.length == 0) {
        if (
          this.validateNode(
            this.levels[6].mainTitle,
            this.levels[6].firstArry[0].btnTitle
          )
        )
          return;
      }
      const organizationLevels = [];
      for (let i = 0; i < this.levels[6].firstArry[0].btnTitle.length; i++) {
        this.setPageName(6, i);
        const organizationLevel = new OrganizationLevels(
          this.levels[6].firstArry[0].btnTitle[i].id,
          this.organizationId,
          '6',
          this.levels[6].firstArry[0].btnTitle[i].role,
          new OrganizationUser(
            this.levels[6].firstArry[0].btnTitle[i].user.id,
            this.levels[6].firstArry[0].btnTitle[i].user.username
          ),
          this.levels[6].secondArray[0].userValue[i].pageSet,
          this.levels[6].firstArry[0].btnTitle[i].reportsTo
        );
        organizationLevels.push(organizationLevel);
        if (
          this.validatePageSet(
            this.levels[6].firstArry[0].btnTitle[i].role,
            this.levels[6].secondArray[0].userValue[i].pageSet
          )
        )
          return;
      }
      const nodes = new Nodes(organizationLevels);
      console.log('Organization Levels:', nodes);
      this.OrganizationService.createOrganizationBulk(nodes).subscribe(
        (res) => {
          console.log('Response from Server of OrganizationLevels:', res);
          // console.log('Response Level 0:', this.responseLevel5.nodes);
          this.responseLevel6 = res;
          this.showSuccessMessage(res);
          this.unloackLevel(0);
        }
      );
    }
  }

  savePage() {
    this.levels.forEach((level, index) => {
      this.Save(index);
    });
  }

  public loadOrganizationById() {
    if (this.OrganizationService.findByOrgId()) {
      this.OrganizationService.findByOrgId().subscribe((org: Organization) => {
        if (org) {
          this.organization = org;
        }
      });
    }
  }
}
function checkNodes() {
  throw new Error('Function not implemented.');
}
