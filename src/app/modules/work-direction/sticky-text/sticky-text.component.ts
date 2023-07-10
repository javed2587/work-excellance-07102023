import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { VoiceToTextServiceService } from 'src/app/services/voice-to-text-service.service';
import { PageDirectionalStatementDataInput } from '../../../models/work-direction/work-direction';

@Component({
  selector: 'app-sticky-text',
  templateUrl: './sticky-text.component.html',
  styleUrls: ['./sticky-text.component.css'],
})
export class StickyTextComponent implements OnInit, OnChanges {
  @Input() parentindex: any;
  @Input() data: any;
  @Input() indxVal: any;
  @Input() showModal: Boolean;
  @Input() phaseTitle: string;
  @Input() elementsData: any;
  @Input() index: any;
  @Input() selectIndexItem: any;
  @Input() stickyItemList: any;
  @Input() lockstatus: Boolean = false;
  @Input() wdInput: PageDirectionalStatementDataInput;
  itemsArray: any[] = [];
  @Output() sendPhaseTitle = new EventEmitter<string>();
  @Output() sendElements = new EventEmitter<any>();
  @Output() sendInput = new EventEmitter<any>();
  fieldsElements: any[] = [];
  dataArray: any[] = [];
  indexItem: number = 0;
  selectiveIndex: number = -1;
  voiceservice: Boolean = false;
  showMic: Boolean = false;
  colorValue: string;
  showRatingModel: Boolean = false;
  selectiveFieldIndex: number = -1;
  input: PageDirectionalStatementDataInput =
    new PageDirectionalStatementDataInput(null, null, []);
  constructor(private voiceToTextService: VoiceToTextServiceService) {
    this.voiceToTextService.init();
    voiceToTextService.text = '';
    //this.fieldsElements = this.stickyItemList;
  }
  ngOnInit(): void {
    console.log('Elements Data:', this.elementsData);
    if (this.stickyItemList.length > 0) {
      this.itemsArray = this.stickyItemList;
      this.indexItem = this.index;
      this.phaseTitle = this.itemsArray[this.indexItem].value;
      // this.fieldsElements = this.itemsArray[this.indexItem].childvalue;
    } else if (this.elementsData.length > 0) {
      // this.fieldsElements = this.elementsData;
    }
    console.log('Items Array for phase items and list:', this.itemsArray);
    console.log(
      'Phase Title from phase items and list',
      this.itemsArray[this.indexItem]?.value
    );
    console.log(
      'Field elements from phase items and list:',
      this.itemsArray[this.indexItem]?.childvalue
    );
  }
  wdInputPopulated: Boolean = false;
  ngOnChanges(changes: SimpleChanges): void {
    for (const propName in changes) {
      if (propName == 'wdInput') {
        if (this.wdInput && !this.wdInputPopulated) {
          this.phaseTitle = this.wdInput?.name;
          this.input.name = this.wdInput?.name;
          this.sendInput.emit({
            index: this.selectIndexItem,
            input: this.input,
          });

          if (this.wdInput?.elements) {
            this?.wdInput?.elements.forEach((ele) => {
              this.fieldsElements.push({
                color: '',
                showModal: false,
                value: ele,
              });
              this.input.elements.push(ele);
            });
            this.sendInput.emit({
              index: this.selectIndexItem,
              input: this.input,
            });
          }
          this.wdInputPopulated = true
        }
      }
    }
  }
  savePhaseTitle(e) {
    const value: string = e.target.value;
    console.log('Phase Title at parent index :', value, this.parentindex);
    this.sendPhaseTitle.emit(value);
    this.input.name = value;
    this.sendInput.emit({ index: this.selectIndexItem, input: this.input });
  }
  saveElements(e, i) {
    const val: string = e.target.value;
    console.log('coming values + index', val, i);
    this.fieldsElements[i].value = val;
    this.input.elements[i] = val;
    this.sendInput.emit({ index: this.selectIndexItem, input: this.input });
    console.log(this.fieldsElements);
    this.sendElements.emit(this.fieldsElements);
  }
  addRatingColor() {
    if (this.lockstatus == false || this.lockstatus == undefined) {
      this.showRatingModel = true;
    }
  }
  selectedColor(val) {
    this.colorValue = val.background;
    this.showRatingModel = false;
  }
  addFieldsForElements() {
    if (this.lockstatus == false || this.lockstatus == undefined) {
      if (this.fieldsElements.length < 10) {
        this.fieldsElements.push({ color: '', showModal: false, value: '' });
        this.input.elements.push('');
        this.sendInput.emit({ index: this.selectIndexItem, input: this.input });
      }
    }
  }
  removeFieldsForElements() {
    if (this.lockstatus == false || this.lockstatus == undefined) {
      if (this.selectiveFieldIndex != -1) {
        this.fieldsElements.splice(this.selectiveFieldIndex, 1);
        this.input.elements.splice(this.selectiveFieldIndex, 1);
        this.sendInput.emit({ index: this.selectIndexItem, input: this.input });
        this.selectiveFieldIndex = -1;
      } else {
        this.fieldsElements.pop();
        this.input.elements.pop();
        this.sendInput.emit({ index: this.selectIndexItem, input: this.input });
      }
    }
  }
  fetchIndex(i: number) {
    this.selectiveFieldIndex = i;
    this.showMic = true;
  }
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(
      this.fieldsElements,
      event.previousIndex,
      event.currentIndex
    );
  }
  startService() {
    if (this.voiceservice == false) {
      this.voiceToTextService.start();
      this.voiceservice = true;
      console.log('selected index is', this.selectiveFieldIndex);
      window['listenInterval'] = setInterval(() => {
        this.fieldsElements[this.selectiveFieldIndex].value =
          this.voiceToTextService.text;
      }, 500);
    } else {
      console.log(
        'this.phasesWorkType[this.selectiveIndex].value : ',
        this.fieldsElements[this.selectiveFieldIndex].value
      );
      console.log(
        'this._voiceToTextService.text',
        this.voiceToTextService.text
      );
      this.fieldsElements[this.selectiveFieldIndex].value =
        this.voiceToTextService.text;
      clearInterval(window['listenInterval']);
      this.stopService();
    }
  }
  stopService() {
    if (this.voiceservice) {
      this.voiceToTextService.stop();
      this.voiceservice = false;
    }
  }
}
