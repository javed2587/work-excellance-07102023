import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { VoiceToTextServiceService } from 'src/app/services/voice-to-text-service.service';

@Component({
  selector: 'app-phase-five',
  templateUrl: './phase-five.component.html',
  styleUrls: ['./phase-five.component.css']
})
export class PhaseFiveComponent implements OnInit {

  title:string = "PDCA"
  selectiveIndex: number;
  graphColor:string
  // colorValue: string

  showLightModal: Boolean = false;
  showChartModal :Boolean = false;
  showCardYellow:Boolean = false;
  showCardBlue: Boolean = false;
  showCardGreen:Boolean = true;
  showCardRed: Boolean = false;
  // showRatingModel: Boolean = false;
  voiceCurrentState:Boolean = false;
  voicePDCA:Boolean = false;
  colorModal:Boolean = false;
  showModal:Boolean = false;
  cardHide:Boolean = false;
  cardShow:Boolean = true;
  showSnakeBar: Boolean;
  modal:Boolean =false;
  flagg:Boolean = true;
  down:Boolean = false;
  up:Boolean = true;
  showMicForPDCA:Boolean=false;
  showMicForCurrentState:Boolean=false;
  iconsColor:string = '#ffb100'

  listOfCurrentState: any[] = [];
  listOfOwnerDetails: any[] = [];
  listOfGraphValues: any[]=[];
  listOfPDCA: any[] = [];

  @Input() selectedRowIndex: number
  @Output() hideSelectedRow = new EventEmitter<any>()
  @Output() pushColorToMainParentSpan = new EventEmitter<String>();



  constructor(private voiceToTextService: VoiceToTextServiceService) {
    this.voiceToTextService.init()
    voiceToTextService.text='';
  }

  ngOnInit(): void {
   this.listOfOwnerDetails = ['Name','Owner','Scope','Data Source','Target','Actual']
  }
  toggle() {
    this.flagg = !this.flagg;
    this.up = !this.up;
    this.down = !this.down;
  }
  // addRatingColor() {
  //   ;
  //   this.showLightModal =! this.showLightModal;
  // }
  selectedColor(val) {
    this.graphColor = val.background;
    this.showLightModal = false;
  }
  cancelMode(value) {

    console.log("cancel value....",value)
    this.showLightModal = value ;
  }
  addFiledForPDCA() {
    this.listOfPDCA.push({ color: null, showModal: false, value: '' })
  }
  removeFieldForPDCA() {
    if (this.selectiveIndex != -1) {
      this.listOfPDCA.splice(this.selectiveIndex, 1)
      this.selectiveIndex = -1
    } else {
      this.listOfPDCA.pop();
      if(this.listOfPDCA.length == 0) {
        this.showMicForPDCA=false;
       }
    }
  }

  dropMangment(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.listOfPDCA, event.previousIndex, event.currentIndex);
  }
  fetchIndexForPDCA(i: number) {
    this.selectiveIndex = i;
    this.showMicForPDCA = true;
  }
  addRatingForPDCA(i: number) {
    if (this.listOfPDCA[i].showModal == true) {
      this.listOfPDCA[i].showModal = !this.listOfPDCA[i].showModal
    } else {
      this.listOfPDCA.map(card => {
        card.showModal = false
      })
      this.listOfPDCA[i].showModal = true
      this.showSnakeBar = !this.showSnakeBar;
      this.selectiveIndex = i
    }
  }
  setColorValueForPDCA(val: any) {
    this.listOfPDCA[this.selectiveIndex].showModal = false
    this.listOfPDCA[this.selectiveIndex].color = val
    this.showSnakeBar = !this.showSnakeBar
  }

  startService(event) {

    console.log("startService..."+event)
    if(event == "pdca"){
      if (this.voicePDCA == false) {
        this.voiceToTextService.start()
        this.voicePDCA = true;
        console.log("selected index is", this.selectiveIndex)
        window['listenInterval'] = setInterval(() => {
          this.listOfPDCA[this.selectiveIndex].value = this.voiceToTextService.text
        }, 500)
      } else {
        this.listOfPDCA[this.selectiveIndex].value = this.voiceToTextService.text
        clearInterval(window['listenInterval'])
        this.stopService();
      }
    }else{
      if (this.voiceCurrentState == false) {
        this.voiceToTextService.start()
        this.voiceCurrentState = true;
        console.log("selected index is", this.selectiveIndex)
        window['listenInterval'] = setInterval(() => {
          this.listOfCurrentState[this.selectiveIndex].value = this.voiceToTextService.text
        }, 500)
      } else {
        this.listOfCurrentState[this.selectiveIndex].value = this.voiceToTextService.text
        clearInterval(window['listenInterval'])
        this.stopService();
      }
    }
  }
  stopService() {
    if (this.voicePDCA) {
      this.voicePDCA = false;
    }else {
      this.voiceCurrentState = false;
    }
    this.voiceToTextService.stop();
  }
  addFiledForCurrentStat() {
    this.listOfCurrentState.push({ color: null, showModal: false, value: '' })
  }
  removeFieldForCurrentStat() {
    if (this.selectiveIndex != -1) {
      this.listOfCurrentState.splice(this.selectiveIndex, 1)
      this.selectiveIndex = -1
    } else {
      this.listOfCurrentState.pop();
      if(this.listOfCurrentState.length == 0) {
        this.showMicForCurrentState=false;
       }
    }
  }

  dropCurrentStateFileds(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.listOfCurrentState, event.previousIndex, event.currentIndex);
  }
  fetchIndexforStateFields(i: number) {
    this.selectiveIndex = i;
    this.showMicForCurrentState = true;
  }
  addRatingForCurrentState(i: number) {
    if (this.listOfCurrentState[i].showModal == true) {
      this.listOfCurrentState[i].showModal = !this.listOfCurrentState[i].showModal
    } else {
      this.listOfCurrentState.map(card => {
        card.showModal = false
      })
      this.listOfCurrentState[i].showModal = true
      this.showSnakeBar = !this.showSnakeBar;
      this.selectiveIndex = i
    }
  }
  setColorValueForCurrentStat(val: any) {
    this.listOfCurrentState[this.selectiveIndex].showModal = false
    this.listOfCurrentState[this.selectiveIndex].color = val
    // this.showSnakeBar = !this.showSnakeBar
  }
  // openColorModal() {
  //
  //   console.log(this.colorModal)
  //   console.log(this.modal)
  //   this.colorModal = true;
  //   this.modal = true;
  // }
  fetchColor(val:any) {

    this.graphColor = val;
     this.modal = false;
     this.showLightModal = false;
     this.showCardGreen = false;

    if(val == '#00FF00')
    {
      this.showCardGreen = true;
    }else if(val == '#FFFF00') {
      this.showCardYellow = true;
    }else if(val == '#FF0000') {
      this.showCardRed = true;
    } else {
      this.showCardBlue =true;
    }
  }
  addGraphValueModal() {

    this.showChartModal = true;
  }
  fetchFlag(val:Boolean) {

    this.showChartModal = val;
  }
  openLightCard() {
    console.log("open loight cardddddddddddd")
    this.showLightModal = !this.showLightModal;
  }
  fetchchartValues(value: any[]) {
    console.log("fetchChartValue: ", value)
    this.listOfGraphValues = value
    console.log("new array , ", this.listOfGraphValues)
    // this.listOfGraphValues = value
  }
}
