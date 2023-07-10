import { NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskFocusComponent } from './task-focus/task-focus.component';
import { ReportsComponent } from './reports/reports.component';
import { BuildCompletenessComponent } from './build-completeness/build-completeness.component';
import { HealthCheckComponent } from './health-check/health-check.component';
import { DashBoardComponent } from './dash-board/dash-board.component';
import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import {MenuItem} from 'primeng/api';
import {AccordionModule} from 'primeng/accordion';
import {ToolbarModule} from 'primeng/toolbar';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import {ChartModule} from 'primeng/chart';
import { FormsModule } from '@angular/forms';
import {PanelModule} from 'primeng/panel';
import {TableModule} from 'primeng/table';
import { CascadeSelectModule } from "primeng/cascadeselect";
import { DropdownModule } from 'primeng/dropdown';
import { TaskModalComponent } from './task-focus/task-modal/task-modal.component';
import {DialogModule} from 'primeng/dialog';
import { HeaderComponent } from './header/header.component';
import { OrganizationService } from 'src/app/services/organization/organization.service';
import { StringToNumberPipe } from 'src/assets/stringTonumber.pipe';

@NgModule({
  declarations: [
    TaskFocusComponent,
    ReportsComponent,
    BuildCompletenessComponent,
    HealthCheckComponent,
    DashBoardComponent,
    TaskModalComponent,
    HeaderComponent,
    StringToNumberPipe
  ],
  imports: [
    CommonModule,
    AccordionModule,
    CardModule,
    ButtonModule,
    ToolbarModule,
    OverlayPanelModule,
    ChartModule,
    PanelModule,
    TableModule,
    CascadeSelectModule,
    DropdownModule,
    FormsModule,
    DialogModule
  ],
  exports: [
    TaskFocusComponent,
    ReportsComponent,
    BuildCompletenessComponent,
    HealthCheckComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [
    OrganizationService
  ]
})
export class DashBoardModule { }
