import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Owner } from "../models/owner";
import { TeamMemebers } from "../models/team-memebers";
import { User } from "../models/user/user";
import { UserService } from "./user/user.service";
import { environment } from "src/environments/environment";

@Injectable()
export class TeamMembersService {

  _jsonUrl: 'assets/data/team-leads.json'
  ownerList: 'assets/data/owner.json'
  members: Array<User> = []
  baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient, private userService: UserService) {

    this.members = [
      // new User("01", "Bria Nain","brianain@gmail.com", null, null, ["ROLE_ORG_ADMIN"]),
      // new User("02", "Rehan Subhan","rehansubhan@gmail.com",null, null, ["ROLE_ORG_ADMIN"]),
      // new User("03", null,"aidangran@gmail.com", null,null, ["ROLE_ORG_ADMIN"]),
      // new User("04",null,"alexander@gmail.com", null,null, ["ROLE_ORG_ADMIN"]),
      // new User("05", null,"benjamin@gmail.com", null,null, ["ROLE_ORG_ADMIN"]),
      // new User("06", null,"roman@gmail.com", null,null, ["ROLE_ORG_ADMIN"]),
      // new User("07",null, "josiah@gmail.com", null,null, ["ROLE_ORG_ADMIN"]),
      // new User("08",null, "jaxon@gmail.com", null,null, ["ROLE_ORG_ADMIN"]),
      // new User("09",null, "andrew@gmail.com", null,null, ["ROLE_ORG_ADMIN"]),
      // new User("10",null, "luca@gmail.com", null,null, ["ROLE_ORG_ADMIN"]),
      // new User("11", null,"benjamin@gmail.com", null,null, ["ROLE_ORG_ADMIN"])
    ]
  }

  loadUsers() {
    if (this.userService.findByOrgId()) {
      this.userService.findByOrgId().subscribe((users: Array<User>) => {
        if (users) {
          if (users.length > 0) {
            this.members = users
            this.members.forEach((m, i) => {
              if (!m.username && (m.firstName || m.lastName)) {
                if (m.firstName)
                  m.username = m.firstName.valueOf()
                else m.username = ''
                if (m.lastName)
                  m.username = m.username + ' ' + m.lastName
              }
              if (!m.username)
                m.username = ''
            })
          }
        }
      })
    }
  }

  findByOrgId(): Observable<Array<User>> {
    return this.http.get<Array<User>>(`${this.baseUrl}/users`);
  }

  search(keywords: string): Array<User> {
    let names: Array<User> = []
    for (let i = 0; i < this.members.length; i++) {
      if (this.members[i].username.includes(keywords)) {
        names.push(this.members[i])
      }
    }
    return names;
  }

  testObserver() {
    return new Observable(observer => {
      observer.next('x');
      observer.next('y');
    })
  }

  getOwners(): Observable<Owner[]> {
    return this.http.get<Owner[]>(this.ownerList)
  }

}

