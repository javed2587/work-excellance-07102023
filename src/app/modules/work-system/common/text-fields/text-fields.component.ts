import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { VoiceToTextServiceService } from 'src/app/services/voice-to-text-service.service';
// import { PhaseMeasures } from '../../../../models/phase-measures'
import tooltips from '../../../../../assets/data/tooltips.json';
import { PageBody } from 'src/app/models/work-system/work-system-body';
// import { outputAst } from '@angular/compiler';
// import { MianPageImprovementComponent } from 'src/app/modules/work-improvement/mian-page-improvement/mian-page-improvement.component';
// import { main } from '@popperjs/core';
@Component({
  selector: 'app-text-fields',
  templateUrl: './text-fields.component.html',
  styleUrls: ['./text-fields.component.css'],
})
export class TextFieldsComponent implements OnInit, OnChanges {
  showMic = false;
  showSnakeBar: boolean;
  selectiveFieldIndex: number = -1;
  isVoiceservice: boolean = false;
  isPrimeModal: boolean = false;
  msgTypeOfModal: string;
  addMessageForAlertModal: string;
  tooltipsJSON: any = tooltips.tooltipsworksystem;

  @Input() mainIndex;
  @Input() phases;
  @Input() phasesPage: PageBody
  @Input() indexPlusOne;
  @Input() phaseListModalFlag;
  @Input() headerSectionModalFlag;
  @Input() lockstatus: Boolean = false;

  @Output() sendphasePurposeValue = new EventEmitter<string>();
  @Output() sendPhasePurposeStatusOfSankbar = new EventEmitter();

  @Output() pushPhaseMeasureForSnakBarStatus = new EventEmitter();
  @Output() pushSavePhaseMeasures = new EventEmitter<any>();
  @Output() addNewPhaseMeasureList = new EventEmitter();
  @Output() removePhaseMesaureList = new EventEmitter();

  @Output() sendphaseName = new EventEmitter<string>();
  @Output() sendRatingForPhaseNameColor: EventEmitter<any> = new EventEmitter<any>();
  @Output() pushPhaseNameSankbarStatus = new EventEmitter();

  @Output() setStepsWorkSnakBarStaus = new EventEmitter();
  @Output() pushWorkTypeForSaveData = new EventEmitter();
  @Output() sendAddNewWorkTypes = new EventEmitter();
  @Output() removeVlaueForWorkTypeList = new EventEmitter();
  @Output() sendStepsOfWorkRating = new EventEmitter();

  @Output() sendNotesValue = new EventEmitter();
  @Output() sendOpportunityValue = new EventEmitter();
  @Output() sendTaskValue = new EventEmitter();
  @Output() sendDecisionValue = new EventEmitter();

  @Output() sendPhaseMeasureNotesValue = new EventEmitter();
  @Output() sendPhaseMeasureOpportunityValue = new EventEmitter();
  @Output() sendPhaseMeasureTaskValue = new EventEmitter();
  @Output() sendPhaseMeasureDecisionValue = new EventEmitter();

  @Output() sendPhaseNameNote = new EventEmitter();
  @Output() sendPhaseNameOpportunity = new EventEmitter();
  @Output() sendPhaseNameTask = new EventEmitter();
  @Output() sendPhaseNameDecision = new EventEmitter();

  @Output() sendWorkTypesNotesValue = new EventEmitter();
  @Output() sendWorkTypesOpportunityValue = new EventEmitter();
  @Output() sendWorkTypesTaskValue = new EventEmitter();
  @Output() sendWorkTypesDecisionValue = new EventEmitter();

