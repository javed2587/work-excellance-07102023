import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ConsoleLogger } from '@angular/compiler-cli/private/localize';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { RatingService } from 'src/app/services/rating.service';
import { VoiceToTextServiceService } from 'src/app/services/voice-to-text-service.service';
import {
  WorkImprovementContingencyPlanForBarriers,
  WorkImprovementCurrentStates,
  WorkImprovementPDCAStatement,
  WorkImprovementPotentialPlanBarriers,
} from '../../../models/work-improvement/work-improvment';
import { PageDataManagementRailRaiting } from '../../../models/work-system/work-system-header';

@Component({
  selector: 'app-phase-five',
  templateUrl: './phase-five.component.html',
  styleUrls: ['./phase-five.component.css'],
})
export class PhaseFiveComponent implements OnInit, OnChanges {
  flagg = true;
  up = true;
  down = false;
  selectiveIndex: number = -1;

  thirdCardSelectedInput: any = -1;
  thirdCardSelectdIndex: number;
  secondCardSelectdIndex: number;

  showMicForPotentialPlan: Boolean = false;
  showMicForContingencyPlan: Boolean = false;
  showMicForPDCA: Boolean = false;

  voicePotential: Boolean = false;
  voicContingency: Boolean = false;
  voicPDCA: Boolean = false;

  showModal: Boolean = false;
  modal: Boolean = false;
  showSnakeBar = false;
  rateColorforSpan: any;
  /*-- ---------------Phase-five------------------- */
  firstCardtitle: string = 'Potential Plan Barriers';
  secondCardtitle: string = 'Contingency Plan for Barriers';
  thirdCardtitle: string = 'PDCA Statements';

  fieldNumIndex: number = -1;
  listOfPotentialPlan: any[] = [];
  listOfContingencyPlan: any[] = [];
  listOfPDCA: any = [];
  potentialOpenedPhases: number = 0;
  contingencyOpenedPhases: number = 0;
  pdcaOpenedPhases: number = 0;
  potentialPlans: Array<WorkImprovementPotentialPlanBarriers> = [];
  pdca: Array<WorkImprovementPDCAStatement> = [];

  contingencyPlans: Array<WorkImprovementContingencyPlanForBarriers> = [];
  @Output() sendPotentialPlans: EventEmitter<
    Array<WorkImprovementPotentialPlanBarriers>
  > = new EventEmitter<Array<WorkImprovementPotentialPlanBarriers>>();
  @Output() sendContingencyPlans: EventEmitter<
    Array<WorkImprovementContingencyPlanForBarriers>
  > = new EventEmitter<Array<WorkImprovementContingencyPlanForBarriers>>();
  @Output() sendPDCAStatements: EventEmitter<
    Array<WorkImprovementPDCAStatement>
  > = new EventEmitter<Array<WorkImprovementPDCAStatement>>();

  @Input() lockstatus: Boolean = false;
  @Output() sendPhaseFiveModalFlag = new EventEmitter();
  @Input() phaseFiveModalFlag;
  @Input() phaseFourModalFlag;
  @Input() phaseTwoModalFlag;
  @Input() phaseOneModalFlag;
  @Input() phaseThreeModalFlag;
  potentialPlanShowModal: Boolean = false;
  contingencyPlanShowModal: Boolean = false;
  pdcaShowModal: Boolean = false;

  @Input() wiPotentialPlans: Array<WorkImprovementPotentialPlanBarriers>;
  @Input() wiContingencyPlans: Array<WorkImprovementContingencyPlanForBarriers>;
  @Input() wiPDCAStatements: Array<WorkImprovementPDCAStatement>;

  constructor(private voiceToTextService: VoiceToTextServiceService) {
    this.voiceToTextService.init();
    voiceToTextService.text = '';
  }

  ngOnInit(): void {}

  wiPotentialPlansPopulated: Boolean = false;
  wiContingencyPlansPopulated: Boolean = false;
  wiPDCAStatementsPopulated: Boolean = false;

  ngOnChanges(changes: SimpleChanges): void {
    for (const propName in changes) {
      if (propName == 'wiPotentialPlans') {
        if (this.wiPotentialPlans && !this.wiPotentialPlansPopulated) {
          this.wiPotentialPlans.forEach((plan) => {
            this.listOfPotentialPlan.push({
              color: plan?.rating?.color,
              showModal: false,
              value: plan?.text,
            });
            this.potentialPlans.push(
              new WorkImprovementPotentialPlanBarriers(
                plan?.text,
                new PageDataManagementRailRaiting(
                  plan?.rating?.color,
                  plan?.rating?.note,
                  plan?.rating?.opportunity,
                  {
                    id: plan?.rating?.task?.id,
                    priority: plan?.rating?.task?.priority,
                    task: plan?.rating?.task?.task,
                    owner: {
                      name: plan?.rating?.task?.owner?.name,
                      userId: plan?.rating?.task?.owner?.userId,
                    },
                    notes: plan?.rating?.task?.notes,
                    contributor: {
                      name: plan?.rating?.task?.contributor?.name,
                      userId: plan?.rating?.task?.contributor?.userId,
                    },
                    status: plan?.rating?.task?.status,
                    dueDate: plan?.rating?.task?.dueDate
                  },
                  {
                    summary: plan?.rating?.decision?.summary,
                    owner: {
                      name: plan?.rating?.decision?.owner?.name,
                      userId: plan?.rating?.decision?.owner?.userId,
                    },
                    date: plan?.rating?.decision?.date,
                  }
                ),
                plan?.seqNumber
              )
            );
          });
          if(this.wiPotentialPlans.length > 0) {
            this.wiPotentialPlansPopulated = true;
          }

          this.sendPotentialPlans.emit(this.potentialPlans);
        }
      } else if (propName == 'wiContingencyPlans') {
        
        if (this.wiContingencyPlans && !this.wiContingencyPlansPopulated) {
          this.wiContingencyPlans.forEach((cPlan) => {
            this.listOfContingencyPlan.push({
              color: cPlan?.rating?.color,
              showModal: false,
              value: cPlan?.text,
            });
            this.contingencyPlans.push(
              new WorkImprovementPotentialPlanBarriers(
                cPlan?.text,
                new PageDataManagementRailRaiting(
                  cPlan?.rating?.color,
                  cPlan?.rating?.note,
                  cPlan?.rating?.opportunity,
                  {
                    id: cPlan?.rating?.task?.id,
                    priority: cPlan?.rating?.task?.priority,
                    task: cPlan?.rating?.task?.task,
                    owner: {
                      name: cPlan?.rating?.task?.owner?.name,
                      userId: cPlan?.rating?.task?.owner?.userId,
                    },
                    notes: cPlan?.rating?.task?.notes,
                    contributor: {
                      name: cPlan?.rating?.task?.contributor?.name,
                      userId: cPlan?.rating?.task?.contributor?.userId,
                    },
                    status: cPlan?.rating?.task?.status,
                    dueDate: cPlan?.rating?.task?.dueDate
                  },
                  {
                    summary: cPlan?.rating?.decision?.summary,
                    owner: {
                      name: cPlan?.rating?.decision?.owner?.name,
                      userId: cPlan?.rating?.decision?.owner?.userId,
                    },
                    date: cPlan?.rating?.decision?.date,
                  }
                ),
                cPlan?.seqNumber
              )
            );
          });
          if(this.contingencyPlans.length > 0) {
            this.wiContingencyPlansPopulated = true;
          }
       
          this.sendContingencyPlans.emit(this.contingencyPlans);
        }
      } else if (propName == 'wiPDCAStatements') {
        if (this.wiPDCAStatements && !this.wiPDCAStatementsPopulated) {
          this.wiPDCAStatements.forEach((cPDCA) => {
            this.listOfPDCA.push({ color: cPDCA?.rating?.color, showModal: false, value: cPDCA?.text });
            this.pdca.push(
              new WorkImprovementPDCAStatement(
                cPDCA?.text,
                new PageDataManagementRailRaiting(
                  cPDCA?.rating?.color,
                  cPDCA?.rating?.note,
                  cPDCA?.rating?.opportunity,
                  {
                    id: cPDCA?.rating?.task?.id,
                    priority: cPDCA?.rating?.task?.priority,
                    task: cPDCA?.rating?.task?.task,
                    owner: { name: cPDCA?.rating?.task?.owner?.name, userId: cPDCA?.rating?.task?.owner?.userId },
                    notes: cPDCA?.rating?.task?.notes,
                    contributor: { name: cPDCA?.rating?.task?.contributor?.name, userId: cPDCA?.rating?.task?.contributor?.userId },
                    status: cPDCA?.rating?.task?.status,
                    dueDate: cPDCA?.rating?.task?.dueDate
                  },
                  {
                    summary: cPDCA?.rating?.decision?.summary,
                    owner: { name: cPDCA?.rating?.decision?.owner?.name, userId: cPDCA?.rating?.decision?.owner?.userId },
                    date: cPDCA?.rating?.decision?.date,
                  }
                ),
                cPDCA?.seqNumber
              )
            );
          });
          if(this.pdca.length > 0) {
            this.wiPDCAStatementsPopulated = true;
          }
       
          this.sendPDCAStatements.emit(this.pdca);
        }
      }
    }
  }

