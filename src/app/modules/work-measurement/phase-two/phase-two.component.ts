import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, OnInit, Output, OnChanges, SimpleChanges } from '@angular/core';
import { VoiceToTextServiceService } from 'src/app/services/voice-to-text-service.service';
import {
  WorkImprovementCurrentStates,
  WorkImprovementPDCAStatement
} from "../../../models/work-improvement/work-improvment";
import { PageDataManagementRailRaiting } from "../../../models/work-system/work-system-header";
import {
  WorkMeasurementData,
  WorkMeasurementGraphData,
  WorkMeasurementGraphDataInputs
} from "../../../models/work-measurement/work-measurement";
import { MeasurementDataWithIndex } from "../phase-one/phase-one.component";

@Component({
  selector: 'app-phase-two',
  templateUrl: './phase-two.component.html',
  styleUrls: ['./phase-two.component.css']
})
// export class PhaseTwoComponent implements OnInit, OnChanges {
//   title = "PDCA"
//   voiceCurrentState: Boolean = false;
//   voicePDCA: Boolean = false;
//   showModal = false;
//   cardShow = true;
//   cardHide = false;
//   colorModal = false;
//   modal = false;
//   flagg = true;
//   up = true;
//   down = false;
//   showMicForPDCA = false;
//   showMicForCurrentState = false;
//   showSnakeBar: Boolean;
//   selectiveIndex: number;
//   graphColor: any
//   showLightModal: Boolean = false;
//   showCardGreen: Boolean = false;
//   showCardRed: Boolean = true;
//   showCardYellow: Boolean = false;
//   showCardBlue: Boolean = false;
//   showChartModal: Boolean = false;
//   currentStateShowModal: Boolean = false;
//   pdcaShowModal: Boolean = false;
//   chartData: any;
//   listOfPDCA: any[] = [];
//   listOfCurrentState: any[] = [];
//   listOfOwnerDetails: any[] = [];
//   measurementName: string = '';
//   measurementOwner: string = '';
//   measurementScope: string = '';
//   measurementDataSource: string = '';
//   measurementTarget: string = ''
//   measurementActual: string = ''
//   results: string[] = []

//   currentStatesPhases: Array<WorkImprovementCurrentStates> = []
//   currentStatesOpenedPhases: number = 0
//   pdcaPhases: Array<WorkImprovementPDCAStatement> = []
//   measurementData: WorkMeasurementData = new WorkMeasurementData(
//     null, { name: null, userId: null }, null, null, null, null,
//     new WorkMeasurementGraphData([], null, null), [], []
//   )
//   pdcaPhasesOpenedPhases: number = 0

//   @Input() selectedRowIndex: number
//   @Output() hideSelectedRow = new EventEmitter<any>()
//   @Output() pushColorToMainParentSpan = new EventEmitter<String>();
//   @Output() sendMeasurementData: EventEmitter<MeasurementDataWithIndex> = new EventEmitter<MeasurementDataWithIndex>()
//   @Output() sendShowModal = new EventEmitter();
//   @Input() GraphList;
//   @Input() GraphListIndex;
//   @Input() lockstatus: Boolean = false;
//   @Input() workMeasurementData: WorkMeasurementData


//   constructor(private voiceToTextService: VoiceToTextServiceService) {
//     this.voiceToTextService.init()
//     voiceToTextService.text = '';
//   }
//   fillMeasurementPDCAStatements() {
//     if (!this.listOfPDCA || this.listOfPDCA.length == 0) {
//       if (this.workMeasurementData.pdca) {
//         this.workMeasurementData.pdca.forEach(pdca => {
//           this.pdcaPhases.push(new WorkImprovementPDCAStatement(pdca.text,
//             new PageDataManagementRailRaiting(pdca?.rating?.color, pdca?.rating?.note, pdca?.rating?.opportunity,
//               {
//                 id: pdca?.rating?.task?.id,
//                 task: pdca?.rating?.task?.task,
//                 contributor: { name: pdca?.rating?.task?.contributor?.name, userId: pdca?.rating?.task?.contributor?.userId },
//                 notes: pdca?.rating?.task?.notes,
//                 owner: { userId: pdca?.rating?.task?.owner?.userId, name: pdca?.rating?.task?.owner?.name },
//                 priority: pdca?.rating?.task?.priority,
//                 status: pdca?.rating?.task?.status,
//                 dueDate: pdca?.rating?.task?.dueDate
//               },
//               {
//                 date: pdca?.rating?.decision?.date,
//                 owner: { name: pdca?.rating?.decision?.owner?.name, userId: pdca?.rating?.decision?.owner?.userId },
//                 summary: pdca?.rating?.decision?.summary
//               }
//             ), pdca.seqNumber))
//           this.listOfPDCA.push({ color: pdca?.rating?.color, showModal: false, value: pdca.text })
//         })
//         this.measurementData.pdca = this.pdcaPhases
//         this.sendMeasurementData.emit({ index: this.selectedRowIndex, data: this.measurementData })
//       }
//     }
//   }
//   fillMeasurementCurrentStatements() {
//     if (!this.listOfCurrentState || this.listOfCurrentState.length == 0) {
//       if (this.workMeasurementData.currentStates) {
//         this.workMeasurementData.currentStates.forEach(cs => {
//           this.listOfCurrentState.push({ color: cs?.rating?.color, showModal: false, value: cs?.text })
//           this.currentStatesPhases.push(new WorkImprovementCurrentStates(cs?.text,
//             new PageDataManagementRailRaiting(cs?.rating?.color, cs?.rating?.note, cs?.rating?.opportunity,
//               {
//                 id: cs?.rating?.task?.id,
//                 task: cs?.rating?.task?.task,
//                 contributor: { name: cs?.rating?.task?.contributor?.name, userId: cs?.rating?.task?.contributor?.userId },
//                 notes: cs?.rating?.task?.notes,
//                 owner: { userId: cs?.rating?.task?.owner?.userId, name: cs?.rating?.task?.owner?.name },
//                 priority: cs?.rating?.task?.priority,
//                 status: cs?.rating?.task?.status,
//                 dueDate: cs?.rating?.task?.dueDate
//               },
//               { date: cs?.rating?.decision?.date, owner: { name: cs?.rating?.decision?.owner?.name, userId: cs?.rating?.decision?.owner?.userId }, summary: cs?.rating?.decision?.summary }
//             ), cs?.seqNumber))
//         })
//         this.measurementData.currentStates = this.currentStatesPhases
//         this.sendMeasurementData.emit({ index: this.selectedRowIndex, data: this.measurementData })
//         // })
//       }
//     }
//   }
//   fillMeasurementMetaInfo() {
//     this.measurementName = this.workMeasurementData?.name
//     this.measurementScope = this.workMeasurementData?.scope
//     this.measurementOwner = this.workMeasurementData?.owner?.name?.toString()
//     this.measurementData.owner = this.workMeasurementData?.owner
//     this.measurementDataSource = this.workMeasurementData?.dataSource
//     this.measurementTarget = this.workMeasurementData?.target
//     this.measurementActual = this.workMeasurementData?.actual
//     this.getMeasurementName()
//     this.getMeasurementScope()
//     this.getMeasurementOwner()
//     this.getMeasurementDataSource()
//     this.getMeasurementTarget()
//     this.getMeasurementActual()
//   }
//   measurementDataPopulated: boolean = false
//   graphData: Array<WorkMeasurementGraphDataInputs>
//   ngOnChanges(changes: SimpleChanges): void {
//     for (const propName in changes) {
//       if (propName == "workMeasurementData") {
//         if (this.workMeasurementData && !this.measurementDataPopulated) {
//           this.fillMeasurementMetaInfo()
//           this.fillMeasurementPDCAStatements()
//           this.fillMeasurementCurrentStatements()
//           if (!this.graphData) {
//             this.graphColor = this.workMeasurementData?.graph?.color
//             this.graphData = this.workMeasurementData?.graph?.inputs
//             this.getGraphData(this.graphData)
//             this.measurementDataPopulated = true
//           }
//         }
//       }
//     }
//   }

