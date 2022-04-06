import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ActionPlanPageRoutingModule } from './action-plan-routing.module';

import { ActionPlanPage } from './action-plan.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ActionPlanPageRoutingModule
  ],
  declarations: [ActionPlanPage]
})
export class ActionPlanPageModule {}
