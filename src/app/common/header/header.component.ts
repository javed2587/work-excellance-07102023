import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IOrganizationLevels, IOrganizationPageSet } from 'src/app/models/organization-levels/organization-levels';
import { AuthService } from 'src/app/services/auth.service';
import { ToolbarService } from 'src/app/services/menubar/toolbar/toolbar.service';
import { OrganizationService } from 'src/app/services/organization/organization.service';
// import  assert from '../../../assets/images/Header';
// ../../../assets/images/Header/Configuration ICon.svg
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  countries: any[];
  img = 'src/assets/images/Header/ConfigurationICon.svg'
  imageSrc = 'src/assets/images/Header/ConfigurationICon.svg'

selectedCity1: any;
  constructor(private authService : AuthService, private toolbarService: ToolbarService,
    private router: Router, private organizationService: OrganizationService) {
    document.addEventListener('mouseup', function (e: any) {
      var container = document.getElementById('dropdown-submenu');
      var container1 = document.getElementById('dropdown-submenu-conf');
      if (container)
        if (!container.contains(e.target))
          container.style.display = 'none';
      if (container1)
        if (!container1.contains(e.target))
          container1.style.display = 'none';
    });
  }

  ngOnInit(): void {
//     this.countries = [
//       {
//           imageSrc: this.imageSrc,
//           name: 'Australia',
//           code: 'AU',
//           states: [
//               {
//                   name: 'New South Wales',
//                   cities: [
//                       {cname: 'Sydney', code: 'A-SY'},
//                       {cname: 'Newcastle', code: 'A-NE'},
//                       {cname: 'Wollongong', code: 'A-WO'}
//                   ]
//               },
//               {
//                   name: 'Queensland',
//                   cities: [
//                       {cname: 'Brisbane', code: 'A-BR'},
//                       {cname: 'Townsville', code: 'A-TO'}
//                   ]
//               },

//           ]
//       },
//       {
//         imageSrc: '',
//           name: 'Canada',
//           code: 'CA',
//           states: [
//               {
//                   name: 'Quebec',
//                   cities: [
//                       {cname: 'Montreal', code: 'C-MO'},
//                       {cname: 'Quebec City', code: 'C-QU'}
//                   ]
//               },
//               {
//                   name: 'Ontario',
//                   cities: [
//                       {cname: 'Ottawa', code: 'C-OT'},
//                       {cname: 'Toronto', code: 'C-TO'}
//                   ]
//               },

//           ]
//       },
//       {
//         imageSrc: '',
//           name: 'United States',
//           code: 'US',
//           states: [
//               {
//                   name: 'California',
//                   cities: [
//                       {cname: 'Los Angeles', code: 'US-LA'},
//                       {cname: 'San Diego', code: 'US-SD'},
//                       {cname: 'San Francisco', code: 'US-SF'}
//                   ]
//               },
//               {
//                   name: 'Florida',
//                   cities: [
//                       {cname: 'Jacksonville', code: 'US-JA'},
//                       {cname: 'Miami', code: 'US-MI'},
//                       {cname: 'Tampa', code: 'US-TA'},
//                       {cname: 'Orlando', code: 'US-OR'}
//                   ]
//               },
//               {
//                   name: 'Texas',
//                   cities: [
//                       {cname: 'Austin', code: 'US-AU'},
//                       {cname: 'Dallas', code: 'US-DA'},
//                       {cname: 'Houston', code: 'US-HO'}
//                   ]
//               }
//           ]
//       }
//   ];
    this.subsribeToPageSet()
    this.router.events.subscribe(e => {
      if (e['url']) {
        const url: string = e['url']
        if (url.startsWith('/page-set/work')) {
          if (this.pages) {
            if(this.pages.length > 1)
              this.showPages = true
            else this.showPages = false
          } else this.showPages = false
        }
        else this.showPages = false
      }
    })
  }
  type = {
    WORK_SYSTEM: "workSystem",
    WORK_IMPROVEMENT: "workImprovement",
    WORK_DIRECTION: "workDirection",
    WORK_MEASUREMENT: "workMeasurement"
  }
  pages: Array<IOrganizationPageSet> = []
  showPages: boolean = false
  subsribeToPageSet() {
    this.toolbarService.nodeEmitter.subscribe((node: IOrganizationPageSet) => {
      if (node?.nodeId) {
        this.organizationService.findNodeById(node?.nodeId).subscribe((node: IOrganizationLevels) => {
          if (node) {
            this.pages = node.pageSet
            if (this.pages.length > 1)
              this.showPages = true
          }
        })
      }
    })
  }
  showPageSet() {
    var pagesetOn = document.getElementById('dropdown-submenu');
    var configurationOn = document.getElementById('dropdown-submenu-conf');
    if (pagesetOn.style.display === 'none') {
      pagesetOn.style.display = 'block';
      configurationOn.style.display = 'none';
    } else {
      pagesetOn.style.display = 'none';
      configurationOn.style.display = 'none';
    }
  }
  showConfiguration() {
    var configurationOn = document.getElementById('dropdown-submenu-conf');
    var pagesetOn = document.getElementById('dropdown-submenu');
    if (configurationOn.style.display === 'none') {
      configurationOn.style.display = 'block';
      if (pagesetOn)
        pagesetOn.style.display = 'none';
    } else {
      configurationOn.style.display = 'none';
      pagesetOn.style.display = 'none';
    }
  }
  logout( ) {
    this.authService.logout()
  }
}