//   ngOnInit(): void {
//     this.listOfOwnerDetails = ['Name', 'Owner', 'Scope', 'Data Source', 'Target', 'Actual']
//     //  this.listOfOwnerDetails = [{heading:'Name', val:''}, {heading:'Owner',val:''}, {heading:'Scope',val:''}, {heading:'Data Source',val:''}, {heading: 'Target', val:''}, {heading:'Actual', val:''}]
//   }

//   getMeasurementName() {
//     this.measurementData.name = this.measurementName
//     this.sendMeasurementData.emit({ index: this.selectedRowIndex, data: this.measurementData })
//   }
//   getMeasurementScope() {
//     this.measurementData.scope = this.measurementScope
//     this.sendMeasurementData.emit({ index: this.selectedRowIndex, data: this.measurementData })
//   }
//   getMeasurementOwner() {
//     this.measurementData.owner.name = this.measurementOwner
//     this.sendMeasurementData.emit({ index: this.selectedRowIndex, data: this.measurementData })
//   }
//   getMeasurementDataSource() {
//     this.measurementData.dataSource = this.measurementDataSource
//     this.sendMeasurementData.emit({ index: this.selectedRowIndex, data: this.measurementData })
//   }
//   getMeasurementTarget() {
//     this.measurementData.target = this.measurementTarget
//     this.sendMeasurementData.emit({ index: this.selectedRowIndex, data: this.measurementData })
//   }
//   getMeasurementActual() {
//     this.measurementData.actual = this.measurementActual
//     this.sendMeasurementData.emit({ index: this.selectedRowIndex, data: this.measurementData })
//   }

//   toggle() {
//     this.flagg = !this.flagg;
//     this.up = !this.up;
//     this.down = !this.down;
//   }

//   selectedColor(val) {
//     this.graphColor = val.background;
//     this.measurementData.graph.color = this.graphColor
//     this.sendMeasurementData.emit({ index: this.selectedRowIndex, data: this.measurementData })
//     this.showLightModal = false;
//   }

//   cancelMode(value) {
//     console.log("cancel value....", value)
//     this.showLightModal = value;
//   }

//   addFiledForPDCA() {
//     if (this.listOfPDCA.length < 15) {
//       if (this.lockstatus == false || this.lockstatus == undefined) {
//         this.listOfPDCA.push({ color: '', showModal: false, value: '' })
//         this.pdcaPhasesOpenedPhases++
//         this.pdcaPhases.push(new WorkImprovementPDCAStatement(null,
//           new PageDataManagementRailRaiting(null, null, null,
//             {
//               id: null,
//               task: null,
//               contributor: { name: null, userId: null },
//               notes: null,
//               owner: { userId: null, name: null },
//               priority: null,
//               status: null,
//               dueDate: null
//             },
//             { date: null, owner: { name: null, userId: null }, summary: null }
//           ), this.pdcaPhasesOpenedPhases.toString()))
//         this.measurementData.pdca = this.pdcaPhases
//         this.sendMeasurementData.emit({ index: this.selectedRowIndex, data: this.measurementData })
//       }
//     }
//   }

//   removeFieldForPDCA() {
//     if (this.lockstatus == false || this.lockstatus == undefined) {
//       if (this.selectiveIndex != -1) {
//         this.listOfPDCA.splice(this.selectiveIndex, 1)
//         this.pdcaPhases.splice(this.selectiveIndex, 1)
//         this.measurementData.pdca = this.pdcaPhases
//         this.sendMeasurementData.emit({ index: this.selectedRowIndex, data: this.measurementData })
//         this.selectiveIndex = -1
//       } else {
//         this.listOfPDCA.pop();
//         this.pdcaPhases.pop()
//         this.measurementData.pdca = this.pdcaPhases
//         this.sendMeasurementData.emit({ index: this.selectedRowIndex, data: this.measurementData })
//         this.pdcaPhasesOpenedPhases--
//         if (this.listOfPDCA.length == 0) {
//           this.showMicForPDCA = false;
//         }
//       }
//     }
//   }

//   dropMangment(event: CdkDragDrop<string[]>) {
//     moveItemInArray(this.listOfPDCA, event.previousIndex, event.currentIndex);
//     moveItemInArray(this.pdcaPhases, event.previousIndex, event.currentIndex);
//   }

