import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
  SimpleChanges,
  OnChanges
} from '@angular/core';
import { Editor } from 'primeng/editor';
import { IRatingNote } from 'src/app/models/common/rating';
import { User } from 'src/app/models/user/user';
import { UserService } from 'src/app/services/user/user.service';
// import { EventEmitter } from 'stream';

@Component({
  selector: 'app-add-oppertunity',
  templateUrl: './add-oppertunity.component.html',
  styleUrls: ['./add-oppertunity.component.css'],
})
export class AddOppertunityComponent implements OnInit {
  @ViewChild(Editor) editor: Editor;
  modelPosition: string = 'center';
  @Input() oppertunityValue: IRatingNote = {
    date: null,
    owner: { name: null, userId: null },
    text: '',
  };

  @Input() opportunity: String;
  @Input() displayToolbar: Boolean;
  @Input() isDisplayModal: Boolean;

  @Output() pushOppertunityValue = new EventEmitter();
  constructor(private userService: UserService) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges) {
    for (const prop in changes) {
      if (prop == 'oppertunityValue') {
        if (!this.oppertunityValue) {
          this.oppertunityValue = {
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
  user: User
  setOwner() {
    if(this.user) {
      if (this.user) {
        if (!this.user.username && (this.user.firstName || this.user.lastName)) {
          if (this.user.firstName) this.user.username = this.user.firstName.valueOf();
          else this.user.username = '';
          if (this.user.lastName)
          this.user.username = this.user.username + ' ' + this.user.lastName;
        }
        if (!this.user.username) this.user.username = '';
        this.oppertunityValue.owner = { name: this.user.username, userId: this.user.id };
      }
    }
  }
  saveData() {
    this.isDisplayModal = false;
    console.log('Opportunity Value:', this.oppertunityValue);
    if (!this.oppertunityValue.owner.userId)
      this.setOwner()
    if(!this.oppertunityValue.date)
      this.oppertunityValue.date = new Date()
    if(this.oppertunityValue.text && this.oppertunityValue.text.startsWith('<p>'))
      this.oppertunityValue.text = this.oppertunityValue.text.slice(3, -4)
    this.pushOppertunityValue.emit(this.oppertunityValue);
  }
  cancelModal() {
    this.isDisplayModal = false;
    this.displayToolbar = false;
  }
}
