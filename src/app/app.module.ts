import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ButtonLicznikComponent } from './button-licznik/button-licznik.component';
import { WyswietlanieLicznikaComponent } from './wyswietlanie-licznika/wyswietlanie-licznika.component';
import { ObrazkiComponent } from './obrazki/obrazki.component';
import { LetDirective } from './let.directive';
import { StronakononaComponent } from './stronakonona/stronakonona.component';
import { StronamajoraComponent } from './stronamajora/stronamajora.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    ButtonLicznikComponent,
    WyswietlanieLicznikaComponent,
    ObrazkiComponent,
    LetDirective,
    StronakononaComponent,
    StronamajoraComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {path: 'krzysztof', component: StronakononaComponent},
      {path: 'fufuwojtas', component: StronamajoraComponent},
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
