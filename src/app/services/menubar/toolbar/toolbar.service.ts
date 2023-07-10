import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { IOrganizationLevels } from 'src/app/models/organization-levels/organization-levels';

@Injectable({
  providedIn: 'root'
})
export class ToolbarService {
  nodeEmitter: EventEmitter<IOrganizationLevels> = new EventEmitter<IOrganizationLevels>()

  constructor(private http:HttpClient) {}


  addteamdetail(teamDetail:any)
  {
    console.log(teamDetail);
    this.http.post('http://localhost:8080/worksystem/menubar/addteamdetail',{ teamDetail})
        .subscribe((responseData) => {
            console.log(responseData);
        }); 
  }
  addpageconfig(start_date:any,interval:any,end_date:any)
  {
    console.log(start_date,interval,end_date);
    this.http.post('http://localhost:8080/worksystem/menubar/addpageconfig',{ start_date,interval,end_date})
    .subscribe((responseData) => {
        console.log(responseData);
    }); 
  }
}
