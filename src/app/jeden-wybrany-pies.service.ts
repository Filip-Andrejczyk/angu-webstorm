import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs";
import {map, shareReplay, switchMap} from "rxjs/operators";
import {GetApiService} from "./get-api.service";

@Injectable({
  providedIn: 'root'
})
export class JedenWybranyPiesService {

  dogeImgPath$: Observable<string> | undefined;
  breed$: Observable<string>;

  clickAc: Subject<void> = new Subject();

  constructor(private api: GetApiService)
  {
    this.dogeImgPath$ = this.clickAc.pipe(
      switchMap(() => this.api.getRandomDoggo().pipe(
        map((dog) => dog.message))),
        shareReplay(1)
    )

    this.breed$ = this.dogeImgPath$.pipe(
      map((dog) => {
          const rasa = dog.match(/(breeds\/)(.*)(?=\/)/) ||  '';
          return rasa[2];
        }
      ));
  }

}
