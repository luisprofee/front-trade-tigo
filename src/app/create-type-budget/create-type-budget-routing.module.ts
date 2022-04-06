import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateTypeBudgetPage } from './create-type-budget.page';

const routes: Routes = [
  {
    path: '',
    component: CreateTypeBudgetPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateTypeBudgetPageRoutingModule {}
