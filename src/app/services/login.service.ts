import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserService } from './user/user.service';
import { User } from '../models/user/user';
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http: HttpClient, private router: Router, private userService: UserService, private snackBar: MatSnackBar) { }
  baseUsrl: string = environment.baseUrl
  Login(data: any) {
    this.http.post(`${this.baseUsrl}/auth/signin`, data).subscribe(
      (result: any) => {
        if (result) {
          if (result.token) {
            localStorage.setItem("userId", result.id);
            localStorage.setItem("token", result.token);
            localStorage.setItem("roles", result.roles ? result.roles.toString() : null);
            if (result?.roles?.includes('ROLE_ADMIN')) {
              this.router.navigate(['/configuration/organizations']);
            } else if (result.organizationId) {
              localStorage.setItem("organizationId", result.organizationId);
              ;
              this.router.navigate(['/dashboard']);
            }
            // this.userService.findById((result.id)).subscribe((user: User) => {
            //   if (user) {
            //     localStorage.setItem("organizationId", user.organizationId)
            //   }
            // })
          }
        }
      },
      (error) => {
        if (error.status === 401) {
          console.log(error.status);
          ;
          this.snackBar.open('Invalid username or password', 'Close', {
            duration: 5000,
            panelClass: 'mat-snack-bar-error'
          });
        }
      }
    );
  }
  
  }


