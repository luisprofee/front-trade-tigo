import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateBudgetNationalPage } from './create-budget-national.page';

const routes: Routes = [
  {
    path: '',
    component: CreateBudgetNationalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateBudgetNationalPageRoutingModule {}
