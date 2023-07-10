import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FilterService, PrimeNGConfig } from 'primeng/api';
import { TeamMemebrs } from 'src/app/models/common/team-members';
import { TeamMembersService } from 'src/app/services/team-members.service';
import {TeamMemebers} from "../../../models/team-memebers";
import {PageMetaPageTeamTeamLeader, PageMetaPageTeamTeamMember} from "../../../models/work-system/work-system-body";
import {User} from "../../../models/user/user";
@Component({
  selector: 'app-team-member',
  templateUrl: './team-member.component.html',
  styleUrls: ['./team-member.component.css'],
  providers: [TeamMembersService, FilterService]
})
export class TeamMemberComponent implements OnInit {

  addMessage: string = '';
  messageType: string = '';
  teamLead: PageMetaPageTeamTeamLeader
  @Input() teamLeader: PageMetaPageTeamTeamLeader
  teamLeaderUser: User
  teamMemberUsers: Array<User> = []

  results: Array<User> = []

  indexInputField: number;
  // teamMembers: any[] = [];
  teamMembers: PageMetaPageTeamTeamMember[] = []
  alertFlag: boolean = false
  @Output() sendTeamMembers: EventEmitter<Array<PageMetaPageTeamTeamMember>> = new EventEmitter<Array<PageMetaPageTeamTeamMember>>()
  @Output() sendTeamLead: EventEmitter<PageMetaPageTeamTeamLeader> = new EventEmitter<PageMetaPageTeamTeamLeader>();
  @Output() sendCloseFlag = new EventEmitter<any>();
  @Input() closeTeamModel: any;
  @Input() teamMemberList: Array<PageMetaPageTeamTeamMember>;
  constructor(
    private primengConfig: PrimeNGConfig,
    private filterService: FilterService,
    private teamMemeberService: TeamMembersService
  ) {

  }
  members: Array<User> = []
  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.teamMemeberService.loadUsers()
    if (this.teamLeader) {
      this.teamLead = this.teamLeader
      this.teamLeaderUser = new User(this.teamLeader.userId, this.teamLeader.name, null,
      null, null, [], null, null)
    }
    if (this.teamMemberList) {
      if (this.teamMemberList.length > 0) {
        this.teamMembers = this.teamMemberList
        this.teamMemberUsers = this.teamMemberList.map(m => {
          return new User(m.userId ? m.userId.valueOf() : null, m.name ? m.name.valueOf() : null,
          m.name ? m.name.valueOf() : null, null, null, [], null, null)
        })
        this.members = this.teamMemberUsers
        
      }
    }
  }
  getIndex(index: number) {

    this.indexInputField = index;
  }
  updatevalue(value: string) {

    // this.teamMembers[this.indexInputField].value = value;
  }
  i: number = 0
  addteammember() {

    this.alertFlag = false;
    if (this.teamMembers.length < 30) {
      this.teamMembers.push(new PageMetaPageTeamTeamMember(null, null, null));
      this.teamMemberUsers.push(new User(null, null, null, null, null, [], null, null))
    } else {
      this.addMessage = 'You can not add more then 30 members';
      this.alertFlag = true;
      this.messageType = 'warning';
    }
  }
  removeteammember() {

    if (this.indexInputField !== null) {
      this.teamMembers.splice(this.indexInputField, 1);
      this.teamMemberUsers.splice(this.indexInputField, 1)
      this.indexInputField = null;
    } else {
      this.teamMembers.pop();
    }
  }
  saveTeamMember(member, index) {

    
    console.log("....", member)
    this.teamMembers[index].userId = member.id
    this.teamMembers[index].name = member.username
    console.log("saveTeamMember...", this.teamMembers)
  }
  closeteammodel() {

    this.closeTeamModel = true;
    this.sendCloseFlag.emit(false);
  }
  saveTeamMembers() {
    this.sendTeamMembers.emit(this.teamMembers);
    this.sendTeamLead.emit(this.teamLead)
    this.sendCloseFlag.emit(false);
    
  }

  search(event) {
    this.results = this.teamMemeberService.search(event.query)
  }
  saveTeamLead(teamLead: User) {
    console.log("teamLead...", teamLead)
    this.teamLead = new PageMetaPageTeamTeamLeader(teamLead.id, teamLead.username)
    this.teamLeaderUser = teamLead
    
  }
  // filterCountry(event) {
  //
  //   //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
  //   let filtered: any[] = [];
  //   let query = event.query;
  //   for (let i = 0; i < this.names.length; i++) {
  //     let country = this.names[i];
  //     if (country.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
  //       filtered.push(country);
  //     }
  //   }

  //   this.filteredNames = filtered;
  // }

}