  toggle() {
    this.flagg = !this.flagg;
    this.up = !this.up;
    this.down = !this.down;
  }

  addFieldsForPotentialPlan() {
    if (this.lockstatus == false || this.lockstatus == undefined) {
      this.listOfPotentialPlan.push({ color: null, showModal: false, value: '' });
      this.potentialOpenedPhases++;
      this.potentialPlans.push(
        new WorkImprovementPotentialPlanBarriers(
          null,
          new PageDataManagementRailRaiting(
            null,
            null,
            null,
            {
              id: null,
              priority: null,
              task: null,
              owner: { name: null, userId: null },
              notes: null,
              contributor: { name: null, userId: null },
              status: null,
              dueDate: null
            },
            { summary: null, owner: { name: null, userId: null }, date: null }
          ),
          this.potentialOpenedPhases.toString()
        )
      );
      this.sendPotentialPlans.emit(this.potentialPlans);
    }
  }

  removeFiledsForPotentialPlan() {
    if (this.lockstatus == false || this.lockstatus == undefined) {
      if (this.selectiveIndex != -1) {
        this.listOfPotentialPlan.splice(this.selectiveIndex, 1);
        this.potentialPlans.splice(this.selectiveIndex, 1);
        this.sendPotentialPlans.emit(this.potentialPlans);
        this.selectiveIndex = -1;
      } else {
        this.listOfPotentialPlan.pop();
        this.potentialPlans.pop();
        this.sendPotentialPlans.emit(this.potentialPlans);
        this.potentialOpenedPhases--;
        if (this.listOfPotentialPlan.length == 0) {
          this.showMicForPotentialPlan = false;
        }
      }
    }
  }

  dropPotentialPlan(event: CdkDragDrop<string[]>) {
    moveItemInArray(
      this.listOfPotentialPlan,
      event.previousIndex,
      event.currentIndex
    );
    moveItemInArray(
      this.potentialPlans,
      event.previousIndex,
      event.currentIndex
    );
  }

  fetchIndexForPotentialPlan(i: number) {
    this.selectiveIndex = i;
    this.showMicForPotentialPlan = true;
  }

  addRatingForPotentialPlan(i: number) {
    if (this.lockstatus == false || this.lockstatus == undefined) {
      this.sendPhaseFiveModalFlag.emit(true);
      if (
        this.phaseFiveModalFlag == true &&
        this.phaseFourModalFlag == false &&
        this.phaseTwoModalFlag == false &&
        this.phaseOneModalFlag == false &&
        this.phaseThreeModalFlag == false
      ) {
        if (this.listOfPotentialPlan[i].showModal == true) {
          this.listOfPotentialPlan[i].showModal =
            !this.listOfPotentialPlan[i].showModal;
          this.potentialPlanShowModal = false;
        } else {
          this.listOfPotentialPlan.map((card) => {
            card.showModal = false;
          });
          this.listOfPotentialPlan[i].showModal = true;
          this.potentialPlanShowModal = true;
          this.contingencyPlanShowModal = false;
          this.pdcaShowModal = false;
          this.showSnakeBar = !this.showSnakeBar;
          this.selectiveIndex = i;
        }
      }
    }
  }

