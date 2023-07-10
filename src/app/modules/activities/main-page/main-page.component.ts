import { HttpHeaders } from '@angular/common/http';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivityRequest, ActivityResponse } from 'src/app/models/activities/activities';
import { ActivitiesService } from 'src/app/services/activities/activities.service';
import { HttpClient } from '@angular/common/http';




@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit{

  email: string ;
  subject : string;
  Activities: Array<ActivityResponse>;



  display: boolean = false;
  activities: Array<ActivityResponse>
  constructor(private activityRequest: ActivitiesService, private http: HttpClient) { }

  ngOnInit(): void {

  }


  getFilters(request: ActivityRequest) {
    this.activityRequest.findActivitiesByFilter(request).subscribe((res: Array<ActivityResponse>) => {
      
      if (res)
        this.activities = res
    })
  }

  saveform(){
    const body = {
      to: this.email,
      subject: this.subject,
      activities: this.Activities

    }
    this.activityRequest.sendEmail(body).subscribe(res => {
      console.log(res)
    })

    this.display = false;
  }
  recievemailData(data){
    this.display = data;
  }

  closeform(){
    this.display = false;
  }

  sendMailActivated: Boolean = false

  recieveSelectedActivities(data){
    this.Activities = data
    
    if (this.Activities) {
      if (this.Activities.length > 0)
        this.sendMailActivated = true
      else
        this.sendMailActivated = false
    } else {
      this.sendMailActivated = false
    }
    
    console.log(this.Activities)
  }
  recieveCheckForEmail(data: boolean){
    this.display = data;
  }
}
