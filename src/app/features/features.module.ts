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
import { ProfileComponent } from './profile/profile.component';
import { PropertydetailsComponent } from './propertydetails/propertydetails.component';
import { LoginService } from './login/login.service';
import { RegisterService } from './register/register.service';
import { HttpModule, Http } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { AlertComponent } from './alert/alert.component';
import {AlertService} from './alert/alert.service';
import { PropertylistService } from './propertylist/propertylist.service';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    RoutingModule,
    HttpClientModule
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
    ProfileComponent,
    PropertydetailsComponent,
    AlertComponent,
  ],
  exports: [
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    AlertComponent
  ],
  providers: [
    LoginService,
    RegisterService,
    AlertService,
    PropertylistService,
  ]
})
export class FeaturesModule { }
