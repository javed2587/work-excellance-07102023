export interface INodes {
  nodes?: Array<IOrganizationLevels>;
}

export class Nodes implements INodes {
  constructor(public nodes?: Array<OrganizationLevels>) {}
}

export interface IOrganizationLevels {
  id?: string;
  organizationId?: string;
  level?: string;
  role?: string;
  user?: IOrganizationUser;
  pageSet?: Array<IOrganizationPageSet>;
  reportsTo?: string;
}

export class OrganizationLevels implements IOrganizationLevels {
  constructor(
    public id?: string,
    public organizationId?: string,
    public level?: string,
    public role?: string,
    public user?: OrganizationUser,
    public pageSet?: Array<OrganizationPageSet>,
    public reportsTo?: string
  ) {}
}

export interface IOrganizationUser {
  userId?: string;
  name?: string;
}

export class OrganizationUser implements IOrganizationUser {
  constructor(public userId?: string, public name?: string) {}
}

export interface IOrganizationPageSet {
  id?: string;
  nodeId?: string;
  type?: string;
  owner?: IOrganizationUser;
  name?: string;
  dueDate?: Date;
  percentageOfCompletion?: number;
}

export class OrganizationPageSet implements IOrganizationPageSet {
  constructor(
    public id?: string,
    public nodeId?: string,
    public type?: string,
    public owner?: OrganizationUser,
    public name?: string,
    public dueDate?: Date
  ) {}
}
