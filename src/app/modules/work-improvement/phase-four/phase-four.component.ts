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
import { VoiceToTextServiceService } from 'src/app/services/voice-to-text-service.service';
import {
  WorkImprovementPlanMeasures,
  WorkImprovementPlanOutcomes,
} from '../../../models/work-improvement/work-improvment';
import { PageDataManagementRailRaiting } from '../../../models/work-system/work-system-header';

@Component({
  selector: 'app-phase-four',
  templateUrl: './phase-four.component.html',
  styleUrls: ['./phase-four.component.css'],
})
export class PhaseFourComponent implements OnInit, OnChanges {
  firstCardtitle: string = 'Plan Outcomes';
  secondCardtitle: string = 'Plan Measures Name';

  // firstCard: any[] = []
  listOfPlanOutCome: any[] = [];
  listOfPlanMeasure: any[] = [];
  seconCard: any = [];
  thirdCard: any = [];
  outComeButtonsDictionery: any[] = [
    {
      color: { background: '#FFFF00' },
      active: false,
      button1: true,
      button2: false,
      disabled: false,
    },
    {
      color: { background: '#95F204' },
      active: true,
      button1: true,
      button2: false,
      disabled: false,
    },
  ];
  secondCarddictionery: any = [];
  // thirdCarddictionery: any[] = []
  showMicForPlanOutCome: Boolean = false;
  showMicForPlanMeasure: Boolean = false;

  fieldNumIndex: number = -1;
  selectiveIndex: number;
  condition: boolean = false;
  voicPlanMeasure: Boolean = false;
  voicOutCome: Boolean = false;
  showSnakeBar: Boolean;
  checkbox = true;
  showModal = false;
  flagg = true;
  up = true;
  down = false;

  checkBoxBlue = true;
  checkBoxgreen = false;

  edited = true;
  btnstate: boolean=false;

  planOutcomes: Array<WorkImprovementPlanOutcomes> = [];
  planMeasures: Array<WorkImprovementPlanMeasures> = [];

  openedOutcomePhases: number = 0;
  openedMeasurePhases: number = 0;

  outcomeShowModal: Boolean = false;
  planMeasureShowModal: Boolean = false;
  @Input() lockstatus: Boolean = false;
  @Output() sendPhaseFourModalFlag = new EventEmitter();
  @Input() phaseOneModalFlag;
  @Input() phaseTwoModalFlag;
  @Input() phaseThreeModalFlag;
  @Input() phaseFourModalFlag;
  @Input() phaseFiveModalFlag;
  @Output() sendPlanOutcomesPhaseData: EventEmitter<
    Array<WorkImprovementPlanOutcomes>
  > = new EventEmitter<Array<WorkImprovementPlanOutcomes>>();
  @Output() sendPlanMeasuresPhaseData: EventEmitter<
    Array<WorkImprovementPlanMeasures>
  > = new EventEmitter<Array<WorkImprovementPlanMeasures>>();

  @Input() planOutcomesPhaseData: Array<WorkImprovementPlanOutcomes>;
  @Input() PlanMeasuresPhaseData: Array<WorkImprovementPlanMeasures>;

  constructor(private voiceToTextService: VoiceToTextServiceService) {
    this.voiceToTextService.init();
    voiceToTextService.text = '';
  }

  ngOnInit(): void {
    /*-- ---------------card# 1 & 3 Dictionery------------------- */
    
    console.log(this.planOutcomesPhaseData)
    this.outComeButtonsDictionery = [
      {
        color: { background: '#FFFF00' },
        active: false,
        button1: true,
        button2: false,
        disabled: false,
      },
      {
        color: { background: '#95F204' },
        active: true,
        button1: true,
        button2: false,
        disabled: false,
      },
    ];
  }

  planOutcomesPhaseDataPopulated: Boolean = false;
  PlanMeasuresPhaseDataPopulated: Boolean = false;

  ngOnChanges(changes: SimpleChanges): void {
    for (const propName in changes) {
      if (propName == 'planOutcomesPhaseData') {
        if (
          this.planOutcomesPhaseData &&
          !this.planOutcomesPhaseDataPopulated
        ) {
          this.planOutcomesPhaseData.forEach((outcome) => {
            this.outComeButtonsDictionery.map((arr) => {
              console.log(arr);
              if (arr.active == true) {
                this.listOfPlanOutCome.push({
                  color: { background: arr.background },
                  active: arr.active,
                  button1: arr.button1,
                  button2: arr.button2,
                  disabled: arr.disabled,
                  value: outcome?.text,
                  btnstate: arr?.btnstate

                });
                this.planOutcomes.push(
                  new WorkImprovementPlanOutcomes(
                    outcome?.text,
                    new PageDataManagementRailRaiting(
                      outcome?.rating?.color,
                      outcome?.rating?.note,
                      outcome?.rating?.opportunity,
                      {
                        id: outcome?.rating?.task?.id,
                        contributor: {
                          userId: outcome?.rating?.task?.contributor?.userId,
                          name: outcome?.rating?.task?.contributor?.name,
                        },
                        task: outcome?.rating?.task?.task,
                        notes: outcome?.rating?.task?.notes,
                        owner: {
                          userId: outcome?.rating?.task?.owner?.userId,
                          name: outcome?.rating?.task?.owner?.name,
                        },
                        priority: outcome?.rating?.task?.priority,
                        status: outcome?.rating?.task?.status,
                        dueDate: outcome?.rating?.task?.dueDate
                      },
                      {
                        summary: outcome?.rating?.decision?.summary,
                        owner: {
                          userId: outcome?.rating?.decision?.owner?.userId,
                          name: outcome?.rating?.decision?.owner?.name,
                        },

                        date: outcome?.rating?.decision?.date,
                      }
                    ),
                    outcome?.seqNumber
                  )
                );
                arr.active = false;
              } else {
                arr.active = true;
              }
            });
          });
          if(this.planOutcomesPhaseData.length > 0 ) {
            
            this.planOutcomesPhaseDataPopulated = true;
          }
         
          this.sendPlanOutcomesPhaseData.emit(this.planOutcomes);
        }
      } else if (propName == 'PlanMeasuresPhaseData') {
        if (
          this.PlanMeasuresPhaseData &&
          !this.PlanMeasuresPhaseDataPopulated
        ) {
          this.PlanMeasuresPhaseData.forEach((state) => {
            this.listOfPlanMeasure.push({
              color: state?.rating?.color,
              showModal: false,
              value: state?.text,
              targetVal: state?.target,
              actualVal: state?.actual,
            });
            this.openedMeasurePhases++;
            this.planMeasures.push(
              new WorkImprovementPlanMeasures(
                state?.text,
                new PageDataManagementRailRaiting(
                  state?.rating?.color,
                  state?.rating?.note,
                  state?.rating?.opportunity,
                  {
                    id: state?.rating?.task?.id,
                    contributor: {
                      userId: state?.rating?.task?.contributor?.userId,
                      name: state?.rating?.task?.contributor?.name,
                    },
                    task: state?.rating?.task?.task,
                    notes: state?.rating?.task?.notes,
                    owner: {
                      userId: state?.rating?.task?.owner?.userId,
                      name: state?.rating?.task?.owner?.name,
                    },
                    priority: state?.rating?.task?.priority,
                    status: state?.rating?.task?.status,
                    dueDate: state?.rating?.task?.dueDate
                  },
                  {
                    date: state?.rating?.decision?.date,
                    owner: {
                      userId: state?.rating?.decision?.owner?.userId,
                      name: state?.rating?.decision?.owner?.name,
                    },
                    summary: state?.rating?.decision?.summary,
                  }
                ),
                state?.seqNumber,
                state?.target,
                state?.actual
              )
            );
          });
          if (this.PlanMeasuresPhaseData.length > 0) {
            this.PlanMeasuresPhaseDataPopulated = true;
          }
         
          this.sendPlanMeasuresPhaseData.emit(this.planMeasures);
        }
      }
    }
  }

  toggle() {
    this.flagg = !this.flagg;
    this.up = !this.up;
    this.down = !this.down;
  }

