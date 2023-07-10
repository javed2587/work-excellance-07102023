import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { DateService } from 'src/app/services/common/date.service';
import dateVlaues from 'src/assets/data/date-values.json'
import { PageMetaPageInterval } from "../../../models/work-system/work-system-body";

interface Frequencey {
  name: string,
  value: any,
  code: string
  disableCasteDropdown?: boolean
}
interface Interval {
  name: string,
  code: string
}
@Component({
  selector: 'app-date-header',
  templateUrl: './date-header.component.html',
  styleUrls: ['./date-header.component.css']
})
export class DateHeaderComponent implements OnInit, OnChanges {
  value: Date;
  dateValue: Date;
  date1: Date;
  minDateValue: Date;
  maxDateValue: Date;
  date14: Date
  date15: Date
  date2: Date;
  date3: Date;
  date10: Date;
  es: any;
  start_date: any;
  end_date: any;
  // interval: any;
  // frequencey: any;
  endDate: any
  improvement: Boolean = true;
  otherPage: Boolean = false;
  disableCasteDropdown: boolean;
  createdDate: any
  updatedDate: any;
  defaultDateValues: any
  updatedDate2: string;
  preInterval: string
  preStartDate: string;
  preCreatedDate: string;
  caste: string = ''
  selectedStartDate: Date;
  formtedDate?: any
  hiddenCalenderFlag: boolean = false;
  planDate: Date ;

  interval: Interval[];
  selectedFrequencey?: Frequencey;
  frequencey: Frequencey[];
  abc = "Work Improvement"
  selectedInterval?: Interval;
  tempFrequency: Frequencey[]
  intervalFrequency: PageMetaPageInterval = new PageMetaPageInterval(
    null, 
    { ratingFrequency: null, ratingFrequencyUnit: null },
    null)
  @Input() pageName: string;
  @Input() startDate: Date;
  @Input() intervalEndDate: Date;
  @Input() creationDate: Date;
  @Input() intervalDuration: { ratingFrequency: number; ratingFrequencyUnit: String }
  @Output() startDateEvent = new EventEmitter();
  @Output() intervalEvent: EventEmitter<PageMetaPageInterval> = new EventEmitter<PageMetaPageInterval>();
  @Output() frequecnyEvent = new EventEmitter<any>();
  @Output() sendAdjustFrequency: EventEmitter<String> = new EventEmitter<String>()
  @Output() sendCreationDate: EventEmitter<Date> = new EventEmitter<Date>()
  @Output() sendPlanDate: EventEmitter<Date> = new EventEmitter<Date>()


  constructor(public dateservice: DateService) {
    this.defaultDateValues = dateVlaues
    // this.selectedStartDate = this.defaultDateValues.startDate
    this.selectedStartDate = new Date();
    this.onChangeIntervalStartDate('e')
    // this.endDate = new Date(this.selectedStartDate).setMonth(new Date(this.selectedStartDate).getMonth() + 3)
    this.endDate = new Date(0, 0, 1).toLocaleDateString("en-US", { month: "2-digit", day: "2-digit", year: "numeric" });
    // this.endDate = '0/00/00';
    
    this.sendEndDate()
    this.planDate = new Date()


    this.frequencey = [
      { name: 'Weekly', value: '1', code: 'WEEK' },
      { name: 'Bi-Weekly', value: '2', code: 'BI_WEEK' },
      { name: 'Monthly', value: '3', code: 'MONTH' },
      { name: 'Quarterly', value: '4', code: 'QUARTER' }
    ];
  }

  isMeasurement: Boolean = false

  ngOnInit(): void {
    this.date14 = new Date();
    this.tempFrequency = this.frequencey
    this.frequencey = this.frequencey.filter(f => f.value == '1')
    if (this.pageName == "Work System" || this.pageName == "Work Measurement" || this.pageName == "Work Direction") {
      if (this.pageName == "Work Measurement")
        this.isMeasurement = true
      this.improvement = false;
      this.otherPage = true;
    } else {
      this.improvement = true;
      this.otherPage = false;
    }

    this.createdDate = new Date().setDate(new Date().getDate() - 10);
    this.updatedDate = new Date(0, 0, 1).toLocaleDateString("en-US", { month: "2-digit", day: "2-digit", year: "numeric" });
    this.maxDateValue = new Date(new Date().setDate(new Date().getDate() + 7));
    this.minDateValue = new Date(new Date().setDate(new Date().getDate() - 30));
  }
  startDatePopulated: boolean = false
  creationDatePopulated: boolean = false
  ngOnChanges(changes: SimpleChanges) {
    if (this.pageName == "Work Improvement") {
      this.interval = [
        { name: '1-Month', code: '1' },
        { name: '3-Month', code: '3' },
        { name: '6-Month', code: '6' },
        { name: '9-Month', code: '9' },
        { name: '12-Month', code: '12' }];
    }
    else {
      this.interval = [
        { name: '3-Month', code: '3' },
        { name: '6-Month', code: '6' },
        { name: '9-Month', code: '9' },
        { name: '12-Month', code: '12' }];
    }
    for (const propName in changes) {
      if (propName == "startDate") {
        if (this.startDate && !this.startDatePopulated) {
          this.startDatePopulated = true
          this.selectedStartDate = new Date(this.startDate)
          this.onChangeIntervalStartDate('e')
        }
      }
      else if (propName == "intervalDuration") {
        if (this.intervalDuration && this.interval) {
          this.selectedInterval = this.interval?.filter(i => i.code == this.intervalDuration.ratingFrequency.toString())[0]
        }
      }
      else if (propName == "creationDate") {
        if (this.creationDate && !this.creationDatePopulated) {
          this.creationDatePopulated = true
          this.date14 = new Date(this.creationDate)
          this.onChangeCreatedDate(this.date14)
        }
      }
      else if (propName == "intervalEndDate") {
        this.endDate = new Date(this.intervalEndDate)
        this.sendEndDate()
      }
    }
    // const myDate = new Date(this.selectedStartDate);
    // this.endDate = myDate.setMonth(myDate.getMonth() + parseInt(this.interval[1].code));
  }

