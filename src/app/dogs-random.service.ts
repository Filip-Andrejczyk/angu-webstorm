import { Injectable } from '@angular/core';
import {GetApiService} from "./get-api.service";
import {map, switchMap} from "rxjs/operators";
import {Observable, ReplaySubject, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DogsRandomService {

  public wszystkieRasy$: Observable<string[]>;
  public trzylosowe$: Observable<string[]>;

  refreshAnswerSrc: ReplaySubject<{ except: string }> = new ReplaySubject(1);

  constructor(private api: GetApiService)
  {
    this.wszystkieRasy$ = this.getBreeds();
    this.trzylosowe$ = this.wylosujDogs();
    this.refreshAnswers();
  }

  getBreeds(): Observable<string[]>
  {
    return this.api.allBreeds().pipe(map((rasy) => rasy.message),
      map(breeds => {
        const notFlattenBreeds = Object.entries(breeds).map(([breed, subBreeds])=>{
          return subBreeds.length === 0 ? breed : subBreeds.map(subBreed => `${breed}-${subBreed}`)
        });
        return ([] as string[]).concat(...notFlattenBreeds);
      }));
  }

  wylosujDogs(): Observable<string[]>
  {
    //return this.wszystkieRasy$.pipe(map((rasy) => this.chooseThreedogz(rasy, 3)));
    return this.refreshAnswerSrc.pipe(
      switchMap(()=>this.wszystkieRasy$),
      map(allBreeds => this.chooseThreedogz(allBreeds))
    );
  }

  public refreshAnswers(): void
  {
    this.refreshAnswerSrc.next();
  }

  chooseThreedogz(array: string[]): string[]{
    let n=3
    let threeRandomDogs = new Array(n)
    let len = array.length;
    let taken = new Array(len);
    while (n--) {
      let x = Math.floor(Math.random() * len);
      threeRandomDogs[n] = array[x in taken ? taken[x] : x];
      taken[x] = --len in taken ? taken[len] : len;
    }
    return threeRandomDogs;
  }
}


