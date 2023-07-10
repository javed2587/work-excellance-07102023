import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { Organization } from '../../../../models/organization/organization-main';
import { OrganizationService } from 'src/app/services/organization/organization.service';
import { HttpClient, HttpEvent, HttpResponse } from '@angular/common/http';
import { filter } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { UserService } from 'src/app/services/user/user.service';
import { PageTitleService } from 'src/app/services/page-title.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-org-form',
  templateUrl: './org-form.component.html',
  styleUrls: ['./org-form.component.css'],
})
export class OrgFormComponent implements OnInit, OnChanges {
  currentFile;
  flagg = true;
  up = true;
  down = false;
  MainContactList: any[] = [];
  BillingContactList: any[] = [];
  TechnicalContactList: any[] = [];
  organizationName: string;
  organizationType: string;
  organizationNumber: string;
  organizationAddress1: string;
  organizationAddress2: string;
  organizationCity: string;
  organizationState: string;
  organizationZip: String;
  apiRequestSuccess = false;
  data;

  @Input() isSubmitted: Boolean = false;

  @Input() organization: Organization;

  // Data Sending
  // Contacts Lists
  @Output() sendMainContactList = new EventEmitter();
  @Output() sendBillingContactList = new EventEmitter();
  @Output() sendTechnicalContactList = new EventEmitter();

  // Organization info
  @Output() sendOrganizationName = new EventEmitter();
  @Output() sendOrganizationType = new EventEmitter();
  @Output() sendOrganizationNumber = new EventEmitter();
  @Output() sendOrganizationAddress1 = new EventEmitter();
  @Output() sendOrganizationAddress2 = new EventEmitter();
  @Output() sendOrganizationCity = new EventEmitter();
  @Output() sendOrganizationState = new EventEmitter();
  @Output() sendOrganizationZip = new EventEmitter();
  orgTypes = [
    { key: 'LLC', value: 'LLC' },
    { key: 'C-Corp', value: 'C-Corp' },
    { key: 'S-Corp', value: 'S-Corp' },
    { key: 'Sole Proprietorship', value: 'Sole Proprietorship' },
  ];
  selectedType: any;
  constructor(
    protected organizationService: OrganizationService,
    public http: HttpClient,
    private userService: UserService,
    private PageTitleService: PageTitleService,
    private MatSnackBar : MatSnackBar
  ) {}
  ngOnInit(): void {
    this.PageTitleService.setPageTitle('ORG Setup')
    this.MainContactList = [
      {
        label: 'First Name',
        key: 'firstName',
        value: '',
        placeHolder: '',
      },
      {
        label: 'Last Name',
        key: 'lastName',
        value: '',
        placeHolder: '',
      },
      {
        label: 'Email',
        key: 'email',
        value: '',
        placeHolder: 'Example@address.com',
      },
      {
        label: 'Address 1',
        key: 'address1',
        value: '',
        placeHolder: '',
      },
      {
        label: 'Address 2',
        key: 'address2',
        value: '',
        placeHolder: '',
      },
      {
        label: 'Phone Number',
        key: 'phoneNumber',
        value: '',
        placeHolder: '+1(000) 000-0000',
      },
    ];
    this.BillingContactList = [
      {
        label: 'First Name',
        key: 'firstName',
        value: '',
        placeHolder: '',
      },
      {
        label: 'Last Name',
        key: 'lastName',
        value: '',
        placeHolder: '',
      },
      {
        label: 'Email',
        key: 'email',
        value: '',
        placeHolder: 'Example@address.com',
      },
      {
        label: 'Address 1',
        key: 'address1',
        value: '',
        placeHolder: '',
      },
      {
        label: 'Address 2',
        key: 'address2',
        value: '',
        placeHolder: '',
      },
      {
        label: 'Phone Number',
        key: 'phoneNumber',
        value: '',
        placeHolder: '+1(000) 000-0000',
      },
    ];
    this.TechnicalContactList = [
      {
        label: 'First Name',
        key: 'firstName',
        value: '',
        placeHolder: '',
      },
      {
        label: 'Last Name',
        key: 'lastName',
        value: '',
        placeHolder: '',
      },
      {
        label: 'Email',
        key: 'email',
        value: '',
        placeHolder: 'Example@address.com',
      },
      {
        label: 'Address 1',
        key: 'address1',
        value: '',
        placeHolder: '',
      },
      {
        label: 'Address 2',
        key: 'address2',
        value: '',
        placeHolder: '',
      },
      {
        label: 'Phone Number',
        key: 'phoneNumber',
        value: '',
        placeHolder: '+1(000) 000-0000',
      },
    ];
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (this.organization)
      if (this.organization.type) {
        this.selectedType = this.orgTypes.filter(
          (type) => type.key == this.organization.type
        )[0];
      }
    for (const prop in changes) {
      if (prop == 'organization') {
        if (this.organization?.mainContact) {
          if (this.organization?.mainContact.firstName) {
            this.MainContactList[0].value =
              this.organization?.mainContact.firstName;
          }
          if (this.organization?.mainContact.lastName) {
            this.MainContactList[1].value =
              this.organization?.mainContact.lastName;
          }
          if (this.organization?.mainContact.email) {
            this.MainContactList[2].value =
              this.organization?.mainContact.email;
          }
          if (this.organization?.mainContact.address1) {
            this.MainContactList[3].value =
              this.organization?.mainContact.address1;
          }
          if (this.organization?.mainContact.address2) {
            this.MainContactList[4].value =
              this.organization?.mainContact.address2;
          }
          if (this.organization?.mainContact.phoneNumber) {
            this.MainContactList[5].value =
              this.organization?.mainContact.phoneNumber;
          }
          this.sendMainContactList.emit(this.MainContactList);
        }
        if (this.organization?.billingContact) {
          if (this.organization?.billingContact.firstName) {
            this.BillingContactList[0].value =
              this.organization?.billingContact.firstName;
          }
          if (this.organization?.billingContact.lastName) {
            this.BillingContactList[1].value =
              this.organization?.billingContact.lastName;
          }
          if (this.organization?.billingContact.email) {
            this.BillingContactList[2].value =
              this.organization?.billingContact.email;
          }
          if (this.organization?.billingContact.address1) {
            this.BillingContactList[3].value =
              this.organization?.billingContact.address1;
          }
          if (this.organization?.billingContact.address2) {
            this.BillingContactList[4].value =
              this.organization?.billingContact.address2;
          }
          if (this.organization?.billingContact.phoneNumber) {
            this.BillingContactList[5].value =
              this.organization?.billingContact.phoneNumber;
          }
          this.sendBillingContactList.emit(this.BillingContactList);
        }
        if (this.organization?.technicalContact) {
          if (this.organization?.technicalContact.firstName) {
            this.TechnicalContactList[0].value =
              this.organization?.technicalContact.firstName;
          }
          if (this.organization?.technicalContact.lastName) {
            this.TechnicalContactList[1].value =
              this.organization?.technicalContact.lastName;
          }
          if (this.organization?.technicalContact.email) {
            this.TechnicalContactList[2].value =
              this.organization?.technicalContact.email;
          }
          if (this.organization?.technicalContact.address1) {
            this.TechnicalContactList[3].value =
              this.organization?.technicalContact.address1;
          }
          if (this.organization?.technicalContact.address2) {
            this.TechnicalContactList[4].value =
              this.organization?.technicalContact.address2;
          }
          if (this.organization?.technicalContact.phoneNumber) {
            this.TechnicalContactList[5].value =
              this.organization?.technicalContact.phoneNumber;
          }
          this.sendTechnicalContactList.emit(this.TechnicalContactList);
        }
      }
    }
  }

