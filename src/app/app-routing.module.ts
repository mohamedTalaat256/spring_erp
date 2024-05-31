import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvoiceComponent } from './layouts/admin/components/invoice/invoice.component';
import { DashboardComponent } from './layouts/admin/components/dashboard/dashboard.component';
const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'invoice', component: InvoiceComponent },
  { path: 'inv/dashboard', component: DashboardComponent },

/*   { path: 'user', redirectTo: '/user', pathMatch: 'full' },
  { path: 'admin', redirectTo: '/admin', pathMatch: 'full' },

  { path: '**' , pathMatch   : 'full', component: Page404Component} */

];
@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
