import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
// import { EmailValidator } from '@angular/forms';
import { PhaseItemI } from 'src/app/models/phase-item-i';
import { PageBody } from 'src/app/models/work-system/work-system-body';
// import { validateLocaleAndSetLanguage } from 'typescript';

// export interface PhaseItem {
//   title?: string,
//   index?: number
// }

@Component({
  selector: 'app-phase-items',
  templateUrl: './phase-items.component.html',
  styleUrls: ['./phase-items.component.css'],
})
export class PhaseItemsComponent implements OnInit, OnChanges{
  // expandedIndex = 0;
  // disabled = false;
  closeFolder: boolean = false;
  openFolder: boolean = true;
  setRenameGateFlag: boolean = false;
  addGateName: string = 'Add Gate Name';
  exitgateName: string = 'Exit Gate';
  firstGateName: string = 'Starter Gate';
  pushReName: string = '';
  showSnakeBar: boolean;
  showPhaseBody: boolean = true;
  closeFolderTitle: string = '';
  renamModalName: string = '';
  @Input() phases;
  @Input() phasesPage: PageBody
  @Input() setOutLine: boolean;
  @Input() initialTitle: String;
  @Input() indexPlusOne: any;
  @Input() mainIndex: any;
  @Input() isLastGate: boolean;
  @Input() IsFirstGate: boolean;
  @Input() exitGate: boolean;
  @Input() phasesFlag;
  @Input() headerFlag;
  @Input() locksTabtatus: boolean = false;
  @Input() reNameExitGate: String;
  @Input() reNameStratGate: string;

  @Output() sendFirstGateName = new EventEmitter();
  @Output() pushGateSnakebarStatus = new EventEmitter();
  @Output() pushEntryGateStatusIsColesd = new EventEmitter();
  
  @Output() sendColorValueForGate = new EventEmitter();
  @Output() sendNoteValueForGate = new EventEmitter();
  @Output() sendDecisionValueForGate = new EventEmitter();
  @Output() sendOpportunityValueForGate = new EventEmitter();
  @Output() sendTaskValueForGate = new EventEmitter();



  @Output() pushCurrentGateIndex = new EventEmitter<any>();
  @Output() onInitialTitleChange = new EventEmitter();
  @Output() sendExitVal = new EventEmitter();

  @Output() pushPhasePurposeValue = new EventEmitter<PhaseItemI>();
  @Output() pushPhasePurposeSankBarStatus = new EventEmitter();

  @Output() addPhaseMesaureList = new EventEmitter();
  @Output() removePhaseMesaureList = new EventEmitter();
  @Output() pushSavePhaseMeasure = new EventEmitter<any>();
  @Output() sendPhaseMeasureForSnakBar = new EventEmitter();

  @Output() pushPhaseTitle = new EventEmitter<PhaseItemI>();
  @Output() pushPhaseNameSnakebarStatus = new EventEmitter();
  @Output() phaseNameRatingValue = new EventEmitter();

  @Output() addNewhworkType = new EventEmitter();
  @Output() removeWorkType = new EventEmitter();
  @Output() pushWorkTypesValues = new EventEmitter();
  @Output() sendWorkTypeSnakbarStaus = new EventEmitter();
  @Output() sendWorkTypesRating = new EventEmitter();

  @Output() pushCurrentItemIndex = new EventEmitter();

  @Output() sendNotesValue = new EventEmitter();
  @Output() sendOpportunityValue = new EventEmitter();
  @Output() sendTaskValue = new EventEmitter();
  @Output() sendDecisionValue = new EventEmitter();

  @Output() sendPhaseMeasureNotesValue = new EventEmitter();
  @Output() sendPhaseMeasureOpportunityValue = new EventEmitter();
  @Output() sendPhaseMeasureTaskValue = new EventEmitter();
  @Output() sendPhaseMeasureDecisionValue = new EventEmitter();

  @Output() sendPhaseNameNote = new EventEmitter();
  @Output() sendPhaseNameTask = new EventEmitter();
  @Output() sendPhaseNameOpportunity = new EventEmitter();
  @Output() sendPhaseNameDecision = new EventEmitter();

  @Output() sendWorkTypesNotesValue = new EventEmitter();
  @Output() sendWorkTypesOpportunityValue = new EventEmitter();
  @Output() sendWorkTypesTaskValue = new EventEmitter();
  @Output() sendWorkTypesDecisionValue = new EventEmitter();
  // @Output() dragDropStatus =  new EventEmitter();

