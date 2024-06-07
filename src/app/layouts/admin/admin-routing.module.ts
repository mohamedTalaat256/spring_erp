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
import { SuppliersOrdersComponent } from './components/suppliersOrders/suppliers-orders/suppliers-orders.component';
import { SupplierOrderDetailsComponent } from './components/suppliersOrders/supplier-order-details/supplier-order-details.component';
import { CustomersComponent } from './components/customers/customers/customers.component';
import { SupplierCategoriesComponent } from './components/suppliers/supplier-categories/supplier-categories.component';
import { SuppliersComponent } from './components/suppliers/suppliers/suppliers.component';
import { SettingsComponent } from './components/settings/settings.component';

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

      /* suppliers orders */

      {path:'suppliersOrders', component: SuppliersOrdersComponent},
      {path:'supplierOrderDetails', component: SupplierOrderDetailsComponent},


      {path:'suppliers', component: SuppliersComponent},
      {path:'suppliersCategories', component: SupplierCategoriesComponent},


      

      /* customers */

      {path:'customers', component: CustomersComponent},



      {path:'adminSettings', component: SettingsComponent},

      
      


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
