import { Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import {GetApiService} from '../get-api.service';
import {Observable, Subject, of} from "rxjs";
import {map, shareReplay, switchMap} from "rxjs/operators";
import {DogRasa} from "../models/rasy";
import {observableToBeFn} from "rxjs/internal/testing/TestScheduler";
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

  //clickAction: Subject<void> = new Subject();
  //drawDogs: Subject<void> = new Subject();

  @ViewChild(QuizComponent) child: { wylosujPieski: () => any; } | undefined;

  constructor(private api: GetApiService,
              private dogsRandomService: DogsRandomService,
              private jedenWybranyPiesService: JedenWybranyPiesService
              ) {

    // this.allBreeds$ = this.api.allBreeds().pipe(map((rasy) => rasy.message),
    //   map(breeds => {
    //     const notFlattenBreeds = Object.entries(breeds).map(([breed, subBreeds])=>{
    //       return subBreeds.length === 0 ? breed : subBreeds.map(subBreed => `${breed}-${subBreed}`)
    //     });
    //     return ([] as string[]).concat(...notFlattenBreeds);
    //   }));

    // this.threeRandomBreeds$ = this.drawDogs.pipe(switchMap(() => this.allBreeds$.pipe(
    //   map((allBreeds) =>
    //     this.getThreeRandom(allBreeds),
    //   )
    // )));

  }

  ngAfterViewInit(): void
  {
    this.doggoImgPath$ = this.jedenWybranyPiesService.dogeImgPath$;
    this.rasa$ = this.jedenWybranyPiesService.breed$;
  }

  nextPieselek(): void
  {
    this.jedenWybranyPiesService.changeRandomDog.next();
    // this.dogsRandomService.refreshAnswers();
  }

}


