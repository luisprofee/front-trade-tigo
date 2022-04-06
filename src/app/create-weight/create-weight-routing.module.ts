import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateWeightPage } from './create-weight.page';

const routes: Routes = [
  {
    path: '',
    component: CreateWeightPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateWeightPageRoutingModule {}
