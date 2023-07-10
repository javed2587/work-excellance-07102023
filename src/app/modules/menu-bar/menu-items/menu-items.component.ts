import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-menu-items',
  templateUrl: './menu-items.component.html',
  styleUrls: ['./menu-items.component.css']
})
export class MenuItemsComponent implements OnInit {


  config : any
  show = false;
  display = false;
  showCard = false;

  constructor() { }

  ngOnInit(): void {
  }

  showDialog() {
    this.display = true;
  }

  closeClick(){
    this.display = false;
  }
  showMenuCard() {

    this.showCard = !this.showCard
  }
}
