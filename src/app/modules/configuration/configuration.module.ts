import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfigurationRoutingModule } from './configuration-routing.module';
import { MainSetupComponent } from './organization-setup/main-setup/main-setup.component';
import { OrgFormComponent } from './organization-setup/org-form/org-form.component';
import { CreateOrgLevelsComponent } from './organization-setup/create-org-levels/create-org-levels.component';
import { MenuHeaderComponent } from './common/menu-header/menu-header.component';
import { OrgLevelsComponent } from './organization-levels/org-levels/org-levels.component';
import { MainPageComponent } from './organization-levels/main-page/main-page.component';
import { ButtonModule } from 'primeng/button';
import { OrgPagesetComponent } from './organization-levels/org-pageset/org-pageset.component';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import {FileUploadModule} from 'primeng/fileupload';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { DirectivesModule } from 'src/app/directives/directives.module';
import { OrganizationsComponent } from './organizations/organizations.component';
import { TableModule } from 'primeng/table';
import { AccordionModule } from 'primeng/accordion';



@NgModule({
  declarations: [
    MainSetupComponent,
    OrgFormComponent,
    CreateOrgLevelsComponent,
    MenuHeaderComponent,
    OrgLevelsComponent,
    MainPageComponent,
    OrgPagesetComponent,
    OrganizationsComponent,
  ],
  imports: [
    CommonModule,
    ButtonModule,
    ConfigurationRoutingModule,
    OverlayPanelModule,
    FileUploadModule,
    HttpClientModule,
    FormsModule,
    DropdownModule,
    DirectivesModule, 
    TableModule,
    AccordionModule
  ]
})
export class ConfigurationModule { }
