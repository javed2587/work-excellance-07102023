import { MeasureFieldsI } from "./measure-fields-i"
import { PhaseNameI } from "./phase-name-i"
import { WorkTypeFieldsI } from "./work-type-fields-i"

export interface ItemsI {
    initialTitle : string
    title: string
    purpose: string
    gateModal: boolean
    showModal: boolean
    exitName : string

    childflag: boolean
    phaseurposeFlag : boolean
    phaseNameFlag : boolean

  
    phasesWorkTypeFields : WorkTypeFieldsI
    phaseMeasuresFields : MeasureFieldsI
    phaseName : PhaseNameI

}
