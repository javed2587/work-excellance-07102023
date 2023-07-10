import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpEvent, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { Organization } from '../../models/organization/organization-main';
import { Observable, observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { IOrganizationLevels, IOrganizationPageSet, Nodes, OrganizationLevels } from '../../models/organization-levels/organization-levels';
import { environment } from "../../../environments/environment";
import { User } from "../../models/user/user";
import { ParamService } from "../param.service";
import { WorkSystem } from "../../models/work-system/work-system";
import { MatSnackBar } from '@angular/material/snack-bar';
import { debug } from 'console';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {
  private baseUrl: string = environment.baseUrl
  private headers = new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', '*');
  constructor(private http: HttpClient, private paramService: ParamService, private MatSnackBar : MatSnackBar) { }

  createOrganization(data: Organization): Observable<Organization> {
    return this.http.post<Organization>(`${this.baseUrl}/organizations`, data, { headers: this.headers }).pipe(catchError(this.handleError))
  }
  getOrganization(): Observable<Array<Organization>> {
    return this.http.get<Array<Organization>>(`${this.baseUrl}/organizations`)
  }

  updateOrganization(data: Organization): Observable<Organization> {
    return this.http.put<Organization>(`${this.baseUrl}/organizations`, data, { headers: this.headers }).pipe(catchError(this.handleError))
  }

  findById(id: string): Observable<Organization> {
    return this.http.get<Organization>(`${this.baseUrl}/organizations/${id}`, { headers: this.headers }).pipe(catchError(this.handleError))
  }
  findByOrgId(): Observable<Organization> {
    const params: HttpParams = this.paramService.getParams()
    if (params) {
      if (params.get("organizationId")) {
        return this.http.get<Organization>(`${this.baseUrl}/organizations/${params.get("organizationId")}`, {
          headers: this.headers,
        })
      }
      return null;
    }
    return null
  }

  findNodesByOrgId(): Observable<Array<IOrganizationLevels>> {
    return this.http.get<Array<IOrganizationLevels>>(`${this.baseUrl}/nodes`)
  }

  findNodeById(id: string): Observable<IOrganizationLevels> {
    return this.http.get<IOrganizationLevels>(`${this.baseUrl}/nodes/${id}`)
  }

  findMyFocusPages(): Observable<Array<IOrganizationPageSet>> {
    return this.http.get<Array<IOrganizationPageSet>>(`${this.baseUrl}/my-focus`)
  }

  createOrganizationLevel(data: OrganizationLevels) {
    return this.http.post<OrganizationLevels>(`${this.baseUrl}/nodes`, data, { headers: this.headers }).pipe(catchError(this.handleError))
  }

  createOrganizationBulk(data: Nodes) {
    return this.http.post<Nodes>(`${this.baseUrl}/nodes/bulk`, data, { headers: this.headers }).pipe(catchError(this.handleError))
  }

  bulkImportCsvUsers(file, orgId: string): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    if(file.type !=  "text/csv"){
  
      this.MatSnackBar.open('File format error.', 'close', {
        duration: 3000, 
        panelClass: "mat-snack-bar-error"
      });

    }
    
    const req = new HttpRequest('POST', `${this.baseUrl}/users/bulk-import`, formData, {
      headers: new HttpHeaders().set('Organization-Id', orgId),
      reportProgress: true,
      responseType: 'json'

    });
    return this.http.request(req).pipe(catchError(this.handleError));
    // return this.http.post(`${API_URL}users/bulk-import`, formData, { headers: this.headers }).pipe(catchError(this.handleError))
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
