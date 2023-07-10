import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Organization } from '../../../../models/organization/organization-main';

@Component({
  selector: 'app-create-org-levels',
  templateUrl: './create-org-levels.component.html',
  styleUrls: ['./create-org-levels.component.css']
})
export class CreateOrgLevelsComponent implements OnInit {

  flagg = true;
  up = true;
  down = false;

  listOfLevels: any[] = []

  @Input() organization: Organization

  @Output() sendLevel = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
    this.listOfLevels = [
      { lname: "Company", key: "company", value: null },
      { lname: "Division", key: "division", value: null },
      { lname: "Location", key: "location", value: null },
      { lname: "Department", key: "department", value: null },
      { lname: "Function", key: "function", value: null },
      { lname: "Group", key: "group", value: null },
      { lname: "Activity", key: "activity", value: null },
    ]
  }

  toggle() {
    this.flagg = !this.flagg;
    this.up = !this.up;
    this.down = !this.down;
  }

  updateLevelValue(event, index) {
    const name = this.listOfLevels[index].key
    const value = event.target.value
    this.sendLevel.emit({ name: name, value: value })
  }
}
