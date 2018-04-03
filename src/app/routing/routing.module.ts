import { DashboardHomeComponent } from './../features/premium/dashboard/dashboard-home/dashboard-home.component';
import { TenantsComponent } from './../features/premium/dashboard/tenants/tenants.component';
import { ExpensesComponent } from './../features/premium/dashboard/expenses/expenses.component';
import { ChangePasswordComponent } from './../features/reset/change-password/change-password.component';
import { ForgotPasswordComponent } from './../features/reset/forgot-password/forgot-password.component';
import { DashboardComponent } from './../features/premium/dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../features/home/home.component';
import { LoginComponent } from '../features/login/login.component';
import { RegisterComponent } from '../features/register/register.component';
import { PropertylistComponent } from '../features/propertylist/propertylist.component';
import { PropertydetailsComponent } from '../features/propertydetails/propertydetails.component';
import {AuthenticationGuard} from '../features/guards/AuthenticationGuard';
import { EditpropertyComponent } from '../features/editproperty/editproperty.component';
import { SignupComponent } from '../features/premium/signup/signup.component';
import { PropertiesComponent } from '../features/premium/dashboard/properties/properties.component';
import { PremiumGuard } from '../core/shared/gaurds/premium-guard';

const appRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'propertyList', component: PropertylistComponent },
  { path: 'propertyDetail', component: PropertydetailsComponent },
  { path: 'propertyEdit', component: EditpropertyComponent },
  { path: 'premium-signup', component: SignupComponent },
  { path: 'landlord-dashboard', component: DashboardComponent, canActivate: [PremiumGuard],
    children: [
      { path: '', component: DashboardHomeComponent },
      { path: 'expenses', component: ExpensesComponent },
      { path: 'tenants', component: TenantsComponent },
      { path: 'properties', component: PropertiesComponent }
    ]
  },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'user/changePassword/:user/:token', component: ChangePasswordComponent },

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
