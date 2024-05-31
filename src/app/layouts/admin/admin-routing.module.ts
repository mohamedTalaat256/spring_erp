import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; 
import { AdminComponent } from './admin.component';
import { adminGuardService } from 'src/app/guards/admin-guard.guard';
import { Page404Component } from 'src/app/global/page404/page404.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { InvUomsComponent } from './components/inventory/inv-uoms/inv-uoms.component';
import { InvItemCategoriesComponent } from './components/inventory/inv-item-categories/inv-item-categories.component';
import { InvItemsComponent } from './components/inventory/inv-items/inv-items.component';
import { StoresComponent } from './components/inventory/stores/stores.component';
import { AccountTypesComponent } from './components/accounts/account-types/account-types.component';
import { AccountsComponent } from './components/accounts/accounts/accounts.component';

const routes: Routes = [
  {
    path:'admin',
    component: AdminComponent,
    children: [
      {path:'', component: DashboardComponent},
      {path:'dashboard', component: DashboardComponent},
      {path:'inv-uoms', component: InvUomsComponent},
      {path:'invItemsCategories', component: InvItemCategoriesComponent},
      {path:'invItems', component: InvItemsComponent},
      {path:'stores', component: StoresComponent},


      /* account */
      {path:'accountTypes', component: AccountTypesComponent},
      {path:'accounts', component: AccountsComponent},

      


      { path: '**', pathMatch :'full' , component: Page404Component},
    ],
    //canActivate: [adminGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
