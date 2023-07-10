import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // loginForm: FormGroup;

  submitted = false;

  loginForm =  new FormGroup({
    userName: new  FormControl(''),
    password: new FormControl('')
 });

   constructor(private auth: AuthService, private router: Router) {

   }

  ngOnInit() {
      // this.loginForm = new FormGroup({
      //     'login': new FormControl('', Validators.required),
      //     'password': new FormControl('', Validators.required)
      // });
      if(this.auth.isLoggedIn()) {
        this.router.navigate(['dashboard'])
      }
  }

  // onSubmit() {
  //     this.submitted = true;
  //     alert(JSON.stringify(this.loginForm.value));
  // }


  onSubmit(): void{

    if(this.loginForm.valid){
      this.auth.login(this.loginForm.value).subscribe( {
        next: () => {
           this.router.navigate(['workSystem'])
          },
        error: (err: Error) => { alert(err.message)  },
        complete: () => {'sucess'},

      });
    }
  }


}
