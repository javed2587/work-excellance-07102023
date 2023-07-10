import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { Editor } from 'primeng/editor';
import { IRatingNote } from 'src/app/models/common/rating';
import { User } from 'src/app/models/user/user';
import { UserService } from 'src/app/services/user/user.service';
// import { EventEmitter } from 'stream';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.css'],
  // encapsulation: ViewEncapsulation.None
})
export class AddNoteComponent implements OnInit, OnChanges {
  @ViewChild(Editor) editor: Editor;

  @Input() displayVal: Boolean;
  @Input() displayToolbar: Boolean;
  @Input() note: IRatingNote;
  @Output() pushNoteValue = new EventEmitter();
  @Input() noteVlaue: IRatingNote = {
    date: null,
    owner: { name: null, userId: null },
    text: '',
  };
  user: User;
  modelPosition: string = 'center';
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    console.log('Called.........', this.displayVal);
  }
  ngOnChanges(changes: SimpleChanges) {
    for (const prop in changes) {
      if (prop == 'noteVlaue') {
        if (!this.noteVlaue) {
          this.noteVlaue = {
            date: null,
            owner: { name: null, userId: null },
            text: null,
          };
        }
      }
    }
  }
  ngAfterViewInit() {
    const userId: string = localStorage.getItem('userId')
    if (userId)
      this.userService.findById(userId).subscribe((user: User) => {
        if (user) this.user = user;
      });
    // this hook gets called after the view has been fully initialized, and
    // should set the cursor position immediately before the word 'World'
    this.editor.getQuill().setSelection(6);
  }

  setOwner() {
    if (this.user) {
      if (!this.user.username && (this.user.firstName || this.user.lastName)) {
        if (this.user.firstName)
          this.user.username = this.user.firstName.valueOf();
        else this.user.username = '';
        if (this.user.lastName)
          this.user.username = this.user.username + ' ' + this.user.lastName;
      }
      if (!this.user.username) this.user.username = '';
      this.noteVlaue.owner = {
        name: this.user.username,
        userId: this.user.id,
      };
    }
  }

  saveRating() {
    console.log(this.noteVlaue, 'Notes has been saved successfully');
    this.displayVal = false;
    if (!this.noteVlaue.owner.userId) this.setOwner();
    if (!this.noteVlaue.date) this.noteVlaue.date = new Date();
    if(this.noteVlaue.text && this.noteVlaue.text.startsWith('<p>'))
      this.noteVlaue.text = this.noteVlaue.text.slice(3, -4)
    this.pushNoteValue.emit(this.noteVlaue);
  }
  closeClick() {
    this.displayVal = false;
    this.displayToolbar = false;
    console.log('cancel method called..');
  }
}
