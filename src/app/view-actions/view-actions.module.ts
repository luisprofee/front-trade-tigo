import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewActionsPageRoutingModule } from './view-actions-routing.module';

import { ViewActionsPage } from './view-actions.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewActionsPageRoutingModule
  ],
  declarations: [ViewActionsPage]
})
export class ViewActionsPageModule {}
