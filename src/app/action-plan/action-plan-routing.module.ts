import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ActionPlanPage } from './action-plan.page';

const routes: Routes = [
  {
    path: '',
    component: ActionPlanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ActionPlanPageRoutingModule {}
