import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './modules/activities/main-page/main-page.component';

import { NotFoundComponent } from './modules/auth/pages/not-found/not-found.component';
import { DashBoardComponent } from './modules/dash-board/dash-board/dash-board.component';
import { SetupMainPageComponent } from './modules/organization/setup-main-page/setup-main-page.component';

import { MainPageWorkDirectionComponent } from './modules/work-direction/main-page-work-direction/main-page-work-direction.component';
import { MianPageImprovementComponent } from './modules/work-improvement/mian-page-improvement/mian-page-improvement.component';
import { MainPageMeasurementComponent } from './modules/work-measurement/main-page-measurement/main-page-measurement.component';
import { MainPageWorkSystemComponent } from './modules/work-system/main-page-work-system/main-page-work-system.component';

import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { DashboardGuard } from './guards/dashboard.guard';
import { OrgListPageGuard } from './guards/org-list-page.guard';
import { PageSetGuard } from './guards/page-set.guard';
import { LoginPageGuard } from './guards/login-page.guard';


const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    canActivate: [LoginPageGuard]
  },

  {
    path: 'dashboard',
    component: DashBoardComponent,
    loadChildren: () => import('./modules/dash-board/dash-board.module').then(m => m.DashBoardModule),
    canActivate: [AuthGuard, DashboardGuard]
  },
  {
    path: 'organization', component: SetupMainPageComponent,
    loadChildren: () => import('./modules/organization/organization.module').then(m => m.OrganizationModule),
    canActivate: [AuthGuard, OrgListPageGuard]
  },
  {
    path: 'configuration',
    loadChildren: () =>
      import('./modules/configuration/configuration.module').then(m => m.ConfigurationModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'activities-page',
    component: MainPageComponent
  },
  {
    path: 'page-set',
    children: [
      {
        path: 'workSystem/:id',
        component: MainPageWorkSystemComponent,
      },
      {
        path: 'workImprovement/:id',
        component: MianPageImprovementComponent
      },
      {
        path: 'workMeasurement/:id',
        component: MainPageMeasurementComponent
      },
      {
        path: 'workDirection/:id',
        component: MainPageWorkDirectionComponent
      },
      {
        path: 'activities',
        component: MainPageComponent
      },
    ],
    canActivate: [AuthGuard, PageSetGuard]
  },


  // {path: 'workSystem', component: MainPageWorkSystemComponent},
  // {path: 'workImprovementService', component: MianPageImprovementComponent},
  // {path: 'workMeasurement', component: MainPageMeasurementComponent},
  // {path: 'workDirection', component: MainPageWorkDirectionComponent},
  // {path: 'activities', component: MainPageComponent},
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
