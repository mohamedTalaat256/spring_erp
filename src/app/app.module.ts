import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppSideNavbarComponent } from './global/app-side-navbar/app-side-navbar.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import { MaterialModule } from './material/material.module';
import { AppToolbarListComponent } from './global/app-side-navbar/components/app-toolbar-list/app-toolbar-list.component';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldDefaultOptions } from '@angular/material/form-field';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import { AuthComponent } from './layouts/auth/auth.component';
import { AuthRoutingModule } from './layouts/auth/auth-routing.module';
import { NgApexchartsModule } from "ng-apexcharts";
import { RatingStarComponent } from './global/rating-star/rating-star.component';
import { ValidationMsgComponent } from './global/validation-msg/validation-msg.component';
import { loaderInterceptor } from './interceptor/loader.interceptor';
import { TokenInterceptor } from './interceptor/token.interceptor';
import { LoadingCircularComponent } from './global/loading-circular/loading-circular.component';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { Page404Component } from './global/page404/page404.component';
import { toShortText } from './pip/toShortText';
import { secondsToLength } from './pip/secondsToLength';
import { toCeil } from './pip/toCeil';
import { InvoiceComponent } from './layouts/admin/components/invoice/invoice.component';
import { InvItemFormDialogComponent } from './layouts/admin/components/inventory/inv-item-form-dialog/inv-item-form-dialog.component';
import { DashboardComponent } from './layouts/admin/components/dashboard/dashboard.component';
import { NgxPrintModule } from 'ngx-print';
import { DatePipe, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AdminRoutingModule } from './layouts/admin/admin-routing.module';
import { AdminSideNavListComponent } from './layouts/admin/global/admin-side-nav-list/admin-side-nav-list.component';
import { AdminToolbarListComponent } from './layouts/admin/global/admin-toolbar-list/admin-toolbar-list.component';
import { AdminComponent } from './layouts/admin/admin.component';
import { InvUomsComponent } from './layouts/admin/components/inventory/inv-uoms/inv-uoms.component';
import { InvUomsFormDialogComponent } from './layouts/admin/components/inventory/inv-uoms-form-dialog/inv-uoms-form-dialog.component';
import { InvItemCategoriesComponent } from './layouts/admin/components/inventory/inv-item-categories/inv-item-categories.component';
import { InvItemCategoryFormDialogComponent } from './layouts/admin/components/inventory/inv-item-category-form-dialog/inv-item-category-form-dialog.component';
import { InvItemsComponent } from './layouts/admin/components/inventory/inv-items/inv-items.component';
import { StoresComponent } from './layouts/admin/components/inventory/stores/stores.component';
import { StoreFormDialogComponent } from './layouts/admin/components/inventory/store-form-dialog/store-form-dialog.component';
import { AccountTypesComponent } from './layouts/admin/components/accounts/account-types/account-types.component';
import { AccountsComponent } from './layouts/admin/components/accounts/accounts/accounts.component';
import { AccountFormDialogComponent } from './layouts/admin/components/accounts/account-form-dialog/account-form-dialog.component';
import { SuppliersOrdersComponent } from './layouts/admin/components/suppliersOrders/suppliers-orders/suppliers-orders.component';
import { SuppliersOrderFormDialogComponent } from './layouts/admin/components/suppliersOrders/suppliers-order-form-dialog/suppliers-order-form-dialog.component';
import { SupplierOrderDetailsComponent } from './layouts/admin/components/suppliersOrders/supplier-order-details/supplier-order-details.component';
import { SuppliersOrderItemDetailsFormDialogComponent } from './layouts/admin/components/suppliersOrders/suppliers-order-item-details-form-dialog/suppliers-order-item-details-form-dialog.component';
import { CustomersComponent } from './layouts/admin/components/customers/customers/customers.component';
import { CustomerFormDialogComponent } from './layouts/admin/components/customers/customer-form-dialog/customer-form-dialog.component';
import { SuppliersComponent } from './layouts/admin/components/suppliers/suppliers/suppliers.component';
import { SupplierFormDialogComponent } from './layouts/admin/components/suppliers/supplier-form-dialog/supplier-form-dialog.component';
import { SupplierCategoriesComponent } from './layouts/admin/components/suppliers/supplier-categories/supplier-categories.component';
import { SupplierCategoryFormDialogComponent } from './layouts/admin/components/suppliers/supplier-category-form-dialog/supplier-category-form-dialog.component';
import { SettingsComponent } from './layouts/admin/components/settings/settings.component';
import { TransactionCollectComponent } from './layouts/admin/components/transactions/transaction-collecr/transaction-collect.component';
import { TransactionExchangeComponent } from './layouts/admin/components/transactions/transaction-exchange/transaction-exchange.component';
import { DateConverter } from './pip/dateConverter';
import { SalesComponent } from './layouts/admin/components/sales/sales/sales.component';
import { SaleFormDialogComponent } from './layouts/admin/components/sales/sale-form-dialog/sale-form-dialog.component';
import { SaleDetailsFormDialogComponent } from './layouts/admin/components/sales/sale-details-form-dialog/sale-details-form-dialog.component';
import { SaleDetailsComponent } from './layouts/admin/components/sales/sale-details/sale-details.component';
import { ItemsBalanceComponent } from './layouts/admin/components/items-balance/items-balance.component';
import { SupplierOrdersReturnComponent } from './layouts/admin/components/supplierOrderReturn/supplier-orders-return/supplier-orders-return.component';
import { SupplierOrdersReturnFormDialogComponent } from './layouts/admin/components/supplierOrderReturn/supplier-orders-return-form-dialog/supplier-orders-return-form-dialog.component';
import { SupplierOrdersReturnDetailsFormDialogComponent } from './layouts/admin/components/supplierOrderReturn/supplier-orders-return-details-form-dialog/supplier-orders-return-details-form-dialog.component';
import { SupplierOrdersReturnDetailsComponent } from './layouts/admin/components/supplierOrderReturn/supplier-orders-return-details/supplier-orders-return-details.component';
import { SalesReturnComponent } from './layouts/admin/components/salesReturn/sales-return/sales-return.component';
import { SaleReturnDetailsComponent } from './layouts/admin/components/salesReturn/sale-return-details/sale-return-details.component';
import { SaleReturnFormDialogComponent } from './layouts/admin/components/salesReturn/sale-return-form-dialog/sale-return-form-dialog.component';
import { SaleReturnDetailsFormDialogComponent } from './layouts/admin/components/salesReturn/sale-return-details-form-dialog/sale-return-details-form-dialog.component';
import { PrintSalesComponent } from './layouts/admin/components/print/print-sales/print-sales.component';
import { PrintSalesReturnComponent } from './layouts/admin/components/print/print-sales-return/print-sales-return.component';
import { PrintSupplierOrderComponent } from './layouts/admin/components/print/print-supplier-order/print-supplier-order.component';
import { PrintSupplierOrderReturnComponent } from './layouts/admin/components/print/print-supplier-order-return/print-supplier-order-return.component';
import { SarfPermissionDetailsComponent } from './layouts/admin/components/sarf-permission/sarf-permission-details/sarf-permission-details.component';
import { PriceInvoiceDetailsComponent } from './layouts/admin/components/priceInvoice/price-invoice-details/price-invoice-details.component';
import { PriceInvoiceDetailsFormDialogComponent } from './layouts/admin/components/priceInvoice/price-invoice-details-form-dialog/price-invoice-details-form-dialog.component';
import { PriceInvoiceFormDialogComponent } from './layouts/admin/components/priceInvoice/price-invoice-form-dialog/price-invoice-invoice-form-dialog.component';
import { PriceInvoicesComponent } from './layouts/admin/components/priceInvoice/price-invoices/price-invoices.component';
import { SupplierReportComponent } from './layouts/admin/components/reports/supplier-report/supplier-report.component';
import { CustomerReportComponent } from './layouts/admin/components/reports/customer-report/customer-report.component';
import { SystemInfoCardComponent } from './layouts/admin/global/system-info-card/system-info-card.component';

