import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { GoogleSignInService } from '../services/google-sign-in.service';
import { environment } from 'src/environments/environment';
import { UserService } from '../services/user/user.service';
import { User } from '../models/user/user';


@Component({
  selector: 'app-login',
  templateUrl: './login.component2.html',
  styleUrls: ['./login.component2.css'],
})
export class LoginComponent implements OnInit {
  submitting: boolean = false;
  returnUrl: string;
  email: string = '';
  password: string = '';
  showPassword: boolean = false;
  googleAuthUrl: string;
  microsoftAuthUrl: string;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private loginservice: LoginService,
    private GoogleSignInService: GoogleSignInService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    // this.route.params.subscribe(param => {
      const token = this.activatedRoute.queryParams.subscribe(param => {
        if (param['token']) {
          localStorage.setItem("token", param['token']);
          this.userService.getLoggedInUser().subscribe((user: User) => {
            if (user) {
              localStorage.setItem('roles', user.roles ? user.roles.toString() : null)
              localStorage.setItem("organizationId", user.organizationId)
              localStorage.setItem("userId", user.id);
              // localStorage.setItem('token', param['token']);
              // localStorage.setItem("roles", result.roles);
              this.router.navigate(['/dashboard']);
            }
          })
        }
      })
    // });
    this.googleAuthUrl =
      environment.googleOath2Url +
      '/oauth2/authorization/google?redirect_uri=' +
      window.location.origin;

    this.microsoftAuthUrl =
      environment.googleOath2Url +
      '/oauth2/authorization/azure-client?redirect_uri=' +
      window.location.origin;
  }
  myLoginFunc(data: any) {
    console.log(data);
    this.loginservice.Login(data);
    // this.router.navigate(['/dashboard'])
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  signInWithGoogle() {
    this.GoogleSignInService.signInWithGoogle();
  }
}
