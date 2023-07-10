import { Component } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';

import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthService } from './services/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'WorkExcellence ';
  data: any;
  showHeader = true;
  showFooter = true;


  constructor(private primengConfig: PrimeNGConfig, private router: Router, private authService: AuthService) {

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        if (event.url === '/login' || event.url === '/') {
          this.showHeader = false;
          this.showFooter = false;
        } else if (this.authService.isLoggedIn()){
          this.showHeader = true;
          this.showFooter = true;
        }
      });
  }

  ngOnInit() {
    if (!this.authService.isLoggedIn()) {
      this.showHeader = false;
      this.showFooter = false;
    }
    this.primengConfig.ripple = true;
  }

}
