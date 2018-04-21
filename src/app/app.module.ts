import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { DeviceInformationComponent } from './devices/device-information/device-information.component';
import { DeviceListComponent } from './devices/device-list/device-list.component';


@NgModule({
  declarations: [
    AppComponent,
    DeviceInformationComponent,
    DeviceListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
