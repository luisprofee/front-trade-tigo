import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AutomaticBudgetPage } from './automatic-budget.page';

const routes: Routes = [
  {
    path: '',
    component: AutomaticBudgetPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AutomaticBudgetPageRoutingModule {}
