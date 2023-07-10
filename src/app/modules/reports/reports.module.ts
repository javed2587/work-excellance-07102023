import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainReportPageComponent } from './main-report-page/main-report-page.component';
import { SearchHeaderComponent } from './search-header/search-header.component';
import { PrimeModuleModule } from 'src/app/prime-module/prime-module.module';

// import {MenubarModule} from 'primeng/menubar';

@NgModule({
  declarations: [
    MainReportPageComponent,
    SearchHeaderComponent
  ],
  imports: [
    CommonModule,
    PrimeModuleModule,

  ]
})
export class ReportsModule { }
