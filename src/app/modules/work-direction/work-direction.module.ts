import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageWorkDirectionComponent } from './main-page-work-direction/main-page-work-direction.component';
import { PhaseOneComponent } from './phase-one/phase-one.component';
import { PhaseTwoComponent } from './phase-two/phase-two.component';
import { PhaseThreeComponent } from './phase-three/phase-three.component';
import { PhaseFourComponent } from './phase-four/phase-four.component';
import { MenuBarModule } from '../menu-bar/menu-bar.module';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { WorkSystemModule } from '../work-system/work-system.module';
import { StickyPhasesListComponent } from './sticky-phases-list/sticky-phases-list.component';
import { StickyPhasesItemsComponent } from './sticky-phases-items/sticky-phases-items.component';
import { StickyTextComponent } from './sticky-text/sticky-text.component';
import { ButtonModule } from 'primeng/button';
import { AutoCompleteModule } from 'primeng/autocomplete';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import {MultiSelectModule} from 'primeng/multiselect';
// import { CountriesService } from 'src/app/countries.service';
import { SelectItem, PrimeNGConfig } from "primeng/api";
import {DialogModule} from 'primeng/dialog';
import { CountriesService } from 'src/app/services/countries.service';
import {DropdownModule} from "primeng/dropdown";



@NgModule({
  declarations: [
    MainPageWorkDirectionComponent,
    PhaseOneComponent,
    PhaseTwoComponent,
    PhaseThreeComponent,
    PhaseFourComponent,
    StickyPhasesListComponent,
    StickyPhasesItemsComponent,
    StickyTextComponent,

  ],
  imports: [
    CommonModule,
    MenuBarModule,
    FormsModule,
    SharedModule,
    DragDropModule,
    WorkSystemModule,
    ButtonModule,
    AutoCompleteModule,
    AutocompleteLibModule,
    DropdownModule,
    DialogModule
  ],
   providers: [CountriesService]
})
export class WorkDirectionModule { }
