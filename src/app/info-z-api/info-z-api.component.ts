import { Component, OnInit } from '@angular/core';
import {GetApiService} from '../get-api.service';
import {Observable, Subject} from "rxjs";
import {map, shareReplay, switchMap} from "rxjs/operators";
import {DogRasa} from "../models/rasy";

@Component({
  selector: 'app-info-z-api',
  templateUrl: './info-z-api.component.html',
  styleUrls: ['./info-z-api.component.scss']
})
export class InfoZApiComponent implements OnInit {

  doggoImgPath$: Observable<string> | undefined;
  rasa$: Observable<any> | undefined;
  allBreeds$: Observable<DogRasa[]> | undefined;


  clickAction: Subject<void> = new Subject<void>();

  constructor(private api: GetApiService) { }

  ngOnInit(): void {

  this.doggoImgPath$ = this.clickAction.pipe(
    switchMap(() => this.api.getRandomDoggo().pipe(map((dog) => dog.message))),
    shareReplay(1)
  )

  this.allBreeds$ = this.api.allBreeds().pipe(map((rasy) => rasy.message),
    map(breeds => {
      const notFlattenBreeds = Object.entries(breeds).map(([breed, subBreeds])=>{
        return subBreeds.length === 0 ? breed : subBreeds.map(subBreed => `${breed}-${subBreed}`)
      });
      const allBreeds = [].concat(...notFlattenBreeds)
      //const allBreeds = notFlattenBreeds.flat();
    }));

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
}


