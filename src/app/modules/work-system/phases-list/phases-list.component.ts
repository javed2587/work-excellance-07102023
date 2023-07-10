import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
// import { PhaseItem } from '../phases-phases/phase-phases.component';
// import { phasesI } from 'src/app/models/phases-i';
import { PhaseItemI } from 'src/app/models/phase-item-i';
import { PageBody } from 'src/app/models/work-system/work-system-body';
// import { PageBody } from 'src/app/models/work-system-body';
// import { PageBody, WorkSystem } from 'src/app/models/work-system';

@Component({
  selector: 'app-phases-list',
  templateUrl: './phases-list.component.html',
  styleUrls: ['./phases-list.component.css'],
})
export class PhasesListComponent implements OnInit, OnChanges {
  phases: any[] = [];
  showFirstCard: boolean = true;
  bgColor: string = null;
  reNameExitGate: string = null;
  startingGateRenameValue: string = null;
  thirdCardSelectedInput: any;
  selectedPhaseIndex: number = -1;
  selectedGateIndex: number = -1;
  closingGate: boolean;
  showExitGate: boolean;
  childIndex: number;
  mainIndex: number;
  errorModalMessage: string = null;
  messageType: string = null;
  isPrimeModal: boolean = false;

  @Input() lockstatus: boolean = false;
  @Input() phaseListModalFlag;
  @Input() headerSectionModalFlag;

  @Output() sendPhaseListModalFlag = new EventEmitter();
  @Output() sendHeaderSectionFlag = new EventEmitter();
  @Output() sendPhasesList = new EventEmitter();
  // @Output() pushPhases = new EventEmitter();
  // phases: any[] = [];
  // names: any[] = [];
  // index: number = -1;
  // startGate: string = null
  // isSnackBArOpened : boolean = false;
  // modalFlag: boolean = false;
  // alertFlag: boolean = false;
  // whenClicked = [false, false];
  // @Input() phaseItemModalFlag: boolean = false;
  // @Input() itemIndex: number;
  // @Output() sendPhaseItemModalFlag = new EventEmitter();
  // @Output() phasePuprposeValue = new EventEmitter();

  constructor() {}

  ngOnInit(): void {
    this.phaseListModalFlag;
  }
  // this.phases.push({
  //   phaseTitle: null,
  //   phaseNameColor: null,
  //   purpose: null,
  //   measures: [
  //     {
  //       rateValue:null,
  //       note: null,
  //       task: null,
  //       oppertunity: null,
  //       decision: null,
  //       value: null,
  //       toolbarStatus: false
  //       }
  //     ],
  //   initialTitle: null,
  //   gateColorValue:null,
  //   reNameExitGate: this.reNameExitGate,
  //   startValue: this.startingGateRenameValue,
  //   gateModal: false,
  //   showModal: false,
  //   isStartingGate: false,
  //   phaseurposeFlag: false,
  //   phaseNameFlag: false,
  //   isDisabledDragDrop : false,
  //   isDisableDragDropForInnerWorksystem: false,
  //   workSteps: [
  //     {
  //       rateValue:null,
  //       note: null,
  //       task: null,
  //       oppertunity: null,
  //       decision: null,
  //       value: null,
  //       toolbarStatus: false,
  //       isChildDragDropOn: false
  //       }
  //     ],
  // phasesWorkTypeFields: [{rateValue:null, value: null, toolbarStatus: false, isChildDragDropOn: false}],
  // phaseName: [{colorVlaue: null, name: null,noteValue:null, Oppertunity:null}],

