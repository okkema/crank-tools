import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ServiceWorkerModule } from '@angular/service-worker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { NavigationModule } from './navigation';
import { AboutModule } from './about';
import { TransmissionModule } from './transmission';
import { CustomersModule } from './customers';
import { InventoryModule } from './inventory';
import { ServiceModule } from './service';
import { RegisterModule } from './register';
import { WheelsModule } from './wheels';
import { SettingsModule } from './settings';
import { StaffModule } from './staff';
import { CloudModule } from './cloud';

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
    StaffModule,
    CloudModule,
    AppRoutingModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
