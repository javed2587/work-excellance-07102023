import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './organization-levels/main-page/main-page.component';

import { MainSetupComponent } from './organization-setup/main-setup/main-setup.component';
import {OrganizationsComponent} from './organizations/organizations.component'

const routes: Routes = [
  {path:'setup', component: MainSetupComponent},
  {path:'levels', component: MainPageComponent},
  {path:'organizations', component: OrganizationsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfigurationRoutingModule { }
