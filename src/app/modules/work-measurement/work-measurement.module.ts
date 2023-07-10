import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageMeasurementComponent } from './main-page-measurement/main-page-measurement.component';
import { PhaseOneComponent } from './phase-one/phase-one.component';
import { PhaseTwoComponent } from './phase-two/phase-two.component';
// import { PhaseThreeComponent } from './phase-three/phase-three.component';
import { PhaseFourComponent } from './phase-four/phase-four.component';
import { PhaseFiveComponent } from './phase-five/phase-five.component';
import { MenuBarModule } from '../menu-bar/menu-bar.module';
import { SharedModule } from '../shared/shared.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormsModule } from '@angular/forms';
import { LineGraphComponent } from './line-graph/line-graph.component';
import {ChartModule} from 'primeng/chart';
import {ToastModule} from 'primeng/toast';
import { GraphValueModalComponent } from './graph-value-modal/graph-value-modal.component';
import { ButtonModule } from 'primeng/button';
import {DropdownModule} from 'primeng/dropdown';
import { PhaseThreeComponent } from './phase-three/phase-three.component';
import { CalendarModule } from 'primeng/calendar';


@NgModule({
  declarations: [
    MainPageMeasurementComponent,
    PhaseOneComponent,
    PhaseTwoComponent,
    PhaseThreeComponent,
    PhaseFourComponent,
    PhaseFiveComponent,
    LineGraphComponent,
    GraphValueModalComponent
  ],
  imports: [
    CommonModule,
    MenuBarModule,
    CalendarModule,
    SharedModule,
    DragDropModule,
    FormsModule,
    ChartModule,
    ToastModule,
    ButtonModule,
    DropdownModule
  ]
})
export class WorkMeasurementModule { }
