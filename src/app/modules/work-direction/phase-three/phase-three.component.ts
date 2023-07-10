import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { VoiceToTextServiceService } from 'src/app/services/voice-to-text-service.service';

@Component({
  selector: 'app-phase-three',
  templateUrl: './phase-three.component.html',
  styleUrls: ['./phase-three.component.css']
})
export class PhaseThreeComponent implements OnInit {

  showMicForTextArea: Boolean = false;
  showRatingModel: Boolean = false;
  voiceserviceForPDCA: Boolean = false;
  voiceserviceForOutCome: Boolean = false;
  collapseCard: Boolean = false;
  showModal: Boolean = false;
  downArrow: Boolean = false;
  upArrow: Boolean = true;
  showSnakeBar: Boolean;
  showFirstCard: boolean = true;
  showMicForPDCA: Boolean = false;
  showMicForPlanOutCome: Boolean = false;

  thirdCardSelectedInput: any
  textAreaVal: string = ''
  bgColor: string = '';
  colorValue: string
  index: number = -1;
  closingGate: Boolean
  showExitGate: Boolean
  phaseMasterIndex: number = 2;
  selectiveIndex: number;

  items: any[] = [];
  names: any[] = [];
  listOfPDCA: any[] = [];
  listOfPlanOutCome: any[] = [];
  statementOwnerList: any[] = [];

  constructor(private voiceToTextService: VoiceToTextServiceService) {
    this.voiceToTextService.init()
    voiceToTextService.text = '';
  }

  ngOnInit(): void {
    this.statementOwnerList = ['William', 'Jonathan', 'Stephanie', 'Nicole', 'Anthony', 'Elizabeth']
  }

  toggle() {

    // console.log("toggle called.")
    this.collapseCard = !this.collapseCard;
    this.upArrow = !this.upArrow;
    this.downArrow = !this.downArrow;
  }

  addRatingColor() {
    ;
    this.showRatingModel =! this.showRatingModel;
  }
  selectedColor(val) {
    this.colorValue = val.background;
    this.showRatingModel = false;
  }
  cancelMode(value) {

    console.log("cancel value....",value)
    this.showRatingModel = value ;
  }
  onPressed() {

    if (this.items.length <= 14) {
      this.showExitGate = false;
      this.closingGate = true;
      this.items.push(this.names[this.index + 1])
      this.index++
    } else {
      this.showExitGate = true;
      this.closingGate = false;
    }
  }
  removePages() {

    if (this.thirdCardSelectedInput != undefined) {
      this.items.splice(this.thirdCardSelectedInput, 1)
      this.thirdCardSelectedInput = undefined
    } else {
      this.items.pop()
    }
  }
  RemoveElementFromArray(index: number) {

    this.thirdCardSelectedInput = index
    this.bgColor = '#' + (Math.random() * 0xF2F2F2 << 0).toString(16);
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.items, event.previousIndex, event.currentIndex);
  }
  addFiledForPDCA() {
    this.listOfPDCA.push({ color: '', showModal: false, value: '' })
  }
  removeFieldForPDCA() {
    if (this.selectiveIndex != -1) {
      this.listOfPDCA.splice(this.selectiveIndex, 1)
      this.selectiveIndex = -1
    } else {
      this.listOfPDCA.pop();
      if (this.listOfPDCA.length == 0) {
        this.showMicForPDCA = false;
      }
    }
  }
  dropPDCA(event: CdkDragDrop<string[]>) {
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
  addFiledForOutCome() {
    this.listOfPlanOutCome.push({ color: '', showModal: false, value: '' })
  }
  removeFieldForOutCome() {
    if (this.selectiveIndex != -1) {
      this.listOfPlanOutCome.splice(this.selectiveIndex, 1)
      this.selectiveIndex = -1
    } else {
      this.listOfPlanOutCome.pop();
      if (this.listOfPlanOutCome.length == 0) {
        this.showMicForPlanOutCome = false;
      }
    }
  }

  dropOutComeFileds(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.listOfPlanOutCome, event.previousIndex, event.currentIndex);
  }
  fetchIndexforOutComeFields(i: number) {
    this.selectiveIndex = i;
    this.showMicForPlanOutCome = true;
  }
  addRatingForOutCome(i: number) {
    if (this.listOfPlanOutCome[i].showModal == true) {
      this.listOfPlanOutCome[i].showModal = !this.listOfPlanOutCome[i].showModal
    } else {
      this.listOfPlanOutCome.map(card => {
        card.showModal = false
      })
      this.listOfPlanOutCome[i].showModal = true
      this.showSnakeBar = !this.showSnakeBar;
      this.selectiveIndex = i
    }
  }
  setColorValueForOutCome(val: any) {
    this.listOfPlanOutCome[this.selectiveIndex].showModal = false
    this.listOfPlanOutCome[this.selectiveIndex].color = val
    this.showSnakeBar = !this.showSnakeBar
  }

  startService(event) {

    console.log("startService..." + event)
    if (event == "pdca") {
      if (this.voiceserviceForPDCA == false) {
        this.voiceToTextService.start()
        this.voiceserviceForPDCA = true;
        console.log("selected index is", this.selectiveIndex)
        window['listenInterval'] = setInterval(() => {
          this.listOfPDCA[this.selectiveIndex].value = this.voiceToTextService.text
        }, 500)
      } else {
        this.listOfPDCA[this.selectiveIndex].value = this.voiceToTextService.text
        clearInterval(window['listenInterval'])
        this.stopService();
      }
    }
    else {
      if (this.voiceserviceForOutCome == false) {
        this.voiceToTextService.start()
        this.voiceserviceForOutCome = true;
        console.log("selected index is", this.selectiveIndex)
        window['listenInterval'] = setInterval(() => {
          this.listOfPlanOutCome[this.selectiveIndex].value = this.voiceToTextService.text
        }, 500)
      } else {
        this.listOfPlanOutCome[this.selectiveIndex].value = this.voiceToTextService.text
        clearInterval(window['listenInterval'])
        this.stopService();
      }
    }
  }
  stopService() {
    if (this.voiceserviceForPDCA) {
      this.voiceserviceForPDCA = false;
    }else {
      this.voiceserviceForOutCome = false;
    }
    this.voiceToTextService.stop();
  }

}