  // });
  @Input() isPhasesOn: boolean = false;
  @Output() pushBackEndData: EventEmitter<PageBody> =
    new EventEmitter<PageBody>();
  ngOnChanges(changes: SimpleChanges) {
    for (const propName in changes) {
      if (propName == 'isPhasesOn') {
        const chng = changes[propName];
        if (chng.currentValue) this.savePage();
      } else if (propName == 'phasesPage') {
        if (this.phasesPage) {
          
          this.phases = this.phasesPage.phases
            ? this.phasesPage.phases.map((p) => {
                return {
                  purpose: p.phaseDefinition.purpose.text,
                  purposeAttrs: p.phaseDefinition.purpose.rating,

                  phaseTitle: p.phaseDefinition.phaseTitle,
                  phase: p.phaseDefinition.phase.rating,

                  phaseMeasures: p.phaseDefinition.phaseMeasures
                    ? p.phaseDefinition.phaseMeasures.map((m) => {
                        return {
                          rateValue:
                            m.rating.color == null ? null : m.rating.color,
                          note: m.rating?.note,
                          task: m.rating?.task,
                          opportunity: m.rating?.opportunity,
                          decision: m.rating?.decision,
                          value: m.text,
                          toolbarStatus: false,
                        };
                      })
                    : [],
                  initialTitle: p.phaseDefinition.entryGate.text,
                  gateColorValue: p.phaseDefinition.entryGate.rating.color,
                  entryGate: {
                    text: p.phaseDefinition.entryGate.text,
                    rating: p.phaseDefinition.entryGate.rating,
                  },
                  reNameExitGate: this.reNameExitGate,
                  startValue: this.startingGateRenameValue,
                  gateModal: false,
                  showModal: false,
                  isStartingGate: false,
                  phaseurposeFlag: false,
                  phaseNameFlag: false,
                  isDisabledDragDrop: false,
                  isDisableDragDropForInnerWorksystem: false,
      
                  workSteps: p.workSteps
                    ? p.workSteps.map((w) => {
                        return {
                          rateValue: w.rating.color,
                          value: w.text,
                          note: w.rating?.note,
                          decision: w.rating?.decision,
                          opportunity: w.rating?.opportunity,
                          task: w.rating?.task
                        };
                      })
                    : [],
                };
              })
            : [];
        }
      }
    }
  }
  @Input() phasesPage: PageBody = { phases: [] };
  // savePhases() {
  @Output() sendSavePageEvent = new EventEmitter();
  savePage() {
    this.sendSavePageEvent.emit();
  }
  backendData() {
    debugger
    if (!this.phasesPage) {
      this.phasesPage = { phases: [] }
    }
    if (this.phasesPage) {
      debugger
      this.phasesPage.phases 
      debugger
      this.phasesPage.phases = this.phases.map((phase, i) => {
        return {
          phaseDefinition: {
            seqNumber: i.toString(),
            phaseTitle: phase.phaseTitle,
            purpose: {
              text: phase.purpose,
              rating: {
                task: phase?.purposeAttrs?.task,
                note: phase?.purposeAttrs?.note,
                decision: phase?.purposeAttrs?.decision,
                opportunity: phase?.purposeAttrs?.opportunity,
                color: null
              }
            },

            phaseMeasures: phase.phaseMeasures ? phase.phaseMeasures.map((measure, index) => {
              return {
                seqNumber: index,
                text: measure.value,
                rating: {
                  task: measure.task,
                  note: measure.note,
                  decision: measure.decision,
                  opportunity: measure.opportunity,
                  color: null
                }
              };
            }) : [],
            phase: {
              text: phase.phaseTitle,
              rating: {
                task: phase?.phase?.task,
                note: phase?.phase?.note,
                decision: phase?.phase?.decision,
                opportunity: phase?.phase?.opportunity,
                color: phase?.phase?.color,
              }
            },
            entryGate: {
              text:
                phase.initialTitle == null || !phase.initialTitle
                  ? !phase.startValue || phase.startValue == null
                    ? null
                    : phase.startValue
                  : phase.initialTitle,
              rating: {
                color: phase.entryGate?.rating?.color,
                note: phase.entryGate?.rating?.note,
                decision: phase.entryGate?.rating?.decision,
                opportunity: phase.entryGate?.rating?.opportunity,
                task: phase.entryGate?.rating?.task,
              },
            },
          },

          workSteps: phase.workSteps?  phase.workSteps.map((workStep, index) => {
            return {
              seqNumber: index,
              text: workStep.value,
              rating: {
                  note: workStep.note,
                  decision: workStep.decision,
                  opportunity: workStep.opportunity,
                  task: workStep.task,
                  color: workStep.rateValue,
                },
            };
          } 
          ) : [],
        };
      });
    }
    
    this.pushBackEndData.emit(this.phasesPage);
  }
  //? Gate
  entryGateCloseStatus(values) {
    this.phases[values.currentIndex].isStartingGate = values.status;

    this.backendData();
  }
  firstGateTitle: String;
  getInitialTitle(initialTitle: any) {
    if (initialTitle.index < 1) {
      this.firstGateTitle = initialTitle.value;
      this.phases[initialTitle.index].initialTitle = null;

      this.backendData();
    } else {
      this.phases[initialTitle.index].initialTitle = initialTitle.value;

      this.backendData();
    }
  }
  getGateSnakBarStatus(values) {
    
    this.sendHeaderSectionFlag.emit(false);
    this.sendPhaseListModalFlag.emit(true);
    const currentIndex = values.currentIndex;
    const status = values.status;
   
      this.phases.forEach((item) => {
        if (item.phaseMeasures)
          item.phaseMeasures.forEach((phase) => {
            phase.toolbarStatus = false;
          });
        if (item.workSteps)
          item.workSteps.forEach((phase) => {
            phase.toolbarStatus = false;
          });
        item.phaseurposeFlag = false;
        item.phaseNameFlag = false;
        item.isStartingGate = false;
      });
    this.phases[currentIndex].isStartingGate = !status;

    this.backendData();
  }
  getColorForGate(values) {
    const currentIndex = values.currentIndex;
    const color = values.colorValue;
    this.phases[currentIndex].entryGate.rating.color = color;
    this.phases[currentIndex].isStartingGate = false;
    this.backendData();
  }
  setpushNoteValueForGate(note) {
    
    const currentIndex = note.currentIndex;
    // this.phases[currentIndex].entryGate.rating.note = note.noteValue
    // this.phasesPage.phases[currentIndex].phaseDefinition.entryGate.rating.note = note.noteValue
    this.phases[currentIndex].entryGate.rating.note = note.noteValue
    this.phases[currentIndex].isStartingGate = false;
    // this.phasesPage.phases[currentIndex].
    this.backendData();
  }

