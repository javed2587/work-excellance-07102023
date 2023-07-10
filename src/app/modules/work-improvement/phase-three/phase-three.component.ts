import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';

import { DateService } from 'src/app/services/common/date.service';
import { PhaseThreeService } from 'src/app/services/work-improvement/phase-three/phase-three.service';
import initiativejsondata from 'src/assets/initiativeData.json';
import {
  WorkImprovementInitiatives,
  WorkImprovementPotentialPlanBarriers,
} from '../../../models/work-improvement/work-improvment';
import { UserService } from 'src/app/services/user/user.service';
import { User } from 'src/app/models/user/user';

@Component({
  selector: 'app-phase-three',
  templateUrl: './phase-three.component.html',
  styleUrls: ['./phase-three.component.css'],
})
export class PhaseThreeComponent implements OnChanges, OnInit, OnDestroy {
  @Input() main_page_start_date: any;
  @Input() main_page_interval: any;
  @Input() main_page_frequencey: any;
  @Output() sendPhaseThreeModalFlag = new EventEmitter();
  @Input() phaseOneModalFlag;
  @Input() phaseTwoModalFlag;
  @Input() phaseThreeModalFlag;
  @Input() phaseFourModalFlag;
  @Input() phaseFiveModalFlag;
  @Input() lockstatus: Boolean = false;

  // main_page_start_date: any;
  // main_page_interval: any;
  // main_page_frequencey: any;

  main_page_end_date: any;
  end_date_type = 'date';
  end_date_step = 1;
  Object = Object;

  initiatives: any = [];

  //This variable used for keeping track of initiatives added initially 0 because of no initiative
  number_of_initiatives = 0;
  //this list contains all the data include initiative ,its subchild and subtosub child the strucure is look like this
  //data:any;
  //This variable is used for lastelement of the array while adding new subinitiative or subtosubinitiative
  lastEelement: any;
  //These variables are used set the value of completed initiatives,subinitiatives,subtosubinitiatives
  display_showCompleteModel = false;
  checkBoxValue: any = false;
  indexcheckbox: number;
  indcheckbox: number;
  check = '';
  childindex: number;
  subindex: number;
  //These variables is used for deleteing the row
  //This variable is used for index of initiative come from front-end
  deleteind: number;
  //This variable is used for index of initiative.initiativevalues come from front-end
  deleteindex: number;
  //This variable is used for index of initiative.initiativevalues.subinitiatives come from front-end
  deletechildren: number;
  //This variable is used for index of initiative.initiativevalues.subinitiatives.subtosubinitiatives come from front-end
  childtochilddelete: number;
  //This variable is used for keeping track of which row need to be deleted it has three predefind value (parentintiativeDelete,subintiativeDelete,subotsubintiativeDelete)
  checkportion: string;
  workImprovementInitiatives: Array<WorkImprovementInitiatives> = [];
  @Output() onSavePage: EventEmitter<void> = new EventEmitter<void>();
  @Output() sendWorkImprovementInitiatives: EventEmitter<
    Array<WorkImprovementInitiatives>
  > = new EventEmitter<Array<WorkImprovementInitiatives>>();
  @Input() workImprovmentInitiatives: Array<WorkImprovementInitiatives>;

  constructor(
    public dateService: DateService,
    public phaseThreeService: PhaseThreeService,
    public userService: UserService
  ) {
    //--------------------SERVICE--------------------------
    // phaseThreeService.getInitiativeDetail().subscribe((responseData) => {
    //   this.initiatives = responseData;
    //   this.number_of_initiatives = this.initiatives.length;
    // });
    // this.initiatives = initiativejsondata;

    var date = new Date();
    for (let index = 0; index < 14; index++) {
      this.listofdategantchart.push(dateService.mdyFormatter(date));
      date.setDate(date.getDate() + 1);
    }
  }

  users: User[] = []

  setUserNameOfUsers() {
    if (this.users.length > 0) {
      this.users.forEach((m, i) => {
        if (!m.username && (m.firstName || m.lastName)) {
          if (m.firstName) m.username = m.firstName.valueOf();
          else m.username = '';
          if (m.lastName) m.username = m.username + ' ' + m.lastName;
        }
        if (!m.username) m.username = '';
      });
    }
  }

  getUsers() {
    this.userService.findAll().subscribe((users: User[]) => {
      if (users) {
        this.users = users
        this.setUserNameOfUsers()
      }
    })
  }

  ngOnInit(): void {
    this.getUsers()
    // this.dateService.passValue.subscribe(value => {
    //
    //   this.main_page_start_date = value.sDate
    //   this.main_page_interval = value.interval
    //   this.main_page_frequencey = value.freq
    //   console.log("sdate......." + this.main_page_start_date)
    //   console.log("interva........." + this.main_page_interval)
    //   console.log("frequecy......" + this.main_page_frequencey)
    // })
  }

  ngOnDestroy(): void { }