  //  @Input() data: any;
  // @Input() indxVal: any;
  // @Input() showModal: Boolean;
  // @Input() phaseTitle: string;// No
  // @Input() phasePurpose: string;
  // @Input() phaseMeasuresData: any;
  // @Input() workTypesData: any;
  // @Input() workMeasureData : any;
  // @Input() itemIndex;
  // @Input() snackbarStatus
  // @Input() phaseItemModalFlag: Boolean = false;
  // @Output() sendPhaseListModalFlag = new EventEmitter();
  // @Output() sendWorkTypes = new EventEmitter<any>();
  // @Output() sendPhaseItemModalFlag = new EventEmitter();
  // @Output() sendPhaseItemIndex = new EventEmitter();
  // @Output() sendPhaseMeasuresFields = new EventEmitter();
  // @Output() sendShowModal = new EventEmitter();
  // @Output() sendColorforStepsOfWork = new EventEmitter();
  // @Input() exitsnakbar = true
  // @Output()setPhasWorkTypesValues = new EventEmitter();
  // @Output() sendValueForPhaseName = new EventEmitter();//no
  // @Output() setPhaseMeasureIndex = new EventEmitter();//no
  // @Output() colorValueforPhase = new EventEmitter();
  // @Output() setColorForStepOfWorks = new EventEmitter(); // noi
  // @Output() sendDragDropFlag = new EventEmitter();
  @Output() sendDragDropStatus = new EventEmitter();
  // phaseName:string =null
  // selectiveIndex = -1;
  // index: number = 0;
  // index2: number = 1;
  // fieldNumIndex: number = -1;
  // subIndex: any;
  // showModal2: boolean = false;
  // modal: boolean = false;
  // alertFlag: boolean = false;
  // modalFlag: boolean = false;
  // toolbarStatus: boolean = false;
  // toolbatrStatus: boolean = false;
  // rating:boolean = true;
  // phaseMeasure: string = null;
  // snackBarStats: boolean = false;
  // test: string = null;
  // messageType: string;
  // addMessage: string;
  // snackBarStatus:boolean = false;
  // itemsFields: any[];
  // isDisabled : boolean
  // secondCarddictionery: any = [];
  // phasesWorkType: any = [];
  // sec: any = [];
  // cardIndex: number[] = [1.0, 2.0, 3.0, 4.0, 5.0];
  // cardNumber: number[] = [];
  // phaseMeasuresinputFileds: any[] = [];
  // phaseMeasuresList: Array<PhaseMeasures> = [];
  // backgroudColor :string =null
  // backGroundColor: string = null

  constructor(public _voiceToTextService: VoiceToTextServiceService) {}

  ngOnInit(): void {
    
    console.log("phases", this.phases)
    // if(this.workMeasureData.length> 0) {
    //   this.phaseMeasuresinputFileds = this.workMeasureData;
    // }
    // if (this.workTypesData.length > 0) {
    //   this.phasesWorkType = this.workTypesData;
    // }
    // if (this.phaseMeasuresData.length > 0) {
    //   this.phaseMeasuresinputFileds = this.phaseMeasuresData;
    // }
  }
  ngOnChanges(changes: SimpleChanges): void {
    
  }
  fetchIndex(i: number) {
    this.selectiveFieldIndex = i;
    this.showMic = true;
  }

  fetchNotesValue(event) {
    console.log('Notes Value at text fields:', event);
    this.sendNotesValue.emit(event);
  }

  fetchOpportunityValue(event) {
    console.log('Opportunity Value at text fields:', event);
    this.sendOpportunityValue.emit(event);
  }

  fetchDecisionValue(event) {
    console.log('Decision Value at text fields:', event);
    this.sendDecisionValue.emit(event);
  }

  fetchTaskValue(event) {
    console.log('Task Value at text fields:', event);
    this.sendTaskValue.emit(event);
  }

  // Phase Measure Data

  fetchPhaseMeasureNotesValue(event, index) {
    debugger
    console.log('Phase Measure Notes:', event, index);
    this.sendPhaseMeasureNotesValue.emit({ event, index });
  }

  fetchPhaseMeasureOpportunityValue(event, index) {
    console.log('Phase Measure Opportunity:', event, index);
    this.sendPhaseMeasureOpportunityValue.emit({ event, index });
  }

  fetchPhaseMeasureTaskValue(event, index) {
    console.log('Phase Measure Task:', event, index);
    this.sendPhaseMeasureTaskValue.emit({ event, index });
  }

  fetchPhaseMeasureDecisionValue(event, index) {
    console.log('Phase Measure Decision:', event, index);
    this.sendPhaseMeasureDecisionValue.emit({ event, index });
  }

  // Phase Name Data
  fetchPhaseNameNotes(event) {
    this.sendPhaseNameNote.emit(event);
    console.log('Phase Name Note:', event);
  }

  fetchPhaseNameOpportunity(event) {
    this.sendPhaseNameOpportunity.emit(event);
    console.log('Phase Name Opportunity:', event);
  }

