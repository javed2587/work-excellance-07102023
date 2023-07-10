import { Component, EventEmitter, Input, OnInit, Output, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import { Editor } from 'primeng/editor';
import {UserService} from "../../../services/user/user.service";
import { User } from 'src/app/models/user/user';
import { IRatingDecision } from 'src/app/models/common/rating';

@Component({
  selector: 'app-add-decision',
  templateUrl: './add-decision.component.html',
  styleUrls: ['./add-decision.component.css']
})
export class AddDecisionComponent implements OnInit, OnChanges {
  @ViewChild(Editor) editor: Editor;

  ownerVal: User = new User(null, null, null, null, null, [], null, null)
  users: User[] = []
  modelPosition: string = "center";
  decisionValue: string = ''
  ownerValue: string = ''
  dateValue: Date
  @Input() displayToolbar: Boolean
  @Input() displayVal: Boolean
  @Input() decision: IRatingDecision

  @Output() pushDecisionData = new EventEmitter();
  constructor(private userSerVice: UserService, private userService: UserService) { }
  setUserNameForUsers() {
    this.users.forEach(m => {
      if (!m.username && (m.firstName || m.lastName)) {
        if (m.firstName)
          m.username = m.firstName.valueOf()
        else m.username = ''
        if (m.lastName)
          m.username = m.username + ' ' + m.lastName
      }
      if (!m.username)
        m.username = ''
    })
  }

  ngOnInit(): void {
    if (this.userService.findByOrgId()) {
      this.userService.findByOrgId().subscribe(users => {
        this.users = users
        this.setUserNameForUsers()
        this.setDecisionOwner()
      })
    }
  }

  setDecisionOwner() {
    this.ownerVal = this.users.filter(u => u.id == this.decision.owner.userId)[0]
  }

  isDecisionBinded: Boolean = false
  ngOnChanges(changes: SimpleChanges): void {
    for (const prop in changes) {
      if (prop == 'decision') {
        if (!this.isDecisionBinded && this.decision) {
          if (this.decision.owner) {
            this.setDecisionOwner()
          }
          if (this.decision.date)
            this.dateValue = this.decision.date
          if (this.decision.summary)
            this.decisionValue = this.decision.summary
        }
      }
    }
  }
  ngAfterViewInit() {
    this.editor.getQuill().setSelection(6);
    // this.editor.getQuill().setCursor(0);
  }
  saveData() {
    this.displayVal = false;
    if(this.decisionValue && this.decisionValue.startsWith('<p>'))
      this.decisionValue = this.decisionValue.slice(3, -4)
    this.pushDecisionData.emit({ owner: { name: this.ownerVal.username , userId: this.ownerVal.id }, summary: this.decisionValue, date: this.dateValue });
  }
  cancelModal() {
    this.displayVal = false;
    this.displayToolbar = false
  }

  setOwner(ownerEvent) {
    this.ownerVal = this.users.find(user => user.id == ownerEvent.target.value)
    if (!this.ownerVal)
      this.ownerVal = new User(null, null, null, null, null, [], null, null)
  }
}
