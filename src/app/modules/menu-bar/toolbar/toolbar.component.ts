import { Component, Input, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { TeamMembersService } from 'src/app/services/team-members.service';
import { FilterService } from 'primeng/api';
@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
  providers: [TeamMembersService, FilterService]
})
export class ToolbarComponent implements OnInit {

  indexInputField: number;


addMessage: string = '';
messageType: string = '';
alertFlag: boolean = false;
teamLeads:any[];
filteredCountries: any[];
selectedCountry: any;
// filteredCountries: any[];

  @Input() moduleName:string

  // navigations:[] = []
  navigations = {

    label: ["Work System", "Menu", "Config", "Paint by Letters 3/5 %", 'vl', "Opportunities", "Steps", 'vl', "Page PDF",'vl', "Unlock", "New", 'vl', "Team Members"],
    routerLink: ["Work System", '', "Paint by Numbers", '', "Opportunities", "Tasks", "Notes", '', "Page PDF",'', "Send In Mail", "New", '', "Unlock", ""],
    icon: ["./assets/images/header-images/worksystem.svg", "", "./assets/images/header-images/Config.png", "./assets/images/header-images/paintbynumbers.svg", "", "./assets/images/header-images/opportunities.svg", "./assets/images/header-images/thispageicon.svg", "", "./assets/images/header-images/thispageicon.svg","", "./assets/images/header-images/unlock.svg",  "./assets/images/header-images/new.svg", "", "./assets/images/header-images/opportunities.svg"],
    height: ["28px", "32px", "46px","28px", "", "35px", "32px","", "28px","", "41px", "41px", "", "29px"],
    width: ["33px", "23px","34px", "35px","", "46px", "38px","","28px", "", "42px", "30px", "", "44px"]
  }


  configlocksrc = "./assets/images/header-images/lock-open.svg";
  configlockfloatstyle = "left";
  teamMembers: any[] = [];
  rotatedegree1:any;
  rotatedegree: any;
  start_date: any;
  end_date: Date;
  constructor(public datepipe: DatePipe, private memebersService: TeamMembersService, private filterService: FilterService) {

    // this.memebersService.getTeamLeads().then(leads => {
    //   this.teamLeads = leads;
    // });
  }

  pagepdf_model_display = "none";
  display = "none";
  team_model_display = "none";

  pagetask_model_display="none";


  ngOnInit() {




    this.navigations.label[0]= this.moduleName
    console.log("toolbar component........?",this.moduleName)
  }

  // filterCountry(event) {
  //
  //   //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
  //   let filtered: any[] = [];
  //   let query = event.query;
  //   for (let i = 0; i < this.teamLeads.length; i++) {
  //     let country = this.teamLeads[i];
  //     if (country.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
  //       filtered.push(country);
  //     }
  //   }

  //   this.filteredCountries = filtered;
  // }

  openModal() {
    this.closeteammodel();
    this.openclosepagepdfmodel();
    this.rotatedegree = "rotate(0deg)";
    this.pagepdf_model_display = "none";
    this.display = "block";
  }
  onCloseHandled() {
    this.display = "none";
  }

  openteammodel() {
    this.onCloseHandled();
    this.openclosepagepdfmodel();
    this.rotatedegree = "rotate(0deg)";
    this.pagepdf_model_display = "none";
    this.team_model_display = "block";
  }
  closeteammodel() {
    this.team_model_display = "none";
  }
  openclosepagepdfmodel() {
    if (this.pagepdf_model_display == "block") {
      this.rotatedegree = "rotate(0deg)";
      this.pagepdf_model_display = "none";
    } else {
      this.rotatedegree = "rotate(90deg)";
      this.pagepdf_model_display = "block";
      this.pagetask_model_display = "none";
      this.rotatedegree1 = "rotate(0deg)";
      this.onCloseHandled();
      this.closeteammodel();
    }
  }

  selectInterval(interval: any) {
    this.start_date.month = this.start_date.month + parseInt(interval.value);
    this.end_date = new Date(
      this.start_date.year,
      this.start_date.month - 1,
      this.start_date.day
    );
    let value: string =
      this.datepipe.transform(this.end_date, "yyyy-MM-dd")?.toString() || "";
    document.getElementById("input-end-date")?.setAttribute("value", value);
  }
  addteammember() {

    this.alertFlag = false;
    if(this.teamMembers.length < 30) {
      this.teamMembers.push({value:""});
    } else {
      this.addMessage = 'You can not add more then 30 members';
      this.alertFlag = true;
      this.messageType = 'warning';
    }

  }
  removeteammember() {
    if (this.indexInputField !== null) {
      console.log('Deleting from index:', this.indexInputField);
      this.teamMembers.splice(this.indexInputField, 1);
      console.log('Deleting from if part');
      this.indexInputField = null;
    } else {
      this.teamMembers.pop();
      console.log('Deleting from else part');
    }
  }
  lockunlock(index: any) {
    if (this.navigations.label[index] == "Unlock") {
      this.navigations.label[index] = "Lock";
      this.navigations.icon[index] = "./assets/images/header-images/lock.svg";

    }
  }
  configlockunlock() {
    this.configlocksrc = "./assets/images/header-images/lock-close.svg";
    this.configlockfloatstyle = "right";

  }
  openclosetasksmodel(){
    if (this.pagetask_model_display == "block") {
      this.rotatedegree1 = "rotate(0deg)";
      this.pagetask_model_display = "none";
    } else {
      this.rotatedegree1 = "rotate(90deg)";
      this.pagetask_model_display = "block";
      this.onCloseHandled();
      this.pagepdf_model_display="none";
      this.rotatedegree = "rotate(0deg)";
      this.closeteammodel();
    }
  }
  getIndex(index: number) {
    this.indexInputField = index;
    console.log(
      'Index of Input Field at the toolbar component:',
      this.indexInputField
    );
  }
  updatevalue(value: string) {
    this.teamMembers[this.indexInputField].value = value;
    console.log('Team Members Array after value update:', this.teamMembers);
  }
}
