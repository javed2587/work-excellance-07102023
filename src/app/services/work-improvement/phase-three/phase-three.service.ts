import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ListFormat } from 'typescript';

@Injectable({
  providedIn: 'root'
})
export class PhaseThreeService {
  constructor(private http:HttpClient) {}




//----------------------------BACKEND-----------------------------------------

  addInitiativeDetail(initiativeData:any)
  {

    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    console.log("ihi", initiativeData)

    // this.http.post('http://localhost:8080/workimprovement/phasethree/create',initiativeData,{headers:headers})
    //     .subscribe((responseData) => {
    //         // console.log(responseData);
    //     });
  }
   getInitiativeDetail()
   {

  //     return  this.http.get<ListFormat>("http://localhost:8080/workimprovement/phasethree/get");


   }
  deleteInititivebyID(id:number)
  {

    const params = new HttpParams().set('id', id);
    console.log("id",id)
    // this.http.delete('http://localhost:8080/workimprovement/phasethree/delete',{params:params})
    //     .subscribe((responseData) => {
    //         // console.log(responseData);
    //     });
  }
}
