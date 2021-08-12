import { Component, OnInit } from '@angular/core';
import {GetApiService} from '../get-api.service';
import {Observable, Subject} from "rxjs";
import {map, shareReplay, switchMap} from "rxjs/operators";

@Component({
  selector: 'app-info-z-api',
  templateUrl: './info-z-api.component.html',
  styleUrls: ['./info-z-api.component.scss']
})
export class InfoZApiComponent implements OnInit {

  scierzka$: Observable<string> | undefined;
  rasa$: Observable<any> | undefined;

  clickAction: Subject<void> = new Subject<void>();

  constructor(private api: GetApiService) { }

  ngOnInit(): void {
  this.scierzka$ = this.clickAction.pipe(
    switchMap(() => this.api.apiCall().pipe(map((dog) => dog.message))),
    shareReplay(1)
  )

  this.rasa$ = this.scierzka$.pipe(
    map((dog) => {
      const rasa = dog.match(/(breeds\/)(.*)(?=\/)/);
      console.log(rasa);
      return rasa ? rasa[2] : null;
    }
  ));
  }

  nextPieselek(): void{
    this.clickAction.next();
  }
}


