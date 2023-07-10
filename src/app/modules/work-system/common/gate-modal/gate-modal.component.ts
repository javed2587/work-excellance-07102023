
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-gate-modal',
  templateUrl: './gate-modal.component.html',
  styleUrls: ['./gate-modal.component.css']
})
export class GateModalComponent implements OnInit {

  name = 'Gate'

  @Input() displayVal: Boolean;
  @Input() gateName: string;
  @Input() modalName:string;
  @Output() cancelEvent = new EventEmitter<boolean>();
  @Output() renameGate = new EventEmitter<string>();
  @Output() gatExitGateName = new EventEmitter<string>();
  @Output() renameFirstGate = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    console.log('gateName......',this.gateName)
  }
  saveRating() {

    if(this.modalName === 'Beginning Gate') {
      this.renameGate.emit(this.gateName)
    } else if(this.modalName === 'First Gate') {
      this.renameFirstGate.emit(this.gateName);
    } else {
      this.gatExitGateName.emit(this.gateName)
    }
    console.log(this.gateName)
    this.cancelEvent.emit(false)
  }
  closeClick() {
     this.cancelEvent.emit(false)

  }
}
