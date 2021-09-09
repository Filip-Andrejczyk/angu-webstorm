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
import { TablicaRekordowComponent } from './tablica-rekordow/tablica-rekordow.component';
import { TranslatebreedPipe } from './pipy/translatebreed.pipe';
import { ZlozPozewComponent } from './zloz-pozew/zloz-pozew.component';
import { BootstrapValidatorDirective } from './dyrectives/bootstrap-validator.directive';
//do firebase
import {AngularFireModule} from "@angular/fire/compat";
import {environment} from "../environments/environment";
import {AngularFireDatabaseModule} from "@angular/fire/compat/database";
import { PismaListComponent } from './pisma-list/pisma-list.component';
import {NgxPaginationModule} from "ngx-pagination";
import { PanelUzytkownikaPismaComponent } from './panel-uzytkownika-pisma/panel-uzytkownika-pisma.component';


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
    TranslatebreedPipe,
    ZlozPozewComponent,
    BootstrapValidatorDirective,
    PismaListComponent,
    PanelUzytkownikaPismaComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        NgbModule,
        HttpClientModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireDatabaseModule,
        NgxPaginationModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
