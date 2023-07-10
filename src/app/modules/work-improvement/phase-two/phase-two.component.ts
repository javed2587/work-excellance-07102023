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
  IWorkImprovementCurrentStates,
  WorkImprovementCurrentStates,
  WorkImprovementPlanDirectionStatement,
} from '../../../models/work-improvement/work-improvment';
import { PageDataManagementRailRaiting } from '../../../models/work-system/work-system-header';

@Component({
  selector: 'app-phase-two',
  templateUrl: './phase-two.component.html',
  styleUrls: ['./phase-two.component.css'],
})
export class PhaseTwoComponent implements OnInit, OnChanges {
  flagg = true;
  up = true;
  down = false;
  showModal = false;
  voiceCurrentState: Boolean = false;
  voicePlanDirection: Boolean = false;
  showSnakeBar: Boolean;
  selectiveIndex: number = -1;
  showMicForFirstCard: Boolean = false;
  showMicForPlanDirection: Boolean = false;
  firstCardShowModal: Boolean = false;
  planDirectionShowModal: Boolean = false;

  titleFirstCard = 'Current State (The Story)';
  titleSecondCard = 'Plan Direction Statement';
  firstCard: any[] = [];
  listOfPlanDirection: any[] = [];
  firstCardDictionery: any[] = [];
  secondtCard: any[] = [];
  secondCardDictionery: any[] = [];
  workImprovementCurrentStates: Array<WorkImprovementCurrentStates> = [];
  workImprovementPlanDirection: Array<WorkImprovementPlanDirectionStatement> =
    [];
  stateOpenedPhases: number = 0;
  planOpenedPhases: number = 0;

  @Output() sendPhaseTwoModalFlag = new EventEmitter();
  @Output() sendCurrentPhaseData: EventEmitter<
    Array<WorkImprovementCurrentStates>
  > = new EventEmitter<Array<WorkImprovementCurrentStates>>();
  @Output() sendPlanDirectionPhaseData: EventEmitter<
    Array<WorkImprovementPlanDirectionStatement>
  > = new EventEmitter<Array<WorkImprovementPlanDirectionStatement>>();
  @Input() phaseOneModalFlag;
  @Input() phaseTwoModalFlag;
  @Input() phaseThreeModalFlag;
  @Input() phaseFourModalFlag;
  @Input() phaseFiveModalFlag;
  @Input() lockstatus: Boolean = false;
  @Input() currentStates: Array<WorkImprovementCurrentStates>;
  @Input() planDirectionalStatement: Array<WorkImprovementPlanDirectionStatement>;

  constructor(private voiceToTextService: VoiceToTextServiceService) {
    this.voiceToTextService.init();
    voiceToTextService.text = '';
  }

  ngOnInit(): void {}

  currentStatesPopulated: Boolean = false;
  planDirectionalStatementPopulated: Boolean = false

