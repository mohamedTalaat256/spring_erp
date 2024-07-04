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
import { TransactionCollectComponent } from './components/transactions/transaction-collecr/transaction-collect.component';
import { TransactionExchangeComponent } from './components/transactions/transaction-exchange/transaction-exchange.component';
import { SalesComponent } from './components/sales/sales/sales.component';
import { SaleDetailsComponent } from './components/sales/sale-details/sale-details.component';
import { ItemsBalanceComponent } from './components/items-balance/items-balance.component';
import { SupplierOrdersReturnComponent } from './components/supplierOrderReturn/supplier-orders-return/supplier-orders-return.component';
import { SupplierOrdersReturnDetailsComponent } from './components/supplierOrderReturn/supplier-orders-return-details/supplier-orders-return-details.component';
import { SalesReturnComponent } from './components/salesReturn/sales-return/sales-return.component';
import { SaleReturnDetailsComponent } from './components/salesReturn/sale-return-details/sale-return-details.component';
import { PrintSalesComponent } from './components/print/print-sales/print-sales.component';
import { PrintSalesReturnComponent } from './components/print/print-sales-return/print-sales-return.component';
import { PrintSupplierOrderComponent } from './components/print/print-supplier-order/print-supplier-order.component';
import { PrintSupplierOrderReturnComponent } from './components/print/print-supplier-order-return/print-supplier-order-return.component';
import { SarfPermissionsComponent } from './components/sarf-permission/sarf-permissions/sarf-permissions.component';

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
      {path:'itemsBalance', component: ItemsBalanceComponent},



      /* account */
      {path:'accountTypes', component: AccountTypesComponent},
      {path:'accounts', component: AccountsComponent},

      /* suppliers orders */

      {path:'suppliersOrders', component: SuppliersOrdersComponent},
      {path:'supplierOrderDetails/:id', component: SupplierOrderDetailsComponent},
      {path:'print-supplierOrder/:id', component: PrintSupplierOrderComponent},


      /* supplierOrdersReturn */

      {path:'supplierOrdersReturn', component: SupplierOrdersReturnComponent},
      {path:'supplierOrderReturnDetails/:id', component: SupplierOrdersReturnDetailsComponent},
      {path:'print-supplierOrderReturn/:id', component: PrintSupplierOrderReturnComponent},



      {path:'suppliers', component: SuppliersComponent},
      {path:'suppliersCategories', component: SupplierCategoriesComponent},


      /* sales */
      {path:'sales', component: SalesComponent},
      {path:'salseDetails/:id', component: SaleDetailsComponent},
      {path:'print-sales/:id', component: PrintSalesComponent},



      {path:'salesReturn', component: SalesReturnComponent},
      {path:'salseReturnDetails/:id', component: SaleReturnDetailsComponent},

      {path:'print-salseReturn/:id', component: PrintSalesReturnComponent},





      /* customers */

      {path:'customers', component: CustomersComponent},


      {path:'transactionCollect', component: TransactionCollectComponent},
      {path:'transactionexchange', component: TransactionExchangeComponent},


      {path:'sarfPermissions', component: SarfPermissionsComponent},



      {path:'adminSettings', component: SettingsComponent},





      { path: '**', pathMatch :'full' , component: Page404Component},
    ],
    canActivate: [adminGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
