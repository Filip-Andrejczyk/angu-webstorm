import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ButtonLicznikComponent } from './button-licznik/button-licznik.component';
import { WyswietlanieLicznikaComponent } from './wyswietlanie-licznika/wyswietlanie-licznika.component';
import { ObrazkiComponent } from './obrazki/obrazki.component';

@NgModule({
  declarations: [
    AppComponent,
    ButtonLicznikComponent,
    WyswietlanieLicznikaComponent,
    ObrazkiComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