  onChangeIntervalStartDate(date) {
    this.intervalFrequency.startDate = this.selectedStartDate
    this.intervalEvent.emit(this.intervalFrequency)
  }

  onChangeIntervalDuration(duration) {
    this.intervalFrequency.definition.ratingFrequency = Number.parseInt(duration.value.code)
    this.intervalFrequency.definition.ratingFrequencyUnit = "MONTH"
    this.intervalEvent.emit(this.intervalFrequency)
  }

  onChangeCreatedDate(date) {
    this.sendCreationDate.emit(this.date14)
  }

  onChangePlanDate($event) {
    this.sendPlanDate.emit(this.date15)
  }

  sendEndDate() {
    this.intervalFrequency.endDate = new Date(this.endDate)
    this.intervalEvent.emit(this.intervalFrequency)
  }

  // ? Adding interval in user-selective start-date and making End-date
  onchange(event) {
    this.intervalEvent.emit(this.intervalFrequency)
    this.formtedDate = this.dateservice.formatDate(this.selectedStartDate);
    this.endDate = new Date(this.formtedDate).setMonth(new Date(this.formtedDate).getMonth() + 3)
    this.endDate = new Date(this.formtedDate).setMonth(new Date(this.formtedDate).getMonth() + parseInt(this.selectedInterval?.code))
    if (this.dateservice.findDay(this.endDate) == "Sat") {
      this.endDate = new Date(this.formtedDate).setMonth(new Date(this.formtedDate).getMonth() + parseInt(this.selectedInterval?.code))
      this.endDate = this.dateservice.strmdyFormattee(this.dateservice.addNoOfDays(new Date(this.endDate), -1).toString())
      console.log("3", this.endDate)
    }
    if (this.dateservice.findDay(this.endDate) == "Sun") {
      this.endDate = new Date(this.formtedDate).setMonth(new Date(this.formtedDate).getMonth() + parseInt(this.selectedInterval?.code))
      this.endDate = this.dateservice.strmdyFormattee(this.dateservice.addNoOfDays(new Date(this.endDate), -2).toString())
      console.log("4", this.endDate)
    }

    this.frequencey = this.tempFrequency

    switch (this.selectedInterval.code) {
      case '1':
        {
          this.frequencey = this.frequencey.filter(f => f.value === '1' || f.value === '2' || f.value === '3')
          break
        }
      case '3':
        {
          this.frequencey = this.frequencey.filter(f => (f.value === '1' || f.value === '2' || f.value === '3' || f.value === '4'))
          break
        }
      case '6':
        {
          this.frequencey = this.frequencey.filter(f => (f.value === '1' || f.value === '2' || f.value === '3' || f.value === '4'))
          break
        }
      case '9':
        {
          this.frequencey = this.frequencey.filter(f => f.value === '2' || f.value === '3' || f.value === '4')
          break
        }
      case '12':
        {

          this.frequencey = this.frequencey.filter(f => (f.value == '2' || f.value == '3' || f.value === '4'))
          break
        }
      default:
        {

        }
    }
    this.sendEndDate()
  }

  sendIntervalToParent() {

  }
  // intervalEndDate: Date
  submitDatesForInitiatives(value) {

    // this.startDateEvent.emit(
    //   {
    //     sDate: this.formtedDate,
    //     interval: this.selectedInterval.code,
    //     freq: this.selectedFrequencey.name
    //   }
    // )

    this.sendAdjustFrequency.emit(this.selectedFrequencey.name)
    const pageMetaPageInterval: PageMetaPageInterval = new PageMetaPageInterval(
      this.selectedStartDate,
      { ratingFrequency: Number.parseInt(this.selectedInterval.code), ratingFrequencyUnit: this.selectedFrequencey.code },
      this.endDate
    )
    this.startDateEvent.emit(pageMetaPageInterval)
  }
  showCalender() {
    this.hiddenCalenderFlag = true;
  }
}
