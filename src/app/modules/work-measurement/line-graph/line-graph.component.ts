import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { MessageService, Message } from 'primeng/api';
import { ChartModule } from 'primeng/chart';
// import {}

interface Graph {
  labels: Array<number>,
  datasets: Array<GraphData>
}
interface GraphData {
  label: String,
  data: Array<number>,
  fill: Boolean,
  borderColor: String,
  borderDash?: Array<number>,
  tension?: number
}

@Component({
  selector: 'app-line-graph',
  templateUrl: './line-graph.component.html',
  styleUrls: ['./line-graph.component.css'],
  providers: [MessageService]
})
export class LineGraphComponent implements OnInit, OnChanges {

  data: Graph;
  lineStylesData: any;

  @Input() graphValues: any[]

  targetData: Array<number> = []
  actualData: Array<number> = []
  dateData: Array<number> = []
  constructor(private messageService: MessageService) {
    console.log("constructor  lineGraph..",this.graphValues)
    // this.data = {
    //   labels: [434,435,428,429,427,450,400,500,600],
    //   datasets: [
    //     {
    //       label: 'Target',
    //       data: [0.90,100,115,180,198,200,225,250,280,300],
    //       // data: [],
    //       fill: false,
    //       borderColor: "red",
    //     },
    //     {
    //       label: 'Actual',
    //       data: [0.90,0.89,1.88,0.80,1.2,3.5],
    //       // data: [],
    //       fill: false,
    //       borderColor: '#565656'
    //     },
    //     {
    //       label: 'User Actual',
    //       data: [3,207,2.4,2.0,1.8,1.6,1.2,0.95,1],
    //       // data: [],
    //       fill: false,
    //       borderColor: '#565656',
    //       borderDash: [3, 3],
    //       tension: .4,
    //     }
    //   ]
    // }
  }
  ngOnInit(): void {
      console.log("ngonit  lineGraph..",this.graphValues)
      this.setGraphValues()

  }

  ngOnChanges(changes: SimpleChanges): void {

    this.data = {
      labels: [434,435,428,429,427,450,400,500,600],
      datasets: [
        {
          label: 'Target',
          data: [],
          fill: false,
          borderColor: "red",
        },
        {
          label: 'Actual',
          data: [],
          fill: false,
          borderColor: '#565656'
        },
        {
          label: 'User Actual',
          data: [],
          fill: false,
          borderColor: '#565656',
          borderDash: [3, 3],
          tension: .4,
        }
      ]
    }
    this.graphValues = changes['graphValues'].currentValue
    console.log("changes['graphValues'].currentValue",changes['graphValues'].currentValue)
    if (this.graphValues != null){
      this.graphValues.forEach(value => {
        this.data.datasets[0].data.push(Number(value.target))
        this.data.datasets[1].data.push(Number(value.actual))
        // this.data.datasets[3].data.push(Number(value.date))
      })
    }
  }

  setGraphValues() {
    console.log("entry leveal", this.graphValues)
    this.graphValues.forEach(function (value) {
         console.log("...in loop...", value)
    })
  }

  selectData(event) {
    this.messageService.add({
      severity: 'info',
      summary: 'Data Selected',
      detail: this.data.datasets[event.element._datasetIndex].data[event.element._index].toString()
    });
  }
  options = {
    responsive: false,
    maintainAspectRatio: false
  };
}
