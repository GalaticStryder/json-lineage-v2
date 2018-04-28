import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { DeviceInformationComponent } from './devices/device-information/device-information.component';
import { DeviceListComponent } from './devices/device-list/device-list.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { UpdateListComponent } from './devices/update-list/update-list.component';


@NgModule({
  declarations: [
    AppComponent,
    DeviceInformationComponent,
    DeviceListComponent,
    FooterComponent,
    HeaderComponent,
    UpdateListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
