import {
  Component,
  OnInit,
  ViewChild,
  Input,
  EventEmitter,
  Output,
} from '@angular/core';
import { Table } from 'primeng/table';
import { PrimeNGConfig } from 'primeng/api';
import { ActivitesService } from 'src/app/services/activites.service';
import { ActivityResponse } from 'src/app/models/activities/activities';
import { formatDate } from '@angular/common';
import { FilterNavComponent } from '../filter-nav/filter-nav.component';
import { DataSharingService } from 'src/app/services/data-sharing.service';

export interface Country {
  name?: string;
  code?: string;
}
export interface Representative {
  name?: string;
  image?: string;
}
export interface Customer {
  id?: number;
  name?: number;
  country?: Country;
  company?: string;
  date?: string;
  status?: string;
  representative?: Representative;
}
@Component({
  selector: 'app-ptable',
  templateUrl: './ptable.component.html',
  styleUrls: ['./ptable.component.scss'],
})
export class PtableComponent implements OnInit {
  selectedRows: ActivityResponse[] = [];
  customers: Customer[];
  selectedCustomers: Customer[];
  representatives: Representative[];
  statuses: any[];
  loading: boolean = true;
  isCheckboxSelected: boolean = false;
  @Output() sendselectedActivities = new EventEmitter<any>();

  @Input() activities: Array<ActivityResponse> = [
    {
      color: 'RED',
      creationDate: new Date(),
      dueDate: new Date().toDateString(),
      note: 'tufyghkugiyk',
      ownerName: 'yftgjhk',
      priority: 'CRITICAL',
      type: 'sdcsdc',
    },
  ];
  @ViewChild('dt') table: Table;
  @Output() sendCheckForEmail: EventEmitter<boolean> = new EventEmitter<boolean>();
  checkForMail: boolean;

  constructor(
    private activityService: ActivitesService,
    private primengConfig: PrimeNGConfig,
    private DataSharingService: DataSharingService
  ) {}
  ngOnInit() {
    this.activityService.getCustomersLarge().then((customers) => {
      this.customers = customers;
      this.loading = false;
    });
    // this.representatives = [
    //   { name: 'Amy Elsner', image: 'amyelsner.png' },
    //   { name: 'Anna Fali', image: 'annafali.png' },
    //   { name: 'Asiya Javayant', image: 'asiyajavayant.png' },
    //   { name: 'Bernardo Dominic', image: 'bernardodominic.png' },
    //   { name: 'Elwin Sharvill', image: 'elwinsharvill.png' },
    //   { name: 'Ioni Bowcher', image: 'ionibowcher.png' },
    //   { name: 'Ivan Magalhaes', image: 'ivanmagalhaes.png' },
    //   { name: 'Onyama Limba', image: 'onyamalimba.png' },
    //   { name: 'Stephen Shaw', image: 'stephenshaw.png' },
    //   { name: 'XuXue Feng', image: 'xuxuefeng.png' },
    // ];
    // this.statuses = [
    //   { label: 'Unqualified', value: 'unqualified' },
    //   { label: 'Qualified', value: 'qualified' },
    //   { label: 'New', value: 'new' },
    //   { label: 'Negotiation', value: 'negotiation' },
    //   { label: 'Renewal', value: 'renewal' },
    //   { label: 'Proposal', value: 'proposal' },
    // ];
    this.primengConfig.ripple = true;
  }
  onActivityChange(event: any) {
    const value = event.target.value;
    if (value && value.trim().length) {
      const activity = parseInt(value);
      if (!isNaN(activity)) {
        this.table.filter(activity, 'activity', 'gte');
      }
    }
  }
  onDateSelect(value) {
    this.table.filter(this.formatDate(value), 'date', 'equals');
  }
  formatDate(date) {
    let month = date.getMonth() + 1;
    let day = date.getDate();
    if (month < 10) {
      month = '0' + month;
    }
    if (day < 10) {
      day = '0' + day;
    }
    return date.getFullYear() + '-' + month + '-' + day;
  }
  onRepresentativeChange(event: any) {
    this.table.filter(event.value, 'representative', 'in');
  }

  isSelected(activity: ActivityResponse): boolean {
    return this.selectedRows.includes(activity);
  }

  toggleSelection(event: Event, activity: ActivityResponse): void {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      this.selectedRows.push({
        ...activity,
        dueDate: activity.dueDate
          ? formatDate(activity?.dueDate?.valueOf(), 'M/d/yy', 'en-US')
          : null,
      });
    } else {
      this.selectedRows.filter((act, ind) => {
        if (
          act.color == activity.color &&
          act.creationDate == activity.creationDate &&
          act.note == activity.note &&
          act.ownerName == activity.ownerName &&
          act.priority == activity.priority &&
          act.type == activity.type
        )
          this.selectedRows.splice(ind, 1);
      });
    }
    this.sendselectedActivities.emit(this.selectedRows);
    console.log(this.selectedRows);
    // this.sendselectedActivities.emit(this.selectedRows);
   
    
      if (this.selectedRows.length > 0)
      {
         this.checkForMail = true
         
      } 
      else{
        this.checkForMail = false
      }
  }

  handleCheckboxChange(event: Event) {
    // const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    // this.isCheckboxSelected = Array.from(checkboxes).every((checkbox: HTMLInputElement) => checkbox.checked);
    // this.DataSharingService.sendSharedData(this.isCheckboxSelected);
  }
  openEmail(){
    this.sendCheckForEmail.emit(this.checkForMail);
  }
}