//   fetchIndexForPDCA(i: number) {
//     this.selectiveIndex = i;
//     this.showMicForPDCA = true;
//   }

//   addRatingForPDCA(i: number) {
//     // if (this.listOfPDCA[i].showModal == true) {
//     //   this.listOfPDCA[i].showModal = !this.listOfPDCA[i].showModal
//     // } else {
//     //   this.listOfPDCA.map(card => {
//     //     card.showModal = false
//     //   })
//     //   this.listOfPDCA[i].showModal = true
//     //   this.showSnakeBar = !this.showSnakeBar;
//     //   this.selectiveIndex = i
//     // }
//     if (this.lockstatus == false || this.lockstatus == undefined) {
//       this.sendShowModal.emit(true);
//       if (this.GraphList[this.GraphListIndex].showModal == true) {
//         if (this.listOfPDCA[i].showModal == true) {
//           this.listOfPDCA[i].showModal = !this.listOfPDCA[i].showModal;
//           this.pdcaShowModal = false;
//         } else {
//           this.listOfPDCA.map((card) => {
//             card.showModal = false;
//           });
//           this.listOfPDCA[i].showModal = true;
//           this.pdcaShowModal = true;
//           this.currentStateShowModal = false;
//           this.showSnakeBar = !this.showSnakeBar;
//           this.selectiveIndex = i;
//         }
//       }
//     }
//   }

//   setColorValueForPDCA(val: any) {
//     this.listOfPDCA[this.selectiveIndex].showModal = false
//     this.listOfPDCA[this.selectiveIndex].color = val
//     this.showSnakeBar = !this.showSnakeBar
//     this.pdcaPhases[this.selectiveIndex].rating.color = val
//     this.measurementData.pdca = this.pdcaPhases
//     this.sendMeasurementData.emit({ index: this.selectedRowIndex, data: this.measurementData })
//   }

//   getTaskForPDCA(task) {
//     this.pdcaPhases[this.selectiveIndex].rating.task = task
//     this.measurementData.pdca = this.pdcaPhases
//     this.sendMeasurementData.emit({ index: this.selectedRowIndex, data: this.measurementData })
//   }

//   getDecisionForPDCA(decision) {
//     this.pdcaPhases[this.selectiveIndex].rating.decision = decision
//     this.measurementData.pdca = this.pdcaPhases
//     this.sendMeasurementData.emit({ index: this.selectedRowIndex, data: this.measurementData })
//   }

//   getOpportunityForPDCA(opportunity) {
//     this.pdcaPhases[this.selectiveIndex].rating.opportunity = opportunity
//     this.measurementData.pdca = this.pdcaPhases
//     this.sendMeasurementData.emit({ index: this.selectedRowIndex, data: this.measurementData })
//   }

//   getNoteForPDCA(note) {
//     this.pdcaPhases[this.selectiveIndex].rating.note = note
//     this.measurementData.pdca = this.pdcaPhases
//     this.sendMeasurementData.emit({ index: this.selectedRowIndex, data: this.measurementData })
//   }

//   getGraphData(graphInputs: Array<WorkMeasurementGraphDataInputs>) {
//     this.measurementData.graph.inputs = graphInputs
//     this.graphData = this.measurementData.graph.inputs
//     this.sendMeasurementData.emit({ index: this.selectedRowIndex, data: this.measurementData })
//   }

//   setPDCAValue(o, i) {
//     this.pdcaPhases[i].text = o.value
//     this.measurementData.pdca = this.pdcaPhases
//     this.sendMeasurementData.emit({ index: this.selectedRowIndex, data: this.measurementData })
//   }

//   startService(event) {

//     console.log("startService..." + event)
//     if (event == "pdca") {
//       if (this.voicePDCA == false) {
//         this.voiceToTextService.start()
//         this.voicePDCA = true;
//         console.log("selected index is", this.selectiveIndex)
//         window['listenInterval'] = setInterval(() => {
//           this.listOfPDCA[this.selectiveIndex].value = this.voiceToTextService.text
//           this.pdcaPhases[this.selectiveIndex].text = this.voiceToTextService.text
//           this.measurementData.pdca = this.pdcaPhases
//           this.sendMeasurementData.emit({ index: this.selectedRowIndex, data: this.measurementData })
//         }, 500)
//       } else {
//         this.listOfPDCA[this.selectiveIndex].value = this.voiceToTextService.text
//         this.pdcaPhases[this.selectiveIndex].text = this.voiceToTextService.text
//         this.measurementData.pdca = this.pdcaPhases
//         this.sendMeasurementData.emit({ index: this.selectedRowIndex, data: this.measurementData })
//         clearInterval(window['listenInterval'])
//         this.stopService();
//       }
//     } else {
//       if (this.voiceCurrentState == false) {
//         this.voiceToTextService.start()
//         this.voiceCurrentState = true;
//         console.log("selected index is", this.selectiveIndex)
//         window['listenInterval'] = setInterval(() => {
//           this.listOfCurrentState[this.selectiveIndex].value = this.voiceToTextService.text
//           this.currentStatesPhases[this.selectiveIndex].text = this.voiceToTextService.text
//           this.measurementData.currentStates = this.currentStatesPhases
//           this.sendMeasurementData.emit({ index: this.selectedRowIndex, data: this.measurementData })
//         }, 500)
//       } else {
//         this.listOfCurrentState[this.selectiveIndex].value = this.voiceToTextService.text
//         this.currentStatesPhases[this.selectiveIndex].text = this.voiceToTextService.text
//         this.measurementData.currentStates = this.currentStatesPhases
//         this.sendMeasurementData.emit({ index: this.selectedRowIndex, data: this.measurementData })
//         clearInterval(window['listenInterval'])
//         this.stopService();
//       }
//     }
//   }

//   stopService() {
//     if (this.voicePDCA) {
//       this.voicePDCA = false;
//     } else {
//       this.voiceCurrentState = false;
//     }
//     this.voiceToTextService.stop();
//   }

