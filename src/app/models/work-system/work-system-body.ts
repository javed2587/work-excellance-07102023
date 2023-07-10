import { IRatingColor } from "../common/rating"
import { PageDataLeadershipRailRaiting, PageDataManagementRail, PageDataManagementRailRaiting } from "./work-system-header"

export interface PageBody {
  phases: Array<PageBodyPhases>
}

export interface PageBodyPhasesPhaseDefinition {
  seqNumber: String,
  phaseTitle: String,
  purpose: {
    text: String
    rating?: PageDataLeadershipRailRaiting
  },
  phaseMeasures: Array<PageBodyPhasesMeasures>,
  entryGate: PageBodyPhasesEntryGate,
  phase: {
    text: String
    rating?: PageDataLeadershipRailRaiting
  }
}

export interface PageBodyPhasesEntryGate {
  text: String,
  rating: PageDataManagementRailRaiting
}

export interface PageBodyPhasesMeasures {
  text: String,
  rating ?: PageDataLeadershipRailRaiting
}

export interface PageBodyWorkSteps {
  seqNumber: String,
  text: String,
  rating: PageDataLeadershipRailRaiting
}

export interface PageBodyPhases {
  phaseDefinition: PageBodyPhasesPhaseDefinition,
  workSteps: Array<PageBodyWorkSteps>
}

export interface IPageMetaPageSet {
  pageSetId: String,
  pageSetOwnerId: String
}

export class PageMetaPageSet implements IPageMetaPageSet {
  constructor(
    public pageSetId: string,
    public pageSetOwnerId: string,
  ) {
  }
}

export interface IPageMetaPageStatus {
  state: String,
  updatedBy: String
}

export class PageMetaPageStatus implements IPageMetaPageStatus {
  constructor(
    public state: string,
    public updatedBy: string
  ) {
  }
}

export interface IPageMetaPageInterval {
  startDate: Date,
  definition: {
    ratingFrequency: number,
    ratingFrequencyUnit: String
  },
  endDate: Date
}

export class PageMetaPageInterval implements IPageMetaPageInterval {
  constructor(
    public startDate: Date,
    public definition: { ratingFrequency: number; ratingFrequencyUnit: String },
    public endDate: Date
  ) {
  }
}

export interface IPageMetaPageTeam {

  owner: PageMetaPageTeamOwner,
  teamLeader: PageMetaPageTeamTeamLeader,
  teamMembers: Array<PageMetaPageTeamTeamMember>

}

export class PageMetaPageTeam implements IPageMetaPageTeam {
  constructor(
    public owner: PageMetaPageTeamOwner,
    public teamLeader: PageMetaPageTeamTeamLeader,
    public teamMembers: Array<PageMetaPageTeamTeamMember>
  ) {
  }
}

export interface IPageMetaPageTeamTeamMember {
  userId: String,
  name: String,
  value: String
}

export class PageMetaPageTeamTeamMember implements IPageMetaPageTeamTeamMember {
  constructor(
    public userId: String,
    public name: String,
    public value: String) {
  }
}

export interface IPageMetaPageTeamOwner {
  userId: String,
  name?: String
}

export class PageMetaPageTeamOwner implements IPageMetaPageTeamOwner {
  constructor(public userId: String,
    public name?: String) {
  }
}

export interface IPageMetaPageTeamTeamLeader {
  userId: String,
  name: String
}

export class PageMetaPageTeamTeamLeader implements IPageMetaPageTeamTeamLeader {
  constructor(public userId: string, public name: string) {
  }
}
