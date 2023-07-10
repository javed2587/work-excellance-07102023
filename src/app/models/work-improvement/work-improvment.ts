import {PageDataManagementRailRaiting, PageMeta} from "../work-system/work-system-header";
import {PageMetaPageTeamTeamLeader} from "../work-system/work-system-body";
import { RatingColor } from "../common/rating";

export interface IWorkImprovement {
  id: string,
  pageMeta: PageMeta,
  pageData: IWorkImprovementPageData
}
export class WorkImprovement implements IWorkImprovement{
  constructor(
    public id: string,
    public pageMeta: PageMeta,
    public pageData: IWorkImprovementPageData
  ) {
  }
}
export interface IWorkImprovementPageData {
  currentStates: Array<IWorkImprovementCurrentStates>,
  planDirectionStatements: Array<IWorkImprovementPlanDirectionStatement>,
  initiatives: Array<IWorkImprovementInitiatives>,
  planOutcomes: Array<IWorkImprovementPlanOutcomes>,
  planMeasures: Array<IWorkImprovementPlanMeasures>,
  potentialPlanBarriers: Array<IWorkImprovementPotentialPlanBarriers>,
  contingencyPlanForBarriers: Array<IWorkImprovementContingencyPlanForBarriers>
  pdca: Array<IWorkImprovementPDCAStatements>
}
export class WorkImprovementPageData implements IWorkImprovementPageData{
  constructor(
    public currentStates: Array<IWorkImprovementCurrentStates>,
    public planDirectionStatements: Array<IWorkImprovementPlanDirectionStatement>,
    public initiatives: Array<IWorkImprovementInitiatives>,
    public planOutcomes: Array<IWorkImprovementPlanOutcomes>,
    public planMeasures: Array<IWorkImprovementPlanMeasures>,
    public potentialPlanBarriers: Array<IWorkImprovementPotentialPlanBarriers>,
    public contingencyPlanForBarriers: Array<IWorkImprovementContingencyPlanForBarriers>,
    public pdca: Array<IWorkImprovementPDCAStatements>) {
  }
}
export interface IWorkImprovementContingencyPlanForBarriers {
  text: string,
  rating: PageDataManagementRailRaiting,
  seqNumber: string
}
export class WorkImprovementContingencyPlanForBarriers implements IWorkImprovementContingencyPlanForBarriers{
  constructor(
    public text: string,
    public rating: PageDataManagementRailRaiting,
    public seqNumber: string
  ) {
  }
}
export interface IWorkImprovementPotentialPlanBarriers {
  text: string,
  rating: PageDataManagementRailRaiting,
  seqNumber: string
}
export class WorkImprovementPotentialPlanBarriers implements IWorkImprovementContingencyPlanForBarriers{
  constructor(
    public text: string,
    public rating: PageDataManagementRailRaiting,
    public seqNumber: string
  ) {
  }
}
export interface IWorkImprovementPlanMeasures {
  text: string,
  rating: PageDataManagementRailRaiting,
  seqNumber: string,
  target: string,
  actual: string
}
export class WorkImprovementPlanMeasures implements IWorkImprovementPlanMeasures{
  constructor(
    public text: string,
    public rating: PageDataManagementRailRaiting,
    public seqNumber: string,
    public target: string,
    public actual: string
  ) {
  }
}
export interface IWorkImprovementPlanOutcomes {
  text: string,
  rating: PageDataManagementRailRaiting,
  seqNumber: string
}
export class WorkImprovementPlanOutcomes implements IWorkImprovementPlanOutcomes{
  constructor(
    public text: string,
    public rating: PageDataManagementRailRaiting,
    public seqNumber: string
  ) {
  }
}
export interface IWorkImprovementInitiatives {
  name: string,
  planSteps: Array<IWorkImprovementPlanSteps>
}
export class WorkImprovementInitiatives implements IWorkImprovementInitiatives {
  constructor(
    public name: string,
    public planSteps: Array<IWorkImprovementPlanSteps>
  ) {
  }
}
export interface IWorkImprovementPlanSteps {
  seqNumber: string,
  step: string,
  assignee: PageMetaPageTeamTeamLeader,
  isCompleted: boolean,
  startDate: Date,
  endDate: Date,
  rating: PageDataManagementRailRaiting,
  planSteps: Array<IWorkImprovementPlanSteps>
}
export class WorkImprovementPlanSteps implements IWorkImprovementPlanSteps {
  constructor(
    public seqNumber: string,
    public step: string,
    public assignee: PageMetaPageTeamTeamLeader,
    public isCompleted: boolean,
    public startDate: Date,
    public endDate: Date,
    public rating: PageDataManagementRailRaiting,
    public planSteps: Array<IWorkImprovementPlanSteps>
  ) {
  }
}
export interface IWorkImprovementPlanDirectionStatement {
  text: string,
  rating: PageDataManagementRailRaiting,
  seqNumber: string
}
export class WorkImprovementPlanDirectionStatement implements IWorkImprovementPlanDirectionStatement {
  constructor(
    public text: string,
    public rating: PageDataManagementRailRaiting,
    public seqNumber: string
  ) {
  }
}
export interface IWorkImprovementCurrentStates {
  text: string,
  rating: PageDataManagementRailRaiting,
  seqNumber: string

}
export class WorkImprovementCurrentStates implements IWorkImprovementCurrentStates {
  constructor(
    public text: string,
    public rating: PageDataManagementRailRaiting,
    public seqNumber: string
  ) {
  }
}
export interface IWorkImprovementPDCAStatements {
  text: string,
  rating: PageDataManagementRailRaiting,
  seqNumber: string

}
export class WorkImprovementPDCAStatement implements IWorkImprovementPDCAStatements {
  constructor(
    public text: string,
    public rating: PageDataManagementRailRaiting,
    public seqNumber: string
  ) {
  }
}