//   addFiledForCurrentStat() {
//     if (this.listOfCurrentState.length < 15) {
//       if (this.lockstatus == false || this.lockstatus == undefined) {
//         this.listOfCurrentState.push({ color: '', showModal: false, value: '' })
//         this.currentStatesOpenedPhases++
//         this.currentStatesPhases.push(new WorkImprovementCurrentStates(null,
//           new PageDataManagementRailRaiting(null, null, null,
//             {
//               id: null,
//               task: null,
//               contributor: { name: null, userId: null },
//               notes: null,
//               owner: { userId: null, name: null },
//               priority: null,
//               status: null,
//               dueDate: null
//             },
//             { date: null, owner: { name: null, userId: null }, summary: null }
//           ), this.currentStatesOpenedPhases.toString()))
//         this.measurementData.currentStates = this.currentStatesPhases
//         this.sendMeasurementData.emit({ index: this.selectedRowIndex, data: this.measurementData })
//       }
//     }
//   }

//   removeFieldForCurrentStat() {
//     if (this.lockstatus == false || this.lockstatus == undefined) {
//       if (this.selectiveIndex != -1) {
//         this.listOfCurrentState.splice(this.selectiveIndex, 1)
//         this.currentStatesPhases.splice(this.selectiveIndex, 1)
//         this.measurementData.currentStates = this.currentStatesPhases
//         this.sendMeasurementData.emit({ index: this.selectedRowIndex, data: this.measurementData })
//         this.selectiveIndex = -1
//       } else {
//         this.listOfCurrentState.pop();
//         this.currentStatesPhases.pop()
//         this.measurementData.currentStates = this.currentStatesPhases
//         this.sendMeasurementData.emit({ index: this.selectedRowIndex, data: this.measurementData })
//         this.currentStatesOpenedPhases--
//         if (this.listOfCurrentState.length == 0) {
//           this.showMicForCurrentState = false;
//         }
//       }
//     }
//   }

//   dropCurrentStateFileds(event: CdkDragDrop<string[]>) {
//     moveItemInArray(this.listOfCurrentState, event.previousIndex, event.currentIndex);
//     moveItemInArray(this.currentStatesPhases, event.previousIndex, event.currentIndex);
//   }

//   fetchIndexforStateFields(i: number) {
//     this.selectiveIndex = i;
//     this.showMicForCurrentState = true;
//   }

//   addRatingForCurrentState(i: number) {
//     // if (this.listOfCurrentState[i].showModal == true) {
//     //   this.listOfCurrentState[i].showModal = !this.listOfCurrentState[i].showModal
//     // } else {
//     //   this.listOfCurrentState.map(card => {
//     //     card.showModal = false
//     //   })
//     //   this.listOfCurrentState[i].showModal = true
//     //   this.showSnakeBar = !this.showSnakeBar;
//     //   this.selectiveIndex = i
//     // }
//     if (this.lockstatus == false || this.lockstatus == undefined) {
//       this.sendShowModal.emit(true);
//       if (this.GraphList[this.GraphListIndex].showModal == true) {
//         if (this.listOfCurrentState[i].showModal == true) {
//           this.listOfCurrentState[i].showModal =
//             !this.listOfCurrentState[i].showModal;
//           this.currentStateShowModal = false;
//         } else {
//           this.listOfCurrentState.map((card) => {
//             card.showModal = false;
//           });
//           this.listOfCurrentState[i].showModal = true;
//           this.currentStateShowModal = true;
//           this.pdcaShowModal = false;
//           this.showSnakeBar = !this.showSnakeBar;
//           this.selectiveIndex = i;
//         }
//       }
//     }
//   }

//   setColorValueForCurrentStat(val: any) {
//     this.listOfCurrentState[this.selectiveIndex].showModal = false
//     this.listOfCurrentState[this.selectiveIndex].color = val
//     this.currentStatesPhases[this.selectiveIndex].rating.color = val
//     this.measurementData.currentStates = this.currentStatesPhases
//     this.sendMeasurementData.emit({ index: this.selectedRowIndex, data: this.measurementData })
//     // this.showSnakeBar = !this.showSnakeBar
//   }

//   getNoteForCurrentState(note) {
//     this.currentStatesPhases[this.selectiveIndex].rating.note = note
//     this.measurementData.currentStates = this.currentStatesPhases
//     this.sendMeasurementData.emit({ index: this.selectedRowIndex, data: this.measurementData })
//   }

//   getOpportunityForCurrentState(opportunity) {
//     this.currentStatesPhases[this.selectiveIndex].rating.opportunity = opportunity
//     this.measurementData.currentStates = this.currentStatesPhases
//     this.sendMeasurementData.emit({ index: this.selectedRowIndex, data: this.measurementData })
//   }

//   getTaskForCurrentState(task) {
//     this.currentStatesPhases[this.selectiveIndex].rating.task = task
//     this.measurementData.currentStates = this.currentStatesPhases
//     this.sendMeasurementData.emit({ index: this.selectedRowIndex, data: this.measurementData })
//   }

//   getDecisionForCurrentState(decision) {
//     this.currentStatesPhases[this.selectiveIndex].rating.decision = decision
//     this.measurementData.currentStates = this.currentStatesPhases
//     this.sendMeasurementData.emit({ index: this.selectedRowIndex, data: this.measurementData })
//   }

//   setCurrentStateValue(o, i) {
//     this.currentStatesPhases[i].text = o.value
//     this.measurementData.currentStates = this.currentStatesPhases
//     this.sendMeasurementData.emit({ index: this.selectedRowIndex, data: this.measurementData })
//   }

//   openColorModal() {
//     console.log(this.colorModal)
//     console.log(this.modal)
//     this.colorModal = true;
//     this.modal = true;
//   }

//   fetchColor(val: any) {

//     this.graphColor = val;
//     this.modal = false;
//     this.showLightModal = false;
//     this.showCardRed = false;

//     if (val == "#00FF00") {
//       this.showCardGreen = true;
//     } else if (val == '#FFFF00') {
//       this.showCardYellow = true;
//     } else if (val == '#FF0000') {
//       this.showCardRed = true;
//     } else {
//       this.showCardBlue = true;
//     }
//   }

//   addGraphValueModal() {
//     this.showChartModal = true;
//   }

//   fetchFlag(val: Boolean) {

//     this.showChartModal = val;
//   }

//   openLightCard() {
//     console.log("open loight cardddddddddddd")
//     this.showLightModal = !this.showLightModal;
//   }

//   importFile(event) {


//     if (this.lockstatus == false || this.lockstatus == undefined) {
//       this.chartData = undefined
//       if (event.target.files.length == 0) {
//         console.log('No file selected!');
//         return;
//       }

//       let file: File = event.target.files[0];
//       console.log('Uploaded File:', file);
//       var reader = new FileReader();
//       let imagepath = <string>this.GraphListIndex;
//       reader.onloadend = function () {
//         let image = <HTMLInputElement>document.getElementById(imagepath);
//         console.log('Image Path:', image);
//         image.src = reader.result as string;
//       };
//       // this.chartData = undefined
//       reader.readAsDataURL(file);
//     }
//     console.log("chrt data...", this.chartData)
//   }

//   getChartData(value) {
//     this.chartData = value
//   }
// }

export class PhaseTwoComponent implements OnInit, OnChanges {
  title = "PDCA"
  voiceCurrentState: Boolean = false;
  voicePDCA: Boolean = false;
  showModal = false;
  cardShow = true;
  cardHide = false;
  colorModal = false;
  modal = false;
  flagg = true;
  up = true;
  down = false;
  showMicForPDCA = false;
  showMicForCurrentState = false;
  showSnakeBar: Boolean;
  selectiveIndex: number;
  graphColor: any
  graphColors: any
  showLightModal: Boolean = false;
  showCardGreen: Boolean = false;
  showCardRed: Boolean = true;
  showCardYellow: Boolean = false;
  showCardBlue: Boolean = false;
  showChartModal: Boolean = false;
  currentStateShowModal: Boolean = false;
  pdcaShowModal: Boolean = false;
  chartData: any;
  listOfPDCA: any[] = [];
  listOfCurrentState: any[] = [];
  listOfOwnerDetails: any[] = [];
  measurementName: string = '';
  measurementOwner: string = '';
  measurementScope: string = '';
  measurementDataSource: string = '';
  measurementTarget: string = ''
  measurementActual: string = ''
  results: string[] = []

  currentStatesPhases: Array<WorkImprovementCurrentStates> = []
  currentStatesOpenedPhases: number = 0
  pdcaPhases: Array<WorkImprovementPDCAStatement> = []
  measurementData: WorkMeasurementData = new WorkMeasurementData(
    null, { name: null, userId: null }, null, null, null, null,
    new WorkMeasurementGraphData([], null, null), [], []
  )
  pdcaPhasesOpenedPhases: number = 0

  @Input() selectedRowIndex: number
  @Output() hideSelectedRow = new EventEmitter<any>()
  @Output() pushColorToMainParentSpan = new EventEmitter<String>();
  @Output() sendMeasurementData: EventEmitter<MeasurementDataWithIndex> = new EventEmitter<MeasurementDataWithIndex>()
  @Output() sendShowModal = new EventEmitter();
  @Input() GraphList;
  @Input() GraphListIndex;
  @Input() lockstatus: Boolean = false;
  @Input() workMeasurementData: WorkMeasurementData


  constructor(private voiceToTextService: VoiceToTextServiceService) {
    this.voiceToTextService.init()
    voiceToTextService.text = '';
  }
  fillMeasurementPDCAStatements() {
    if (!this.listOfPDCA || this.listOfPDCA.length == 0) {
      if (this.workMeasurementData.pdca) {
        this.workMeasurementData.pdca.forEach(pdca => {
          this.pdcaPhases.push(new WorkImprovementPDCAStatement(pdca.text,
            new PageDataManagementRailRaiting(pdca?.rating?.color, pdca?.rating?.note, pdca?.rating?.opportunity,
              {
                id: pdca?.rating?.task?.id,
                task: pdca?.rating?.task?.task,
                contributor: { name: pdca?.rating?.task?.contributor?.name, userId: pdca?.rating?.task?.contributor?.userId },
                notes: pdca?.rating?.task?.notes,
                owner: { userId: pdca?.rating?.task?.owner?.userId, name: pdca?.rating?.task?.owner?.name },
                priority: pdca?.rating?.task?.priority,
                status: pdca?.rating?.task?.status,
                dueDate: pdca?.rating?.task?.dueDate
              },
              {
                date: pdca?.rating?.decision?.date,
                owner: { name: pdca?.rating?.decision?.owner?.name, userId: pdca?.rating?.decision?.owner?.userId },
                summary: pdca?.rating?.decision?.summary
              }
            ), pdca.seqNumber))
          this.listOfPDCA.push({ color: pdca?.rating?.color, showModal: false, value: pdca.text })
        })
        this.measurementData.pdca = this.pdcaPhases
        this.sendMeasurementData.emit({ index: this.selectedRowIndex, data: this.measurementData })
      }
    }
  }
  fillMeasurementCurrentStatements() {
    if (!this.listOfCurrentState || this.listOfCurrentState.length == 0) {
      if (this.workMeasurementData.currentStates) {
        this.workMeasurementData.currentStates.forEach(cs => {
          this.listOfCurrentState.push({ color: cs?.rating?.color, showModal: false, value: cs?.text })
          this.currentStatesPhases.push(new WorkImprovementCurrentStates(cs?.text,
            new PageDataManagementRailRaiting(cs?.rating?.color, cs?.rating?.note, cs?.rating?.opportunity,
              {
                id: cs?.rating?.task?.id,
                task: cs?.rating?.task?.task,
                contributor: { name: cs?.rating?.task?.contributor?.name, userId: cs?.rating?.task?.contributor?.userId },
                notes: cs?.rating?.task?.notes,
                owner: { userId: cs?.rating?.task?.owner?.userId, name: cs?.rating?.task?.owner?.name },
                priority: cs?.rating?.task?.priority,
                status: cs?.rating?.task?.status,
                dueDate: cs?.rating?.task?.dueDate
              },
              { date: cs?.rating?.decision?.date, owner: { name: cs?.rating?.decision?.owner?.name, userId: cs?.rating?.decision?.owner?.userId }, summary: cs?.rating?.decision?.summary }
            ), cs?.seqNumber))
        })
        this.measurementData.currentStates = this.currentStatesPhases
        this.sendMeasurementData.emit({ index: this.selectedRowIndex, data: this.measurementData })
        // })
      }
    }
  }
  fillMeasurementMetaInfo() {
    this.measurementName = this.workMeasurementData?.name
    this.measurementScope = this.workMeasurementData?.scope
    this.measurementOwner = this.workMeasurementData?.owner?.name?.toString()
    this.measurementData.owner = this.workMeasurementData?.owner
    this.measurementDataSource = this.workMeasurementData?.dataSource
    this.measurementTarget = this.workMeasurementData?.target
    this.measurementActual = this.workMeasurementData?.actual
    this.getMeasurementName()
    this.getMeasurementScope()
    this.getMeasurementOwner()
    this.getMeasurementDataSource()
    this.getMeasurementTarget()
    this.getMeasurementActual()
  }
  measurementDataPopulated: boolean = false
  graphData: Array<WorkMeasurementGraphDataInputs>
  ngOnChanges(changes: SimpleChanges): void {
    
    for (const propName in changes) {
      if (propName == "workMeasurementData") {
        if (this.workMeasurementData && !this.measurementDataPopulated) {
          
          this.fillMeasurementMetaInfo()
          this.fillMeasurementPDCAStatements()
          this.fillMeasurementCurrentStatements()
          if (!this.graphData) {
            
            this.graphColor = this.workMeasurementData?.graph?.color
         
            this.graphData = this.workMeasurementData?.graph?.inputs
            this.getGraphData(this.graphData)
            this.measurementDataPopulated = true
          }
        }
      }
    }
  }

