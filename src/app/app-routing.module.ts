import {RouterModule, Routes} from "@angular/router";
import {StartComponent} from "./start/start.component";
import {NgModule} from "@angular/core";
import {StronakononaComponent} from "./stronakonona/stronakonona.component";
import {StronamajoraComponent} from "./stronamajora/stronamajora.component";
import {KalkulatorComponent} from "./kalkulator/kalkulator.component";

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
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}