  // folderStatus: boolean = true;
  // ngbPanelTitle = 'helloo';
  // exitgateNameTemp: string = ''
  // showModal: boolean = false;
  // existGate2: boolean = true;
  // toolbarStatus:boolean = false
  // snackbarStatus: boolean
  // modal: boolean = false;
  // phasePurpose: string = '';
  // phaseMeasuresData: string = '';
  // workTypesData: string = '';
  // workMeasureData: string = '';
  // phaseMeasureFields: any;
  // isOpenFirstGate: boolean = false;
  // @Input() title: any;
  // @Input() indx: any;
  // @Input() itemIndex: any;
  // @Input() firstGateTitle: String
  // @Input()name exitSnakeBar
  // @Input() selectedGateIndex;
  // @Input() isSnackBArOpened;
  // @Output() pushWorkTypes = new EventEmitter<any>()
  // @Output() sendPhaseItemsModalFlag = new EventEmitter();
  // @Output() sendPhaseItemIndex = new EventEmitter();
  // @Output() sendPhaseMeasureFields = new EventEmitter();
  // @Output() sendShowModal = new EventEmitter();
  // @Output() sendPhaseListModalFlag = new EventEmitter();
  // @Output() sendRemoveMeasurePOp = new EventEmitter();
  // @Output() sendColorRate =new EventEmitter()
  // @Output() setPhaseMeasureIndex = new EventEmitter();// no
  // @Output() sendPhaseWorkTypeValues = new EventEmitter();
  // @Output() setColorValuesForPhase = new EventEmitter();
  // @Output() setCloseGateFlag = new EventEmitter();
  // @Output() setColorForStepOfWorks = new EventEmitter();
  // @Output() sendStartGateVal = new EventEmitter();
  // @Output() phaseNameValue = new EventEmitter();//no
  //  @Output() sendRemoveMeasure = new EventEmitter();
  constructor() {}
  ngOnChanges(changes: SimpleChanges): void {
      
  }
  ngOnInit(): void {
    
    console.log("phases", this.phases)
  }

  fetchNotesValue(event) {
    console.log('Notes Value at Phase Items:', event);
    this.sendNotesValue.emit(event);
  }

  fetchOpportunityValue(event) {
    console.log('Opportunity Value at Phase Items:', event);
    this.sendOpportunityValue.emit(event);
  }

  fetchDecisionValue(event) {
    console.log('Decision Value at Phase Items:', event);
    this.sendDecisionValue.emit(event);
  }

  fetchTaskValue(event) {
    console.log('Task Value at Phase Items:', event);
    this.sendTaskValue.emit(event);
  }

  fetchPhaseMeasureNotesValue(event) {
    debugger
    console.log('Phase Measure Notes Value:', event);
    this.sendPhaseMeasureNotesValue.emit(event);
  }

  fetchPhaseMeasureOpportunityValue(event) {
    debugger
    console.log('Phase Measure Opportunity Value:', event);
    this.sendPhaseMeasureOpportunityValue.emit(event);
  }

  fetchPhaseMeasureTaskValue(event) {
    console.log('Phase Measure Task Value:', event);
    this.sendPhaseMeasureTaskValue.emit(event);
  }

  fetchPhaseMeasureDecisionValue(event) {
    console.log('Phase Measure Decision Value:', event);
    this.sendPhaseMeasureDecisionValue.emit(event);
  }

