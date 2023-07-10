import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FilterService } from 'primeng/api';
import { Owner } from 'src/app/models/owner';
import { TeamMembersService } from 'src/app/services/team-members.service';
import { VoiceToTextServiceService } from 'src/app/services/voice-to-text-service.service';
import { User } from '../../../models/user/user';
import {PageDirectionalStatement, PageDirectionalStatementDataInput} from '../../../models/work-direction/work-direction';
import {WorkImprovementPDCAStatement, WorkImprovementPlanOutcomes} from '../../../models/work-improvement/work-improvment';
import { PageDataManagementRailRaiting } from '../../../models/work-system/work-system-header';
import { PageMetaPageTeamTeamLeader } from 'src/app/models/work-system/work-system-body';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-phase-two',
  templateUrl: './phase-two.component.html',
  styleUrls: ['./phase-two.component.css'],
  providers: [TeamMembersService, FilterService, UserService],
})
export class PhaseTwoComponent implements OnInit, OnChanges {
  showMicForTextArea: Boolean = false;
  showRatingModel: Boolean = false;
  voiceserviceForPDCA: Boolean = false;
  voiceserviceForOutCome: Boolean = false;
  collapseCard: Boolean = false;
  showModal: Boolean = false;
  downArrow: Boolean = false;
  upArrow: Boolean = true;
  showSnakeBar: Boolean;
  showFirstCard: boolean = true;
  showMicForPDCA: Boolean = false;
  showMicForPlanOutCome: Boolean = false;
  phaseTitle: string = '';
  elementsData: string = '';
  thirdCardSelectedInput: any;
  textAreaVal: string = '';
  bgColor: string = '';
  colorValue: string;
  index: number = -1;
  ownerSelectiveIndex: number = -1;
  closingGate: Boolean;
  showExitGate: Boolean;
  // phaseMasterIndex: number = 1;
  selectiveIndex: number;
  itemslist: any[] = [];
  items: any[] = [];
  names: any[] = [];
  listOfPDCA: any[] = [];
  listOfPlanOutCome: any[] = [];
  statementOwnerList: any[] = [];
  ownerList: User[] = [];
  stroeOwnerList: Owner[] = [];
  @Input() phaseMasterIndex: number;
  @Input() lockstatus: Boolean = false;
  @Output() sendColor = new EventEmitter();
  @Output() sendStatement = new EventEmitter();
  @Output() sendStatementPurpose = new EventEmitter();
  @Output() sendStatementOwners = new EventEmitter();
  @Output() sendInputs = new EventEmitter();
  @Output() sendOutcomes = new EventEmitter();
  @Output() sendPdcaStatements = new EventEmitter();
  @Input() wdStatement: PageDirectionalStatement;
  inputs: Array<PageDirectionalStatementDataInput> = [];
  outcomes: Array<WorkImprovementPlanOutcomes> = [];
  outcomesOpenedPhases: number = 0;
  pdca: Array<WorkImprovementPDCAStatement> = [];
  pdcaOpenedPhases: number = 0;
  statementOwners: Array<PageMetaPageTeamTeamLeader> = [];
  statementPurpose: string;
  statement: string;
  text: string;
  results: User[] = [];

  keyword = 'name';
  public data = [
    {
      id: 1,
      name: 'Albania',
    },
    {
      id: 2,
      name: 'Belgium',
    },
    {
      id: 3,
      name: 'Denmark',
    },
    {
      id: 4,
      name: 'Montenegro',
    },
    {
      id: 5,
      name: 'Turkey',
    },
    {
      id: 6,
      name: 'Ukraine',
    },
    {
      id: 7,
      name: 'Macedonia',
    },
    {
      id: 8,
      name: 'Slovenia',
    },
    {
      id: 9,
      name: 'Georgia',
    },
    {
      id: 10,
      name: 'India',
    },
    {
      id: 11,
      name: 'Russia',
    },
    {
      id: 12,
      name: 'Switzerland',
    },
  ];
  users: User[] = [];
  constructor(
    private voiceToTextService: VoiceToTextServiceService,
    private teamMemeberService: TeamMembersService,
    private filterService: FilterService,
    private userService: UserService
  ) {
    this.voiceToTextService.init();
    voiceToTextService.text = '';
  }