  initiativesPopulated: Boolean = false;
  ngOnChanges(changes: SimpleChanges): void {
    for (const propName in changes) {
      if (propName == 'workImprovmentInitiatives') {
        if (this.workImprovmentInitiatives && !this.initiativesPopulated) {
          this.workImprovmentInitiatives.forEach((ini, iniIndex) => {
            this.workImprovementInitiatives.push(
              new WorkImprovementInitiatives(ini?.name,
                ini?.planSteps?.map(step => {
                  return {
                    assignee: step?.assignee,
                    endDate: step?.endDate,
                    isCompleted: step?.isCompleted,
                    seqNumber: step?.seqNumber,
                    startDate: step?.startDate,
                    step: step?.step,
                    rating: { color: step?.rating?.color, note: step?.rating?.note, opportunity: step?.rating?.opportunity, decision: step?.rating?.decision, task: step?.rating?.task },
                    planSteps: step.planSteps ? step.planSteps : []
                  }
                }))
            );
            // debugger
            this.updateInitiatives(this.workImprovementInitiatives)
          });
          this.initiativesPopulated = true;
          this.sendWorkImprovementInitiatives.emit(this.workImprovementInitiatives);
        }
      }
    }

    if (this.main_page_frequencey == 'Daily') {
      this.end_date_step = 1;
      this.end_date_type = 'date';
      var date = new Date(this.main_page_start_date);
      this.listofdategantchart = [];
      for (let index = 0; index < 13; index++) {
        this.listofdategantchart.push(this.dateService.mdyFormatter(date));
        date.setDate(date.getDate() + 1);
      }
    } else if (this.main_page_frequencey == 'Weekly') {
      this.listofdategantchart = [];
      this.end_date_type = 'date';
      var date = new Date(this.main_page_start_date);
      this.end_date_step = 7;
      for (let index = 0; index < 20; index++) {
        this.listofdategantchart.push(this.dateService.mdyFormatter(date));
        date.setDate(date.getDate() + 7);
      }
    } else if (this.main_page_frequencey == 'Bi-Weekly') {
      this.listofdategantchart = [];
      this.end_date_type = 'date';
      var date = new Date(this.main_page_start_date);
      this.end_date_step = 14;
      for (let index = 0; index < 13; index++) {
        this.listofdategantchart.push(this.dateService.mdyFormatter(date));
        date.setDate(date.getDate() + 14);
      }
    } else if (this.main_page_frequencey == 'Monthly') {
      this.end_date_step = 1;
      this.end_date_type = 'month';
      this.listofdategantchart = [];
      var date = new Date(this.main_page_start_date);
      for (let index = 0; index < 13; index++) {
        this.listofdategantchart.push(this.dateService.mdyFormatter(date));
        date = this.dateService.addNoOfMonths(date, 1);
      }
      this.end_date_of_listofdategantchart =
        this.dateService.ymdStringFormatter(
          this.listofdategantchart[this.listofdategantchart.length - 1]
        );
    } else if (
      this.main_page_interval == '3' &&
      this.main_page_frequencey == 'Quarterly'
    ) {
      this.end_date_step = 1;
      this.end_date_type = 'month';
      this.listofdategantchart = [];
      var date = new Date(this.main_page_start_date);
      for (let index = 0; index < 1; index++) {
        this.listofdategantchart.push(this.dateService.mdyFormatter(date));
        date = this.dateService.addNoOfMonths(date, 3);
      }
      this.end_date_of_listofdategantchart =
        this.dateService.ymdStringFormatter(
          this.listofdategantchart[this.listofdategantchart.length - 1]
        );
    } else if (
      this.main_page_interval == '6' &&
      this.main_page_frequencey == 'Quarterly'
    ) {
      this.end_date_step = 1;
      this.end_date_type = 'month';
      this.listofdategantchart = [];
      var date = new Date(this.main_page_start_date);
      for (let index = 0; index < 2; index++) {
        this.listofdategantchart.push(this.dateService.mdyFormatter(date));
        date = this.dateService.addNoOfMonths(date, 3);
      }
      this.end_date_of_listofdategantchart =
        this.dateService.ymdStringFormatter(
          this.listofdategantchart[this.listofdategantchart.length - 1]
        );
    } else if (
      this.main_page_interval == '9' &&
      this.main_page_frequencey == 'Quarterly'
    ) {
      this.end_date_step = 1;
      this.end_date_type = 'month';
      this.listofdategantchart = [];
      var date = new Date(this.main_page_start_date);
      for (let index = 0; index < 3; index++) {
        this.listofdategantchart.push(this.dateService.mdyFormatter(date));
        date = this.dateService.addNoOfMonths(date, 3);
      }
      this.end_date_of_listofdategantchart =
        this.dateService.ymdStringFormatter(
          this.listofdategantchart[this.listofdategantchart.length - 1]
        );
    } else if (
      this.main_page_interval == '12' &&
      this.main_page_frequencey == 'Quarterly'
    ) {
      this.end_date_step = 1;
      this.end_date_type = 'month';
      this.listofdategantchart = [];
      var date = new Date(this.main_page_start_date);
      for (let index = 0; index < 4; index++) {
        this.listofdategantchart.push(this.dateService.mdyFormatter(date));
        date = this.dateService.addNoOfMonths(date, 3);
      }
      this.end_date_of_listofdategantchart =
        this.dateService.ymdStringFormatter(
          this.listofdategantchart[this.listofdategantchart.length - 1]
        );
    }
    if (
      this.main_page_interval == '3' &&
      this.main_page_frequencey == 'Weekly'
    ) {
      var date = new Date(this.main_page_start_date);
      this.listofdategantchart = [];
      this.end_date_type = 'date';
      var date = new Date(this.main_page_start_date);
      this.end_date_step = 7;

      for (let index = 0; index < 12; index++) {
        this.listofdategantchart.push(
          this.dateService.mdyFormatter(new Date(date))
        );
        this.dateService.addNoOfDays(date, 7);
      }
    }
    if (
      this.main_page_interval == '6' &&
      this.main_page_frequencey == 'Weekly'
    ) {
      this.listofdategantchart = this.listofdategantchart = [];
      this.end_date_type = 'date';
      var date = new Date(this.main_page_start_date);
      this.end_date_step = 7;

      for (let index = 0; index < 26; index++) {
        this.listofdategantchart.push(this.dateService.mdyFormatter(date));
        date = this.dateService.addNoOfDays(date, 14);
      }
    }
    // if (this.main_page_interval == "9" && this.main_page_frequencey == "Weekly") {
    //   this.listofdategantchart = this.listofdategantchart = []
    //   this.end_date_type = 'date'
    //   var date = new Date(this.main_page_start_date);
    //   this.end_date_step = 7;

    //   for (let index = 0; index < 13; index++) {

    //     this.listofdategantchart.push(this.dateService.mdyFormatter(date))
    //     date = this.dateService.addNoOfDays(date, 21);
    //   }
    // }
    // if (this.main_page_interval == "12" && this.main_page_frequencey == "Weekly") {
    //   this.listofdategantchart = this.listofdategantchart = []
    //   this.end_date_type = 'date'
    //   var date = new Date(this.main_page_start_date);
    //   this.end_date_step = 28;

    //   for (let index = 0; index < 13; index++) {

    //     this.listofdategantchart.push(this.dateService.mdyFormatter(date))
    //     date = this.dateService.addNoOfDays(date, 28);
    //   }
    // }
    this.end_date_of_listofdategantchart = this.dateService.ymdStringFormatter(
      this.listofdategantchart[this.listofdategantchart.length - 1]
    );
    if (
      this.main_page_interval == '12' &&
      this.main_page_frequencey == 'Monthly'
    ) {
      this.listofdategantchart = this.listofdategantchart = [];
      this.end_date_type = 'month';
      var date = new Date(this.main_page_start_date);
      this.end_date_step = 1;
      for (let index = 0; index < 12; index++) {
        if (index == 11) {
          this.listofdategantchart.push('');
        } else {
          this.listofdategantchart.push(this.dateService.mdyFormatter(date));
          date.setDate(date.getDate());
          date = this.dateService.addNoOfMonths(date, 1);
        }
        this.end_date_of_listofdategantchart =
          this.dateService.ymdStringFormatter(
            this.listofdategantchart[this.listofdategantchart.length - 2]
          );
      }
    }
  }

  updateInitiatives(initiatives: Array<WorkImprovementInitiatives>) {
    this.initiatives = []
    initiatives.forEach((ini, iniIndex) => {
      this.initiatives.push({
        id: iniIndex,
        index: this.numToSS(iniIndex),
        initiativename: ini.name ? ini?.name + ' ' + iniIndex : iniIndex,
        inititiative_textarea: ini?.name,
        display_flag: true,
        initiativevalues: ini.planSteps.map((i, ind) => {
          return {
            key: ind+1,
            initiativeInput: i?.step,
            assign_to: i?.assignee,
            rating: i?.rating,
            displayRatingModel: false,
            initiativeComplete: i.isCompleted,
            value: { initiativeComplete: i.isCompleted, subinitiative: i.planSteps ? i.planSteps.map(planStep => {
              return {
                subinitiativekey: planStep.seqNumber,
                rating: planStep.rating,
                subinitiativeinitiativeInput: planStep?.step,
                subinitiativeassign_to: planStep?.assignee,
                subinitiativeComplete: planStep.isCompleted,
                subinitiativedisplayRatingModel: false,
                subtosubinitiative: planStep.planSteps ? planStep.planSteps.map(subPlanStep => {
                  return {
                    subtosubinitiativekey: subPlanStep.seqNumber,
                    rating: subPlanStep?.rating,
                    subtosubinitiativeInput: subPlanStep?.step,
                    subtosubinitiativeassign_to: subPlanStep?.assignee,
                    subtosubinitiativeComplete: subPlanStep?.isCompleted,
                    subtosubinitiativedisplayRatingModel: false
                  }
                }) : []
              }
            }) : [] }
          }
        })
      })
    });
    debugger
  }

