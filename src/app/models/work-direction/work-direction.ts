import {PageMeta} from "../work-system/work-system-header";
import {WorkImprovementPDCAStatement, WorkImprovementPlanOutcomes} from "../work-improvement/work-improvment";
import { PageMetaPageTeamTeamLeader } from "../work-system/work-system-body";

export interface IWorkDirection {
  id: string,
  pageMeta: PageMeta,
  pageData: { directionalStatements: Array<PageDirectionalStatement> }
}

export class WorkDirection implements IWorkDirection {
  constructor(
    public id: string,
    public pageMeta: PageMeta,
    public pageData: { directionalStatements: Array<PageDirectionalStatement> }
  ) {
  }
}
export interface IPageDirectionalStatement {
  meta: PageDirectionalStatementMeta,
  data: PageDirectionalStatementData
}
export class PageDirectionalStatement implements  IPageDirectionalStatement{
  constructor(
    public meta: PageDirectionalStatementMeta,
    public data: PageDirectionalStatementData
  ) {
  }
}
export interface IPageDirectionalStatementData {
  inputs: Array<PageDirectionalStatementDataInput>,
  outcomes: Array<WorkImprovementPlanOutcomes>,
  pdca: Array<WorkImprovementPDCAStatement>
}
export class PageDirectionalStatementData implements IPageDirectionalStatementData{
  constructor(
    public inputs: Array<PageDirectionalStatementDataInput>,
    public outcomes: Array<WorkImprovementPlanOutcomes>,
    public pdca: Array<WorkImprovementPDCAStatement>
  ) {
  }
}
export interface IPageDirectionalStatementDataInput {
  seqNumber: string,
  name: string,
  elements: Array<String>
}
export class PageDirectionalStatementDataInput implements IPageDirectionalStatementDataInput {
  constructor(
    public seqNumber: string,
    public name: string,
    public elements: Array<String>
  ) {
  }
}

export interface IPageDirectionalStatementMeta {
  index: string,
  color: string,
  statement: string,
  statementPurpose: string,
  statementOwners: Array<PageMetaPageTeamTeamLeader>
}

export class PageDirectionalStatementMeta implements IPageDirectionalStatementMeta {
  constructor(
    public index: string,
    public color: string,
    public statement: string,
    public statementPurpose: string,
    public statementOwners: Array<PageMetaPageTeamTeamLeader>
  ) {
  }
}
