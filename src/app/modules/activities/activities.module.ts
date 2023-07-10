import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeModuleModule } from 'src/app/prime-module/prime-module.module';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import {DropdownModule} from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import {TableModule} from 'primeng/table';
import {InputTextModule} from 'primeng/inputtext';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PrimeModuleModule,CascadeSelectModule,DropdownModule,FormsModule,TableModule,InputTextModule
  ]
})
export class ActivitiesModule {}
