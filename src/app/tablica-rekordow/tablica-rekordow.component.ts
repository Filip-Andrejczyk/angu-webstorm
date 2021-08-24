import { Component, OnInit } from '@angular/core';
import { Rekord } from "../models/rekordy";
import { TablicaLstorageService } from "../tablica-lstorage.service";
import {map, switchMap} from "rxjs/operators";
import {BehaviorSubject, Observable} from "rxjs";


@Component({
  selector: 'app-tablica-rekordow',
  templateUrl: './tablica-rekordow.component.html',
  styleUrls: ['./tablica-rekordow.component.scss']
})
export class TablicaRekordowComponent implements OnInit {

  myData$: Observable<Rekord[]> | undefined
  refreshUsers$ = new BehaviorSubject<boolean>(true);

  constructor(private tablicaLStorageServive: TablicaLstorageService) { }

  ngOnInit(): void {
      this.myData$ =this.refreshUsers$.pipe(switchMap(_ => this.tablicaLStorageServive.getRecords()));
  }

}


