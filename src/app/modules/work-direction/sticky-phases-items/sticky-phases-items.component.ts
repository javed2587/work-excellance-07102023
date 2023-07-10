import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { PageDirectionalStatementDataInput } from 'src/app/models/work-direction/work-direction';

@Component({
  selector: 'app-sticky-phases-items',
  templateUrl: './sticky-phases-items.component.html',
  styleUrls: ['./sticky-phases-items.component.css'],
})
export class StickyPhasesItemsComponent implements OnInit, OnChanges {
  closeFolder: boolean = false;
  openFolder: boolean = true;
  showBody: Boolean = true;
  showModal: Boolean = false;
  folderStatus: boolean = true;
  gateName: string = '';
  @Input() phaseTitle: string;
  @Input() indexItem: any;
  @Input() itemList: any;
  index: number = 0;
  @Input() elementsData: Array<String>;
  itemsArray: any[] = [];
  @Input() setOutline: Boolean;
  @Input() stickPageTitle: string;
  @Input() stickyPageIndex: any;
  @Input() closeGate: any;
  @Input() exitGate: Boolean;
  @Input() thirdCardSelectedInput: any;
  @Input() lockstatus: Boolean = false;
  @Input() input: PageDirectionalStatementDataInput;
  @Input() wdInput: PageDirectionalStatementDataInput;
  @Output() selectedPhaseIndex: EventEmitter<number> =
    new EventEmitter<number>();
  @Output() sendElementsData = new EventEmitter<any>();
  @Output() sendPhaseTitle = new EventEmitter<string>();
  @Output() sendInput = new EventEmitter();
  constructor() {}
  ngOnInit(): void {
    console.log(this.showBody);
    if (this.itemList.length > 0) {
      this.itemsArray = this.itemList;
      this.index = this.indexItem;
    }
    console.log('Items Array Coming from Phase List:', this.itemsArray);
  }
  wdInputPopulated: Boolean = false;
  ngOnChanges(changes: SimpleChanges): void {
    for (const propName in changes) {
      if (propName == 'wdInput') {
        if (this.wdInput && !this.wdInputPopulated) {
          this.phaseTitle = this.wdInput?.name;
          this.getPhaseTitle(this.phaseTitle);
          this.elementsData = this.wdInput?.elements;
          this.getElementsData(this.elementsData);
          this.getInput({ index: this.indexItem, input: this.wdInput })
          this.wdInputPopulated = true
        }
      }
    }
  }
  getPhaseTitle(val: string) {
    this.phaseTitle = val;
    this.sendPhaseTitle.emit(val);
  }
  getElementsData(elements: any) {
    this.elementsData = elements;
    this.sendElementsData.emit(this.elementsData);
  }
  getInput(inputEvent) {
    this.sendInput.emit(inputEvent);
  }
  toggle() {
    this.showBody = !this.showBody;
    console.log(this.showBody);
    this.openFolder = !this.openFolder;
    this.closeFolder = !this.closeFolder;
  }
  openGateModal() {
    this.showModal = !this.showModal;
  }
  cancelModal(val: boolean) {
    this.showModal = val;
    console.log(val);
  }
  addGateName(newName: string) {
    this.gateName = newName;
  }
  public status: Boolean = false;
  // public setcurrentlyClickedCardIndex(cardIndex: number): void {
  //   this.currentlyClickedCardIndex = cardIndex;
  // }
  public checkIfCardIsClicked(selectedIndex) {
    // this.status = !this.status;
    this.selectedPhaseIndex.emit(selectedIndex);
  }
}
