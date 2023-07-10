import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddRatingComponent } from './add-rating/add-rating.component';
import { FormsModule } from '@angular/forms';

import { DialogModule } from "primeng/dialog";
import { ButtonModule } from "primeng/button";
import { MianToolBarComponent } from './mian-tool-bar/mian-tool-bar.component';
import {RadioButtonModule} from 'primeng/radiobutton';
import { AddNoteComponent } from './add-note/add-note.component';
import {EditorModule} from 'primeng/editor';
import { AddTaskModalComponent } from './add-task-modal/add-task-modal.component';
import { AddDecisionComponent } from './add-decision/add-decision.component';
import { AddOppertunityComponent } from './add-oppertunity/add-oppertunity.component';
import {TooltipModule} from 'primeng/tooltip';
import { DateHeaderComponent } from './date-header/date-header.component';
import {CalendarModule} from 'primeng/calendar';
import {DropdownModule} from 'primeng/dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SideNotesComponent } from './side-notes/side-notes.component';
import {SidebarModule} from 'primeng/sidebar';
import { DiscriptionNotesModalComponent } from './discription-notes-modal/discription-notes-modal.component';
import {OverlayPanelModule} from 'primeng/overlaypanel';

@NgModule({
  declarations: [
    AddRatingComponent,
    MianToolBarComponent,
    AddNoteComponent,
    AddTaskModalComponent,
    AddDecisionComponent,
    AddOppertunityComponent,
    DateHeaderComponent,
    SideNotesComponent,
    DiscriptionNotesModalComponent,
  ],
  imports: [
    CommonModule,
    ButtonModule,
    DialogModule,
    RadioButtonModule,
    FormsModule,
    EditorModule,
    TooltipModule,
    CalendarModule,
    DropdownModule,
    BrowserAnimationsModule ,
    SidebarModule,
    OverlayPanelModule
  ],
  exports: [
    AddRatingComponent,
    MianToolBarComponent,
    DateHeaderComponent,
    SideNotesComponent
  ]
})
export class SharedModule { }
