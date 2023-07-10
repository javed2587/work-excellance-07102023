import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-org-pageset',
  templateUrl: './org-pageset.component.html',
  styleUrls: ['./org-pageset.component.css']
})
export class OrgPagesetComponent implements OnInit {

  constructor() { }
  @Input() od;

  ngOnInit(): void {
  }



}
