import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
;

@Injectable({
  providedIn: 'root'
})
export class OrganizationsService implements OnInit {

  private apiUrl = 'http://103.155.18.187:8019/api/organizations';
  public data: any = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get('apiUrl').subscribe( response => {
      console.log(response);
      this.data = response;
    })
    
  }
 

  
}
