import {RouterModule, Routes} from "@angular/router";
import {StartComponent} from "./start/start.component";
import {NgModule} from "@angular/core";
import {StronakononaComponent} from "./stronakonona/stronakonona.component";
import {StronamajoraComponent} from "./stronamajora/stronamajora.component";
import {KalkulatorComponent} from "./kalkulator/kalkulator.component";
import {ZlozPozewComponent} from "./zloz-pozew/zloz-pozew.component";
import {PismaListComponent} from "./pisma-list/pisma-list.component";
import {PanelUzytkownikaPismaComponent} from "./panel-uzytkownika-pisma/panel-uzytkownika-pisma.component";
import {EditPozewComponent} from "./edit-pozew/edit-pozew.component";
import {SignInComponent} from "./sign-in/sign-in.component";
import {SignUpComponent} from "./sign-up/sign-up.component";
import {TologinDashboardComponent} from "./tologin-dashboard/tologin-dashboard.component";
import {ForgotPasswordComponent} from "./forgot-password/forgot-password.component";
import {VerifyEmailComponent} from "./verify-email/verify-email.component";
import {AngularFireAuthGuard} from "@angular/fire/compat/auth-guard";
import {GameComponent} from "./pismogame/game/game.component";

const routes: Routes = [
  {path: '', component: StartComponent},
  {path: 'krzysztof', component: StronakononaComponent},
  {path: 'fufuwojtas',component: StronamajoraComponent},
  {path: 'niuchniuch', component: KalkulatorComponent},
  {path: 'dodajpismo', component: ZlozPozewComponent},
  {path: 'listujpisma',component: PismaListComponent},
  {path: 'paneluzytkownika',component: PanelUzytkownikaPismaComponent},
  {path: 'edytujdokument/:id', component: EditPozewComponent},
  {path: 'sign-in-login', component: SignInComponent},
  {path: 'sign-up-register', component: SignUpComponent},
  {path: 'tologin-dashboard', component: TologinDashboardComponent},
  {path: 'forgot-password', component: ForgotPasswordComponent},
  {path: 'verify-email-address', component: VerifyEmailComponent},
  {path: 'game', component: GameComponent},
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
