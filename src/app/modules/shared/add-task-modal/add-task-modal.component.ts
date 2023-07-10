import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
// import {Editor} from 'primeng/editor';
import { UserService } from '../../../services/user/user.service';
import { User } from '../../../models/user/user';
import { IRatingTask } from 'src/app/models/common/rating';

@Component({
  selector: 'app-add-task-modal',
  templateUrl: './add-task-modal.component.html',
  styleUrls: ['./add-task-modal.component.css'],
})
export class AddTaskModalComponent implements OnInit, OnChanges {
  // @ViewChild(Editor) editor: Editor

  modelPosition: string = 'center';

  taskTextArea: string = '';
  noteTextArea: string = '';
  statusValue: string;

  ownerVal: User = new User(null, null, null, null, null, [], null, null);
  daueDate: Date;
  periorityValue: string = '';
  contributor: User = new User(null, null, null, null, null, [], null, null);
  users: User[] = [];
  // textAreaVal:string=""

  @Input() displayToolbar: Boolean;
  @Input() displayVal: Boolean;
  @Input() task: IRatingTask;
  @Output() sendValueIsOpened = new EventEmitter<boolean>();
  @Output() pushTaskValue = new EventEmitter();

  // @Output() doColor = new EventEmitter<Boolean>()
  constructor(private userService: UserService) {}

  setUserNameForUsers() {
    this.users.forEach((m) => {
      if (!m.username && (m.firstName || m.lastName)) {
        if (m.firstName) m.username = m.firstName.valueOf();
        else m.username = '';
        if (m.lastName) m.username = m.username + ' ' + m.lastName;
      }
      if (!m.username) m.username = '';
    });
  }

  ngOnInit(): void {
    if (this.userService.findByOrgId()) {
      this.userService.findByOrgId().subscribe((users) => {
        this.users = users;
        
        this.setUserNameForUsers();
        this.setTaskOwner()
        this.setTaskContributor()
      });
    }
  }

  isTaskBinded: Boolean = false;

  setTaskOwner() {
    this.ownerVal = this.users.filter(
      (u) => u.id == this.task.owner.userId
    )[0];
  }

  setTaskContributor() {
    this.contributor = this.users.filter(
      (u) => u.id == this.task.contributor.userId
    )[0];
  }

  ngOnChanges(changes: SimpleChanges) {
    for (const prop in changes) {
      if (prop == 'task') {
        if (!this.isTaskBinded && this.task) {
          if (this.task.owner) {
            this.setTaskOwner()
          }
          if (this.task.dueDate) this.daueDate = new Date(this.task.dueDate);
          if (this.task.priority) this.periorityValue = this.task.priority;
          if (this.task.contributor) {
            this.setTaskContributor()
          }
          if (this.task.status) this.statusValue = this.task.status;
          if (this.task.task) this.taskTextArea = this.task.task;
          if (this.task.notes) this.noteTextArea = this.task.notes
          this.isTaskBinded = true
        }
      }
    }
  }

  setContributor(contributorEvent) {
    this.contributor = this.users.find(
      (user) => user.id == contributorEvent.target.value
    );
    if (!this.contributor)
      this.contributor = new User(null, null, null, null, null, [], null, null);
  }

  setOwner(ownerEvent) {
    this.ownerVal = this.users.find(
      (user) => user.id == ownerEvent.target.value
    );
    if (!this.ownerVal)
      this.ownerVal = new User(null, null, null, null, null, [], null, null);
  }

  ngAfterViewInit() {
    // this.editor.getQuill().setSelection(6)
  }

  saveData() {
    console.log(this.periorityValue);
    this.displayVal = false;
    this.pushTaskValue.emit({
      owner: { name: this.ownerVal.username, userId: this.ownerVal.id },
      dueDate: this.daueDate,
      priority: this.periorityValue,
      contributor: {
        name: this.contributor.username,
        userId: this.contributor.id,
      },
      task: this.taskTextArea,
      notes: this.noteTextArea,
      status: this.statusValue,
    });
    this.sendValueIsOpened.emit(false);
  }

  cancelModal() {
    this.displayVal = false;
    this.displayToolbar = false;
  }
}
