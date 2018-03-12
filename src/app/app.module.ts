import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { RoutingModule} from './routing/routing.module';
import { FeaturesModule } from './features/features.module';
import { SharedModule } from './core/shared/shared.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FeaturesModule,
    RoutingModule,
    SharedModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


// ng g c features/<component_name>



 // ng g c features/<component_name>

