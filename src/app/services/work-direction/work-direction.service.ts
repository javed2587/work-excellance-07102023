import { Injectable } from '@angular/core';
import { environment } from "../../../environments/environment";
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from "@angular/common/http";
import { ParamService } from "../param.service";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { WorkDirection } from "../../models/work-direction/work-direction";

@Injectable({
  providedIn: 'root'
})
export class WorkDirectionService {
  private baseUrl: string = environment.baseUrl
  private headers = new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', '*');

  constructor(private http: HttpClient, private paramService: ParamService) {
  }

  createWorkDirection(data: WorkDirection): Observable<WorkDirection> {
    return this.http.post<WorkDirection>(`${this.baseUrl}/work-directions`, data, { headers: this.headers }).pipe(catchError(this.handleError))
  }

  findById(id: string): Observable<WorkDirection> {
    return this.http.get<WorkDirection>(`${this.baseUrl}/work-directions/${id}`, { headers: this.headers }).pipe(catchError(this.handleError))
  }

  findByOrgId(): Observable<Array<WorkDirection>> {
    return this.http.get<Array<WorkDirection>>(`${this.baseUrl}/work-directions`)
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
