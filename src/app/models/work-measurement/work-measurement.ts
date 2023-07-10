
import {PageMeta} from "../work-system/work-system-header";
import {PageMetaPageTeamOwner} from "../work-system/work-system-body";
import {WorkImprovementCurrentStates, WorkImprovementPDCAStatement} from "../work-improvement/work-improvment";
export interface IWorkMeasurement {
  id: string
  pageMeta: PageMeta,
  pageData: { measurements: Array<WorkMeasurementData> }
}
export class WorkMeasurement implements IWorkMeasurement {
  constructor(
    public id: string,
    public pageMeta: PageMeta,
    public pageData: { measurements: Array<WorkMeasurementData> }
  ) {
  }
}
export interface IWorkMeasurementGraphDataInputs {
  date: Date,
  target: String,
  actual: String
}
export class WorkMeasurementGraphDataInputs implements IWorkMeasurementGraphDataInputs{
  constructor(
    public date: Date,
    public target: String,
    public actual: String
  ) {
  }
}
export interface IWorkMeasurementGraphData {
  inputs: Array<WorkMeasurementGraphDataInputs>
  color: String
  rating: IcolorObject;
}
export interface IcolorObject{
  color: String
}
export class WorkMeasurementGraphData implements IWorkMeasurementGraphData, IcolorObject{
  constructor(
    public inputs: Array<WorkMeasurementGraphDataInputs>,
    public color: String,
    public rating: IcolorObject
  ) {
  }
}
export interface IWorkMeasurementData {
  name: string,
  owner: PageMetaPageTeamOwner,
  scope: string,
  dataSource: string,
  target: string,
  actual: string,
  graph: WorkMeasurementGraphData
  currentStates: Array<WorkImprovementCurrentStates>,
  pdca: Array<WorkImprovementPDCAStatement>
}
export class WorkMeasurementData implements IWorkMeasurementData {
  constructor(
    public name: string,
    public owner: PageMetaPageTeamOwner,
    public scope: string,
    public dataSource: string,
    public target: string,
    public actual: string,
    public graph: WorkMeasurementGraphData,
    public currentStates: Array<WorkImprovementCurrentStates>,
    public pdca: Array<WorkImprovementPDCAStatement>
  ) {
  }
}