  addFiledForOutCome() {
    if (this.lockstatus == false || this.lockstatus == undefined) {
      // this.listOfPlanOutCome.push({ color: '', showModal: false, value: '' })
      this.outComeButtonsDictionery.map((arr) => {
        console.log(arr);
        if (arr.active == true) {
          
          this.listOfPlanOutCome.push({
            color: { background: arr.background },
            active: arr.active,
            button1: arr.button1,
            button2: arr.button2,
            disabled: arr.disabled,
            btnstate: arr?.btnstate
          });
          this.openedOutcomePhases++;
          this.planOutcomes.push(
            new WorkImprovementPlanOutcomes(
              null,
              new PageDataManagementRailRaiting(
                null,
                null,
                null,
                {
                  id: null,
                  contributor: { userId: null, name: null },
                  task: null,
                  notes: null,
                  owner: { userId: null, name: null },
                  priority: null,
                  status: null,
                  dueDate: null
                },
                {
                  date: null,
                  owner: { userId: null, name: null },
                  summary: null,
                }
              ),
              this.openedOutcomePhases.toString()
            )
          );
          
          this.sendPlanOutcomesPhaseData.emit(this.planOutcomes);
          arr.active = false;
        } else {
          arr.active = true;
        }
      });
    }
  }

  removeFieldForOutCome() {
    if (this.lockstatus == false || this.lockstatus == undefined) {
      if (this.selectiveIndex != -1) {
        this.listOfPlanOutCome.splice(this.selectiveIndex, 1);
        this.planOutcomes.splice(this.selectiveIndex, 1);
        this.sendPlanOutcomesPhaseData.emit(this.planOutcomes);
        this.selectiveIndex = -1;
      } else {
        this.listOfPlanOutCome.pop();
        this.planOutcomes.pop();
        this.sendPlanOutcomesPhaseData.emit(this.planOutcomes);
        this.openedOutcomePhases--;
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
  }

  fetchIndexforOutComeFields(i: number) {
    this.selectiveIndex = i;
    this.showMicForPlanOutCome = true;
  }

  addRatingForOutCome(i: number) {
    if (this.lockstatus == false || this.lockstatus == undefined) {
      this.sendPhaseFourModalFlag.emit(true);
      if (
        this.phaseFourModalFlag == true &&
        this.phaseTwoModalFlag == false &&
        this.phaseFiveModalFlag == false &&
        this.phaseOneModalFlag == false &&
        this.phaseThreeModalFlag == false
      ) {
        if (this.listOfPlanOutCome[i].showModal == true) {
          this.listOfPlanOutCome[i].showModal =
            !this.listOfPlanOutCome[i].showModal;
          this.outcomeShowModal = false;
        } else {
          this.listOfPlanOutCome.map((card) => {
            card.showModal = false;
          });
          this.listOfPlanOutCome[i].showModal = true;
          this.outcomeShowModal = true;
          this.planMeasureShowModal = false;
          this.showSnakeBar = !this.showSnakeBar;
          this.selectiveIndex = i;
        }
      }
    }
  }
  // setColorValueForPlanMeasure(val: any) {
  //   this.listOfPlanMeasure[this.selectiveIndex].showModal = false;
  //   this.listOfPlanMeasure[this.selectiveIndex].color = val;
  //   this.showSnakeBar = !this.showSnakeBar;
  //   this.planMeasures[this.selectiveIndex].rating.color = val;
  //   this.sendPlanMeasuresPhaseData.emit(this.planMeasures);
  // }
  setColorValueForOutCome(val: any) {

    this.listOfPlanOutCome[this.selectiveIndex].showModal = false;
    this.listOfPlanOutCome[this.selectiveIndex].color = val;
    this.showSnakeBar = !this.showSnakeBar;
    this.planOutcomes[this.selectiveIndex].rating.color = val;
    this.sendPlanOutcomesPhaseData.emit(this.planOutcomes);
  }

  getOutcomeTaskValue(task) {
    this.planOutcomes[this.selectiveIndex].rating.task = task;
    this.sendPlanOutcomesPhaseData.emit(this.planOutcomes);
  }

  getOutcomeOpportunity(opportunity) {
    this.planOutcomes[this.selectiveIndex].rating.opportunity = opportunity;
    this.sendPlanOutcomesPhaseData.emit(this.planOutcomes);
  }

  getOutcomeDecisionValue(decision) {
    
    this.planOutcomes[this.selectiveIndex].rating.decision = decision;
    this.sendPlanOutcomesPhaseData.emit(this.planOutcomes);
  }

  getPlanOutcomeValue(o, i) {
    this.planOutcomes[i].text = o.value;
    this.sendPlanOutcomesPhaseData.emit(this.planOutcomes);
  }

  getOutcomeNotesValue(notes) {
    this.planOutcomes[this.selectiveIndex].rating.note = notes;
    this.sendPlanOutcomesPhaseData.emit(this.planOutcomes);
  }

  getPlanMeasureValue(o, i) {
    this.planMeasures[i].text = o.value;
    this.sendPlanMeasuresPhaseData.emit(this.planMeasures);
  }
  getPlanMeasureTargetValue(o, i) {
    this.planMeasures[i].target = o.targetVal;
    this.sendPlanMeasuresPhaseData.emit(this.planMeasures);
  }
  getPlanMeasureActualValue(o, i) {
    this.planMeasures[i].actual = o.actualVal;
    this.sendPlanMeasuresPhaseData.emit(this.planMeasures);
  }
  addFiledForPlanMeasure() {
    if (this.lockstatus == false || this.lockstatus == undefined) {
      this.listOfPlanMeasure.push({
        color: '',
        showModal: false,
        value: '',
        targetVal: '',
        actualVal: '',
      });
      this.openedMeasurePhases++;
      this.planMeasures.push(
        new WorkImprovementPlanMeasures(
          null,
          new PageDataManagementRailRaiting(
            null,
            null,
            null,
            {
              id: null,
              contributor: { userId: null, name: null },
              task: null,
              notes: null,
              owner: { userId: null, name: null },
              priority: null,
              status: null,
              dueDate: null
            },
            { date: null, owner: { userId: null, name: null }, summary: null }
          ),
          this.openedMeasurePhases.toString(),
          null,
          null
        )
      );
      
      this.sendPlanMeasuresPhaseData.emit(this.planMeasures);
    }
  }

  removeFieldForPlanMeasure() {
    if (this.lockstatus == false || this.lockstatus == undefined) {
      if (this.selectiveIndex != -1) {
        this.listOfPlanMeasure.splice(this.selectiveIndex, 1);
        this.planMeasures.splice(this.selectiveIndex, 1);
        this.sendPlanMeasuresPhaseData.emit(this.planMeasures);
        this.selectiveIndex = -1;
      } else {
        this.listOfPlanMeasure.pop();
        this.planMeasures.pop();
        this.openedMeasurePhases--;
        this.sendPlanMeasuresPhaseData.emit(this.planMeasures);
        if (this.listOfPlanMeasure.length == 0) {
          this.showMicForPlanMeasure = false;
        }
      }
    }
  }

  dropPlanMeasureFileds(event: CdkDragDrop<string[]>) {
    moveItemInArray(
      this.listOfPlanMeasure,
      event.previousIndex,
      event.currentIndex
    );
  }

  fetchIndexforPlanMeasureFields(i: number) {
    this.selectiveIndex = i;
    this.showMicForPlanMeasure = true;
  }

  addRatingForPlanMeasure(i: number) {
    if (this.lockstatus == false || this.lockstatus == undefined) {
      this.sendPhaseFourModalFlag.emit(true);
      if (
        this.phaseFourModalFlag == true &&
        this.phaseTwoModalFlag == false &&
        this.phaseFiveModalFlag == false &&
        this.phaseOneModalFlag == false &&
        this.phaseThreeModalFlag == false
      ) {
        if (this.listOfPlanMeasure[i].showModal == true) {
          this.listOfPlanMeasure[i].showModal =
            !this.listOfPlanMeasure[i].showModal;
          this.planMeasureShowModal = false;
        } else {
          this.listOfPlanMeasure.map((card) => {
            card.showModal = false;
          });
          this.listOfPlanMeasure[i].showModal = true;
          this.planMeasureShowModal = true;
          this.outcomeShowModal = false;
          this.showSnakeBar = !this.showSnakeBar;
          this.selectiveIndex = i;
        }
      }
    }
  }

  setColorValueForPlanMeasure(val: any) {
    this.listOfPlanMeasure[this.selectiveIndex].showModal = false;
    this.listOfPlanMeasure[this.selectiveIndex].color = val;
    this.showSnakeBar = !this.showSnakeBar;
    this.planMeasures[this.selectiveIndex].rating.color = val;
    this.sendPlanMeasuresPhaseData.emit(this.planMeasures);
  }
  getNotesForPlanMeasure(notes) {
    this.planMeasures[this.selectiveIndex].rating.note = notes;
    this.sendPlanMeasuresPhaseData.emit(this.planMeasures);
  }
  getDecisionForPlanMeasure(decision) {
    
    this.planMeasures[this.selectiveIndex].rating.decision = decision;
    this.sendPlanMeasuresPhaseData.emit(this.planMeasures);
  }
  getOpportunityForPlanMeasure(opportunity) {
    this.planMeasures[this.selectiveIndex].rating.opportunity = opportunity;
    this.sendPlanMeasuresPhaseData.emit(this.planMeasures);
  }
  getTaskForPlanMeasure(task) {
    this.planMeasures[this.selectiveIndex].rating.task = task;
    this.sendPlanMeasuresPhaseData.emit(this.planMeasures);
    this.sendPlanMeasuresPhaseData.emit(this.planMeasures);
  }

  boxHide(fc: any) {
    console.log(fc);
    fc.button1 = false;
    fc.button2 = true;
  }

  startService(event) {
    console.log('startService...' + event);
    if (event == 'OutCome') {
      if (this.voicOutCome == false) {
        this.voiceToTextService.start();
        this.voicOutCome = true;
        console.log('selected index is', this.selectiveIndex);
        window['listenInterval'] = setInterval(() => {
          this.listOfPlanOutCome[this.selectiveIndex].value =
            this.voiceToTextService.text;
          this.planOutcomes[this.selectiveIndex].text =
            this.voiceToTextService.text;
          this.sendPlanOutcomesPhaseData.emit(this.planOutcomes);
        }, 500);
      } else {
        this.listOfPlanOutCome[this.selectiveIndex].value =
          this.voiceToTextService.text;
        this.planOutcomes[this.selectiveIndex].text =
          this.voiceToTextService.text;
        this.sendPlanOutcomesPhaseData.emit(this.planOutcomes);
        clearInterval(window['listenInterval']);
        this.stopService();
      }
    } else {
      if (this.voicPlanMeasure == false) {
        this.voiceToTextService.start();
        this.voicPlanMeasure = true;
        console.log('selected index is', this.selectiveIndex);
        window['listenInterval'] = setInterval(() => {
          this.listOfPlanMeasure[this.selectiveIndex].value =
            this.voiceToTextService.text;
          this.planMeasures[this.selectiveIndex].text =
            this.voiceToTextService.text;
          this.sendPlanMeasuresPhaseData.emit(this.planMeasures);
        }, 500);
      } else {
        this.listOfPlanMeasure[this.selectiveIndex].value =
          this.voiceToTextService.text;
        this.planMeasures[this.selectiveIndex].text =
          this.voiceToTextService.text;
        this.sendPlanMeasuresPhaseData.emit(this.planMeasures);
        clearInterval(window['listenInterval']);
        this.stopService();
      }
    }
  }

  stopService() {
    this.voiceToTextService.stop();
    if (this.voicOutCome) {
      this.voicOutCome = false;
    }
    if (this.voicPlanMeasure) {
      this.voicPlanMeasure = false;
    }
  }
  isDisabled: boolean = false
  disablefield() {
    this.isDisabled !=  this.isDisabled
  }



  disableFunc(){
    this.btnstate = true;
  }
}