  // This function is used for converting index of initiative(1,2,3,4...) from number to string(A,B,C,D...)
  numToSS(num: any) {
    let columnLetter = '',
      tempVariable: any;
    while (num > 0) {
      tempVariable = (num - 1) % 26;
      columnLetter = String.fromCharCode(65 + tempVariable) + columnLetter;
      num = ((num - tempVariable) / 26) | 0;
    }
    return columnLetter || undefined;
  }

  //Dummy Data
  // {
  //   index: this.numToSS(this.number_of_initiatives),
  //   initiativename: 'lorem Ipsum',
  //   display_flag: true,
  //   initiativevalues:
  //     [
  //       {
  //         key: 1,
  //         value: {
  //           initiativeComplete: false,
  //           initiativeGantChart:[1,2,3,4,5,6,7,8,9,10,11,12,13],
  //           subinitiative: [

  //              {
  //                subinitiativekey:1 +'.1',
  //                subinitiativeGantChart:[1,2,3,4,5,6,7,8,9,10,11,12,13],
  //               subinitiativeComplete:false,

  //                subtosubinitiative:[
  //                 {
  //                  subtosubinitiativekey:1+'.1.1',
  //                    subtosubinitiativeComplete:false,
  //                    subtosubinitiativeGantChart:[1,2,3,4,5,6,7,8,9,10,11,12,13]
  //                  }

  //               ]

  //              },

  //           ],

  //         },
  //       }
  //     ]
  // }

  //This function is used for adding new initiative in the initiative array
  addinitiatives() {
    if (this.lockstatus == false || this.lockstatus == undefined) {
      this.number_of_initiatives = this.number_of_initiatives + 1;
      this.workImprovementInitiatives.push(
        new WorkImprovementInitiatives(null, [
          {
            endDate: null,
            assignee: { name: null, userId: null },
            startDate: null,
            seqNumber: '1',
            step: null,
            isCompleted: false,
            rating: { color: null, task: null, opportunity: null, decision: null, note: null },
            planSteps: []
          },
        ])
      );
      this.sendWorkImprovementInitiatives.emit(this.workImprovementInitiatives);
      this.initiatives.push({
        id: this.number_of_initiatives,
        index: this.numToSS(this.number_of_initiatives),
        initiativename: 'lorem Ipsum' + this.number_of_initiatives,
        inititiative_textarea: '',
        display_flag: true,
        initiativevalues: [
          {
            key: 1,
            initiativeInput: '',
            assign_to: 'Assign to',
            displayRatingModel: false,
            colorValue: 'white',
            value: {
              initiativeComplete: false,
              initiativeGantChart: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
              subinitiative: [],
            },
          },
        ],
      });
    }
  }

  //This function is used for adding the parent initiative into the initiative
  addparentinitiative(ind: any, index: number, key: number) {
    if (this.lockstatus == false || this.lockstatus == undefined) {
      key = parseInt(key.toString()) + 1;
      this.workImprovementInitiatives[ind].planSteps.push({
        step: null,
        startDate: null,
        endDate: null,
        isCompleted: null,
        assignee: { name: null, userId: null },
        seqNumber: key.toString(),
        rating: { color: null, task: null, opportunity: null, decision: null, note: null },
        planSteps: []
      });
      this.sendWorkImprovementInitiatives.emit(this.workImprovementInitiatives);

      this.initiatives[ind].initiativevalues.push({
        key: key,
        initiativeInput: '',
        assign_to: 'Assign to',
        displayRatingModel: false,
        colorValue: 'white',
        value: {
          initiativeComplete: false,
          initiativeGantChart: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
          subinitiative: [],
        },
      });
    }
  }
  savePage() {
    this.onSavePage.emit();
  }

  //This function is used for adding the sub initiative into the parent initiative
  addsubinitiative(ind: number, index: number) {
    // this.chart.push('1');
    //this.displayRatingModel(ind,index);
    if (!this.initiatives[ind].initiativevalues[index].value) {
      this.initiatives[ind].initiativevalues[index].value = { subinitiative: [] }
      this.workImprovementInitiatives[ind].planSteps[index].planSteps = []
    }

    if (this.lockstatus == false || this.lockstatus == undefined) {
      this.lastEelement =
        this.initiatives[ind].initiativevalues[index]?.value?.subinitiative[
        this.initiatives[ind].initiativevalues[index]?.value?.subinitiative
          ?.length - 1
        ];

      if (this.lastEelement == undefined) {
        this.initiatives[ind].initiativevalues[index].value.subinitiative.push({
          subinitiativekey:
            this.initiatives[ind].initiativevalues[index].key + '.1',
          subinitiativeComplete: false,
          subinitiativeinitiativeInput: '',
          subinitiativeassign_to: 'Assign to',
          subinitiativedisplayRatingModel: false,
          subinitiativecolorValue: 'white',
          subinitiativeGantChart: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
          subtosubinitiative: [],
        });
        this.workImprovementInitiatives[ind].planSteps[index].planSteps.push({
          planSteps: [],
          startDate: null,
          seqNumber: this.initiatives[ind].initiativevalues[index].key + '.1',
          assignee: { userId: null, name: null },
          step: null,
          endDate: null,
          isCompleted: false,
          rating: { color: null, note: null, opportunity: null, decision: null, task: null }
        })
      } else {
        this.lastEelement =
          this.initiatives[ind].initiativevalues[index].value.subinitiative[
            this.initiatives[ind].initiativevalues[index].value.subinitiative
              .length - 1
          ].subinitiativekey;
        this.lastEelement = Math.round(this.lastEelement * 10) / 10;
        this.initiatives[ind].initiativevalues[index].value.subinitiative.push({
          subinitiativekey: parseFloat(this.lastEelement + 0.1).toFixed(1),
          subinitiativeComplete: false,
          subinitiativeinitiativeInput: '',
          subinitiativeassign_to: 'Assign to',
          subinitiativedisplayRatingModel: false,
          subinitiativecolorValue: 'white',
          subinitiativeGantChart: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
          subtosubinitiative: [],
        });
        this.workImprovementInitiatives[ind].planSteps[index].planSteps.push({
          planSteps: [],
          startDate: null,
          seqNumber: parseFloat(this.lastEelement + 0.1).toFixed(1),
          assignee: { userId: null, name: null },
          step: null,
          endDate: null,
          isCompleted: false,
          rating: { color: null, note: null, opportunity: null, decision: null, task: null }
        })
      }
    }
  }

  //This function is used for adding the subtosub initiative into the subinitiative
  addsubtosubinitiative(ind: number, index: number, indexsub: number) {
    if (this.lockstatus == false || this.lockstatus == undefined) {
      if (
        this.initiatives[ind].initiativevalues[index].value.subinitiative[
          indexsub
        ].subtosubinitiative.length == 0
      ) {
        this.initiatives[ind].initiativevalues[index].value.subinitiative[
          indexsub
        ].subtosubinitiative.push({
          subtosubinitiativekey:
            this.initiatives[ind].initiativevalues[index].value.subinitiative[
              indexsub
            ].subinitiativekey + '.1',
          subtosubinitiativeComplete: false,
          subtosubinitiativeInput: '',
          subtosubinitiativeassign_to: 'Assign to',
          subtosubinitiativedisplayRatingModel: false,
          subtosubinitiativecolorValue: 'white',
          subtosubinitiativeGantChart: [
            1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13,
          ],
        });
        this.workImprovementInitiatives[ind].planSteps[index].planSteps[indexsub].planSteps.push({
          planSteps: [],
          startDate: null,
          seqNumber: this.initiatives[ind].initiativevalues[index].value.subinitiative[indexsub].subinitiativekey + '.1',
          assignee: { userId: null, name: null },
          step: null,
          endDate: null,
          isCompleted: false,
          rating: { color: null, note: null, opportunity: null, decision: null, task: null }
        })
      } else {
        this.lastEelement =
          this.initiatives[ind].initiativevalues[index].value.subinitiative[
            indexsub
          ].subtosubinitiative[
            this.initiatives[ind].initiativevalues[index].value.subinitiative[
              indexsub
            ].subtosubinitiative.length - 1
          ].subtosubinitiativekey;
        if (this.lastEelement.toString().split('.')[0] < 10) {
          this.initiatives[ind].initiativevalues[index].value.subinitiative[
            indexsub
          ].subtosubinitiative.push({
            subtosubinitiativekey:
              this.lastEelement.toString().slice(0, 2) +
              (parseFloat(this.lastEelement.toString().slice(2)) + 0.1).toFixed(
                1
              ),
            subtosubinitiativeComplete: false,
            subtosubinitiativeInput: '',
            subtosubinitiativeassign_to: 'Assign to',
            subtosubinitiativedisplayRatingModel: false,
            subtosubinitiativecolorValue: 'white',
            subtosubinitiativeGantChart: [
              1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13,
            ],
          });
          this.workImprovementInitiatives[ind].planSteps[index].planSteps[indexsub].planSteps.push({
            planSteps: [],
            startDate: null,
            seqNumber: this.lastEelement.toString().slice(0, 2) +(parseFloat(this.lastEelement.toString().slice(2)) + 0.1).toFixed(1),
            assignee: { userId: null, name: null },
            step: null,
            endDate: null,
            isCompleted: false,
            rating: { color: null, note: null, opportunity: null, decision: null, task: null }
          })
        } else {
          this.initiatives[ind].initiativevalues[index].value.subinitiative[
            indexsub
          ].subtosubinitiative.push({
            subtosubinitiativekey:
              this.lastEelement.toString().slice(0, 3) +
              (parseFloat(this.lastEelement.toString().slice(3)) + 0.1).toFixed(
                1
              ),
            subtosubinitiativeComplete: false,
            subtosubinitiativeInput: '',
            subtosubinitiativeassign_to: 'Assign to',
            subtosubinitiativedisplayRatingModel: false,
            subtosubinitiativecolorValue: 'white',
            subtosubinitiativeGantChart: [
              1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13,
            ],
          });
          this.workImprovementInitiatives[ind].planSteps[index].planSteps[indexsub].planSteps.push( {
            planSteps: [],
            startDate: null,
            seqNumber: this.lastEelement.toString().slice(0, 3) + (parseFloat(this.lastEelement.toString().slice(3)) + 0.1).toFixed(1),
            assignee: { userId: null, name: null },
            step: null,
            endDate: null,
            isCompleted: false,
            rating: { color: null, note: null, opportunity: null, decision: null, task: null }
          } )
        }
      }
    }
  }

  flagg = true;
  up = true;
  down = false;

  //This toggle is used for  all initiative up-down controller
  toggle() {
    this.flagg = !this.flagg;
    this.up = !this.up;
    this.down = !this.down;
  }

  //This toggle is used for single initiative up-down controller
  toggle_intiative(ind: any) {
    if (this.initiatives[ind].display_flag) {
      this.initiatives[ind].display_flag = false;
    } else {
      this.initiatives[ind].display_flag = true;
    }
  }

  //This function is used for showing complete model for initiaive or child or subtosubchild
  showCompleteModel(
    ind: number,
    index: number,
    childindex: number,
    check: string,
    subindex?: number
  ) {
    if (this.lockstatus == false || this.lockstatus == undefined) {
      this.check = check;
      this.indcheckbox = ind;
      this.indexcheckbox = index;
      this.display_showCompleteModel = true;
      this.childindex = childindex;
      this.subindex = subindex;
    }
  }

  //This function is used for destroy showing complete model for initiaive or child or subtosubchild
  closeWarningModel() {
    this.display_showCompleteModel = false;
  }

  //This function is used for showing complete model for initiaive or child or subtosubchild
  taskcomplete() {
    if (this.lockstatus == false || this.lockstatus == undefined) {
      if (this.check == 'parentComplete') {
        this.initiatives[this.indcheckbox].initiativevalues[
          this.indexcheckbox
        ].value.initiativeComplete = this.checkBoxValue;
        this.workImprovementInitiatives[this.indcheckbox].planSteps[
          this.indexcheckbox
        ].isCompleted = this.checkBoxValue;
        this.updateInitiatives(this.workImprovementInitiatives)
        this.sendWorkImprovementInitiatives.emit(
          this.workImprovementInitiatives
        );
      } else if (this.check == 'subtosubinitiativeComplete') {
        if (this.checkBoxValue) {
          this.initiatives[this.indcheckbox].initiativevalues[
            this.indexcheckbox
          ].value.subinitiative[this.subindex].subtosubinitiative[
            this.childindex
          ].subtosubinitiativeComplete = true;
          this.workImprovementInitiatives[this.indcheckbox].planSteps[this.indexcheckbox].planSteps[this.subindex].planSteps[this.childindex].isCompleted = this.checkBoxValue
          this.updateInitiatives(this.workImprovementInitiatives)
          this.sendWorkImprovementInitiatives.emit(
            this.workImprovementInitiatives
          );
        }
      } else if (this.check == 'subinitiativeComplete') {
        this.initiatives[this.indcheckbox].initiativevalues[
          this.indexcheckbox
        ].value.subinitiative[this.childindex].subinitiativeComplete =
          this.checkBoxValue;
        this.workImprovementInitiatives[this.indcheckbox].planSteps[this.indexcheckbox].planSteps[this.childindex].isCompleted = this.checkBoxValue
        this.updateInitiatives(this.workImprovementInitiatives)
        this.sendWorkImprovementInitiatives.emit(
          this.workImprovementInitiatives
        );
      }
      this.checkBoxValue = false;
      this.display_showCompleteModel = false;
    }
  }

  //This function is used for setting delete data while you clicked on the specific input all the data set which is required to delete the particular row using deleterow function while click on delete(-) icon
  setDeleteData(
    ind: number,
    index: number,
    child: number,
    checkportion: string,
    childtochild?: number
  ) {
    if (this.lockstatus == false || this.lockstatus == undefined) {
      this.deleteind = ind;
      this.deleteindex = index;
      this.deletechildren = child;
      this.checkportion = checkportion;
      this.childtochilddelete = childtochild;
      console.log(this.initiatives);
    }
  }

  subinitiativelength: number;
  subtosubinitiativelength: number;

  //Read set Delete data function
  deleteRow(ind?) {
    if (this.lockstatus == false || this.lockstatus == undefined) {
      if (this.checkportion == 'parentintiativeDelete') {
        if (
          this.deleteindex == 0 &&
          this.initiatives[this.deleteind].initiativevalues.length == 1
        ) {
          this.initiatives[this.deleteind].initiativevalues[
            this.deleteindex
          ].value.subinitiative = [];
          this.number_of_initiatives = this.number_of_initiatives - 1;
          for (
            let index = this.deleteind;
            index < this.initiatives.length - 1;
            index++
          ) {
            this.initiatives[index].initiativevalues =
              this.initiatives[index + 1].initiativevalues;
            this.initiatives[index].initiativename =
              this.initiatives[index + 1].initiativename;
            this.initiatives[index].inititiative_textarea =
              this.initiatives[index + 1].inititiative_textarea;
            this.initiatives[index].display_flag =
              this.initiatives[index + 1].display_flag;
          }
          this.initiatives.pop();
        } else {
          for (
            let i = this.deleteindex;
            i < this.initiatives[this.deleteind].initiativevalues.length - 1;
            i++
          ) {
            this.initiatives[this.deleteind].initiativevalues[i].value =
              this.initiatives[this.deleteind].initiativevalues[i + 1].value;
            this.initiatives[this.deleteind].initiativevalues[
              i
            ].initiativeInput =
              this.initiatives[this.deleteind].initiativevalues[
                i + 1
              ].initiativeInput;
            this.initiatives[this.deleteind].initiativevalues[i].assign_to =
              this.initiatives[this.deleteind].initiativevalues[
                i + 1
              ].assign_to;

            this.initiatives[this.deleteind].initiativevalues[
              i
            ].displayRatingModel =
              this.initiatives[this.deleteind].initiativevalues[
                i + 1
              ].displayRatingModel;
            this.initiatives[this.deleteind].initiativevalues[i].colorValue =
              this.initiatives[this.deleteind].initiativevalues[
                i + 1
              ].colorValue;
            this.subinitiativelength =
              this.initiatives[this.deleteind].initiativevalues[
                i
              ].value.subinitiative.length;
            for (let sub = 0; sub < this.subinitiativelength; sub++) {
              this.initiatives[this.deleteind].initiativevalues[
                i
              ].value.subinitiative[sub].subinitiativekey =
                this.initiatives[this.deleteind].initiativevalues[i].key +
                '.' +
                (sub + 1).toFixed(0);
              this.subtosubinitiativelength =
                this.initiatives[this.deleteind].initiativevalues[
                  i
                ].value.subinitiative[sub].subtosubinitiative.length;
              for (
                let subtosub = 0;
                subtosub < this.subtosubinitiativelength;
                subtosub++
              ) {
                this.initiatives[this.deleteind].initiativevalues[
                  i
                ].value.subinitiative[sub].subtosubinitiative[
                  subtosub
                ].subtosubinitiativekey =
                  this.initiatives[this.deleteind].initiativevalues[i].value
                    .subinitiative[sub].subinitiativekey +
                  '.' +
                  (subtosub + 1).toFixed(0);
              }
            }
          }
          this.initiatives[this.deleteind].initiativevalues.pop();
          // -----------------------------SERVICE IMPL----------------------------
          // this.deleteInitiativeFromService(this.initiatives.length + 1);
        }
      }
      if (this.checkportion == 'subintiativeDelete') {
        for (
          let i = this.deletechildren;
          i <
          this.initiatives[this.deleteind].initiativevalues[this.deleteindex]
            .value.subinitiative.length -
          1;
          i++
        ) {
          this.initiatives[this.deleteind].initiativevalues[
            this.deleteindex
          ].value.subinitiative[i].subinitiativeinitiativeInput =
            this.initiatives[this.deleteind].initiativevalues[
              this.deleteindex
            ].value.subinitiative[i + 1].subinitiativeinitiativeInput;
          this.initiatives[this.deleteind].initiativevalues[
            this.deleteindex
          ].value.subinitiative[i].subinitiativeassign_to =
            this.initiatives[this.deleteind].initiativevalues[
              this.deleteindex
            ].value.subinitiative[i + 1].subinitiativeassign_to;

          this.initiatives[this.deleteind].initiativevalues[
            this.deleteindex
          ].value.subinitiative[i].subinitiativedisplayRatingModel =
            this.initiatives[this.deleteind].initiativevalues[
              this.deleteindex
            ].value.subinitiative[i + 1].subinitiativedisplayRatingModel;
          this.initiatives[this.deleteind].initiativevalues[
            this.deleteindex
          ].value.subinitiative[i].subinitiativecolorValue =
            this.initiatives[this.deleteind].initiativevalues[
              this.deleteindex
            ].value.subinitiative[i + 1].subinitiativecolorValue;

          this.initiatives[this.deleteind].initiativevalues[
            this.deleteindex
          ].value.subinitiative[i].subinitiativeComplete =
            this.initiatives[this.deleteind].initiativevalues[
              this.deleteindex
            ].value.subinitiative[i + 1].subinitiativeComplete;
          this.initiatives[this.deleteind].initiativevalues[
            this.deleteindex
          ].value.subinitiative[i].subinitiativeGantChart =
            this.initiatives[this.deleteind].initiativevalues[
              this.deleteindex
            ].value.subinitiative[i + 1].subinitiativeGantChart;

          this.subtosubinitiativelength =
            this.initiatives[this.deleteind].initiativevalues[
              this.deleteindex
            ].value.subinitiative[i + 1].subtosubinitiative.length;

          for (let index = 0; index < this.subtosubinitiativelength; index++) {
            this.initiatives[this.deleteind].initiativevalues[
              this.deleteindex
            ].value.subinitiative[i].subtosubinitiative[
              index
            ].subtosubinitiativekey =
              this.initiatives[this.deleteind].initiativevalues[
                this.deleteindex
              ].value.subinitiative[i].subinitiativekey +
              '.' +
              (index + 1);
          }
        }
        this.initiatives[this.deleteind].initiativevalues[
          this.deleteindex
        ].value.subinitiative.pop();
      }
      if (this.checkportion == 'subotsubintiativeDelete') {
        if (
          this.initiatives[this.deleteind].initiativevalues[this.deleteindex]
            .value.subinitiative[this.deletechildren].subtosubinitiative
            .length == 1
        ) {
          this.initiatives[this.deleteind].initiativevalues[
            this.deleteindex
          ].value.subinitiative[this.deletechildren].subtosubinitiative.pop();
        } else {
          for (
            let keyiterator = this.childtochilddelete;
            keyiterator <
            this.initiatives[this.deleteind].initiativevalues[this.deleteindex]
              .value.subinitiative[this.deletechildren].subtosubinitiative
              .length -
            1;
            keyiterator++
          ) {
            this.initiatives[this.deleteind].initiativevalues[
              this.deleteindex
            ].value.subinitiative[this.deletechildren].subtosubinitiative[
              keyiterator
            ].subtosubinitiativeInput =
              this.initiatives[this.deleteind].initiativevalues[
                this.deleteindex
              ].value.subinitiative[this.deletechildren].subtosubinitiative[
                keyiterator + 1
              ].subtosubinitiativeInput;
            this.initiatives[this.deleteind].initiativevalues[
              this.deleteindex
            ].value.subinitiative[this.deletechildren].subtosubinitiative[
              keyiterator
            ].subtosubinitiativeassign_to =
              this.initiatives[this.deleteind].initiativevalues[
                this.deleteindex
              ].value.subinitiative[this.deletechildren].subtosubinitiative[
                keyiterator + 1
              ].subtosubinitiativeassign_to;

            this.initiatives[this.deleteind].initiativevalues[
              this.deleteindex
            ].value.subinitiative[this.deletechildren].subtosubinitiative[
              keyiterator
            ].subtosubinitiativedisplayRatingModel =
              this.initiatives[this.deleteind].initiativevalues[
                this.deleteindex
              ].value.subinitiative[this.deletechildren].subtosubinitiative[
                keyiterator + 1
              ].subtosubinitiativedisplayRatingModel;
            this.initiatives[this.deleteind].initiativevalues[
              this.deleteindex
            ].value.subinitiative[this.deletechildren].subtosubinitiative[
              keyiterator
            ].subtosubinitiativecolorValue =
              this.initiatives[this.deleteind].initiativevalues[
                this.deleteindex
              ].value.subinitiative[this.deletechildren].subtosubinitiative[
                keyiterator + 1
              ].subtosubinitiativecolorValue;
            this.initiatives[this.deleteind].initiativevalues[
              this.deleteindex
            ].value.subinitiative[this.deletechildren].subtosubinitiative[
              keyiterator
            ].subtosubinitiativeComplete =
              this.initiatives[this.deleteind].initiativevalues[
                this.deleteindex
              ].value.subinitiative[this.deletechildren].subtosubinitiative[
                keyiterator + 1
              ].subtosubinitiativeComplete;

            this.initiatives[this.deleteind].initiativevalues[
              this.deleteindex
            ].value.subinitiative[this.deletechildren].subtosubinitiative[
              keyiterator
            ].subtosubinitiativeGantChart =
              this.initiatives[this.deleteind].initiativevalues[
                this.deleteindex
              ].value.subinitiative[this.deletechildren].subtosubinitiative[
                keyiterator + 1
              ].subtosubinitiativeGantChart;
          }
          this.initiatives[this.deleteind].initiativevalues[
            this.deleteindex
          ].value.subinitiative[this.deletechildren].subtosubinitiative.pop();
        }
      }
    }
  }