  setColorValueForPotentialPlan(val: any) {
    
    this.listOfPotentialPlan[this.selectiveIndex].showModal = false;
    this.listOfPotentialPlan[this.selectiveIndex].color = val;
    this.showSnakeBar = !this.showSnakeBar;
    this.potentialPlans[this.selectiveIndex].rating.color = val;
    this.sendPotentialPlans.emit(this.potentialPlans);
  }
  getTaskForPotentialPlan(task) {
    
    this.potentialPlans[this.selectiveIndex].rating.task = task;
    this.sendPotentialPlans.emit(this.potentialPlans);
  }
  getOpportunityForPotentialPlan(opportunity) {
    
    this.potentialPlans[this.selectiveIndex].rating.opportunity = opportunity;
    this.sendPotentialPlans.emit(this.potentialPlans);
  }
  getDecisionForPotentialPlan(decision) {
    this.potentialPlans[this.selectiveIndex].rating.decision = decision;
    this.sendPotentialPlans.emit(this.potentialPlans);
  }
  getNoteForPotentialPlan(note) {
    this.potentialPlans[this.selectiveIndex].rating.note = note;
    this.sendPotentialPlans.emit(this.potentialPlans);
  }
  getPotentialPlanValue(o, i) {
    this.potentialPlans[i].text = o.value;
    this.sendPotentialPlans.emit(this.potentialPlans);
  }




  setColorValueForContingencyPlan(val: any) {
    
    this.listOfContingencyPlan[this.selectiveIndex].showModal = false;
    this.listOfContingencyPlan[this.selectiveIndex].color = val;
    this.showSnakeBar = !this.showSnakeBar;
    this.contingencyPlans[this.selectiveIndex].rating.color = val;
    this.sendPotentialPlans.emit(this.potentialPlans);
  }
  getTaskForContingencyPlan(task) {
    this.contingencyPlans[this.selectiveIndex].rating.task = task;
    this.sendContingencyPlans.emit(this.contingencyPlans);
  }
  getOpportunityForContingencyPlan(opportunity) {
    this.contingencyPlans[this.selectiveIndex].rating.opportunity = opportunity;
    this.sendContingencyPlans.emit(this.contingencyPlans);
  }
  getDecisionForContingencyPlan(decision) {
    this.contingencyPlans[this.selectiveIndex].rating.decision = decision;
    this.sendContingencyPlans.emit(this.contingencyPlans);
  }
  getNoteForContingencyPlan(note) {
    this.contingencyPlans[this.selectiveIndex].rating.note = note;
    this.sendContingencyPlans.emit(this.contingencyPlans);
  }
  getContingencyPlanValue(o, i) {
    this.contingencyPlans[i].text = o.value;
    this.sendContingencyPlans.emit(this.contingencyPlans);
  }

  addFieldsForContingencyPlan() {
    if (this.lockstatus == false || this.lockstatus == undefined) {
      this.listOfContingencyPlan.push({
        color: '',
        showModal: false,
        value: '',
      });
      this.contingencyOpenedPhases++;
      this.contingencyPlans.push(
        new WorkImprovementPotentialPlanBarriers(
          null,
          new PageDataManagementRailRaiting(
            null,
            null,
            null,
            {
              id: null,
              priority: null,
              task: null,
              owner: { name: null, userId: null },
              notes: null,
              contributor: { name: null, userId: null },
              status: null,
              dueDate: null
            },
            { summary: null, owner: { name: null, userId: null }, date: null }
          ),
          this.contingencyOpenedPhases.toString()
        )
      );
      this.sendContingencyPlans.emit(this.contingencyPlans);
    }
  }

  removeFiledsForContingencyPlan() {
    if (this.lockstatus == false || this.lockstatus == undefined) {
      if (this.selectiveIndex != -1) {
        this.listOfContingencyPlan.splice(this.selectiveIndex, 1);
        this.contingencyPlans.splice(this.selectiveIndex, 1);
        this.sendContingencyPlans.emit(this.contingencyPlans);
        this.selectiveIndex = -1;
      } else {
        this.listOfContingencyPlan.pop();
        this.contingencyPlans.pop();
        this.sendContingencyPlans.emit(this.contingencyPlans);
        this.contingencyOpenedPhases++;
        if (this.listOfContingencyPlan.length == 0) {
          this.showMicForContingencyPlan = false;
        }
      }
    }
  }

