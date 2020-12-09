import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DataTableModule, LoadingWheelModule } from '@microsoft/windows-admin-center-sdk/angular';

import { DefaultComponent } from './default.component';
import { Routing } from './default.routing';

@NgModule({
  imports: [
    CommonModule,
    Routing,
    LoadingWheelModule,
    DataTableModule
  ],
  declarations: [DefaultComponent]
})
export class DefaultModule { }
