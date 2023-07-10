import { Injectable } from '@angular/core';
import { environment } from "../../../environments/environment";
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from "@angular/common/http";
import { ParamService } from "../param.service";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { WorkMeasurement } from "../../models/work-measurement/work-measurement";

@Injectable({
  providedIn: 'root'
})
export class WorkMeasurementService {
  private baseUrl: string = environment.baseUrl
  private headers = new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', '*');

  constructor(private http: HttpClient, private paramService: ParamService) {
  }

  createWorkMeasurement(data: WorkMeasurement): Observable<WorkMeasurement> {
    return this.http.post<WorkMeasurement>(`${this.baseUrl}/work-measurements`, data, { headers: this.headers }).pipe(catchError(this.handleError))
  }
  updateWorkMeasurement(data: WorkMeasurement): Observable<WorkMeasurement> {
    return this.http.put<WorkMeasurement>(`${this.baseUrl}/work-measurements`, data, { headers: this.headers }).pipe(catchError(this.handleError))
  }

  findById(id: string): Observable<WorkMeasurement> {
    return this.http.get<WorkMeasurement>(`${this.baseUrl}/work-measurements/${id}`, { headers: this.headers }).pipe(catchError(this.handleError))
  }

  findByOrgId(): Observable<Array<WorkMeasurement>> {
    return this.http.get<Array<WorkMeasurement>>(`${this.baseUrl}/work-measurements`)
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
