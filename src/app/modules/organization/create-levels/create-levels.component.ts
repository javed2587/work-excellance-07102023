import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-levels',
  templateUrl: './create-levels.component.html',
  styleUrls: ['./create-levels.component.css']
})
export class CreateLevelsComponent implements OnInit {

  flagg = true;
  up = true;
  down = false;

  listOfLevels: any[] = []

  constructor() { }

  ngOnInit(): void {
    this.listOfLevels = [
      { lname: "Company", value: '' },
      { lname: "Division", value: '' },
      { lname: "Location", value: '' },
      { lname: "Department", value: '' },
      { lname: "Function", value: '' },
      { lname: "Group", value: '' },
      { lname: "Activity", value: '' },
    ]
  }

  updateLevelValue(value, i) {
    this.listOfLevels[i].value = value
    console.log("List Value:", this.listOfLevels)
  }
  toggle() {
    this.flagg = !this.flagg;
    this.up = !this.up;
    this.down = !this.down;
  }

  detectChange(event) {
    console.log(event)
  }

  clicked() {
    console.log("Clicked")
  }
}