  fetchPhaseNameTask(event) {
    this.sendPhaseNameTask.emit(event);
    console.log('Phase Name Task:', event);
  }

  fetchPhaseNameDecision(event) {
    
    this.sendPhaseNameDecision.emit(event);
    console.log('Phase Name Decision:', event);
  }

  // Work Types Data
  fetchWorkStepsNotesValue(event, index) {
    debugger
    this.sendWorkTypesNotesValue.emit({ event, index });
    console.log('Work Types Notes Value at Text Fields:', event);
  }

  fetchWorkStepsOpportunityValue(event, index) {
    this.sendWorkTypesOpportunityValue.emit({ event, index });
    console.log('Work Types Opportunity Value at Text Fields:', event);
  }

  fetchWorkStepsTaskValue(event, index) {
    this.sendWorkTypesTaskValue.emit({ event, index });
    console.log('Work Types Task Value at Text Fields:', event);
  }

  fetchWorkStepsDecisionValue(event, index) {
    this.sendWorkTypesDecisionValue.emit({ event, index });
    console.log('Work Types decision Value at Text Fields:', event);
  }

  //? pop modal
  getIsvalueSubmitForPrimeAlert(isEligible) {
    this.isPrimeModal = isEligible;
  }
  //? mic
  startService() {
    if (this.lockstatus == false || this.lockstatus == undefined) {
      if (this.isVoiceservice == false) {
        this._voiceToTextService.start();
        this.isVoiceservice = true;
        window['listenInterval'] = setInterval(() => {
          // this.phasesWorkType[this.selectiveFieldIndex].value =
          //   this._voiceToTextService.text;
        }, 500);
      } else {
        // this.phasesWorkType[this.selectiveFieldIndex].value =
        //   this._voiceToTextService.text;
        clearInterval(window['listenInterval']);
        this.stopService();
      }
    }
  }
  stopService() {
    if (this.isVoiceservice) {
      this._voiceToTextService.stop();
      this.isVoiceservice = false;
    }
  }
  // ? phase purpose
  sendPhasePurposeSnakbarStatus(currentIndex, status) {
    this.sendPhasePurposeStatusOfSankbar.emit({
      currentIndex: currentIndex,
      status: status,
    });
  }
  savePhasePurpose(value) {
    this.sendphasePurposeValue.emit(value);
  }
  //? Page measure
  addPhaseMeasures() {
    debugger
    if (this.lockstatus == false || this.lockstatus == undefined) {
 
      if (this.phases[this.mainIndex].phaseMeasures.length < 8) {
        this.addNewPhaseMeasureList.emit({
          rateValue: null,
          value: null,
          toolbarStatus: false,
        });
        this.isPrimeModal = false;
      } else {
        this.isPrimeModal = true;
        this.msgTypeOfModal = 'Phase Measure';
        this.addMessageForAlertModal =
          'We recommend 8 or less Steps of Phase Measure';
      }
    }
  }
  removePhaseMeasures() {
    if (this.lockstatus == false || this.lockstatus == undefined) {
      this.selectiveFieldIndex != -1
        ? (this.removePhaseMesaureList.emit(this.selectiveFieldIndex),
          (this.selectiveFieldIndex = -1))
        : this.removePhaseMesaureList.emit(this.selectiveFieldIndex);
    }
  }
  savePhaseMeasures(val, curentIndex) {
    this.pushSavePhaseMeasures.emit({
      inputValue: val,
      cuurntIndx: curentIndex,
      mainIdex: this.mainIndex,
    });
  }
  getPhaseMeasureForSnakeBarStatus(mainIndex, childindex, status) {
    ;
    this.pushPhaseMeasureForSnakBarStatus.emit({
      mainIndex: mainIndex,
      childIndex: childindex,
      toolbarStatus: status,
    });
  }
  //? phase name
  setPhaseNameRating(colorValue) {
    
    this.sendRatingForPhaseNameColor.emit({
      mainIndex: this.mainIndex,
      color: colorValue,
    });
  }
  savePageName(newVal) {
    this.sendphaseName.emit(newVal);
  }
  openPhaseNameSnackBarStatus(currentIndex, status) {
    this.pushPhaseNameSankbarStatus.emit({
      currentIndex: currentIndex,
      status: status,
    });
  }
  //? steps of work
  addFieldsPhasesWorkType() {
    this.isPrimeModal = false;
    if (this.lockstatus == false || this.lockstatus == undefined) {
      if (this.phases[this.mainIndex].workSteps.length < 20) {
        this.sendAddNewWorkTypes.emit({
          color: null,
          showModal: false,
          value: null,
        });
      } else {
        this.addMessageForAlertModal = 'We recommend 20 or less Steps of Work';
        this.isPrimeModal = true;
        this.msgTypeOfModal = 'Steps of Work';
      }
    }
  }
  removeFieldPhasesWorkType() {
    if (this.lockstatus == false || this.lockstatus == undefined) {
      this.selectiveFieldIndex != -1
        ? (this.removeVlaueForWorkTypeList.emit(this.selectiveFieldIndex),
          (this.selectiveFieldIndex = -1))
        : this.removeVlaueForWorkTypeList.emit(this.selectiveFieldIndex);
    }
  }
  sendStepsWorkRating(colorValues) {
    debugger
    this.sendStepsOfWorkRating.emit({ colorValues: colorValues });
  }
  saveWorkTypes(val, currentIndex) {
    this.pushWorkTypeForSaveData.emit({
      inputValue: val,
      cuurntIndx: currentIndex,
      mainIdex: this.mainIndex,
    });
  }
  sendStepsWorkSnakbarStatus(mainIndex, childindex, status) {
    this.setStepsWorkSnakBarStaus.emit({
      mainIndex: mainIndex,
      childIndex: childindex,
      toolbarStatus: status,
    });
  }
  dropStepsOfWork(event: CdkDragDrop<string[]>) {
    moveItemInArray(
      this.phases[this.mainIndex].workSteps,
      event.previousIndex,
      event.currentIndex
    );
  }

