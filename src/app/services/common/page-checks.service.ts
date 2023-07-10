import { WorkImprovementContingencyPlanForBarriers, WorkImprovementCurrentStates, WorkImprovementInitiatives, WorkImprovementPDCAStatement, WorkImprovementPlanDirectionStatement, WorkImprovementPlanMeasures, WorkImprovementPlanOutcomes } from './../../models/work-improvement/work-improvment';
import { PageDirectionalStatement } from './../../models/work-direction/work-direction';
import { Injectable } from '@angular/core';
import { PageBodyPhases, PageMetaPageInterval, PageMetaPageTeamOwner, PageMetaPageTeamTeamLeader } from 'src/app/models/work-system/work-system-body';
import { PageDataManagementRailRaiting, PageDataManagementSystems, PageDataWorkTypes } from 'src/app/models/work-system/work-system-header';
import { IRatingDecision, IRatingTask } from 'src/app/models/common/rating';
import { WorkMeasurementData } from "../../models/work-measurement/work-measurement";

@Injectable({
  providedIn: 'root'
})
export class PageChecksService {

  constructor() { }

  isDateEmpty(date: Date) {
    if (!date)
      return true
    return false
  }

  isPageIntervalEmpty(interval: PageMetaPageInterval) {
    if(!interval)
      return true
    if (
      !interval.definition.ratingFrequency ||
      !interval.definition.ratingFrequencyUnit ||
      interval.definition.ratingFrequencyUnit == ''
    ) {
      return true
    }
    return false
  }
  isStringEmpty(name: String) {
    if (!name || name == '')
      return true
    return false
  }
  isPageTeamLeaderEmpty(leader: PageMetaPageTeamTeamLeader) {
    if (!leader)
      return true
    else if (
      !leader.name ||
      !leader.userId ||
      leader.name == '' ||
      leader.userId == ''
    )
      return true
    return false
  }
  isPageOwnerEmpty(owner: PageMetaPageTeamOwner) {
    if (!owner)
      return true
    else if (
      !owner.name ||
      !owner.userId ||
      owner.name == '' ||
      owner.userId == ''
    )
      return true
    return false
  }
  isPurposeEmptyForAllStatements(statements: Array<PageDirectionalStatement>) {
    if (statements.filter((s, i) => (!s.meta.statementPurpose || s.meta.statementPurpose == '')).length > 0) {
      return true
    }
    return false
  }
  isStatementInputsCountMatches(statements: Array<PageDirectionalStatement>, count: number) {
    if (statements.filter((s, i) => s.data.inputs.length < count).length > 0)
      return true
    else if (statements.filter((s, i) => s.data.inputs.filter((input, i) => {
      if ((!input.name || input.name == ''))
        return true
      return false
    }).length > 0).length > 0)
      return true
    return false
  }
  isOppotunityNotEnoughInInputs(statements: Array<PageDirectionalStatement>) {
    if (statements.filter((s, i) => s.data.inputs.filter((input, ind) => {
      return true
    }).length > 0).length > 0)
      return true
    return false
  }
  isAnyElementCountMatchesInStatementInputs(statements: Array<PageDirectionalStatement>, count: number) {
    if (statements.filter((s, i) => {
      if (s.data.inputs.filter((input, i) => input.elements.length < count).length > 0) {
        return true
      } else {
        return false
      }
    }).length > 0)
      return true
    else if (statements.filter((s, i) => {
      if (s.data.inputs.filter((input, i) => input.elements.filter((elem, ind) => {
        if (!elem || elem == '')
          return true
        return false
      }).length == input.elements.length).length > 0)
        return true
      return false
    }).length > 0)
      return true
    return false
  }
  isAnyOutcomesTextEmptyInStatements(statements: Array<PageDirectionalStatement>) {
    if (statements.filter((s, i) => {
      return s.data.outcomes.filter((out, ind) => {
        if (!out.text || out.text == '')
          return true
        else return false
      })
    }).length > 0)
      return true
    return false
  }
  isStatementOwnerEmptyInStatements(statements: Array<PageDirectionalStatement>) {
    if (statements.filter((s, i) => s.meta.statementOwners.length == 0).length > 0)
      return true
    else if (statements.filter((s, i) => s.meta.statementOwners.filter((o, i) => {
      if (!o || o.userId == '')
        return true
      return false
    }).length == s.meta.statementOwners.length).length > 0)
      return true
    return false
  }
  isPDCAEmptyInStatements(statements: Array<PageDirectionalStatement>) {
    if (statements.filter((s, i) => (!s.data.pdca || s.data.pdca.length == 0)).length > 0)
      return true
    else if (statements.filter((s, i) => s.data.pdca.filter((pdca, i) => {
      if (!pdca.text || pdca.text == '')
        return true
      return false
    }).length == s.data.pdca.length).length > 0)
      return true
    return false
  }
  isRatingEmptyinStatements(statements: Array<PageDirectionalStatement>) {
    if (statements.filter((s, i) => (!s.meta.color || s.meta.color == '')).length > 0)
      return true
    return false
  }
  isTextNotEnoughForCurrentStateByCounts(currentStates: Array<WorkImprovementCurrentStates>, charCount: number) {
    if (currentStates.filter((s, i) => (s.text ? (s.text.length < charCount ? true : false) : true)).length > 0)
      return true
    return false
  }
  isTextNotEnoughForPlanDirectionsByCounts(directions: Array<WorkImprovementPlanDirectionStatement>, charCount: number) {
    if (directions.filter((d, i) => (d.text ? (d.text.length < charCount ? true : false) : true)).length > 0)
      return true
    return false
  }
  isTextNotEnoughForPlanOutcomesByCounts(outcome: Array<WorkImprovementPlanOutcomes>, charCount: number) {
    if (outcome.filter((o, i) => ((o.text ? (o.text.length < charCount ? true : false) : true) || (!o.rating.color || o.rating.color == ''))).length > 0)
      return true
    return false
  }
  isOneMeasureCompleted(measures: Array<WorkImprovementPlanMeasures>) {
    if (measures.filter((m, i) => {
      if (
        (m.actual && m.actual != '') &&
        (m.rating.color && m.rating.color != '') &&
        (m.target && m.target != '') &&
        (m.text && m.text != ''))
        return true
      return false
    }).length > 0)
      return true
    return false
  }
  isRatingCompleted(rating: PageDataManagementRailRaiting): boolean {
    if(!rating)
      return false
    if (
      (rating.color && rating.color != '') &&
      (rating.note && rating?.note?.text != '') &&
      (rating.opportunity && rating?.opportunity?.text != '') &&
      (this.isRatingTaskCompleted(rating.task)) &&
      (this.isRatingDecisionCompleted(rating.decision))
    )
      return true
    return false
  }
  isRatingTaskCompleted(task: IRatingTask) {
    if(!task)
      return false
    if (
      (task.contributor.name && task.contributor.name != '') &&
      (task.contributor.userId && task.contributor.userId != '') &&
      (task.notes && task.notes != '') &&
      (task.priority && task.priority != '') &&
      (task.owner.name && task.owner.name != '') &&
      (task.owner.userId && task.owner.userId != '') &&
      (task.task && task.task != '')
    )
      return true
    return false
  }
  isRatingDecisionCompleted(decision: IRatingDecision): boolean {
    if(!decision)
      return false
    if (
      decision.date &&
      (decision.owner.name && decision.owner.name != '') &&
      (decision.owner.userId && decision.owner.userId != '') &&
      (decision.summary && decision.summary != '')
    )
      return true
    return false
  }
  isOneKeyInitiativeCompleted(initiatives: Array<WorkImprovementInitiatives>) {
    if (initiatives.filter((ini, i) => {
      if ((ini.name && ini.name != ''))
        return true
      return false
    }).length > 0)
      return true
    return false
  }
  isOnePlanStepForEachInitiativeCompleted(initiatives: Array<WorkImprovementInitiatives>) {
    if (initiatives.filter((ini, i) => {
      if (ini.planSteps.filter((s, inidex) => {
        if (
          (s.step && s.step != '')
        )
          return true
        return false
      }).length > 0)
        return true
      return false
    }).length == initiatives.length)
      return true
    return false
  }
  isAnyTimelineMissingInPlanStepInInitiative(initiatives: Array<WorkImprovementInitiatives>) {
    if (initiatives.filter((ini, i) => {
      if (ini.planSteps.filter((s, index) => {
        if (!s.startDate || !s.endDate)
          return true
        return false
      }).length > 0)
        return true
      return false
    }).length > 0)
      return true
    return false
  }
  isOneContingencyPlanBarriersCompleted(barriers: Array<WorkImprovementContingencyPlanForBarriers>) {
    if (barriers.filter((b, i) => {
      if (
        (b.text && b.text != '')
      )
        return true
      return false
    }).length > 0)
      return true
    return false
  }
  isOnePotentialPlanBarriersCompleted(barriers: Array<WorkImprovementContingencyPlanForBarriers>) {
    if (barriers.filter((b, i) => {
      if (
        (b.text && b.text != '')
      )
        return true
      return false
    }).length > 0)
      return true
    return false
  }
  isOnePDCAStatementCompleted(statements: Array<WorkImprovementPDCAStatement>) {
    if (statements.filter((b, i) => {
      if (
        (b.text && b.text != '')
      )
        return true
      return false
    }).length > 0)
      return true
    return false
  }
  isMeasureNameExistsForOneMeasure(measures: Array<WorkMeasurementData>) {
    return measures.filter((m, i) => (m.name && m.name != '')).length > 0;
  }
  isAnyMeasureOwnerEmpty(measures: Array<WorkMeasurementData>) {
    return measures.filter((m, i) => this.isOwnerEmpty(m.owner)).length > 0;
  }
  isOwnerEmpty(owner: PageMetaPageTeamOwner) {
    return (!owner.name || owner.name == '') ||
      (!owner.userId || owner.userId == '');
  }
  isScopeNotExistsForAllMeasure(measures: Array<WorkMeasurementData>) {
    return measures.filter((m, i) => (!m.scope || m.scope == '')).length > 0;
  }
  isSourceNotExistsForAllMeasure(measures: Array<WorkMeasurementData>) {
    return measures.filter((m, i) => (!m.dataSource || m.dataSource == '')).length > 0;
  }
  isTargetNotExistsForAllMeasure(measures: Array<WorkMeasurementData>) {
    return measures.filter((m, i) => (!m.target || m.target == '')).length > 0;
  }
  isActualNotExistsForAllMeasure(measures: Array<WorkMeasurementData>) {
    return measures.filter((m, i) => (!m.actual || m.actual == '')).length > 0;
  }
  isEmptyDateTableInputForAnyMeasure(measures: Array<WorkMeasurementData>) {
    if (measures.filter((m, i) => m.graph.inputs.filter((gin, index) => {
      if (!gin.date)
        return true
      return false
    }).length > 0
    ).length > 0)
      return true
    else {
      if (measures.filter((m, i) => m.graph.inputs.filter((gin, index) => {
        if ((!gin.actual || gin.actual == '') || (!gin.target || gin.target == ''))
          return true
        return false
      }).length == m.graph.inputs.length
      ).length > 0)
        return true
      return false
    }
  }
  isWordCountNotMatchesForMeasureCurrentState(measures: Array<WorkMeasurementData>, charCount: number) {
    if (measures.filter((m, i) => {
      if (m.currentStates.filter((c, index) => {
        if (c.text.length < charCount)
          return true
        return false
      }).length > 0)
        return true
      return false
    }).length > 0)
      return true
    return false
  }
  isWordCountNotMatchesForMeasurePDCA(measures: Array<WorkMeasurementData>, charCount: number) {
    if (measures.filter((m, i) => {
      if (m.pdca.filter((p, index) => {
        if (p.text.length < charCount)
          return true
        return false
      }).length > 0)
        return true
      return false
    }).length > 0)
      return true
    return false
  }
  isPhasesCountNotMatch(phases: Array<PageBodyPhases>, count: number) {
    if (phases.length < count)
      return true
    else if(phases.filter((p, i) => (p.phaseDefinition.phaseTitle || p.phaseDefinition.phaseTitle != "")).length < count)
      return true
    return false
  }
  isPhasesStepCountNotMatch(phases: Array<PageBodyPhases>, count: number) {
    if (phases.filter((p, i) => p.workSteps.length < count).length > 0)
      return true
    if (phases.filter((p, i) => p.workSteps.filter((w, ind) => {
      if (!w.rating)
        return true
      else if ((!w.rating.color || w.rating.color == '') || (!w.text || w.text == ''))
        return true
      return false
    }).length > 0).length > 0)
      return true
    return false
  }
  isTitleEmptyInAnyPhase(phases: Array<PageBodyPhases>) {
    if (phases.filter((p, i) => !p.phaseDefinition).length > 0)
      return true
    else if (phases.filter((p, i) => (!p.phaseDefinition.phaseTitle || p.phaseDefinition.phaseTitle == '')).length > 0)
      return true
    else return false
  }
  isEntryGateEmptyInAnyPhase(phases: Array<PageBodyPhases>) {
    if (phases.filter((p, i) => !p.phaseDefinition).length > 0)
      return true
    else if (phases.filter((p, i) => !p.phaseDefinition.entryGate).length > 0)
      return true
    else if (phases.filter((p, i) => (!p.phaseDefinition.entryGate.text || p.phaseDefinition.purpose.text == '')).length > 0)
      return true
    else return false
  }
  isPurposeEmptyInAnyPhase(phases: Array<PageBodyPhases>) {
    if (phases.filter((p, i) => !p.phaseDefinition).length > 0)
      return true
    else if (phases.filter((p, i) => !p.phaseDefinition.purpose).length > 0)
      return true
    else if (phases.filter((p, i) => (!p.phaseDefinition.purpose.text || p.phaseDefinition.purpose.text == '')).length > 0)
      return true
    else return false
  }
  isPurposeMeasureCountNotMatch(phases: Array<PageBodyPhases>, count: number) {
    if (phases.filter((p, i) => !p.phaseDefinition).length > 0)
      return true
    else if (phases.filter((p, i) => p.phaseDefinition?.phaseMeasures?.length < count).length > 0)
      return true
    else if (phases.filter((p, i) => p.phaseDefinition?.phaseMeasures?.filter((m, ind) => (!m.text || m.text == '')).length > 0).length > 0)
      return true
    else return false
  }
  isManagementSystemCountNotMatch(systems: Array<PageDataManagementSystems>, count: number) {
    if (systems.length < count)
      return true
    else if (systems.filter((s, i) => (!s.text || s.text == '')).length > 0)
      return true
    return false
  }
  isWorkTypesCountNotMatch(types: Array<PageDataWorkTypes>, count: number) {
    if (types.length < count)
      return true
    else if (types.filter((t, i) => (!t.text || t.text == '')).length > 0)
      return true
    return false
  }
}
