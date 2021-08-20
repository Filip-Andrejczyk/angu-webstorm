import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ButtonLicznikComponent } from './button-licznik/button-licznik.component';
import { WyswietlanieLicznikaComponent } from './wyswietlanie-licznika/wyswietlanie-licznika.component';
import { ObrazkiComponent } from './obrazki/obrazki.component';
import { LetDirective } from './let.directive';
import { StronakononaComponent } from './stronakonona/stronakonona.component';
import { StronamajoraComponent } from './stronamajora/stronamajora.component';
import { StartComponent } from './start/start.component';
import { AppRoutingModule } from "./app-routing.module";
import { KalkulatorComponent } from './kalkulator/kalkulator.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MenubarComponent } from './menubar/menubar.component';
import { HttpClientModule } from "@angular/common/http";
import { InfoZApiComponent } from './info-z-api/info-z-api.component';
import { QuizComponent } from './quiz/quiz.component';
import {NgParticlesModule} from "ng-particles";
import { TablicaRekordowComponent } from './tablica-rekordow/tablica-rekordow.component';


@NgModule({
  declarations: [
    AppComponent,
    ButtonLicznikComponent,
    WyswietlanieLicznikaComponent,
    ObrazkiComponent,
    LetDirective,
    StronakononaComponent,
    StronamajoraComponent,
    StartComponent,
    KalkulatorComponent,
    MenubarComponent,
    InfoZApiComponent,
    QuizComponent,
    TablicaRekordowComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        NgbModule,
        HttpClientModule,
        NgParticlesModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
