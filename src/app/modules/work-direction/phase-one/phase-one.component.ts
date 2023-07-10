import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChange,
  SimpleChanges,
  Output,
  EventEmitter,
} from '@angular/core';
import { VoiceToTextServiceService } from 'src/app/services/voice-to-text-service.service';
// import { CountriesService } from 'src/app/countries.service';
import { SelectItem, PrimeNGConfig } from 'primeng/api';
import { CountriesService } from 'src/app/services/countries.service';
import { UserService } from '../../../services/user/user.service';
import { User } from '../../../models/user/user';
import { PageMetaPageTeamOwner } from '../../../models/work-system/work-system-body';
import {
  PageDirectionalStatement,
  PageDirectionalStatementData,
  PageDirectionalStatementMeta,
} from '../../../models/work-direction/work-direction';
import { PageMeta } from '../../../models/work-system/work-system-header';

@Component({
  selector: 'app-phase-one',
  templateUrl: './phase-one.component.html',
  styleUrls: ['./phase-one.component.css'],
})
export class PhaseOneComponent implements OnInit, OnChanges {
  name: string = 'Jospeh';
  page_owner: string = 'Mark';
  @Input() pageName: String;
  @Input() pageOwner: PageMetaPageTeamOwner | null = null;
  @Input() pageOverallPurpose = '';

  selectedCountries1: string[] = [];
  items: Array<User> = [];

  display: boolean = false;

  pageStatements: Array<PageDirectionalStatement> = [];
  showMicForTextArea = false;
  voiceservice = false;
  collapseCard = true;
  upArrow = true;
  downArrow = false;
  statementsList = [];
  removestatementindex: number;
  pageOwnerUser: User = new User(null, null, null, null, null, [], null, null);
  @Output() sendPageStatements: EventEmitter<Array<PageDirectionalStatement>> =
    new EventEmitter<Array<PageDirectionalStatement>>();
  @Output() sendPageName: EventEmitter<String> = new EventEmitter<String>();
  @Output() sendPagePurpose: EventEmitter<string> = new EventEmitter<string>();
  @Output() sendPageOwner: EventEmitter<PageMetaPageTeamOwner> =
    new EventEmitter<PageMetaPageTeamOwner>();
  @Output() sendSavePage = new EventEmitter();
  @Input() lockstatus: Boolean = false;
  @Input() wdPageStatements: Array<PageDirectionalStatement>;

