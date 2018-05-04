import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatCardModule } from '@angular/material/card';

import { AppComponent } from './app.component';
import { DeviceInformationComponent } from './devices/device-information/device-information.component';
import { DeviceListComponent } from './devices/device-list/device-list.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { UpdateListComponent } from './devices/update-list/update-list.component';
import { UpdateInformationComponent } from './devices/update-information/update-information.component';


@NgModule({
  declarations: [
    AppComponent,
    DeviceInformationComponent,
    DeviceListComponent,
    FooterComponent,
    HeaderComponent,
    UpdateListComponent,
    UpdateInformationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatSliderModule,
    MatCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
