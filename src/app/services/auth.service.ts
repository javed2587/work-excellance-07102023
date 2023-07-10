import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  ;
  dummyUser: string = 'Admin'
  dummyPassword: string = 'admin123'

  constructor(private router: Router) { }

  setToken(token: string): void {
    localStorage.setItem('token', token)
  }

  getToken(): string | null {
    return localStorage.getItem('token')
  }

  isLoggedIn() {
    return this.getToken() != null;
  }

  logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    localStorage.removeItem('organizationId')
    localStorage.removeItem('roles')
    this.router.navigate([''])
  }

  // login(email: any, password: any) {
  login({ userName, password }: any): Observable<any> {

    if (userName === this.dummyUser && password === this.dummyPassword) {
      this.setToken('abcdefghijklmnopqrstuvwxyz')
      return of({ name: 'Javed Iqbal', emial: 'javed@gmail.com' });
    }
    return throwError(new Error('Failed to login'))
  }
}
