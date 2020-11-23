import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LensesModule } from 'lenses';
import { IpAddressComponent } from 'projects/lenses/src/lib/ip/ip-address/ip-address.component';
import { MaterialModule } from 'projects/lenses/src/lib/material/material.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent, IpAddressComponent],
  imports: [
    BrowserModule,
    LensesModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