  //listofdategantchart=[  "07/25/22","07/26/22","07/27/22","07/28/22","07/29/22","07/30/22","07/31/22","08/01/22","08/02/22","08/03/22","08/04/22","08/05/22","08/06/22"]
  listofdategantchart = [];

  //This function is used for finding current date index and return current date index
  findindexofcurrentdate(): any {
    for (let index = 0; index < this.listofdategantchart.length; index++) {
      if (
        this.listofdategantchart[index] ==
        this.dateService.mdyFormatter(new Date())
      ) {
        return index;
      }
    }
  }

  display = false;
  indgantchart: number;
  indexofinitiativevaluesgantchart: number;
  indexofindexsubgantchart: number;
  indexofindexsubtosubgantchart: number;
  indexofchartlistgantchart: number;
  whereforgantchart: string;
  start_date: any;
  end_of_date: any;
  end_date_of_listofdategantchart: any;
  start_date_of_listofdategantchart: any;
  min_month_end_date: string;
  max_month_end_date: string;

  // This function is used for open GantChartModal
  openGantChartModal(
    ind: number,
    indexofinitiativevalues: number,
    indexofchartlist: number,
    where: string,
    indexsub?: number,
    indexsubtosub?: number
  ) {
    if (this.lockstatus == false || this.lockstatus == undefined) {
      this.display = true;
      this.indgantchart = ind;
      this.indexofinitiativevaluesgantchart = indexofinitiativevalues;
      this.indexofchartlistgantchart = indexofchartlist;
      this.whereforgantchart = where;
      this.indexofindexsubgantchart = indexsub;
      this.indexofindexsubtosubgantchart = indexsubtosub;
      this.start_date = this.dateService.ymdStringFormatter(
        this.listofdategantchart[indexofchartlist]
      );
      this.min_month_end_date = this.start_date
        .toString()
        .substring(0, this.start_date.length - 3);
      this.max_month_end_date = this.end_date_of_listofdategantchart
        .toString()
        .substring(0, this.end_date_of_listofdategantchart.length - 3);
    }
  }

  //this function is used for close GantChartModel
  closeGantChartModal() {
    if (this.lockstatus == false || this.lockstatus == undefined) {
      this.display = false;
      this.end_of_date = '';
    }
  }

  // this variable fillInitiativeGantChartInput  is used for keep track how many gantchart boxes we need to fill
  fillInitiativeGantChartInput: number;

  //this function is used for fill the gant chart according to start and end_date
  fillInitiativeGantChart() {
    this.workImprovementInitiatives[this.indgantchart].planSteps[
      this.indexofinitiativevaluesgantchart
    ].startDate = this.start_date;
    this.workImprovementInitiatives[this.indgantchart].planSteps[
      this.indexofinitiativevaluesgantchart
    ].endDate = this.end_of_date;
    this.updateInitiatives(this.workImprovementInitiatives)
    this.sendWorkImprovementInitiatives.emit(this.workImprovementInitiatives);
    if (this.lockstatus == false || this.lockstatus == undefined) {
      this.fillInitiativeGantChartInput =
        this.dateService.differenceofDays(this.end_of_date, this.start_date) +
        1;
      if (this.main_page_frequencey == 'Monthly') {
        this.fillInitiativeGantChartInput =
          this.dateService.differenceofMonths(
            this.end_of_date,
            this.start_date
          ) + 2;
      }
      if (this.main_page_frequencey == 'Weekly') {
        this.fillInitiativeGantChartInput =
          this.fillInitiativeGantChartInput / 7;
      }
      if (this.whereforgantchart == 'parentintiative') {
        for (
          let index = this.indexofchartlistgantchart;
          index <
          this.fillInitiativeGantChartInput + this.indexofchartlistgantchart;
          index++
        ) {
          if (
            this.initiatives[this.indgantchart].initiativevalues[
              this.indexofinitiativevaluesgantchart
            ].value.initiativeGantChart[index] == 'filled'
          ) {
            this.initiatives[this.indgantchart].initiativevalues[
              this.indexofinitiativevaluesgantchart
            ].value.initiativeGantChart[index] = this.indexofchartlistgantchart;
          } else {
            this.initiatives[this.indgantchart].initiativevalues[
              this.indexofinitiativevaluesgantchart
            ].value.initiativeGantChart[index] = 'filled';
          }
        }
      } else if (this.whereforgantchart == 'subinitiative') {
        for (
          let index = this.indexofchartlistgantchart;
          index <
          this.fillInitiativeGantChartInput + this.indexofchartlistgantchart;
          index++
        ) {
          if (
            this.initiatives[this.indgantchart].initiativevalues[
              this.indexofinitiativevaluesgantchart
            ].value.subinitiative[this.indexofindexsubgantchart]
              .subinitiativeGantChart[index] == 'filled'
          ) {
            this.initiatives[this.indgantchart].initiativevalues[
              this.indexofinitiativevaluesgantchart
            ].value.subinitiative[
              this.indexofindexsubgantchart
            ].subinitiativeGantChart[index] = this.indexofchartlistgantchart;
          } else {
            this.initiatives[this.indgantchart].initiativevalues[
              this.indexofinitiativevaluesgantchart
            ].value.subinitiative[
              this.indexofindexsubgantchart
            ].subinitiativeGantChart[index] = 'filled';
          }
        }
      } else if (this.whereforgantchart == 'subtosubinitiative') {
        for (
          let index = this.indexofchartlistgantchart;
          index <
          this.fillInitiativeGantChartInput + this.indexofchartlistgantchart;
          index++
        ) {
          if (
            this.initiatives[this.indgantchart].initiativevalues[
              this.indexofinitiativevaluesgantchart
            ].value.subinitiative[this.indexofindexsubgantchart]
              .subtosubinitiative[this.indexofindexsubtosubgantchart]
              .subtosubinitiativeGantChart[index] == 'filled'
          ) {
            this.initiatives[this.indgantchart].initiativevalues[
              this.indexofinitiativevaluesgantchart
            ].value.subinitiative[
              this.indexofindexsubgantchart
            ].subtosubinitiative[
              this.indexofindexsubtosubgantchart
            ].subtosubinitiativeGantChart[index] =
              this.indexofchartlistgantchart;
          } else {
            this.initiatives[this.indgantchart].initiativevalues[
              this.indexofinitiativevaluesgantchart
            ].value.subinitiative[
              this.indexofindexsubgantchart
            ].subtosubinitiative[
              this.indexofindexsubtosubgantchart
            ].subtosubinitiativeGantChart[index] = 'filled';
          }
        }
      }
      this.closeGantChartModal();
    }
  }

