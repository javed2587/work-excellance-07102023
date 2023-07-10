import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from "@angular/common/http";
import { Organization } from "../../models/organization/organization-main";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { WorkSystem } from "../../models/work-system/work-system";
import { environment } from "../../../environments/environment";
import { WorkImprovement } from "../../models/work-improvement/work-improvment";
import { User } from "../../models/user/user";
import { ParamService } from "../param.service";

@Injectable({
  providedIn: 'root'
})
export class WorkImprovementService {
  private baseUrl: string = environment.baseUrl
  private headers = new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', '*');

  constructor(private http: HttpClient, private paramService: ParamService) {
  }

  createWorkImprovement(data: WorkImprovement): Observable<WorkImprovement> {
    return this.http.post<WorkImprovement>(`${this.baseUrl}/work-improvements`, data, { headers: this.headers }).pipe(catchError(this.handleError))
  }

  findById(id: string): Observable<WorkImprovement> {
    return this.http.get<WorkImprovement>(`${this.baseUrl}/work-improvements/${id}`, { headers: this.headers }).pipe(catchError(this.handleError))
  }

  findByOrgId(): Observable<Array<WorkImprovement>> {
    return this.http.get<Array<WorkImprovement>>(`${this.baseUrl}/work-improvements`)
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