  ngOnChanges(changes: SimpleChanges): void {
    for (const propName in changes) {
      if (propName == 'currentStates') {
        if (this.currentStates && !this.currentStatesPopulated) {
          this.currentStates.forEach((state) => {
            this.firstCard.push({
              color: state?.rating?.color,
              showModal: false,
              value: state?.text,
            });
            this.workImprovementCurrentStates.push(
              new WorkImprovementCurrentStates(
                state?.text,
                new PageDataManagementRailRaiting(
                  state?.rating?.color,
                  state?.rating?.note,
                  state?.rating?.opportunity,
                  {
                    id: null,
                    task: state?.rating?.task?.task,
                    owner: {
                      userId: state?.rating?.task?.owner?.userId,
                      name: state?.rating?.task?.owner?.name,
                    },
                    priority: state?.rating?.task?.priority,
                    notes: state?.rating?.task?.notes,
                    contributor: {
                      userId: state?.rating?.task?.contributor?.userId,
                      name: state?.rating?.task?.contributor?.name,
                    },
                    status: state?.rating?.task?.status,
                    dueDate: state?.rating?.task?.dueDate
                  },
                  {
                    summary: state?.rating?.decision?.summary,
                    owner: {
                      userId: state?.rating?.decision?.owner?.userId,
                      name: state?.rating?.decision?.owner?.name,
                    },
                    date: state?.rating?.decision?.date,
                  }
                ),
                state?.seqNumber
              )
            );
          });
          if(this.currentStates.length > 0){
            this.currentStatesPopulated = true
          }
          this.sendCurrentPhaseData.emit(this.workImprovementCurrentStates);
        }
      }
      else if (propName == 'planDirectionalStatement') {
        if (this.planDirectionalStatement && !this.planDirectionalStatementPopulated) {
          this.planDirectionalStatement.forEach((state) => {
            this.listOfPlanDirection.push({
              color: state?.rating?.color,
              showModal: false,
              value: state?.text,
            });
            this.workImprovementPlanDirection.push(
              new WorkImprovementPlanDirectionStatement(
                state?.text,
                new PageDataManagementRailRaiting(
                  state?.rating?.color,
                  state?.rating?.note,
                  state?.rating?.opportunity,
                  {
                    id: null,
                    task: state?.rating?.task?.task,
                    owner: {
                      userId: state?.rating?.task?.owner?.userId,
                      name: state?.rating?.task?.owner?.name,
                    },
                    priority: state?.rating?.task?.priority,
                    notes: state?.rating?.task?.notes,
                    contributor: {
                      userId: state?.rating?.task?.contributor?.userId,
                      name: state?.rating?.task?.contributor?.name,
                    },
                    status: state?.rating?.task?.status,
                    dueDate: state?.rating?.task?.dueDate
                  },
                  {
                    summary: state?.rating?.decision?.summary,
                    owner: {
                      userId: state?.rating?.decision?.owner?.userId,
                      name: state?.rating?.decision?.owner?.name,
                    },
                    date: state?.rating?.decision?.date,
                  }
                ),
                state?.seqNumber
              )
            );
          });
          if(this.planDirectionalStatement.length > 0){
            this.planDirectionalStatementPopulated = true
          }
          this.sendPlanDirectionPhaseData.emit(this.workImprovementPlanDirection);
        }
      }
    }
  }
  toggle() {
    this.flagg = !this.flagg;
    this.up = !this.up;
    this.down = !this.down;
  }
  addFieldsForFirstCard() {
    if (this.lockstatus == false || this.lockstatus == undefined) {
      this.firstCard.push({ color: '', showModal: false, value: '' });
      this.stateOpenedPhases++;
      this.workImprovementCurrentStates.push(
        new WorkImprovementCurrentStates(
          null,
          new PageDataManagementRailRaiting(
            null,
            null,
            null,
            {
              id: null,
              task: null,
              owner: { userId: null, name: null },
              priority: null,
              notes: null,
              contributor: { userId: null, name: null },
              status: null,
              dueDate: null
            },
            { summary: null, owner: { userId: null, name: null }, date: null }
          ),
          this.stateOpenedPhases.toString()
        )
      );
      this.sendCurrentPhaseData.emit(this.workImprovementCurrentStates);
    }
  }
  removeFiledsForFirstCard() {
    if (this.lockstatus == false || this.lockstatus == undefined) {
      if (this.selectiveIndex != -1) {
        this.firstCard.splice(this.selectiveIndex, 1);
        this.workImprovementCurrentStates.splice(this.selectiveIndex, 1);
        this.sendCurrentPhaseData.emit(this.workImprovementCurrentStates);
        this.selectiveIndex = -1;
      } else {
        this.firstCard.pop();
        this.workImprovementCurrentStates.pop();
        this.sendCurrentPhaseData.emit(this.workImprovementCurrentStates);
        this.stateOpenedPhases--;
        if (this.firstCard.length == 0) {
          this.showMicForFirstCard = false;
        }
      }
    }
  }

