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

const routes: Routes = [
  {
  path: '',
  component: StartComponent
  },
  {
    path: 'krzysztof',
    component: StronakononaComponent
  },
  {
    path: 'fufuwojtas',
    component: StronamajoraComponent
  },
  {
    path: 'niuchniuch',
    component: KalkulatorComponent
  },
  {
    path: 'dodajpismo',
    component: ZlozPozewComponent
  },
  {
    path: 'listujpisma',
    component: PismaListComponent
  },
  {
    path: 'paneluzytkownika',
    component: PanelUzytkownikaPismaComponent
  },
  {
    path: 'edytujdokument/:id',
    component: EditPozewComponent
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
