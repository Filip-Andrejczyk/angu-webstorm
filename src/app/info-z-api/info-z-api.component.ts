import { Component, OnInit } from '@angular/core';
import {GetApiService} from '../get-api.service';
import {Observable, Subject, of} from "rxjs";
import {map, shareReplay, switchMap} from "rxjs/operators";
import {DogRasa} from "../models/rasy";
import {observableToBeFn} from "rxjs/internal/testing/TestScheduler";

@Component({
  selector: 'app-info-z-api',
  templateUrl: './info-z-api.component.html',
  styleUrls: ['./info-z-api.component.scss']
})
export class InfoZApiComponent implements OnInit {

  doggoImgPath$: Observable<string> | undefined;
  rasa$: Observable<any> | undefined;
  allBreeds$: Observable<string[]>;
  threeRandomBreeds$: Observable<string[]>;

  clickAction: Subject<void> = new Subject();
  drawDogs: Subject<void> = new Subject();

  constructor(private api: GetApiService) {

    this.allBreeds$ = this.api.allBreeds().pipe(map((rasy) => rasy.message),
      map(breeds => {
        const notFlattenBreeds = Object.entries(breeds).map(([breed, subBreeds])=>{
          return subBreeds.length === 0 ? breed : subBreeds.map(subBreed => `${breed}-${subBreed}`)
        });
        return ([] as string[]).concat(...notFlattenBreeds);
      }));

    this.threeRandomBreeds$ = this.drawDogs.pipe(switchMap(() => this.allBreeds$.pipe(
      map((allBreeds) =>
        this.getThreeRandom(allBreeds),
      )
    )));


  }

  ngOnInit(): void {

  this.doggoImgPath$ = this.clickAction.pipe(
    switchMap(() => this.api.getRandomDoggo().pipe(map((dog) => dog.message))),
    shareReplay(1)
  )

  this.rasa$ = this.doggoImgPath$.pipe(
    map((dog) => {
      const rasa = dog.match(/(breeds\/)(.*)(?=\/)/);
      return rasa ? rasa[2] : null;
    }
  ));

  }

  nextPieselek(): void{
    this.clickAction.next();
  }

  getThreeRandom(array: string[]): string[]{
    var n = 3;
    var threeRandomDogs = new Array(n),
      len = array.length,
      taken = new Array(len);
    while (n--) {
      var x = Math.floor(Math.random() * len);
      threeRandomDogs[n] = array[x in taken ? taken[x] : x];
      taken[x] = --len in taken ? taken[len] : len;
    }
    return threeRandomDogs;
  }


}


