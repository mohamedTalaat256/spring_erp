import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; 
import { AdminComponent } from './admin.component';
import { adminGuardService } from 'src/app/guards/admin-guard.guard';
import { Page404Component } from 'src/app/global/page404/page404.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { InvUomsComponent } from './components/inv-uoms/inv-uoms.component';
import { InvItemCategoriesComponent } from './components/inv-item-categories/inv-item-categories.component';
import { InvItemsComponent } from './components/inv-items/inv-items.component';
import { StoresComponent } from './components/stores/stores.component';

const routes: Routes = [
  {
    path:'admin',
    component: AdminComponent,
    children: [
      {path:'', component: DashboardComponent},
      {path:'inv-uoms', component: InvUomsComponent},
      {path:'invItemsCategories', component: InvItemCategoriesComponent},
      {path:'invItems', component: InvItemsComponent},
      {path:'stores', component: StoresComponent},
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