  setpushDecisionValueForGate(decision) {
    const currentIndex = decision.currentIndex;
    this.phases[currentIndex].entryGate.rating.decision = decision.value
    this.backendData();
  }
  setpushOpportunityValueForGate(opportunity) {
    this.phases[opportunity.currentIndex].entryGate.rating.opportunity = opportunity.value
    this.backendData();
  }
  setpushTaskValueForGate(task) {
    this.phases[task.currentIndex].entryGate.rating.task = task.value
    this.backendData();
  }

  //? phases add/remove
  addPhases() {
    this.isPrimeModal = false;
    if (this.lockstatus == false || this.lockstatus == undefined) {
      if (this.phases.length < 15) {
        this.showExitGate = false;
        this.closingGate = true;
        this.phases.push({
          phaseTitle: null,
          phaseNameColor: null,
          phase: {
            value: null,
            note: null,
            task: null,
            opportunity: null,
            decision: null,
          },
          purpose: null,
          purposeAttrs: {
            value: null,
            note: null,
            task: null,
            opportunity: null,
            decision: null,
          },
          phaseMeasures: [
            {
              rateValue: null,
              note: null,
              task: null,
              opportunity: null,
              decision: null,
              value: null,
              toolbarStatus: false,
            },
          ],
          initialTitle: null,
          gateColorValue: null,
          entryGate: {
            text: null,
            rating: {color: null, note: null, opportunity: null, decision: null, task: null},
          },
          reNameExitGate: this.reNameExitGate,
          startValue: this.startingGateRenameValue,
          gateModal: false,
          showModal: false,
          isStartingGate: false,
          phaseurposeFlag: false,
          phaseNameFlag: false,
          isDisabledDragDrop: false,
          isDisableDragDropForInnerWorksystem: false,
          workSteps: [
            {
              rateValue: null,
              note: null,
              task: null,
              opportunity: null,
              decision: null,
              value: null,
              toolbarStatus: false,
              isChildDragDropOn: false,
            },
          ],
          // phasesWorkTypeFields: [{rateValue:null, value: null, toolbarStatus: false, isChildDragDropOn: false}],
          // phaseName: [{colorVlaue: null, name: null,noteValue:null, Oppertunity:null}],
        });
        this.backendData();

        this.sendPhasesList.emit(this.phases);
      } else {
        this.showExitGate = true;
        this.closingGate = false;
        this.errorModalMessage = 'Only 15 Gates per Work System';
        this.isPrimeModal = true;
        this.messageType = 'Phases';
      }
    }
  }

