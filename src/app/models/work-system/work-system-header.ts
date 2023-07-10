import { IRatingColor, RatingDecision, IRatingTask, RatingTask, IRatingDecision, IRatingNote } from '../common/rating';
import {
  PageMetaPageSet,
  IPageMetaPageSet,
  PageMetaPageStatus,
  PageMetaPageInterval,
  PageMetaPageTeam
} from "./work-system-body"

export interface IPageMeta {
  pageName: String,
  planPurpose: String,
  purpose: String,
  adjustFrequency: String,
  organizationId?: String,
  pageSet?: IPageMetaPageSet,
  pageStatus?: PageMetaPageStatus,
  interval?: PageMetaPageInterval,
  team?: PageMetaPageTeam
  period?: string,
  creationDate?: Date,
  lastUpdatedDate?: Date,
  planDate?: Date,
  percentageOfCompletion?: String
}

export class PageMeta implements IPageMeta {
  constructor(
    public pageName: String,
    public planPurpose: String,
    public purpose: String,
    public adjustFrequency: String,
    public organizationId?: String,
    public pageSet?: PageMetaPageSet,
    public pageStatus?: PageMetaPageStatus,
    public interval?: PageMetaPageInterval,
    public team?: PageMetaPageTeam,
    public period?: string,
    public creationDate?: Date,
    public lastUpdatedDate?: Date,
    public planDate?: Date,
    public percentageOfCompletion?: String
  ) {
  }
}

export interface IPageData {
  leadershipRail: IPageDataLeadershipRail,
  managementRail: IPageDataManagementRail,
  workTypes: Array<IPageDataWorkTypes>,
  managementSystems: Array<IPageDataManagementSystems>
}

export class PageData implements IPageData {
  constructor(
    public leadershipRail: PageDataLeadershipRail,
    public managementRail: PageDataManagementRail,
    public workTypes: Array<PageDataWorkTypes>,
    public managementSystems: Array<PageDataManagementSystems>) {

  }
}

export interface IPageDataManagementSystems {
  seqNumber: String,
  id: String,
  text: String,
  rating: PageDataLeadershipRailRaiting
}

export class PageDataManagementSystems implements IPageDataManagementSystems {
  constructor(
    public seqNumber: String,
    public id: String,
    public text: String,
    public rating: PageDataLeadershipRailRaiting) {
  }
}

export interface IPageDataLeadershipRail {
  rating: IPageDataLeadershipRailRaiting,
  text: String
}

export class PageDataLeadershipRail implements IPageDataLeadershipRail {
  constructor(public rating: PageDataLeadershipRailRaiting,
    public text: String) {
  }
}

export interface IPageDataManagementRail {
  rating: IPageDataManagementRailRaiting,
  text: String
}

export class PageDataManagementRail implements IPageDataManagementRail {
  constructor(public rating: PageDataManagementRailRaiting,
    public text: String) {
  }
}

export interface IPageDataWorkTypes {
  seqNumber: String,
  id: String,
  text: String,
  rating: PageDataLeadershipRailRaiting
}

export class PageDataWorkTypes implements IPageDataWorkTypes {
  constructor(
    public seqNumber: String,
    public id: String,
    public text: String,
    public rating: PageDataLeadershipRailRaiting) {
  }
}

export interface IPageDataManagementRailRaiting {
  color: String,
  note: IRatingNote,
  opportunity: IRatingNote,
  task: IRatingTask,
  decision: IRatingDecision
}

export class PageDataManagementRailRaiting implements IPageDataManagementRailRaiting {
  constructor(public color: String,
    public note: IRatingNote,
    public opportunity: IRatingNote,
    public task: IRatingTask,
    public decision: IRatingDecision) {
  }
}

export interface IPageDataLeadershipRailRaiting {
  color: String,
  note: IRatingNote,
  opportunity: IRatingNote,
  task: IRatingTask,
  decision: IRatingDecision,
  isDisabledDragDrop?: boolean
  showModal?: boolean
  // task: {
  //     owner: {
  //         userId: String,
  //         name: String
  //     },
  //     priority: String,
  //     contributor: {
  //         userId: String,
  //         name: String
  //     },
  //     task: String,
  //     notes: String
  // }
}

export class PageDataLeadershipRailRaiting implements IPageDataLeadershipRailRaiting {
  constructor(public color: String,
    public note: IRatingNote,
    public opportunity: IRatingNote,
    public task: RatingTask,
    public decision: RatingDecision,
    public isDisabledDragDrop?: boolean,
    public showModal?: boolean) {
  }
}
