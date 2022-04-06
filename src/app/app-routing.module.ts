import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'action-plan',
    loadChildren: () => import('./action-plan/action-plan.module').then( m => m.ActionPlanPageModule)
  },
  {
    path: 'view-actions',
    loadChildren: () => import('./view-actions/view-actions.module').then( m => m.ViewActionsPageModule)
  },
  {
    path: 'create-type-budget',
    loadChildren: () => import('./create-type-budget/create-type-budget.module').then( m => m.CreateTypeBudgetPageModule)
  },
  {
    path: 'type-budget',
    loadChildren: () => import('./type-budget/type-budget.module').then( m => m.TypeBudgetPageModule)
  },
  {
    path: 'create-budget-national',
    loadChildren: () => import('./create-budget-national/create-budget-national.module').then( m => m.CreateBudgetNationalPageModule)
  },
  {
    path: 'allocate-regional-budget',
    loadChildren: () => import('./allocate-regional-budget/allocate-regional-budget.module').then( m => m.AllocateRegionalBudgetPageModule)
  },
  {
    path: 'allocate-territory-budget',
    loadChildren: () => import('./allocate-territory-budget/allocate-territory-budget.module').then( m => m.AllocateTerritoryBudgetPageModule)
  },
  {
    path: 'view-budget-regionals',
    loadChildren: () => import('./view-budget-regionals/view-budget-regionals.module').then( m => m.ViewBudgetRegionalsPageModule)
  },
  {
    path: 'upload-file',
    loadChildren: () => import('./upload-file/upload-file.module').then( m => m.UploadFilePageModule)
  },
  {
    path: 'edit-budget-regional',
    loadChildren: () => import('./edit-budget-regional/edit-budget-regional.module').then( m => m.EditBudgetRegionalPageModule)
  },
  {
    path: 'automatic-budget',
    loadChildren: () => import('./automatic-budget/automatic-budget.module').then( m => m.AutomaticBudgetPageModule)
  },
  {
    path: 'create-weight',
    loadChildren: () => import('./create-weight/create-weight.module').then( m => m.CreateWeightPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
