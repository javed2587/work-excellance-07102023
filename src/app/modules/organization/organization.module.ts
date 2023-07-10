import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SetupMainPageComponent } from './setup-main-page/setup-main-page.component';
import { OrganizationSetupComponent } from './organization-setup/organization-setup.component';
import { CreateLevelsComponent } from './create-levels/create-levels.component';
import { OrganizationHeaderComponent } from './organization-header/organization-header.component';
import { FormsModule } from '@angular/forms';
import {FileUploadModule} from 'primeng/fileupload';
import { TableModule } from 'primeng/table';



@NgModule({
  declarations: [
    SetupMainPageComponent,
    OrganizationSetupComponent,
    CreateLevelsComponent,
    OrganizationHeaderComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    FileUploadModule,
    TableModule
  ],
  exports: [
    // SetupMainPageComponent,
    // OrganizationSetupComponent,
    // CreateLevelsComponent
  ]
})
export class OrganizationModule { }
