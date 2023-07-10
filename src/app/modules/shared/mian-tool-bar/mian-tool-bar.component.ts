import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { IRatingColor, IRatingDecision, IRatingNote, IRatingTask } from 'src/app/models/common/rating';
import { RatingService } from 'src/app/services/rating.service';

function hello() {
  alert('Hello!!!');
}

@Component({
  selector: 'app-mian-tool-bar',
  templateUrl: './mian-tool-bar.component.html',
  styleUrls: ['./mian-tool-bar.component.css'],
})
export class MianToolBarComponent implements OnInit, OnChanges {
  @Output() hideSelectedRow = new EventEmitter<any>();
  @Input() selectedRowIndex: number;
  @Input() showSnakeBarMenu: Boolean;
  @Input() displayVal: Boolean;
  // @Input() openRatingTabForName: Boolean = false
  @Input() openRatingTabFlag: Boolean = false;
  @Input() openRatingForNote: Boolean = false;
  @Input() lockstatus: Boolean = false;

  @Input() color: String
  @Input() note: IRatingNote
  @Input() task: IRatingTask
  @Input() decision: IRatingDecision
  @Input() opportunity: IRatingNote
  @Input() test: any
  @Output() pushColorToMainParentSpan = new EventEmitter<String>();
  @Output() onaddRating = new EventEmitter<any>();
  @Output() onCancel = new EventEmitter<Boolean>();
  @Output() doColor = new EventEmitter<Boolean>();
  @Output() pushNotesValue = new EventEmitter();
  @Output() pushOppertunity = new EventEmitter();
  @Output() pushDecisionValue = new EventEmitter();
  @Output() pushTaslValue = new EventEmitter();
  @Output() isOpened = new EventEmitter<boolean>();
  showModal = false;
  displayTaskModal: Boolean = false;
  isTaskModal: Boolean;

  displayDecisionModal: Boolean = false;
  isShowDecision: boolean = false;

  displayOppertunityModal: Boolean = false;
  showOppertunity: Boolean = false;
  // modal: Boolean = false;
  isRatingModal: boolean = false;
  showAddNoteModal: Boolean = false;
  showAddNote: boolean = false;

  constructor(private _rateService: RatingService) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    
  }

  openRatingModel() {
    if (this.lockstatus == false || this.lockstatus == undefined) {
      this.showModal = true;
      this.isRatingModal = !this.isRatingModal;
    }
  }

  openNoteModal() {
    this.showAddNoteModal = !this.showAddNoteModal;
    this.showAddNote = true;
    // this.isSnackBar.emit(false)
  }
  showTaskModal() {
    // this.showAddNoteModal = !this.showAddNoteModal
    this.displayTaskModal = !this.displayTaskModal;
    this.isTaskModal = true;
    // if(this.lockstatus == false || this.lockstatus == undefined){}
  }
  showDecisionModal() {
    // if(this.lockstatus == false || this.lockstatus == undefined){}
    this.displayDecisionModal = !this.displayDecisionModal;
    this.isShowDecision = true;
  }
  showOppertunityModal() {
    // if(this.lockstatus == false || this.lockstatus == undefined){}
    this.displayOppertunityModal = !this.displayOppertunityModal;
    this.showOppertunity = true;
  }
  setRate(val: any) {
    console.log('============main-tool ts============');
    console.log(val);
  }
  fetchColor(val: any) {
    this.callParent(val.background);
  }
  callParent(colour: String) {
    this.pushColorToMainParentSpan.emit(colour);
    this.hideSelectedRow.emit(this.selectedRowIndex);
  }
  fetchNote(note) {
    console.log('Notes Value at Main Toolbar:', note);
    this.pushNotesValue.emit(note);
  }
  cancelRate(event: any) {
    this.showModal = false;
    this.isRatingModal = false;
  }
  sendValueIsOpened(values) {
    this.isOpened.emit(values);
  }
  fetchOppertunity(oppertunity) {
    console.log('Opportunity Value at Main ToolBar:', oppertunity);
    this.pushOppertunity.emit(oppertunity);
  }
  fetchDecisionData(decison) {
    console.log('Decision Value at Main Toolbar:', decison);
    this.pushDecisionValue.emit(decison);
  }
  fetchTaskValue(values) {
    console.log('Task Value at Main Toolbar:', values);
    this.pushTaslValue.emit(values);
    
  }
}
