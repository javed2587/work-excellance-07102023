import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ActivitesService {

  constructor(private http: HttpClient) { }

  getCustomersLarge() {
    return this.http
      .get<any>('assets/data/activities-table.json')
      .toPromise()
      .then((res) => <any[]>res.data)
      .then((data) => {
        return data;
      });
  }
}
