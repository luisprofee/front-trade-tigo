import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewActionsPage } from './view-actions.page';

const routes: Routes = [
  {
    path: '',
    component: ViewActionsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewActionsPageRoutingModule {}
