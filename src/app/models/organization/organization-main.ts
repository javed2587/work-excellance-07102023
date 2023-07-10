export interface IOrganization {
  id?: string,
  name?: string,
  type?: string,
  number?: Number,
  address1?: string,
  address2?: string,
  city?: string,
  state?: string,
  zip?: string,
  mainContact?: IContact,
  billingContact?: IContact,
  technicalContact?: IContact
  leadershipLevel?: ILeaderShipLevel
}

export class Organization implements IOrganization {
  constructor(
    public id: string,
    public name?: string,
    public type?: string,
    public number?: Number,
    public address1?: string,
    public address2?: string,
    public city?: string,
    public state?: string,
    public zip?: string,
    public mainContact?: Contact,
    public billingContact?: Contact,
    public technicalContact?: Contact,
    public leadershipLevel?: ILeaderShipLevel) {
  }
  public getBillingContactByLabel (label: string): string | Number {
    return this.billingContact[label]
  }
  public getTechnicalContactByLabel (label: string): string | Number {
    return this.technicalContact[label]
  }
  public getMainContactByLabel (label: string): string | Number {
    return this.mainContact[label]
  }
}

export interface IContact {
  firstName?: string,
  lastName?: string,
  email?: string,
  address1?: string,
  address2?: string,
  phoneNumber?: Number
}

export class Contact implements IContact {
  constructor(public firstName?: string,
              public lastName?: string,
              public email?: string,
              public address1?: string,
              public address2?: string,
              public phoneNumber?: Number) {
  }
}

export interface ILeaderShipLevel {
  company?: string,
  division?: string,
  location?: string,
  department?: string,
  function?: string,
  group?: string,
  activity?: string
}

export class ILeaderShipLevel implements ILeaderShipLevel {
  constructor(public company?: string, public division?: string, public location?: string, public department?: string, public Function?: string, public group?: string, public activity?: string) {
  }
}
