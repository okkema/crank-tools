import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ServiceWorkerModule } from '@angular/service-worker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './routing.module';
import { NavigationModule } from './components/navigation';
import { AboutModule } from './pages/about';
import { TransmissionModule } from './pages/transmission';
import { CustomersModule } from './pages/customers';
import { InventoryModule } from './pages/inventory';
import { ServiceModule } from './pages/service';
import { RegisterModule } from './pages/register';
import { WheelsModule } from './pages/wheels';
import { SettingsModule } from './pages/settings';
import { StaffModule } from './pages/staff';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { ToolbarModule } from './components/toolbar';
import { SharedModule } from './shared';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    BrowserAnimationsModule,
    SweetAlert2Module.forRoot(),
    SharedModule,
    ToolbarModule,
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
    AppRoutingModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
