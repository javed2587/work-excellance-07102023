import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css'],

})

export class ReportsComponent implements OnInit {

 // Display of Dialog Box
 display : Boolean = false;
  
 // Index
   tableIndex : number ;
   currentTitle: string
 
   
 
   statusOfDailyTask: Boolean = false;
 
   card : Boolean = false;
   showReport(){
     console.log(this.card);
     
     this.card = true
   }
 ;
 
   
   reportsData: any[] = [
     {
       dateCreated: '08-12-2022',
       lastUpdate: 'Jacob',
       pageOwner: 'Increase Sales',
       pageType: 'WS',
       pageName: 'WS',
     },
     {
       dateCreated: '08-12-2022',
       lastUpdate: 'Jacob',
       pageOwner: 'Increase Sales',
       pageType: 'WS',
       pageName: 'WS',
     },
     {
       dateCreated: '08-12-2022',
       lastUpdate: 'Jacob',
       pageOwner: 'Increase Sales',
       pageType: 'WS',
       pageName: 'WS',
     },
     {
       dateCreated: '08-12-2022',
       lastUpdate: 'Jacob',
       pageOwner: 'Increase Sales',
       pageType: 'WS',
       pageName: 'WS',
     },
     {
       dateCreated: '08-12-2022',
       lastUpdate: 'Jacob',
       pageOwner: 'Increase Sales',
       pageType: 'WS',
       pageName: 'WS',
     },
     {
       dateCreated: '08-12-2022',
       lastUpdate: 'Jacob',
       pageOwner: 'Increase Sales',
       pageType: 'WS',
       pageName: 'WS',
     },
     {
       dateCreated: '08-12-2022',
       lastUpdate: 'Jacob',
       pageOwner: 'Increase Sales',
       pageType: 'WS',
       pageName: 'WS',
     },
   ];
   constructor() {
    
   }
 
   
   
 
   showReports: Boolean = true;
 
   ngOnInit(): void {
     
    
    
     }
 
   showDialog(e, index){
     this.display = true;
     this.tableIndex = index;
   }
 
 
 
   closeDialog(){
     this.display = false;
   }
 
 
  
   changeShowBody() {
     if (this.showReports === false) {
       this.showReports = true;
     } else if (this.showReports === true) {
       this.showReports = false;
     }
   }
 
   toggleDailytable(val) {
     this.statusOfDailyTask =!this.statusOfDailyTask
   }
   reportsArray: any = [
     {
       index: 1,
       title: 'Active User Report',
     },
     {
       index: 2,
       title: 'Pages Report',
     },
     {
       index: 3,
       title: 'Interval Report',
     },
     {
       index: 4,
       title: 'Action Report',
     },
     {
       index: 5,
       title: 'Status Report',
     },
     {
       index: 6,
       title: 'Rotting Exception Report',
     },
     {
       index: 7,
       title: 'Activity Page Download',
     },
     {
       index: 8,
       title: 'waiting reports',
     }
   ];
 
   reportTitle(event) {
     this.currentTitle = event.title
   }

}
