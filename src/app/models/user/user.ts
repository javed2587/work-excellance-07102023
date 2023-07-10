export interface IUser {
  id: string,
  username: string
  email: string,
  password: string,
  organizationId: string,
  roles: Array<string>,
  firstName: String,
  lastName: String
}
export class User implements IUser {
  constructor(
    public id: string,
    public username: string,
    public email: string,
    public password: string,
    public organizationId: string,
    public roles: Array<string>,
    public firstName: String,
    public lastName: String
  ) {
  }
}
export enum UserRole {
  PAGE_OWNER = "Page Owner",
  TEAM_LEADER = "Team Leader",
  TEAM_MEMBER = "Team Member",
  ORG_ADMIN = "Org Admin"
}
export const UserRoles = {
  PAGE_OWNER : "Page Owner",
  TEAM_LEADER : "Team Leader",
  TEAM_MEMBER : "Team Member",
  ORG_ADMIN : "Org Admin"
}
