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
import { AdminToolbarListComponent } from './layouts/admin/global/admin-toolbar-list/admin-toolbar-list.component';
import { AdminSideNavListComponent } from './layouts/admin/global/admin-side-nav-list/admin-side-nav-list.component';
import { NgApexchartsModule } from "ng-apexcharts";
import { RatingStarComponent } from './global/rating-star/rating-star.component';
import { ValidationMsgComponent } from './global/validation-msg/validation-msg.component';
import { loaderInterceptor } from './interceptor/loader.interceptor';
import { TokenInterceptor } from './interceptor/token.interceptor';
import { LoadingCircularComponent } from './global/loading-circular/loading-circular.component';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { CourseCardComponent } from './global/course-card/course-card.component';
import { Page404Component } from './global/page404/page404.component';
import { MyCourseCardComponent } from './global/my-course-card/my-course-card.component';
import { LectureCardComponent } from './global/lecture-card/lecture-card.component';
import { toShortText } from './pip/toShortText';
import { secondsToLength } from './pip/secondsToLength';
import { InputStarRatingComponent } from './global/input-star-rating/input-star-rating.component';
import { toCeil } from './pip/toCeil';
import { InvoiceComponent } from './badran/invoice/invoice.component';
import { InvItemFormDialogComponent } from './badran/inv-item-form-dialog/inv-item-form-dialog.component';
import { DashboardComponent } from './badran/dashboard/dashboard.component';
import { NgxPrintModule } from 'ngx-print';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

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
    AdminToolbarListComponent,
    AuthComponent,
    AdminSideNavListComponent,
    RatingStarComponent,
    secondsToLength,
    toShortText,
    toCeil,
    ValidationMsgComponent,
    LoadingCircularComponent,
    CourseCardComponent,
    Page404Component,
    MyCourseCardComponent,
    LectureCardComponent,
    InputStarRatingComponent,
    InvoiceComponent,
    InvItemFormDialogComponent,
    DashboardComponent
  ],
  imports: [
    MatSidenavModule,
    BrowserModule,
    AppRoutingModule,
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
