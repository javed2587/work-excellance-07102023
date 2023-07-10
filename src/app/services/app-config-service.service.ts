import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { WorkType } from '../models/work-type';

@Injectable({
  providedIn: 'root'
})
export class AppConfigServiceService {
  
  baseURL:string =  'assets/testVal.json'
  
  constructor(private httpClient: HttpClient) { }

  getValues(): Observable<WorkType[]> {
    return this.httpClient.get<WorkType[]>(this.baseURL + 'people')
  }

  addValues(workType:WorkType): Observable<any> {
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(workType);
    console.log(body)
    return this.httpClient.post(this.baseURL + 'people', body,{'headers':headers})
  }
}
