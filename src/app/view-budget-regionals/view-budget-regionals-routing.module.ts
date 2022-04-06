import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewBudgetRegionalsPage } from './view-budget-regionals.page';

const routes: Routes = [
  {
    path: '',
    component: ViewBudgetRegionalsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewBudgetRegionalsPageRoutingModule {}
