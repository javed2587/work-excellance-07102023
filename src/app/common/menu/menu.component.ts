import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  navigations={
    label:["Work System","Menu","Paint by Numbers",'vl',"Opportunities","Tasks","Notes",'vl',"Archieve As PDF","Send In Mail",'vl',"New","Rate","Config"],
    routerLink:["Work System",'',"Paint by Numbers",'',"Opportunities","Tasks","Notes",'',"Archieve As PDF","Send In Mail",'',"New","Rate",""],
    icon:["./assets/images/header-images/worksystem.svg","","./assets/images/header-images/paintbynumbers.svg","","./assets/images/header-images/opportunities.svg","./assets/images/header-images/tasks.svg","./assets/images/header-images/Notes.png","","./assets/images/header-images/archieveaspdf.svg","./assets/images/header-images/sendinmail.svg","","./assets/images/header-images/new.svg","./assets/images/header-images/rate.svg","./assets/images/header-images/Config.png"],
    height:["1.75rem","2rem","1.75rem","","2.188rem","2rem","2rem","","1.75rem","1.938rem","","2.563rem","1.813rem","2.563rem"],
    width:["2.063rem","1.438rem","2.75rem","","2.275rem","2rem","1.625rem","","1.625rem","1.875rem","","2.188rem","2.75rem","2.213rem"]
  }
 
  constructor() { }

  display = "none";
  ngOnInit() {
   }
openModal() {
    this.display = "block";
  }
  onCloseHandled() {
    this.display = "none";
  }

}
