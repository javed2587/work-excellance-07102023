import { NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashBoardModule } from './modules/dash-board/dash-board.module';
import { FooterComponent } from './common/footer/footer.component';
import {SplitButtonModule} from 'primeng/splitbutton';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {AccordionModule} from 'primeng/accordion';
import {MenubarModule} from 'primeng/menubar';
import {ButtonModule} from 'primeng/button';
import { HeaderComponent } from './common/header/header.component';
import {CalendarModule} from 'primeng/calendar';
import {ChartModule} from 'primeng/chart';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {CardModule} from 'primeng/card';
import {WorkSystemModule} from './modules/work-system/work-system.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
// import { WorkImprovementModule } from './modules/work-improvement/work-improvement.module';
import { MenuComponent } from './common/menu/menu.component';
import { MenuBarModule } from './modules/menu-bar/menu-bar.module';
import { WorkMeasurementModule } from './modules/work-measurement/work-measurement.module';
import { WorkDirectionModule } from './modules/work-direction/work-direction.module';
import { ReportsModule } from './modules/reports/reports.module';
import { MainPageComponent } from './modules/activities/main-page/main-page.component';
import { FilterNavComponent } from './modules/activities/filter-nav/filter-nav.component';
import { ActivitiesDataComponent } from './modules/activities/activities-data/activities-data.component';
import { PtableComponent } from './modules/activities/ptable/ptable.component';
// import { WorkTypeComponent } from './models/work-type/work-type.component';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import {DropdownModule} from 'primeng/dropdown';
import {TableModule} from 'primeng/table';
import {InputTextModule} from 'primeng/inputtext';
import {SidebarModule} from 'primeng/sidebar';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { TeamMembersService } from './services/team-members.service';
import { LogService } from './services/log.service';
import { OrganizationModule } from './modules/organization/organization.module';
import { AuthModule } from './modules/auth/auth.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {LoadingInterceptor} from "./interceptors/loading-interceptor";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import { LoginComponent } from './login/login.component';
import { LoginService } from './services/login.service';
import { TokenInterceptor } from './interceptors/token-interceptor';
import { OAuthModule } from 'angular-oauth2-oidc';
import { DirectivesModule } from './directives/directives.module';
import { DialogModule } from 'primeng/dialog';
import { WorkImprovementModule } from './modules/work-improvement/work-improvement.module';





// import { PanelModule, ButtonModule } from 'primeng';
@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    MenuComponent,
    LoginComponent,
    MainPageComponent,
    FilterNavComponent,
    ActivitiesDataComponent,
    PtableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DialogModule,
    AccordionModule,
    InputTextModule,
    MenuBarModule,
    DashBoardModule,
    WorkSystemModule,
    WorkImprovementModule,
    WorkMeasurementModule,
    WorkDirectionModule,
    ReportsModule,
    CascadeSelectModule,
    DropdownModule,
    SplitButtonModule,
    MenubarModule,
    ButtonModule,
    CalendarModule,
    ChartModule,
    NgbModule,
    TableModule,
    CardModule,
    BrowserAnimationsModule,
    FormsModule,
    SidebarModule,
    AutoCompleteModule,
    OrganizationModule,
    AuthModule,
    ReactiveFormsModule,
    DragDropModule,
    MatSnackBarModule,
    MDBBootstrapModule.forRoot(),
    OAuthModule.forRoot(),
    DirectivesModule,
  ],
  exports: [MenuComponent],
  providers: [
    LoginService,
    TeamMembersService,
    LogService,
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppModule { }
