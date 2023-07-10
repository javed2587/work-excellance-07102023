import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MenubarModule} from 'primeng/menubar';
import {MenuItem} from 'primeng/api';
import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import {ToastModule} from 'primeng/toast';
import {RippleModule} from 'primeng/ripple';
import { MessagesModule } from 'primeng/messages';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import {TooltipModule} from 'primeng/tooltip';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MenubarModule,
    TableModule,
    ToastModule,
    RippleModule,
    ButtonModule,
    ConfirmDialogModule,
    MessagesModule,
    TooltipModule
    
    
    
  ],
  exports: [
    MenubarModule,
    TableModule
  ]
})
export class PrimeModuleModule { }