  ngOnInit(): void {
    this.listOfOwnerDetails = ['Name', 'Owner', 'Scope', 'Data Source', 'Target', 'Actual']
    //  this.listOfOwnerDetails = [{heading:'Name', val:''}, {heading:'Owner',val:''}, {heading:'Scope',val:''}, {heading:'Data Source',val:''}, {heading: 'Target', val:''}, {heading:'Actual', val:''}]
  }

  getMeasurementName() {
    this.measurementData.name = this.measurementName
    this.sendMeasurementData.emit({ index: this.selectedRowIndex, data: this.measurementData })
  }
  getMeasurementScope() {
    this.measurementData.scope = this.measurementScope
    this.sendMeasurementData.emit({ index: this.selectedRowIndex, data: this.measurementData })
  }
  getMeasurementOwner() {
    this.measurementData.owner.name = this.measurementOwner
    this.sendMeasurementData.emit({ index: this.selectedRowIndex, data: this.measurementData })
  }
  getMeasurementDataSource() {
    this.measurementData.dataSource = this.measurementDataSource
    this.sendMeasurementData.emit({ index: this.selectedRowIndex, data: this.measurementData })
  }
  getMeasurementTarget() {
    this.measurementData.target = this.measurementTarget
    this.sendMeasurementData.emit({ index: this.selectedRowIndex, data: this.measurementData })
  }
  getMeasurementActual() {
    this.measurementData.actual = this.measurementActual
    this.sendMeasurementData.emit({ index: this.selectedRowIndex, data: this.measurementData })
  }

  toggle() {
    this.flagg = !this.flagg;
    this.up = !this.up;
    this.down = !this.down;
  }

  selectedColor(val) {
    this.graphColor = val.background;
    delete val.code
    delete val.color
    val.color = val.background;
    delete val.background;
    val.color
     this.graphColors = val;
    this.measurementData.graph.color = this.graphColor
    this.measurementData.graph.rating = this.graphColors
    this.sendMeasurementData.emit({ index: this.selectedRowIndex, data: this.measurementData })
    this.showLightModal = false;
  }

  cancelMode(value) {
    console.log("cancel value....", value)
    this.showLightModal = value;
  }

  addFiledForPDCA() {
    if (this.listOfPDCA.length < 15) {
      if (this.lockstatus == false || this.lockstatus == undefined) {
        this.listOfPDCA.push({ color: '', showModal: false, value: '' })
        this.pdcaPhasesOpenedPhases++
        this.pdcaPhases.push(new WorkImprovementPDCAStatement(null,
          new PageDataManagementRailRaiting(null, null, null,
            {
              id: null,
              task: null,
              contributor: { name: null, userId: null },
              notes: null,
              owner: { userId: null, name: null },
              priority: null,
              status: null,
              dueDate: null
            },
            { date: null, owner: { name: null, userId: null }, summary: null }
          ), this.pdcaPhasesOpenedPhases.toString()))
        this.measurementData.pdca = this.pdcaPhases
        this.sendMeasurementData.emit({ index: this.selectedRowIndex, data: this.measurementData })
      }
    }
  }

  removeFieldForPDCA() {
    if (this.lockstatus == false || this.lockstatus == undefined) {
      if (this.selectiveIndex != -1) {
        this.listOfPDCA.splice(this.selectiveIndex, 1)
        this.pdcaPhases.splice(this.selectiveIndex, 1)
        this.measurementData.pdca = this.pdcaPhases
        this.sendMeasurementData.emit({ index: this.selectedRowIndex, data: this.measurementData })
        this.selectiveIndex = -1
      } else {
        this.listOfPDCA.pop();
        this.pdcaPhases.pop()
        this.measurementData.pdca = this.pdcaPhases
        this.sendMeasurementData.emit({ index: this.selectedRowIndex, data: this.measurementData })
        this.pdcaPhasesOpenedPhases--
        if (this.listOfPDCA.length == 0) {
          this.showMicForPDCA = false;
        }
      }
    }
  }

