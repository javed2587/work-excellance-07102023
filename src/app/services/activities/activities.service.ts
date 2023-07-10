import { Injectable } from '@angular/core';
import {
  HttpClient
} from '@angular/common/http';
import { ActivityRequest, ActivityResponse } from 'src/app/models/activities/activities';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ActivitiesService {

  baseUrl: String = environment.baseUrl
  constructor(
    private http: HttpClient
  ) { }

  findActivitiesByFilter(filters: ActivityRequest): Observable<Array<ActivityResponse>> {
    return this.http.post<Array<ActivityResponse>>(`${this.baseUrl}/activities`, filters)
  }
  sendEmail(body: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/send-email-with-tasks`, body)
  }
}
