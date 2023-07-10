import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import countries from '../../assets/data/countries.json'

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  assertPath = countries

  constructor(private http: HttpClient) { }

  getCountries() {
    return this.http.get<any>('../../assets/data/countries.json')
      .toPromise()
      .then(res => <any[]>res.data)
      .then(data => { return data; });
    }
}