  fetchIndexForFirstCard(i: number) {
    this.selectiveIndex = i;
    this.showMicForFirstCard = true;
  }
  dropFirstCard(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.firstCard, event.previousIndex, event.currentIndex);
  }
  addRatingForFirstCard(i: number) {
    if (this.lockstatus == false || this.lockstatus == undefined) {
      this.sendPhaseTwoModalFlag.emit(true);
      if (
        this.phaseTwoModalFlag == true &&
        this.phaseFourModalFlag == false &&
        this.phaseFiveModalFlag == false &&
        this.phaseOneModalFlag == false &&
        this.phaseThreeModalFlag == false
      ) {
        if (this.firstCard[i].showModal == true) {
          this.firstCard[i].showModal = !this.firstCard[i].showModal;
          this.firstCardShowModal = false;
        } else {
          this.firstCard.map((card) => {
            card.showModal = false;
          });
          this.firstCard[i].showModal = true;
          this.firstCardShowModal = true;
          this.planDirectionShowModal = false;
          this.showSnakeBar = !this.showSnakeBar;
          this.selectiveIndex = i;
        }
      }
    }
  }
  setColorValueForFirstCard(val: any) {
    this.firstCard[this.selectiveIndex].showModal = false;
    this.firstCard[this.selectiveIndex].color = val;
    this.showSnakeBar = !this.showSnakeBar;
    this.workImprovementCurrentStates[this.selectiveIndex].rating.color = val;
    this.sendCurrentPhaseData.emit(this.workImprovementCurrentStates);
  }

  setNoteValue(note) {
    this.workImprovementCurrentStates[this.selectiveIndex].rating.note = note;
    this.sendCurrentPhaseData.emit(this.workImprovementCurrentStates);
  }
  setDecisionValueForState(decision) {
    this.workImprovementCurrentStates[this.selectiveIndex].rating.decision =
      decision;
    this.sendCurrentPhaseData.emit(this.workImprovementCurrentStates);
  }
  setOppertunityValueForState(opportunity) {
    this.workImprovementCurrentStates[this.selectiveIndex].rating.opportunity =
      opportunity;
    this.sendCurrentPhaseData.emit(this.workImprovementCurrentStates);
  }
  setTaskValueForState(task) {
    this.workImprovementCurrentStates[this.selectiveIndex].rating.task = task;
    this.sendCurrentPhaseData.emit(this.workImprovementCurrentStates);
  }

  addFieldsForPlanDirection() {
    if (this.lockstatus == false || this.lockstatus == undefined) {
      this.listOfPlanDirection.push({ color: '', showModal: false, value: '' });
      this.planOpenedPhases++;
      this.workImprovementPlanDirection.push(
        new WorkImprovementCurrentStates(
          null,
          new PageDataManagementRailRaiting(
            null,
            null,
            null,
            {
              id: null,
              task: null,
              owner: { userId: null, name: null },
              priority: null,
              notes: null,
              contributor: { userId: null, name: null },
              status: null,
              dueDate: null
            },
            { summary: null, owner: { userId: null, name: null }, date: null }
          ),
          this.planOpenedPhases.toString()
        )
      );
      this.sendPlanDirectionPhaseData.emit(this.workImprovementPlanDirection);
    }
  }
  removeFiledsForPlanDirection() {
    if (this.lockstatus == false || this.lockstatus == undefined) {
      if (this.selectiveIndex != -1) {
        this.listOfPlanDirection.splice(this.selectiveIndex, 1);
        this.workImprovementPlanDirection.splice(this.selectiveIndex, 1);
        this.sendPlanDirectionPhaseData.emit(this.workImprovementPlanDirection);
        this.selectiveIndex = -1;
      } else {
        this.listOfPlanDirection.pop();
        this.workImprovementPlanDirection.pop();
        this.sendPlanDirectionPhaseData.emit(this.workImprovementPlanDirection);
        this.planOpenedPhases--;
        if (this.listOfPlanDirection.length == 0) {
          this.showMicForPlanDirection = false;
        }
      }
    }
  }
  fetchIndexForPlanDirection(i: number) {
    this.selectiveIndex = i;
    this.showMicForPlanDirection = true;
  }
  dropPlanDirection(event: CdkDragDrop<string[]>) {
    moveItemInArray(
      this.listOfPlanDirection,
      event.previousIndex,
      event.currentIndex
    );
  }
  addRatingForPlanDirection(i: number) {
    if (this.lockstatus == false || this.lockstatus == undefined) {
      this.sendPhaseTwoModalFlag.emit(true);
      if (
        this.phaseTwoModalFlag == true &&
        this.phaseFourModalFlag == false &&
        this.phaseFiveModalFlag == false &&
        this.phaseOneModalFlag == false &&
        this.phaseThreeModalFlag == false
      ) {
        if (this.listOfPlanDirection[i].showModal == true) {
          this.listOfPlanDirection[i].showModal =
            !this.listOfPlanDirection[i].showModal;
          this.planDirectionShowModal = false;
        } else {
          this.listOfPlanDirection.map((card) => {
            card.showModal = false;
          });
          this.listOfPlanDirection[i].showModal = true;
          this.planDirectionShowModal = true;
          this.firstCardShowModal = false;
          this.showSnakeBar = !this.showSnakeBar;
          this.selectiveIndex = i;
        }
      }
    }
  }
  setColorValueForPlanDirection(val: any) {
    this.listOfPlanDirection[this.selectiveIndex].showModal = false;
    this.listOfPlanDirection[this.selectiveIndex].color = val;
    this.workImprovementPlanDirection[this.selectiveIndex].rating.color = val;
    this.sendPlanDirectionPhaseData.emit(this.workImprovementPlanDirection);
    this.showSnakeBar = !this.showSnakeBar;
  }
  setNoteValueForPlanDirection(note) {
    this.workImprovementPlanDirection[this.selectiveIndex].rating.note = note;
    this.sendPlanDirectionPhaseData.emit(this.workImprovementPlanDirection);
  }
  setDecisionValueForPlanDirection(decision) {
    this.workImprovementPlanDirection[this.selectiveIndex].rating.decision =
      decision;
    this.sendPlanDirectionPhaseData.emit(this.workImprovementPlanDirection);
  }
  setOppertunityValueForPlanDirection(opportunity) {
    this.workImprovementPlanDirection[this.selectiveIndex].rating.opportunity =
      opportunity;
    this.sendPlanDirectionPhaseData.emit(this.workImprovementPlanDirection);
  }
  setTaskValueForPlanDirection(task) {
    this.workImprovementPlanDirection[this.selectiveIndex].rating.task = task;
    this.sendPlanDirectionPhaseData.emit(this.workImprovementPlanDirection);
  }

  startService(event) {
    console.log('startService...' + event);
    if (event == 'firstCard') {
      if (this.voicePlanDirection == false) {
        this.voiceToTextService.start();
        this.voicePlanDirection = true;
        console.log('selected index is', this.selectiveIndex);
        window['listenInterval'] = setInterval(() => {
          this.firstCard[this.selectiveIndex].value =
            this.voiceToTextService.text;
          this.workImprovementCurrentStates[this.selectiveIndex].text =
            this.voiceToTextService.text;
          this.sendCurrentPhaseData.emit(this.workImprovementCurrentStates);
        }, 500);
      } else {
        this.firstCard[this.selectiveIndex].value =
          this.voiceToTextService.text;
        this.workImprovementCurrentStates[this.selectiveIndex].text =
          this.voiceToTextService.text;
        this.sendCurrentPhaseData.emit(this.workImprovementCurrentStates);
        clearInterval(window['listenInterval']);
        this.stopService();
      }
    } else {
      if (this.voiceCurrentState == false) {
        this.voiceToTextService.start();
        this.voiceCurrentState = true;
        console.log('selected index is', this.selectiveIndex);
        window['listenInterval'] = setInterval(() => {
          this.listOfPlanDirection[this.selectiveIndex].value =
            this.voiceToTextService.text;
          this.workImprovementPlanDirection[this.selectiveIndex].text =
            this.voiceToTextService.text;
          this.sendPlanDirectionPhaseData.emit(
            this.workImprovementPlanDirection
          );
        }, 500);
      } else {
        this.listOfPlanDirection[this.selectiveIndex].value =
          this.voiceToTextService.text;
        this.workImprovementPlanDirection[this.selectiveIndex].text =
          this.voiceToTextService.text;
        this.sendPlanDirectionPhaseData.emit(this.workImprovementPlanDirection);
        clearInterval(window['listenInterval']);
        this.stopService();
      }
    }
  }
  stopService() {
    this.voiceToTextService.stop();
    if (this.voicePlanDirection) {
      this.voicePlanDirection = false;
    }
    if (this.voiceCurrentState) {
      this.voiceCurrentState = false;
    }
  }
  saveStateValue(o, i) {
    this.workImprovementCurrentStates[i].text = o.value;
    this.sendCurrentPhaseData.emit(this.workImprovementCurrentStates);
  }
  savePlanValue(o, i) {
    this.workImprovementPlanDirection[i].text = o.value;
    this.sendPlanDirectionPhaseData.emit(this.workImprovementPlanDirection);
  }
}
