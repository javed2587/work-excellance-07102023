import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-info-modal',
  templateUrl: './info-modal.component.html',
  styleUrls: ['./info-modal.component.css']
})
export class InfoModalComponent implements OnInit {

  @Input() title:string
  @Input() description:string
  constructor() { }

  ngOnInit(): void {
  }

}
