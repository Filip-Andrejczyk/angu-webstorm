import { Component, OnInit } from '@angular/core';
import { Rekord } from "../models/rekordy";
import { TablicaLstorageService } from "../tablica-lstorage.service";
import { switchMap } from "rxjs/operators";
import { BehaviorSubject, Observable } from "rxjs";


@Component({
  selector: 'app-tablica-rekordow',
  templateUrl: './tablica-rekordow.component.html',
  styleUrls: ['./tablica-rekordow.component.scss']
})
export class TablicaRekordowComponent implements OnInit {

  myData$: Observable<Rekord[]> | undefined
  refreshUsers$ = new BehaviorSubject<boolean>(true);
  public kliknietoEdytuj: boolean = false;
  public numberofKliknietoEdytuj: number = 0;

  constructor(private tablicaLStorageServive: TablicaLstorageService) { }

  ngOnInit(): void {
      this.myData$ =this.refreshUsers$.pipe(switchMap(_ => this.tablicaLStorageServive.getRecords()));
  }

  edytujClikc(): void{

    this.kliknietoEdytuj = !this.kliknietoEdytuj;
  }

  dajZ(nr: number): void{
    return this.tablicaLStorageServive.sendData(this.tablicaLStorageServive.removeRecord(nr));
  }

}


