import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-organization-setup',
  templateUrl: './organization-setup.component.html',
  styleUrls: ['./organization-setup.component.css']
})
export class OrganizationSetupComponent implements OnInit {

  flagg = true;
  up = true;
  down = false;

  contactList:any[] = []
  constructor() {}
  ngOnInit(): void {
    this.contactList = [
      {
        label:'First Name',
        value:'',
        placeHolder: ''
      },
      {
        label:'Last Name',
        value:'',
        placeHolder: ''
      },
      {
        label:'Email',
        value:'',
        placeHolder: 'Example@address.com'
      },
      {
        label:'Address 1',
        value:'',
        placeHolder: ''
      },
      {
        label:'Address 2',
        value:'',
        placeHolder: ''
      },
      {
        label:'Phone Number',
        value:'',
        placeHolder: '+1(000) 000-0000'
      },
    ]
  }
  toggle() {
    this.flagg = !this.flagg;
    this.up = !this.up;
    this.down = !this.down;

  }
}
