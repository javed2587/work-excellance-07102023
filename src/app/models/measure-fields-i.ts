export interface MeasureFieldsI {
    push(event: any): unknown
    splice(val: any, arg1: number): unknown
    pop(): unknown
    forEach(arg0: (phase: any) => void): unknown

    rateValue: string
    value : string
    toolbarStatus: Boolean

}