  fetchPhaseNameNote(event) {
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

  fetchWorkTypesNotesValue(event) {
    debugger
    this.sendWorkTypesNotesValue.emit(event);
    console.log('Work Types Notes value at Phase Items:', event);
  }

  fetchWorkTypesOpportunityValue(event) {
    this.sendWorkTypesOpportunityValue.emit(event);
    console.log('Work Types Opportunity Value at Phase Items:', event);
  }

  fetchWorkTypesTaskValue(event) {
    this.sendWorkTypesTaskValue.emit(event);
    console.log('Work Types Task value at Phase Items:', event);
  }

  fetchWorkTypesDecisionValue(event) {
    this.sendWorkTypesDecisionValue.emit(event);
    console.log('Work Types Decision value at phase Items:', event);
  }

  toggle() {
    this.showPhaseBody = !this.showPhaseBody;
    this.openFolder = !this.openFolder;
    this.closeFolder = !this.closeFolder;
    if (this.closeFolder == true) {
      this.pushEntryGateStatusIsColesd.emit({
        currentIndex: this.mainIndex,
        status: false,
      });
    }
  }
  // ? Gate
  renameGateModal(value) {
    this.setRenameGateFlag = true;
    this.renamModalName = value != 'exit' ? 'Beginning Gate' : 'Exit Gate';
  }
  renameGateModalForFirstGate(value) {
    this.setRenameGateFlag = true;
    this.renamModalName = value != 'exit' ? 'First Gate' : 'Dummy Gate';
  }
  renameExitGate(name: string) {
    if (name != '') {
      this.exitgateName = name;
      this.sendExitVal.emit(name);
    }
  }
  reNameFirstGate(values) {
    debugger
    this.reNameStratGate = values;
    this.sendFirstGateName.emit(values);
  }
  renameGateName(newName: string) {
    if (newName != '') {
      this.initialTitle = newName;
      this.onInitialTitleChange.emit({
        index: this.mainIndex,
        value: this.initialTitle,
      });
    }
  }
  //? gate rating model

  setColorValueForGate(colorValue) {
    
    this.sendColorValueForGate.emit({
      currentIndex: this.mainIndex,
      colorValue: colorValue,
    });
  }
  setpushNoteValueForGate(note) {
    this.sendNoteValueForGate.emit({currentIndex: this.mainIndex, noteValue: note});
  
  }
  setpushDecisionValueForGate(decision) {
    this.sendDecisionValueForGate.emit({currentIndex: this.mainIndex, value: decision})
  }
  setpushOpportunityValueForGate(opportunity) {
    this.sendOpportunityValueForGate.emit({currentIndex: this.mainIndex, value: opportunity})
  }
  setpushTaskValueForGate(task) {
    this.sendTaskValueForGate.emit({currentIndex: this.mainIndex, value: task})
  }
  openRatingModalforGate(currentIndex, status) {
    
    this.pushGateSnakebarStatus.emit({
      currentIndex: currentIndex,
      status: status,
    }); //send current index to parent
  }
  sentCurrentGateIndexValue(val: any) {
    
    this.pushCurrentGateIndex.emit(val);
  }
  cancelModal(val: boolean) {
    this.setRenameGateFlag = val;
  }
  // ? phase purpose
  getPhasePuposeForSankbarStatus(val) {
    this.pushPhasePurposeSankBarStatus.emit(val);
  }
  getPhasePurposeValue(value: string) {
    this.pushPhasePurposeValue.emit({ title: value, index: this.mainIndex });
  }
  //? phase mesaure
  addNewPhaseMesaureList(event) {
    this.addPhaseMesaureList.emit(event);
  }
  savePhaseMeasures(phasemeasures) {
    this.pushSavePhaseMeasure.emit(phasemeasures);
  }
  //? phase name
  getphaseNameRatingValue(values) {
    this.phaseNameRatingValue.emit(values);
  }
  getPhaseName(val: string) {
    this.closeFolderTitle = val; //gate name
    this.pushPhaseTitle.emit({ title: val, index: this.mainIndex });
  }
  getPhaseNameSnakeBarStatus(index) {
    this.pushPhaseNameSnakebarStatus.emit(index);
  }

  // ? work types
  removeVlaueForWorkTypeList(values) {
    this.removeWorkType.emit(values);
  }
  getWorkTypesRating(colorValues) {
    debugger
    this.sendWorkTypesRating.emit(colorValues);
  }
  addWorkTypesList(worktypes: any) {
    // this.workTypesData = worktypes; //stro data for just return in child component for removing val
    this.addNewhworkType.emit(worktypes);
  }
  getPhaseWorkTypesSnakbarStatus(worTypeObj) {
    this.sendWorkTypeSnakbarStaus.emit(worTypeObj);
  }
  getWorkTypesForSave(value) {
    this.pushWorkTypesValues.emit(value);
  }
  // ? work measurement
  getRemovePhaseMesaureList(values) {
    this.removePhaseMesaureList.emit(values);
  }
  sendPhaseMeasureForSnakbar(measureIndexObj) {
    ;
    this.sendPhaseMeasureForSnakBar.emit(measureIndexObj);
  }
  //? other methd

  // sendDragDropStatus(values) {
  //   const status = values.values
  //   const mainIndex = values.mainindex
  //   const childIndex = values.childIndex
  //    this.phases[this.mainIndex].isDisabledDragDrop  = true;
  //   this.dragDropStatus.emit(values)
  // }
  sentCurrentItemIndexValue(val: any) {
    this.pushCurrentItemIndex.emit(val);
  }
}
