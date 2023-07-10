import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-task-modal',
  templateUrl: './task-modal.component.html',
  styleUrls: ['./task-modal.component.css']
})
export class TaskModalComponent implements OnInit {

  modelPosition: string = 'left';
  taskTextArea: string = '';
  noteTextArea: string = '';
  textAreaVal: string = '';
  @Input() displayToolbar: Boolean;
  @Input() displayVal: Boolean;
  @Output() sendCloseFlag = new EventEmitter()
  constructor() {}

  ngOnInit(): void {}
  saveData() {
    ;

    // this.onaddRating.emit(this.selectedCategory.color)
    this.displayVal = false;
    this.sendCloseFlag.emit(false);
    // this.displayToolbar = false;
    // this.onCancel.emit(true)
  }
  cancelModal() {
    this.displayVal = false;
    this.displayToolbar = false;
    this.sendCloseFlag.emit(false);
  }

}