  dropContingencyPlan(event: CdkDragDrop<string[]>) {
    moveItemInArray(
      this.listOfContingencyPlan,
      event.previousIndex,
      event.currentIndex
    );
    moveItemInArray(
      this.contingencyPlans,
      event.previousIndex,
      event.currentIndex
    );
  }

  fetchIndexForContingencyPlan(i: number) {
    this.selectiveIndex = i;
    this.showMicForContingencyPlan = true;
  }

  addRatingForContingencyPlan(i: number) {
    if (this.lockstatus == false || this.lockstatus == undefined) {
      this.sendPhaseFiveModalFlag.emit(true);
      if (
        this.phaseFiveModalFlag == true &&
        this.phaseFourModalFlag == false &&
        this.phaseTwoModalFlag == false &&
        this.phaseOneModalFlag == false &&
        this.phaseThreeModalFlag == false
      ) {
        if (this.listOfContingencyPlan[i].showModal == true) {
          this.listOfContingencyPlan[i].showModal =
            !this.listOfContingencyPlan[i].showModal;
          this.contingencyPlanShowModal = false;
        } else {
          this.listOfContingencyPlan.map((card) => {
            card.showModal = false;
          });
          this.listOfContingencyPlan[i].showModal = true;
          this.contingencyPlanShowModal = true;
          this.pdcaShowModal = false;
          this.potentialPlanShowModal = false;
          this.showSnakeBar = !this.showSnakeBar;
          this.selectiveIndex = i;
        }
      }
    }
  }

