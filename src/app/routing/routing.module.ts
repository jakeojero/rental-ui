import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../features/home/home.component';
import { LoginComponent } from '../features/login/login.component';
import { RegisterComponent } from '../features/register/register.component';
import { PropertylistComponent } from '../features/propertylist/propertylist.component';
import { PropertydetailsComponent } from '../features/propertydetails/propertydetails.component';

const appRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'propertyList', component: PropertylistComponent },
  { path: 'propertyDetail', component: PropertydetailsComponent },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes)
  ],
  declarations: [],
  exports: [RouterModule]
})
export class RoutingModule { }