  uploadCSV() {
    
    console.log('Upload Clicked!');
    
    if (this.organization?.id) {
      if(!this.currentFile){
        this.MatSnackBar.open('No file found.', 'Close', {
          duration: 3000,
          panelClass: 'mat-snack-bar-error'
        });
        return;
      }
      this.organizationService
        .bulkImportCsvUsers(this.currentFile, this.organization.id)
        .pipe(filter((event: HttpEvent<any>) => event instanceof HttpResponse))
        .subscribe((res: HttpResponse<any>) => {
          console.log(res);
          this.data = res.body;
          console.log(this.data.message);
          if (res.status == 200) {
            
            this.apiRequestSuccess = true;
            this.MatSnackBar.open('File uploaded successfully.', 'Close', {
              duration: 5000,
              panelClass: 'mat-snack-bar-success'
            });
          }
        });
    }
  }
  selectFile(event) {
    this.currentFile = event.target.files[0];
    console.log(this.currentFile);
  }

  downloadFile() {
    this.userService.downloadCSV(this.data.message).subscribe((data) => {
      const blob = new Blob([data], { type: 'text/csv' });
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = this.data.message; // Set the desired file name
      link.click();
    });
  }
  toggle() {
    this.flagg = !this.flagg;
    this.up = !this.up;
    this.down = !this.down;
  }

  setOrganizationName(event) {
    this.organizationName = event.target.value;
    this.sendOrganizationName.emit(this.organizationName);
    console.log(this.organizationName);
  }
  setOrganizationType() {
    this.organizationType = this.selectedType.key;
    this.sendOrganizationType.emit(this.organizationType);
    console.log(this.organizationType);
  }
  setOrganizationNumber(event) {
    this.organizationNumber = event.target.value;
    this.sendOrganizationNumber.emit(this.organizationNumber);
    console.log(this.organizationNumber);
  }
  setOrganizationAddress1(event) {
    this.organizationAddress1 = event.target.value;
    this.sendOrganizationAddress1.emit(this.organizationAddress1);
    console.log(this.organizationAddress1);
  }
  setOrganizationAddress2(event) {
    this.organizationAddress2 = event.target.value;
    this.sendOrganizationAddress2.emit(this.organizationAddress2);
    console.log(this.organizationAddress2);
  }
  setOrganizationCity(event) {
    this.organizationCity = event.target.value;
    this.sendOrganizationCity.emit(this.organizationCity);
    console.log(this.organizationCity);
  }
  setOrganizationState(event) {
    this.organizationState = event.target.value;
    this.sendOrganizationState.emit(this.organizationState);
    console.log(this.organizationState);
  }
  setOrganizationZip(event) {
    this.organizationZip = event.target.value;
    this.sendOrganizationZip.emit(this.organizationZip);
    console.log(this.organizationZip);
  }

  setMainContactList(event, index) {
    this.MainContactList[index].value = event.target.value;
    this.sendMainContactList.emit(this.MainContactList);
    console.log(
      'Main Contact List:',
      this.MainContactList[index].label +
        ' ' +
        this.MainContactList[index].value
    );
  }
  setBillingContactList(event, index) {
    this.BillingContactList[index].value = event.target.value;
    this.sendBillingContactList.emit(this.BillingContactList);
    console.log(
      'Billing Contact List:',
      this.BillingContactList[index].label +
        ' ' +
        this.BillingContactList[index].value
    );
  }
  setTechnicalContactList(event, index) {
    this.TechnicalContactList[index].value = event.target.value;
    this.sendTechnicalContactList.emit(this.TechnicalContactList);
    console.log(
      'Technical Contact List:',
      this.TechnicalContactList[index].label +
        ' ' +
        this.BillingContactList[index].value
    );
  }
}