  addFieldsForPDCA() {
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
              priority: null,
              task: null,
              owner: { name: null, userId: null },
              notes: null,
              contributor: { name: null, userId: null },
              status: null,
              dueDate: null
            },
            { summary: null, owner: { name: null, userId: null }, date: null }
          ),
          this.pdcaOpenedPhases.toString()
        )
      );
      this.sendPDCAStatements.emit(this.pdca);
    }
  }

  removeFiledsForPDCA() {
    if (this.lockstatus == false || this.lockstatus == undefined) {
      if (this.selectiveIndex != -1) {
        this.listOfPDCA.splice(this.selectiveIndex, 1);
        this.pdca.splice(this.selectiveIndex, 1);
        this.sendPDCAStatements.emit(this.contingencyPlans);
        this.selectiveIndex = -1;
      } else {
        this.listOfPDCA.pop();
        this.pdca.pop();
        this.sendPDCAStatements.emit(this.potentialPlans);
        this.pdcaOpenedPhases--;
        if (this.listOfPDCA.length == 0) {
          this.showMicForPDCA = false;
        }
      }
    }
  }

  dropForPDCA(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.listOfPDCA, event.previousIndex, event.currentIndex);
    moveItemInArray(
      this.pdca,
      event.previousIndex,
      event.currentIndex
    );
  }

  fetchIndexForForPDCA(i: number) {
    this.selectiveIndex = i;
    this.showMicForPDCA = true;
  }

  addRatingForPDCA(i: number) {
    if (this.lockstatus == false || this.lockstatus == undefined) {
      this.sendPhaseFiveModalFlag.emit(true);
      if (
        this.phaseFiveModalFlag == true &&
        this.phaseFourModalFlag == false &&
        this.phaseTwoModalFlag == false &&
        this.phaseOneModalFlag == false &&
        this.phaseThreeModalFlag == false
      ) {
        if (this.listOfPDCA[i].showModal == true) {
          this.listOfPDCA[i].showModal = !this.listOfPDCA[i].showModal;
          this.pdcaShowModal = false;
        } else {
          this.listOfPDCA.map((card) => {
            card.showModal = false;
          });
          this.listOfPDCA[i].showModal = true;
          this.pdcaShowModal = true;
          this.potentialPlanShowModal = false;
          this.contingencyPlanShowModal = false;
          this.showSnakeBar = !this.showSnakeBar;
          this.selectiveIndex = i;
        }
      }
    }
  }

  setColorValueForForPDCA(val: any) {
    this.listOfPDCA[this.selectiveIndex].showModal = false;
    this.listOfPDCA[this.selectiveIndex].color = val;
    this.showSnakeBar = !this.showSnakeBar;
    this.pdca[this.selectiveIndex].rating.color = val;
  }
  getNoteForPDCAStatement(note) {
    this.pdca[this.selectiveIndex].rating.note = note;
    this.sendPDCAStatements.emit(this.pdca);
  }
  getOpportunityForPDCAStatement(opportunity) {
    this.pdca[this.selectiveIndex].rating.opportunity = opportunity;
    this.sendPDCAStatements.emit(this.pdca);
  }
  getTaskForPDCAStatement(task) {
    this.pdca[this.selectiveIndex].rating.task = task;
    this.sendPDCAStatements.emit(this.pdca);
  }
  getDecisionForPDCAStatement(decision) {
    this.pdca[this.selectiveIndex].rating.decision = decision;
    this.sendPDCAStatements.emit(this.pdca);
  }

  getPDCAStatementValue(o, i) {
    this.pdca[i].text = o.value;
    this.sendPDCAStatements.emit(this.pdca);
  }

  startService(event) {
    console.log('startService...' + event);
    if (event == 'PotentialPlan') {
      if (this.voicePotential == false) {
        this.voiceToTextService.start();
        this.voicePotential = true;
        console.log('selected index is', this.selectiveIndex);
        window['listenInterval'] = setInterval(() => {
          this.listOfPotentialPlan[this.selectiveIndex].value =
            this.voiceToTextService.text;
          this.potentialPlans[this.selectiveIndex].text =
            this.voiceToTextService.text;
          this.sendPotentialPlans.emit(this.potentialPlans);
        }, 500);
      } else {
        this.listOfPotentialPlan[this.selectiveIndex].value =
          this.voiceToTextService.text;
        this.potentialPlans[this.selectiveIndex].text =
          this.voiceToTextService.text;
        this.sendPotentialPlans.emit(this.potentialPlans);
        clearInterval(window['listenInterval']);
        this.stopService();
      }
    } else if (event == 'ContingencyPlan') {
      if (this.voicContingency == false) {
        this.voiceToTextService.start();
        this.voicContingency = true;
        console.log('selected index is', this.selectiveIndex);
        window['listenInterval'] = setInterval(() => {
          this.listOfContingencyPlan[this.selectiveIndex].value =
            this.voiceToTextService.text;
          this.contingencyPlans[this.selectiveIndex].text =
            this.voiceToTextService.text;
          this.sendContingencyPlans.emit(this.contingencyPlans);
        }, 500);
      } else {
        this.listOfContingencyPlan[this.selectiveIndex].value =
          this.voiceToTextService.text;
        this.contingencyPlans[this.selectiveIndex].text =
          this.voiceToTextService.text;
        this.sendContingencyPlans.emit(this.contingencyPlans);
        clearInterval(window['listenInterval']);
        this.stopService();
      }
    } else {
      if (this.voicPDCA == false) {
        this.voiceToTextService.start();
        this.voicPDCA = true;
        console.log('selected index is', this.selectiveIndex);
        window['listenInterval'] = setInterval(() => {
          this.listOfPDCA[this.selectiveIndex].value =
            this.voiceToTextService.text;
          this.pdca[this.selectiveIndex].text =
            this.voiceToTextService.text;
          this.sendPDCAStatements.emit(this.pdca);
        }, 500);
      } else {
        this.listOfPDCA[this.selectiveIndex].value =
          this.voiceToTextService.text;
        this.pdca[this.selectiveIndex].text =
          this.voiceToTextService.text;
        this.sendPDCAStatements.emit(this.pdca);
        clearInterval(window['listenInterval']);
        this.stopService();
      }
    }
  }

  stopService() {
    if (this.voicePotential) {
      this.voicePotential = false;
    } else if (this.voicContingency) {
      this.voicContingency = false;
    } else {
      this.voicPDCA = false;
    }
    this.voiceToTextService.stop();
  }
}