  @Output() pushColorToMainParentSpan = new EventEmitter<String>();
  displayrating = false;
  lastind: number;
  lastindex: number;
  lastsub: number;
  lastsubtosub: number;

  displayRatingModel(
    modelDisplayBooleanValue,
    ind,
    index,
    subindex?,
    subtosubindex?
  ) {
    if (this.lockstatus == false || this.lockstatus == undefined) {
      this.sendPhaseThreeModalFlag.emit(true);
      if (
        this.phaseThreeModalFlag == true &&
        this.phaseOneModalFlag == false &&
        this.phaseTwoModalFlag == false &&
        this.phaseFourModalFlag == false &&
        this.phaseFiveModalFlag == false
      ) {
        this.destroyRatingModel();
        if (subindex == undefined) {
          this.initiatives[ind].initiativevalues[index].displayRatingModel =
            !modelDisplayBooleanValue;
        } else if (subtosubindex == undefined) {
          this.initiatives[ind].initiativevalues[index].value.subinitiative[
            subindex
          ].subinitiativedisplayRatingModel = !modelDisplayBooleanValue;
        } else {
          this.initiatives[ind].initiativevalues[index].value.subinitiative[
            subindex
          ].subtosubinitiative[
            subtosubindex
          ].subtosubinitiativedisplayRatingModel = !modelDisplayBooleanValue;
        }
      }
    }
  }

  colorvalue: any;

  setColorValueForInitiativeLevel3(color, ind, index, indexsub, indexsubtosub) {
    this.workImprovementInitiatives[ind].planSteps[index].planSteps[indexsub].planSteps[indexsubtosub].rating.color = color
    this.updateInitiatives(this.workImprovementInitiatives)
    this.sendWorkImprovementInitiatives.emit(this.workImprovementInitiatives)
  }

  setNoteValueForInitiativeLevel3(note, ind, index, indexsub, indexsubtosub) {
    this.workImprovementInitiatives[ind].planSteps[index].planSteps[indexsub].planSteps[indexsubtosub].rating.note = note
    this.updateInitiatives(this.workImprovementInitiatives)
    this.sendWorkImprovementInitiatives.emit(this.workImprovementInitiatives)
  }

  setTaskValueForInitiativeLevel3(task, ind, index, indexsub, indexsubtosub) {
    this.workImprovementInitiatives[ind].planSteps[index].planSteps[indexsub].planSteps[indexsubtosub].rating.task = task
    this.updateInitiatives(this.workImprovementInitiatives)
    this.sendWorkImprovementInitiatives.emit(this.workImprovementInitiatives)
  }

  setDecisionValueForInitiativeLevel3(decision, ind, index, indexsub, indexsubtosub) {
    this.workImprovementInitiatives[ind].planSteps[index].planSteps[indexsub].planSteps[indexsubtosub].rating.decision = decision
    this.updateInitiatives(this.workImprovementInitiatives)
    this.sendWorkImprovementInitiatives.emit(this.workImprovementInitiatives)
  }

  setOppertunityValueForInitiativeLevel3(oppertunity, ind, index, indexsub, indexsubtosub) {
    this.workImprovementInitiatives[ind].planSteps[index].planSteps[indexsub].planSteps[indexsubtosub].rating.opportunity = oppertunity
    this.updateInitiatives(this.workImprovementInitiatives)
    this.sendWorkImprovementInitiatives.emit(this.workImprovementInitiatives)
  }

  setColorValueForInitiativeLevel2(color, ind, index, indexsub) {
    this.workImprovementInitiatives[ind].planSteps[index].planSteps[indexsub].rating.color = color
    this.updateInitiatives(this.workImprovementInitiatives)
    this.sendWorkImprovementInitiatives.emit(this.workImprovementInitiatives)
  }

  setDecisonValueForInitiativeLevel2(decision, ind, index, indexsub) {
    this.workImprovementInitiatives[ind].planSteps[index].planSteps[indexsub].rating.decision = decision
    this.updateInitiatives(this.workImprovementInitiatives)
    this.sendWorkImprovementInitiatives.emit(this.workImprovementInitiatives)
  }

  setNoteValueForInitiativeLevel2(note, ind, index, indexsub) {
    this.workImprovementInitiatives[ind].planSteps[index].planSteps[indexsub].rating.note = note
    this.updateInitiatives(this.workImprovementInitiatives)
    this.sendWorkImprovementInitiatives.emit(this.workImprovementInitiatives)
  }
  setTaskValueForInitiativeLevel2(task, ind, index, indexsub) {
    this.workImprovementInitiatives[ind].planSteps[index].planSteps[indexsub].rating.task = task
    this.updateInitiatives(this.workImprovementInitiatives)
    this.sendWorkImprovementInitiatives.emit(this.workImprovementInitiatives)
  }
  setOppertunityValueForInitiativeLevel2(oppertunity, ind, index, indexsub) {
    this.workImprovementInitiatives[ind].planSteps[index].planSteps[indexsub].rating.opportunity = oppertunity
    this.updateInitiatives(this.workImprovementInitiatives)
    this.sendWorkImprovementInitiatives.emit(this.workImprovementInitiatives)
  }


  setColorValueForOutCome(
    val: any,
    modelDisplayBooleanValue,
    ind,
    index,
    subindex?,
    subtosubindex?
  ) {
    if (this.lockstatus == false || this.lockstatus == undefined) {
      this.colorvalue = val;
      this.workImprovementInitiatives[ind].planSteps[index].rating.color = this.colorvalue
      this.updateInitiatives(this.workImprovementInitiatives)
      this.sendWorkImprovementInitiatives.emit(this.workImprovementInitiatives)
      if (subindex == undefined) {
        this.initiatives[ind].initiativevalues[index].colorValue =
          this.colorvalue;
        this.displayRatingModel(modelDisplayBooleanValue, ind, index);
      } else if (subtosubindex == undefined) {
        this.initiatives[ind].initiativevalues[index].value.subinitiative[
          subindex
        ].subinitiativecolorValue = this.colorvalue;
        this.displayRatingModel(modelDisplayBooleanValue, ind, index, subindex);
      } else {
        this.initiatives[ind].initiativevalues[index].value.subinitiative[
          subindex
        ].subtosubinitiative[subtosubindex].subtosubinitiativecolorValue =
          this.colorvalue;
        this.displayRatingModel(
          modelDisplayBooleanValue,
          ind,
          index,
          subindex,
          subtosubindex
        );
      }
    }
  }

  setColorValueForInitiative(color,ind,index) {
    debugger
    this.workImprovementInitiatives[ind].planSteps[index].rating.color = color
    this.updateInitiatives(this.workImprovementInitiatives)
    this.sendWorkImprovementInitiatives.emit(this.workImprovementInitiatives)
  }

