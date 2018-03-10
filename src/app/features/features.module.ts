import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SharedModule } from '../core/shared/shared.module';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RouterModule } from '@angular/router';
import { RoutingModule } from '../routing/routing.module';
import { PropertyComponent } from './property/property.component';
import { PropertylistComponent } from './propertylist/propertylist.component';
import { SearchComponent } from './search/search.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    RoutingModule
  ],
  declarations: [
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    PropertyComponent,
    PropertylistComponent,
    SearchComponent,
  ],
  exports: [
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent
  ]
})
export class FeaturesModule { }
