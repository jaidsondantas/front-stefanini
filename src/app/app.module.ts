import {LOCALE_ID, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {registerLocaleData} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import localePt from '@angular/common/locales/pt';
import {MAT_DATE_LOCALE} from '@angular/material/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';

registerLocaleData(localePt);

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'pt-BR'},
    {provide: LOCALE_ID, useValue: 'pt-BR'},
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
