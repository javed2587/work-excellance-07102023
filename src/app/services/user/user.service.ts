import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User, UserRole } from '../../models/user/user';
import { ParamService } from '../param.service';
import { PageMetaPageTeam } from 'src/app/models/work-system/work-system-body';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl: string = environment.baseUrl;
  private headers = new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', '*');

  constructor(private http: HttpClient, private paramService: ParamService, private snackbar : MatSnackBar) {}

  createUser(data: User): Observable<User> {
    return this.http
      .post<User>(`${this.baseUrl}/users`, data, { headers: this.headers })
      .pipe(catchError(this.handleError));
  }

  findById(id: string): Observable<User> {
    return this.http
      .get<User>(`${this.baseUrl}/users/${id}`, { headers: this.headers })
      .pipe(catchError(this.handleError));
  }

  getLoggedInUser(): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/users/me`)
  }

  findByOrgId(): Observable<Array<User>> {
    return this.http.get<Array<User>>(`${this.baseUrl}/users`);
  }

  findAll(): Observable<Array<User>> {
    return this.http.get<Array<User>>(`${this.baseUrl}/users`, {
      headers: this.headers,
    });
  }

  getUserRole() {
    const roles: string[] = this.getRolesFromLocalStorage()
    if (roles) {
      return roles[0]
    }
    return null
  }

  private getRolesFromLocalStorage(): string[] {
    const rolesString = localStorage.getItem('roles');
    let roles: string[] = [];
    if (rolesString) {
      try {
        roles = JSON.parse(rolesString);
      } catch (error) {
        roles = [rolesString]; // Convert to array if not in array format
      }
    }
    return roles;
  }

  getLoggedInUserRole(team: PageMetaPageTeam) {
    const userId = localStorage.getItem('userId');
    if (userId) {
      if (team.owner) {
        const teamOwnerId = team.owner.userId;
        if (userId.trim() == teamOwnerId.trim()) {
          return UserRole.PAGE_OWNER;
        }
      }
      if (team.teamLeader) {
        if (userId == team.teamLeader.userId) {
          return UserRole.TEAM_LEADER;
        }
      }
      if (team.teamMembers) {
        if (
          team.teamMembers.filter((member) => member.userId == userId).length >
          0
        )
          return UserRole.TEAM_MEMBER;
      }
      return UserRole.ORG_ADMIN;
    }
    return null;
  }

  // downloadCSV(data: string) {
  //   return this.http.get(`${this.baseUrl}/users/bulk-import-report/${data}`, {
  //     responseType: 'text',
  //   });
  // }
  downloadCSV(data: string) {
    return this.http.get(`${this.baseUrl}/users/bulk-import-report/${data}`, {
      responseType: 'text',
    }).pipe(
      tap(
        () => {
          this.snackbar.open('User report downloaded successfully', 'Close', {
            duration: 3000,
            panelClass: 'mat-snack-bar-success'
          });
        },
        () => {
          this.snackbar.open('User report download failure', 'Close', {
            duration: 3000,
            panelClass: 'mat-snack-bar-error'
          });
        }
      )
    );
  }
  
  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }
}