const appearance: MatFormFieldDefaultOptions = {
  appearance: 'outline'
};

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    AppSideNavbarComponent,
    AppToolbarListComponent,
    AuthComponent,
    RatingStarComponent,
    secondsToLength,
    toShortText,
    toCeil,
    ValidationMsgComponent,
    LoadingCircularComponent,
    Page404Component,
    InvoiceComponent,
    InvItemFormDialogComponent,
    AdminComponent,
    DashboardComponent,
    AdminSideNavListComponent,
    AdminToolbarListComponent,
    InvUomsComponent,
    InvUomsFormDialogComponent,
    InvItemCategoriesComponent,
    InvItemCategoryFormDialogComponent,
    InvItemsComponent,
    StoresComponent,
    StoreFormDialogComponent,
    AccountTypesComponent,
    AccountsComponent,
    AccountFormDialogComponent,
    SuppliersOrdersComponent,
    SuppliersOrderFormDialogComponent,
    SupplierOrderDetailsComponent,
    SuppliersOrderItemDetailsFormDialogComponent,
    CustomersComponent,
    CustomerFormDialogComponent,
    SuppliersComponent,
    SupplierFormDialogComponent,
    SupplierCategoriesComponent,
    SupplierCategoryFormDialogComponent,
    SettingsComponent,
    TransactionCollectComponent,
    TransactionExchangeComponent,
    DateConverter,
    SalesComponent,
    SaleFormDialogComponent,
    SaleDetailsFormDialogComponent,
    SaleDetailsComponent,
    ItemsBalanceComponent,
    SupplierOrdersReturnComponent,
    SupplierOrdersReturnFormDialogComponent,
    SupplierOrdersReturnDetailsFormDialogComponent,
    SupplierOrdersReturnDetailsComponent,
    SalesReturnComponent,
    SaleReturnDetailsComponent,
    SaleReturnFormDialogComponent,
    SaleReturnDetailsFormDialogComponent,
    PrintSalesComponent,
    PrintSalesReturnComponent,
    PrintSupplierOrderComponent,
    PrintSupplierOrderReturnComponent,
    SarfPermissionDetailsComponent,
    PriceInvoiceDetailsComponent,
    PriceInvoiceDetailsFormDialogComponent,
    PriceInvoiceFormDialogComponent,
    PriceInvoicesComponent,
    SupplierReportComponent,
    CustomerReportComponent,
    SystemInfoCardComponent

  ],
  imports: [
    MatSidenavModule,
    BrowserModule,
    AppRoutingModule,
    AdminRoutingModule,
    AuthRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MaterialModule,
    HttpClientModule,
    NgApexchartsModule,
    NgxPrintModule,
    TranslateModule.forRoot({
        loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
        }
    })
  ],
  providers: [
    DatePipe,
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: appearance
    },
    { provide: HTTP_INTERCEPTORS , useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: loaderInterceptor, multi: true },
   // {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
