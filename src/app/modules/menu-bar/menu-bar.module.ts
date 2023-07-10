import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './main-page/main-page.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { MenuItemsComponent } from './menu-items/menu-items.component';
import { DialogModule } from 'primeng/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDatepickerModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { AtolyeComponent } from './atolye/atolye.component';
import { DatePipe } from '@angular/common';
import { SharedModule } from 'primeng/api';
import { PrimeAlertComponent } from './prime-alert/prime-alert.component';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { MenuHeaderComponent } from './menu-header/menu-header.component';
import { TeamMemberComponent } from './team-member/team-member.component';
import { SidebarModule } from 'primeng/sidebar';
@NgModule({
  providers: [
    DatePipe,
  ],
  declarations: [
    MainPageComponent,
    ConfigurationComponent,
    MenuItemsComponent,
    ToolbarComponent,
    AtolyeComponent,
    PrimeAlertComponent,
    MenuHeaderComponent,
    TeamMemberComponent
  ],
  imports: [
    CommonModule,
    DialogModule,
    FormsModule ,
    ReactiveFormsModule,
    NgbDatepickerModule,
     NgbModule,
     SharedModule,
     AutoCompleteModule,
     SidebarModule
  ],
  exports: [MainPageComponent, ToolbarComponent]
})
export class MenuBarModule { }