  setUserNameForOwner() {
    const m: User = this.pageOwnerUser;
    if (!m.username && (m.firstName || m.lastName)) {
      if (m.firstName) m.username = m.firstName.valueOf();
      else m.username = '';
      if (m.lastName) m.username = m.username + ' ' + m.lastName;
    }
    if (!m.username) m.username = '';
    this.pageOwnerUser = m;
  }
  wdPageStatementsPopulated: Boolean = false;
  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.selectedCountries1);
    for (const propName in changes) {
      if (propName == 'pageOwner') {
        // if (this.pageOwner) {
        //   if (this.pageOwner.userId)
        //     this.userService
        //       .findById(this.pageOwner.userId.valueOf())
        //       .subscribe((user: User) => {
        //         this.pageOwnerUser = user;
        //         this.setUserNameForOwner()
        //       });
        // }
      }
      else if (propName == 'wdPageStatements') {
        if (this.wdPageStatements && !this.wdPageStatementsPopulated) {
          this.wdPageStatements.forEach((statemet) => {
            this.pageStatements.push(
              new PageDirectionalStatement(
                new PageDirectionalStatementMeta(
                  statemet?.meta?.index,
                  statemet?.meta?.color,
                  statemet?.meta?.statement,
                  statemet?.meta?.statementPurpose,
                  statemet?.meta?.statementOwners
                    ? statemet?.meta?.statementOwners
                    : []
                ),
                new PageDirectionalStatementData(
                  statemet?.data?.inputs ? statemet?.data?.inputs : [],
                  statemet?.data?.outcomes ? statemet?.data?.outcomes : [],
                  statemet?.data?.pdca
                    ? statemet?.data?.pdca
                    : []
                )
              )
            );
            this.statementsList.push('');
          });
          this.wdPageStatementsPopulated = true;
          this.sendPageStatements.emit(this.pageStatements);
        }
      }
    }
  }

  setUserNameForUsers() {
    this.items.forEach((m) => {
      if (!m.username && (m.firstName || m.lastName)) {
        if (m.firstName) m.username = m.firstName.valueOf();
        else m.username = '';
        if (m.lastName) m.username = m.username + ' ' + m.lastName;
      }
      if (!m.username) m.username = '';
    });
  }

  constructor(
    private voiceToTextService: VoiceToTextServiceService,
    private countryService: CountriesService,
    private userService: UserService
  ) {
    if (this.userService.findByOrgId()) {
      this.userService.findByOrgId().subscribe((users: Array<User>) => {
        this.items = users;
      });
    }

    // this.countryService.getCountries().then(countries => {
    //   this.items = countries;
    //
    // });
  }

  ngOnInit(): void {}

  setPageOwner(e) {
    const user: User = e.value;
    if (user) {
      const pageOwner: PageMetaPageTeamOwner = new PageMetaPageTeamOwner(
        user.id,
        user.username
      );
      this.sendPageOwner.emit(pageOwner);
    }
  }

  setPagePurpose() {
    this.sendPagePurpose.emit(this.pageOverallPurpose);
  }

  hidebutton() {
    this.display = false;
  }

  toggle() {
    this.collapseCard = !this.collapseCard;
    this.upArrow = !this.upArrow;
    this.downArrow = !this.downArrow;
  }

  onClickShowMic() {
    this.showMicForTextArea = true;
  }

  startService() {
    if (this.voiceservice == false) {
      this.voiceToTextService.start();
      this.voiceservice = true;
      console.log('........', this.pageOverallPurpose);
      window['listenInterval'] = setInterval(() => {
        this.pageOverallPurpose = this.voiceToTextService.text;
      }, 500);
    } else {
      this.pageOverallPurpose = this.voiceToTextService.text;
      clearInterval(window['listenInterval']);
      this.stopService();
    }
  }

  stopService() {
    if (this.voiceservice) {
      this.voiceToTextService.stop();
      this.voiceservice = false;
    }
  }

  addStatement() {
    if (this.lockstatus == false || this.lockstatus == undefined) {
      console.log('helloworld adda staten');
      if (this.statementsList.length < 10) {
        this.pageStatements.push(
          new PageDirectionalStatement(
            new PageDirectionalStatementMeta(null, null, null, null, []),
            new PageDirectionalStatementData([], [], [])
          )
        );
        this.pageStatements.forEach(
          (s, index) => (s.meta.index = index.toString())
        );
        this.sendPageStatements.emit(this.pageStatements);
        this.statementsList.push('');
      }
    }
  }

  removeStatement() {
    if (this.lockstatus == false || this.lockstatus == undefined) {
      console.log('before from remove ', this.statementsList);

      if (
        this.removestatementindex == undefined ||
        this.removestatementindex == 0
      ) {
        this.statementsList.pop();
        this.pageStatements.pop();
        this.pageStatements.forEach(
          (s, index) => (s.meta.index = index.toString())
        );
        this.sendPageStatements.emit(this.pageStatements);
      } else {
        this.statementsList.splice(this.removestatementindex, 1);
        this.pageStatements.splice(this.removestatementindex, 1);
        this.pageStatements.forEach(
          (s, index) => (s.meta.index = index.toString())
        );
        this.sendPageStatements.emit(this.pageStatements);
      }

      console.log(
        ' After from remove ',
        this.statementsList,
        this.removestatementindex
      );
      // this.statementsList.pop();
    }
  }

  removeStatementIndex(index: number) {
    console.log('delete index', index);
    this.removestatementindex = index;
  }

  getStatementColor(colorEvent) {
    this.pageStatements[colorEvent.index].meta.color = colorEvent.color;
    this.sendPageStatements.emit(this.pageStatements);
  }

  getStatement(statementEvent) {
    this.pageStatements[statementEvent.index].meta.statement =
      statementEvent.statement;
    this.sendPageStatements.emit(this.pageStatements);
  }

  getStatementPurpose(statementPurposeEvent) {
    this.pageStatements[statementPurposeEvent.index].meta.statementPurpose =
      statementPurposeEvent.statementPurpose;
    this.sendPageStatements.emit(this.pageStatements);
  }

  getStatementOwners(statementOwnersEvent) {
    this.pageStatements[statementOwnersEvent.index].meta.statementOwners =
      statementOwnersEvent.statementOwners;
    this.sendPageStatements.emit(this.pageStatements);
  }

  getInputs(inputsEvent) {
    this.pageStatements[inputsEvent.index].data.inputs = inputsEvent.inputs;
    this.sendPageStatements.emit(this.pageStatements);
  }

  getOutcomes(outcomesEvent) {
    this.pageStatements[outcomesEvent.index].data.outcomes =
      outcomesEvent.outcomes;
    this.sendPageStatements.emit(this.pageStatements);
  }

  getPdcaStatements(pdcaEvent) {
    this.pageStatements[pdcaEvent.index].data.pdca =
      pdcaEvent.pdca;
    this.sendPageStatements.emit(this.pageStatements);
  }

  setPageName() {
    this.sendPageName.emit(this.pageName);
  }

  savePage() {
    this.sendSavePage.emit();
  }
}
