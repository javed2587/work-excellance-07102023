import { NgModule } from '@angular/core';
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } 
    from "@angular/platform-browser/animations";
import { CommonModule } from '@angular/common';
import { MainPageWorkSystemComponent } from './main-page-work-system/main-page-work-system.component';
import { HeaderSectionComponent } from './header-section/header-section.component';
import { PhaseItemsComponent } from './phases-items/phase-items.component';

import {ScrollPanelModule} from 'primeng/scrollpanel';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {AccordionModule} from 'primeng/accordion';
import { ToastModule } from 'primeng/toast';
import {FieldsetModule} from 'primeng/fieldset';
import { DialogModule } from "primeng/dialog";

import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
// import {CdkAccordionModule} from '@angular/cdk/accordion';
// import { MatSliderModule } from '@angular/material/slider';

import { PhasesListComponent } from './phases-list/phases-list.component';

import { TextFieldsComponent } from './common/text-fields/text-fields.component';
import { ButtonsComponent } from './common/buttons/buttons.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TestLabComponent } from './test-lab/test-lab.component';  
import { MenuBarModule } from '../menu-bar/menu-bar.module';
import { GateModalComponent } from './common/gate-modal/gate-modal.component';
import { SharedModule } from '../shared/shared.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { InfoModalComponent } from './common/info-modal/info-modal.component';
// import {MatCardModule} from '@angular/material/card';
import {CardModule} from 'primeng/card';
import { HttpClientModule } from '@angular/common/http';
import {EditorModule} from 'primeng/editor';
import { PrimeAlertComponent } from './common/prime-alert/prime-alert.component';
import { PrimeModuleModule } from 'src/app/prime-module/prime-module.module';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import {TooltipModule} from 'primeng/tooltip';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CalendarModule } from "primeng/calendar";
import { DropdownModule } from 'primeng/dropdown';
// import * as mdb from 'mdb-ui-kit'; // lib
// import { Input } from 'mdb-ui-kit'; // module

@NgModule({
  declarations: [
    MainPageWorkSystemComponent,
    HeaderSectionComponent,
    PhaseItemsComponent,
    PhasesListComponent,
    TextFieldsComponent,
    ButtonsComponent,
    TestLabComponent,
    GateModalComponent,
    InfoModalComponent,
    PrimeAlertComponent

  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    BrowserModule,
    ScrollPanelModule,
    InputTextModule,
    ButtonModule,
    AccordionModule,
    DialogModule,
    ToastModule,
    FieldsetModule,
    NgbModule,
    PrimeModuleModule,
    ConfirmDialogModule,
    TooltipModule,
    AutoCompleteModule,
    FormsModule, ReactiveFormsModule,
    MenuBarModule,
    SharedModule,
    DragDropModule,
    CalendarModule,
    CardModule,
    HttpClientModule,
    EditorModule,
    DropdownModule
    
  ],
  exports: [
    MainPageWorkSystemComponent,
    HeaderSectionComponent,
    PhaseItemsComponent,
    TestLabComponent,
    InfoModalComponent,
    PrimeAlertComponent

  ]
})
export class WorkSystemModule { }