  dropMangment(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.listOfPDCA, event.previousIndex, event.currentIndex);
    moveItemInArray(this.pdcaPhases, event.previousIndex, event.currentIndex);
  }

  fetchIndexForPDCA(i: number) {
    this.selectiveIndex = i;
    this.showMicForPDCA = true;
  }

  addRatingForPDCA(i: number) {
    // if (this.listOfPDCA[i].showModal == true) {
    //   this.listOfPDCA[i].showModal = !this.listOfPDCA[i].showModal
    // } else {
    //   this.listOfPDCA.map(card => {
    //     card.showModal = false
    //   })
    //   this.listOfPDCA[i].showModal = true
    //   this.showSnakeBar = !this.showSnakeBar;
    //   this.selectiveIndex = i
    // }
    if (this.lockstatus == false || this.lockstatus == undefined) {
      this.sendShowModal.emit(true);
      if (this.GraphList[this.GraphListIndex].showModal == true) {
        if (this.listOfPDCA[i].showModal == true) {
          this.listOfPDCA[i].showModal = !this.listOfPDCA[i].showModal;
          this.pdcaShowModal = false;
        } else {
          this.listOfPDCA.map((card) => {
            card.showModal = false;
          });
          this.listOfPDCA[i].showModal = true;
          this.pdcaShowModal = true;
          this.currentStateShowModal = false;
          this.showSnakeBar = !this.showSnakeBar;
          this.selectiveIndex = i;
        }
      }
    }
  }

  setColorValueForPDCA(val: any) {
    this.listOfPDCA[this.selectiveIndex].showModal = false
    this.listOfPDCA[this.selectiveIndex].color = val
    this.showSnakeBar = !this.showSnakeBar
    this.pdcaPhases[this.selectiveIndex].rating.color = val
    this.measurementData.pdca = this.pdcaPhases
    this.sendMeasurementData.emit({ index: this.selectedRowIndex, data: this.measurementData })
  }

  getTaskForPDCA(task) {
    this.pdcaPhases[this.selectiveIndex].rating.task = task
    this.measurementData.pdca = this.pdcaPhases
    this.sendMeasurementData.emit({ index: this.selectedRowIndex, data: this.measurementData })
  }

  getDecisionForPDCA(decision) {
    this.pdcaPhases[this.selectiveIndex].rating.decision = decision
    this.measurementData.pdca = this.pdcaPhases
    this.sendMeasurementData.emit({ index: this.selectedRowIndex, data: this.measurementData })
  }

  getOpportunityForPDCA(opportunity) {
    this.pdcaPhases[this.selectiveIndex].rating.opportunity = opportunity
    this.measurementData.pdca = this.pdcaPhases
    this.sendMeasurementData.emit({ index: this.selectedRowIndex, data: this.measurementData })
  }

  getNoteForPDCA(note) {
    this.pdcaPhases[this.selectiveIndex].rating.note = note
    this.measurementData.pdca = this.pdcaPhases
    this.sendMeasurementData.emit({ index: this.selectedRowIndex, data: this.measurementData })
  }

  getGraphData(graphInputs: Array<WorkMeasurementGraphDataInputs>) {
    this.measurementData.graph.inputs = graphInputs
    this.graphData = this.measurementData.graph.inputs
    this.sendMeasurementData.emit({ index: this.selectedRowIndex, data: this.measurementData })
  }

  setPDCAValue(o, i) {
    this.pdcaPhases[i].text = o.value
    this.measurementData.pdca = this.pdcaPhases
    this.sendMeasurementData.emit({ index: this.selectedRowIndex, data: this.measurementData })
  }

  startService(event) {

    console.log("startService..." + event)
    if (event == "pdca") {
      if (this.voicePDCA == false) {
        this.voiceToTextService.start()
        this.voicePDCA = true;
        console.log("selected index is", this.selectiveIndex)
        window['listenInterval'] = setInterval(() => {
          this.listOfPDCA[this.selectiveIndex].value = this.voiceToTextService.text
          this.pdcaPhases[this.selectiveIndex].text = this.voiceToTextService.text
          this.measurementData.pdca = this.pdcaPhases
          this.sendMeasurementData.emit({ index: this.selectedRowIndex, data: this.measurementData })
        }, 500)
      } else {
        this.listOfPDCA[this.selectiveIndex].value = this.voiceToTextService.text
        this.pdcaPhases[this.selectiveIndex].text = this.voiceToTextService.text
        this.measurementData.pdca = this.pdcaPhases
        this.sendMeasurementData.emit({ index: this.selectedRowIndex, data: this.measurementData })
        clearInterval(window['listenInterval'])
        this.stopService();
      }
    } else {
      if (this.voiceCurrentState == false) {
        this.voiceToTextService.start()
        this.voiceCurrentState = true;
        console.log("selected index is", this.selectiveIndex)
        window['listenInterval'] = setInterval(() => {
          this.listOfCurrentState[this.selectiveIndex].value = this.voiceToTextService.text
          this.currentStatesPhases[this.selectiveIndex].text = this.voiceToTextService.text
          this.measurementData.currentStates = this.currentStatesPhases
          this.sendMeasurementData.emit({ index: this.selectedRowIndex, data: this.measurementData })
        }, 500)
      } else {
        this.listOfCurrentState[this.selectiveIndex].value = this.voiceToTextService.text
        this.currentStatesPhases[this.selectiveIndex].text = this.voiceToTextService.text
        this.measurementData.currentStates = this.currentStatesPhases
        this.sendMeasurementData.emit({ index: this.selectedRowIndex, data: this.measurementData })
        clearInterval(window['listenInterval'])
        this.stopService();
      }
    }
  }

  stopService() {
    if (this.voicePDCA) {
      this.voicePDCA = false;
    } else {
      this.voiceCurrentState = false;
    }
    this.voiceToTextService.stop();
  }

  addFiledForCurrentStat() {
    if (this.listOfCurrentState.length < 15) {
      if (this.lockstatus == false || this.lockstatus == undefined) {
        this.listOfCurrentState.push({ color: '', showModal: false, value: '' })
        this.currentStatesOpenedPhases++
        this.currentStatesPhases.push(new WorkImprovementCurrentStates(null,
          new PageDataManagementRailRaiting(null, null, null,
            {
              id: null,
              task: null,
              contributor: { name: null, userId: null },
              notes: null,
              owner: { userId: null, name: null },
              priority: null,
              status: null,
              dueDate: null
            },
            { date: null, owner: { name: null, userId: null }, summary: null }
          ), this.currentStatesOpenedPhases.toString()))
        this.measurementData.currentStates = this.currentStatesPhases
        this.sendMeasurementData.emit({ index: this.selectedRowIndex, data: this.measurementData })
      }
    }
  }

  removeFieldForCurrentStat() {
    if (this.lockstatus == false || this.lockstatus == undefined) {
      if (this.selectiveIndex != -1) {
        this.listOfCurrentState.splice(this.selectiveIndex, 1)
        this.currentStatesPhases.splice(this.selectiveIndex, 1)
        this.measurementData.currentStates = this.currentStatesPhases
        this.sendMeasurementData.emit({ index: this.selectedRowIndex, data: this.measurementData })
        this.selectiveIndex = -1
      } else {
        this.listOfCurrentState.pop();
        this.currentStatesPhases.pop()
        this.measurementData.currentStates = this.currentStatesPhases
        this.sendMeasurementData.emit({ index: this.selectedRowIndex, data: this.measurementData })
        this.currentStatesOpenedPhases--
        if (this.listOfCurrentState.length == 0) {
          this.showMicForCurrentState = false;
        }
      }
    }
  }

  dropCurrentStateFileds(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.listOfCurrentState, event.previousIndex, event.currentIndex);
    moveItemInArray(this.currentStatesPhases, event.previousIndex, event.currentIndex);
  }

  fetchIndexforStateFields(i: number) {
    this.selectiveIndex = i;
    this.showMicForCurrentState = true;
  }

  addRatingForCurrentState(i: number) {
    // if (this.listOfCurrentState[i].showModal == true) {
    //   this.listOfCurrentState[i].showModal = !this.listOfCurrentState[i].showModal
    // } else {
    //   this.listOfCurrentState.map(card => {
    //     card.showModal = false
    //   })
    //   this.listOfCurrentState[i].showModal = true
    //   this.showSnakeBar = !this.showSnakeBar;
    //   this.selectiveIndex = i
    // }
    if (this.lockstatus == false || this.lockstatus == undefined) {
      this.sendShowModal.emit(true);
      if (this.GraphList[this.GraphListIndex].showModal == true) {
        if (this.listOfCurrentState[i].showModal == true) {
          this.listOfCurrentState[i].showModal =
            !this.listOfCurrentState[i].showModal;
          this.currentStateShowModal = false;
        } else {
          this.listOfCurrentState.map((card) => {
            card.showModal = false;
          });
          this.listOfCurrentState[i].showModal = true;
          this.currentStateShowModal = true;
          this.pdcaShowModal = false;
          this.showSnakeBar = !this.showSnakeBar;
          this.selectiveIndex = i;
        }
      }
    }
  }

  setColorValueForCurrentStat(val: any) {
    this.listOfCurrentState[this.selectiveIndex].showModal = false
    this.listOfCurrentState[this.selectiveIndex].color = val
    this.currentStatesPhases[this.selectiveIndex].rating.color = val
    this.measurementData.currentStates = this.currentStatesPhases
    this.sendMeasurementData.emit({ index: this.selectedRowIndex, data: this.measurementData })
    // this.showSnakeBar = !this.showSnakeBar
  }

  getNoteForCurrentState(note) {
    this.currentStatesPhases[this.selectiveIndex].rating.note = note
    this.measurementData.currentStates = this.currentStatesPhases
    this.sendMeasurementData.emit({ index: this.selectedRowIndex, data: this.measurementData })
  }

  getOpportunityForCurrentState(opportunity) {
    this.currentStatesPhases[this.selectiveIndex].rating.opportunity = opportunity
    this.measurementData.currentStates = this.currentStatesPhases
    this.sendMeasurementData.emit({ index: this.selectedRowIndex, data: this.measurementData })
  }

  getTaskForCurrentState(task) {
    this.currentStatesPhases[this.selectiveIndex].rating.task = task
    this.measurementData.currentStates = this.currentStatesPhases
    this.sendMeasurementData.emit({ index: this.selectedRowIndex, data: this.measurementData })
  }

  getDecisionForCurrentState(decision) {
    this.currentStatesPhases[this.selectiveIndex].rating.decision = decision
    this.measurementData.currentStates = this.currentStatesPhases
    this.sendMeasurementData.emit({ index: this.selectedRowIndex, data: this.measurementData })
  }

  setCurrentStateValue(o, i) {
    this.currentStatesPhases[i].text = o.value
    this.measurementData.currentStates = this.currentStatesPhases
    this.sendMeasurementData.emit({ index: this.selectedRowIndex, data: this.measurementData })
  }

  openColorModal() {
    console.log(this.colorModal)
    console.log(this.modal)
    this.colorModal = true;
    this.modal = true;
  }

  fetchColor(val: any) {

    this.graphColor = val;
    this.modal = false;
    this.showLightModal = false;
    this.showCardRed = false;

    if (val == "#00FF00") {
      this.showCardGreen = true;
    } else if (val == '#FFFF00') {
      this.showCardYellow = true;
    } else if (val == '#FF0000') {
      this.showCardRed = true;
    } else {
      this.showCardBlue = true;
    }
  }

  addGraphValueModal() {
    this.showChartModal = true;
  }

  fetchFlag(val: Boolean) {

    this.showChartModal = val;
  }

  openLightCard() {
    console.log("open loight cardddddddddddd")
    this.showLightModal = !this.showLightModal;
  }

  importFile(event) {


    if (this.lockstatus == false || this.lockstatus == undefined) {
      this.chartData = undefined
      if (event.target.files.length == 0) {
        console.log('No file selected!');
        return;
      }

      let file: File = event.target.files[0];
      console.log('Uploaded File:', file);
      var reader = new FileReader();
      let imagepath = <string>this.GraphListIndex;
      reader.onloadend = function () {
        let image = <HTMLInputElement>document.getElementById(imagepath);
        console.log('Image Path:', image);
        image.src = reader.result as string;
      };
      // this.chartData = undefined
      reader.readAsDataURL(file);
    }
    console.log("chrt data...", this.chartData)
  }

  getChartData(value) {
    this.chartData = value
  }
}
