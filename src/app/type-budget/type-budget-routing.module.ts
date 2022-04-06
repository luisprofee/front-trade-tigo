import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TypeBudgetPage } from './type-budget.page';

const routes: Routes = [
  {
    path: '',
    component: TypeBudgetPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TypeBudgetPageRoutingModule {}
