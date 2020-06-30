// ANGULAR
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ServiceWorkerModule } from '@angular/service-worker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// ENVIRONMENT
import { environment } from '../environments/environment';
// APP
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
// SHARED
import { SharedModule } from './shared/shared.module';
// NAVIGATION
import { NavigationModule } from './navigation';
// MODULES
import { AboutModule } from './about';
import { TransmissionModule } from './transmission';
import { CustomersModule } from './customers';
import { InventoryModule } from './inventory';
import { ServiceModule } from './service';
import { RegisterModule } from './register';
import { WheelsModule } from './wheels';
import { SettingsModule } from './settings';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    BrowserAnimationsModule,
    SharedModule,
    NavigationModule,
    AboutModule,
    TransmissionModule,
    CustomersModule,
    InventoryModule,
    ServiceModule,
    RegisterModule,
    WheelsModule,
    SettingsModule,
    AppRoutingModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
