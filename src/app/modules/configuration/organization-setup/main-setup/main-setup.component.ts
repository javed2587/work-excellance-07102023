import { Component, OnInit } from '@angular/core';
import { ILeaderShipLevel, Contact, Organization, IOrganization } from '../../../../models/organization/organization-main';
import { OrganizationService } from '../../../../services/organization/organization.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-main-setup',
  templateUrl: './main-setup.component.html',
  styleUrls: ['./main-setup.component.css']
})
export class MainSetupComponent implements OnInit {

  // Organization Info
  organizationName: string;
  organizationType: string;
  organizationNumber: number;
  organizationAddress1: string;
  organizationAddress2: string;
  organizationCity: string;
  organizationState: string;
  organizationZip: string
  mainContactList;
  billingContactList;
  technicalContactList;
  setup: string = 'setup'
  level: ILeaderShipLevel = {
    activity: null,
    company: null,
    department: null,
    division: null,
    function: null,
    group: null,
    location: null
  };
  organization: Organization
  showComponent = true;
  showUploadButton: Boolean = false;

  constructor(private organizationService: OrganizationService, private snackBar: MatSnackBar,) {
  }

  ngOnInit(): void {
    
    this.loadOrganizationById()
  }

  getLevel(event) {
    this.level[event.name] = event.value
    console.log("Level Details:", this.level)
  }

  getOrganizationName(event) {
    this.organizationName = event
    console.log("Organization Name:", this.organizationName)
  }

  getOrganizationType(event) {
    this.organizationType = event
    console.log("Organization Type:", this.organizationType)
  }

  getOrganizationNumber(event) {
    this.organizationNumber = event
    console.log("Organization Number:", this.organizationNumber)
  }

  getOrganizationAddress1(event) {
    this.organizationAddress1 = event
    console.log("Organization Address1:", this.organizationAddress1)
  }

  getOrganizationAddress2(event) {
    this.organizationAddress2 = event
    console.log("Organization Address2:", this.organizationAddress2)
  }

  getOrganizationCity(event) {
    this.organizationCity = event
    console.log("Organization City:", this.organizationCity)
  }

  getOrganizationState(event) {
    this.organizationState = event
    console.log("Organization State:", this.organizationState)
  }

  getOrganizationZip(event) {
    this.organizationZip = event
    console.log("Organization Zip:", this.organizationZip)
  }

  getOrganizationMainContact(event) {
    this.mainContactList = event
    console.log("Main Contact List:", this.mainContactList)
  }

  getOrganizationBillingContact(event) {
    this.billingContactList = event;
    console.log("Billing Contact List:", this.billingContactList)
  }

  getOrganizationTechnicalContact(event) {
    this.technicalContactList = event;
    console.log("Technical Contact List:", this.technicalContactList)
  }

  resetUserUpload() {
    this.userUploadFlag = false
  }

  fillFormFields(org: Organization) {
    this.organizationName = org.name
    if (org.number)
      this.organizationNumber = org.number.valueOf()
    this.organizationCity = org.city
    this.organizationState = org.state
    this.organizationZip = org.zip
    this.organizationType = org.type
    this.organizationAddress1 = org.address1
    this.organizationAddress2 = org.address2
  }

  public loadOrganizationById() {
    if (this.organizationService.findByOrgId()) {
      this.organizationService.findByOrgId().subscribe((org: Organization) => {
        if (org) {
          this.organization = org
          this.level = this.organization.leadershipLevel
          this.fillFormFields(this.organization)
        }
      })
      this.userUploadFlag = true
    }
  }

  userUploadFlag: boolean = false

  errorMessages: Array<String> = []
  showErrors: Boolean = false
  notifyErrorMessage() {
    // this.showErrors = true
    this.errorMessages.forEach(e => {
      this.snackBar.open(e.valueOf(), 'Ok',
        { verticalPosition: "top", panelClass: "mat-snack-bar-error", duration: 15000 });
    })
    setTimeout(() => {
      this.showErrors = false
      this.errorMessages = []
    }, 5000);
  }

  validateLevelForm() {
    console.log(this.level)
    if (!this.level)
      this.errorMessages.push("At least one level required")
    else if (
      (!this.level?.function || this.level?.function?.trim() == '') &&
      (!this.level?.company || this.level?.company.trim() == '') &&
      (!this.level?.department || this.level?.department.trim() == '') &&
      (!this.level?.division || this.level?.division.trim() == '') &&
      (!this.level?.group || this.level?.group.trim() == '') &&
      (!this.level?.activity || this.level?.activity.trim() == '') &&
      (!this.level?.location || this.level?.location.trim() == '')
    )
      this.errorMessages.push("At least one level required")
    else if (Object.keys(this.level).length == 0)
      this.errorMessages.push("At least one level required")
  }
  validateOrgSetupForm() {
    console.log(this.mainContactList)
    if (
      (!this.organizationName || this.organizationName.trim() == '') ||
      (!this.organizationType || this.organizationType.trim() == '') ||
      (!this.organizationNumber) ||
      (!this.organizationCity || this.organizationCity.trim() == '') ||
      (!this.organizationState || this.organizationState.trim() == '')||
      (!this.mainContactList) ||
      (this.mainContactList[0]?.value?.trim() == '')||
      (this.mainContactList[1]?.value?.trim() == '')||
      (this.mainContactList[2]?.value?.trim() == '')
    )
      this.errorMessages.push("Name, Type, Number, City, State, FirstName, LastName, and Email are required")
      console.log(this.mainContactList  )
  }