  loadUsers() {
    this.userService.findByOrgId().subscribe((users: Array<User>) => {
      if (users) {
        this.users = users
        this.setUserNameOfUsers()
      }
    })
  }
  setUserNameOfUsers() {
    if (this.users.length > 0) {
      this.users.forEach((m, i) => {
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

  ngOnInit(): void {
    this.loadUsers()
    this.teamMemeberService.loadUsers();
    console.log('Items Array from phase 2', this.itemslist);
    this.statementOwnerList = [
      'Molly',
      'Albert',
      'Martin',
      'David',
      'Javed',
      'Ali',
    ];
  }
  wdStatementPopulated: Boolean = false;
  ngOnChanges(changes: SimpleChanges): void {
    for (const propName in changes) {
      if (propName == 'wdStatement') {
        if (this.wdStatement && !this.wdStatementPopulated) {
          this.statementPurpose = this.wdStatement?.meta?.statementPurpose;
          this.setStatementPurpose();
          this.statement = this.wdStatement?.meta?.statement;
          this.setStatement();
          if (this.wdStatement?.meta?.statementOwners) {
            this.wdStatement?.meta?.statementOwners?.forEach((owner) => {
              this.ownerList.push(new User(
                owner.userId,
                owner.name,
                null,
                null,
                localStorage.getItem('organizationId'),
                [],
                null,
                null
              ),
              );
              this.statementOwners.push(owner);
            });
            this.sendStatementOwners.emit({
              index: this.phaseMasterIndex - 1,
              statementOwners: this.statementOwners,
            });
          }
          this.colorValue = this.wdStatement?.meta?.color;
          this.sendColor.emit({
            index: this.phaseMasterIndex - 1,
            color: this.colorValue,
          });
          if (this.wdStatement?.data?.outcomes) {
            this.wdStatement?.data?.outcomes.forEach((outcome) => {
              this.listOfPlanOutCome.push({
                color: outcome?.rating?.color,
                showModal: false,
                value: outcome?.text,
              });
              this.outcomes.push(
                new WorkImprovementPlanOutcomes(
                  outcome?.text,
                  new PageDataManagementRailRaiting(
                    outcome?.rating?.color,
                    outcome?.rating?.note,
                    outcome?.rating?.opportunity,
                    {
                      id: outcome?.rating?.task?.id,
                      contributor: {
                        name: outcome?.rating?.task?.contributor?.name,
                        userId: outcome?.rating?.task?.contributor?.userId,
                      },
                      notes: outcome?.rating?.task?.notes,
                      owner: {
                        name: outcome?.rating?.task?.owner?.name,
                        userId: outcome?.rating?.task?.owner?.userId,
                      },
                      task: outcome?.rating?.task?.task,
                      priority: outcome?.rating?.task?.priority,
                      status: outcome?.rating?.task?.status,
                      dueDate: outcome?.rating?.task?.dueDate
                    },
                    {
                      date: outcome?.rating?.decision?.date,
                      owner: {
                        name: outcome?.rating?.decision?.owner?.name,
                        userId: outcome?.rating?.decision?.owner?.userId,
                      },
                      summary: outcome?.rating?.decision?.summary,
                    }
                  ),
                  outcome?.seqNumber
                )
              );
            });
            this.sendOutcomes.emit({
              index: this.phaseMasterIndex - 1,
              outcomes: this.outcomes,
            });
          }
          if (this.wdStatement?.data?.pdca) {
            this.wdStatement?.data?.outcomes.forEach((pdca) => {
              this.listOfPDCA.push({
                color: pdca?.rating?.color,
                showModal: false,
                value: pdca?.text,
              });
              this.pdca.push(
                new WorkImprovementPDCAStatement(
                  pdca?.text,
                  new PageDataManagementRailRaiting(
                    pdca?.rating?.color,
                    pdca?.rating?.note,
                    pdca?.rating?.opportunity,
                    {
                      id: pdca?.rating?.task?.id,
                      contributor: {
                        name: pdca?.rating?.task?.contributor?.name,
                        userId: pdca?.rating?.task?.contributor?.userId,
                      },
                      notes: pdca?.rating?.task?.notes,
                      owner: {
                        name: pdca?.rating?.task?.owner?.name,
                        userId: pdca?.rating?.task?.owner?.userId,
                      },
                      task: pdca?.rating?.task?.task,
                      priority: pdca?.rating?.task?.priority,
                      status: pdca?.rating?.task?.status,
                      dueDate: pdca?.rating?.task?.dueDate
                    },
                    {
                      date: pdca?.rating?.decision?.date,
                      owner: {
                        name: pdca?.rating?.decision?.owner?.name,
                        userId: pdca?.rating?.decision?.owner?.userId,
                      },
                      summary: pdca?.rating?.decision?.summary,
                    }
                  ),
                  pdca?.seqNumber
                )
              );
            });
            this.sendPdcaStatements.emit({
              index: this.phaseMasterIndex - 1,
              pdca: this.pdca,
            });
          }
          this.wdStatementPopulated = true;
        }
      }
    }
  }

  getElementsData(elements: any) {
    this.elementsData = elements;
  }

  getItemsArray(elements: any) {
    this.itemslist = elements;
    console.log('Items Array getItemsArray', elements);
  }
  getInputs(inputsEvent) {
    this.sendInputs.emit({
      index: this.phaseMasterIndex - 1,
      inputs: inputsEvent.inputs,
    });
  }

  getPhaseTitle(val) {
    this.phaseTitle = val;
  }

  toggle() {
    console.log('toggle called.');
    this.collapseCard = !this.collapseCard;
    this.upArrow = !this.upArrow;
    this.downArrow = !this.downArrow;
  }

  addOwners() {
    if (this.ownerList.length < 16) {
      this.ownerList.push(
        new User(
          null,
          null,
          null,
          null,
          localStorage.getItem('organizationId'),
          [],
          null,
          null
        ),
      );
      this.statementOwners.push(null);
      this.sendStatementOwners.emit({
        index: this.phaseMasterIndex - 1,
        statementOwners: this.statementOwners,
      });
    }
  }

  removeOwner() {
    if (this.ownerSelectiveIndex != -1) {
      this.ownerList.splice(this.ownerSelectiveIndex, 1);
      this.statementOwners.splice(this.ownerSelectiveIndex, 1);
      this.sendStatementOwners.emit({
        index: this.phaseMasterIndex - 1,
        statementOwners: this.statementOwners,
      });
      this.ownerSelectiveIndex != -1;
    } else {
      this.ownerList.pop();
      this.statementOwners.pop();
      this.sendStatementOwners.emit({
        index: this.phaseMasterIndex - 1,
        statementOwners: this.statementOwners,
      });
    }
  }

  fetchOwnerSelectiveIndex(i: number) {
    this.ownerSelectiveIndex = i;
    // this.ownerList[i].ownerName = this.text
  }

  addRatingColor() {
    if (this.lockstatus == false || this.lockstatus == undefined) {
      this.showRatingModel = !this.showRatingModel;
    }
  }

  selectedColor(val) {
    this.colorValue = val.background;
    this.sendColor.emit({
      index: this.phaseMasterIndex - 1,
      color: val.background,
    });
    this.showRatingModel = false;
  }

  cancelMode(value) {
    console.log('cancel value....', value);
    this.showRatingModel = value;
  }

  onPressed() {
    if (this.items.length <= 14) {
      this.showExitGate = false;
      this.closingGate = true;
      this.items.push(this.names[this.index + 1]);
      this.index++;
    } else {
      this.showExitGate = true;
      this.closingGate = false;
    }
  }

  removePages() {
    if (this.thirdCardSelectedInput != undefined) {
      this.items.splice(this.thirdCardSelectedInput, 1);
      this.thirdCardSelectedInput = undefined;
    } else {
      this.items.pop();
    }
  }

  RemoveElementFromArray(index: number) {
    this.thirdCardSelectedInput = index;
    this.bgColor = '#' + ((Math.random() * 0xf2f2f2) << 0).toString(16);
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.items, event.previousIndex, event.currentIndex);
  }

  addFiledForPDCA() {
    if (this.listOfPDCA.length < 10) {
      if (this.lockstatus == false || this.lockstatus == undefined) {
        this.listOfPDCA.push({ color: '', showModal: false, value: '' });
        this.pdcaOpenedPhases++;
        this.pdca.push(
          new WorkImprovementPDCAStatement(
            null,
            new PageDataManagementRailRaiting(
              null,
              null,
              null,
              {
                id: null,
                contributor: { name: null, userId: null },
                notes: null,
                owner: { name: null, userId: null },
                task: null,
                priority: null,
                status: null,
                dueDate: null
              },
              { date: null, owner: { name: null, userId: null }, summary: null }
            ),
            this.pdcaOpenedPhases.toString()
          )
        );
        this.sendPdcaStatements.emit({
          index: this.phaseMasterIndex - 1,
          pdca: this.pdca,
        });
      }
    }
  }

  removeFieldForPDCA() {
    if (this.lockstatus == false || this.lockstatus == undefined) {
      if (this.selectiveIndex != -1) {
        this.listOfPDCA.splice(this.selectiveIndex, 1);
        this.pdca.splice(this.selectiveIndex, 1);
        this.sendPdcaStatements.emit({
          index: this.phaseMasterIndex - 1,
          pdca: this.pdca,
        });
        this.selectiveIndex = -1;
      } else {
        this.listOfPDCA.pop();
        this.pdca.pop();
        this.pdcaOpenedPhases--;
        this.sendPdcaStatements.emit({
          index: this.phaseMasterIndex - 1,
          pdca: this.pdca,
        });
        if (this.listOfPDCA.length == 0) {
          this.showMicForPDCA = false;
        }
      }
    }
  }

  dropPDCA(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.listOfPDCA, event.previousIndex, event.currentIndex);
    moveItemInArray(
      this.pdca,
      event.previousIndex,
      event.currentIndex
    );
  }

  fetchIndexForPDCA(i: number) {
    this.selectiveIndex = i;
    this.showMicForPDCA = true;
  }

  addRatingForPDCA(i: number) {
    if (this.lockstatus == false || this.lockstatus == undefined) {
      if (this.listOfPDCA[i].showModal == true) {
        this.listOfPDCA[i].showModal = !this.listOfPDCA[i].showModal;
      } else {
        this.listOfPDCA.map((card) => {
          card.showModal = false;
        });
        this.listOfPDCA[i].showModal = true;
        this.showSnakeBar = !this.showSnakeBar;
        this.selectiveIndex = i;
      }
    }
  }

  setColorValueForPDCA(val: any) {
    this.listOfPDCA[this.selectiveIndex].showModal = false;
    this.listOfPDCA[this.selectiveIndex].color = val;
    this.showSnakeBar = !this.showSnakeBar;
  }
  setNoteValueForPDCA(note) {
    this.pdca[this.selectiveIndex].rating.note = note;
    this.sendPdcaStatements.emit({
      index: this.phaseMasterIndex - 1,
      pdca: this.pdca,
    });
  }
  setDecisionValueForPDCA(decision) {
    this.pdca[this.selectiveIndex].rating.decision = decision;
    this.sendPdcaStatements.emit({
      index: this.phaseMasterIndex - 1,
      pdca: this.pdca,
    });
  }
  setOpportunityValueForPDCA(opportunity) {
    this.pdca[this.selectiveIndex].rating.opportunity = opportunity;
    this.sendPdcaStatements.emit({
      index: this.phaseMasterIndex - 1,
      pdca: this.pdca,
    });
  }
  setTaskValueForPDCA(task) {
    this.pdca[this.selectiveIndex].rating.task = task;
    this.sendPdcaStatements.emit({
      index: this.phaseMasterIndex - 1,
      pdca: this.pdca,
    });
  }
  saveValueForPDCA(o, i) {
    this.pdca[i].text = o.value;
    this.sendPdcaStatements.emit({
      index: this.phaseMasterIndex - 1,
      pdca: this.pdca,
    });
  }

  addFiledForOutCome() {
    if (this.listOfPlanOutCome.length < 10) {
      if (this.lockstatus == false || this.lockstatus == undefined) {
        this.listOfPlanOutCome.push({ color: '', showModal: false, value: '' });
        this.outcomesOpenedPhases++;
        this.outcomes.push(
          new WorkImprovementPlanOutcomes(
            null,
            new PageDataManagementRailRaiting(
              null,
              null,
              null,
              {
                id: null,
                contributor: { name: null, userId: null },
                notes: null,
                owner: { name: null, userId: null },
                task: null,
                priority: null,
                status: null,
                dueDate: null
              },
              { date: null, owner: { name: null, userId: null }, summary: null }
            ),
            this.outcomesOpenedPhases.toString()
          )
        );
        this.sendOutcomes.emit({
          index: this.phaseMasterIndex - 1,
          outcomes: this.outcomes,
        });
      }
    }
  }

  removeFieldForOutCome() {
    if (this.lockstatus == false || this.lockstatus == undefined) {
      if (this.selectiveIndex != -1) {
        this.listOfPlanOutCome.splice(this.selectiveIndex, 1);
        this.outcomes.splice(this.selectiveIndex, 1);
        this.sendOutcomes.emit({
          index: this.phaseMasterIndex - 1,
          outcomes: this.outcomes,
        });
        this.selectiveIndex = -1;
      } else {
        this.listOfPlanOutCome.pop();
        this.outcomes.pop();
        this.outcomesOpenedPhases--;
        this.sendOutcomes.emit({
          index: this.phaseMasterIndex - 1,
          outcomes: this.outcomes,
        });
        if (this.listOfPlanOutCome.length == 0) {
          this.showMicForPlanOutCome = false;
        }
      }
    }
  }

  dropOutComeFileds(event: CdkDragDrop<string[]>) {
    moveItemInArray(
      this.listOfPlanOutCome,
      event.previousIndex,
      event.currentIndex
    );
    moveItemInArray(this.outcomes, event.previousIndex, event.currentIndex);
  }

  fetchIndexforOutComeFields(i: number) {
    this.selectiveIndex = i;
    this.showMicForPlanOutCome = true;
  }

  addRatingForOutCome(i: number) {
    if (this.lockstatus == false || this.lockstatus == undefined) {
      if (this.listOfPlanOutCome[i].showModal == true) {
        this.listOfPlanOutCome[i].showModal =
          !this.listOfPlanOutCome[i].showModal;
      } else {
        this.listOfPlanOutCome.map((card) => {
          card.showModal = false;
        });
        this.listOfPlanOutCome[i].showModal = true;
        this.showSnakeBar = !this.showSnakeBar;
        this.selectiveIndex = i;
      }
    }
  }

  setColorValueForOutCome(val: any) {
    this.listOfPlanOutCome[this.selectiveIndex].showModal = false;
    this.listOfPlanOutCome[this.selectiveIndex].color = val;
    this.showSnakeBar = !this.showSnakeBar;
  }
  setNoteValueForOutcome(note) {
    this.outcomes[this.selectiveIndex].rating.note = note;
    this.sendOutcomes.emit({
      index: this.phaseMasterIndex - 1,
      outcomes: this.outcomes,
    });
  }
  setDecisionValueForOutcome(decision) {
    this.outcomes[this.selectiveIndex].rating.decision = decision;
    this.sendOutcomes.emit({
      index: this.phaseMasterIndex - 1,
      outcomes: this.outcomes,
    });
  }
  setOpportunityValueForOutcome(opportunity) {
    this.outcomes[this.selectiveIndex].rating.opportunity = opportunity;
    this.sendOutcomes.emit({
      index: this.phaseMasterIndex - 1,
      outcomes: this.outcomes,
    });
  }
  setTaskValueForOutcome(task) {
    this.outcomes[this.selectiveIndex].rating.task = task;
    this.sendOutcomes.emit({
      index: this.phaseMasterIndex - 1,
      outcomes: this.outcomes,
    });
  }
  saveOutcomeValue(o, i) {
    this.outcomes[i].text = o.value;
    this.sendOutcomes.emit({
      index: this.phaseMasterIndex - 1,
      outcomes: this.outcomes,
    });
  }

  startService(event) {
    console.log('startService...' + event);
    if (event == 'pdca') {
      if (this.voiceserviceForPDCA == false) {
        this.voiceToTextService.start();
        this.voiceserviceForPDCA = true;
        console.log('selected index is', this.selectiveIndex);
        window['listenInterval'] = setInterval(() => {
          this.listOfPDCA[this.selectiveIndex].value =
            this.voiceToTextService.text;
          this.pdca[this.selectiveIndex].text =
            this.voiceToTextService.text;
          this.sendPdcaStatements.emit({
            index: this.phaseMasterIndex - 1,
            pdca: this.pdca,
          });
        }, 500);
      } else {
        this.listOfPDCA[this.selectiveIndex].value =
          this.voiceToTextService.text;
        this.pdca[this.selectiveIndex].text =
          this.voiceToTextService.text;
        this.sendPdcaStatements.emit({
          index: this.phaseMasterIndex - 1,
          pdca: this.pdca,
        });
        clearInterval(window['listenInterval']);
        this.stopService();
      }
    } else {
      if (this.voiceserviceForOutCome == false) {
        this.voiceToTextService.start();
        this.voiceserviceForOutCome = true;
        console.log('selected index is', this.selectiveIndex);
        window['listenInterval'] = setInterval(() => {
          this.listOfPlanOutCome[this.selectiveIndex].value =
            this.voiceToTextService.text;
          this.outcomes[this.selectiveIndex].text =
            this.voiceToTextService.text;
          this.sendOutcomes.emit({
            index: this.phaseMasterIndex - 1,
            outcomes: this.outcomes,
          });
        }, 500);
      } else {
        this.listOfPlanOutCome[this.selectiveIndex].value =
          this.voiceToTextService.text;
        this.outcomes[this.selectiveIndex].text = this.voiceToTextService.text;
        this.sendOutcomes.emit({
          index: this.phaseMasterIndex - 1,
          outcomes: this.outcomes,
        });
        clearInterval(window['listenInterval']);
        this.stopService();
      }
    }
  }

  stopService() {
    if (this.voiceserviceForPDCA) {
      this.voiceserviceForPDCA = false;
    } else {
      this.voiceserviceForOutCome = false;
    }
    this.voiceToTextService.stop();
  }

  search(event) {
    console.log('serch method called...' + event.query);
    this.results = this.teamMemeberService.search(event.query);
  }
  getStatementOwner(e, index) {
    const user: User = this.users.filter(user => user.id == e.target.value)[0];
    if (user) this.statementOwners[index] = { userId: user.id, name: user.username };
    this.sendStatementOwners.emit({
      index: this.phaseMasterIndex - 1,
      statementOwners: this.statementOwners,
    });
  }
  setStatementPurpose() {
    this.sendStatementPurpose.emit({
      index: this.phaseMasterIndex - 1,
      statementPurpose: this.statementPurpose,
    });
  }
  setStatement() {
    this.sendStatement.emit({
      index: this.phaseMasterIndex - 1,
      statement: this.statement,
    });
  }

  selectEvent(item) {
    // do something with selected item
  }

  onChangeSearch(search: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }

  onFocused(e) {
    // do something
  }
}
