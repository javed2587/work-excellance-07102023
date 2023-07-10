import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MianPageImprovementComponent } from './mian-page-improvement/mian-page-improvement.component';
import { MenuBarModule } from '../menu-bar/menu-bar.module';
import { PhaseOneComponent } from './phase-one/phase-one.component';
import { PhaseTwoComponent } from './phase-two/phase-two.component';
import { PhaseThreeComponent } from './phase-three/phase-three.component';
import { PhaseFourComponent } from './phase-four/phase-four.component';
import { PhaseFiveComponent } from './phase-five/phase-five.component';
import { WorkSystemModule } from '../work-system/work-system.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgbDate, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {DialogModule} from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { PhaseThreeTestComponent } from './phase-three-test/phase-three-test.component';
import { AutoCompleteModule } from 'primeng/autocomplete';
import {DropdownModule} from 'primeng/dropdown';
@NgModule({
  declarations: [
    MianPageImprovementComponent,
    PhaseOneComponent,
    PhaseTwoComponent,
    PhaseThreeComponent,
    PhaseFourComponent,
    PhaseFiveComponent,
    PhaseThreeTestComponent
  ],
  imports: [
    CommonModule,
    MenuBarModule,
    WorkSystemModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    SharedModule,
    MenuBarModule,
    DragDropModule,
    NgbModule,DialogModule,
    ButtonModule,
    AutoCompleteModule,
    DropdownModule
  ],
  exports: [ MianPageImprovementComponent,
    PhaseOneComponent,
    PhaseTwoComponent,
    PhaseThreeComponent,
    PhaseFourComponent,
    PhaseFiveComponent,
    PhaseThreeTestComponent]
})
export class WorkImprovementModule { }
