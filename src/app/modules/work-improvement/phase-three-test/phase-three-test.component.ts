import { Component, OnInit } from '@angular/core';
import { arrow } from '@popperjs/core';
import { DateService } from 'src/app/services/common/date.service';

@Component({
  selector: 'app-phase-three-test',
  templateUrl: './phase-three-test.component.html',
  styleUrls: ['./phase-three-test.component.css']
})
export class PhaseThreeTestComponent implements OnInit {

  showModal:Boolean = false;
  statusCard : Boolean = true;
  showSnakeBar: Boolean = true;
  emptyDivStatus: Boolean = true;
  userText: string = ''
  mainPlanUserValue: string = ''
  selectedAssignee:string = ''
  selectiveIndex: number;
  selectiveSubPlanIndex: number
  subPlanStepsStatus:Boolean = false;

  up = true;
  down = false;
  listofdategantchart = []
  listOfGraphBoxes = []
  listOfmainPlanSteps= []
  listOfGantChartWithMainplanSteps= []
  dropDownList=[]
  tickMarkBtnStatus = []
  constructor(public dateService: DateService,) { }

  ngOnInit(): void {
    var date = new Date();
    for (let index = 0; index < 15; index++) {
      this.listofdategantchart.push(this.dateService.mdyFormatter(date))
      date.setDate(date.getDate() + 1);
    }

    for (let index = 0; index < 15; index++) {
      this.listOfGraphBoxes.push("");
    }

    this.listOfmainPlanSteps = []

    this.dropDownList = [
      {name:'Assign To', case: '1'},
      {name:'Oliver', case: '2'},
      {name:'William', case: '3'},
      {name:'Benjamin', case: '4'}
    ]
    this.tickMarkBtnStatus = [
      {
        color: {background: '#FFFF00'},
        active: false,
        button1: true,
        button2: false,
        disabled: false,
        mainPlanUserValue: ''
      },
      {
        color: {background: '#FFFF00'},
        active: true,
        button1: true,
        button2: false,
        disabled: false,
        mainPlanUserValue: ''
      }
    ]
    // this.outComeButtonsDictionery = [
    //   { color: { background: '#FFFF00' }, active: false, button1: true, button2: false, disabled: false },
    //   { color: { background: '#95F204' }, active: true, button1: true, button2: false, disabled: false },
    // ]
  }
  toggle() {
    this.statusCard = !this.statusCard;
    this.up = !this.up;
    this.down = !this.down;
  }
  addinitiatives() {

  }
  deleteInitiative() {

  }
  addMainPlan () {
    if(this.listOfmainPlanSteps.length < 3) {
      this.listOfGantChartWithMainplanSteps.push('');
      this.tickMarkBtnStatus.map(val => {
        if(val.active === true) {
          this.listOfmainPlanSteps.push({
            color: {background: val.background},
            active: val.active,
            button1: val.button1,
            button2: val.button2,
            disabled: val.disabled,
            mainPlanUserValue: '',
            subMainPlanSteps: [],
            subMainPlanGraph:[],
            subPlanStatus: false
          });
          val.active = false;
        } else {
          val.active = true;
        }
      })
      console.log("After...",this.listOfmainPlanSteps)
    }
  }
  removeMainPlan () {
    this.listOfmainPlanSteps.pop();
    this.listOfGantChartWithMainplanSteps.pop();
  }
  setColorValueForMainPlan(evenet) {
    this.showModal = !this.showModal;
  }
  onchange(event) {

  }
  boxHide(fc: any) {
    console.log(fc)
    fc.button1 = false
    fc.button2 = true;
  }
fetchCurrentIndex(index: number) {
   this.selectiveIndex = index
  //  this.listOfmainPlanSteps[index].mainPlanUserValue = mainPlanUserValue
}
fetchCurrentIndexForSubMainlan(index: number ) {
  this.selectiveSubPlanIndex = index
}
openSubMainPlanSteps (i) {

  this.listOfmainPlanSteps[i].subPlanStatus = true;
  this.subPlanStepsStatus = true;
  if(this.listOfmainPlanSteps[i].subMainPlanSteps.length < 3) {
    this.listOfmainPlanSteps[i].subMainPlanSteps.push('');
    this.listOfmainPlanSteps[i].subMainPlanGraph.push(' ');
  }
}
}
