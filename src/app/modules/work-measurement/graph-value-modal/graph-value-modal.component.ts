import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { WorkMeasurementGraphDataInputs } from "../../../models/work-measurement/work-measurement";


@Component({
  selector: 'app-graph-value-modal',
  templateUrl: './graph-value-modal.component.html',
  styleUrls: ['./graph-value-modal.component.css']
})
export class GraphValueModalComponent implements OnInit, OnChanges {

  date: Date;
  listOfDateValues: any[] = [];
  graphDataInputs: Array<WorkMeasurementGraphDataInputs> = []
  saveListOfGrpahValues: any[] = [];
  @Input() binding;
  @Input() displayChartModal: Boolean
  @Input() graphData: Array<WorkMeasurementGraphDataInputs>
  @Output() onCancel = new EventEmitter<Boolean>();
  @Output() chartData = new EventEmitter<any>();
  @Output() sendGraphInputs: EventEmitter<Array<WorkMeasurementGraphDataInputs>> = new EventEmitter<Array<WorkMeasurementGraphDataInputs>>()

  constructor() {
  }

  ngOnInit(): void {
    this.fillMeasurementGraph()
    if (!this.graphDataPopulated)
      this.addFileds()
  }
  graphDataPopulated: boolean = false
  fillMeasurementGraph() {
    if (!this.graphDataPopulated) {
      this.graphDataInputs = []
      this.listOfDateValues = []
      this.graphDataPopulated = true
      this.graphData.forEach(graphInput => {
        this.listOfDateValues.push({ date: graphInput?.date ? new Date(graphInput?.date) : null, target: graphInput?.target, actual: graphInput?.actual })
        this.graphDataInputs.push(new WorkMeasurementGraphDataInputs(graphInput?.date, graphInput?.target, graphInput?.actual));
      })
      this.sendGraphInputs.emit(this.graphDataInputs)
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    for (const propName in changes) {
      if (propName == "graphData") {
        if (this.graphData) {
          this.fillMeasurementGraph()
        }
      }
    }
  }

  saveDate(obj, i) {
    this.graphDataInputs[i].date = obj.date
  }

  saveTarget(obj, i) {
    this.graphDataInputs[i].target = obj.target
  }

  saveActual(obj, i) {
    this.graphDataInputs[i].actual = obj.actual
  }

  addFileds() {
    this.listOfDateValues.push({ date: '', target: '', actual: '' })
    this.graphDataInputs.push(new WorkMeasurementGraphDataInputs(null, null, null));
  }

  removeFields() {
    this.listOfDateValues.pop()
    this.graphDataInputs.pop()
  }

  savegraphValues() {
    this.printgraphValues();
    this.onCancel.emit(false)
    console.log("graph values , ", this.listOfDateValues)
    this.chartData.emit(this.listOfDateValues)
    this.sendGraphInputs.emit(this.graphDataInputs)
    // this.listOfDateValues
  }

  printgraphValues() {

    //  for(let listItem of this.listOfDateValues){
    //    console.log(listItem)
    // }


    this.listOfDateValues.forEach((listItem) => {
      console.log(listItem)
      // console.log("listItem.value....", listItem.date)
      // console.log("listItem.value....", listItem.actual)
      // console.log("listItem.value....", listItem.target)
    })
  }

  closeModal() {

    this.onCancel.emit(false)
  }
}