  save() {
    // this.validateLevelForm()
    this.validateOrgSetupForm()
    if (this.errorMessages.length > 0) {
      this.notifyErrorMessage()
      return
    }
    // Setting LeaderShip Level
    if (this.level != undefined) {
    }
    const leadershipLevel:ILeaderShipLevel = {
      company: this.level.company,
      division: this.level.division,
      location: this.level.location,
      department: this.level.department,
      function: this.level.function,
      group: this.level.group,
      activity: this.level.activity
    }
    // Setting main Contact
    const mainContact = new Contact(this.mainContactList != undefined ? this.mainContactList[0]?.value : '', this.mainContactList != undefined ? this.mainContactList[1]?.value : '', this.mainContactList != undefined ? this.mainContactList[2]?.value : '', this.mainContactList != undefined ? this.mainContactList[3]?.value : '', this.mainContactList != undefined ? this.mainContactList[4]?.value : '', this.mainContactList != undefined ? this.mainContactList[5]?.value : '')
    // Setting Billing Contact
    const billingContact = new Contact(this.billingContactList != undefined ? this.billingContactList[0]?.value : '', this.billingContactList != undefined ? this.billingContactList[1]?.value : '', this.billingContactList != undefined ? this.billingContactList[2]?.value : '', this.billingContactList != undefined ? this.billingContactList[3]?.value : '', this.billingContactList != undefined ? this.billingContactList[4]?.value : '', this.billingContactList != undefined ? this.billingContactList[5]?.value : '')
    // Setting Technical Contact
    const technicalContact = new Contact(this.technicalContactList != undefined ? this.technicalContactList[0]?.value : '', this.technicalContactList != undefined ? this.technicalContactList[1]?.value : '', this.technicalContactList != undefined ? this.technicalContactList[2]?.value : '', this.technicalContactList != undefined ? this.technicalContactList[3]?.value : '', this.technicalContactList != undefined ? this.technicalContactList[4]?.value : '', this.technicalContactList != undefined ? this.technicalContactList[5]?.value : '')

    // Setting main Organization

    if (this.organization?.id) {
      const organization = new Organization(this.organization.id, this.organizationName, this.organizationType, this.organizationNumber, this.organizationAddress1, this.organizationAddress2, this.organizationCity, this.organizationState, this.organizationZip, mainContact, billingContact, technicalContact, leadershipLevel)
      console.log("Organization Value:", organization)
      this.organizationService.updateOrganization(organization).subscribe((res: Organization) => {
        console.log(res)
        this.showSuccessMessage(res)
        // this.clearData()
        this.refreshComponent()
      });
    } else {
      const organization = new Organization(null, this.organizationName, this.organizationType, this.organizationNumber, this.organizationAddress1, this.organizationAddress2, this.organizationCity, this.organizationState, this.organizationZip, mainContact, billingContact, technicalContact, leadershipLevel)
      console.log("Organization Value:", organization)
      this.organizationService.createOrganization(organization).subscribe((res: Organization) => {
        if (res) {
          console.log(res)
          this.showSuccessMessage(res)
          this.organization = res
          // this.clearData()
          this.refreshComponent()
        }
      });
    }


  }
  showSuccessMessage(res: any) {
    if (res) {
      this.snackBar.open('Org Updated Successfully', 'Close',
        { duration: 1500, verticalPosition: "top", panelClass: "mat-snack-bar-success" });
      this.userUploadFlag = true
      // this.saveOrgIdToLocalStorage(res.id)
    }
  }

  saveOrgIdToLocalStorage(orgId: string) {
    if (localStorage.getItem("organizationId")) {
      localStorage.removeItem("organizationId")
      localStorage.setItem("organizationId", orgId)
    } else {
      localStorage.setItem("organizationId", orgId)
    }
  }

  refreshComponent() {
    this.showComponent = false
    setTimeout(() => {
      this.showComponent = true
    })
  }

  clearData() {
    this.level = {
      location: '',
      group: '',
      function: '',
      Function: '',
      division: '',
      department: '',
      company: '',
      activity: ''
    }
    this.mainContactList = []
    this.billingContactList = []
    this.technicalContactList = []
    this.organizationName = ''
    this.organizationType = ''
    this.organizationNumber = null
    this.organizationAddress1 = ''
    this.organizationAddress2 = ''
    this.organizationCity = ''
    this.organizationState = ''
    this.organizationZip = ''
    this.organization = new Organization(null, '', '', null, '', '', '', '',
      '', new Contact('', '', '', '', '', null),
      new Contact('', '', '', '', '', null),
      new Contact('', '', '', '', '', null),
      { activity: '', company: '', department: '', division: '', Function: '', function: '', group: '', location: '' })
  }
}