  removePhases() {
    if (this.lockstatus == false || this.lockstatus == undefined) {
      this.selectedGateIndex = undefined;
      this.selectedPhaseIndex = undefined;
      if (this.thirdCardSelectedInput != undefined) {
        this.phases.splice(this.thirdCardSelectedInput, 1);
        this.backendData();

        this.thirdCardSelectedInput = undefined;
        this.sendPhasesList.emit(this.phases);
      } else {
        this.phases.pop();
        this.backendData();

        this.sendPhasesList.emit(this.phases);
      }
    }
  }

  dropPhases(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.phases, event.previousIndex, event.currentIndex);

    this.backendData();
    this.sendPhasesList.emit(this.phases);
  }

  //? phase purpose
  getPhasePurposeValues(item: PhaseItemI) {
    this.phases[item.index].purpose = item.title;
    console.log('Phases Updated Array:', this.phases);

    this.backendData();
    this.sendPhasesList.emit(this.phases);
  }
  //? purpose rating bar stats

  selectedIndexForPhasePurpose: number;
  phasePurposeSankBarStatus(values) {
    debugger
    this.sendHeaderSectionFlag.emit(false);
    this.sendPhaseListModalFlag.emit(true);
    const currentIndex = values.currentIndex;
    const status = values.status;
    if (this.phases)
      this.phases.forEach((item) => {
        if(item.phaseMeasures)
          item.phaseMeasures.forEach((phase) => {
            phase.toolbarStatus = false;
          });
        item.workSteps.forEach((phase) => {
          phase.toolbarStatus = false;
        });
        item.isStartingGate = false;
        item.phaseurposeFlag = false;
        item.phaseNameFlag = false;
      });
    this.phases[currentIndex].phaseurposeFlag = !status;
    this.phases[currentIndex].isDisabledDragDrop = true;

    // this.backendData();
    this.sendPhasesList.emit(this.phases);
  }
  //? phase measure
  addPhaseMesureList(event) {
  debugger
    this.phases[this.selectedPhaseIndex].phaseMeasures.push(event);

    this.backendData();
    this.sendPhasesList.emit(this.phases);
  }
  getRemovePhaseMesaureList(values) {
    if (values != -1) {
      this.phases[this.selectedPhaseIndex].measures.splice(values, 1);
      this.backendData();

      this.sendPhasesList.emit(this.phases);
    } else {
      this.phases[this.selectedPhaseIndex].measures.pop();
      this.backendData();

      this.sendPhasesList.emit(this.phases);
    }
  }
  savePhaseMeasure(value) {
    const inputvalue = value.inputValue;
    const childInx = value.cuurntIndx;
    const mainIndex = value.mainIdex;
    this.phases[mainIndex].measures[childInx].value = inputvalue;
    console.log('Phases Updated Array:', this.phases);

    this.backendData();
    this.sendPhasesList.emit(this.phases);
  }
  selectiveIndexForPhaseMeasure: number;
  getPhaseMeasureForSnakBar(measureIndexObj) {
    
    this.sendHeaderSectionFlag.emit(false);
    this.sendPhaseListModalFlag.emit(true);
    this.mainIndex = measureIndexObj.mainIndex;
    this.childIndex = measureIndexObj.childIndex;
    const snakBarStatus = measureIndexObj.toolbarStatus;
    this.phases[this.mainIndex].isDisabledDragDrop = true;
    this.phases.forEach((item) => {
      
      item.phaseMeasures.forEach((phase) => {
        phase.toolbarStatus = false;
      });
      item.workSteps.forEach((phase) => {
        phase.toolbarStatus = false;
      });
      item.isStartingGate = false;
      item.phaseurposeFlag = false;
      item.phaseNameFlag = false;
    });
    this.phases[this.mainIndex].phaseMeasures[this.childIndex].toolbarStatus =
      !snakBarStatus;

    // this.backendData();
    this.sendPhasesList.emit(this.phases);
  }
  //? phase name

  getPhaseTitleValues(item: PhaseItemI) {
    this.phases[item.index].phaseTitle = item.title;

    this.backendData();
    this.sendPhasesList.emit(this.phases);
  }

  getPhaseNameSnakbarStatus(values) {
    this.sendHeaderSectionFlag.emit(false);
    this.sendPhaseListModalFlag.emit(true);
    const currentIndex = values.currentIndex;
    const status = values.status;
    
    this.phases.forEach((item) => {
      if(item.phaseMeasures)
      item.phaseMeasures.forEach((phase) => {
        phase.toolbarStatus = false;
      });
      item.workSteps.forEach((phase) => {
        phase.toolbarStatus = false;
      });
      item.phaseurposeFlag = false;
      item.isStartingGate = false;
      item.phaseurposeFlag = false;
      item.phaseNameFlag = false;
    });
    this.phases[currentIndex].phaseNameFlag = !status;

    this.backendData();
    this.sendPhasesList.emit(this.phases);
  }

  //? steps of work
  getRemoveVlaueForWorkTypeList(values) {
    if (values != -1) {
      this.phases[this.selectedPhaseIndex].workSteps.splice(values, 1);
      this.backendData();

      this.sendPhasesList.emit(this.phases);
    } else {
      this.phases[this.selectedPhaseIndex].workSteps.pop();
      this.backendData();

      this.sendPhasesList.emit(this.phases);
    }
  }
  getStepsWorkSaveList(value) {
    const inputvalue = value.inputValue;
    const childInx = value.cuurntIndx;
    const mainIndex = value.mainIdex;
    this.phases[mainIndex].workSteps[childInx].value = inputvalue;
    this.backendData();
    this.sendPhasesList.emit(this.phases);
  }
  getWorkTypesSnakbarStatus(measureIndexObj) {
    debugger
    this.sendHeaderSectionFlag.emit(false);
    this.sendPhaseListModalFlag.emit(true);
    this.mainIndex = measureIndexObj.mainIndex;
    this.childIndex = measureIndexObj.childIndex;
    const snakBarStatus = measureIndexObj.toolbarStatus;
    this.phases[this.mainIndex].isDisabledDragDrop = true;
    this.phases[this.mainIndex].workSteps[this.childIndex].isChildDragDropOn = true; 
    // if(!this.phases) {
      debugger
      this.phases
    this.phases.forEach((item) => {
      item.workSteps.forEach((phase) => {
        phase.toolbarStatus = false;
      });
      if(item.phaseMeasure)
      item.phaseMeasures.forEach((measure) => {
        measure.toolbarStatus = false;
      });
      item.isStartingGate = false;
      item.phaseurposeFlag = false;
      item.phaseNameFlag = false;
    });
  
    this.phases[this.mainIndex].workSteps[this.childIndex].toolbarStatus =
      !snakBarStatus;

    this.backendData();
    this.sendPhasesList.emit(this.phases);
  }
  getWorkStepsofRating(colorValues) {
    debugger
    const color = colorValues.colorValues;
    this.phases[this.mainIndex].workSteps[this.childIndex].rateValue = color;
    this.phases[this.mainIndex].workSteps[this.childIndex].toolbarStatus =
      false;

    this.backendData();
    this.sendPhasesList.emit(this.phases);
  }
  // getWorkTypeRating(value) {
  //   this.phases[this.selectedPhaseIndex].workSteps[value.i].color = value.color;
  //    this.phases[this.selectedPhaseIndex].showModal = false
  // }
  addWorkTypesLsit(value) {
    this.phases[this.selectedPhaseIndex].workSteps.push(value);

    this.backendData();
    this.sendPhasesList.emit(this.phases);
  }
  RemoveElementFromArray(index: number) {
    this.thirdCardSelectedInput = index;
    this.bgColor = '#' + ((Math.random() * 0xf2f2f2) << 0).toString(16);
  }

  //? coomon methods
  // getdragDropStatus (values) {
  //   this.phases[this.mainIndex].workSteps[this.childIndex].isChildDragDropOn = true;
  //   this.phases[this.mainIndex].isDisabledDragDrop  = true;
  //   }
  getDisplayVlaueFlag(isEligible) {
    this.isPrimeModal = isEligible;
  }

  // getShowModal(value) {
  //   if (this.phaseListModalFlag == true) {
  //     if (this.phases[this.selectedPhaseIndex].showModal == false) {
  //       this.phases[this.selectedPhaseIndex].showModal = value;
  //       for (let i = 0; i < this.phases.length; i++) {
  //         if (i !== this.selectedPhaseIndex) {
  //           this.phases[i].showModal = false;
  //         }
  //       }
  //     } else if (this.phases[this.selectedPhaseIndex].showModal == true) {
  //       this.phases[this.selectedPhaseIndex].showModal = true;
  //       for (let i = 0; i < this.phases.length; i++) {
  //         if (i !== this.selectedPhaseIndex) {
  //           this.phases[i].showModal = false;
  //         }
  //       }
  //     }
  //   }
  // }

  // sendFirstGateName(firstGateValues) {
  //   const mainIndex = firstGateValues.index;
  //   const firstGate = firstGateValues.value
  //   this.phases[mainIndex].firstGateTitle = firstGate;
  // }
  sendFirstGateName(values) {
    // this.startGate = values
    this.phases.map((val) => {
      // val.startValue = this.startGate
      val.startValue = values;
    });

    this.backendData();
    this.sendPhasesList.emit(this.phases);
  }

  getchildItemIndex(val: any) {
    this.selectedPhaseIndex = val;
  }
  getchildGateIndex(val: any) {
    this.selectedGateIndex = val;
  }

  getExitVal(name) {
    this.reNameExitGate = name;
    this.phases.map((item) => {
      item.exitName = this.reNameExitGate;
    });

    this.backendData();
    this.sendPhasesList.emit(this.phases);
  }

  fetchNotesValue(event, index) {
    console.log('Notes Value at Phase List:', event, index);
    if (!this.phases[index].purposeAttrs)
      this.phases[index].purposeAttrs = { note: event };
    else
      this.phases[index].purposeAttrs.note = event;
    console.log('Updated Phases Array:', this.phases);
    this.backendData();
    this.sendPhasesList.emit(this.phases);
  }

  fetchOpportunityValue(event, index) {
    console.log('Opprtunity Value at Phase List:', event, index);
    if (!this.phases[index].purposeAttrs)
      this.phases[index].purposeAttrs = { opportunity: event };
    else
      this.phases[index].purposeAttrs.opportunity = event;
    console.log('Updated Phases Array:', this.phases);
    
    this.backendData();
    this.sendPhasesList.emit(this.phases);
  }

  fetchDecisionValue(event, index) {
    console.log('Decision Value at Phase List:', event, index);
    if (!this.phases[index].purposeAttrs)
      this.phases[index].purposeAttrs = { decision: event };
    else
      this.phases[index].purposeAttrs.decision = event;
    console.log('Updated Phases Array:', this.phases);

    
    this.backendData();
    this.sendPhasesList.emit(this.phases);
  }

  fetchTaskValue(event, index) {
    console.log('Task Value at Phase List:', event, index);
    if (!this.phases[index].purposeAttrs)
      this.phases[index].purposeAttrs = { task: event };
    else
      this.phases[index].purposeAttrs.task = event;
    console.log('Updated Phases Array:', this.phases);

    
    this.backendData();
    this.sendPhasesList.emit(this.phases);
  }

  fetchPhaseNameColor(event, index) {
    
    console.log('Phase Name Decision Value at Phase List:', event, index);
    this.phases[index].phase.color = event;
    console.log('Phases Updated Array:', this.phases);
    this.backendData();
    this.sendPhasesList.emit(this.phases);
  }

  //phase
  fetchPhaseNameDecision(event, index) {
    
    console.log('Phase Name Decision Value at Phase List:', event, index);
    this.phases[index].phase.decision = event;
    console.log('Phases Updated Array:', this.phases);
    this.backendData();
    this.sendPhasesList.emit(this.phases);
  }

  getPhaseNameRatingValue(values) {
    const index = values.mainIndex;
    const colorVal = values.color;
    this.phases[index].phase.color = colorVal;
    this.backendData();
    this.sendPhasesList.emit(this.phases);
  }

  fetchPhaseNameNote(event, index) {
    
    console.log('Phase Name Note Value at Phase List:', event, index);
    this.phases[index].phase.note = event;
    console.log('Phases Updated Array:', this.phases);

    this.backendData();
    this.sendPhasesList.emit(this.phases);
  }
  fetchPhaseNameOpportunity(event, index) {
    console.log('Phase Name Opportunity Value at Phase List:', event, index);
    this.phases[index].phase.opportunity = event;
    console.log('Phases Updated Array:', this.phases);

    this.backendData();
    this.sendPhasesList.emit(this.phases);
  }
  fetchPhaseNameTask(event, index) {
    console.log('Phase Name Task Value at Phase List:', event, index);
    this.phases[index].phase.task = event;
    console.log('Phases Updated Array:', this.phases);

    this.backendData();
    this.sendPhasesList.emit(this.phases);
  }

  // Phase Measures

  fetchPhaseMeasureNotesValue(event, index) {
    debugger
    this.phases[index].phaseMeasures[event.index].note = event.event;
    this.backendData();
    this.sendPhasesList.emit(this.phases);
  }

  // fetchPhaseMeasureNotesValue(event, index) {
  //   
  //   if(!this.phases[index].measures[event.index].note){
  //     this.phases[index].measures[event.index].note = { note: event}
  //   } else {
  //     this.phases[index].measures[event.index].note = event.event;
  //   }
  //   this.backendData();
  //   this.sendPhasesList.emit(this.phases);
  // }

  fetchPhaseMeasureOpportunityValue(event, index) {
 debugger
    this.phases[index].phaseMeasures[event.index].opportunity = event.event;
    this.backendData();
    this.sendPhasesList.emit(this.phases);
  }

  fetchPhaseMeasureTaskValue(event, index) {
   this.phases[index].phaseMeasures[event.index].task = event.event;
    this.backendData();
    this.sendPhasesList.emit(this.phases);
  }

  fetchPhaseMeasureDecisionValue(event, index) {
    this.phases[index].phaseMeasures[event.index].decision = event.event;
    this.backendData();
    this.sendPhasesList.emit(this.phases);
  }

  // Work Types

  fetchWorkTypesNotesValue(event, index) {
    this.phases[index].workSteps[event.index].note = event.event;
    this.backendData();
    this.sendPhasesList.emit(this.phases);
  }

  fetchWorkTypesOpportunityValue(event, index) {
    this.phases[index].workSteps[event.index].opportunity = event.event;
    this.backendData();
    this.sendPhasesList.emit(this.phases);
  }

  fetchWorkTypesTaskValue(event, index) {
    this.phases[index].workSteps[event.index].task = event.event;
    this.backendData();
    this.sendPhasesList.emit(this.phases);
  }

  fetchWorkTypesDecisionValue(event, index) {
    this.phases[index].workSteps[event.index].decision = event.event;
    this.backendData();
    this.sendPhasesList.emit(this.phases);
  }
}
