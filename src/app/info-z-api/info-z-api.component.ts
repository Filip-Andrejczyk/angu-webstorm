import { Component, ViewChild, AfterViewInit} from '@angular/core';
import {GetApiService} from '../get-api.service';
import {Observable} from "rxjs";
import {DogsRandomService} from "../dogs-random.service";
import {QuizComponent} from "../quiz/quiz.component";
import {JedenWybranyPiesService} from "../jeden-wybrany-pies.service";

@Component({
  selector: 'app-info-z-api',
  templateUrl: './info-z-api.component.html',
  styleUrls: ['./info-z-api.component.scss'],
})
export class InfoZApiComponent implements AfterViewInit {

  doggoImgPath$: Observable<string> | undefined;
  rasa$: Observable<any> | undefined;

  public zostaloPominiec: number = 3;
  public koniecPomijania: boolean = false;

  @ViewChild(QuizComponent) child: { wylosujPieski: () => any; } | undefined;

  constructor(private api: GetApiService,
              private dogsRandomService: DogsRandomService,
              private jedenWybranyPiesService: JedenWybranyPiesService
              ) {}

  ngAfterViewInit(): void
  {
    this.doggoImgPath$ = this.jedenWybranyPiesService.dogeImgPath$;
    this.rasa$ = this.jedenWybranyPiesService.breed$;
  }

  nextPieselek(): void
  {
    this.jedenWybranyPiesService.changeRandomDog.next();
  }

  nextPieselekPrzycisk(): void
  {

    if(this.zostaloPominiec > 0)
    {
      this.jedenWybranyPiesService.changeRandomDog.next();
      this.zostaloPominiec--;
    }
    if (this.zostaloPominiec == 0)
    {
      this.koniecPomijania = true;
    }
  }

}


