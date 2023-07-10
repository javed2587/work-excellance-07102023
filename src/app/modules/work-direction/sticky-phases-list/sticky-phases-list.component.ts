import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, OnInit, Output, OnChanges, SimpleChanges } from '@angular/core';
import {PageDirectionalStatementDataInput} from "../../../models/work-direction/work-direction";

@Component({
  selector: 'app-sticky-phases-list',
  templateUrl: './sticky-phases-list.component.html',
  styleUrls: ['./sticky-phases-list.component.css']
})
export class StickyPhasesListComponent implements OnInit, OnChanges {

  phaseNameList: any[] = [];
  items: any[] = [];
  index: number = -1;
  bgColor: string = '';
  closingGate: Boolean;
  showExitGate: Boolean;
  thirdCardSelectedInput: any;
  selectedPhaseIndex: number = -1;
  @Input() parentIndex: number;
  elementsData: string;
  @Input() phaseTitle: string;
  @Input() itemsArray: any;
  @Input() lockstatus: Boolean = false;
  @Output() sendElementsData = new EventEmitter<any>();
  @Output() sendPhaseTitle = new EventEmitter<string>();
  @Output() sendItemsArray = new EventEmitter<any>();
  @Output() sendInputs = new EventEmitter<any>();
  @Input() wdInputs: Array<PageDirectionalStatementDataInput>
  inputs: Array<PageDirectionalStatementDataInput> = []
  inputsOpenedPhases: number = 0
  constructor() {
    // console.log('Coming from Phase 2:', this.itemsArray);
  }
  ngOnInit(): void {
    this.phaseNameList = [
      { title: 'First Rate Quality' },
      { title: 'Terrific Customer Service' },
      { title: 'Innovative Design' },
      { title: 'Finalize the Order' },
      { title: 'Speed to Market' },
      { title: 'Quality & Understand Needs' },
      { title: 'Close the Sale' },
      { title: 'Finalize the Order' },
      { title: 'Increase the Sales Funnel' },
    ];
    console.log(this.parentIndex);
    if (this.itemsArray.length > 0) {
      this.items = this.itemsArray;
    }
    console.log('Items Array after comeback:', this.items);
  }
  wdInputsPopulated: Boolean = false
  ngOnChanges(changes: SimpleChanges): void {
    for (const propName in changes) {
      if (propName == 'wdInputs') {
        if (this.wdInputs && !this.wdInputsPopulated) {
          this.wdInputs.forEach(input => {
            this.items.push({ value: input?.name, childvalue: input?.elements ? input?.elements : [] });
            this.inputs.push(new PageDirectionalStatementDataInput(input?.seqNumber, input?.name, input?.elements ? input?.elements : []))
          })
          this.wdInputsPopulated = true
          this.sendInputs.emit({ index: this.parentIndex - 1, inputs: this.inputs })
        }
      }
    }
  }
  getElementsData(elements: any) {
    this.elementsData = elements;
    if (this.items[this.selectedPhaseIndex])
      this.items[this.selectedPhaseIndex].childvalue = elements;
    this.sendElementsData.emit(elements);
    console.log('Items Array', this.items);
    this.sendItemsArray.emit(this.items);
  }
  getPhaseTitle(val: string) {
    this.phaseTitle = val;
    this.sendPhaseTitle.emit(val);
    if (this.items[this.selectedPhaseIndex])
      this.items[this.selectedPhaseIndex].value = val;
    console.log('Items Array', this.items);
    this.sendItemsArray.emit(this.items);
  }
  getInput(inputEvent) {
    inputEvent.input.seqNumber = this.inputs[inputEvent.index].seqNumber
    this.inputs[inputEvent.index] = inputEvent.input
    this.sendInputs.emit({ index: this.parentIndex - 1, inputs: this.inputs })
  }
  addPhases() {
    if (this.lockstatus == false || this.lockstatus == undefined) {
    if (this.items.length < 8) {
      this.showExitGate = false;
      this.closingGate = true;
      this.items.push({ value: '', childvalue: [] });
      this.inputsOpenedPhases++
      this.inputs.push(new PageDirectionalStatementDataInput(this.inputsOpenedPhases.toString(), null, []))
      this.sendInputs.emit({ index: this.parentIndex - 1, inputs: this.inputs })
      this.index++;
    } else {
      this.showExitGate = true;
      this.closingGate = false;
    }

  }}
  removePages() {
    if (this.lockstatus == false || this.lockstatus == undefined) {
    if (this.thirdCardSelectedInput != undefined) {
      this.items.splice(this.thirdCardSelectedInput, 1);
      this.inputs.splice(this.thirdCardSelectedInput, 1)
      this.sendInputs.emit({ index: this.parentIndex - 1, inputs: this.inputs })
      this.thirdCardSelectedInput = undefined;
    } else {
      this.items.pop();
      this.inputs.pop()
      this.sendInputs.emit({ index: this.parentIndex - 1, inputs: this.inputs })
      this.inputsOpenedPhases--
    }
  }}
  RemoveElementFromArray(index: number) {
    this.thirdCardSelectedInput = index;
    this.bgColor = '4px solid #3E7DC0 !important';
    // this.bgColor = '#' + (Math.random() * 0xF2F2F2 << 0).toString(16);
    console.log('this.bgColor.....', this.bgColor);
  }
  // public checkIfCardIsClicked(cardIndex: number): boolean {
  //   return cardIndex === this.thirdCardSelectedInput;
  // }
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.items, event.previousIndex, event.currentIndex);
    moveItemInArray(this.inputs, event.previousIndex, event.currentIndex);
  }
  setSelectedPhaseIndex(index) {
    this.selectedPhaseIndex = index;
  }
}
