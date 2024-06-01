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
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
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
    SuppliersOrdersComponent
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
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: appearance
    },
    { provide: HTTP_INTERCEPTORS , useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: loaderInterceptor, multi: true },
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
