import {Injectable} from '@angular/core';
import {DatePipe} from '@angular/common';
import moment from 'moment';
import {EventEmitter} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  passValue: EventEmitter<any> = new EventEmitter<any>()

  constructor(public datepipe: DatePipe) {
  }

  //MM/dd/yy
  mdyFormatter(obj: any) {
    //
    return this.datepipe.transform(new Date(obj), 'MM/dd/yy');
  }

  strmdyFormattee(str: string) {
    return moment(str).format('MM/DD/yyyy');
  }

//string to yyyy-mm-dd
  ymdStringFormatter(str: string) {
    return moment(str).format('YYYY-MM-DD');
  }

  differenceofDays(firstDate: any, secondDate: any) {
    return (Math.abs(moment(firstDate).diff(moment(secondDate), 'days')));

  }

  differenceofMonths(firstDate: any, secondDate: any) {
    return (Math.abs(moment(firstDate).diff(moment(secondDate), 'months')))
  }

  addNoOfDays(date: Date, days: number) {

    date.setDate(date.getDate() + (days));

    return date;
  }

  addNoOfMonths(date: Date, months: number) {

    date.setMonth(date.getMonth() + months);
    return date;
  }

  mdyyFormatter(str: string) {
    return moment(str).format('DD/MMY/YYYY');

  }

  findDay(str: string) {
    return moment(this.mdyyFormatter(str), "DD/MM/YYYY").format('ddd')

  }

  formatDate(date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;

    return [year, month, day].join('-');
  }
}