  //? Remove this method from stps of work
  // showRatingModalForWorkType(i: number) {
  //
  //   this.sendPhaseListModalFlag.emit(true);
  //   if (this.phaseListModalFlag == true && this.headerSectionModalFlag == false) {
  //     if (this.items[this.itemIndex].workSteps[i].showModal == true) {
  //       this.items[this.itemIndex].workSteps[i].showModal = !this.items[this.itemIndex].workSteps[i].showModal;
  //     } else {
  //       this.items[this.itemIndex].workSteps.map((card) => {
  //          card.showModal = false;
  //       });
  //       this.items[this.itemIndex].workSteps[i].showModal = true;
  //       this.showSnakeBar = !this.showSnakeBar;
  //       this.selectiveIndex = i;
  //     }
  //     this.sendShowModal.emit(true);
  //   }
  // }

  // ? need to remove these following methods
  // showRatingModalForPhaseMeasure(i) {
  //
  //   this.sendPhaseListModalFlag.emit(true);
  //   console.log('Items Array after continuous Update:', this.items);
  //   if (this.phaseListModalFlag == true && this.headerSectionModalFlag == false) {
  //     if ( this.items[this.itemIndex].measures[i].toolbarStatus == true) {
  //         this.items[this.itemIndex].measures[i].toolbarStatus =
  //         !this.items[this.itemIndex].measures[i].toolbarStatus;
  //     } else {
  //       this.items[this.itemIndex].measures.map((card) => {
  //         card.toolbarStatus = false;
  //       });
  //       this.items[this.itemIndex].measures[i].toolbarStatus  = true;
  //       this.showSnakeBar = !this.showSnakeBar;
  //       this.selectiveIndex = i;
  //     }
  //     this.sendShowModal.emit(true);
  //   }
  // }
  // setColorValueForWorkType(val) {
  //
  //   this.phasesWorkType[this.selectiveIndex].color = val;
  //   this.sendColorforStepsOfWork.emit({color: val, i: this.selectiveIndex, flag: false})
  //   this.showSnakeBar = !this.showSnakeBar;
  //   this.showModal = false;
  // }
  // addRatingForManagment33333(i: number) {
  //   if (this.phasesWorkType[i].showModal == true) {
  //     this.phasesWorkType[i].showModal = !this.phasesWorkType[i].showModal;
  //   } else {
  //     this.phasesWorkType.map((card) => {
  //       card.showModal = false;
  //     });
  //     this.phasesWorkType[i].showModal = true;
  //     this.showSnakeBar = !this.showSnakeBar;
  //     this.selectiveIndex = i;
  //   }
  // openLightCardForPhaseMeasurement() {}
}