  setNoteValueForInitiative(note, ind, index) {
    this.workImprovementInitiatives[ind].planSteps[index].rating.note = note
    this.updateInitiatives(this.workImprovementInitiatives)
    this.sendWorkImprovementInitiatives.emit(this.workImprovementInitiatives)
  }

  setTaskValueForInitiative(task, ind, index) {
    this.workImprovementInitiatives[ind].planSteps[index].rating.task = task
    this.updateInitiatives(this.workImprovementInitiatives)
    this.sendWorkImprovementInitiatives.emit(this.workImprovementInitiatives)
  }

  setDecisionValueForInitiative(decision, ind, index) {
    this.workImprovementInitiatives[ind].planSteps[index].rating.decision = decision
    this.updateInitiatives(this.workImprovementInitiatives)
    this.sendWorkImprovementInitiatives.emit(this.workImprovementInitiatives)
  }

  setOppertunityValueForInitiative(oppertunity, ind, index) {
    this.workImprovementInitiatives[ind].planSteps[index].rating.opportunity = oppertunity
    this.updateInitiatives(this.workImprovementInitiatives)
    this.sendWorkImprovementInitiatives.emit(this.workImprovementInitiatives)
  }

  destroyRatingModel() {
    if (this.lockstatus == false || this.lockstatus == undefined) {
      for (let ind = 0; ind < this.initiatives.length; ind++) {
        for (
          let index = 0;
          index < this.initiatives[ind].initiativevalues.length;
          index++
        ) {
          this.initiatives[ind].initiativevalues[index].displayRatingModel =
            false;
          for (
            let sub = 0;
            sub <
            this.initiatives[ind].initiativevalues[index]?.value?.subinitiative
              .length;
            sub++
          ) {
            this.initiatives[ind].initiativevalues[index].value.subinitiative[
              sub
            ].subinitiativedisplayRatingModel = false;
            for (
              let subtosub = 0;
              subtosub <
              this.initiatives[ind].initiativevalues[index].value.subinitiative[
                sub
              ].subtosubinitiative.length;
              subtosub++
            ) {
              this.initiatives[ind].initiativevalues[index].value.subinitiative[
                sub
              ].subtosubinitiative[
                subtosub
              ].subtosubinitiativedisplayRatingModel = false;
            }
          }
        }
      }
    }
  }

  selectedInititive: any;

  selectedInitiativeBorder(ind) {
    if (this.lockstatus == false || this.lockstatus == undefined) {
      this.selectedInititive = ind;
    }
  }

  deleteInitiative() {
    if (this.lockstatus == false || this.lockstatus == undefined) {
      this.number_of_initiatives = this.number_of_initiatives - 1;
      for (
        let index = this.selectedInititive;
        index < this.initiatives.length - 1;
        index++
      ) {
        this.initiatives[index].initiativevalues =
          this.initiatives[index + 1].initiativevalues;
        this.initiatives[index].initiativename =
          this.initiatives[index + 1].initiativename;
        this.initiatives[index].inititiative_textarea =
          this.initiatives[index + 1].inititiative_textarea;
        this.initiatives[index].display_flag =
          this.initiatives[index + 1].display_flag;
      }
      this.initiatives.pop();
      this.workImprovementInitiatives.pop();
      this.sendWorkImprovementInitiatives.emit(this.workImprovementInitiatives);
      // -----------------------------SERVICE IMPL----------------------------
      // this.deleteInitiativeFromService(this.initiatives.length + 1);
    }
  }

  // -----------------------------SERVICE----------------------------
  saveInitiativeDetailInsService() {
    // -----------------------------Delete From SERVICE----------------------------
    if (this.initiaiveDeleteIndexList != []) {
      this.initiaiveDeleteIndexList.forEach((element) => {
        this.phaseThreeService.deleteInititivebyID(element);
      });
      this.initiaiveDeleteIndexList = [];
    }
    // -----------------------------Add & Update Into SERVICE----------------------------
    this.phaseThreeService.addInitiativeDetail(
      JSON.stringify(this.initiatives)
    );
  }

  initiaiveDeleteIndexList = [];

  deleteInitiativeFromService(initiaiveDeleteIndex: number) {
    this.initiaiveDeleteIndexList.push(initiaiveDeleteIndex);
  }

  saveInitiativeValue(init, ind) {
    this.workImprovementInitiatives[ind].name = init.inititiative_textarea;
    // this.updateInitiatives(this.workImprovementInitiatives)
    this.sendWorkImprovementInitiatives.emit(this.workImprovementInitiatives);
  }

  saveInitiativeFirstLevelValue(firstLevelInitiative, parentIndex, index) {
    this.workImprovementInitiatives[parentIndex].planSteps[index].step =
      firstLevelInitiative.initiativeInput;
    // this.updateInitiatives(this.workImprovementInitiatives)
    this.sendWorkImprovementInitiatives.emit(this.workImprovementInitiatives);
  }

  saveInitiativeLevel2Value(subinitiative, ind, index, indexsub) {
    this.workImprovementInitiatives[ind].planSteps[index].planSteps[indexsub].step = subinitiative.subinitiativeinitiativeInput;
    // this.updateInitiatives(this.workImprovementInitiatives)
    this.sendWorkImprovementInitiatives.emit(this.workImprovementInitiatives);
  }

  saveInitiativeLevel3Value(subtosubinitiative, ind, index, indexsub, indexsubtosub) {
    this.workImprovementInitiatives[ind].planSteps[index].planSteps[indexsub].planSteps[indexsubtosub].step = subtosubinitiative.subtosubinitiativeInput;
    // this.updateInitiatives(this.workImprovementInitiatives)
    this.sendWorkImprovementInitiatives.emit(this.workImprovementInitiatives);
  }

  saveInitiativeAssignee(event, parentIndex, index) {
    const id = event.target.value
    const user: User = this.users.filter(user => user.id == id)[0]
    this.workImprovementInitiatives[parentIndex].planSteps[
      index
    ].assignee.name = user.username;
    this.workImprovementInitiatives[parentIndex].planSteps[
      index
    ].assignee.userId = user.id;
    this.updateInitiatives(this.workImprovementInitiatives)
    this.sendWorkImprovementInitiatives.emit(this.workImprovementInitiatives);
  }
  saveInitiativeAssigneeLevel2(event, parentIndex, index, indexsub) {
    const id = event.target.value
    const user: User = this.users.filter(user => user.id == id)[0]
    this.workImprovementInitiatives[parentIndex].planSteps[index].planSteps[indexsub].assignee.name = user.username;
    this.workImprovementInitiatives[parentIndex].planSteps[index].planSteps[indexsub].assignee.userId = user.id;
    this.updateInitiatives(this.workImprovementInitiatives)
    this.sendWorkImprovementInitiatives.emit(this.workImprovementInitiatives);
  }
  saveInitiativeAssigneeLevel3(event, parentIndex, index, indexsub, indexsubtosub) {
    const id = event.target.value
    const user: User = this.users.filter(user => user.id == id)[0]
    this.workImprovementInitiatives[parentIndex].planSteps[index].planSteps[indexsub].planSteps[indexsubtosub].assignee.name = user.username;
    this.workImprovementInitiatives[parentIndex].planSteps[index].planSteps[indexsub].planSteps[indexsubtosub].assignee.userId = user.id;
    this.updateInitiatives(this.workImprovementInitiatives)
    this.sendWorkImprovementInitiatives.emit(this.workImprovementInitiatives);
  }
}
